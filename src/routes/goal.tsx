import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { MilestoneSection } from "@/components/lifecraft/MilestoneSection";
import { NextMoveCard } from "@/components/lifecraft/NextMoveCard";
import { ProgressMeter } from "@/components/lifecraft/ProgressMeter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const timeOptions = ["15 min", "30 min", "1 hour", "Flexible"];

function JourneySettings({ journey }: { journey: NonNullable<ReturnType<typeof useJourney>> }) {
  const [dailyTime, setDailyTime] = useState(journey.dailyTime);
  const [targetDate, setTargetDate] = useState(journey.targetDate);

  return (
    <form
      className="surface-panel mt-8 p-5 sm:p-6"
      onSubmit={(event) => {
        event.preventDefault();
        if (journeyStore.updateJourneySettings(journey.id, { dailyTime, targetDate })) {
          toast.success("Journey settings saved");
        } else {
          toast.error("Journey settings could not be saved");
        }
      }}
    >
      <h2 className="text-base font-semibold">Journey settings</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        These settings apply only to this journey.
      </p>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div className="space-y-3">
          <Label>Daily time budget</Label>
          <div role="radiogroup" aria-label="Daily time budget" className="flex flex-wrap gap-2">
            {timeOptions.map((option) => (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={dailyTime === option}
                onClick={() => setDailyTime(option)}
                className={`rounded-lg border px-4 py-2 text-sm transition-colors duration-200 ${
                  dailyTime === option
                    ? "border-primary/50 bg-accent-soft text-foreground"
                    : "border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="target-date">Target date</Label>
          <Input
            id="target-date"
            type="date"
            value={targetDate}
            onChange={(event) => setTargetDate(event.target.value)}
          />
        </div>
      </div>
      <Button type="submit" className="mt-5 w-full sm:w-auto">
        Save journey settings
      </Button>
    </form>
  );
}

function GoalDetails() {
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
            : "Create a goal to start crafting."}
        </p>
        <Button asChild className="mt-6">
          <Link to={journeyMissing ? "/journeys" : "/create"}>
            {journeyMissing ? "View journeys" : "Create a goal"}
          </Link>
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

      <JourneySettings
        key={`${journey.id}:${journey.dailyTime}:${journey.targetDate}`}
        journey={journey}
      />

      <section className="mt-12" aria-labelledby="phases-heading">
        <h2 id="phases-heading" className="text-eyebrow text-muted-foreground">
          Phases
        </h2>
        <div className="mt-4 space-y-4">
          {journey.phases.map((phase) => (
            <MilestoneSection
              key={phase.id}
              phase={phase}
              journeyId={journey.id}
              onToggleTask={(task) => journeyStore.toggleTask(journey.id, task.id)}
            />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
