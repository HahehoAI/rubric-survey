// Builds the survey's CASES rubric data from the 12 generated rubrics and
// injects it into ../index.html.
//   - Drops the UTI case; renumbers the 4 kept cases to 1..4
//   - Each case gets 3 rubrics per the Latin square (blinded as "Rubric 1/2/3")
//   - Korean fields are English placeholders (pending the native-review pass)
//   - Writes model_mapping.json so YOU can tell which rubric came from which model
//
// Run:  node build_survey_data.js

const fs = require("fs");
const path = require("path");

const IDX = path.join(__dirname, "..", "index.html");
const html = fs.readFileSync(IDX, "utf8");

// String-aware bracket scan → { arr, start, end } for `const CASES = [ … ]`.
function extractCases(src) {
  const marker = "const CASES = [";
  const s = src.indexOf(marker);
  const arrStart = s + marker.length - 1;
  let depth = 0, i = arrStart, inStr = null, esc = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === inStr) inStr = null; continue; }
    if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
    if (c === "[" || c === "{") depth++;
    else if (c === "]" || c === "}") { depth--; if (depth === 0) { i++; break; } }
  }
  return { arr: eval("(" + src.slice(arrStart, i) + ")"), start: arrStart, end: i };
}

// Injection point = current file's CASES span (we only overwrite that span).
const { start: arrStart, end: i } = extractCases(html);

// ── Vignette source: the ORIGINAL 5-case data (stable), keyed by original id.
// Read once from the committed index.html (git HEAD) so re-runs stay correct even
// though the working file's cases get renumbered 1..4 by this very script.
function originalVignettes() {
  const f = path.join(__dirname, "vignettes_source.json");
  if (fs.existsSync(f)) return JSON.parse(fs.readFileSync(f, "utf8"));
  const orig = require("child_process")
    .execSync("git show HEAD:index.html", { cwd: path.join(__dirname, ".."), maxBuffer: 64 * 1024 * 1024 })
    .toString();
  const src = {};
  for (const c of extractCases(orig).arr) src[c.id] = { en: c.en, ko: c.ko, vignette: c.vignette };
  fs.writeFileSync(f, JSON.stringify(src, null, 2));
  console.log("Saved vignettes_source.json from git HEAD (stable vignette source).");
  return src;
}
const VIG = originalVignettes();

// ── 2. Latin square: new case number → [model for R1, R2, R3] ─────────────────
// New case 1 = old case 2 (gastro), 2 = old 3 (RSV), 3 = old 4 (seizure), 4 = old 5 (appendicitis)
const OLD_ID = { 1: 2, 2: 3, 3: 4, 4: 5 };
const SQUARE = {
  1: ["claude", "gpt", "gemini"],   // gastroenteritis
  2: ["gpt", "gemini", "claude"],   // RSV
  3: ["gemini", "claude", "gpt"],   // febrile seizure
  4: ["claude", "gpt", "gemini"],   // appendicitis
};

const KO_RUBRIC = { 1: "기준표 1", 2: "기준표 2", 3: "기준표 3" };

function loadRubric(oldCaseId, model) {
  const f = path.join(__dirname, "output", `case${oldCaseId}__${model}.json`);
  const rec = JSON.parse(fs.readFileSync(f, "utf8"));
  if (!rec.invariant_ok) throw new Error(`${f} did not pass invariant check`);
  return rec.rubric;
}

// Korean translation, if translate_rubrics.py has been run. null → EN placeholder.
function loadKo(oldCaseId, model) {
  const f = path.join(__dirname, "output_ko", `case${oldCaseId}__${model}.json`);
  if (!fs.existsSync(f)) return null;
  return JSON.parse(fs.readFileSync(f, "utf8")).ko;
}

