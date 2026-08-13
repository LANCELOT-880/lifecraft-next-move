import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { user } from "@/data/mock";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — LIFECRAFT" },
      { name: "description", content: "Manage your LIFECRAFT profile, daily time budget and reminders." },
      { property: "og:title", content: "Settings — LIFECRAFT" },
      {
        property: "og:description",
        content: "Manage your profile, daily time budget and reminders.",
      },
    ],
  }),
  component: SettingsPage,
});

const timeOptions = ["15 min", "30 min", "1 hour", "Flexible"];

function SettingsPage() {
  const [name, setName] = useState(user.fullName);
  const [daily, setDaily] = useState(user.dailyTime);
  const [reminders, setReminders] = useState(true);

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Preferences shape how your next move is chosen.
      </p>

      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Preferences saved");
        }}
      >
        <section className="surface-panel p-5 sm:p-6">
          <h2 className="text-base font-semibold">Profile</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
          </div>
        </section>

        <section className="surface-panel p-5 sm:p-6">
          <h2 className="text-base font-semibold">Daily time budget</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Next moves are sized to fit this window.
          </p>
          <div
            role="radiogroup"
            aria-label="Daily time budget"
            className="mt-5 flex flex-wrap gap-2"
          >
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
        </section>

        <section className="surface-panel grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 sm:p-6">
          <div className="min-w-0">
            <h2 className="text-base font-semibold">Daily next-move reminder</h2>
            <p className="mt-1 text-sm text-muted-foreground">One nudge a day. Nothing else.</p>
          </div>
          <Switch
            checked={reminders}
            onCheckedChange={setReminders}
            aria-label="Daily next-move reminder"
            className="shrink-0"
          />
        </section>

        <div className="flex justify-end">
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </AppShell>
  );
}
