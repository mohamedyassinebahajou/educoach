import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { getAllLessons } from "@/lib/curriculum";
import { exercises } from "@/lib/exercises";
import { prisma } from "@/lib/db";
import { getLearnerProgress } from "@/lib/progress";

function Bar({ percent, label }: { percent: number; label: string }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span className="text-[var(--ink)]">{label}</span>
        <span className="font-mono text-[var(--muted)]">{percent}%</span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-[var(--paper)]">
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all"
          style={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
        />
      </div>
    </div>
  );
}

export default async function ProgressPage() {
  const user = await getSession();
  if (!user) redirect("/login?next=/progress");

  if (user.role === "coach") {
    redirect("/coach");
  }

  const progress = await getLearnerProgress(user.id);
  const doneLessons = await prisma.lessonProgress.findMany({
    where: { userId: user.id, completed: true },
  });
  const doneSet = new Set(doneLessons.map((d) => d.lessonSlug));
  const passedAttempts = await prisma.attempt.findMany({
    where: { userId: user.id, passed: true },
    distinct: ["exerciseId"],
  });
  const passedSet = new Set(passedAttempts.map((a) => a.exerciseId));

  const lessons = getAllLessons();
  const nextLesson = lessons.find((l) => !doneSet.has(l.slug));
  const nextExercise = exercises.find((e) => !passedSet.has(e.id));

  return (
    <PageShell
      title="My progress"
      subtitle={`${user.displayName} · 2-week JavaScript program`}
    >
      <div className="grid max-w-3xl gap-6">
        <section className="space-y-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <Bar percent={progress.docsPercent} label={`Docs (${progress.docsCompleted}/${progress.docsTotal} lessons)`} />
          <Bar
            percent={progress.exercisesPercent}
            label={`Exercises (${progress.exercisesPassed}/${progress.exercisesTotal} passed)`}
          />
          <p className="text-xs text-[var(--muted)]">
            Total attempts: {progress.totalAttempts} · Failed attempts: {progress.failedAttempts}
          </p>
        </section>

        <section className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            Today&apos;s path
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {nextLesson ? (
              <li>
                <Link href={`/learn/${nextLesson.slug}`} className="text-[var(--accent)] hover:underline">
                  Continue lesson: {nextLesson.title}
                </Link>
              </li>
            ) : (
              <li className="text-[var(--muted)]">All published lessons completed.</li>
            )}
            {nextExercise ? (
              <li>
                <Link href={`/exercises/${nextExercise.id}`} className="text-[var(--accent)] hover:underline">
                  Solve: {nextExercise.id} — {nextExercise.title}
                </Link>
              </li>
            ) : (
              <li className="text-[var(--muted)]">All published exercises passed.</li>
            )}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            Lessons
          </h2>
          <ul className="mt-2 space-y-1 text-sm">
            {lessons.map((l) => (
              <li key={l.slug} className="flex items-center gap-2">
                <span className="font-mono text-xs">{doneSet.has(l.slug) ? "✓" : "○"}</span>
                <Link href={`/learn/${l.slug}`} className="text-[var(--ink)] hover:underline">
                  {l.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-[var(--muted)]">
            Exercises
          </h2>
          <ul className="mt-2 space-y-1 text-sm">
            {exercises.map((e) => (
              <li key={e.id} className="flex items-center gap-2">
                <span className="font-mono text-xs">{passedSet.has(e.id) ? "✓" : "○"}</span>
                <Link href={`/exercises/${e.id}`} className="text-[var(--ink)] hover:underline">
                  {e.id} — {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
}
