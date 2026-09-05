/**
 * Seed SAS cohort learners from scripts/cohort-users.json
 * Username = email address (lowercase). Re-run safe (upserts).
 */
import "dotenv/config";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import pg from "pg";
import { normalizeDatabaseUrl } from "./database-url.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const cohortPath = join(__dirname, "cohort-users.json");

const connectionString = normalizeDatabaseUrl(process.env.DATABASE_URL?.trim());
if (!connectionString) {
  console.error("DATABASE_URL is required.");
  process.exit(1);
}

function poolSsl(connectionString) {
  if (
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1") ||
    connectionString.includes("@db:")
  ) {
    return false;
  }
  if (connectionString.includes("neon.tech")) {
    return { rejectUnauthorized: false };
  }
  return undefined;
}

const pool = new pg.Pool({
  connectionString,
  ssl: poolSsl(connectionString),
});

async function upsertUser(username, passwordHash, displayName) {
  const id = crypto.randomUUID();
  await pool.query(
    `INSERT INTO "User" (id, username, "passwordHash", role, "displayName", "createdAt")
     VALUES ($1, $2, $3, 'learner'::"Role", $4, NOW())
     ON CONFLICT (username) DO UPDATE SET
       "passwordHash" = EXCLUDED."passwordHash",
       "displayName" = EXCLUDED."displayName",
       role = EXCLUDED.role`,
    [id, username, passwordHash, displayName],
  );
}

async function main() {
  const raw = readFileSync(cohortPath, "utf8");
  const users = JSON.parse(raw);
  if (!Array.isArray(users) || users.length === 0) {
    console.error("cohort-users.json must be a non-empty array.");
    process.exit(1);
  }

  for (const entry of users) {
    const email = entry.email?.trim().toLowerCase();
    const password = entry.password ?? "";
    const displayName = entry.displayName?.trim();
    if (!email || !password || !displayName) {
      console.error("Each entry needs displayName, email, and password:", entry);
      process.exit(1);
    }
    const passwordHash = await bcrypt.hash(password, 10);
    await upsertUser(email, passwordHash, displayName);
    console.log(`  ✓ ${displayName} (${email})`);
  }

  console.log(`\nSeeded ${users.length} learner account(s). Sign in with email + password.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => pool.end());
