import { useState } from "react";
import { Gem, Zap } from "lucide-react";
import { useRewards } from "@/lib/journey/useRewards";

/** Compact XP level + Gem balance readout, placed inside existing panels. */
export function RewardsSummary({ className = "" }: { className?: string }) {
  const { level, gems, xp, xpIntoLevel, xpForNextLevel, xpToNextLevel, percentToNextLevel, recent } =
    useRewards();
  const [openPanel, setOpenPanel] = useState<"xp" | "gems" | null>(null);
  const gemHistory = recent.filter((entry) => entry.gems > 0);

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      <button
        type="button"
        aria-expanded={openPanel === "xp"}
        onClick={() => setOpenPanel((prev) => (prev === "xp" ? null : "xp"))}
        className="rounded-lg border border-border bg-surface-2/60 px-4 py-3 text-left transition-colors duration-200 hover:border-primary/40"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="size-3.5 text-primary" aria-hidden /> Level {level}
          </span>
          <span className="text-xs text-muted-foreground">
            {xpIntoLevel}/{xpForNextLevel} XP
          </span>
        </div>
        <div
          className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-valuenow={percentToNextLevel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="XP to next level"
        >
          <div className="h-full rounded-full bg-primary" style={{ width: `${percentToNextLevel}%` }} />
        </div>
        {openPanel === "xp" ? (
          <dl className="mt-3 space-y-1.5 text-xs text-muted-foreground">
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
        className="rounded-lg border border-border bg-surface-2/60 px-4 py-3 text-left transition-colors duration-200 hover:border-primary/40"
      >
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Gem className="size-3.5 text-primary" aria-hidden /> Gems
          </span>
          <span className="font-display text-sm text-foreground">{gems}</span>
        </div>
        {openPanel === "gems" ? (
          <div className="mt-3 space-y-1.5 text-xs text-muted-foreground">
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
