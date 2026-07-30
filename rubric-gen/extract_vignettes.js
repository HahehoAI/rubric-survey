// Extracts the 5 case vignettes from ../index.html into vignettes.json.
// Run once:  node extract_vignettes.js
// The CASES array is pure data (object/array/string literals), so we slice it
// out by bracket-counting (string-aware) and eval it in isolation.

const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");

const marker = "const CASES = [";
const start = html.indexOf(marker);
if (start < 0) { console.error("Could not find 'const CASES = ['"); process.exit(1); }
const arrStart = start + marker.length - 1; // index of the opening '['

// String-aware bracket scan to find the matching close of the array.
let depth = 0, i = arrStart, inStr = null, esc = false;
for (; i < html.length; i++) {
  const c = html[i];
  if (inStr) {
    if (esc) { esc = false; }
    else if (c === "\\") { esc = true; }
    else if (c === inStr) { inStr = null; }
    continue;
  }
  if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
  if (c === "[" || c === "{") depth++;
  else if (c === "]" || c === "}") { depth--; if (depth === 0) { i++; break; } }
}
const arrText = html.slice(arrStart, i);

let CASES;
try { CASES = eval("(" + arrText + ")"); }
catch (e) { console.error("eval failed:", e.message); process.exit(1); }

// Build a clean English clinical vignette string per case.
function block(label, pairs) {
  if (!pairs || !pairs.length) return "";
  const lines = pairs.map(p => `- ${p.en}: ${p.val_en}`).join("\n");
  return `${label}:\n${lines}\n`;
}

const out = CASES.map(cse => {
  const v = cse.vignette || {};
  let text = "";
  // history rows render as "Field: value"
  if (v.rows) text += v.rows.map(r => `${r.en}: ${r.val_en}`).join("\n") + "\n\n";
  text += block("Vital Signs", v.vitals);
  text += "\n" + block("Physical Exam", v.exam);
  if (v.labs && v.labs.length) {
    text += "\nRelevant Lab / Studies:\n" + (v.labs[0].val_en || "") + "\n";
  }
  return { id: cse.id, title: cse.en, vignette: text.trim() };
});

fs.writeFileSync(path.join(__dirname, "vignettes.json"), JSON.stringify(out, null, 2));
console.log(`Wrote vignettes.json with ${out.length} cases:`);
out.forEach(c => console.log(`  case ${c.id}: ${c.title.slice(0, 60)}… (${c.vignette.length} chars)`));
