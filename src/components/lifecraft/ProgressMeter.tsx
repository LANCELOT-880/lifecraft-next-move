interface ProgressMeterProps {
  value: number;
  label?: string;
  ariaLabel?: string;
  size?: "sm" | "md";
}

export function ProgressMeter({ value, label, ariaLabel, size = "md" }: ProgressMeterProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full">
      {label ? (
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <span className="text-xs text-muted-foreground">{label}</span>
          <span className="font-display text-sm text-foreground">{clamped}%</span>
        </div>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel ?? label ?? "Progress"}
        className={`w-full overflow-hidden rounded-full bg-surface-2 ${size === "sm" ? "h-1.5" : "h-2"}`}
      >
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
