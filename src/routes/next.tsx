import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { Button } from "@/components/ui/button";
import { focusNextMove } from "@/data/mock";

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

const meta = [
  { label: "Journey", value: focusNextMove.journey },
  { label: "Time", value: `${focusNextMove.minutes} minutes` },
  { label: "Difficulty", value: focusNextMove.difficulty },
  { label: "Impact", value: focusNextMove.impact },
];

function NextMovePage() {
  return (
    <AppShell>
      <div className="relative mx-auto max-w-2xl">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-x-16 -top-24 h-72"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        />

        <div className="relative">
          <Zap
            aria-hidden
            className="size-16 text-primary/25 sm:size-20"
            strokeWidth={1}
          />

          <h1 className="mt-8 text-eyebrow text-muted-foreground">Your next move</h1>

          <p className="mt-4 font-display text-3xl font-semibold leading-tight sm:text-5xl">
            {focusNextMove.task}
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
            {meta.map((item) => (
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
              {focusNextMove.reason}
            </p>
          </section>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button
              size="lg"
              onClick={() =>
                toast.success("Task started", {
                  description: `${focusNextMove.minutes} minutes on ${focusNextMove.task}.`,
                })
              }
            >
              Start Task
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/goal">View journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
