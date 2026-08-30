"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/learn";
  const [username, setUsername] = useState("student1");
  const [password, setPassword] = useState("student123");
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
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Login failed");
        return;
      }
      router.push(next);
      router.refresh();
    } catch {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 space-y-4">
      <div>
        <label className="block text-sm font-medium text-[var(--ink)]" htmlFor="username">
          Username
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
          Password
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
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-[var(--ink)]">Sign in</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Demo accounts — coach: <code className="font-mono">coach</code> /{" "}
        <code className="font-mono">coach123</code> · learner:{" "}
        <code className="font-mono">student1</code>…<code className="font-mono">student5</code> /{" "}
        <code className="font-mono">student123</code>
      </p>
      <Suspense fallback={<p className="mt-8 text-sm text-[var(--muted)]">Loading…</p>}>
        <LoginForm />
      </Suspense>
      <p className="mt-6 text-sm text-[var(--muted)]">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          ← Home
        </Link>
      </p>
    </div>
  );
}
