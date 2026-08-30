"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { ExerciseOutputExamples } from "@/components/exercises/ExerciseOutputExamples";
import { useI18n } from "@/components/i18n/I18nProvider";
import { formatMessage } from "@/lib/i18n/messages";
import { getNextExercise, type Exercise, type ExerciseHint } from "@/lib/exercises";
import { pointsRemaining } from "@/lib/exerciseScoring";
import { gradeExercise, type GradeResult } from "@/lib/gradeExercise";
import { runConsoleSandbox } from "@/lib/runSandbox";

type AttemptRecord = {
  exerciseId: string;
  code: string;
  passed: boolean;
  passedCount: number;
  totalCount: number;
  at: string;
};

type StoredProgress = {
  hintsRevealed: number;
  completed: boolean;
};

function storageKey(exerciseId: string) {
  return `educoach-exercise-${exerciseId}`;
}

function readProgress(exerciseId: string): StoredProgress {
  if (typeof window === "undefined") return { hintsRevealed: 0, completed: false };
  try {
    const raw = localStorage.getItem(storageKey(exerciseId));
    if (!raw) return { hintsRevealed: 0, completed: false };
    const data = JSON.parse(raw) as StoredProgress;
    return {
      hintsRevealed: Number(data.hintsRevealed) || 0,
      completed: Boolean(data.completed),
    };
  } catch {
    return { hintsRevealed: 0, completed: false };
  }
}

function writeProgress(exerciseId: string, progress: StoredProgress) {
  localStorage.setItem(storageKey(exerciseId), JSON.stringify(progress));
}

function formatRunOutput(lines: string[], emptyLabel: string): string {
  return lines.length > 0 ? lines.join("\n") : emptyLabel;
}

type SolveWorkspaceProps = {
  exercise: Exercise;
};

