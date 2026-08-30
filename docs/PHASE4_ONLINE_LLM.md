# Running the LLM online (if Ollama freezes your PC)

Local `llama3.2:3b` via Docker is heavy on CPU/RAM and can freeze the machine during Phase 4.

EduCoach supports switching providers with `.env` — **no agent code changes needed**.

## Recommended: Gemini 3.5 Flash-Lite (fast, cheap online)

1. Create an API key: https://aistudio.google.com/apikey  
2. Stop local Ollama to free RAM:

```bash
cd /home/ycode/Projet-FR-IA
docker compose stop ollama
```

3. In `.env`:

```env
LLM_PROVIDER=gemini
GOOGLE_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.5-flash-lite
```

4. Install (once):

```bash
source .venv/bin/activate
pip install langchain-google-genai
```

5. Test:

```bash
python - <<'EOF'
from src.agents.llm import get_llm, reset_llm_cache
from langchain_core.messages import HumanMessage
reset_llm_cache()
print(get_llm().invoke([HumanMessage(content="Reply with exactly: OK")]).content)
EOF
```

Then retry Concept Tutor / orchestrator as usual.

## Alternatives

| Provider | `.env` | Notes |
|----------|--------|--------|
| **Gemini** | `LLM_PROVIDER=gemini` + `GOOGLE_API_KEY` | `gemini-3.5-flash-lite` — fast & light |
| **Groq** | `LLM_PROVIDER=groq` + `GROQ_API_KEY` | Free tier option |
| **OpenAI** | `LLM_PROVIDER=openai` + `OPENAI_API_KEY` | Paid |
| **Ollama** | `LLM_PROVIDER=ollama` | Local; start with `docker compose up -d ollama` |

## What still runs locally

- RAG embeddings / Chroma (MiniLM) — lighter than the full LLM, usually OK  
- Random Forest predict — tiny  

Only the **chat generation** moves online.

## Demo note

CDC preferred local Ollama (no API budget). Using Groq for development/demo when hardware struggles is fine — mention it briefly if asked (“LLM via Groq API for performance; architecture unchanged”).
