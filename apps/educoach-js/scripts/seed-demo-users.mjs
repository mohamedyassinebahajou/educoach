/**
 * Demo users seed — plain Node (no tsx). Used on Vercel build and Docker entrypoint.
 */
import "dotenv/config";
import bcrypt from "bcryptjs";
import pg from "pg";
import { normalizeDatabaseUrl } from "./database-url.mjs";

const connectionString = normalizeDatabaseUrl(process.env.DATABASE_URL?.trim());
if (!connectionString) {
  console.error("DATABASE_URL is required to seed demo users.");
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

async function upsertUser(username, passwordHash, role, displayName) {
  const id = crypto.randomUUID();
  await pool.query(
    `INSERT INTO "User" (id, username, "passwordHash", role, "displayName", "createdAt")
     VALUES ($1, $2, $3, $4::"Role", $5, NOW())
     ON CONFLICT (username) DO UPDATE SET
       "passwordHash" = EXCLUDED."passwordHash",
       role = EXCLUDED.role,
       "displayName" = EXCLUDED."displayName"`,
    [id, username, passwordHash, role, displayName],
  );
}

async function main() {
  const coachHash = await bcrypt.hash("coach123", 10);

  await upsertUser("coach", coachHash, "coach", "Coach");

  console.log("Seeded users:");
  console.log("  coach / coach123");
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => pool.end());
