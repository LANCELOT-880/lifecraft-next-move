import { createBrowserClient } from "@supabase/ssr";

let browserClient: ReturnType<typeof createBrowserClient> | undefined;

export function getSupabaseBrowserClient() {
  if (browserClient) return browserClient;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase browser configuration is missing.");
  }

  browserClient = createBrowserClient(url, anonKey, {
    cookieOptions: { secure: window.location.protocol === "https:" },
  });
  return browserClient;
}
