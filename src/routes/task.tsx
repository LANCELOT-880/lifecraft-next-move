import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { ResourceList } from "@/components/lifecraft/ResourceList";
import { Button } from "@/components/ui/button";
import { getLesson } from "@/lib/journey/lessons";
import { getResources } from "@/lib/journey/resources";
import { awardPracticeCompletion } from "@/lib/journey/rewards";
import { findTask, getNextMove, journeyStore } from "@/lib/journey/journeyStore";
import { useJourney } from "@/lib/journey/useJourneys";

export const Route = createFileRoute("/task")({
  validateSearch: (search: Record<string, unknown>) => ({
    journey: typeof search["journey"] === "string" ? (search["journey"] as string) : "",
    task: typeof search["task"] === "string" ? (search["task"] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Task Lesson — LIFECRAFT" },
      {
        name: "description",
        content:
          "Learn the concept, see examples, practise it and complete the task to advance your journey.",
      },
      { property: "og:title", content: "Task Lesson — LIFECRAFT" },
      {
        property: "og:description",
        content: "Learn, practise and complete the task that moves your journey forward.",
      },
    ],
  }),
  component: TaskLesson,
});

function TaskLesson() {
  const { journey: journeyId, task: taskId } = Route.useSearch();
  const navigate = useNavigate();
  const journey = useJourney(journeyId);
  const found = journey ? findTask(journey, taskId) : null;
  const [answers, setAnswers] = useState<Record<string, number>>({});

  if (!journey || !found) {
    return (
      <AppShell>
        <h1 className="text-2xl font-semibold sm:text-3xl">Task not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This task is no longer part of your journeys. Pick your next move to keep going.
        </p>
        <Button asChild className="mt-6 w-full sm:w-auto">
          <Link to="/next">Go to next move</Link>
        </Button>
      </AppShell>
    );
  }

  const { task, phase } = found;
  const lesson = getLesson(task, journey);
  const resources = getResources(task, journey);

  const answerAll = (next: Record<string, number>) => {
    if (!lesson) return;
    const allCorrect = lesson.practice.every((item) => next[item.id] === item.answerIndex);
    if (!allCorrect) return;
    const gained = awardPracticeCompletion(task.id);
    if (gained.xp > 0) toast.success(`Practice complete — +${gained.xp} XP`);
  };

  const complete = () => {
    const gained = task.completed
      ? { xp: 0, gems: 0 }
      : journeyStore.toggleTask(journey.id, task.id);
    const remaining = getNextMove({
      ...journey,
      phases: journey.phases.map((p) => ({
        ...p,
        tasks: p.tasks.map((item) => (item.id === task.id ? { ...item, completed: true } : item)),
      })),
    });
    const reward =
      gained.xp > 0 || gained.gems > 0 ? ` +${gained.xp} XP · +${gained.gems} Gems.` : "";
    toast.success("Task completed.", {
      description:
        (remaining ? "Your next move is ready." : "Every task in this journey is done.") + reward,
    });
    navigate({ to: "/next" });
  };

  return (
    <AppShell>
      <Link
        to="/goal"
        search={{ id: journey.id }}
        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-3.5" aria-hidden /> {journey.title}
      </Link>

      <p className="mt-4 text-eyebrow text-primary">
        Phase {String(phase.order).padStart(2, "0")} — {phase.title}
      </p>
      <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{task.title}</h1>

      <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
        {[
          { label: "Journey", value: journey.title },
          { label: "Time", value: `${task.estimatedMinutes} minutes` },
          { label: "Difficulty", value: task.difficulty },
          { label: "Impact", value: task.impact },
        ].map((item) => (
          <div key={item.label} className="bg-surface px-4 py-4">
            <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {item.label}
            </dt>
            <dd className="mt-1.5 truncate text-sm text-foreground">{item.value}</dd>
          </div>
        ))}
      </dl>

      {!lesson ? (
        <>
          <p className="mt-6 rounded-lg border border-border bg-surface-2/60 px-4 py-3 text-sm text-muted-foreground">
            Lesson content unavailable for this step yet. You can still work on the step and mark it
            complete.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" className="w-full sm:w-auto" onClick={complete}>
              {task.completed ? "Task completed" : "Complete Task"}
            </Button>
            <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
              <Link to="/goal" search={{ id: journey.id }}>
                Back to journey
              </Link>
            </Button>
          </div>
        </>
      ) : (
        <>
      <section className="surface-panel mt-6 p-5 sm:p-6" aria-labelledby="learn-heading">
        <h2 id="learn-heading" className="text-eyebrow text-muted-foreground">
          Learn
        </h2>
        <div className="mt-4 space-y-3">
          {lesson.learn.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-foreground/90">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      <section className="surface-panel mt-4 p-5 sm:p-6" aria-labelledby="examples-heading">
        <h2 id="examples-heading" className="text-eyebrow text-muted-foreground">
          Examples
        </h2>
        <ul className="mt-4 space-y-3">
          {lesson.examples.map((example) => (
            <li key={example.text} className="rounded-lg border border-border bg-surface-2/60 p-3">
              <p className="whitespace-pre-wrap break-words font-mono text-sm text-foreground">
                {example.text}
              </p>
              {example.meaning ? (
                <p className="mt-1.5 text-xs text-muted-foreground">{example.meaning}</p>
              ) : null}
            </li>
          ))}
        </ul>
      </section>

      <section className="surface-panel mt-4 p-5 sm:p-6" aria-labelledby="practice-heading">
        <h2 id="practice-heading" className="text-eyebrow text-muted-foreground">
          Check your understanding
        </h2>
        <div className="mt-4 space-y-6">
          {lesson.practice.map((item) => {
            const selected = answers[item.id];
            const isCorrect = selected === item.answerIndex;
            return (
              <div key={item.id}>
                <p className="text-sm font-medium">{item.question}</p>
                <div className="mt-3 grid gap-2">
                  {item.options.map((option, index) => {
                    const isPicked = selected === index;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => {
                            const next = { ...prev, [item.id]: index };
                            answerAll(next);
                            return next;
                          })
                        }
                        aria-pressed={isPicked}
                        className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                          isPicked && index === item.answerIndex
                            ? "border-primary/50 bg-accent-soft text-foreground"
                            : isPicked
                              ? "border-destructive/50 text-foreground"
                              : "border-border text-muted-foreground hover:bg-surface-2/60 hover:text-foreground"
                        }`}
                      >
                        <span className="grid size-5 shrink-0 place-items-center rounded-full border border-border text-[10px]">
                          {isPicked && index === item.answerIndex ? (
                            <Check className="size-3 text-primary" aria-hidden />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </span>
                        <span className="min-w-0 break-words">{option}</span>
                      </button>
                    );
                  })}
                </div>
                {selected !== undefined ? (
                  <p
                    className={`mt-2 text-xs ${isCorrect ? "text-primary" : "text-muted-foreground"}`}
                    role="status"
                  >
                    {isCorrect ? "Correct." : "Not quite. Try again."}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>
      </section>

      <section className="surface-panel mt-4 p-5 sm:p-6" aria-labelledby="exercise-heading">
        <h2 id="exercise-heading" className="text-eyebrow text-muted-foreground">
          Practice
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/90">{lesson.exercise}</p>
      </section>

      <ResourceList resources={resources} />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" className="w-full sm:w-auto" onClick={complete}>
          {task.completed ? "Task completed" : "Complete Task"}
        </Button>
        <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
          <Link to="/goal" search={{ id: journey.id }}>
            Back to journey
          </Link>
        </Button>
      </div>
        </>
      )}
    </AppShell>
  );
}
