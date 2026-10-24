# Supabase Authentication Preparation

This document records the current integration boundary and the proposed next steps. Authentication is not active yet; existing routes and localStorage behavior remain unchanged.

## Current Project Boundaries

- `src/routes/index.tsx` is the public landing page. Dashboard, journeys, create, roadmap, task, next, settings, and goal are separately registered file routes; no route currently checks a session.
- Those application pages render `AppShell` themselves. The shell and settings screen read the demo user from `src/data/mock.ts`.
- `src/lib/journey/journeyStore.ts` owns `lifecraft.journeys.v1` and `lifecraft.activeJourney.v1`. It persists nested journeys, phases, tasks, lesson payloads, and task completion locally.
- `src/lib/journey/rewards.ts` owns `lifecraft.rewards.v1`, including balances, history, and duplicate-award keys.
- `src/lib/settings/settingsStore.ts` owns `lifecraft.settings.v1`; it mixes the editable display name with reminder preferences.
- `src/lib/reminders/reminderStore.ts` owns `lifecraft.reminder.v1`, which records the local date a reminder was shown.
- `src/lib/journey/generateJourney.ts` is a Zod-validated TanStack Start server function. It reads `GEMINI_API_KEY` from the server environment. Keep generation and that credential server-side.
- `src/start.ts` installs CSRF middleware for server functions. `src/routes/__root.tsx` renders nested routes but has no authentication context or guard.
- `.env.local` is ignored by Git. It currently contains `GEMINI_API_KEY`; no Supabase environment convention existed before this preparation.

## Environment And Client Boundaries