// Build one survey-format rubric from a generated rubric (+ optional KO).
function buildRubric(gen, ko, caseNo, pos) {
  const d = gen.domains;
  const dom1 = d.find(x => x.domain_number === 1) || d[0];
  const dom2 = d.find(x => x.domain_number === 2) || d[1];
  // KO domains were produced in the EN array order — align by array index.
  const koDom1 = ko ? ko.domains[d.indexOf(dom1)] : null;
  const koDom2 = ko ? ko.domains[d.indexOf(dom2)] : null;
  const mkItems = (items, domNo, koDom) => items.map((it, idx) => {
    const n = idx + 1;
    const en = `Item ${n}. ${it.name}: ${it.description}`;
    if (it.name.includes(": ")) console.warn(`  ⚠ item name contains ': ' (may confuse the name/desc split): ${it.name}`);
    const k = koDom && koDom.items[idx];
    return {
      id: `${caseNo}-${pos}-${domNo}-${n}`,
      pts: it.points,
      en,
      ko: k ? `항목 ${n}. ${k.name_ko}: ${k.description_ko}` : en,   // EN fallback until translated
      xEn: it.explanation,
      xKo: k ? k.explanation_ko : it.explanation,
    };
  });
  const d1pts = dom1.items.reduce((s, it) => s + it.points, 0);
  const d2pts = dom2.items.reduce((s, it) => s + it.points, 0);
  return {
    id: `${caseNo}-${pos}`,
    label_en: `Rubric ${pos}`, label_ko: KO_RUBRIC[pos],
    d1pts, d2pts,
    d1desc_en: dom1.domain_title, d1desc_ko: koDom1 ? koDom1.domain_title_ko : dom1.domain_title,
    d2desc_en: dom2.domain_title, d2desc_ko: koDom2 ? koDom2.domain_title_ko : dom2.domain_title,
    d1: mkItems(dom1.items, 1, koDom1),
    d2: mkItems(dom2.items, 2, koDom2),
  };
}

// ── 3. Assemble the new CASES array ──────────────────────────────────────────
const mapping = {};
const newCases = [];
for (let caseNo = 1; caseNo <= 4; caseNo++) {
  const oldId = OLD_ID[caseNo];
  const src = VIG[oldId];                              // stable original vignette by original id
  if (!src) throw new Error(`vignette for original case ${oldId} not found in vignettes_source`);
  // renumber the title (EN "Case N:" and KO "사례 N:")
  const en = src.en.replace(/^Case\s+\d+:/, `Case ${caseNo}:`);
  const ko = src.ko.replace(/^사례\s*\d+\s*:/, `사례 ${caseNo}:`);
  const rubrics = [];
  mapping[`case${caseNo}`] = {};
  SQUARE[caseNo].forEach((model, idx) => {
    const pos = idx + 1;
    rubrics.push(buildRubric(loadRubric(oldId, model), loadKo(oldId, model), caseNo, pos));
    mapping[`case${caseNo}`][`rubric${pos}`] = { model, source: `case${oldId}__${model}` };
  });
  newCases.push({ id: caseNo, en, ko, vignette: src.vignette, rubrics });
}

// ── 4. Inject into index.html ────────────────────────────────────────────────
const newArrText = JSON.stringify(newCases, null, 2);
const newHtml = html.slice(0, arrStart) + newArrText + html.slice(i);
fs.writeFileSync(IDX, newHtml);

fs.writeFileSync(path.join(__dirname, "model_mapping.json"), JSON.stringify(mapping, null, 2));

// ── 5. Report ────────────────────────────────────────────────────────────────
console.log("Injected CASES into index.html.");
for (let caseNo = 1; caseNo <= 4; caseNo++) {
  const c = newCases[caseNo - 1];
  console.log(`\nCase ${caseNo}: ${c.en.slice(0, 55)}…`);
  c.rubrics.forEach(r => {
    const total = r.d1pts + r.d2pts;
    const nItems = r.d1.length + r.d2.length;
    const model = mapping[`case${caseNo}`][r.id.split("-")[1] === "1" ? "rubric1" : r.id.split("-")[1] === "2" ? "rubric2" : "rubric3"].model;
    console.log(`  ${r.label_en} [${model}]: ${nItems} items, ${total} pts (D1 ${r.d1pts} / D2 ${r.d2pts})`);
  });
}
console.log("\nmodel_mapping.json written (which model made which rubric — for analysis only).");
