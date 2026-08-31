import { useState } from "react";
import { Gem, Zap } from "lucide-react";
import { useRewards } from "@/lib/journey/useRewards";

/** Compact XP level + Gem balance readout, placed inside existing panels. */
export function RewardsSummary({ className = "" }: { className?: string }) {
  const {
    level,
    gems,
    xp,
    xpIntoLevel,
    xpForNextLevel,
    xpToNextLevel,
    percentToNextLevel,
    recent,
  } = useRewards();
  const [openPanel, setOpenPanel] = useState<"xp" | "gems" | null>(null);
  const gemHistory = recent.filter((entry) => entry.gems > 0);

  return (
    <div className={`grid gap-3 sm:grid-cols-[minmax(0,1.35fr)_minmax(190px,0.65fr)] ${className}`}>
      <button
        type="button"
        aria-expanded={openPanel === "xp"}
        onClick={() => setOpenPanel((prev) => (prev === "xp" ? null : "xp"))}
        className="group rounded-2xl border border-border bg-surface-2/60 px-5 py-4 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2.5 text-sm text-foreground">
            <span className="grid size-8 place-items-center rounded-lg bg-accent-soft">
              <Zap className="size-3.5 text-primary" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">Current level</span>
              <span className="mt-0.5 block font-display text-sm font-semibold">Level {level}</span>
            </span>
          </span>
          <span className="font-display text-sm text-foreground">
            {xpIntoLevel}{" "}
            <span className="text-xs font-normal text-muted-foreground">/ {xpForNextLevel} XP</span>
          </span>
        </div>
        <div
          className="mt-4 h-2 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={percentToNextLevel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${xpIntoLevel} of ${xpForNextLevel} XP to next level`}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-700 ease-out"
            style={{ width: `${percentToNextLevel}%` }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          {xpToNextLevel} XP to level {level + 1}
        </p>
        {openPanel === "xp" ? (
          <dl className="mt-3 space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
            <div className="flex justify-between gap-3">
              <dt>Total XP</dt>
              <dd className="text-foreground">{xp}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>XP to level {level + 1}</dt>
              <dd className="text-foreground">{xpToNextLevel}</dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt>Progress</dt>
              <dd className="text-foreground">{percentToNextLevel}%</dd>
            </div>
          </dl>
        ) : null}
      </button>

      <button
        type="button"
        aria-expanded={openPanel === "gems"}
        onClick={() => setOpenPanel((prev) => (prev === "gems" ? null : "gems"))}
        className="group rounded-2xl border border-border bg-surface-2/60 px-5 py-4 text-left transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)]"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2.5 text-sm text-foreground">
            <span className="grid size-8 place-items-center rounded-lg bg-accent-soft">
              <Gem className="size-3.5 text-primary" aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-muted-foreground">Reward balance</span>
              <span className="mt-0.5 block font-display text-sm font-semibold">Gems</span>
            </span>
          </span>
          <span className="font-display text-2xl font-semibold text-foreground">{gems}</span>
        </div>
        {openPanel === "gems" ? (
          <div className="mt-3 space-y-1.5 border-t border-border pt-3 text-xs text-muted-foreground">
            <p>Current balance: {gems}</p>
            {gemHistory.length === 0 ? (
              <p>No gem rewards yet — complete a step to earn some.</p>
            ) : (
              <ul className="space-y-1">
                {gemHistory.map((entry) => (
                  <li key={entry.key} className="flex justify-between gap-3">
                    <span className="min-w-0 truncate">{entry.label}</span>
                    <span className="shrink-0 text-primary">+{entry.gems}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ) : null}
      </button>
    </div>
  );
}
