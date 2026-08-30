# EduCoach AI

Hybrid **ML + multi-agent** PoC for an IT coach managing 24 beginners
over an 11-day Python SAS bootcamp.

- Predict evening eval risk (Random Forest, at-risk if score < 10)
- Tutor students with RAG + Gemini/Ollama
- Code helper gives **hints only** (never full solutions)
- Coach dashboard ranks students by risk

## Architecture

[ASCII diagram: CSV → RF → Analyzer | Lessons → Chroma → Tutor | Supervisor → Helper]

## Stack

Python, scikit-learn, LangGraph, Chroma, FastAPI, Streamlit, Docker
LLM: Gemini 3.5 Flash-Lite (dev) / Ollama llama3.2:3b (optional local)

## Quick start (local)

```bash
cp .env.example .env   # set GOOGLE_API_KEY if using Gemini
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# data + model + vector_db should already exist from training/ingest {#data--model--vector\_db-should-already-exist-from-trainingingest  data-source-line="324"}
uvicorn src.api.main:app --reload --port 8000
# other terminal {#other-terminal  data-source-line="326"}
streamlit run src/ui/streamlit_app.py
``` {data-source-line="328"}

- API docs: http://localhost:8000/docs
- UI: http://localhost:8501

## Docker

```bash
docker compose up --build
# or Gemini overlay (see docs/PHASE6_IMPLEMENTATION.md) {#or-gemini-overlay-see-docsphase6\_implementationmd  data-source-line="337"}
``` {data-source-line="338"}

## Main endpoints

- `POST /chat`
- `POST /predict_today`
- `GET /coach/risk_board`

## Tests

```bash
pytest -q
``` {data-source-line="350"}

## Project status

- [x] EDA + synthetic data (24×11)
- [x] RF model + metrics
- [x] RAG (11 lessons, Chroma)
- [x] 4 LangGraph agents + guardrails + memory
- [x] FastAPI + Streamlit
- [x] Docker / tests / demo docs