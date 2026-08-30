#!/bin/sh
set -e

if [ -z "${DATABASE_URL:-}" ]; then
  echo "DATABASE_URL is required (PostgreSQL)."
  exit 1
fi

echo "EduCoach JS — applying database migrations…"
MIGRATE_URL="${DIRECT_URL:-$DATABASE_URL}"
DATABASE_URL="$MIGRATE_URL" npx prisma migrate deploy

echo "EduCoach JS — ensuring demo users exist…"
DATABASE_URL="$MIGRATE_URL" node scripts/seed-demo-users.mjs

echo "EduCoach JS — starting on port ${PORT:-3000}…"
exec "$@"
