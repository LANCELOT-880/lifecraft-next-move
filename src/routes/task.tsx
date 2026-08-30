import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check, ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { ResourceList } from "@/components/lifecraft/ResourceList";
import { RewardsSummary } from "@/components/lifecraft/RewardsSummary";
import { Button } from "@/components/ui/button";
import { getLesson, type Lesson } from "@/lib/journey/lessons";
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

// prettier-ignore
function TaskLesson() {
  const { journey: journeyId, task: taskId } = Route.useSearch();
  const navigate = useNavigate();
  const journey = useJourney(journeyId);
  const found = journey ? findTask(journey, taskId) : null;

  if (!journey || !found) {
    const journeyMissing = Boolean(journeyId) && !journey;
    return (
      <AppShell>
        <h1 className="text-2xl font-semibold sm:text-3xl">
          {journeyMissing ? "Journey not found" : "Task not found"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {journeyMissing
            ? "That journey does not exist. Choose one of your saved journeys to keep going."
            : "This task is no longer part of the selected journey. Pick your next move to keep going."}
        </p>
        <Button asChild className="mt-6 w-full sm:w-auto">
          <Link to={journeyMissing ? "/journeys" : "/next"}>
            {journeyMissing ? "View journeys" : "Go to next move"}
          </Link>
        </Button>
      </AppShell>
    );
  }

  const { task, phase } = found;
  const lesson = getLesson(task, journey);
  const resources = getResources(task, journey);

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
    toast.success("Task completed.", {
      description:
        (gained.xp > 0 || gained.gems > 0
          ? `+${gained.xp} XP · +${gained.gems} Gems. `
          : "Already rewarded. ") + (remaining ? "Your next move is ready." : "Every task in this journey is done."),
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

      <RewardsSummary className="mt-4" />

      {!lesson ? (
        <>
          <p className="mt-6 rounded-lg border border-border bg-surface-2/60 px-4 py-3 text-sm text-muted-foreground">
            Lesson content unavailable for this step yet. You can still work on the step and mark it
            complete.
          </p>
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

      <PracticeSection key={task.id} lesson={lesson} taskId={task.id} taskTitle={task.title} />

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

function shuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];
    const swap = shuffled[swapIndex];
    if (current === undefined || swap === undefined) continue;
    shuffled[index] = swap;
    shuffled[swapIndex] = current;
  }
  return shuffled;
}

function PracticeSection({
  lesson,
  taskId,
  taskTitle,
}: {
  lesson: Lesson;
  taskId: string;
  taskTitle: string;
}) {
  const [questions, setQuestions] = useState(() => lesson.practice);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  useEffect(() => {
    setQuestions(
      lesson.practice.map((question) => ({
        ...question,
        answers: shuffle(question.answers),
      })),
    );
    setAnswers({});
  }, [lesson, taskId]);

  const answerAll = (next: Record<string, string>) => {
    const allCorrect = questions.every((question) =>
      question.answers.some((answer) => answer.id === next[question.id] && answer.isCorrect),
    );
    if (!allCorrect) return;
    const gained = awardPracticeCompletion(taskId, taskTitle);
    if (gained.xp > 0) toast.success(`Practice complete — +${gained.xp} XP`);
  };

  return (
    <section className="surface-panel mt-4 p-5 sm:p-6" aria-labelledby="practice-heading">
      <h2 id="practice-heading" className="text-eyebrow text-muted-foreground">
        Check your understanding
      </h2>
      <div className="mt-4 space-y-6">
        {questions.map((question) => {
          const selected = answers[question.id];
          const selectedAnswer = question.answers.find((answer) => answer.id === selected);
          const isCorrect = selectedAnswer?.isCorrect === true;
          return (
            <div key={question.id}>
              <p className="text-sm font-medium">{question.question}</p>
              <div className="mt-3 grid gap-2">
                {question.answers.map((answer, index) => {
                  const isPicked = selected === answer.id;
                  return (
                    <button
                      key={answer.id}
                      type="button"
                      onClick={() =>
                        setAnswers((previous) => {
                          const next = { ...previous, [question.id]: answer.id };
                          answerAll(next);
                          return next;
                        })
                      }
                      aria-pressed={isPicked}
                      className={`grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition-colors duration-200 ${
                        isPicked && answer.isCorrect
                          ? "border-primary/50 bg-accent-soft text-foreground"
                          : isPicked
                            ? "border-destructive/50 text-foreground"
                            : "border-border text-muted-foreground hover:bg-surface-2/60 hover:text-foreground"
                      }`}
                    >
                      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-border text-[10px]">
                        {isPicked && answer.isCorrect ? (
                          <Check className="size-3 text-primary" aria-hidden />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </span>
                      <span className="min-w-0 break-words">{answer.text}</span>
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
  );
}
