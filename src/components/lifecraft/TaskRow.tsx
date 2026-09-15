import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight, Circle } from "lucide-react";
import { REWARDS } from "@/lib/journey/rewards";
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
  const xpReward = task.xpReward ?? REWARDS.lessonXp;
  const gemReward = task.gemReward ?? REWARDS.stepGems;

  const body = (
    <>
      <span className="min-w-0">
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span
            className={`min-w-0 truncate text-sm ${
              isDone
                ? "text-muted-foreground/70 line-through"
                : isCurrent
                  ? "font-medium text-foreground"
                  : "text-foreground"
            }`}
          >
            {task.title}
          </span>
          {isCurrent ? (
            <span className="shrink-0 rounded-full border border-primary/35 bg-accent-soft px-2 py-0.5 text-[0.625rem] font-semibold uppercase tracking-[0.12em] text-primary">
              NEXT MOVE
            </span>
          ) : null}
        </span>
        <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.6875rem] text-muted-foreground sm:hidden">
          <span>{meta}</span>
          <span className="text-border" aria-hidden>
            ·
          </span>
          <span>{task.impact}</span>
          <span className="text-primary/80">+{xpReward} XP</span>
          <span className="text-primary/80">+{gemReward} Gems</span>
        </span>
      </span>

      <span className="hidden shrink-0 items-center gap-3 whitespace-nowrap text-left text-[0.6875rem] text-muted-foreground sm:grid sm:grid-cols-[4.5rem_5rem_7rem_8.5rem]">
        <span className="truncate">{task.estimatedMinutes} min</span>
        <span className="truncate">{task.difficulty}</span>
        <span className="truncate">{task.impact}</span>
        <span className="truncate text-primary/80">
          +{xpReward} XP · +{gemReward} Gems
        </span>
      </span>
      {journeyId ? (
        <ChevronRight
          className="hidden size-4 shrink-0 text-muted-foreground sm:block"
          aria-hidden
        />
      ) : null}
    </>
  );

  const bodyClass =
    "grid min-w-0 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 text-left sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-4";

  return (
    <div
      className={`grid w-full grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border px-3 py-2.5 transition-colors duration-200 sm:gap-4 sm:px-4 ${
        isCurrent
          ? "border-primary/70 bg-primary/15 shadow-[inset_3px_0_0_hsl(var(--primary)),0_0_18px_-12px_hsl(var(--primary))]"
          : isDone
            ? "border-transparent bg-surface-2/40"
            : "border-transparent hover:border-border hover:bg-surface-2/60"
      }`}
    >
      <button
        type="button"
        onClick={() => onToggle?.(task)}
        aria-pressed={isDone}
        aria-label={`Mark ${task.title} as ${isDone ? "not completed" : "completed"}`}
        className={`grid size-7 shrink-0 place-items-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
          isDone
            ? "border-primary/40 bg-accent-soft/70 text-primary/70"
            : isCurrent
              ? "border-primary bg-primary text-primary-foreground shadow-[0_0_0_3px_hsl(var(--accent-soft))]"
              : "border-border/80 text-muted-foreground hover:border-primary/50 hover:text-foreground"
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
