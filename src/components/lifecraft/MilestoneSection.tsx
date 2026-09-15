import type { Phase, Task } from "@/lib/journey/types";
import { ProgressMeter } from "./ProgressMeter";
import { TaskRow } from "./TaskRow";

export function MilestoneSection({
  phase,
  journeyId,
  nextTaskId,
  onToggleTask,
}: {
  phase: Phase;
  journeyId?: string | undefined;
  nextTaskId?: string | undefined;
  onToggleTask?: ((task: Task) => void) | undefined;
}) {
  const done = phase.tasks.filter((task) => task.completed).length;
  const progress = phase.tasks.length ? Math.round((done / phase.tasks.length) * 100) : 0;
  const isComplete = phase.tasks.length > 0 && done === phase.tasks.length;
  const isInProgress =
    !isComplete && (done > 0 || phase.tasks.some((task) => task.id === nextTaskId));

  return (
    <section
      className={`surface-panel overflow-hidden border p-5 transition-colors sm:p-6 ${
        isInProgress
          ? "border-primary/35 bg-accent-soft/25"
          : isComplete
            ? "border-border/50 opacity-85"
            : "border-border/80"
      }`}
    >
      <header className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-start sm:gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className={`text-eyebrow ${isComplete ? "text-muted-foreground" : "text-primary"}`}>
              Phase {String(phase.order).padStart(2, "0")}
            </p>
            <span
              className={`rounded-full border px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] ${
                isComplete
                  ? "border-primary/20 bg-accent-soft/50 text-primary/70"
                    : isInProgress
                    ? "border-primary/30 bg-accent-soft text-primary"
                    : "border-border text-muted-foreground"
              }`}
            >
              {isComplete ? "Complete" : isInProgress ? "In progress" : "Upcoming"}
            </span>
            <span className="text-xs text-muted-foreground">
              {done}/{phase.tasks.length} tasks
            </span>
          </div>
          <h2 className={`mt-2 text-xl font-semibold ${isComplete ? "text-muted-foreground" : ""}`}>
            {phase.title}
          </h2>
          {phase.summary ? (
            <p className="mt-2 text-sm leading-5 text-muted-foreground">{phase.summary}</p>
          ) : null}
        </div>
        <ProgressMeter value={progress} label="Phase progress" size="sm" />
      </header>

      <ul className="mt-5 space-y-1 border-t border-border/60 pt-3">
        {phase.tasks.map((task) => (
          <li key={task.id}>
            <TaskRow
              task={task}
              journeyId={journeyId}
              isNext={task.id === nextTaskId}
              onToggle={onToggleTask}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
