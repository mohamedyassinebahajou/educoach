import { execSync } from "node:child_process";
import { normalizeDatabaseUrl } from "./database-url.mjs";

function run(command, env = process.env) {
  execSync(command, { stdio: "inherit", env: { ...process.env, ...env } });
}

const pooledUrl = normalizeDatabaseUrl(process.env.DATABASE_URL?.trim());
const directUrl = normalizeDatabaseUrl(process.env.DIRECT_URL?.trim());
const migrateUrl = directUrl || pooledUrl;

if (!migrateUrl) {
  console.error(
    "\n❌ Vercel build: DATABASE_URL is missing.\n" +
      "   Add Neon *pooled* URL as DATABASE_URL in Vercel → Settings → Environment Variables.\n",
  );
  process.exit(1);
}

if (!directUrl) {
  console.warn(
    "\n⚠️  DIRECT_URL is not set. Using DATABASE_URL for migrations.\n" +
      "   Neon usually requires the *direct* (non-pooler) URL for prisma migrate deploy.\n" +
      "   Add DIRECT_URL from the Neon dashboard if migrations fail.\n",
  );
}

console.log("\n==> prisma generate");
run("npx prisma generate");

console.log("\n==> prisma migrate deploy");
run("npx prisma migrate deploy", { DATABASE_URL: migrateUrl });

console.log("\n==> seed demo users");
run("node scripts/seed-demo-users.mjs", { DATABASE_URL: migrateUrl });

console.log("\n==> next build");
run("npm run build");
