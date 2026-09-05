import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { RewardsSummary } from "@/components/lifecraft/RewardsSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { user } from "@/data/mock";
import { settingsStore, useSettings } from "@/lib/settings/settingsStore";

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

function SettingsPage() {
  const settings = useSettings();
  const [name, setName] = useState(settings.fullName);
  const [reminders, setReminders] = useState(settings.dailyReminderEnabled);

  useEffect(() => {
    if (!settings.loaded) return;
    setName(settings.fullName);
    setReminders(settings.dailyReminderEnabled);
  }, [settings.dailyReminderEnabled, settings.fullName, settings.loaded]);

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
          const settingsSaved = settingsStore.update({
            fullName: name,
            dailyReminderEnabled: reminders,
          });
          if (settingsSaved) {
            toast.success("Preferences saved");
          } else {
            toast.error("Preferences could not be saved");
          }
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
              <Label htmlFor="account">Account</Label>
              <Input id="account" defaultValue={user.email} readOnly />
            </div>
          </div>
          <RewardsSummary className="mt-5" />
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
          <Button type="submit" className="w-full sm:w-auto">
            Save changes
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
