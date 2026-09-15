import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { allTasks, completedCount, getNextMove } from "@/lib/journey/journeyStore";
import type { Journey } from "@/lib/journey/types";
import { ProgressMeter } from "./ProgressMeter";

export function JourneyCard({
  journey,
  isActive = false,
  compact = false,
}: {
  journey: Journey;
  isActive?: boolean;
  compact?: boolean;
}) {
  const total = allTasks(journey).length;
  const done = completedCount(journey);
  const nextMove = getNextMove(journey);
  const isComplete = journey.progress === 100;

  return (
    <Link
      to="/goal"
      search={{ id: journey.id }}
      className={`group surface-panel block border p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)] sm:p-6 ${
        isActive
          ? "border-primary/45 bg-accent-soft/20"
          : isComplete
            ? "border-border/70 bg-surface-2/40"
            : "border-border"
      }`}
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-lg font-semibold text-foreground">{journey.title}</h3>
            <span
              className={`rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${
                isComplete
                  ? "border-primary/20 bg-accent-soft/50 text-primary/70"
                  : "border-primary/30 bg-accent-soft text-primary"
              }`}
            >
              {isComplete ? "Complete" : "In progress"}
            </span>
            {isActive ? (
              <span className="rounded-full border border-border bg-surface-2 px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Current
              </span>
            ) : null}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{journey.description}</p>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <div className="mt-5">
        <ProgressMeter value={journey.progress} label={`${done} / ${total} tasks`} />
      </div>

      {!compact ? (
        <dl className="mt-5 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-2">
          <div className="min-w-0">
            <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Current phase
            </dt>
            <dd className="mt-1 truncate text-sm text-foreground">
              {nextMove?.phase ?? (isComplete ? "Journey complete" : "Not started")}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Next task
            </dt>
            <dd className="mt-1 truncate text-sm text-foreground">
              {nextMove?.task ?? "All tasks complete"}
            </dd>
          </div>
        </dl>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Clock3 className="size-3.5 text-primary" aria-hidden />
          {journey.dailyTime} daily
        </span>
        {journey.targetDate ? (
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays className="size-3.5 text-primary" aria-hidden />
            Target {journey.targetDate}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
