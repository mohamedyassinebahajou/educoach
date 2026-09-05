import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { CoachLearnerAccessControl } from "@/components/coach/CoachLearnerAccessControl";
import { CoachProgressBar } from "@/components/coach/CoachProgressBar";
import { CoachStatusBadge } from "@/components/coach/CoachStatusBadge";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { getAllLessons } from "@/lib/curriculum";
import { getCohortMaxUnlockedDay } from "@/lib/dayAccess";
import { prisma } from "@/lib/db";
import { exercises } from "@/lib/exercises";
import { formatMessage } from "@/lib/i18n/messages";
import { getI18n } from "@/lib/i18n/server";
import { getCoachLearnerDetail } from "@/lib/progress";

type PageProps = {
  params: Promise<{ userId: string }>;
};

export default async function CoachLearnerPage({ params }: PageProps) {
  const user = await getSession();
  if (!user) redirect("/login?next=/coach");
  if (user.role !== "coach") redirect("/?error=coach-only");

  const { userId } = await params;
  const { t } = await getI18n();
  const [learner, cohortMaxDay] = await Promise.all([
    getCoachLearnerDetail(userId),
    getCohortMaxUnlockedDay(),
  ]);
  if (!learner) notFound();

  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { maxUnlockedDay: true },
  });

  const statusLabels = {
    not_started: t.coach.statusNotStarted,
    active: t.coach.statusActive,
    on_track: t.coach.statusOnTrack,
    inactive: t.coach.statusInactive,
    at_risk: t.coach.statusAtRisk,
  };

  const completedLessons = new Set(learner.completedLessonSlugs);
  const passedExercises = new Set(learner.passedExerciseIds);
  const lessons = getAllLessons();

  return (
    <PageShell
      title={learner.displayName}
      subtitle={`${learner.username} · ${formatMessage(t.coach.learnerSince, {
        date: learner.createdAt.toLocaleDateString(),
      })}`}
    >
      <p className="-mt-4 mb-6">
        <Link href="/coach" className="text-sm text-[var(--accent)] hover:underline">
          {t.coach.backToDashboard}
        </Link>
      </p>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <section className="space-y-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex flex-wrap items-center gap-3">
              <CoachStatusBadge status={learner.status} labels={statusLabels} />
              {learner.currentDayLabel ? (
                <span className="text-sm text-[var(--muted)]">{learner.currentDayLabel}</span>
              ) : null}
              {learner.atRisk && learner.riskReason ? (
                <span className="text-sm text-[#9f1239]">{learner.riskReason}</span>
              ) : null}
            </div>
            <CoachProgressBar
              percent={learner.docsPercent}
              label={`${t.coach.lessonProgress} (${learner.docsCompleted}/${learner.docsTotal})`}
            />
            <CoachProgressBar
              percent={learner.exercisesPercent}
              label={`${t.coach.exerciseProgress} (${learner.exercisesPassed}/${learner.exercisesTotal})`}
            />
            <p className="text-xs text-[var(--muted)]">
              {t.coach.attempts}: {learner.totalAttempts} · {t.coach.failedAttempts}:{" "}
              {learner.failedAttempts}
            </p>
          </section>

          <CoachLearnerAccessControl
            userId={userId}
            learnerMaxDay={dbUser?.maxUnlockedDay ?? null}
            cohortMaxDay={cohortMaxDay}
            dayOptions={Array.from({ length: 10 }, (_, i) => i + 1).map((n) => ({
              value: n,
              label: formatMessage(t.coach.accessControlDayOption, { n: String(n) }),
            }))}
            labels={{
              title: t.coach.learnerAccessTitle,
              hint: t.coach.learnerAccessHint,
              save: t.coach.accessControlSave,
              saving: t.coach.accessControlSaving,
              saved: t.coach.accessControlSaved,
              error: t.coach.accessControlError,
              defaultOption: t.coach.learnerAccessDefault,
              cohortDefaultNote: formatMessage(t.coach.accessControlDayOption, {
                n: String(cohortMaxDay),
              }),
            }}
          />

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
              {t.coach.lessonProgress}
            </h2>
            <ul className="mt-3 space-y-1 text-sm">
              {lessons.map((lesson) => (
                <li key={lesson.slug} className="flex items-center gap-2">
                  <span className="font-mono text-xs">
                    {completedLessons.has(lesson.slug) ? "✓" : "○"}
                  </span>
                  <span className="text-[var(--ink)]">{lesson.title}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
              {t.coach.exerciseProgress}
            </h2>
            <ul className="mt-3 max-h-80 space-y-1 overflow-y-auto text-sm">
              {exercises.slice(0, 40).map((exercise) => (
                <li key={exercise.id} className="flex items-center gap-2">
                  <span className="font-mono text-xs">
                    {passedExercises.has(exercise.id) ? "✓" : "○"}
                  </span>
                  <span className="text-[var(--ink)]">
                    Day {exercise.day} · {exercise.title}
                  </span>
                </li>
              ))}
              {exercises.length > 40 ? (
                <li className="text-xs text-[var(--muted)]">
                  +{exercises.length - 40} more exercises…
                </li>
              ) : null}
            </ul>
          </section>
        </div>

        <aside>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            {t.coach.recentActivity}
          </h2>
          {learner.recentAttempts.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--muted)]">{t.coach.noActivity}</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {learner.recentAttempts.map((attempt) => (
                <li
                  key={attempt.id}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm"
                >
                  <p className="font-mono text-xs text-[var(--muted)]">{attempt.exerciseId}</p>
                  <p className="mt-1 text-[var(--ink)]">
                    {attempt.passed ? t.coach.passed : t.coach.failed} · {attempt.passedCount}/
                    {attempt.totalCount}
                  </p>
                  <p className="text-xs text-[var(--muted)]">
                    {attempt.createdAt.toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </PageShell>
  );
}
