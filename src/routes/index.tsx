import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { steps } from "@/data/mock";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIFECRAFT — Turn intentions into your next move" },
      {
        name: "description",
        content:
          "LIFECRAFT turns vague goals into clear journeys, meaningful progress and one actionable next step.",
      },
      { property: "og:title", content: "LIFECRAFT — Turn intentions into your next move" },
      {
        property: "og:description",
        content:
          "Turn vague goals into clear journeys, meaningful progress and one actionable next step.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-6 sm:px-8">
        <span className="font-display text-sm font-bold tracking-[0.28em]">LIFECRAFT</span>
        <nav aria-label="Primary" className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm">
            <Link to="/dashboard">Open app</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/create">Start</Link>
          </Button>
        </nav>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "var(--gradient-hero)" }}
          />
          <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
            <div>
              <p className="text-eyebrow text-primary">Lifecraft</p>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] sm:text-6xl">
                Turn intentions into your next move.
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                Turn vague goals into clear journeys, meaningful progress and one actionable next
                step.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button asChild size="lg">
                  <Link to="/create">
                    Start Your Journey <ArrowRight className="size-4" aria-hidden />
                  </Link>
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link to="/dashboard">See a live journey</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div
                className="rounded-2xl border border-primary/25 p-5 shadow-[var(--shadow-elevated)] sm:p-7"
                style={{ backgroundImage: "var(--gradient-surface)" }}
              >
                <div className="flex items-center gap-2">
                  <Zap className="size-3.5 text-primary" aria-hidden />
                  <p className="text-eyebrow text-primary">Next move</p>
                </div>
                <p className="mt-5 font-display text-2xl font-semibold sm:text-3xl">
                  Complete player movement
                </p>
                <p className="mt-2 text-sm text-muted-foreground">25 minutes · High impact</p>

                <div className="mt-7 space-y-2 border-t border-border pt-5">
                  {[
                    { label: "Learn Hiragana", state: "done" },
                    { label: "Lock the core concept", state: "done" },
                    { label: "Complete player movement", state: "current" },
                    { label: "Block out first level", state: "todo" },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-3">
                      <span
                        aria-hidden
                        className={`size-1.5 rounded-full ${
                          row.state === "current"
                            ? "bg-primary"
                            : row.state === "done"
                              ? "bg-muted-foreground/60"
                              : "bg-muted-foreground/25"
                        }`}
                      />
                      <span
                        className={`truncate text-sm ${
                          row.state === "current"
                            ? "text-foreground"
                            : row.state === "done"
                              ? "text-muted-foreground line-through"
                              : "text-muted-foreground"
                        }`}
                      >
                        {row.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="how-heading"
          className="mx-auto max-w-6xl px-5 pb-24 sm:px-8"
        >
          <h2 id="how-heading" className="text-eyebrow text-muted-foreground">
            How it works
          </h2>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
            {steps.map((step) => (
              <article key={step.n} className="bg-surface p-6 sm:p-7">
                <p className="font-display text-sm text-primary">{step.n}</p>
                <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-8 sm:px-8">
          <span className="font-display text-xs tracking-[0.28em] text-muted-foreground">
            LIFECRAFT
          </span>
          <span className="text-xs text-muted-foreground">Turn intentions into your next move.</span>
        </div>
      </footer>
    </div>
  );
}
