/** Strip channel_binding=require — breaks node-pg on Vercel. */
export function normalizeDatabaseUrl(url) {
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
