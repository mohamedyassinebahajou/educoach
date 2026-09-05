import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ExerciseOutputExamples } from "@/components/exercises/ExerciseOutputExamples";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { assertLearnerCanAccessExerciseDay } from "@/lib/dayAccess";
import { exercises, getExercise, getNextExercise, type Difficulty } from "@/lib/exercises";
import { getI18n } from "@/lib/i18n/server";
import { formatMessage } from "@/lib/i18n/messages";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return exercises.map((e) => ({ id: e.id }));
}

export default async function ExerciseDetailPage({ params }: PageProps) {
  const { id } = await params;
  const { t } = await getI18n();
  const exercise = getExercise(id);
  if (!exercise) notFound();

  const user = await getSession();
  if (user?.role === "learner") {
    const allowed = await assertLearnerCanAccessExerciseDay(user.id, exercise.day);
    if (!allowed) redirect(`/learn/locked?day=${exercise.day}`);
  }

  const nextExercise = getNextExercise(id);

  const difficultyLabel: Record<Difficulty, string> = {
    easy: t.difficulty.easy,
    medium: t.difficulty.medium,
    hard: t.difficulty.hard,
    extreme: t.difficulty.extreme,
  };

  return (
    <PageShell
      title={exercise.title}
      subtitle={`${formatMessage(t.exercises.dayLabel, { n: exercise.day })} · ${difficultyLabel[exercise.difficulty]} · ${formatMessage(t.exercises.points, { n: exercise.maxPoints })}`}
    >
      <div className="max-w-2xl space-y-6">
        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            {t.exercises.prompt}
          </h2>
          <p className="mt-2 whitespace-pre-wrap text-[var(--ink)]">{exercise.prompt}</p>
          <p className="mt-3 text-xs font-medium text-[var(--accent)]">
            {exercise.kind === "code" && (exercise.checks?.length ?? 0) > 0
              ? t.exercises.autoGraded
              : t.exercises.selfChecked}
          </p>
        </section>

        {exercise.outputExamples?.length ? (
          <ExerciseOutputExamples
            examples={exercise.outputExamples}
            title={t.exercises.outputExamplesTitle}
            labels={{
              console: t.exercises.outputExampleConsole,
              terminal: t.exercises.outputExampleTerminal,
              text: t.exercises.outputExampleText,
            }}
          />
        ) : null}

        {exercise.visibleTests?.length ? (
          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
              {t.exercises.checksTitle}
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-[var(--ink)]">
              {exercise.visibleTests.map((label, i) => (
                <li key={i}>• {label}</li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className="rounded-lg border border-[var(--accent)]/25 bg-[var(--accent-soft)] p-4 text-sm text-[var(--ink)]">
          <p>{t.exercises.scoringIntro}</p>
          <ul className="mt-3 space-y-1 font-mono text-xs">
            {exercise.hints.map((hint, i) => (
              <li key={i}>
                Hint {i + 1}: −{hint.cost} pts
              </li>
            ))}
          </ul>
        </section>

        {exercise.lessonSlug ? (
          <p className="text-sm text-[var(--muted)]">
            {t.exercises.readFirst}{" "}
            <Link
              href={`/learn/${exercise.lessonSlug}`}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              {t.exercises.openLesson}
            </Link>
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/exercises/${exercise.id}/solve`}
            className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {t.exercises.startSolve}
          </Link>
          {nextExercise ? (
            <Link
              href={`/exercises/${nextExercise.id}/solve`}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--muted)] transition hover:bg-[var(--paper)] hover:text-[var(--ink)]"
            >
              {t.exercises.skipToNext}
            </Link>
          ) : null}
          <Link
            href="/exercises"
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--paper)]"
          >
            {t.exercises.catalog}
          </Link>
        </div>

        <p className="text-xs text-[var(--muted)]">{t.exercises.solveHint}</p>
      </div>
    </PageShell>
  );
}
