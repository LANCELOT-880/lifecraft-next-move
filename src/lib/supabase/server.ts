import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import {
  getCookies,
  getRequestProtocol,
  setCookie,
  setResponseHeader,
} from "@tanstack/react-start/server";

export function createSupabaseServerCookieAdapter(
  onCookieWrite?: (count: number) => void,
): CookieMethodsServer {
  return {
    getAll() {
      return Object.entries(getCookies()).map(([name, value]) => ({ name, value }));
    },
    setAll(cookiesToSet, headers) {
      for (const { name, value, options } of cookiesToSet) {
        setCookie(name, value, options);
      }
      onCookieWrite?.(cookiesToSet.length);

      for (const [name, value] of Object.entries(headers)) {
        setResponseHeader(name as Parameters<typeof setResponseHeader>[0], value);
      }
    },
  };
}

export function hasSupabaseServerConfig(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

export function createSupabaseServerClientForRequest(
  url: string,
  anonKey: string,
  secure: boolean,
  onCookieWrite?: (count: number) => void,
) {
  return createServerClient(url, anonKey, {
    cookies: createSupabaseServerCookieAdapter(onCookieWrite),
    cookieOptions: { secure },
  });
}

export function createSupabaseServerClient(onCookieWrite?: (count: number) => void) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error("Supabase server configuration is missing.");
  }

  return createSupabaseServerClientForRequest(
    url,
    anonKey,
    getRequestProtocol() === "https",
    onCookieWrite,
  );
}
