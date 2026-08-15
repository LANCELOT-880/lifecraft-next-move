import { Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { NextMove } from "@/lib/journey/types";

export function NextMoveCard({
  move,
  variant = "panel",
}: {
  move: NextMove | null;
  variant?: "panel" | "hero";
}) {
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
          {move ? move.task : "Every task is complete."}
        </p>

        <p className="mt-2 text-sm text-muted-foreground">
          {move
            ? `${move.minutes} minutes · ${move.impact}`
            : "Create a new goal to keep the momentum going."}
        </p>

        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <p className="min-w-0 truncate text-xs text-muted-foreground">
            {move ? move.journey : "Nothing queued"}
          </p>
          {move ? (
            <Button asChild className="shrink-0">
              <Link to="/task" search={{ journey: move.journeyId, task: move.taskId }}>
                Start
              </Link>
            </Button>
          ) : (
            <Button asChild className="shrink-0">
              <Link to="/create">New goal</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
