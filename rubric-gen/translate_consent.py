#!/usr/bin/env python3
"""
Re-translate the consent body paragraphs (§1–§8) to Korean with the same uniform
translator used for the rubrics and chrome, and write them back into ../index.html.

The consent bodies live in a different structure from the rest of the UI — each
section is  body: t(<English React tree>, <Korean React tree>)  — so the chrome
extractor/injector skips them. This one script does the whole job in place:
  1. extract each section's EN + KO content strings (paired by position)
  2. translate the EN faithfully to Korean
  3. replace the old KO literal with the new one in index.html

Setup:  export ANTHROPIC_API_KEY=...
Run:    python3 translate_consent.py
        python3 translate_consent.py --dry-run   # translate + print, do NOT write
"""

import json, re, sys, pathlib

HERE = pathlib.Path(__file__).parent
IDX = HERE.parent / "index.html"
TRANSLATOR_MODEL = "claude-fable-5"

SYSTEM = """You translate informed-consent text for a bilingual (English/Korean) pediatric clinical-research study, from English to Korean.

This is IRB informed-consent language shown to clinician participants. Translate each English paragraph into natural, formal Korean of the register used in Korean research-ethics / informed-consent documents.

Rules:
- Translate faithfully: do NOT add, drop, soften, or embellish any content. Every fact must match the English exactly (number of cases, time estimate, confidentiality mechanism, etc.).
- This study is CONFIDENTIAL/CODED, not anonymous: responses are stored under a per-participant code, and a separate list links codes to participants. Do not translate this as "익명"(anonymous) — use coded/confidential wording (e.g. 고유 코드, 비밀 보장).
- Keep list-item prefixes like "A." / "B." exactly as-is at the start of the string.
- Preserve any parenthetical English terms the source keeps (e.g. "(variability)", "(alignment)").
- Return a JSON object with a "translations" array of Korean strings, in the SAME order and SAME length as the input array."""

SCHEMA = {
    "type": "object",
    "properties": {"translations": {"type": "array", "items": {"type": "string"}}},
    "required": ["translations"],
    "additionalProperties": False,
}

LIT = r'"(?:[^"\\]|\\.)*"'
CONTENT = re.compile(r"h\('(?:p|li)',(?:\{style:bp\}|null),\s*(" + LIT + r")\)")


def scan_close(s, start):
    """Index of the bracket that closes the one opening at `start`."""
    depth, i, q, esc = 0, start, None, False
    while i < len(s):
        c = s[i]
        if q:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == q: q = None
        elif c in "\"'`": q = c
        elif c in "[{(": depth += 1
        elif c in "]})":
            depth -= 1
            if depth == 0: return i
        i += 1
    raise ValueError("unbalanced brackets")


def split_t(s, tpos):
    """Given the index of the 't' in `t(A, B)`, return (A_text, B_text)."""
    p = s.index("(", tpos)
    depth, i, q, esc, comma = 1, p + 1, None, False, -1
    while i < len(s):
        c = s[i]
        if q:
            if esc: esc = False
            elif c == "\\": esc = True
            elif c == q: q = None
        elif c in "\"'`": q = c
        elif c in "([{": depth += 1
        elif c in ")]}":
            depth -= 1
            if depth == 0:
                return s[p + 1:comma], s[comma + 1:i]
        elif c == "," and depth == 1 and comma < 0:
            comma = i
        i += 1
    raise ValueError("unterminated t(")


def main():
    dry = "--dry-run" in sys.argv
    html = IDX.read_text(encoding="utf-8")

    si = html.index("const sections = [")
    arr_start = html.index("[", si)
    sections = html[arr_start:scan_close(html, arr_start) + 1]

    pairs = []  # (en_text, ko_literal_raw)
    for m in re.finditer(r"body:\s*(t)\(", sections):
        en_tree, ko_tree = split_t(sections, m.start(1))
        en_lits = [x.group(1) for x in CONTENT.finditer(en_tree)]
        ko_lits = [x.group(1) for x in CONTENT.finditer(ko_tree)]
        if len(en_lits) != len(ko_lits):
            raise SystemExit(f"section paragraph count mismatch: {len(en_lits)} EN vs {len(ko_lits)} KO")
        for e, k in zip(en_lits, ko_lits):
            pairs.append((json.loads(e), k))

    en_list = [en for en, _ in pairs]
    print(f"Found {len(en_list)} consent paragraphs. Translating with {TRANSLATOR_MODEL} …")

    import anthropic
    client = anthropic.Anthropic()
    user = json.dumps({"strings": en_list}, ensure_ascii=False, indent=2)
    with client.messages.stream(
        model=TRANSLATOR_MODEL,
        max_tokens=16000,
        system=SYSTEM,
        output_config={"effort": "high", "format": {"type": "json_schema", "schema": SCHEMA}},
        messages=[{"role": "user", "content": user}],
    ) as stream:
        msg = stream.get_final_message()
    if msg.stop_reason == "refusal":
        raise SystemExit("translator returned a refusal")
    text = next(b.text for b in msg.content if b.type == "text")
    ko_list = json.loads(text)["translations"]
    if len(ko_list) != len(en_list):
        raise SystemExit(f"length mismatch: {len(ko_list)} translations for {len(en_list)} paragraphs")

    changed = 0
    for (en, ko_old_lit), new_ko in zip(pairs, ko_list):
        new_lit = json.dumps(new_ko, ensure_ascii=False)
        old_ko = json.loads(ko_old_lit)
        mark = "  (unchanged)" if new_ko == old_ko else ""
        print(f"\nEN: {en[:80]}")
        print(f"  old KO: {old_ko[:80]}")
        print(f"  new KO: {new_ko[:80]}{mark}")
        if new_ko != old_ko:
            if html.count(ko_old_lit) != 1:
                raise SystemExit(f"expected exactly 1 occurrence of a KO literal, found {html.count(ko_old_lit)}")
            html = html.replace(ko_old_lit, new_lit)
            changed += 1

    if dry:
        print(f"\n[dry-run] {changed} paragraph(s) would change. index.html NOT written.")
        return
    IDX.write_text(html, encoding="utf-8")
    print(f"\nWrote index.html — {changed} consent paragraph(s) updated.")


if __name__ == "__main__":
    main()
