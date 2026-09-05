import Link from "next/link";
import { getLocalizedCurriculum } from "@/lib/i18n/curriculum-locale";
import { getI18n } from "@/lib/i18n/server";
import { formatMessage } from "@/lib/i18n/messages";
import { getSession } from "@/lib/auth";
import { getMaxUnlockedDayForUser, isDayUnlocked } from "@/lib/dayAccess";
import type { DayMeta } from "@/lib/curriculum";

type CurriculumSidebarProps = {
  activeSlug?: string;
};

export async function CurriculumSidebar({ activeSlug }: CurriculumSidebarProps) {
  const { locale, t } = await getI18n();
  const user = await getSession();
  const maxUnlockedDay =
    user == null ? 10 : await getMaxUnlockedDayForUser(user.id, user.role);
  const curriculum = getLocalizedCurriculum(locale);
  const week1 = curriculum.filter((d) => d.week === 1);
  const week2 = curriculum.filter((d) => d.week === 2);

  return (
    <aside className="w-full shrink-0 border-[var(--border)] bg-[var(--surface)] lg:w-64 lg:border-r">
      <div className="sticky top-0 max-h-[calc(100vh-3.5rem)] overflow-y-auto p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
          {t.learn.curriculum}
        </p>
        <WeekBlock
          label={formatMessage(t.learn.week, { n: 1 })}
          days={week1}
          activeSlug={activeSlug}
          maxUnlockedDay={maxUnlockedDay}
          t={t}
        />
        <WeekBlock
          label={formatMessage(t.learn.week, { n: 2 })}
          days={week2}
          activeSlug={activeSlug}
          maxUnlockedDay={maxUnlockedDay}
          t={t}
        />
      </div>
    </aside>
  );
}

function WeekBlock({
  label,
  days,
  activeSlug,
  maxUnlockedDay,
  t,
}: {
  label: string;
  days: DayMeta[];
  activeSlug?: string;
  maxUnlockedDay: number;
  t: Awaited<ReturnType<typeof getI18n>>["t"];
}) {
  return (
    <div className="mt-4">
      <h2 className="text-sm font-semibold text-[var(--ink)]">{label}</h2>
      <ul className="mt-2 space-y-3">
        {days.map((day) => {
          const dayOpen = isDayUnlocked(day.day, maxUnlockedDay);
          return (
          <li key={day.id}>
            <p className="text-xs text-[var(--muted)]">
              {formatMessage(t.learn.day, { n: day.day })} · {day.dateLabel} · {day.title}
              {!dayOpen ? (
                <span className="ml-1 rounded bg-[var(--paper)] px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-[var(--muted)]">
                  {t.learn.dayLocked}
                </span>
              ) : null}
            </p>
            {day.lessons.length === 0 ? (
              <p className="mt-1 text-xs italic text-[var(--muted)]">{t.learn.lessonsComingSoon}</p>
            ) : (
              <ul className="mt-1 space-y-0.5">
                {day.lessons.map((lesson) => {
                  const active = lesson.slug === activeSlug;
                  if (!dayOpen) {
                    return (
                      <li key={lesson.slug}>
                        <span className="block rounded-md px-2 py-1 text-sm text-[var(--muted)] opacity-60">
                          {lesson.title}
                        </span>
                      </li>
                    );
                  }
                  return (
                    <li key={lesson.slug}>
                      <Link
                        href={`/learn/${lesson.slug}`}
                        className={`block rounded-md px-2 py-1 text-sm transition ${
                          active
                            ? "bg-[var(--accent-soft)] font-medium text-[var(--accent)]"
                            : "text-[var(--ink)] hover:bg-[var(--paper)]"
                        }`}
                      >
                        {lesson.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );})}
      </ul>
    </div>
  );
}
