#!/bin/sh
set -e

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required (PostgreSQL)."
  exit 1
fi

echo "EduCoach JS — applying database migrations…"
npx prisma migrate deploy

echo "EduCoach JS — ensuring demo users exist…"
npx tsx prisma/seed.ts

echo "EduCoach JS — starting on port ${PORT:-3000}…"
exec "$@"
