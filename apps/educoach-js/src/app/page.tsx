import Link from "next/link";
import { getI18n } from "@/lib/i18n/server";

export default async function HomePage() {
  const { t } = await getI18n();

  const cards = [
    { href: "/learn", title: t.home.cards.learn.title, body: t.home.cards.learn.body },
    {
      href: "/exercises",
      title: t.home.cards.exercises.title,
      body: t.home.cards.exercises.body,
    },
    {
      href: "/progress",
      title: t.home.cards.progress.title,
      body: t.home.cards.progress.body,
    },
    { href: "/coach", title: t.home.cards.coach.title, body: t.home.cards.coach.body },
  ] as const;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-12 sm:px-6">
      <p className="text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
        {t.home.badge}
      </p>
      <h1 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-4xl leading-tight tracking-tight text-[var(--ink)] sm:text-5xl">
        {t.home.title}
      </h1>
      <p className="mt-4 max-w-xl text-lg text-[var(--muted)]">{t.home.intro}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/learn"
          className="rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-110"
        >
          {t.home.startLearn}
        </Link>
        <Link
          href="/exercises"
          className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2.5 text-sm font-semibold text-[var(--ink)] transition hover:bg-[var(--paper)]"
        >
          {t.home.viewExercises}
        </Link>
      </div>

      <ul className="mt-14 grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <li key={card.href}>
            <Link
              href={card.href}
              className="block h-full rounded-lg border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-[var(--accent)]"
            >
              <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
                {card.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{card.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
