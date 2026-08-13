import { Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { NextMove } from "@/data/mock";

export function NextMoveCard({ move, variant = "panel" }: { move: NextMove; variant?: "panel" | "hero" }) {
  const start = () =>
    toast.success("Task started", {
      description: `${move.task} · ${move.minutes} minutes on the clock.`,
    });

  return (
    <section
      aria-labelledby="next-move-heading"
      className="relative overflow-hidden rounded-2xl border border-primary/25 p-5 sm:p-7"
      style={{ backgroundImage: "var(--gradient-surface)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />
      <div className="relative">
        <div className="flex items-center gap-2">
          <Zap className="size-3.5 text-primary" aria-hidden />
          <h2 id="next-move-heading" className="text-eyebrow text-primary">
            Next move
          </h2>
        </div>

        <p
          className={`mt-4 font-display font-semibold text-foreground ${
            variant === "hero" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {move.task}
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          {move.minutes} minutes · {move.impact}
        </p>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <p className="min-w-0 truncate text-xs text-muted-foreground">{move.journey}</p>
          <Button onClick={start} className="shrink-0">
            Start
          </Button>
        </div>
      </div>
    </section>
  );
}