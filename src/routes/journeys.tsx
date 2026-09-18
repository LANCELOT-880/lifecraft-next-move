import { createFileRoute, Link } from "@tanstack/react-router";
import { useSyncExternalStore } from "react";
import { Plus } from "lucide-react";
import { AppShell } from "@/components/lifecraft/AppShell";
import { JourneyCard } from "@/components/lifecraft/JourneyCard";
import { Button } from "@/components/ui/button";
import { journeyStore } from "@/lib/journey/journeyStore";
import { useJourneys } from "@/lib/journey/useJourneys";

export const Route = createFileRoute("/journeys")({
  head: () => ({
    meta: [
      { title: "My Journeys — LIFECRAFT" },
      {
        name: "description",
        content: "Every goal you're crafting, with phases, milestones and live progress.",
      },
      { property: "og:title", content: "My Journeys — LIFECRAFT" },
      {
        property: "og:description",
        content: "Every goal you're crafting, with phases, milestones and live progress.",
      },
    ],
  }),
  component: Journeys,
});

function Journeys() {
  const journeys = useJourneys();
  const activeId = useSyncExternalStore(
    journeyStore.subscribe,
    journeyStore.getActiveId,
    () => null,
  );

  return (
    <AppShell>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold sm:text-3xl">My Journeys</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {journeys.length} journeys in motion.
          </p>
        </div>
        <Button asChild variant="secondary" className="shrink-0">
          <Link to="/create">
            <Plus className="size-4" aria-hidden /> New goal
          </Link>
        </Button>
      </header>

      {journeys.length > 0 ? (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {journeys.map((journey) => (
              <JourneyCard key={journey.id} journey={journey} isActive={journey.id === activeId} />
            ))}
          </div>

          <section className="surface-panel mt-6 flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
            <div>
              <h2 className="text-base font-semibold">Room for one more intention</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Describe a goal in plain words and LIFECRAFT will shape the journey around it.
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link to="/create">Create a journey</Link>
            </Button>
          </section>
        </>
      ) : (
        <section className="surface-panel mt-8 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Your first journey starts here</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Describe a goal in plain words and LIFECRAFT will shape it into a clear path with a next
            move.
          </p>
          <Button asChild className="mt-6">
            <Link to="/create">Create your first journey</Link>
          </Button>
        </section>
      )}
    </AppShell>
  );
}
