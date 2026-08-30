# GitHub-linked free hosting

**Option B is implemented:** PostgreSQL + Vercel-ready (`vercel.json`, `vercel-build` script).

Deploy guide: **[`HOSTING-VERCEL.md`](./HOSTING-VERCEL.md)**

---

## Historical context (SQLite blockers)

EduCoach JS previously used **SQLite on disk** and **`better-sqlite3`**, which blocked serverless GitHub deploys. That has been replaced with **PostgreSQL (Neon)**.

---

## GitHub-linked platforms (free tier)

| Platform | GitHub deploy | Fits as-is? | Main issue |
|----------|---------------|-------------|------------|
| **Vercel** | ✅ Excellent | ❌ No | No persistent SQLite; native module |
| **Netlify** | ✅ Good | ❌ No | Same as Vercel |
| **Render** (Web Service) | ✅ Yes | ⚠️ Partial | **Free tier = ephemeral disk** → DB resets on redeploy |
| **Render** (Docker) | ✅ Yes | ⚠️ Partial | Same disk issue on free; use existing `Dockerfile` |
| **Railway** | ✅ Yes | ⚠️ Partial | Needs **volume** or external DB; not free long-term |
| **GitHub Pages** | ✅ | ❌ No | Static only — no login, no API |
| **Cloudflare Pages** | ✅ | ❌ No | No Node server / no SQLite |

**Bottom line:** for **real** login + saved progress on a free GitHub pipeline, you should **move the database off SQLite** (recommended: **Neon Postgres** or **Supabase Postgres**, both have free tiers).

---

## Option A — Minimal change (Render + Docker + GitHub)

**Good for:** quick public demo; **bad for:** keeping user data across redeploys.

### What stays the same

- Keep SQLite + current `Dockerfile`
- Keep `src/lib/db.ts` unchanged

### What you add

1. Push repo to GitHub.
2. [Render](https://render.com) → **New → Web Service** → connect repo.
3. Settings:
   - **Root directory:** `apps/educoach-js`
   - **Environment:** Docker
   - **Instance type:** Free
4. Environment variables:
   - `AUTH_SECRET` (required)
   - `EDUCOACH_API_FALLBACK=local`
5. Deploy.

### What is “stuck” / limited

- **Free Render disk is ephemeral** — every redeploy can **wipe** `educoach.db` (users, attempts, progress gone).
- Free service **sleeps** after ~15 min idle → slow cold start.
- **Python Tutor** still needs a separate host (or use `local` stubs).

### Optional repo file (`render.yaml`)

```yaml
services:
  - type: web
    name: educoach-js
    runtime: docker
    rootDir: apps/educoach-js
    plan: free
    envVars:
      - key: AUTH_SECRET
        sync: false
      - key: EDUCOACH_API_FALLBACK
        value: local
      - key: DATABASE_URL
        value: file:/data/educoach.db
```

(Paid Render disk or external DB fixes persistence.)

---

## Option B — Recommended (Vercel or Render + Neon Postgres)

**Good for:** free GitHub deploy **with persistent** auth, progress, and attempts.

### 1. Database: SQLite → Postgres (Neon)

1. Create free DB at [neon.tech](https://neon.tech) (or Supabase).
2. Copy connection string → `DATABASE_URL=postgresql://...`

**Change `prisma/schema.prisma`:**

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

**Change `src/lib/db.ts`** — drop the SQLite adapter:

```typescript
import { PrismaClient } from "@/generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
```

**Change `package.json`:**

- Remove: `@prisma/adapter-better-sqlite3`, `better-sqlite3`, `@types/better-sqlite3`
- Keep: `@prisma/client`, `prisma`

**Change `prisma/seed.ts`:** use `new PrismaClient()` (no file path / adapter).

**Run locally once:**

```bash
cd apps/educoach-js
npx prisma migrate diff ...   # or new migration for postgres
npx prisma migrate deploy
npx tsx prisma/seed.ts
```

(You’ll add a Postgres migration — SQLite SQL is not portable 1:1; often `prisma db push` for first deploy is enough for a test project.)

### 2. Vercel + GitHub

1. [vercel.com](https://vercel.com) → Import GitHub repo.
2. **Root Directory:** `apps/educoach-js`
3. **Framework:** Next.js
4. **Environment variables:**
   - `DATABASE_URL` — Neon URL (use **pooled** URL if Neon offers it for serverless)
   - `AUTH_SECRET`
   - `EDUCOACH_API_FALLBACK=local`
   - `EDUCOACH_API_URL` — optional
5. **Build command:** `prisma generate && prisma migrate deploy && next build`  
   (or run migrations in Neon console / CI separately)

**Optional `vercel.json` in `apps/educoach-js`:**

```json
{
  "buildCommand": "prisma generate && prisma migrate deploy && next build"
}
```

### 3. What works after Option B

| Feature | Status |
|---------|--------|
| Learn / exercises (static) | ✅ |
| Login / coach / progress | ✅ (Postgres) |
| Save attempts | ✅ |
| Solve workspace (Run / tests) | ✅ (in-browser sandbox) |
| Tutor RAG | ⚠️ Needs Python API elsewhere or `local` stubs |

### 4. Python API (optional)

Not deployable on Vercel as part of the same app. Options:

- Deploy repo root `Dockerfile` on **Render/Railway/Fly** separately
- Set `EDUCOACH_API_URL` on Vercel to that URL
- Or keep **`EDUCOACH_API_FALLBACK=local`** for testing without AI

---

## Option C — “Lessons only” (no code changes)

If you only need **Learn + exercise pages** without login:

- Not supported without forking — `/progress`, `/coach`, solve save, and middleware require auth + DB.
- You’d have to disable middleware routes and API usage (custom fork).

---

## Checklist summary

### Stuck without changes

- ❌ Vercel / Netlify / GitHub Pages with **current SQLite setup**
- ❌ Persistent user data on **Render free** with SQLite
- ❌ Bundled **Python Tutor** on the same free Next host

### Smallest GitHub deploy (accept data loss)

- [ ] Push to GitHub
- [ ] Render Docker, root `apps/educoach-js`
- [ ] Set `AUTH_SECRET`, `EDUCOACH_API_FALLBACK=local`

### Proper free GitHub deploy (recommended)

- [ ] Neon (or Supabase) Postgres + `DATABASE_URL`
- [ ] Prisma → `postgresql`, simplify `db.ts`, remove `better-sqlite3`
- [ ] New migration + seed
- [ ] Vercel **or** Render (Node) with root `apps/educoach-js`
- [ ] Env: `AUTH_SECRET`, `DATABASE_URL`, `EDUCOACH_API_FALLBACK=local`

---

## Suggested path for you

1. **Testing with GitHub + zero backend refactor:** Render Docker (**Option A**) — expect DB resets on redeploy.
2. **Real classroom testing:** Vercel + Neon (**Option B**) — one-time DB migration (~1–2 h of work).
3. **Full Tutor later:** host Python API separately and set `EDUCOACH_API_URL`.

If you want, we can implement **Option B** (Postgres + Vercel config) in this repo next.

See also: [`HOSTING.md`](./HOSTING.md) · [`HOSTING-AWS.md`](./HOSTING-AWS.md) · [`HOSTING-GCP.md`](./HOSTING-GCP.md)
