"use client";

import { useCallback, useId, useState } from "react";

type TryItPanelProps = {
  initialCode?: string;
  title?: string;
  /** Tighter layout when embedded under each lesson example. */
  compact?: boolean;
};

function normalizeCode(value: string | undefined): string {
  return `${(value ?? "").trimEnd()}\n`;
}

function formatValue(value: unknown): string {
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

export function TryItPanel({
  initialCode,
  title = "Try it yourself",
  compact = false,
}: TryItPanelProps) {
  const editorId = useId();
  const [code, setCode] = useState(() => normalizeCode(initialCode));
  const [output, setOutput] = useState<string>("(click Run)");
  const [isError, setIsError] = useState(false);

  const run = useCallback(() => {
    const lines: string[] = [];
    const fakeConsole = {
      log: (...args: unknown[]) => {
        lines.push(args.map(formatValue).join(" "));
      },
      info: (...args: unknown[]) => {
        lines.push(args.map(formatValue).join(" "));
      },
      warn: (...args: unknown[]) => {
        lines.push("⚠ " + args.map(formatValue).join(" "));
      },
      error: (...args: unknown[]) => {
        lines.push("✖ " + args.map(formatValue).join(" "));
      },
    };

    try {
      const runner = new Function(
        "console",
        `"use strict";\n${code}`,
      ) as (c: typeof fakeConsole) => void;
      runner(fakeConsole);
      setIsError(false);
      setOutput(lines.length > 0 ? lines.join("\n") : "(no console output)");
    } catch (err) {
      setIsError(true);
      setOutput(err instanceof Error ? err.message : String(err));
    }
  }, [code]);

  const reset = useCallback(() => {
    setCode(normalizeCode(initialCode));
    setOutput("(click Run)");
    setIsError(false);
  }, [initialCode]);

  const minH = compact ? "min-h-36" : "min-h-48";

  return (
    <section
      className={`overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)] shadow-sm ${
        compact ? "mt-3" : "mt-8"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--paper)] px-4 py-2">
        <h2
          className={`font-[family-name:var(--font-display)] text-[var(--ink)] ${
            compact ? "text-base" : "text-lg"
          }`}
        >
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={run}
            className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Run
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--paper)]"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="grid gap-0 md:grid-cols-2">
        <div className="border-b border-[var(--border)] md:border-b-0 md:border-r">
          <label
            htmlFor={editorId}
            className="block border-b border-[var(--border)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]"
          >
            Editor
          </label>
          <textarea
            id={editorId}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            className={`${minH} w-full resize-y bg-[#0b1220] p-3 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#e8eef5] outline-none`}
          />
        </div>
        <div>
          <p className="border-b border-[var(--border)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            Output
          </p>
          <pre
            className={`${minH} overflow-auto p-3 font-[family-name:var(--font-mono)] text-sm leading-relaxed whitespace-pre-wrap ${
              isError ? "bg-[#fff1f0] text-[#9f1239]" : "bg-[#f8fafc] text-[var(--ink)]"
            }`}
          >
            {output}
          </pre>
        </div>
      </div>
    </section>
  );
}
