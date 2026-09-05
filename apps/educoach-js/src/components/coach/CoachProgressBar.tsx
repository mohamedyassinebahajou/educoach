type CoachProgressBarProps = {
  percent: number;
  label?: string;
  compact?: boolean;
};

export function CoachProgressBar({ percent, label, compact }: CoachProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percent));
  return (
    <div className={compact ? "min-w-[88px]" : ""}>
      {label ? (
        <div className="mb-1 flex justify-between text-xs text-[var(--muted)]">
          <span>{label}</span>
          <span className="font-mono">{clamped}%</span>
        </div>
      ) : null}
      <div
        className={`overflow-hidden rounded-full bg-[var(--paper)] ${compact ? "h-1.5" : "h-2.5"}`}
      >
        <div
          className="h-full rounded-full bg-[var(--accent)] transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
