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

  return (
    <section className="surface-panel overflow-hidden p-5 sm:p-6">
      <header className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-start sm:gap-8">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-eyebrow text-primary">
              Phase {String(phase.order).padStart(2, "0")}
            </p>
            <span className="text-xs text-muted-foreground">
              {done}/{phase.tasks.length} tasks
            </span>
          </div>
          <h2 className="mt-2 text-xl font-semibold">{phase.title}</h2>
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
