/**
 * Neon dashboard URLs often include channel_binding=require, which breaks node-pg / Prisma on Vercel.
 */
export function normalizeDatabaseUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  try {
    const parsed = new URL(url);
    parsed.searchParams.delete("channel_binding");
    parsed.searchParams.delete("channelBinding");
    const isLocal =
      parsed.hostname === "localhost" ||
      parsed.hostname === "127.0.0.1" ||
      parsed.hostname === "db";
    if (isLocal) {
      parsed.searchParams.set("sslmode", "disable");
    } else if (!parsed.searchParams.has("sslmode")) {
      parsed.searchParams.set("sslmode", "require");
    }
    return parsed.toString();
  } catch {
    return url
      .replace(/([?&])channel_binding=require&?/gi, "$1")
      .replace(/([?&])channelBinding=require&?/gi, "$1")
      .replace(/\?&/, "?")
      .replace(/[?&]$/, "");
  }
}
