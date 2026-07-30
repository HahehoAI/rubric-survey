// Generate participant codes (pids) for the rubric survey.
//
//   node make_tokens.js K 60      → 60 SMC (Korea) codes
//   node make_tokens.js V 40      → 40 VinUni codes
//   node make_tokens.js TEST 5    → 5 test codes (excluded from analysis)
//
// Appends to tokens.csv (pid, site, link, email, sent, completed). Fill in the
// email column and send each person their `link`. This CSV is your OFFLINE
// code→email map — it is GITIGNORED and must never be uploaded to Supabase.
//
// The checksum + alphabet below are byte-for-byte identical to index.html's
// pidCheckChar/pidMint, so codes made here always validate in the app.

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";   // Crockford base32 (no I/L/O/U)
const SITE = { K: "SMC", V: "VinUni", TEST: "test" };
const BASE = "https://hahehoai.github.io/rubric-survey/";

function checkChar(letters) {
  let sum = 0;
  for (let i = 0; i < letters.length; i++) sum += (ALPHABET.indexOf(letters[i]) + 1) * (i + 1);
  return ALPHABET[sum % 32];
}
function mint(prefix) {
  let body = "";
  for (let i = 0; i < 5; i++) body += ALPHABET[crypto.randomInt(32)];
  return prefix + "-" + body + checkChar(prefix + body);
}

const prefix = (process.argv[2] || "").toUpperCase();
const count = parseInt(process.argv[3] || "0", 10);
if (!SITE[prefix] || !count) {
  console.error("usage: node make_tokens.js <K|V|TEST> <count>");
  process.exit(1);
}

const OUT = path.join(__dirname, "tokens.csv");
const existing = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
const seen = new Set([...existing.matchAll(/^([A-Z]+-[0-9A-Z]{6})/gm)].map(m => m[1]));

const rows = [];
while (rows.length < count) {
  const p = mint(prefix);
  if (seen.has(p)) continue;             // no duplicates, ever
  seen.add(p);
  rows.push([p, SITE[prefix], BASE + "?pid=" + p, "", "", ""].join(","));
}

const header = "pid,site,link,email,sent,completed\n";
const block = rows.join("\n") + "\n";
fs.writeFileSync(OUT, existing ? existing.replace(/\n*$/, "\n") + block : header + block);

console.log(`Wrote ${rows.length} ${SITE[prefix]} code(s) to tokens.csv.`);
rows.slice(0, 3).forEach(r => { const c = r.split(","); console.log(`  ${c[0]}  →  ${c[2]}`); });
if (rows.length > 3) console.log(`  … and ${rows.length - 3} more`);
