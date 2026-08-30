import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { getSession } from "@/lib/auth";
import { listCoachAlerts } from "@/lib/coachAlerts";
import { prisma } from "@/lib/db";
import { getClassProgress } from "@/lib/progress";

export default async function CoachPage() {
  const user = await getSession();
  if (!user) redirect("/login?next=/coach");
  if (user.role !== "coach") redirect("/?error=coach-only");

  const classRows = await getClassProgress();
  const atRiskCount = classRows.filter((r) => r.atRisk).length;

  const recentFails = await prisma.attempt.findMany({
    where: { passed: false },
    orderBy: { createdAt: "desc" },
    take: 10,
    include: { user: true },
  });

  const chatAlerts = listCoachAlerts(15);

  const alerts = [
    ...chatAlerts.map((a) => ({
      id: a.id,
      text: a.text,
      at: a.at,
      kind: "chat" as const,
    })),
    ...classRows
      .filter((r) => r.atRisk)
      .map((r) => ({
        id: `risk-${r.userId}`,
        text: `${r.displayName} flagged at-risk — ${r.riskReason ?? "needs attention"}`,
        at: new Date().toISOString(),
        kind: "risk" as const,
      })),
    ...recentFails.slice(0, 5).map((a) => ({
      id: a.id,
      text: `${a.user.displayName} failed ${a.exerciseId} (${a.passedCount}/${a.totalCount} tests)`,
      at: a.createdAt.toISOString(),
      kind: "fail" as const,
    })),
  ];

  return (
    <PageShell
      title="Coach"
      subtitle={`Today · At-risk: ${atRiskCount} · Learners: ${classRows.length}`}
    >
      <div className="space-y-8">
        <section className="grid gap-3 sm:grid-cols-3">
          <Stat label="Learners" value={String(classRows.length)} />
          <Stat label="At-risk" value={String(atRiskCount)} accent={atRiskCount > 0} />
          <Stat
            label="Avg exercises %"
            value={
              classRows.length
                ? `${Math.round(
                    classRows.reduce((s, r) => s + r.exercisesPercent, 0) / classRows.length,
                  )}%`
                : "—"
            }
          />
        </section>

        <section className="overflow-x-auto rounded-lg border border-[var(--border)] bg-[var(--surface)]">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-[var(--border)] bg-[var(--paper)] text-xs uppercase tracking-wide text-[var(--muted)]">
              <tr>
                <th className="px-4 py-3">Learner</th>
                <th className="px-4 py-3">Docs %</th>
                <th className="px-4 py-3">Exercises %</th>
                <th className="px-4 py-3">Attempts</th>
                <th className="px-4 py-3">Flag</th>
              </tr>
            </thead>
            <tbody>
              {classRows.map((row) => (
                <tr key={row.userId} className="border-b border-[var(--border)] last:border-0">
                  <td className="px-4 py-3 font-medium text-[var(--ink)]">
                    {row.displayName}{" "}
                    <span className="font-mono text-xs text-[var(--muted)]">({row.username})</span>
                  </td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.docsPercent}%</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.exercisesPercent}%</td>
                  <td className="px-4 py-3 text-[var(--muted)]">{row.totalAttempts}</td>
                  <td className="px-4 py-3">
                    {row.atRisk ? (
                      <span className="rounded bg-[#fff1f0] px-2 py-0.5 text-xs font-semibold text-[#9f1239]">
                        AT-RISK
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--muted)]">ok</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-[var(--ink)]">
            Alerts
          </h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Coach-only side channel — <code className="text-[var(--ink)]">coach_alert</code> from
            chat never appears in the learner drawer (<code className="text-[var(--ink)]">reply</code>{" "}
            only).
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {alerts.length === 0 ? (
              <li className="text-[var(--muted)]">No alerts yet.</li>
            ) : (
              alerts.map((a) => (
                <li
                  key={a.id}
                  className="rounded-md border border-[var(--border)] bg-[var(--surface)] px-4 py-2"
                >
                  <span
                    className={
                      a.kind === "risk" || a.kind === "chat"
                        ? "mr-2 text-xs font-semibold text-[#9f1239]"
                        : "mr-2 text-xs font-semibold text-[var(--muted)]"
                    }
                  >
                    {a.kind === "risk" ? "RISK" : a.kind === "chat" ? "CHAT" : "FAIL"}
                  </span>
                  {a.text}
                  <span className="mt-0.5 block text-xs text-[var(--muted)]">
                    {new Date(a.at).toLocaleString()}
                  </span>
                </li>
              ))
            )}
          </ul>
        </section>

        <p className="text-xs text-[var(--muted)]">
          Risk heuristic (PoC): several failed attempts with zero passes.{" "}
          <Link href="/exercises" className="text-[var(--accent)] hover:underline">
            Exercises
          </Link>
        </p>
      </div>
    </PageShell>
  );
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
      <p className="text-xs uppercase tracking-wide text-[var(--muted)]">{label}</p>
      <p
        className={`mt-1 font-[family-name:var(--font-display)] text-2xl ${
          accent ? "text-[#9f1239]" : "text-[var(--ink)]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
