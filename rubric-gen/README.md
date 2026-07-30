# Rubric generation

Generates history-taking rubrics from 3 LLMs (Claude Fable 5, GPT 5.6 Sol,
Gemini 3.1 Pro), one fresh call per (case × model), with structured JSON output
and an automatic invariant check (exactly 10 items, points sum to 100, 2 domains).

## 1. Install (once)

```bash
cd rubric-gen
python3 -m venv venv && source venv/bin/activate   # optional but tidy
pip install -r requirements.txt
```

## 2. Set your API keys

```bash
export ANTHROPIC_API_KEY=sk-ant-...      # platform.claude.com
export OPENAI_API_KEY=sk-...             # platform.openai.com
export GEMINI_API_KEY=...                # aistudio.google.com
```

(These live only in your shell session — nothing is written to disk.)

## 3. Confirm the vignettes

`vignettes.json` was extracted from the survey and has **all 5 cases**. Delete
the case(s) you're dropping (e.g. the UTI case) so the script only generates the
4 you want. To re-extract from `index.html`: `node extract_vignettes.js`.

## 4. Confirm 2 model IDs

Claude's ID (`claude-fable-5`) is confirmed. The GPT and Gemini IDs in
`generate_rubrics.py` (`OPENAI_MODEL`, `GEMINI_MODEL`) are best-guess — verify
the exact API strings against each provider's current model docs and update if
needed. Same for the reasoning-effort parameter names (each provider spells it
differently; the script notes where).

## 5. Run

```bash
python generate_rubrics.py
```

Reasoning is set to the strongest available on each model (see the `REASONING`
dict in `generate_rubrics.py`): Claude effort `max`; GPT effort `max` + mode
`pro`; Gemini `thinking_level` `high`. Each run is independent (no shared context
between cases). Output lands in `output/case<ID>__<model>.json`, each file
carrying the rubric, the invariant result, and the exact settings used (for the
methods section).

Preview without spending anything: `python3 generate_rubrics.py --dry-run`.

## Notes

- **Don't hand-edit a rubric that fails the invariant check** — that breaks
  "AI-generated." Re-run that one; the model produces a fresh sample.
- Only `claude-fable-5` is verified here; if a provider call errors, it's almost
  always the model ID or the reasoning-effort parameter — check the ⚠️ comments.
- Reproducibility: the run records model IDs, effort, and timestamps. Note the
  SDK versions (`pip freeze`) alongside for the paper.
