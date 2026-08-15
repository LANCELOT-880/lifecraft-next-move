import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Circle } from "lucide-react";
import type { Task } from "@/lib/journey/types";

export function TaskRow({
  task,
  journeyId,
  isNext = false,
  onToggle,
}: {
  task: Task;
  journeyId?: string | undefined;
  isNext?: boolean;
  onToggle?: ((task: Task) => void) | undefined;
}) {
  const isDone = task.completed;
  const isCurrent = !isDone && isNext;

  const meta = `${task.estimatedMinutes} min · ${task.difficulty}`;

  const body = (
    <>
      <span className="min-w-0">
        <span
          className={`block truncate text-sm ${
            isDone ? "text-muted-foreground line-through" : "text-foreground"
          }`}
        >
          {task.title}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground sm:hidden">{meta}</span>
      </span>

      <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">{meta}</span>
      {journeyId ? (
        <ChevronRight className="hidden size-4 shrink-0 text-muted-foreground sm:block" aria-hidden />
      ) : null}
    </>
  );

  const bodyClass = `grid min-w-0 grid-cols-[minmax(0,1fr)] items-center gap-3 text-left sm:grid-cols-[minmax(0,1fr)_auto${
    journeyId ? "_auto" : ""
  }] sm:gap-4`;

  return (
    <div
      className={`grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border px-3 py-3 transition-colors duration-200 sm:gap-4 sm:px-4 ${
        isCurrent
          ? "border-primary/40 bg-accent-soft"
          : "border-transparent hover:border-border hover:bg-surface-2/60"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle?.(task)}
        aria-pressed={isDone}
        aria-label={`Mark ${task.title} as ${isDone ? "not completed" : "completed"}`}
        className={`grid size-6 shrink-0 place-items-center rounded-full border ${
          isDone
            ? "border-primary/50 bg-accent-soft text-primary"
            : isCurrent
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-muted-foreground"
        }`}
      >
        {isDone ? (
          <Check className="size-3.5" aria-hidden />
        ) : isCurrent ? (
          <ArrowRight className="size-3.5" aria-hidden />
        ) : (
          <Circle className="size-2" aria-hidden />
        )}
      </button>

      {journeyId ? (
        <Link to="/task" search={{ journey: journeyId, task: task.id }} className={bodyClass}>
          {body}
        </Link>
      ) : (
        <span className={bodyClass}>{body}</span>
      )}
    </div>
  );
}
