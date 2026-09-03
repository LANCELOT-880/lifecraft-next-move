import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { MilestoneSection } from "@/components/lifecraft/MilestoneSection";
import { ProgressMeter } from "@/components/lifecraft/ProgressMeter";
import { Button } from "@/components/ui/button";
import { allTasks, getNextMove, journeyStore } from "@/lib/journey/journeyStore";
import { useJourney } from "@/lib/journey/useJourneys";
import { categoryLabels } from "@/lib/journey/types";

export const Route = createFileRoute("/roadmap")({
  validateSearch: (search: Record<string, unknown>) => ({
    id: typeof search["id"] === "string" ? (search["id"] as string) : "",
  }),
  head: () => ({
    meta: [
      { title: "Your Roadmap — LIFECRAFT" },
      {
        name: "description",
        content: "A drafted journey broken into phases, milestones and right-sized tasks.",
      },
      { property: "og:title", content: "Your Roadmap — LIFECRAFT" },
      {
        property: "og:description",
        content: "A drafted journey broken into phases, milestones and right-sized tasks.",
      },
    ],
  }),
  component: Roadmap,
});

function Roadmap() {
  const navigate = useNavigate();
  const { id } = Route.useSearch();
  const journey = useJourney(id);

  if (!journey) {
    const journeyMissing = Boolean(id);
    return (
      <AppShell>
        <h1 className="text-2xl font-semibold sm:text-3xl">
          {journeyMissing ? "Journey not found" : "No journey yet"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {journeyMissing
            ? "That journey does not exist. Choose one of your saved journeys."
            : "Describe a goal and LIFECRAFT will shape the roadmap around it."}
        </p>
        <Button asChild className="mt-6">
          <Link to={journeyMissing ? "/journeys" : "/create"}>
            {journeyMissing ? "View journeys" : "Create a goal"}
          </Link>
        </Button>
      </AppShell>
    );
  }

  const nextMove = getNextMove(journey);
  const tasks = allTasks(journey);

  return (
    <AppShell>
      <p className="text-eyebrow text-primary">{categoryLabels[journey.category]} journey</p>
      <div className="mt-3 min-w-0">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{journey.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            {journey.description}
          </p>
        </div>
      </div>

      <section className="surface-panel mt-6 p-5 sm:p-6" aria-label="Journey summary">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-eyebrow text-muted-foreground">Journey progress</p>
            <p className="mt-1 text-sm text-foreground">
              {tasks.filter((task) => task.completed).length}/{tasks.length} tasks complete
            </p>
          </div>
          <span className="font-display text-2xl text-primary">{journey.progress}%</span>
        </div>
        <div className="mt-4">
          <ProgressMeter value={journey.progress} ariaLabel="Overall progress" />
        </div>
        <dl className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Daily time</dt>
            <dd className="mt-1 text-sm">{journey.dailyTime}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Target date</dt>
            <dd className="mt-1 text-sm">{journey.targetDate || "Open-ended"}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-xs text-muted-foreground">Next move</dt>
            <dd className="mt-1 truncate text-sm">{nextMove ? nextMove.task : "All done"}</dd>
          </div>
          <div className="col-span-2 text-xs text-muted-foreground sm:col-span-3">
            {journey.phases.length} phases · {tasks.length} total tasks
          </div>
        </dl>
      </section>

      <div
        className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground"
        aria-label="Task status legend"
      >
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary" aria-hidden />
          Next move
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full bg-primary/40" aria-hidden />
          Completed
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-2 rounded-full border border-border" aria-hidden />
          Upcoming
        </span>
      </div>

      <div className="mt-4 space-y-4">
        {journey.phases.map((phase) => (
          <MilestoneSection
            key={phase.id}
            phase={phase}
            journeyId={journey.id}
            nextTaskId={nextMove?.taskId}
            onToggleTask={(task) => journeyStore.toggleTask(journey.id, task.id)}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          size="lg"
          onClick={() => {
            journeyStore.setActiveId(journey.id);
            toast.success("Journey started", { description: "Your first move is ready." });
            navigate({ to: "/goal", search: { id: journey.id } });
          }}
        >
          Start Journey
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link to="/create">New goal</Link>
        </Button>
      </div>
    </AppShell>
  );
}
