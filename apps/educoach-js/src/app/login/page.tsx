"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const { t } = useI18n();
  const next = search.get("next") || "/learn";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json()) as {
        error?: string;
        user?: { role: "learner" | "coach" };
      };
      if (!res.ok) {
        setError(data.error ?? t.login.failed);
        return;
      }
      const destination =
        data.user?.role === "coach"
          ? next.startsWith("/coach")
            ? next
            : "/coach"
          : next;
      router.push(destination);
      router.refresh();
    } catch {
      setError(t.login.networkError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} method="post" className="mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="username">
          {t.login.username}
        </label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          autoComplete="username"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="password">
          {t.login.password}
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-[var(--ink)] outline-none focus:border-[var(--accent)]"
          autoComplete="current-password"
        />
      </div>
      {error ? <p className="text-sm text-[#9f1239]">{error}</p> : null}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-[var(--accent)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
      >
        {loading ? t.login.signingIn : t.login.signIn}
      </button>
    </form>
  );
}

export default function LoginPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">
        {t.login.title}
      </h1>
      <p className="mt-2 text-sm text-[var(--muted)]">{t.login.demo}</p>
      <Suspense fallback={<p className="mt-8 text-sm text-[var(--muted)]">{t.login.loading}</p>}>
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-sm text-[var(--muted)]">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          {t.login.home}
        </Link>
      </p>
    </div>
  );
}
