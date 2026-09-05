"use client";

import type { ReactNode } from "react";

type LessonAnswerProps = {
  children: ReactNode;
};

/** Collapsible exercise answer — MDX-safe replacement for raw <details>. */
export function LessonAnswer({ children }: LessonAnswerProps) {
  return (
    <details
      suppressHydrationWarning
      className="not-prose my-4 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--paper)]"
    >
      <summary className="cursor-pointer select-none px-4 py-2 text-sm font-semibold text-[var(--accent)] hover:bg-[var(--surface)]">
        Answer
      </summary>
      <div className="lesson-prose border-t border-[var(--border)] px-4 py-3 text-sm text-[var(--ink)]">
        {children}
      </div>
    </details>
  );
}
