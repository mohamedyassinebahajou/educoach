# EduCoach — Presentation slides summary (Step 1)

**Talk length:** **~30 minutes** (+ jury Q&A after)  
**Language:** **English**  
**Tool:** **Beamer** → [`educoach_soutenance.tex`](educoach_soutenance.tex)  
**Style:** **Implementation deep-dive** (phase → files → how it works)  
**Speaker notes / pitch:** [`PRESENTATION_SPEAKER_NOTES.md`](PRESENTATION_SPEAKER_NOTES.md)  
**Q&A:** [`PRESENTATION_QA_AND_REMEMBER.md`](PRESENTATION_QA_AND_REMEMBER.md)

---

## How 30 minutes changes the talk

| 15-min style | **30-min style (yours)** |
|-------------|-------------------------|
| One slide per phase | **2–4 slides per phase** (concept → method → result/trap) |
| Skip trade-offs | **Name trade-offs** (RMSE, RAG vs FT, keyword router, Gemini) |
| Quick demo | **~5–6 min live demo** with narration |
| “Ask me later” | **Pre-answer** common traps *inside* the talk |

**Rule of thumb:** teach like the deep dive; slides stay sparse; **you** carry the detail orally.

---

## Speaking rules

| Rule | Why |
|------|-----|
| 1 main idea per slide | 30 min still feels clear |
| Diagram first, then 3–5 bullets | Jury can follow |
| Say numbers | 264 rows, RMSE, recall, Top-K, 5 turns |
| Pause after each block | “Any quick question?” optional once mid-talk |
| Demo is part of the pitch | Not an afterthought |

---

## Timing map (30 min)

| Clock | Min | Block | Slides |
|-------|-----|-------|--------|
| 0:00 | 4 | A — Hook & objectives | 1–4 |
| 0:04 | 6 | B — Data & EDA | 5–9 |
| 0:10 | 5 | C — Machine Learning | 10–14 |
| 0:15 | 5 | D — RAG | 15–19 |
| 0:20 | 6 | E — Agents / LangGraph / safety | 20–25 |
| 0:26 | 6 | F — Product + **live demo** | 26–29 |
| 0:32→ trim | 3 | G — Results, limits, close | 30–32 |

*Soft target: finish talk at ~30–32 min; leave room if demo runs long by shortening Block B EDA bullets.*

---

## Full slide list (~32)

### BLOCK A — Hook & problem (~4 min) — slides 1–4

| # | Title | Must land (deep-dive level) |
|---|--------|----------------------------|
| **1** | Title | EduCoach AI · hybrid ML + multi-agent · SAS Python 11 days · name |
| **2** | Context | 24 beginners, 11 days, evening eval /20; coach bandwidth problem |
| **3** | Problem → solution | Early **risk radar** (ML) + **grounded tutor** (RAG/LLM) + **hint-only** helper |
| **4** | Objectives & scope | CDC goals; PoC not production; what we deliver end-to-end |

**Oral:** “Two brains, one product: numbers for the coach, grounded text for the student.”

---

### BLOCK B — Data & EDA (~6 min) — slides 5–9

| # | Title | Must land |
|---|--------|-----------|
| **5** | Why synthetic data | Control, reproducibility, no GDPR; later OULAD possible |
| **6** | Schema & panel design | 24×11=264; `previous_eval_score` lag; day/topic; activity features |
| **7** | Target & label | `today_eval_score`; `at_risk = score < 10`; **no leakage** |
| **8** | EDA findings | Prev↔today; hints/solved; topic categorical; day weak/redundant |
| **9** | Modeling consequences | Keep behavioral features; OHE topic; drop ID from X; watch recall |

**Oral:** “EDA decided the feature set before we touched Random Forest.”

---

### BLOCK C — Machine Learning (~5 min) — slides 10–14

