import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { MilestoneSection } from "@/components/lifecraft/MilestoneSection";
import { NextMoveCard } from "@/components/lifecraft/NextMoveCard";
import { ProgressMeter } from "@/components/lifecraft/ProgressMeter";
import { focusNextMove, journeys } from "@/data/mock";

export const Route = createFileRoute("/goal")({
  head: () => ({
    meta: [
      { title: "Learn Japanese — LIFECRAFT" },
      {
        name: "description",
        content: "Milestones, tasks and progress for your Japanese journey, with your next move.",
      },
      { property: "og:title", content: "Learn Japanese — LIFECRAFT" },
      {
        property: "og:description",
        content: "Milestones, tasks and progress for your Japanese journey.",
      },
    ],
  }),
  component: GoalDetails,
});

function GoalDetails() {
  const journey = journeys[0]!;
  const tasks = journey.milestones.flatMap((m) => m.tasks);
  const doneTasks = tasks.filter((t) => t.status === "done").length;

  return (
    <AppShell>
      <p className="text-eyebrow text-muted-foreground">Journey</p>
      <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{journey.title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{journey.description}</p>

      <section className="surface-panel mt-8 p-5 sm:p-6" aria-label="Overall progress">
        <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <ProgressMeter value={journey.progress} label="Overall progress" />
          <dl className="grid grid-cols-2 gap-6 sm:gap-10">
            <div>
              <dt className="text-xs text-muted-foreground">Milestones</dt>
              <dd className="mt-1 font-display text-lg">
                {journey.milestonesDone}/{journey.milestonesTotal}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Tasks done</dt>
              <dd className="mt-1 font-display text-lg">
                {doneTasks}/{tasks.length}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <div className="mt-6">
        <NextMoveCard move={focusNextMove} />
      </div>

      <section className="mt-12" aria-labelledby="milestones-heading">
        <h2 id="milestones-heading" className="text-eyebrow text-muted-foreground">
          Milestones
        </h2>
        <div className="mt-4 space-y-4">
          {journey.milestones.map((milestone) => (
            <MilestoneSection
              key={milestone.id}
              milestone={milestone}
              onSelectTask={(task) =>
                toast(task.title, {
                  description:
                    task.status === "done"
                      ? "Already completed."
                      : `${task.minutes} min · ${task.difficulty} · ${task.impact}`,
                })
              }
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
