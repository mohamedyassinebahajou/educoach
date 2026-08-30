# EduCoach JS

YouCode **SAS** JavaScript learning app (Next.js): **Learn** · **Exercises** · **Progress** · **Coach**.

Aligned with [`docs/YOUCODE_SAS_PROGRAM.md`](../../docs/YOUCODE_SAS_PROGRAM.md): core JS only (no DOM). Calendar days Mon 31 Aug → project defense.

Python EduCoach PoC stays at repo root (`src/`, Streamlit) — this app is separate.

## Run (Step 1 done)

```bash
cd apps/educoach-js
npm install
npm run dev
```

Open http://localhost:3000

## Guided steps

See [`docs/EDUCOACH_JS_IMPLEMENTATION_STEPS.md`](../../docs/EDUCOACH_JS_IMPLEMENTATION_STEPS.md) and wireframes [`docs/EDUCOACH_JS_SCREENS_AND_WIREFRAMES.md`](../../docs/EDUCOACH_JS_SCREENS_AND_WIREFRAMES.md).

| Step | Status |
|------|--------|
| 1 Scaffold + app shell | **done** |
| 2 Learn home + MDX lessons | **done** |
| 3 Lesson page + Try-it | **done** |
| 4 Exercise catalog + detail | **done** |
| 5 Solve workspace + tests | **done** |
| 6 Auth + SQLite DB | **done** |
| 7 Progress + coach board | **done** |
| 8 Tutor / Helper API | **done** |

SAS-aligned content: **24 lessons** · **20 exercises** (see `docs/YOUCODE_SAS_PROGRAM.md`).

## Database

PostgreSQL via Prisma (Neon recommended for Vercel). See [`HOSTING-VERCEL.md`](./HOSTING-VERCEL.md).

```bash
npm run db:migrate   # schema changes (dev)
npm run db:deploy    # production migrations
npm run db:seed      # demo users
npm run db:studio    # browse tables
```

## Lesson Tutor (Python RAG)

**Ask Tutor** (lessons) → Concept Tutor + Chroma RAG.  
**Ask Helper** (exercises) → Code Helper (hints only). Both use FastAPI `POST /chat`.

```bash
# from repo root
python -m src.rag.ingest --rebuild
```

```bash
# terminal 1 — from repo root
uvicorn src.api.main:app --reload --port 8000

# terminal 2
cd apps/educoach-js && npm run dev
```

Set `EDUCOACH_API_URL` in `.env` if the API is not on `:8000`. Optional `EDUCOACH_API_FALLBACK=local` uses local stubs when the API is down.

## Hosting

See **[`HOSTING.md`](./HOSTING.md)** for Docker, VPS, HTTPS, and environment setup.

Quick Docker deploy:

```bash
cd apps/educoach-js
cp .env.production.example .env   # set AUTH_SECRET
docker compose up -d --build
```

**Vercel + Neon (GitHub):** [`HOSTING-VERCEL.md`](./HOSTING-VERCEL.md).  
**Google Cloud (free e2-micro):** [`HOSTING-GCP.md`](./HOSTING-GCP.md).  
**AWS Free Tier EC2:** [`HOSTING-AWS.md`](./HOSTING-AWS.md).
