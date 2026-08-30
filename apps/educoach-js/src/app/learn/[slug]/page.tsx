import Link from "next/link";
import { notFound } from "next/navigation";
import { AskTutorButton } from "@/components/chat/AskTutorButton";
import { CurriculumSidebar } from "@/components/learn/CurriculumSidebar";
import { LessonMdx } from "@/components/learn/LessonMdx";
import { getSession } from "@/lib/auth";
import { getAllLessons } from "@/lib/curriculum";
import {
  findLocalizedLesson,
  getLocalizedLessonNav,
} from "@/lib/i18n/curriculum-locale";
import { getI18n } from "@/lib/i18n/server";
import { formatMessage } from "@/lib/i18n/messages";
import { getLessonSource, lessonFileExists, listLessonSlugs } from "@/lib/lessons";
import { markLessonSeen } from "@/lib/progress";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  const fromFiles = listLessonSlugs();
  const fromCurriculum = getAllLessons().map((l) => l.slug);
  const slugs = Array.from(new Set([...fromFiles, ...fromCurriculum]));
  return slugs.map((slug) => ({ slug }));
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const { locale, t } = await getI18n();
  const found = findLocalizedLesson(slug, locale);
  if (!found || !lessonFileExists(slug)) notFound();

  const user = await getSession();
  if (user?.role === "learner") {
    await markLessonSeen(user.id, slug);
  }

  const { day, lesson } = found;
  const { content } = getLessonSource(slug);
  const { prev, next } = getLocalizedLessonNav(slug, locale);

  return (
    <div className="flex flex-1 flex-col lg:flex-row">
      <CurriculumSidebar activeSlug={slug} />
      <article className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 sm:px-6">
        <p className="text-sm text-[var(--muted)]">
          {formatMessage(t.learn.day, { n: day.day })} · {day.dateLabel} · {day.title}
          {user?.role === "learner" ? ` · ${t.lesson.progressSaved}` : ""}
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl tracking-tight text-[var(--ink)] sm:text-4xl">
          {lesson.title}
        </h1>
        <p className="mt-2 text-[var(--muted)]">{lesson.summary}</p>
        {locale === "fr" ? (
          <p className="mt-3 rounded-md border border-[var(--border)] bg-[var(--paper)] px-3 py-2 text-xs text-[var(--muted)]">
            {t.lesson.contentEnglishNote}
          </p>
        ) : null}
        <p className="mt-3 text-xs text-[var(--muted)]">{t.lesson.tryItNote}</p>

        <div className="mt-8">
          <LessonMdx source={content} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <AskTutorButton lessonSlug={slug} lessonTitle={lesson.title} />
          <span className="text-xs text-[var(--muted)]">{t.lesson.tutorNote}</span>
        </div>

        <nav className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--border)] pt-6 text-sm">
          {prev ? (
            <Link href={`/learn/${prev.slug}`} className="text-[var(--accent)] hover:underline">
              ← {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/learn/${next.slug}`} className="text-[var(--accent)] hover:underline">
              {next.title} →
            </Link>
          ) : (
            <Link href="/learn" className="text-[var(--muted)] hover:underline">
              {t.lesson.backToLearn}
            </Link>
          )}
        </nav>
      </article>
    </div>
  );
}
