import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/lifecraft/AppShell";
import { JourneyCard } from "@/components/lifecraft/JourneyCard";
import { NextMoveCard } from "@/components/lifecraft/NextMoveCard";
import { RewardsSummary } from "@/components/lifecraft/RewardsSummary";
import { Button } from "@/components/ui/button";
import { user } from "@/data/mock";
import { getNextMove } from "@/lib/journey/journeyStore";
import { useJourney, useJourneys } from "@/lib/journey/useJourneys";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LIFECRAFT" },
      {
        name: "description",
        content: "See your active journeys, milestone progress and today's single next move.",
      },
      { property: "og:title", content: "Dashboard — LIFECRAFT" },
      {
        property: "og:description",
        content: "Track journeys, milestones and your recommended next move.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const journeys = useJourneys();
  const activeJourney = useJourney();
  const nextMove = activeJourney ? getNextMove(activeJourney) : null;

  return (
    <AppShell>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">Good evening, {user.name}.</h1>
          <p className="mt-2 text-sm text-muted-foreground">What are you building?</p>
        </div>
        <Button asChild variant="secondary" className="shrink-0">
          <Link to="/create">
            <Plus className="size-4" aria-hidden /> Create New Goal
          </Link>
        </Button>
      </header>

      <div className="mt-8">
        <NextMoveCard move={nextMove} />
      </div>

      <RewardsSummary className="mt-4" />

      <section className="mt-12" aria-labelledby="journeys-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="journeys-heading" className="text-eyebrow text-muted-foreground">
            Active journeys
          </h2>
          <Link to="/journeys" className="text-xs text-muted-foreground hover:text-foreground">
            View all
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {journeys.map((journey) => (
            <JourneyCard key={journey.id} journey={journey} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
