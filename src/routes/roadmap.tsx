import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { MilestoneSection } from "@/components/lifecraft/MilestoneSection";
import { Button } from "@/components/ui/button";
import { journeys } from "@/data/mock";

export const Route = createFileRoute("/roadmap")({
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
  const journey = journeys[0]!;

  return (
    <AppShell>
      <p className="text-eyebrow text-primary">Drafted journey</p>
      <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">{journey.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{journey.description}</p>
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          3 phases · {journey.milestones.reduce((n, m) => n + m.tasks.length, 0)} tasks
        </span>
      </div>

      <div className="mt-8 space-y-4">
        {journey.milestones.map((milestone) => (
          <MilestoneSection key={milestone.id} milestone={milestone} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button
          size="lg"
          onClick={() => {
            toast.success("Journey started", { description: "Your first move is ready." });
            navigate({ to: "/goal" });
          }}
        >
          Start Journey
        </Button>
        <Button asChild variant="secondary" size="lg">
          <Link to="/create">Edit Journey</Link>
        </Button>
      </div>
    </AppShell>
  );
}
