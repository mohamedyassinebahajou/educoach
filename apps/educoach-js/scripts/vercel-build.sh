#!/bin/sh
set -e

echo "==> prisma generate"
npx prisma generate

echo "==> prisma migrate deploy"
if [ -n "${DIRECT_URL:-}" ]; then
  DATABASE_URL="$DIRECT_URL" npx prisma migrate deploy
else
  npx prisma migrate deploy
fi

echo "==> seed demo users"
if [ -n "${DIRECT_URL:-}" ]; then
  DATABASE_URL="$DIRECT_URL" npx tsx prisma/seed.ts
else
  npx tsx prisma/seed.ts
fi

echo "==> next build"
npm run build
