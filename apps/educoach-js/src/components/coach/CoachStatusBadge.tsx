import type { LearnerStatus } from "@/lib/progress";

const styles: Record<LearnerStatus, string> = {
  not_started: "bg-[var(--paper)] text-[var(--muted)]",
  active: "bg-[#ecfdf5] text-[#047857]",
  on_track: "bg-[#eff6ff] text-[#1d4ed8]",
  inactive: "bg-[#fffbeb] text-[#b45309]",
  at_risk: "bg-[#fff1f0] text-[#9f1239]",
};

export function CoachStatusBadge({
  status,
  labels,
}: {
  status: LearnerStatus;
  labels: Record<LearnerStatus, string>;
}) {
  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
