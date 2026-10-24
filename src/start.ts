import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";
import { getCookies } from "@tanstack/react-start/server";
import { getAuthenticatedUser } from "./lib/supabase/auth";
import { createSupabaseServerClient, hasSupabaseServerConfig } from "./lib/supabase/server";

import { renderErrorPage } from "./lib/error-page";

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

const supabaseSessionMiddleware = createMiddleware({ type: "request" }).server(async ({ next }) => {
  let supabaseUser = null;
  const nextRequestCookiePresent = Object.keys(getCookies()).some((name) => name.startsWith("sb-"));

  if (hasSupabaseServerConfig()) {
    try {
      supabaseUser = await getAuthenticatedUser(createSupabaseServerClient());
    } catch {
      supabaseUser = null;
    }
  }

  if (import.meta.env.DEV) {
    console.info("auth.middleware.diagnostics", {
      nextRequestCookiePresent,
      middlewareUserPresent: Boolean(supabaseUser),
    });
  }

  return next({ context: { supabaseUser } });
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, csrfMiddleware, supabaseSessionMiddleware],
}));
