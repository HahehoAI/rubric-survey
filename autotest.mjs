// End-to-end autotest for index.html — drives the REAL survey in headless Chrome
// on BOTH desktop and mobile viewports, covering happy path AND edge cases
// (back-nav preserves answers, reselect Agree↔Disagree, comment gating, Part B
// reorder + persistence, refresh-restore, focus-retention, language toggle).
//
//   node autotest.mjs
//
// Uses playwright-core with your installed Chrome (no browser download). Never
// touches Supabase: the submit POST is intercepted/faked and asserted in-memory.
// To watch it run, set HEADLESS=false:  HEADLESS=false node autotest.mjs

import { chromium } from 'playwright-core';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const HEADLESS = process.env.HEADLESS !== 'false';

// checksum — byte-identical to index.html pidCheckChar / make_tokens.js
const AB = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const check = s => { let n = 0; for (let i = 0; i < s.length; i++) n += (AB.indexOf(s[i]) + 1) * (i + 1); return AB[n % 32]; };
const mint = p => { let b = ""; for (let i = 0; i < 5; i++) b += AB[Math.floor(Math.random() * 32)]; return p + "-" + b + check(p + b); };

const DEM = { exp:"6-10", active_5yr:"yes", country_practice:"KR", country_training:"KR",
  setting:"ed", setting_other:"", setting_also:[], setting_also_other:"",
  specialty:"general", specialty_sub:"", specialty_other:"", ai_use:"weekly" };
const session = (lang, ci = 0, ri = 0, step = "partA", responses = {}) =>
  ({ lang, step, ci, ri, partAData:null, partADraft:{}, partBDraft:{}, responses, demographics: DEM });

// tiny static server for index.html (React still loads from its CDN)
const server = http.createServer((req, res) => {
  let f = decodeURIComponent(req.url.split('?')[0]);
  if (f === '/') f = '/index.html';
  fs.readFile(path.join(ROOT, f), (e, data) => {
    if (e) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': path.extname(f) === '.html' ? 'text/html' : 'text/plain' });
    res.end(data);
  });
});
await new Promise(r => server.listen(0, r));
const PORT = server.address().port;
const U = (q) => `http://localhost:${PORT}/index.html${q || ''}`;

let pass = 0, fail = 0; const fails = [];
const ok = (name, cond, extra = "") => { cond ? pass++ : (fail++, fails.push(name)); console.log(`  ${cond ? "✅" : "❌"} ${name}${extra ? "  — " + extra : ""}`); };

const browser = await chromium.launch({ executablePath: CHROME, headless: HEADLESS });
const VIEWPORTS = { Desktop: { width: 1280, height: 900 }, Mobile: { width: 390, height: 844, hasTouch: true } };

async function open(vp, { query = '', seed = null, pid = null } = {}) {
  const ctx = await browser.newContext({ viewport: vp, hasTouch: !!vp.hasTouch });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', e => errors.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page._errors = errors;
  if (seed || pid) await page.addInitScript(([p, s]) => {
    // addInitScript re-runs on every reload — only seed if absent so a reload
    // preserves the in-progress session (that's what the refresh test checks).
    if (p) localStorage.setItem('rubric_survey_pid', p);
    if (s && !localStorage.getItem('rubric_survey_session_v2')) localStorage.setItem('rubric_survey_session_v2', JSON.stringify(s));
  }, [pid, seed]);
  await page.goto(U(query));
  return { ctx, page };
}
const storedPid = (page) => page.evaluate(() => localStorage.getItem('rubric_survey_pid'));
const savedSession = (page) => page.evaluate(() => JSON.parse(localStorage.getItem('rubric_survey_session_v2') || 'null'));
async function dismissVignette(page) {                       // mobile auto-modal per case
  const got = page.getByRole('button', { name: /Got it/ });
  if (await got.count()) { await got.first().click(); await page.waitForTimeout(150); }
}
// read the Part B ranked item names in order (via the ⠿ grips)
const partBOrder = (page) => page.evaluate(() =>
  [...document.querySelectorAll('div')].filter(d => d.textContent === '⠿')
    .map(g => { const card = g.parentElement.parentElement; const p = card.querySelector('p'); return p ? p.textContent.trim() : ''; }));

