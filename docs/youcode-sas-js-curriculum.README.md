# YouCode SAS JS curriculum (source drafts)

| File | Description |
|------|-------------|
| [`youcode-sas-js-curriculum.md`](./youcode-sas-js-curriculum.md) | Original long-form draft (Aug 2026) |
| [`youcode-sas-js-curriculum-w3-extended.md`](./youcode-sas-js-curriculum-w3-extended.md) | W3Schools-style extended (earlier draft) |
| [`youcode-sas-js-curriculum-w3-detailed.md`](./youcode-sas-js-curriculum-w3-detailed.md) | **W3Schools-style detailed** — section headers, more examples, exercises + answers (**active import source**) |

| [`youcode-sas-js-exercise-bank.md`](./youcode-sas-js-exercise-bank.md) | **Exercise bank** — 12 per lesson, points + hints, no solutions (**active import source**) |

## Lessons import

From `apps/educoach-js`:

```bash
node scripts/import-w3-lessons.mjs
```

Writes 24 MDX lesson files. Each concept gets definition + analogy blocks from `scripts/concept-enrichment.mjs`.

## Exercise bank (points + hints)

Source: [`youcode-sas-js-exercise-bank.md`](./youcode-sas-js-exercise-bank.md)

```bash
cd apps/educoach-js
node scripts/import-exercise-bank.mjs
```

Imports **288 exercises** (12 per lesson × 24 lessons): 4 easy · 4 medium · 3 hard · 1 extreme. Hints cost points; no solutions in the bank.


## RAG (optional)

Lesson bodies for the Python Tutor still live in `data/lessons_js/` (separate from MDX). Re-sync and ingest when you want the Tutor to use this new wording.
