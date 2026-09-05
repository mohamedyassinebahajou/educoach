import Link from "next/link";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { LogoutButton } from "@/components/LogoutButton";
import { getSession } from "@/lib/auth";
import { getI18n } from "@/lib/i18n/server";

export async function AppHeader() {
  const user = await getSession();
  const { locale, t } = await getI18n();

  const nav = [
    { href: "/learn", label: t.nav.learn },
    { href: "/exercises", label: t.nav.exercises },
    { href: "/progress", label: t.nav.progress },
    { href: "/coach", label: t.nav.coach, coachOnly: true as const },
  ];

  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="font-[family-name:var(--font-display)] text-lg tracking-tight text-[var(--ink)]"
        >
          EduCoach <span className="text-[var(--accent)]">JS</span>
        </Link>
        <nav className="flex flex-1 items-center justify-end gap-1 text-sm sm:gap-2">
          {nav.map((item) => {
            if ("coachOnly" in item && item.coachOnly && user?.role !== "coach") {
              return null;
            }
            return (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-2.5 py-1.5 text-[var(--muted)] transition-colors hover:bg-[var(--paper)] hover:text-[var(--ink)]"
              >
                {item.label}
              </Link>
            );
          })}
          <div className="ml-1 border-l border-[var(--border)] pl-2 sm:ml-2 sm:pl-3">
            <LanguageSwitcher locale={locale} ariaLabel={t.lang.label} />
          </div>
          {user ? (
            <span className="ml-1 flex items-center gap-2 border-l border-[var(--border)] pl-2 sm:ml-2 sm:pl-3">
              <span className="hidden text-[var(--muted)] sm:inline">
                {user.displayName}{" "}
                <span className="text-xs">({user.role})</span>
              </span>
              <LogoutButton label={t.nav.logout} />
            </span>
          ) : (
            <Link
              href="/login"
              className="ml-1 rounded-md bg-[var(--accent)] px-2.5 py-1.5 font-semibold text-white sm:ml-2"
            >
              {t.nav.signIn}
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
