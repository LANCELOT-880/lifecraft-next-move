import { Link } from "@tanstack/react-router";
import { ArrowRight, Clock3, Gauge, Sparkles, Zap } from "lucide-react";
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
      className={`relative overflow-hidden rounded-2xl border border-primary/25 p-5 shadow-[var(--shadow-accent)] transition-[border-color,box-shadow] duration-300 hover:border-primary/45 sm:p-7 ${
        variant === "hero" ? "sm:p-8" : ""
      }`}
      style={{ backgroundImage: "var(--gradient-surface)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-lg bg-accent-soft">
              <Zap className="size-3.5 text-primary" aria-hidden />
            </span>
            <h2 id="next-move-heading" className="text-eyebrow text-primary">
              Next move
            </h2>
          </div>
          {move ? <span className="text-xs text-muted-foreground">Ready when you are</span> : null}
        </div>

        <h3
          className={`mt-4 font-display font-semibold text-foreground ${
            variant === "hero" ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
          }`}
        >
          {move ? move.task : "Every task is complete."}
        </h3>

        {move ? (
          <>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {move.reason}
            </p>

            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
              <div className="bg-surface/80 px-3.5 py-3 sm:col-span-1">
                <dt className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <Sparkles className="size-3 text-primary" aria-hidden /> Journey
                </dt>
                <dd className="mt-1.5 truncate text-sm text-foreground">{move.journey}</dd>
              </div>
              <div className="bg-surface/80 px-3.5 py-3">
                <dt className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <Clock3 className="size-3 text-primary" aria-hidden /> Time
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">{move.minutes} minutes</dd>
              </div>
              <div className="bg-surface/80 px-3.5 py-3">
                <dt className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Difficulty
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">{move.difficulty}</dd>
              </div>
              <div className="bg-surface/80 px-3.5 py-3">
                <dt className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <Gauge className="size-3 text-primary" aria-hidden /> Impact
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">{move.impact}</dd>
              </div>
            </dl>
          </>
        ) : (
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new goal to keep the momentum going.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {move ? (
            <Button
              asChild
              size={variant === "hero" ? "lg" : "default"}
              className="w-full shrink-0 sm:w-auto"
            >
              <Link to="/task" search={{ journey: move.journeyId, task: move.taskId }}>
                Start <ArrowRight className="size-4" aria-hidden />
              </Link>
            </Button>
          ) : (
            <Button asChild className="w-full shrink-0 sm:w-auto">
              <Link to="/create">New goal</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
