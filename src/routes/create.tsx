import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requireAuthenticatedUser } from "@/lib/auth/redirect";
import {
  generateJourney,
  getNextGenerationProvider,
  type GenerationProvider,
  type GeneratedJourneyResponse,
} from "@/lib/journey/generateJourney";
import { journeyStore } from "@/lib/journey/journeyStore";
import {
  demoGeneratedJourney,
  demoJourneyInput,
} from "@/data/demoJourney";

export const Route = createFileRoute("/create")({
  beforeLoad: ({ context, location }) => {
    requireAuthenticatedUser(context, location);
  },
  head: () => ({
    meta: [
      { title: "Create a Goal — LIFECRAFT" },
      {
        name: "description",
        content: "Describe what you want to accomplish and LIFECRAFT drafts the journey.",
      },
      { property: "og:title", content: "Create a Goal — LIFECRAFT" },
      {
        property: "og:description",
        content: "Describe what you want to accomplish and LIFECRAFT drafts the journey.",
      },
    ],
  }),
  component: CreateGoal,
});

const timeOptions = ["15 min", "30 min", "1 hour", "Flexible"];

function CreateGoal() {
  const navigate = useNavigate();
  const [goal, setGoal] = useState("");
  const [why, setWhy] = useState("");
  const [daily, setDaily] = useState("30 min");
  const [targetDate, setTargetDate] = useState("");
  const [error, setError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [provider, setProvider] = useState<GenerationProvider>("gemini");
  const isGeneratingRef = useRef(false);
  const hasCreatedJourneyRef = useRef(false);
  const generateJourneyFn = useServerFn(generateJourney);

  const createJourney = async () => {
    if (isGeneratingRef.current || hasCreatedJourneyRef.current) return;
    if (!goal.trim()) {
      setError("Describe your goal before creating a journey.");
      return;
    }

    setError("");
    isGeneratingRef.current = true;
    setIsGenerating(true);
    let generated: GeneratedJourneyResponse | undefined;
    try {
      generated = await generateJourneyFn({
        data: { goal, why, dailyTime: daily, targetDate, provider },
      });
    } catch (caught) {
      const message = "AI generation is temporarily unavailable. Try again.";
      setProvider(getNextGenerationProvider(provider));
      setError(message);
      toast.error("Could not create your journey", {
        description: message,
      });
    }

    isGeneratingRef.current = false;
    setIsGenerating(false);

    if (generated) {
      hasCreatedJourneyRef.current = true;
      setProvider("gemini");
      const journey = journeyStore.createGenerated(
        { goal, why, dailyTime: daily, targetDate },
        generated,
      );
      toast.success("Your journey is ready.");
      await navigate({ to: "/roadmap", search: { id: journey.id } });
    }
  };

  const createDemoJourney = async () => {
  if (isGeneratingRef.current || hasCreatedJourneyRef.current) return;

  hasCreatedJourneyRef.current = true;
  setError("");

  try {
    const journey = journeyStore.createGenerated(
      demoJourneyInput,
      demoGeneratedJourney as unknown as GeneratedJourneyResponse,
    );

    toast.success("Demo journey loaded", {
      description:
        "A prebuilt Python journey was loaded for project demonstration.",
    });

    await navigate({
      to: "/roadmap",
      search: { id: journey.id },
    });
  } catch (caught) {
    hasCreatedJourneyRef.current = false;

    console.error("Could not create demo journey", caught);

    toast.error("Could not load demo journey.");
  }
};

  const isAttemptRunning = isGenerating || isGeneratingRef.current;

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-semibold sm:text-3xl">What do you want to accomplish?</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Write it however it lives in your head. Structure comes next.
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            void createJourney();
          }}
        >
          <div className="surface-panel p-5 sm:p-6">
            <Label htmlFor="goal" className="text-eyebrow text-muted-foreground">
              Your goal
            </Label>
            <Textarea
              id="goal"
              value={goal}
              onChange={(e) => {
                setGoal(e.target.value);
                if (error) setError("");
              }}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? "goal-error" : undefined}
              placeholder="I want to learn Japanese..."
              className="mt-3 min-h-32 resize-none border-0 bg-transparent px-0 font-display text-lg shadow-none focus-visible:ring-0 md:text-xl"
            />
            {error ? (
              <p id="goal-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            ) : null}
          </div>

          <div className="surface-panel space-y-6 p-5 sm:p-6">
            <div className="space-y-2">
              <Label htmlFor="why">Why is this important?</Label>
              <Input
                id="why"
                value={why}
                onChange={(e) => setWhy(e.target.value)}
                placeholder="Optional — it keeps you honest on hard days"
              />
            </div>

            <div className="space-y-3">
              <span id="daily-label" className="block text-sm font-medium">
                Available daily time
              </span>
              <div role="radiogroup" aria-labelledby="daily-label" className="flex flex-wrap gap-2">
                {timeOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    role="radio"
                    aria-checked={daily === option}
                    onClick={() => setDaily(option)}
                    className={`rounded-lg border px-4 py-2 text-sm transition-colors duration-200 ${
                      daily === option
                        ? "border-primary/50 bg-accent-soft text-foreground"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 sm:max-w-56">
              <Label htmlFor="target">Target date</Label>
              <Input
                id="target"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={isAttemptRunning}
            >
              {isAttemptRunning ? "Building your journey..." : "Create My Journey"}
            </Button>

            {isAttemptRunning ? (
              <p className="text-sm text-muted-foreground">
                LIFECRAFT is creating your personalized roadmap. Complex goals may take a few
                seconds.
              </p>
            ) : null}

            {!isAttemptRunning && error && goal.trim() ? (
              <div className="space-y-3">
                <p role="alert" className="text-sm text-destructive">
                  {error}
                </p>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isAttemptRunning}
                    onClick={() => {
                      void createJourney();
                  }}
                >
                  Retry generation
                </Button>

                <Button
                  type="button"
                  variant="secondary"
                  disabled={isAttemptRunning}
                  onClick={() => {
                    void createDemoJourney();
                  }}
                >
                  Load Demo Journey
                </Button>
              </div>

              <p className="text-xs text-muted-foreground">
                Demo Journey loads a prebuilt sample for project demonstration when
                external AI services are unavailable.
              </p>
            </div>
          ) : null}
          </div>
        </form>
      </div>
    </AppShell>
  );
}
