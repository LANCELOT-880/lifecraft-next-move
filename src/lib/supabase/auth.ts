import { createServerFn, getGlobalStartContext } from "@tanstack/react-start";
import type { SupabaseClient } from "@supabase/supabase-js";

export interface AuthenticatedUserSummary {
  id: string;
  email: string | null;
}

export async function getAuthenticatedUser(
  client: SupabaseClient,
): Promise<AuthenticatedUserSummary | null> {
  const { data, error } = await client.auth.getUser();
  return error || !data.user ? null : { id: data.user.id, email: data.user.email ?? null };
}

export const getCurrentUser = createServerFn({ method: "GET" }).handler(async () => {
  return getGlobalStartContext()?.supabaseUser ?? null;
});
