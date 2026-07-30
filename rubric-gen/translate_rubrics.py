#!/usr/bin/env python3
"""
Faithful English→Korean translation of the 12 generated rubrics.

One uniform translator (Claude by default) renders every rubric's text into
Korean WITHOUT changing items, points, order, or structure — so the Korean and
English are the SAME rubric, just in Korean. This is a first pass; a Korean
clinician should review the output before launch.

Setup:  export ANTHROPIC_API_KEY=...
Run:    python3 translate_rubrics.py
Reads:  output/case<ID>__<model>.json
Writes: output_ko/case<ID>__<model>.json  (Korean text, matched to each EN field)
"""

import os, json, re, glob, pathlib

HERE = pathlib.Path(__file__).parent
OUT = HERE / "output"
OUT_KO = HERE / "output_ko"; OUT_KO.mkdir(exist_ok=True)

TRANSLATOR_MODEL = "claude-fable-5"   # one uniform translator for all 12 (no per-model KO-quality confound)

SYSTEM = """You are a professional Korean medical translator. You translate pediatric emergency clinical history-taking assessment rubrics from English into Korean.

Requirements:
- Preserve the exact clinical meaning and the exact structure. Do NOT add, remove, merge, split, or reorder any domain or item. Do NOT change any numbers.
- Use natural, professional Korean medical terminology as used by Korean physicians in clinical practice.
- Keep widely-used English abbreviations and units where Korean clinicians conventionally use them (e.g., CBC, RSV, IV, mmHg).
- Translate only the text of: each domain title, and each item's name, description, and explanation.
- Return the Korean translations in the SAME order as the input, matching the provided JSON schema exactly."""

# Schema for the Korean output — mirrors the EN structure, text fields only.
KO_SCHEMA = {
    "type": "object",
    "properties": {
        "domains": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "domain_title_ko": {"type": "string"},
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name_ko": {"type": "string"},
                                "description_ko": {"type": "string"},
                                "explanation_ko": {"type": "string"},
                            },
                            "required": ["name_ko", "description_ko", "explanation_ko"],
                            "additionalProperties": False,
                        },
                    },
                },
                "required": ["domain_title_ko", "items"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["domains"],
    "additionalProperties": False,
}


def en_payload(rubric: dict) -> str:
    """The English text to translate, as compact JSON in the same order."""
    doms = []
    for d in rubric["domains"]:
        doms.append({
            "domain_title": d["domain_title"],
            "items": [{"name": it["name"], "description": it["description"],
                       "explanation": it["explanation"]} for it in d["items"]],
        })
    return json.dumps({"domains": doms}, ensure_ascii=False, indent=2)


def translate(rubric: dict) -> dict:
    import anthropic
    client = anthropic.Anthropic()
    with client.messages.stream(
        model=TRANSLATOR_MODEL,
        max_tokens=32000,
        system=SYSTEM,
        output_config={"effort": "high", "format": {"type": "json_schema", "schema": KO_SCHEMA}},
        messages=[{"role": "user", "content": en_payload(rubric)}],
    ) as stream:
        msg = stream.get_final_message()
    if msg.stop_reason == "refusal":
        raise RuntimeError("translator returned a refusal")
    text = next(b.text for b in msg.content if b.type == "text")
    return json.loads(text)


def check_shape(en_rubric, ko) -> list:
    """Ensure the KO has the same number of domains/items as the EN (no drift)."""
    problems = []
    if len(ko["domains"]) != len(en_rubric["domains"]):
        problems.append("domain count mismatch")
    for i, (ed, kd) in enumerate(zip(en_rubric["domains"], ko["domains"])):
        if len(kd["items"]) != len(ed["items"]):
            problems.append(f"domain {i+1} item count mismatch ({len(kd['items'])} vs {len(ed['items'])})")
    return problems


def main():
    files = sorted(glob.glob(str(OUT / "case*__*.json")))
    print(f"Translating {len(files)} rubrics with {TRANSLATOR_MODEL}\n")
    for f in files:
        tag = pathlib.Path(f).stem
        rec = json.load(open(f, encoding="utf-8"))
        if not rec.get("invariant_ok"):
            print(f"  skip {tag} (did not pass invariant check)"); continue
        print(f"→ {tag} …", end=" ", flush=True)
        try:
            ko = translate(rec["rubric"])
            problems = check_shape(rec["rubric"], ko)
            out = {"case_id": rec["case_id"], "model_key": rec["model_key"],
                   "translator_model": TRANSLATOR_MODEL, "ko": ko, "shape_problems": problems}
            (OUT_KO / f"{tag}.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
            print("OK" if not problems else f"⚠ SHAPE: {'; '.join(problems)}")
        except Exception as e:
            print(f"✗ ERROR: {type(e).__name__}: {e}")
    print("\nDone. Korean drafts are in output_ko/. NEXT: a Korean clinician should")
    print("review these, then run  node build_survey_data.js  to load EN+KO into the survey.")


if __name__ == "__main__":
    main()
