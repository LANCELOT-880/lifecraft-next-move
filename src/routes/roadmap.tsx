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
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">{journey.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{journey.description}</p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {journey.phases.length} phases · {tasks.length} tasks
        </span>
      </div>

      <section className="surface-panel mt-6 p-5 sm:p-6" aria-label="Journey summary">
        <ProgressMeter value={journey.progress} label="Overall progress" />
        <dl className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Daily time</dt>
            <dd className="mt-1 truncate text-sm">{journey.dailyTime}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Target date</dt>
            <dd className="mt-1 truncate text-sm">{journey.targetDate || "Open-ended"}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="text-xs text-muted-foreground">Next move</dt>
            <dd className="mt-1 truncate text-sm">{nextMove ? nextMove.task : "All done"}</dd>
          </div>
        </dl>
      </section>

      <div className="mt-6 space-y-4">
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
