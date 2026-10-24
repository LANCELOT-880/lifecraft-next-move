import { redirect } from "@tanstack/react-router";

import type { AuthenticatedUserSummary } from "@/lib/supabase/auth";

export function getSafeRedirectPath(
  value: string | null | undefined,
  fallback = "/dashboard",
): string {
  if (typeof value !== "string") return fallback;

  const candidate = value.trim();
  if (!candidate) return fallback;
  if (candidate.startsWith("//") || candidate.startsWith("\\\\")) return fallback;
  if (
    candidate.startsWith("http://") ||
    candidate.startsWith("https://") ||
    candidate.startsWith("javascript:") ||
    candidate.startsWith("data:") ||
    candidate.includes("\\") ||
    candidate.includes("://")
  ) {
    return fallback;
  }
  if (!candidate.startsWith("/")) return fallback;

  return candidate;
}

export function getNavigationTarget(value: string | null | undefined, fallback = "/dashboard") {
  const safe = getSafeRedirectPath(value, fallback);
  const parsed = new URL(safe, "http://localhost");

  return {
    to: parsed.pathname || "/",
    search: Object.fromEntries(parsed.searchParams.entries()),
  } as const;
}

export function requireAuthenticatedUser(
  context: { supabaseUser: AuthenticatedUserSummary | null },
  location: { pathname: string; search: Record<string, unknown> },
): void {
  if (import.meta.env?.DEV) {
    console.info("auth.route-context.diagnostics", {
      guard: "authenticated",
      routeContextUserPresent: Boolean(context.supabaseUser),
    });
  }

  if (!context.supabaseUser) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(location.search ?? {})) {
      if (value == null) continue;
      params.set(key, String(value));
    }

    const searchString = params.toString();
    throw redirect({
      to: "/login",
      search: {
        redirect: getSafeRedirectPath(
          `${location.pathname}${searchString ? `?${searchString}` : ""}`,
          "/dashboard",
        ),
      },
    });
  }
}

export function requireGuestUser(context: { supabaseUser: AuthenticatedUserSummary | null }): void {
  if (import.meta.env?.DEV) {
    console.info("auth.route-context.diagnostics", {
      guard: "guest",
      routeContextUserPresent: Boolean(context.supabaseUser),
    });
  }

  if (context.supabaseUser) {
    throw redirect({ to: "/dashboard" });
  }
}
