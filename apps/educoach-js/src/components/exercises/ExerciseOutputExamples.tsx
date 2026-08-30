import type { ExerciseOutputExample } from "@/lib/exercises";

type ExerciseOutputExamplesProps = {
  examples: ExerciseOutputExample[];
  title: string;
  labels: {
    console: string;
    terminal: string;
    text: string;
  };
};

function mediumLabel(example: ExerciseOutputExample, labels: ExerciseOutputExamplesProps["labels"]) {
  if (example.medium === "console") return labels.console;
  if (example.medium === "terminal") return labels.terminal;
  return labels.text;
}

export function ExerciseOutputExamples({ examples, title, labels }: ExerciseOutputExamplesProps) {
  if (!examples.length) return null;

  return (
    <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">
      <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
        {title}
      </h2>
      <div className="mt-3 space-y-4">
        {examples.map((example, i) => (
          <div key={i}>
            <p className="mb-1.5 text-xs font-medium text-[var(--muted)]">
              {mediumLabel(example, labels)}
            </p>
            {example.medium === "text" ? (
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-[var(--ink)]">
                {example.body}
              </p>
            ) : (
              <pre className="overflow-x-auto rounded-md bg-[#0b1220] px-3 py-2.5 font-[family-name:var(--font-mono)] text-xs leading-relaxed text-[#e8eef5]">
                {example.body}
              </pre>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
