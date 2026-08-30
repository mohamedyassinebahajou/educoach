export function formatSandboxValue(value: unknown): string {
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean" || value === null) {
    return String(value);
  }
  if (typeof value === "undefined") return "undefined";
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}

export type SandboxResult = {
  ok: boolean;
  lines: string[];
  error?: string;
};

/** Run beginner JS in-browser; capture console output. No DOM / network. */
export function runConsoleSandbox(code: string): SandboxResult {
  const lines: string[] = [];
  const fakeConsole = {
    log: (...args: unknown[]) => {
      lines.push(args.map(formatSandboxValue).join(" "));
    },
    info: (...args: unknown[]) => {
      lines.push(args.map(formatSandboxValue).join(" "));
    },
    warn: (...args: unknown[]) => {
      lines.push("⚠ " + args.map(formatSandboxValue).join(" "));
    },
    error: (...args: unknown[]) => {
      lines.push("✖ " + args.map(formatSandboxValue).join(" "));
    },
  };

  try {
    const runner = new Function(
      "console",
      `"use strict";\n${code}`,
    ) as (c: typeof fakeConsole) => void;
    runner(fakeConsole);
    return { ok: true, lines };
  } catch (err) {
    return {
      ok: false,
      lines,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
