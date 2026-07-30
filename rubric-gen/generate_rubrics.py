#!/usr/bin/env python3
"""
Generate pediatric history-taking rubrics from 3 LLMs (Claude, GPT, Gemini),
one fresh call per (case x model), with structured JSON output.

Setup:
    pip install -r requirements.txt
    export ANTHROPIC_API_KEY=...      # from platform.claude.com
    export OPENAI_API_KEY=...         # from platform.openai.com
    export GEMINI_API_KEY=...         # from aistudio.google.com

Run:
    python generate_rubrics.py

Reads:  prompt.txt, vignettes.json
Writes: output/case<ID>__<model>.json   (raw + parsed + invariant check + settings)

Each generation is independent — no shared context between cases (earlier
outputs must not bias later ones). Settings are fixed and recorded so the run
is reproducible and documentable in the paper's methods.
"""

import os, json, re, sys, pathlib, datetime

HERE = pathlib.Path(__file__).parent
OUT = HERE / "output"; OUT.mkdir(exist_ok=True)

# ── Reasoning settings: strongest available on each model. ───────────────────
# Each provider exposes "reasoning depth" differently, so this is per-model.
REASONING = {
    "claude": {"effort": "max"},                 # Fable 5: thinking always on; effort tiers up to "max"
    "gpt":    {"effort": "max", "mode": "pro"},   # GPT-5.6: "pro" mode = deepest reasoning; effort "max"
    "gemini": {"thinking_level": "high"},         # Gemini 3.1 Pro tops out at "high" (no "max"/"minimal")
}

# ── Model IDs ────────────────────────────────────────────────────────────────
# Claude Fable 5 — confirmed current ID.
CLAUDE_MODEL = "claude-fable-5"
# ⚠️ CONFIRM these two against the providers' current docs — they are post-cutoff
# models and the exact API model-ID strings may differ from the display names.
OPENAI_MODEL = "gpt-5.6-sol"            # "GPT 5.6 Sol" — verify at platform.openai.com/docs/models
GEMINI_MODEL = "gemini-3.1-pro-preview" # "Gemini 3.1 Pro" — the docs use this ID; confirm at ai.google.dev

# ── Which models to run. Comment a line out to skip one. ─────────────────────
MODELS = ["claude", "gpt", "gemini"]

# ── Structured-output schema (same shape for all 3 → parses identically) ─────
SCHEMA = {
    "type": "object",
    "properties": {
        "domains": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "domain_number": {"type": "integer"},
                    "domain_title": {"type": "string"},
                    "items": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "string"},
                                "description": {"type": "string"},
                                "points": {"type": "integer"},
                                "explanation": {"type": "string"},
                            },
                            "required": ["name", "description", "points", "explanation"],
                            "additionalProperties": False,
                        },
                    },
                },
                "required": ["domain_number", "domain_title", "items"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["domains"],
    "additionalProperties": False,
}

PROMPT = (HERE / "prompt.txt").read_text(encoding="utf-8").strip()
VIGNETTES = json.loads((HERE / "vignettes.json").read_text(encoding="utf-8"))


def strip_fences(s: str) -> str:
    """Remove ```json ... ``` fences if a model wraps its JSON."""
    s = s.strip()
    m = re.search(r"```(?:json)?\s*(.*?)```", s, re.S)
    return m.group(1).strip() if m else s


# ── Generators (one per provider) ────────────────────────────────────────────

def gen_claude(vignette: str) -> dict:
    import anthropic
    client = anthropic.Anthropic()
    # Fable 5: thinking is always on (do not pass a thinking config); effort is set
    # in output_config. Stream so a long max-effort turn doesn't hit a timeout.
    with client.messages.stream(
        model=CLAUDE_MODEL,
        max_tokens=32000,
        system=PROMPT,
        output_config={"effort": REASONING["claude"]["effort"],
                       "format": {"type": "json_schema", "schema": SCHEMA}},
        messages=[{"role": "user", "content": vignette}],
    ) as stream:
        msg = stream.get_final_message()
    if msg.stop_reason == "refusal":
        # Do NOT silently fall back to another model — model identity matters for
        # the study. Flag it so you can regenerate or note it.
        raise RuntimeError("Claude returned a refusal (stop_reason=refusal)")
    text = next(b.text for b in msg.content if b.type == "text")
    return json.loads(strip_fences(text))


def gen_gpt(vignette: str) -> dict:
    from openai import OpenAI
    client = OpenAI()
    # GPT-5.6 uses the Responses API. reasoning.effort="max" + reasoning.mode="pro"
    # is the deepest reasoning; structured output goes in text.format.
    resp = client.responses.create(
        model=OPENAI_MODEL,
        reasoning={"effort": REASONING["gpt"]["effort"], "mode": REASONING["gpt"]["mode"]},
        instructions=PROMPT,
        input=[{"role": "user", "content": vignette}],
        text={"format": {"type": "json_schema", "name": "rubric", "strict": True, "schema": SCHEMA}},
    )
    return json.loads(strip_fences(resp.output_text))


def _no_additional_props(node):
    """Gemini's response_schema (OpenAPI subset) rejects `additionalProperties`;
    strip it recursively. Claude/OpenAI require it, so only Gemini uses this."""
    if isinstance(node, dict):
        return {k: _no_additional_props(v) for k, v in node.items() if k != "additionalProperties"}
    if isinstance(node, list):
        return [_no_additional_props(x) for x in node]
    return node


