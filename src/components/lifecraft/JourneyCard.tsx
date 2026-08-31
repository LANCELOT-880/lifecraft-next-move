import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { allTasks, completedCount } from "@/lib/journey/journeyStore";
import type { Journey } from "@/lib/journey/types";
import { ProgressMeter } from "./ProgressMeter";

export function JourneyCard({ journey }: { journey: Journey }) {
  const total = allTasks(journey).length;
  const done = completedCount(journey);

  return (
    <Link
      to="/goal"
      search={{ id: journey.id }}
      className="group surface-panel block p-5 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)] sm:p-6"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-foreground">{journey.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{journey.description}</p>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <div className="mt-5">
        <ProgressMeter value={journey.progress} label={`${done} / ${total} tasks`} />
      </div>

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
