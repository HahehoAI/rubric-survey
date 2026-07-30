#!/usr/bin/env python3
"""
Translate the extracted chrome (UI) strings to Korean with the same uniform
translator used for the rubrics.

Setup:  export ANTHROPIC_API_KEY=...
Run:    node extract_chrome.js        # first, produces chrome_strings.json
        python3 translate_chrome.py   # produces chrome_ko.json
        node apply_chrome_ko.js       # injects into index.html
"""

import json, pathlib

HERE = pathlib.Path(__file__).parent
TRANSLATOR_MODEL = "claude-fable-5"

SYSTEM = """You translate short user-interface strings for a bilingual (English/Korean) pediatric emergency clinical-research survey. For each English string, produce natural, professional Korean as used in Korean medical and research settings.

Rules:
- Keep it concise and UI-appropriate (these are buttons, labels, headings, and short instructions).
- Preserve any symbols exactly: arrows (→), checks (✓ ✗), ellipsis (…), triangles (▲ ▼), and any placeholders.
- Keep widely-used English abbreviations/units where Korean clinicians conventionally use them.
- Do not add or drop content; translate meaning faithfully.
- Return a JSON object with a "translations" array of Korean strings, in the SAME order and SAME length as the input array."""

SCHEMA = {
    "type": "object",
    "properties": {"translations": {"type": "array", "items": {"type": "string"}}},
    "required": ["translations"],
    "additionalProperties": False,
}


def main():
    import anthropic
    pairs = json.loads((HERE / "chrome_strings.json").read_text(encoding="utf-8"))
    en_list = [p["en"] for p in pairs]
    print(f"Translating {len(en_list)} chrome strings with {TRANSLATOR_MODEL} …")

    client = anthropic.Anthropic()
    user = json.dumps({"strings": en_list}, ensure_ascii=False, indent=2)
    with client.messages.stream(
        model=TRANSLATOR_MODEL,
        max_tokens=32000,
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
        raise SystemExit(f"length mismatch: {len(ko_list)} translations for {len(en_list)} strings")

    out = [{"en": p["en"], "old_ko": p["ko"], "new_ko": ko, "form": p["form"]}
           for p, ko in zip(pairs, ko_list)]
    (HERE / "chrome_ko.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Wrote chrome_ko.json ({len(out)} strings). Next: node apply_chrome_ko.js")


if __name__ == "__main__":
    main()
