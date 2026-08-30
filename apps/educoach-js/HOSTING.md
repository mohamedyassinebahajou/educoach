# Hosting EduCoach JS

This app is **Next.js** with **PostgreSQL** (Prisma). Default deploy path: **Vercel + Neon** via GitHub.

**Vercel + Neon (recommended):** [`HOSTING-VERCEL.md`](./HOSTING-VERCEL.md)

**GitHub hosting notes:** [`HOSTING-GITHUB.md`](./HOSTING-GITHUB.md)

**Google Cloud e2-micro:** [`HOSTING-GCP.md`](./HOSTING-GCP.md) · **AWS EC2:** [`HOSTING-AWS.md`](./HOSTING-AWS.md)

---

## Quick start — Docker + local Postgres

```bash
cd apps/educoach-js
cp .env.production.example .env   # set AUTH_SECRET
docker compose up -d --build
```

Open **http://localhost:3000**

Demo accounts (seeded automatically):

| User | Password | Role |
|------|----------|------|
| `student1` … `student5` | `student123` | learner |
| `coach` | `coach123` | coach |

Data is stored in the Docker Postgres volume `educoach_pg`.

---

## HTTPS with a domain (Caddy reverse proxy)

Example Caddyfile on the same machine:

```caddy
educoach.example.com {
  reverse_proxy localhost:3000
}
```

Point DNS **A record** → your server IP, then reload Caddy.

---

## Optional: Python Tutor API

Lesson **Ask Tutor** / exercise **Helper** can call the repo’s FastAPI service.

1. Start the Python stack from repo root (see root `docker-compose.yml` and `README.md`).
2. Set in `apps/educoach-js/.env`:
   ```env
   EDUCOACH_API_URL=http://YOUR_API_HOST:8000
   ```
3. If the API is down, keep `EDUCOACH_API_FALLBACK=local` for stub responses.

Full stack (Python API + Next app) on one VPS:

```bash
# Terminal / compose project 1 — repo root
docker compose up -d api ollama ollama-init

# Terminal / compose project 2 — Next app
cd apps/educoach-js
# EDUCOACH_API_URL=http://YOUR_SERVER_IP:8000
docker compose up -d --build
```

---

## Manual deploy (no Docker)

On a Linux server with Node 20+:

```bash
cd apps/educoach-js
npm ci
cp .env.production.example .env
# Set AUTH_SECRET and DATABASE_URL=file:./prisma/prod.db

npx prisma migrate deploy
npx tsx prisma/seed.ts
npm run build
npm start -- -H 0.0.0.0 -p 3000
```

Use **pm2** or **systemd** to keep the process running:

```bash
npm install -g pm2
pm2 start npm --name educoach-js -- start -- -H 0.0.0.0 -p 3000
pm2 save
pm2 startup
```

---

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `AUTH_SECRET` | **Yes** (production) | Signs session cookies. Use `openssl rand -base64 32`. |
| `DATABASE_URL` | **Yes** | Neon **pooled** Postgres URL (or any PostgreSQL URL) |
| `DIRECT_URL` | Vercel/Neon builds | Neon **direct** URL for `prisma migrate deploy` |
| `EDUCOACH_API_URL` | No | Python FastAPI base URL (default `http://localhost:8000`) |
| `EDUCOACH_API_FALLBACK` | No | Set to `local` to use stubs when API is unreachable |
| `PORT` | No | Default `3000` |

---

## Platform notes

| Platform | Works? | Notes |
|----------|--------|-------|
| **Vercel + Neon** | ✅ Best | GitHub deploy, persistent Postgres |
| **VPS + Docker Compose** | ✅ | Includes local Postgres service |
| **Railway / Render** | ✅ | Set `DATABASE_URL` to hosted Postgres |
| **Static export** | ❌ | Auth, API routes, and DB require a server |

---

## Updates

```bash
cd apps/educoach-js
git pull
docker compose up -d --build
```

Migrations run automatically on container start.
