# Deploy EduCoach JS on Vercel + Neon (GitHub)

The app uses **PostgreSQL** (Neon) instead of SQLite, so it runs on Vercel serverless with persistent auth, progress, and attempts.

---

## 1. Create Neon database

1. Sign up at [neon.tech](https://neon.tech) (free tier).
2. Create a project (e.g. `educoach`).
3. Copy **two** connection strings from the dashboard:
   - **Pooled** → `DATABASE_URL` (hostname contains `-pooler`)
   - **Direct** → `DIRECT_URL` (for migrations during build)

Both should include `?sslmode=require`.

---

## 2. Push code to GitHub

Ensure the repo includes `apps/educoach-js` with this Postgres setup.

---

## 3. Import on Vercel

1. [vercel.com](https://vercel.com) → **Add New → Project** → import your GitHub repo.
2. **Root Directory:** `apps/educoach-js` (Edit → set path).
3. Framework: **Next.js** (auto-detected).
4. **Environment variables** (Production + Preview):

| Variable | Value |
|----------|--------|
| `DATABASE_URL` | Neon **pooled** connection string |
| `DIRECT_URL` | Neon **direct** connection string |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `EDUCOACH_API_FALLBACK` | `local` |
| `EDUCOACH_API_URL` | optional Python API URL |

5. **Deploy**.

Build runs `vercel-build`:

```bash
prisma generate && prisma migrate deploy && tsx prisma/seed.ts && next build
```

Demo users are seeded automatically (`coach` / `coach123`, `student1…5` / `student123`).

---

## 4. Open the site

Vercel gives you a URL like `https://your-project.vercel.app`.

---

## Local dev with Neon

```bash
cd apps/educoach-js
cp .env.example .env
# Paste Neon URLs into DATABASE_URL (and DIRECT_URL for migrations)
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

---

## Local dev with Docker Postgres

```bash
cd apps/educoach-js
cp .env.production.example .env
# Set AUTH_SECRET only — compose provides DATABASE_URL to the web service
docker compose up -d --build
```

---

## Optional: Python Tutor API

Vercel hosts **only** the Next.js app. For RAG Tutor:

1. Deploy Python API elsewhere (Render, Railway, EC2…).
2. Set `EDUCOACH_API_URL` on Vercel to that base URL.
3. Or keep `EDUCOACH_API_FALLBACK=local` for stub responses.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Build fails on `migrate deploy` | Set `DIRECT_URL` to Neon **direct** (non-pooler) URL |
| `Can't reach database` at runtime | Use **pooled** URL for `DATABASE_URL`; check `sslmode=require` |
| Login works locally, not on Vercel | `AUTH_SECRET` must be set on Vercel |
| Build timeout | ~600 static pages — first build can take several minutes |

---

## Updates

Push to GitHub → Vercel redeploys automatically. Migrations run on each build.

See also: [`HOSTING-GITHUB.md`](./HOSTING-GITHUB.md) · [`HOSTING.md`](./HOSTING.md)
