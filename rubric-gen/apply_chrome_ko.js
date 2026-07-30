// Injects the Korean translations from chrome_ko.json back into ../index.html,
// replacing the KO half of each  t("EN","KO") / T(...) / en:/ko: / descEn:/descKo:
// pair — matched by the exact English string, and skipping the CASES rubric data
// and COUNTRY_LIST (same exclusions as extract_chrome.js).
//
// Run:  node apply_chrome_ko.js

const fs = require("fs");
const path = require("path");
const IDX = path.join(__dirname, "..", "index.html");
let html = fs.readFileSync(IDX, "utf8");

const map = new Map();  // en → new_ko
for (const e of JSON.parse(fs.readFileSync(path.join(__dirname, "chrome_ko.json"), "utf8"))) {
  map.set(e.en, e.new_ko);
}

// Exclusion spans (recompute against the CURRENT html each pass since indices shift).
function spanOf(marker, src) {
  const s = src.indexOf(marker);
  if (s < 0) return null;
  let a = s + marker.length - 1, i = a, d = 0, q = null, e = false;
  for (; i < src.length; i++) {
    const c = src[i];
    if (q) { if (e) e = false; else if (c === "\\") e = true; else if (c === q) q = null; continue; }
    if (c === '"' || c === "'" || c === "`") { q = c; continue; }
    if (c === "[" || c === "{") d++;
    else if (c === "]" || c === "}") { d--; if (d === 0) { i++; break; } }
  }
  return [s, i];
}

const STR = String.raw`(?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')`;
const unquote = s => JSON.parse(s[0] === "'" ? '"' + s.slice(1, -1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"' : s);
// Copy EN's leading/trailing whitespace onto the KO (protects " pts", "ID: ", etc.)
const edge = (en, ko) => (en.match(/^\s*/)[0]) + ko.trim() + (en.match(/\s*$/)[0]);

let replaced = 0, missing = 0;
function run(re, enIdx, koIdx) {
  const excl = [spanOf("const CASES = [", html), spanOf("const COUNTRY_LIST = [", html)].filter(Boolean);
  const inExcluded = idx => excl.some(([s, e]) => idx >= s && idx < e);
  html = html.replace(new RegExp(re, "g"), (m, ...groups) => {
    const off = groups[groups.length - 2];               // match index
    if (inExcluded(off)) return m;
    const enLit = groups[enIdx], koLit = groups[koIdx];
    const en = unquote(enLit);
    if (!map.has(en)) { return m; }
    const newKo = edge(en, map.get(en));
    replaced++;
    return m.slice(0, m.lastIndexOf(koLit)) + JSON.stringify(newKo) + m.slice(m.lastIndexOf(koLit) + koLit.length);
  });
}

run(String.raw`\b[tT]\(\s*(${STR})\s*,\s*(${STR})\s*[,)]`, 0, 1);
run(String.raw`\ben:\s*(${STR})\s*,\s*ko:\s*(${STR})`, 0, 1);
run(String.raw`\bdescEn:\s*(${STR})\s*,\s*descKo:\s*(${STR})`, 0, 1);

// Report any chrome_ko entries whose English wasn't found (shouldn't happen).
const found = new Set();
for (const re of [String.raw`\b[tT]\(\s*(${STR})`, String.raw`\ben:\s*(${STR})`, String.raw`\bdescEn:\s*(${STR})`]) {
  for (const m of html.matchAll(new RegExp(re, "g"))) { try { found.add(unquote(m[1])); } catch {} }
}

fs.writeFileSync(IDX, html);
console.log(`Replaced ${replaced} Korean strings in index.html.`);
