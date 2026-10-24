import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { AppShell } from "@/components/lifecraft/AppShell";
import { requireAuthenticatedUser } from "@/lib/auth/redirect";
import { RewardsSummary } from "@/components/lifecraft/RewardsSummary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { user } from "@/data/mock";
import { settingsStore, useSettings } from "@/lib/settings/settingsStore";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { useAuthState } from "@/lib/supabase/use-auth-state";

export const Route = createFileRoute("/settings")({
  beforeLoad: ({ context, location }) => {
    requireAuthenticatedUser(context, location);
  },
  head: () => ({
    meta: [
      { title: "Settings — LIFECRAFT" },
      {
        name: "description",
        content: "Manage your LIFECRAFT profile, daily time budget and reminders.",
      },
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
  const { user: authUser, setUser: setAuthUser } = useAuthState();
  const settings = useSettings();
  const [name, setName] = useState(settings.fullName);
  const [reminders, setReminders] = useState(settings.dailyReminderEnabled);
  const [reminderTime, setReminderTime] = useState(settings.dailyReminderTime);
  const [saving, setSaving] = useState(false);
  const metadataName = authUser?.user_metadata["full_name"];
  const authenticatedName = authUser
    ? (typeof metadataName === "string" && metadataName.trim()) ||
      authUser.email ||
      settings.fullName
    : "";

  useEffect(() => {
    if (!settings.loaded) return;
    setName(authUser ? authenticatedName : settings.fullName);
    setReminders(settings.dailyReminderEnabled);
    setReminderTime(settings.dailyReminderTime);
  }, [
    authUser,
    authenticatedName,
    settings.dailyReminderEnabled,
    settings.dailyReminderTime,
    settings.fullName,
    settings.loaded,
  ]);

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length > 100) {
      toast.error("Enter a name between 1 and 100 characters.");
      return;
    }

    setSaving(true);
    try {
      if (authUser) {
        const { data, error } = await getSupabaseBrowserClient().auth.updateUser({
          data: { full_name: trimmedName },
        });
        if (error || !data.user) {
          setName(authenticatedName);
          toast.error("Your profile name could not be updated. Please try again.");
          return;
        }

        setAuthUser(data.user);
        setName(trimmedName);
        if (authUser) setName(authenticatedName);
        if (
          !settingsStore.updatePreferences({
            dailyReminderEnabled: reminders,
            dailyReminderTime: reminderTime,
          })
        ) {
          toast.error("Your name was updated, but reminder preferences could not be saved.");
          return;
        }
      } else {
        const settingsSaved = settingsStore.update({
          fullName: trimmedName,
          dailyReminderEnabled: reminders,
          dailyReminderTime: reminderTime,
        });
        if (!settingsSaved) {
          toast.error("Preferences could not be saved");
          return;
        }
      }

      toast.success("Preferences saved");
    } catch {
      toast.error("Your profile could not be saved. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold sm:text-3xl">Settings</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Preferences shape how your next move is chosen.
      </p>

      <form className="mt-8 space-y-4" onSubmit={(event) => void handleSave(event)}>
        <section className="surface-panel p-5 sm:p-6">
          <h2 className="text-base font-semibold">Profile</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                maxLength={100}
                onChange={(event) => setName(event.target.value)}
                disabled={saving}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="account">Account</Label>
              <Input id="account" value={authUser?.email ?? user.email} readOnly />
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
            disabled={saving}
          />
          <div className="col-span-2 max-w-xs space-y-2">
            <Label
              htmlFor="reminder-time"
              className={!reminders ? "text-muted-foreground" : undefined}
            >
              Reminder time
            </Label>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className={!reminders ? "opacity-60" : undefined}
              disabled={saving}
            />
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" className="w-full sm:w-auto" disabled={saving} aria-busy={saving}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
