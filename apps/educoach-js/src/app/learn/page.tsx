import Link from "next/link";
import { CurriculumSidebar } from "@/components/learn/CurriculumSidebar";
import {
  getLocalizedContinueLesson,
  getLocalizedCurriculum,
} from "@/lib/i18n/curriculum-locale";
import { getI18n } from "@/lib/i18n/server";
import { formatMessage } from "@/lib/i18n/messages";
import type { DayMeta } from "@/lib/curriculum";

export default async function LearnHomePage() {
  const { locale, t } = await getI18n();
  const curriculum = getLocalizedCurriculum(locale);
  const week1 = curriculum.filter((d) => d.week === 1);
  const week2 = curriculum.filter((d) => d.week === 2);
  const continueLesson = getLocalizedContinueLesson(locale);
  const publishedCount = curriculum.reduce((n, d) => n + d.lessons.length, 0);

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <CurriculumSidebar />
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
          {t.learn.badge}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
          {t.learn.title}
        </h1>
        <p className="mt-3 text-[var(--muted)]">
          {formatMessage(t.learn.intro, { count: publishedCount })}
        </p>

        {continueLesson ? (
          <Link
            href={`/learn/${continueLesson.slug}`}
            className="mt-6 inline-flex rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {formatMessage(t.learn.continue, { title: continueLesson.title })}
          </Link>
        ) : null}

        <WeekSection week={1} days={week1} t={t} />
        <WeekSection week={2} days={week2} t={t} />
      </div>
    </div>
  );
}

function WeekSection({
  week,
  days,
  t,
}: {
  week: 1 | 2;
  days: DayMeta[];
  t: Awaited<ReturnType<typeof getI18n>>["t"];
}) {
  return (
    <section className="mt-10">
      <h2 className="font-[family-name:var(--font-display)] text-2xl text-[var(--ink)]">
        {formatMessage(t.learn.week, { n: week })}
      </h2>
      <ul className="mt-4 space-y-3">
        {days.map((day) => {
          const count = day.lessons.length;
          const countLabel =
            count === 0
              ? t.learn.comingSoon
              : count === 1
                ? formatMessage(t.learn.lessonCount, { count })
                : formatMessage(t.learn.lessonCountPlural, { count });
          return (
            <li
              key={day.id}
              className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-4"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-semibold text-[var(--ink)]">
                  {formatMessage(t.learn.day, { n: day.day })}{" "}
                  <span className="font-normal text-[var(--muted)]">
                    · {day.dateLabel} · {day.title}
                  </span>
                </h3>
                <span className="text-xs text-[var(--muted)]">{countLabel}</span>
              </div>
              {count > 0 ? (
                <ul className="mt-3 space-y-1">
                  {day.lessons.map((lesson) => (
                    <li key={lesson.slug}>
                      <Link
                        href={`/learn/${lesson.slug}`}
                        className="text-sm text-[var(--accent)] hover:underline"
                      >
                        {lesson.title}
                      </Link>
                      <p className="text-xs text-[var(--muted)]">{lesson.summary}</p>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
