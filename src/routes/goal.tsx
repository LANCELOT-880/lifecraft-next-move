import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/lifecraft/AppShell";
import { MilestoneSection } from "@/components/lifecraft/MilestoneSection";
import { NextMoveCard } from "@/components/lifecraft/NextMoveCard";
import { ProgressMeter } from "@/components/lifecraft/ProgressMeter";
import { Button } from "@/components/ui/button";
import { allTasks, completedCount, getNextMove, journeyStore } from "@/lib/journey/journeyStore";
import { useJourney } from "@/lib/journey/useJourneys";

export const Route = createFileRoute("/goal")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search["id"] === "string" ? (search["id"] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Journey Details — LIFECRAFT" },
      {
        name: "description",
        content: "Phases, tasks and progress for your journey, with your recommended next move.",
      },
      { property: "og:title", content: "Journey Details — LIFECRAFT" },
      {
        property: "og:description",
        content: "Phases, tasks and progress for your journey, with your next move.",
      },
    ],
  }),
  component: GoalDetails,
});

function GoalDetails() {
  const { id } = Route.useSearch();
  const journey = useJourney(id);

  if (!journey) {
    return (
      <AppShell>
        <h1 className="text-2xl font-semibold sm:text-3xl">No journey yet</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create a goal to start crafting.</p>
        <Button asChild className="mt-6">
          <Link to="/create">Create a goal</Link>
        </Button>
      </AppShell>
    );
  }

  const tasks = allTasks(journey);
  const doneTasks = completedCount(journey);
  const nextMove = getNextMove(journey);
  const donePhases = journey.phases.filter((phase) => phase.tasks.every((t) => t.completed)).length;

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
              <dt className="text-xs text-muted-foreground">Phases</dt>
              <dd className="mt-1 font-display text-lg">
                {donePhases}/{journey.phases.length}
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
        <NextMoveCard move={nextMove} />
      </div>

      <section className="mt-12" aria-labelledby="phases-heading">
        <h2 id="phases-heading" className="text-eyebrow text-muted-foreground">
          Phases
        </h2>
        <div className="mt-4 space-y-4">
          {journey.phases.map((phase) => (
            <MilestoneSection
              key={phase.id}
              phase={phase}
              nextTaskId={nextMove?.taskId}
              onToggleTask={(task) => journeyStore.toggleTask(journey.id, task.id)}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
