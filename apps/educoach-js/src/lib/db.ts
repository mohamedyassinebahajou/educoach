import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { normalizeDatabaseUrl } from "@/lib/databaseUrl";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
  pgPool?: Pool;
};

function poolSsl(connectionString: string) {
  if (
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1") ||
    connectionString.includes("@db:")
  ) {
    return false as const;
  }
  if (connectionString.includes("neon.tech")) {
    return { rejectUnauthorized: false } as const;
  }
  return undefined;
}

function poolConfig(connectionString: string) {
  return {
    connectionString,
    ssl: poolSsl(connectionString),
  };
}

function createPrisma() {
  const connectionString = normalizeDatabaseUrl(process.env.DATABASE_URL);
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  const pool = globalForPrisma.pgPool ?? new Pool(poolConfig(connectionString));
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pgPool = pool;
  }
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

/** Dev hot-reload keeps a global Prisma instance; drop it after `prisma generate`. */
function isStalePrismaClient(client: PrismaClient | undefined): client is undefined {
  if (!client) return true;
  return !("cohortSettings" in client);
}

const prismaInstance =
  !isStalePrismaClient(globalForPrisma.prisma) ? globalForPrisma.prisma : createPrisma();

export const prisma = prismaInstance;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
