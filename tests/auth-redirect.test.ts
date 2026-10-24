import assert from "node:assert/strict";
import test from "node:test";

import {
  getNavigationTarget,
  getSafeRedirectPath,
  requireAuthenticatedUser,
  requireGuestUser,
} from "../src/lib/auth/redirect.ts";
import { requestHandler } from "@tanstack/start-server-core/request-response";
import {
  createSupabaseServerClientForRequest,
  createSupabaseServerCookieAdapter,
} from "../src/lib/supabase/server.ts";

test("getSafeRedirectPath accepts only safe internal paths", () => {
  const safeCases: Array<[string | null | undefined, string]> = [
    ["/dashboard", "/dashboard"],
    ["/journeys", "/journeys"],
    ["/roadmap?id=123", "/roadmap?id=123"],
    ["/task?journeyId=1&taskId=2", "/task?journeyId=1&taskId=2"],
    ["/", "/"],
  ];

  for (const [value, expected] of safeCases) {
    assert.equal(getSafeRedirectPath(value), expected, `expected ${String(value)} to remain safe`);
  }

  const unsafeCases = [
    "https://evil.example.com",
    "http://evil.example.com",
    "//evil.example.com",
    "javascript:alert(1)",
    "data:text/html,test",
    "\\\\evil.example.com",
    "",
    undefined,
    null,
  ];

  for (const value of unsafeCases) {
    assert.equal(getSafeRedirectPath(value), "/dashboard");
  }
});

test("getNavigationTarget preserves internal query strings and falls back safely", () => {
  assert.deepEqual(getNavigationTarget("/roadmap?id=test", "/dashboard"), {
    to: "/roadmap",
    search: { id: "test" },
  });

  assert.deepEqual(getNavigationTarget("/task?journeyId=1&taskId=2", "/dashboard"), {
    to: "/task",
    search: { journeyId: "1", taskId: "2" },
  });

  assert.deepEqual(getNavigationTarget("https://evil.example.com", "/dashboard"), {
    to: "/dashboard",
    search: {},
  });

  assert.deepEqual(getNavigationTarget(undefined, "/dashboard"), {
    to: "/dashboard",
    search: {},
  });
});

test("requireAuthenticatedUser redirects unauthenticated users back to login with a safe path", () => {
  assert.throws(
    () =>
      requireAuthenticatedUser(
        { supabaseUser: null },
        {
          pathname: "/journeys",
          search: { filter: "active" },
        },
      ),
    (error: unknown) => {
      const response = error as Response;
      return (
        response instanceof Response &&
        response.options?.to === "/login" &&
        response.options?.search?.redirect === "/journeys?filter=active"
      );
    },
  );

  assert.throws(
    () =>
      requireAuthenticatedUser(
        { supabaseUser: null },
        {
          pathname: "/roadmap",
          search: { id: "test" },
        },
      ),
    (error: unknown) => {
      const response = error as Response;
      return (
        response instanceof Response &&
        response.options?.to === "/login" &&
        response.options?.search?.redirect === "/roadmap?id=test"
      );
    },
  );
});

test("requireGuestUser redirects authenticated visitors away from public auth screens", () => {
  assert.throws(
    () =>
      requireGuestUser({
        supabaseUser: { id: "user-123", email: "person@example.com" },
      }),
    (error: unknown) => {
      const response = error as Response;
      return response instanceof Response && response.options?.to === "/dashboard";
    },
  );

  assert.doesNotThrow(() => requireGuestUser({ supabaseUser: null }));
});

test("server cookie adapter reads all incoming cookies and writes each cookie with its options", async () => {
  const handleRequest = requestHandler(async () => {
    const cookies = createSupabaseServerCookieAdapter();
    const incoming = await cookies.getAll();
    await cookies.setAll(
      [
        {
          name: "sb-access-token.0",
          value: "access-part",
          options: {
            domain: "localhost",
            maxAge: 120,
            path: "/",
            sameSite: "lax",
          },
        },
        {
          name: "sb-refresh-token",
          value: "refresh-value",
          options: {
            maxAge: 45,
            path: "/auth",
            sameSite: "strict",
            secure: true,
          },
        },
      ],
      {
        "cache-control": "private, no-store",
        expires: "0",
        pragma: "no-cache",
      },
    );
    return Response.json({ incoming });
  });

  const response = await handleRequest(
    new Request("http://localhost/", {
      headers: { cookie: "sb-existing.0=chunk-zero; sb-existing.1=chunk-one; theme=dark" },
    }),
    {},
  );

  assert.deepEqual(await response.json(), {
    incoming: [
      { name: "sb-existing.0", value: "chunk-zero" },
      { name: "sb-existing.1", value: "chunk-one" },
      { name: "theme", value: "dark" },
    ],
  });

  const setCookies = (
    response.headers as Headers & { getSetCookie: () => string[] }
  ).getSetCookie();
  assert.equal(setCookies.length, 2);
  assert.match(setCookies[0] ?? "", /sb-access-token\.0=access-part/);
  assert.match(setCookies[0] ?? "", /Domain=localhost/);
  assert.match(setCookies[0] ?? "", /Max-Age=120/);
  assert.match(setCookies[0] ?? "", /Path=\//);
  assert.match(setCookies[0] ?? "", /SameSite=Lax/);
  assert.match(setCookies[1] ?? "", /sb-refresh-token=refresh-value/);
  assert.match(setCookies[1] ?? "", /Max-Age=45/);
  assert.match(setCookies[1] ?? "", /Path=\/auth/);
  assert.match(setCookies[1] ?? "", /SameSite=Strict/);
  assert.match(setCookies[1] ?? "", /Secure/);
  assert.equal(response.headers.get("cache-control"), "private, no-store");
  assert.equal(response.headers.get("expires"), "0");
  assert.equal(response.headers.get("pragma"), "no-cache");
});

test("creates a new Supabase server client for every request", async () => {
  const clients: ReturnType<typeof createSupabaseServerClientForRequest>[] = [];
  const handleRequest = requestHandler(async () => {
    clients.push(
      createSupabaseServerClientForRequest("https://example.supabase.co", "test-anon-key", false),
    );
    return new Response(null);
  });

  await handleRequest(new Request("http://localhost/first"), {});
  await handleRequest(new Request("http://localhost/second"), {});

  assert.equal(clients.length, 2);
  assert.notStrictEqual(clients[0], clients[1]);
});
