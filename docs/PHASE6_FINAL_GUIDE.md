# Phase 6 — Finalization Guide (EduCoach AI)

**Project:** EduCoach AI  
**Goal:** Make the PoC **demo-ready**: Docker polish, Pytest, README, demo script, 10–12 slides, final checklist.  
**You write / run the steps.** Detailed typing guide: [`PHASE6_IMPLEMENTATION.md`](PHASE6_IMPLEMENTATION.md).

---

## 1. What Phase 6 delivers

```text
Working PoC (Phases 0–5)
        │
        ├─▶ Docker Compose that actually demos cleanly
        ├─▶ Pytest smoke tests (ML + guardrails + API)
        ├─▶ README that a jury can follow in 5 minutes
        ├─▶ Demo video script (3–4 min)
        ├─▶ Slide outline (10–12)
        └─▶ Final validation checklist (CDC)
```

### In / Out of scope

| In Phase 6 | Optional / later |
|------------|------------------|
| Polish existing Dockerfile + compose | Full cloud deploy |
| Unit + API tests | Heavy load tests |
| README rewrite | Marketing site |
| Demo + slides outline | Perfect design polish |
| Bonus CI workflow | MLflow tracking (bonus only) |

---

## 2. Files you will create / update

| File | Action |
|------|--------|
| `docker-compose.yml` | Polish (Gemini-friendly profile + keep Ollama option) |
| `Dockerfile` | Small cleanups if needed |
| `tests/test_predict.py` | Create |
| `tests/test_guardrails.py` | Create |
| `tests/test_api.py` | Create |
| `.github/workflows/ci.yml` | Bonus create |
| `README.md` | Rewrite for jury |
| `docs/DEMO_SCRIPT.md` | Create |
| `docs/SLIDES_OUTLINE.md` | Create |
| `docs/FINAL_CHECKLIST.md` | Create |

---

## 3. Build order

| Step | What | Why |
|------|------|-----|
| **1** | Pytest suite | Proves core logic without UI |
| **2** | Docker polish + `compose up` test | Jury demo path |
| **3** | README rewrite | First thing reviewers read |
| **4** | Demo script + record video | Live proof |
| **5** | Slides outline → PowerPoint | Soutenance |
| **6** | Final checklist | CDC sign-off |

---

## 4. Definition of Done

- [ ] `pytest` passes locally  
- [ ] `docker compose up --build` brings API + Streamlit (and Ollama **or** Gemini via `.env`)  
- [ ] README: install, architecture, demo URLs, LLM config  
- [ ] Demo script rehearsed (Dashboard → Chat → guardrail → coach alert)  
- [ ] 10–12 slides drafted  
- [ ] CDC validation boxes checked  

---

## 5. Important note about Docker + Gemini

Your machine freezes on local Ollama. For demos you have two modes:

| Mode | `.env` | Compose |
|------|--------|---------|
| **A — Online LLM (recommended for you)** | `LLM_PROVIDER=gemini` + `GOOGLE_API_KEY` | Run `api` + `streamlit` only (no Ollama) |
| **B — Full local (CDC default)** | `LLM_PROVIDER=ollama` | Full stack including `ollama` |

Phase 6 implementation shows both.
