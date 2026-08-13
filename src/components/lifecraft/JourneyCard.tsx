import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Journey } from "@/data/mock";
import { ProgressMeter } from "./ProgressMeter";

export function JourneyCard({ journey }: { journey: Journey }) {
  return (
    <Link
      to="/goal"
      className="group surface-panel block p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-elevated)] sm:p-6"
    >
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-foreground">{journey.title}</h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{journey.description}</p>
        </div>
        <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
      </div>

      <div className="mt-6">
        <ProgressMeter value={journey.progress} label={`${journey.milestonesDone} / ${journey.milestonesTotal} milestones`} />
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{journey.cadence}</p>
    </Link>
  );
}