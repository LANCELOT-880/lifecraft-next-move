import { ArrowRight, Check, Circle } from "lucide-react";
import type { Task } from "@/data/mock";

export function TaskRow({
  task,
  onSelect,
}: {
  task: Task;
  onSelect?: ((task: Task) => void) | undefined;
}) {
  const isDone = task.status === "done";
  const isCurrent = task.status === "current";

  return (
    <button
      type="button"
      onClick={() => onSelect?.(task)}
      aria-label={`${task.title} — ${task.status}`}
      className={`grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border px-3 py-3 text-left transition-colors duration-200 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-4 sm:px-4 ${
        isCurrent
          ? "border-primary/40 bg-accent-soft"
          : "border-transparent hover:border-border hover:bg-surface-2/60"
      }`}
    >
      <span
        aria-hidden
        className={`grid size-6 shrink-0 place-items-center rounded-full border ${
          isDone
            ? "border-primary/50 bg-accent-soft text-primary"
            : isCurrent
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground"
        }`}
      >
        {isDone ? (
          <Check className="size-3.5" />
        ) : isCurrent ? (
          <ArrowRight className="size-3.5" />
        ) : (
          <Circle className="size-2" />
        )}
      </span>

      <span className="min-w-0">
        <span
          className={`block truncate text-sm ${
            isDone ? "text-muted-foreground line-through" : "text-foreground"
          }`}
        >
          {task.title}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground sm:hidden">
          {task.minutes} min · {task.difficulty}
        </span>
      </span>

      <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
        {task.minutes} min · {task.difficulty}
      </span>
    </button>
  );
}