import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ScoringRubricTable } from "@/components/exercises/ScoringRubricTable";
import { getSession } from "@/lib/auth";
import { curriculum } from "@/lib/curriculum";
import { getMaxUnlockedDayForUser, isDayUnlocked } from "@/lib/dayAccess";
import { exercises, listExerciseDays, type Difficulty } from "@/lib/exercises";
import { getI18n } from "@/lib/i18n/server";
import { formatMessage } from "@/lib/i18n/messages";

type SearchParams = Promise<{ day?: string }>;

export default async function ExercisesPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { t } = await getI18n();
  const user = await getSession();
  const maxUnlockedDay =
    user == null ? 10 : await getMaxUnlockedDayForUser(user.id, user.role ?? "learner");
  const difficultyLabel: Record<Difficulty, string> = {
    easy: t.difficulty.easy,
    medium: t.difficulty.medium,
    hard: t.difficulty.hard,
    extreme: t.difficulty.extreme,
  };

  const params = await searchParams;
  const dayFilter = params.day ? Number(params.day) : undefined;
  const days = listExerciseDays();
  const list =
    dayFilter && !Number.isNaN(dayFilter)
      ? exercises.filter((e) => e.day === dayFilter)
      : exercises;

  const lessonTitle = new Map(
    curriculum.flatMap((d) => d.lessons.map((l) => [l.slug, l.title] as const)),
  );

  const grouped = days
    .filter((d) => !dayFilter || d === dayFilter)
    .filter((d) => user?.role === "coach" || isDayUnlocked(d, maxUnlockedDay))
    .map((day) => ({
      day,
      lessons: curriculum
        .find((d) => d.day === day)
        ?.lessons.map((lesson) => ({
          slug: lesson.slug,
          title: lesson.title,
          items: list.filter((e) => e.lessonSlug === lesson.slug),
        }))
        .filter((g) => g.items.length > 0),
    }))
    .filter((g) => g.lessons && g.lessons.length > 0);

  return (
    <PageShell title={t.exercises.title} subtitle={t.exercises.subtitle}>
      <section className="mb-8 space-y-3">
        <h2 className="font-[family-name:var(--font-display)] text-lg text-[var(--ink)]">
          {t.exercises.scoringTitle}
        </h2>
        <p className="text-sm leading-relaxed text-[var(--muted)]">{t.exercises.scoringIntro}</p>
        <ScoringRubricTable
          labels={{
            tier: t.exercises.rubricTier,
            points: t.exercises.rubricPoints,
            hint1: t.exercises.rubricHint1,
            hint2: t.exercises.rubricHint2,
            hint3: t.exercises.rubricHint3,
          }}
          difficultyLabels={difficultyLabel}
        />
      </section>

      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm">
        <span className="text-[var(--muted)]">{t.exercises.filterByDay}</span>
        <Link
          href="/exercises"
          className={`rounded-md px-2.5 py-1 ${
            !dayFilter
              ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
              : "text-[var(--ink)] hover:bg-[var(--paper)]"
          }`}
        >
          {t.exercises.all}
        </Link>
        {days.map((day) => {
          const locked = user?.role === "learner" && !isDayUnlocked(day, maxUnlockedDay);
          if (locked) return null;
          return (
          <Link
            key={day}
            href={`/exercises?day=${day}`}
            className={`rounded-md px-2.5 py-1 ${
              dayFilter === day
                ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                : "text-[var(--ink)] hover:bg-[var(--paper)]"
            }`}
          >
            {formatMessage(t.exercises.day, { n: day })}
          </Link>
        );})}
      </div>

      <div className="space-y-10">
        {grouped.map(({ day, lessons }) => (
          <section key={day}>
            <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
              {formatMessage(t.exercises.day, { n: day })}
            </h2>
            <div className="mt-4 space-y-6">
              {lessons?.map((lesson) => (
                <div key={lesson.slug}>
                  <h3 className="text-sm font-semibold text-[var(--muted)]">
                    {lessonTitle.get(lesson.slug) ?? lesson.slug}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {lesson.items.map((exercise) => (
                      <li key={exercise.id}>
                        <Link
                          href={`/exercises/${exercise.id}`}
                          className="flex flex-wrap items-baseline justify-between gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 transition hover:border-[var(--accent)]"
                        >
                          <div>
                            <p className="font-medium text-[var(--ink)]">{exercise.title}</p>
                            <p className="mt-0.5 text-xs text-[var(--muted)]">
                              {formatMessage(t.exercises.points, { n: exercise.maxPoints })} ·{" "}
                              {t.exercises.hintsAvailable}
                            </p>
                          </div>
                          <span className="text-xs font-medium uppercase tracking-wide text-[var(--accent)]">
                            {difficultyLabel[exercise.difficulty]}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {list.length === 0 ? (
        <p className="text-sm text-[var(--muted)]">{t.exercises.empty}</p>
      ) : null}
    </PageShell>
  );
}