def gen_gemini(vignette: str) -> dict:
    from google import genai
    from google.genai import types
    client = genai.Client()  # reads GEMINI_API_KEY
    # Gemini 3.x uses thinking_level ("low"/"medium"/"high"); "high" is the deepest
    # on 3.1 Pro. (The older numeric thinking_budget is deprecated on Gemini 3.)
    resp = client.models.generate_content(
        model=GEMINI_MODEL,
        contents=vignette,
        config=types.GenerateContentConfig(
            system_instruction=PROMPT,
            response_mime_type="application/json",
            response_schema=_no_additional_props(SCHEMA),
            thinking_config=types.ThinkingConfig(thinking_level=REASONING["gemini"]["thinking_level"]),
        ),
    )
    return json.loads(strip_fences(resp.text))


GENERATORS = {"claude": gen_claude, "gpt": gen_gpt, "gemini": gen_gemini}
MODEL_IDS = {"claude": CLAUDE_MODEL, "gpt": OPENAI_MODEL, "gemini": GEMINI_MODEL}


# ── Invariant checker ────────────────────────────────────────────────────────

def check(rubric: dict) -> tuple[bool, list[str]]:
    """Enforce: exactly 2 domains, exactly 10 items total, points sum to 100."""
    problems = []
    domains = rubric.get("domains", [])
    if len(domains) != 2:
        problems.append(f"expected 2 domains, got {len(domains)}")
    all_items = [it for d in domains for it in d.get("items", [])]
    if len(all_items) != 10:
        problems.append(f"expected 10 items total, got {len(all_items)}")
    total = sum(int(it.get("points", 0)) for it in all_items)
    if total != 100:
        problems.append(f"points sum to {total}, expected 100")
    return (not problems), problems


# ── Main loop ────────────────────────────────────────────────────────────────

def dry_run(cases, models):
    """Show exactly what each call would send — no API key, no cost. Proves each
    generation is one independent call with fresh context (only the system prompt
    + that single vignette; nothing from other cases or models is included)."""
    print(f"DRY RUN — {len(cases)} cases x {len(models)} models = "
          f"{len(cases)*len(models)} independent API calls. Nothing is sent.\n")
    n = 0
    for case in cases:
        for model in models:
            n += 1
            print(f"── call #{n}: case{case['id']} → {model} ({MODEL_IDS[model]}), reasoning={REASONING[model]} ──")
            print(f"   system  : prompt.txt ({len(PROMPT)} chars)")
            print(f"   user    : case {case['id']} vignette ({len(case['vignette'])} chars)")
            print(f"             first line: {case['vignette'].splitlines()[0][:70]}…")
            print(f"   context : FRESH — no prior messages, no other cases/models\n")
    print("Each line above is a separate request. Remove --dry-run to actually run.")


def main():
    import argparse
    p = argparse.ArgumentParser()
    p.add_argument("--dry-run", action="store_true")
    p.add_argument("--models", help="comma list to run, e.g. gemini  or  claude,gpt (default: all)")
    p.add_argument("--cases", help="comma list of case ids to run, e.g. 5  or  2,5 (default: all)")
    args = p.parse_args()

    models = (args.models.split(",") if args.models else MODELS)
    models = [m for m in models if m in GENERATORS]
    case_ids = {int(x) for x in args.cases.split(",")} if args.cases else None
    cases = [c for c in VIGNETTES if case_ids is None or c["id"] in case_ids]

    if args.dry_run:
        return dry_run(cases, models)

    print(f"Generating {len(cases)} cases x {len(models)} models = "
          f"{len(cases)*len(models)} rubrics")
    print("Models:", models, "  Cases:", [c["id"] for c in cases])
    print("Reasoning:", {m: REASONING[m] for m in models}, "\n")

    summary = []
    for case in cases:
        for model in models:
            tag = f"case{case['id']}__{model}"
            print(f"→ {tag} ({MODEL_IDS[model]}) …", end=" ", flush=True)
            rec = {
                "case_id": case["id"], "case_title": case["title"],
                "model_key": model, "model_id": MODEL_IDS[model],
                "reasoning": REASONING[model],
                "generated_at_utc": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            }
            try:
                rubric = GENERATORS[model](case["vignette"])
                ok, problems = check(rubric)
                rec["rubric"] = rubric
                rec["invariant_ok"] = ok
                rec["invariant_problems"] = problems
                print("OK" if ok else f"⚠ INVARIANT FAIL: {'; '.join(problems)}")
            except Exception as e:
                rec["error"] = f"{type(e).__name__}: {e}"
                print(f"✗ ERROR: {rec['error']}")
            (OUT / f"{tag}.json").write_text(json.dumps(rec, ensure_ascii=False, indent=2), encoding="utf-8")
            summary.append((tag, rec.get("invariant_ok"), rec.get("error")))

    print("\n─── SUMMARY ───")
    for tag, ok, err in summary:
        status = "ERROR" if err else ("PASS" if ok else "INVARIANT-FAIL")
        print(f"  {status:15} {tag}")
    fails = [t for t, ok, err in summary if err or not ok]
    if fails:
        print(f"\n{len(fails)} need attention (regenerate — do NOT hand-edit the content):")
        for t in fails:
            print(f"  - {t}")
    else:
        print("\nAll rubrics passed the invariant check.")


if __name__ == "__main__":
    main()
