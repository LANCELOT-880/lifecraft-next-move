import { Gem, Zap } from "lucide-react";
import { useRewards } from "@/lib/journey/useRewards";

/** Compact XP level + Gem balance readout, placed inside existing panels. */
export function RewardsSummary({ className = "" }: { className?: string }) {
  const { level, gems, xpIntoLevel, xpForNextLevel, percentToNextLevel } = useRewards();

  return (
    <div className={`grid gap-3 sm:grid-cols-2 ${className}`}>
      <div className="rounded-lg border border-border bg-surface-2/60 px-4 py-3">
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
      </div>

      <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2/60 px-4 py-3">
        <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
          <Gem className="size-3.5 text-primary" aria-hidden /> Gems
        </span>
        <span className="font-display text-sm text-foreground">{gems}</span>
      </div>
    </div>
  );
}
