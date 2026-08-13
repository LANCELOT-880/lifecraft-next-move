import { Link } from "@tanstack/react-router";
import { Compass, LayoutDashboard, Settings, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { user } from "@/data/mock";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/journeys", label: "My Journeys", icon: Compass },
  { to: "/next", label: "Next Move", icon: Zap },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface-2 focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div className="lg:grid lg:grid-cols-[248px_minmax(0,1fr)]">
        <aside className="sticky top-0 hidden h-screen flex-col border-r border-border bg-sidebar px-4 py-6 lg:flex">
          <Link to="/" className="px-2 font-display text-sm font-bold tracking-[0.28em] text-foreground">
            LIFECRAFT
          </Link>

          <nav aria-label="Main" className="mt-10 flex flex-1 flex-col gap-1">
            {nav.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                activeProps={{ className: "bg-accent-soft text-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:bg-surface-2 hover:text-foreground" }}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200"
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </nav>

          <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-border px-3 py-3">
            <span
              aria-hidden
              className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft font-display text-xs text-primary"
            >
              {user.initials}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm text-foreground">{user.fullName}</span>
              <span className="block truncate text-xs text-muted-foreground">{user.email}</span>
            </span>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-border bg-background/85 px-5 py-4 backdrop-blur lg:hidden">
            <Link to="/" className="font-display text-sm font-bold tracking-[0.28em]">
              LIFECRAFT
            </Link>
            <span
              aria-hidden
              className="grid size-8 place-items-center rounded-full bg-accent-soft font-display text-xs text-primary"
            >
              {user.initials}
            </span>
          </header>

          <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-28 pt-8 sm:px-8 lg:pb-16 lg:pt-12">
            {children}
          </main>
        </div>
      </div>

      <nav
        aria-label="Main"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
      >
        {nav.map(({ to, label, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            activeProps={{ className: "text-primary" }}
            inactiveProps={{ className: "text-muted-foreground" }}
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