export function SolveWorkspace({ exercise }: SolveWorkspaceProps) {
  const { t } = useI18n();
  const router = useRouter();
  const editorId = useId();
  const outputId = useId();
  const [code, setCode] = useState(exercise.starterCode ?? "");
  const [hintsRevealed, setHintsRevealed] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [attempts, setAttempts] = useState<AttemptRecord[]>([]);
  const [justSubmitted, setJustSubmitted] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [runOutput, setRunOutput] = useState<string>(t.tryIt.clickRun);
  const [runIsError, setRunIsError] = useState(false);
  const [grade, setGrade] = useState<GradeResult | null>(null);

  const isGraded = exercise.kind === "code" && (exercise.checks?.length ?? 0) > 0;
  const nextExercise = useMemo(() => getNextExercise(exercise.id), [exercise.id]);
  const hints = exercise.hints;
  const revealedHints: ExerciseHint[] = hints.slice(0, hintsRevealed);
  const remaining = pointsRemaining(exercise.maxPoints, revealedHints);

  useEffect(() => {
    const saved = readProgress(exercise.id);
    setHintsRevealed(saved.hintsRevealed);
    setCompleted(saved.completed);
  }, [exercise.id]);

  useEffect(() => {
    writeProgress(exercise.id, { hintsRevealed, completed });
  }, [exercise.id, hintsRevealed, completed]);

  const loadAttempts = useCallback(async () => {
    const res = await fetch(`/api/attempts?exerciseId=${encodeURIComponent(exercise.id)}`);
    if (res.status === 401) {
      setAuthError(t.solve.signInRequired);
      return;
    }
    if (!res.ok) return;
    const data = (await res.json()) as { attempts: AttemptRecord[] };
    setAttempts(data.attempts);
    if (data.attempts[0]?.code) setCode(data.attempts[0].code);
    if (data.attempts.some((a) => a.passed)) setCompleted(true);
  }, [exercise.id, t.solve.signInRequired]);

  useEffect(() => {
    void loadAttempts();
  }, [loadAttempts]);

  const revealNextHint = useCallback(() => {
    setHintsRevealed((n) => Math.min(n + 1, hints.length));
  }, [hints.length]);

  const resetHints = useCallback(() => {
    setHintsRevealed(0);
    setCompleted(false);
    setJustSubmitted(false);
    setGrade(null);
  }, []);

  const runCode = useCallback(() => {
    const result = runConsoleSandbox(code);
    if (!result.ok) {
      setRunIsError(true);
      setRunOutput(result.error ?? t.solve.runtimeError);
      return;
    }
    setRunIsError(false);
    setRunOutput(formatRunOutput(result.lines, t.tryIt.noOutput));
  }, [code, t.solve.runtimeError, t.tryIt.noOutput]);

  const runTests = useCallback(() => {
    if (!exercise.checks?.length) return;
    const result = gradeExercise(code, exercise.checks);
    setGrade(result);
    if (result.runtimeError) {
      setRunIsError(true);
      setRunOutput(result.runtimeError);
    } else {
      setRunIsError(false);
      setRunOutput(formatRunOutput(result.consoleLines, t.tryIt.noOutput));
    }
  }, [code, exercise.checks, t.tryIt.noOutput]);

  const goToNextExercise = useCallback(() => {
    if (nextExercise) {
      router.push(`/exercises/${nextExercise.id}/solve`);
      return;
    }
    router.push("/exercises");
  }, [nextExercise, router]);

  const skipChallenge = useCallback(() => {
    goToNextExercise();
  }, [goToNextExercise]);

  const submitAttempt = useCallback(
    async (passed: boolean, advanceAfter = false) => {
      const res = await fetch("/api/attempts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: exercise.id,
          code,
          passed,
          passedCount: passed ? remaining : 0,
          totalCount: exercise.maxPoints,
        }),
      });
      if (res.status === 401) {
        setAuthError(t.solve.signInRequiredSubmit);
        return false;
      }
      if (!res.ok) return false;
      if (passed) {
        setCompleted(true);
        setJustSubmitted(true);
        await loadAttempts();
        if (advanceAfter) goToNextExercise();
      }
      return true;
    },
    [
      code,
      exercise.id,
      exercise.maxPoints,
      goToNextExercise,
      loadAttempts,
      remaining,
      t.solve.signInRequiredSubmit,
    ],
  );

  const submitSolution = useCallback(async () => {
    if (isGraded) {
      if (!grade?.passed) {
        runTests();
        return;
      }
      await submitAttempt(true, true);
      return;
    }
    await submitAttempt(true, true);
  }, [grade?.passed, isGraded, runTests, submitAttempt]);

  const resetDraft = useCallback(() => {
    setCode(exercise.starterCode ?? "");
    setJustSubmitted(false);
    setGrade(null);
    setRunOutput(t.tryIt.clickRun);
    setRunIsError(false);
  }, [exercise.starterCode, t.tryIt.clickRun]);

  const statusLabel = useMemo(() => {
    if (completed) return t.solve.completed;
    if (grade?.passed) return t.solve.testsPassed;
    if (hintsRevealed > 0 || grade) return t.solve.inProgress;
    return t.solve.notStarted;
  }, [completed, grade, hintsRevealed, t.solve]);

  const nextHint = hints[hintsRevealed];
  const canSubmitGraded = !isGraded || grade?.passed === true;
  const submitLabel = isGraded ? t.solve.submitSolution : t.solve.markComplete;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[var(--muted)]">
            <Link href={`/exercises/${exercise.id}`} className="hover:underline">
              ← {exercise.title}
            </Link>{" "}
            · {formatMessage(t.exercises.dayLabel, { n: exercise.day })} · {statusLabel}
          </p>
          <h1 className="mt-1 font-[family-name:var(--font-display)] text-2xl text-[var(--ink)] sm:text-3xl">
            {exercise.title}
          </h1>
          <p className="mt-2 max-w-2xl whitespace-pre-wrap text-sm text-[var(--ink)]">
            {exercise.prompt}
          </p>
          <p className="mt-3 text-sm font-semibold text-[var(--accent)]">
            {formatMessage(t.solve.pointsRemaining, {
              remaining,
              max: exercise.maxPoints,
            })}
          </p>
          <p className="mt-1 text-xs text-[var(--muted)]">
            {isGraded ? t.solve.gradedHint : t.solve.noSolutions}
            {nextExercise ? ` ${t.solve.autoAdvanceHint}` : ""}
          </p>
          {authError ? (
            <p className="mt-2 text-sm text-[#9f1239]">
              {authError}{" "}
              <Link href={`/login?next=/exercises/${exercise.id}/solve`} className="underline">
                {t.solve.signIn}
              </Link>
            </p>
          ) : (
            <p className="mt-2 text-xs text-[var(--muted)]">{t.solve.attemptsSaved}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {nextHint ? (
            <button
              type="button"
              onClick={revealNextHint}
              className="rounded-md border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-semibold text-[var(--accent)]"
            >
              {formatMessage(t.solve.hintReveal, {
                n: hintsRevealed + 1,
                cost: nextHint.cost,
              })}
            </button>
          ) : hints.length > 0 ? (
            <span className="rounded-md border border-[var(--border)] px-3 py-1.5 text-sm text-[var(--muted)]">
              {t.solve.allHintsUsed}
            </span>
          ) : null}
          <button
            type="button"
            onClick={resetHints}
            className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--ink)]"
          >
            {t.solve.resetHints}
          </button>
          {exercise.lessonSlug ? (
            <Link
              href={`/learn/${exercise.lessonSlug}`}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--ink)]"
            >
              {t.solve.openLesson}
            </Link>
          ) : null}
          {nextExercise ? (
            <button
              type="button"
              onClick={skipChallenge}
              className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--muted)] hover:text-[var(--ink)]"
              title={formatMessage(t.solve.skipToNextTitle, { title: nextExercise.title })}
            >
              {t.solve.skipToNext}
            </button>
          ) : null}
        </div>
      </header>

      {revealedHints.length > 0 ? (
        <ul className="space-y-2 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--ink)]">
          {revealedHints.map((hint, i) => (
            <li key={i}>
              <span className="font-semibold">
                {formatMessage(t.solve.hintLabel, { n: i + 1 })} (−{hint.cost} pts):
              </span>{" "}
              {hint.text}
            </li>
          ))}
        </ul>
      ) : null}

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

      <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <aside className="space-y-4">
          {isGraded && exercise.visibleTests?.length ? (
            <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                {t.solve.autoChecks}
              </h2>
              <ul className="mt-2 space-y-1 text-sm text-[var(--ink)]">
                {exercise.visibleTests.map((label, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[var(--muted)]">•</span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
              {t.exercises.scoringTitle}
            </h2>
            <ul className="mt-2 space-y-1 text-sm text-[var(--ink)]">
              {hints.map((hint, i) => (
                <li key={i} className={i < hintsRevealed ? "text-[var(--accent)]" : "text-[var(--muted)]"}>
                  Hint {i + 1}: −{hint.cost} pts
                  {i < hintsRevealed ? " ✓" : ""}
                </li>
              ))}
            </ul>
            {justSubmitted && completed ? (
              <p className="mt-3 text-sm font-semibold text-[var(--accent)]">
                {formatMessage(t.solve.markedComplete, { points: remaining })}
              </p>
            ) : null}
          </section>

          {grade ? (
            <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                {t.solve.testResults}
              </h2>
              <ul className="mt-2 space-y-2 text-sm">
                {grade.checks.map((check) => (
                  <li
                    key={check.id}
                    className={check.passed ? "text-[var(--accent)]" : "text-[#9f1239]"}
                  >
                    {check.passed ? "✓" : "✗"} {check.label}
                    {check.detail ? (
                      <pre className="mt-1 whitespace-pre-wrap text-xs text-[var(--muted)]">
                        {check.detail}
                      </pre>
                    ) : null}
                  </li>
                ))}
              </ul>
              {grade.passed ? (
                <p className="mt-3 text-sm font-semibold text-[var(--accent)]">{t.solve.testsPassed}</p>
              ) : (
                <p className="mt-3 text-sm text-[var(--muted)]">{t.solve.testsMustPass}</p>
              )}
            </section>
          ) : null}

          {attempts.length > 0 ? (
            <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4">
              <h2 className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
                {t.solve.history}
              </h2>
              <ul className="mt-2 space-y-1 text-xs text-[var(--muted)]">
                {attempts.slice(0, 5).map((a) => (
                  <li key={a.at}>
                    {new Date(a.at).toLocaleString()} · {a.passedCount}/{a.totalCount} pts
                    {a.passed ? ` · ${t.solve.completed}` : ""}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>

        <section className="flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border)] bg-[var(--paper)] px-3 py-2">
            <label
              htmlFor={editorId}
              className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]"
            >
              {isGraded ? t.solve.codeEditor : t.solve.draftEditor}
            </label>
            <div className="flex flex-wrap gap-2">
              {isGraded ? (
                <>
                  <button
                    type="button"
                    onClick={runCode}
                    className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--ink)]"
                  >
                    {t.tryIt.run}
                  </button>
                  <button
                    type="button"
                    onClick={runTests}
                    className="rounded-md border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-semibold text-[var(--accent)]"
                  >
                    {t.solve.runTests}
                  </button>
                </>
              ) : null}
              <button
                type="button"
                onClick={() => void submitSolution()}
                disabled={isGraded && !canSubmitGraded}
                className="rounded-md bg-[var(--accent)] px-3 py-1.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitLabel}
              </button>
              <button
                type="button"
                onClick={resetDraft}
                className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-semibold text-[var(--ink)]"
              >
                {t.solve.reset}
              </button>
            </div>
          </div>
          <textarea
            id={editorId}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setGrade(null);
            }}
            spellCheck={false}
            className="min-h-[280px] w-full resize-y bg-[#0b1220] p-3 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[#e8eef5] outline-none"
          />
          {isGraded ? (
            <div className="border-t border-[var(--border)] bg-[var(--paper)]">
              <p
                id={outputId}
                className="border-b border-[var(--border)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--muted)]"
              >
                {t.tryIt.output}
              </p>
              <pre
                aria-labelledby={outputId}
                className={`max-h-40 overflow-auto px-3 py-2 font-[family-name:var(--font-mono)] text-xs leading-relaxed ${
                  runIsError ? "text-[#9f1239]" : "text-[var(--ink)]"
                }`}
              >
                {runOutput}
              </pre>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