// ══ pid resolution (viewport-independent, run once) ══════════════════════════
console.log("\n═══ pid resolution ═══");
{
  const p = mint("TEST"); const { ctx, page } = await open(VIEWPORTS.Desktop, { query: `?pid=${p}` });
  await page.waitForSelector('text=Continue →', { timeout: 20000 });
  ok("TEST- shows TEST MODE pill", await page.locator('text=TEST MODE').count() > 0);
  ok("TEST- stored verbatim", await storedPid(page) === p);
  await ctx.close();
}
{
  const p = mint("K"); const { ctx, page } = await open(VIEWPORTS.Desktop, { query: `?pid=${p}` });
  await page.waitForSelector('text=Continue →', { timeout: 20000 });
  ok("K- no TEST pill", await page.locator('text=TEST MODE').count() === 0);
  ok("K- stored (attributed)", await storedPid(page) === p);
  await ctx.close();
}
for (const [q, label] of [['', 'bare URL'], ['?pid=GARBLED-9', 'invalid pid']]) {
  const { ctx, page } = await open(VIEWPORTS.Desktop, { query: q });
  await page.waitForSelector('text=Continue →', { timeout: 20000 });
  ok(`${label} → anonymous P-`, /^P-[0-9A-Z]{6}$/.test(await storedPid(page) || ""), await storedPid(page));
  await ctx.close();
}

