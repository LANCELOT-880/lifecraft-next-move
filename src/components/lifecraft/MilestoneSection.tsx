import type { Milestone, Task } from "@/data/mock";
import { TaskRow } from "./TaskRow";

export function MilestoneSection({
  milestone,
  onSelectTask,
}: {
  milestone: Milestone;
  onSelectTask?: (task: Task) => void;
}) {
  const done = milestone.tasks.filter((t) => t.status === "done").length;

  return (
    <section className="surface-panel p-5 sm:p-6">
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <p className="text-eyebrow text-primary">
            {milestone.index} — {milestone.name}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{milestone.summary}</p>
        </div>
        <span className="shrink-0 rounded-md border border-border px-2 py-1 text-xs text-muted-foreground">
          {done}/{milestone.tasks.length}
        </span>
      </header>

      <ul className="mt-4 space-y-1">
        {milestone.tasks.map((task) => (
          <li key={task.id}>
            <TaskRow task={task} onSelect={onSelectTask} />
          </li>
        ))}
      </ul>
    </section>
  );
}