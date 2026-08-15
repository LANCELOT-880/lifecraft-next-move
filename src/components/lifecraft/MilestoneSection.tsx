import type { Phase, Task } from "@/lib/journey/types";
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

  return (
    <section className="surface-panel p-5 sm:p-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="text-eyebrow text-primary">
            Phase {String(phase.order).padStart(2, "0")} — {phase.title}
          </p>
          {phase.summary ? (
            <p className="mt-2 text-sm text-muted-foreground">{phase.summary}</p>
          ) : null}
        </div>
        <span className="shrink-0 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
          {done}/{phase.tasks.length}
        </span>
      </header>

      <ul className="mt-4 space-y-1">
        {phase.tasks.map((task) => (
          <li key={task.id}>
            <TaskRow task={task} journeyId={journeyId} isNext={task.id === nextTaskId} onToggle={onToggleTask} />
          </li>
        ))}
      </ul>
    </section>
  );
}