// ══ per-viewport suites ═══════════════════════════════════════════════════════
for (const [label, vp] of Object.entries(VIEWPORTS)) {
  const isMobile = vp.width < 768;
  console.log(`\n═══ ${label} (${vp.width}×${vp.height}) ═══`);

  // ── front screens: consent gating + language toggle + no View-Case here ──────
  {
    const { ctx, page } = await open(vp);
    await page.waitForSelector('text=I agree to participate', { timeout: 20000 });
    ok("consent Continue gated on checkbox", await page.getByRole('button', { name: 'Continue →' }).isDisabled() === true);
    ok("no 'View Case' button on consent", await page.getByRole('button', { name: /View Case/ }).count() === 0);
    await page.getByRole('button', { name: '한국어' }).click();
    ok("language toggle → Korean consent", await page.locator('text=본 연구에 참여하는 것에 동의합니다').count() > 0);
    await page.getByRole('button', { name: 'EN' }).click();
    ok("language toggle → back to English", await page.locator('text=I agree to participate').count() > 0);
    await page.getByRole('checkbox').first().check();
    await page.getByRole('button', { name: 'Continue →' }).click();
    ok("consent → demographics", await page.waitForSelector('text=About you', { timeout: 15000 }).then(() => true).catch(() => false));
    await ctx.close();
  }

  // ── Part A edge cases: gating, reselect, comment-required, focus retention ────
  {
    const { ctx, page } = await open(vp, { seed: session("en") });
    await page.waitForSelector('text=Continue to Part B →', { timeout: 20000 });
    await dismissVignette(page);
    ok("no comment boxes before answering", await page.locator('textarea').count() === 0);

    await page.getByRole('button', { name: /Continue to Part B/ }).click();          // blocked: nothing answered
    await page.waitForTimeout(150);
    ok("Continue blocked until all answered", await page.getByRole('button', { name: /Continue to Part B/ }).count() > 0
       && await page.locator('text=Please answer this item before continuing').count() > 0);

    await page.getByRole('button', { name: '✗ Disagree', exact: true }).first().click();  // reselect + required comment
    await page.waitForTimeout(100);
    ok("Disagree reveals a required comment box",
       /required/.test(await page.locator('textarea').first().getAttribute('placeholder') || ""));
    await page.getByRole('button', { name: '✓ Agree', exact: true }).first().click();      // reselect back to Agree
    await page.waitForTimeout(100);
    ok("reselect Agree drops the 'required' flag",
       !/required/.test(await page.locator('textarea').first().getAttribute('placeholder') || ""));

    const n = await page.getByRole('button', { name: '✓ Agree', exact: true }).count();     // answer all Agree
    for (let k = 0; k < n; k++) await page.getByRole('button', { name: '✓ Agree', exact: true }).nth(k).click();

    const ta = page.locator('textarea').first();                                            // focus-retention (remount bug)
    await ta.click();
    for (const c of "abcdef") await page.keyboard.type(c, { delay: 15 });
    ok("comment keeps focus across keystrokes (no remount)",
       await ta.evaluate(el => el === document.activeElement) && await ta.inputValue() === "abcdef",
       `val="${await ta.inputValue()}"`);

    await page.getByRole('button', { name: /Continue to Part B/ }).click();
    ok("all-answered → Part B renders", await page.getByRole('button', { name: '▼' }).first().waitFor({ timeout: 8000 }).then(() => true).catch(() => false));

    // ── back-nav preserves answers + comment ──
    await page.getByRole('button', { name: /^← Back/ }).click();
    await page.waitForTimeout(200);
    ok("Back from Part B keeps the typed comment", await page.locator('textarea').first().inputValue() === "abcdef");
    await page.getByRole('button', { name: /Continue to Part B/ }).click();               // still all-answered → straight through
    ok("answers preserved (Part B reachable again)", await page.getByRole('button', { name: '▼' }).first().waitFor({ timeout: 8000 }).then(() => true).catch(() => false));

    // ── Part B reorder via arrows + persistence ──
    ok("first item ▲ disabled", await page.getByRole('button', { name: '▲' }).first().isDisabled() === true);
    ok("last item ▼ disabled", await page.getByRole('button', { name: '▼' }).last().isDisabled() === true);
    const before = await partBOrder(page);
    await page.getByRole('button', { name: '▼' }).first().click();                          // move item 0 down
    await page.waitForTimeout(150);
    const after = await partBOrder(page);
    ok("▼ reorders items", after[0] === before[1] && after[1] === before[0], `${before.slice(0,2)} → ${after.slice(0,2)}`);
    await page.getByRole('button', { name: /^← Back/ }).click();
    await page.waitForTimeout(150);
    await page.getByRole('button', { name: /Continue to Part B/ }).click();
    await page.waitForTimeout(200);
    ok("ranking preserved after nav away+back", JSON.stringify(await partBOrder(page)) === JSON.stringify(after));
    await ctx.close();
  }

  // ── refresh mid-survey restores position ─────────────────────────────────────
  {
    const { ctx, page } = await open(vp, { seed: session("en") });
    await page.waitForSelector('text=Continue to Part B →', { timeout: 20000 });
    await dismissVignette(page);
    const n = await page.getByRole('button', { name: '✓ Agree', exact: true }).count();     // finish rubric 1
    for (let k = 0; k < n; k++) await page.getByRole('button', { name: '✓ Agree', exact: true }).nth(k).click();
    await page.getByRole('button', { name: /Continue to Part B/ }).click();
    await page.getByRole('button', { name: '▼' }).first().waitFor({ timeout: 8000 });
    await page.getByRole('button', { name: /(Next Rubric|Next Case) →/ }).first().click();   // now on rubric 2 Part A
    await page.waitForSelector('text=Continue to Part B →', { timeout: 8000 });
    const s1 = await savedSession(page);
    await page.reload();                                                                     // refresh
    await page.waitForSelector('text=Continue to Part B →', { timeout: 20000 });
    const s2 = await savedSession(page);
    ok("refresh restores same rubric (ri preserved)", s2 && s2.ri === s1.ri && s2.step === "partA", `ri=${s2 && s2.ri}`);
    ok("refresh keeps rubric-1 answers", s2 && Object.keys(s2.responses).length === 1, `${s2 && Object.keys(s2.responses).length} saved`);
    await ctx.close();
  }

  // ── viewport-specific: desktop sidebar/breadcrumb vs mobile View-Case/modal ──
  {
    const { ctx, page } = await open(vp, { seed: session("en") });
    await page.waitForSelector('text=Continue to Part B →', { timeout: 20000 });
    ok("breadcrumb shows 'Case 1 of 4'", await page.locator('text=Case 1 of 4').count() > 0);
    if (isMobile) {
      ok("mobile: vignette modal auto-opens on new case", await page.getByRole('button', { name: /Got it/ }).count() > 0);
      await dismissVignette(page);
      ok("mobile: 'View Case' button appears in Part A", await page.getByRole('button', { name: /View Case/ }).count() > 0);
      await page.getByRole('button', { name: /View Case/ }).click();
      ok("mobile: 'View Case' reopens the modal", await page.getByRole('button', { name: /Got it/ }).count() > 0);
    } else {
      ok("desktop: vignette sidebar visible (Chief Complaint)", await page.locator('text=Chief Complaint').count() > 0);
      ok("desktop: no 'View Case' floating button", await page.getByRole('button', { name: /View Case/ }).count() === 0);
    }
    await ctx.close();
  }

  // ── full 12-rubric run + submit ──────────────────────────────────────────────
  {
    const pid = mint("TEST");
    const { ctx, page } = await open(vp, { query: `?pid=${pid}`, pid, seed: session("en") });
    let captured = null;
    await page.route('**/rest/v1/responses', route => { captured = route.request().postData(); route.fulfill({ status: 201, body: '' }); });
    await page.reload();  // ensure route+seed both active from a clean load
    await page.waitForSelector('text=Continue to Part B →', { timeout: 20000 });

    let rubrics = 0, done = false;
    for (let i = 0; i < 90; i++) {
      if (await page.getByRole('button', { name: /Submit Responses/ }).count()) { done = true; break; }
      await dismissVignette(page);                                    // clear the per-case modal on mobile
      const cont = page.getByRole('button', { name: /Continue to Part B/ });
      if (await cont.count()) {
        const n = await page.getByRole('button', { name: '✓ Agree', exact: true }).count();
        for (let k = 0; k < n; k++) await page.getByRole('button', { name: '✓ Agree', exact: true }).nth(k).click();
        await cont.first().click(); rubrics++;
      } else {
        const nxt = page.getByRole('button', { name: /(Next Rubric|Next Case|Finish Survey) →/ });
        if (await nxt.count()) await nxt.first().click();
      }
      await page.waitForTimeout(110);
    }
    ok("walked all 12 rubrics", rubrics === 12, `${rubrics}`);
    ok("reached Done screen", done);
    if (done) {
      ok("Done: download-backup link present", await page.locator('a[download]').count() > 0);
      await page.getByRole('button', { name: /Submit Responses/ }).click();
      ok("submit → success", await page.waitForSelector('text=Your responses have been recorded', { timeout: 20000 }).then(() => true).catch(() => false));
      let rows = null; try { rows = JSON.parse(captured); } catch {}
      ok("payload non-empty array", Array.isArray(rows) && rows.length > 0, rows ? `${rows.length} rows` : "none");
      if (Array.isArray(rows)) {
        ok("every row = the pid", rows.every(r => r.participant_id === pid));
        ok("all 4 cases present", new Set(rows.map(r => r.case_no)).size === 4);
        ok("120 agreement + 120 ranking rows", rows.filter(r => r.agreed === true).length === 120 && rows.filter(r => r.domain).length === 120);
      }
    }
    ok("no console/page errors during full run", page._errors.length === 0, page._errors.slice(0, 2).join(" | "));
    await ctx.close();
  }
}

await browser.close();
await new Promise(r => server.close(r));
console.log(`\n${'═'.repeat(40)}\n${pass} passed, ${fail} failed`);
if (fail) console.log("FAILED:\n  - " + fails.join("\n  - "));
process.exit(fail ? 1 : 0);