Use `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for the Supabase project URL and public anon/publishable key. These values are intentionally browser-visible; authorization must come from Supabase Auth and database RLS, not from secrecy of the anon key. Both browser and server clients read them through `import.meta.env`, so Vite loads the `.env.local` values into both bundles; the server uses them only with request cookies to verify sessions.

Never define a `VITE_` service-role key. Do not add a service-role credential to local development or Vercel for browser use. `GEMINI_API_KEY` remains a server-only variable and is not part of the Supabase client configuration. `.env.example` contains names and placeholders only; real values belong in ignored `.env.local` and the appropriate Vercel environment settings.

The prepared `client.ts` is a lazy browser-client factory. `server.ts` creates a fresh server client in each TanStack Start request context. The request middleware in `src/start.ts` passes all incoming cookies to Supabase SSR, and its `setAll` adapter writes each cookie through Start's response cookie API and applies every supplied response header, including private/no-store cache headers. Supabase's `auth.getUser()` verifies the request session before the safe `{ id, email }` summary is placed in request context. The `getCurrentUser` server function returns only that summary or `null`; it never returns session tokens or cookie contents. No client is stored globally or reused between requests.

Cookie `Secure` follows the actual browser/request protocol in both the browser and server clients: it is enabled over HTTPS and omitted over local HTTP. This keeps the two clients' cookie attributes aligned; production deployments must use HTTPS. Supabase SSR's default `SameSite=Lax` and `HttpOnly=false` behavior is retained because the browser Supabase client must read and refresh its cookie-backed session; application code does not manually read or persist tokens. No access or refresh tokens are stored in LocalStorage. The Supabase helper owns cookie serialization.

## Future Route And Session Design

Keep `/` public. Add the login, signup, forgot-password, and reset-password routes when auth UI work begins. Put private application routes under a pathless authenticated layout or equivalent shared route boundary. That boundary must obtain the user through server-verified Supabase Auth state and redirect visitors to `/login`; a client-only visibility check is not authorization. Preserve the existing route screens and `AppShell` visual system. Add logout to the shell only when an auth state provider and session lifecycle are implemented.

Protected server functions must independently resolve the authenticated user from the request session, validate payloads with Zod, and constrain database actions by `auth.uid()` through RLS. Never authorize a read or mutation from a frontend-supplied record ID alone.

## Proposed Database Shape

- `profiles`: primary key `id` references `auth.users(id)` with cascade deletion; store display name and timestamps. Profile creation should use a controlled trigger or an idempotent authenticated upsert.
- `journeys`: UUID primary key, `user_id` references `auth.users(id)`, goal/title/description/category fields, motivation, daily time, target date, and timestamps. This is the ownership root.
- `phases`: UUID primary key, `journey_id` references `journeys(id)` with cascade deletion, plus title, summary, and order. Enforce unique `(journey_id, order)`.
- `tasks`: UUID primary key, `phase_id` references `phases(id)` with cascade deletion, plus title, order, completion timestamp/state, estimate, difficulty, and impact. Enforce unique `(phase_id, order)`.
- Store each task's generated lesson as a validated JSONB column on `tasks`. LIFECRAFT consumes a lesson as one cohesive payload, and its generated fields may evolve; a separate table per lesson section would add joins without a current query or sharing need. Keep resource queries in that JSONB payload unless they become independently searchable or reusable.
- `user_settings`: one row per `auth.users(id)` for cloud-synced preferences such as reminder enabled/time and other account-level settings. Keep per-device reminder display history local.
- `reward_events`: append-only rows with `user_id`, an idempotency key, XP/gems, label, optional task/journey references, and creation time. Enforce unique `(user_id, idempotency_key)` so server-side reward writes cannot pay twice. Derive balances from the ledger or maintain a transactionally updated aggregate later.

Enable RLS on every user-owned table. `profiles`, `journeys`, `user_settings`, and `reward_events` policies should require `auth.uid() = id/user_id`. For `phases`, authorize through an `EXISTS` check that their journey belongs to `auth.uid()`; for `tasks`, check ownership through the phase-to-journey relationship. Apply equivalent policies for select, insert, update, and delete, and validate that parent-child references stay within the same owned journey. Do not use a service-role client for normal user requests.

## Storage And Migration Decisions

Cloud candidates are journeys, phases, tasks and lessons, completion/progress, reward events, profile data, and account-level settings. `lifecraft.reminder.v1` is device-specific history and should remain local. `lifecraft.activeJourney.v1` is a UI preference that can stay local initially, scoped by account/device when account switching is added. Reminder enabled/time currently live beside the profile name in `lifecraft.settings.v1`; split those concepts when designing the cloud adapter. Rewards must move together with their idempotency history to avoid duplicate grants.

The temporary browser-only auth phase now scopes all five existing local stores to `lifecraft.<store>.v1.<userId>` for authenticated users, and to `lifecraft.<store>.v1.guest` when signed out. The stable Supabase user ID, never email, selects the namespace. Namespace changes invalidate journey, reward, and settings caches and notify their subscribers. Existing unscoped keys are left untouched and are not automatically copied to any user; this avoids duplicating old local data across accounts. A future cloud migration must define an explicit opt-in/import path, preserve a recoverable local backup, validate/import records through an authenticated server operation, handle conflicts and retries idempotently, and only then switch reads/writes.

## Files For Later Implementation

- `src/routes/__root.tsx`, `src/router.tsx`, and route files: establish the server-backed session context and shared private-route guard; add auth routes while leaving `/` public. `src/routeTree.gen.ts` is generated and must not be edited manually.
- `src/start.ts` and likely a dedicated TanStack Start server helper: bridge request cookies to `@supabase/ssr`, apply refreshed cookies and cache headers, and make session verification available to server functions.
- `src/components/lifecraft/AppShell.tsx` and `src/data/mock.ts`: replace demo identity display with the authenticated profile and add session logout; retain landing-page content still used from mock data.
- `src/lib/journey/journeyStore.ts`, `useJourneys.ts`, `rewards.ts`, and `useRewards.ts`: introduce asynchronous user-scoped persistence while retaining a deliberate offline/migration path. These currently expose synchronous external stores, so cloud conversion needs an explicit loading/error state rather than a mechanical storage swap.
- `src/lib/settings/settingsStore.ts` and `src/routes/settings.tsx`: separate profile fields from account settings and preserve device-level reminder history.
- `src/lib/journey/generateJourney.ts`: keep Gemini on the server; when generation is tied to a signed-in account or persists generated records, verify the request user and validate the full write path.
- `vite.config.ts`, `.env.local` (local only), and Vercel environment settings: configure only if the eventual TanStack request/cookie integration requires it. No Vite configuration change is required for this isolated preparation.

## Day 2 Session Foundation

The request-scoped cookie adapter and `getCurrentUser` server function are now implemented. With no Supabase environment configured, middleware sets `supabaseUser` to `null` and leaves the public app operational. With valid public project URL/key configuration, it verifies the request via `auth.getUser()` and propagates refreshed cookies and Supabase's cache headers. No route guards, database tables, authentication UI, or persistence changes have been introduced.

## Day 3 Authentication Experience

The `/login` and `/signup` routes use the existing browser Supabase client. Signup validates the form, stores `full_name` in Auth user metadata, and distinguishes confirmation-required responses (no session) from immediately authenticated responses. Login and immediate signup sessions are checked against `getCurrentUser()` by matching verified ID and email before navigating to the dashboard. A lightweight client auth-state provider restores the browser session and reacts to Supabase auth changes for UI only. The app shell displays Auth name/email when available and offers Supabase sign-out; the landing page switches actions according to client auth state. These routes are not protected, and journey LocalStorage behavior is unchanged.

## Day 4 Recommendation

Add a shared authenticated route boundary for private application routes using server-verified session state, while leaving `/`, `/login`, and `/signup` public. Confirm the boundary redirects logged-out users, and keep server-function authorization based on `auth.getUser()` rather than browser state. Do not migrate data until the route boundary and per-user storage policy are established.
