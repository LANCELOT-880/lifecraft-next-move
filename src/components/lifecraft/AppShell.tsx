import { Link, useNavigate } from "@tanstack/react-router";
import { Compass, LayoutDashboard, LogOut, Settings, Zap } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { user } from "@/data/mock";
import { getNextMove } from "@/lib/journey/journeyStore";
import { reminderStore } from "@/lib/reminders/reminderStore";
import { useSettings } from "@/lib/settings/settingsStore";
import { useJourney } from "@/lib/journey/useJourneys";
import { logout } from "@/lib/supabase/auth-actions";
import { useAuthState } from "@/lib/supabase/use-auth-state";
import { useServerFn } from "@tanstack/react-start";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/journeys", label: "My Journeys", icon: Compass },
  { to: "/next", label: "Next Move", icon: Zap },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const settings = useSettings();
  const journey = useJourney();
  const navigate = useNavigate();
  const logoutAction = useServerFn(logout);
  const { user: authUser } = useAuthState();
  const [signingOut, setSigningOut] = useState(false);
  const metadataName = authUser?.user_metadata["full_name"];
  const displayName = authUser
    ? (typeof metadataName === "string" && metadataName.trim()) || authUser.email || user.fullName
    : settings.loaded
      ? settings.fullName
      : "";
  const displayEmail = authUser?.email ?? user.email;
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || user.initials;

  async function signOut() {
    if (signingOut) return;
    setSigningOut(true);
    try {
      const result = await logoutAction();
      if (!result.ok) {
        toast.error(result.error);
        return;
      }

      window.location.assign("/login");
    } catch {
      toast.error("Sign out is temporarily unavailable. Please try again.");
    } finally {
      setSigningOut(false);
    }
  }

  useEffect(() => {
    if (!settings.loaded || !settings.dailyReminderEnabled || !journey) {
      return;
    }

    const move = getNextMove(journey);

    if (!move || !reminderStore.shouldShowToday(settings.dailyReminderTime)) {
      return;
    }

    reminderStore.markShownToday();

    toast("Today's next move", {
      description: `${move.task} · ${move.minutes} minutes`,
      action: {
        label: "Start",
        onClick: () =>
          void navigate({
            to: "/task",
            search: {
              journey: move.journeyId,
              task: move.taskId,
            },
          }),
      },
    });
  }, [
    journey,
    navigate,
    settings.dailyReminderEnabled,
    settings.dailyReminderTime,
    settings.loaded,
  ]);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface-2 focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-border bg-sidebar px-4 py-6 lg:flex">
        <Link
          to="/"
          className="flex items-center gap-2 px-2 font-display text-sm font-bold tracking-[0.28em] text-foreground"
        >
          <img
            src="/favicon.png"
            alt=""
            aria-hidden="true"
            className="size-7 shrink-0 object-contain"
          />
          LIFECRAFT
        </Link>

        <nav aria-label="Main" className="mt-10 flex flex-1 flex-col gap-1">
          {nav.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              activeProps={{
                className: "bg-accent-soft text-foreground",
              }}
              inactiveProps={{
                className: "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
              }}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200"
            >
              <Icon className="size-4 shrink-0" aria-hidden />

              <span className="truncate">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-lg border border-border px-3 py-3">
          <span
            aria-hidden
            className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-xs text-primary"
          >
            {initials}
          </span>

          <span className="min-w-0">
            <span className="block truncate text-sm text-foreground">{displayName}</span>

            <span className="block truncate text-xs text-muted-foreground">{displayEmail}</span>
          </span>
          {authUser ? (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Log out"
              title="Log out"
              disabled={signingOut}
              onClick={() => void signOut()}
            >
              <LogOut aria-hidden="true" />
            </Button>
          ) : null}
        </div>
      </aside>

      {/* Main application area */}
      <div className="min-w-0 lg:pl-[248px]">
        {/* Mobile header */}
        <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-5 py-4 backdrop-blur lg:hidden">
          <Link to="/" className="font-display text-sm font-bold tracking-[0.28em]">
            LIFECRAFT
          </Link>

          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full bg-accent-soft font-display text-xs text-primary"
            >
              {initials}
            </span>
            {authUser ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Log out"
                title="Log out"
                disabled={signingOut}
                onClick={() => void signOut()}
              >
                <LogOut aria-hidden="true" />
              </Button>
            ) : null}
          </div>
        </header>

        <main
          id="main"
          className="mx-auto w-full max-w-5xl px-4 pb-28 pt-7 sm:px-8 sm:pt-10 lg:pb-10 lg:pt-12"
        >
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeProps={{
              className: "text-primary",
            }}
            inactiveProps={{
              className: "text-muted-foreground",
            }}
            className="flex flex-col items-center gap-1 py-3 text-[11px] transition-colors duration-200"
          >
            <Icon className="size-5" aria-hidden />

            <span className="truncate px-1">{label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
