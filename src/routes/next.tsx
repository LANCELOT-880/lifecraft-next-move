import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { Button } from "@/components/ui/button";
import { getNextMove, journeyStore } from "@/lib/journey/journeyStore";
import { useJourney } from "@/lib/journey/useJourneys";

export const Route = createFileRoute("/next")({
  head: () => ({
    meta: [
      { title: "Your Next Move — LIFECRAFT" },
      {
        name: "description",
        content: "One recommended action, sized to your time, chosen to move your current milestone.",
      },
      { property: "og:title", content: "Your Next Move — LIFECRAFT" },
      {
        property: "og:description",
        content: "One recommended action, sized to your time and chosen for impact.",
      },
    ],
  }),
  component: NextMovePage,
});

function NextMovePage() {
  const journey = useJourney();
  const move = journey ? getNextMove(journey) : null;

  return (
    <AppShell>
      <div className="relative mx-auto max-w-2xl overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-72"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        />

        <div className="relative">
          <Zap aria-hidden className="size-16 text-primary/25 sm:size-20" strokeWidth={1} />

          <h1 className="mt-8 text-eyebrow text-muted-foreground">Your next move</h1>

          <p className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
            {move ? move.task : "Nothing queued right now."}
          </p>

          {move ? (
            <>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
                {[
                  { label: "Journey", value: move.journey },
                  { label: "Time", value: `${move.minutes} minutes` },
                  { label: "Difficulty", value: move.difficulty },
                  { label: "Impact", value: move.impact },
                ].map((item) => (
                  <div key={item.label} className="bg-surface px-4 py-4">
                    <dt className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {item.label}
                    </dt>
                    <dd className="mt-1.5 truncate text-sm text-foreground">{item.value}</dd>
                  </div>
                ))}
              </dl>

              <section className="mt-10" aria-labelledby="why-this">
                <h2 id="why-this" className="text-base font-semibold">
                  Why this?
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  {move.reason}
                </p>
              </section>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <Link to="/task" search={{ journey: move.journeyId, task: move.taskId }}>
                    Start Task
                  </Link>
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={() => {
                    journeyStore.toggleTask(move.journeyId, move.taskId);
                    toast.success("Task completed", { description: move.task });
                  }}
                >
                  Mark complete
                </Button>
                <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                  <Link to="/goal" search={{ id: move.journeyId }}>
                    View journey
                  </Link>
                </Button>
              </div>
            </>
          ) : (
            <div className="mt-10">
              <p className="text-sm text-muted-foreground">
                Every task in this journey is complete. Craft a new goal to keep moving.
              </p>
              <Button asChild size="lg" className="mt-6 w-full sm:w-auto">
                <Link to="/create">Create a goal</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