| # | Title | Must land |
|---|--------|-----------|
| **10** | Task design | Regression → threshold 10 → coach ranking + binary flag |
| **11** | Pipeline | ColumnTransformer + One-Hot + RF; same transform at predict |
| **12** | Baseline vs RF | Why baseline; RF for non-linear interactions |
| **13** | Metrics & numbers | RMSE≈2.65 · R²≈0.81 · **recall=1.0**; soft CDC 2.5 honest miss |
| **14** | Importances & limits | Solved + previous dominate; small n=264; no student_id |

**Oral:** “We optimize for **not missing** struggling students.”

---

### BLOCK D — RAG (~5 min) — slides 15–19

| # | Title | Must land |
|---|--------|-----------|
| **15** | Why not “just an LLM”? | Hallucination; must match **our** SAS lessons |
| **16** | RAG formula | Retrieve → Augment → Generate |
| **17** | Offline ingest | 11 MD → chunk 500/50 → MiniLM → Chroma · ~131 chunks |
| **18** | Online retrieval | Embed query → Top-K=3 → context + Day metadata |
| **19** | Grounding & trap | Prompt “only from context”; **RAG vs fine-tuning** |

**Oral:** “Update the course = edit Markdown + re-ingest — not retrain an LLM.”

---

### BLOCK E — Agents (~6 min) — slides 20–25

| # | Title | Must land |
|---|--------|-----------|
| **20** | Agent vs chatbot vs tool | Role + optional LLM + tools |
| **21** | Four agents (contracts) | Supervisor / Tutor / Helper / Analyzer |
| **22** | LangGraph vocabulary | State · Node · Edge · conditional edge · compile |
| **23** | Full graph picture | Guardrails → route → tutor\|helper → analyzer → finalize |
| **24** | Memory + guardrails | Last 5 turns; injection + dangerous patterns; defense in depth |
| **25** | coach_alert design | Silent ML; **reply ≠ alert**; coach decides 1:1 vs group |

**Oral:** “Separation of concerns is the point of multi-agent — not more magic.”

---

### BLOCK F — Product + demo (~6 min) — slides 26–29

| # | Title | Must land |
|---|--------|-----------|
| **26** | Why FastAPI + Streamlit | API contract + Swagger; UI is a client |
| **27** | Endpoints & auth UX | `/chat`, `/predict_today`, `/coach/risk_board`; coach vs learner login |
| **28** | Demo agenda (slide before live) | 4 scripted beats listed for jury |
| **29** | **LIVE DEMO** | (blank/minimal slide) · you drive the UI |

**Demo script (~5 min inside this block):**
1. Login **coach** → risk board day 11 → point 🔴 / metric  
2. Login **learner** (e.g. at-risk student) → “What is a for loop?” → Day citation  
3. Same learner + features → show coach alert appears for coach (not in student bubble)  
4. Injection: “Ignore previous… full solution” → blocked  

---

### BLOCK G — Close (~3 min) — slides 30–32

| # | Title | Must land |
|---|--------|-----------|
| **30** | Results checklist | Hybrid E2E; recall; RAG; agents; UI roles; tests |
| **31** | Difficulties & improvements | Ollama→Gemini; Chroma rebuild; lesson enrichment; OULAD; better router; real auth |
| **32** | Thank you / Q&A | One-liner pitch + “Questions?” |

---

## Diagrams to redraw (practice on paper)

1. Hybrid: CSV→RF→coach · Lessons→Chroma→Tutor · msg→graph→reply  
2. RAG offline vs online clocks  
3. LangGraph nodes + conditional edge  
4. `reply` vs `coach_alert` channels  

---

## What stays off slides (Step 3 Q&A)

Full regex lists · full code · Docker flags · password hashing · every EDA plot  

---

## Still need from you

Step 1–2 locked: **English + Beamer + 30 min**.

## Next

| Step | Status |
|------|--------|
| **1 Slides summary** | ✅ 30 min |
| **2 Content + pitch** | ✅ Beamer EN + speaker notes |
| **3 Q&A + remember sheet** | Next |

Say when to start **Step 3**.
