import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createSupabaseServerClient } from "./server";

export type AuthUserSummary = {
  id: string;
  email: string | null;
};

export type AuthActionResult =
  | { ok: true; user?: AuthUserSummary; requiresConfirmation?: boolean }
  | { ok: false; error: string };

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name.").max(100),
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(8, "Use at least 8 characters for your password."),
  })
  .strict();

function toSafeUser(
  user: { id?: string | null; email?: string | null } | null | undefined,
): AuthUserSummary | null {
  if (!user || !user.id) return null;
  return { id: user.id, email: user.email ?? null };
}

function getSignupRedirectUrl(): string | undefined {
  const configuredOrigin =
    import.meta.env["VITE_SITE_URL"] || import.meta.env["VITE_APP_URL"] || "http://localhost:3000";

  try {
    return new URL("/dashboard", configuredOrigin).toString();
  } catch {
    return undefined;
  }
}

export const login = createServerFn({ method: "POST" })
  .validator(loginSchema)
  .handler(async ({ data }) => {
    let cookieWriteCount = 0;
    const supabase = createSupabaseServerClient((count) => {
      cookieWriteCount += count;
    });
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    const signInSuccess = !error;
    if (error) {
      if (import.meta.env.DEV) {
        console.info("auth.login.diagnostics", {
          signInSuccess,
          getUserSuccess: false,
          cookieWriteCount,
        });
      }
      return {
        ok: false,
        error: "We couldn't sign you in with those details. Check your email and password.",
      };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = toSafeUser(userData.user);
    const getUserSuccess = !userError && Boolean(user);

    if (!getUserSuccess) {
      await supabase.auth.signOut().catch(() => undefined);
      if (import.meta.env.DEV) {
        console.info("auth.login.diagnostics", {
          signInSuccess,
          getUserSuccess,
          cookieWriteCount,
        });
      }
      return { ok: false, error: "Your session could not be verified by the server." };
    }

    if (import.meta.env.DEV) {
      console.info("auth.login.diagnostics", {
        signInSuccess,
        getUserSuccess,
        cookieWriteCount,
      });
    }
    return { ok: true, user };
  });

export const signup = createServerFn({ method: "POST" })
  .validator(signupSchema)
  .handler(async ({ data }) => {
    const supabase = createSupabaseServerClient();
    const redirectTo = getSignupRedirectUrl();
    const { data: signupData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { full_name: data.fullName },
        ...(redirectTo ? { emailRedirectTo: redirectTo } : {}),
      },
    });

    if (error) {
      return {
        ok: false,
        error:
          "We couldn't create the account with those details. If you already registered, log in.",
      };
    }

    const user = toSafeUser(signupData.user);
    if (!user) {
      return {
        ok: true,
        requiresConfirmation: true,
        user: { id: "", email: data.email },
      };
    }

    const { data: verified, error: verificationError } = await supabase.auth.getUser();
    const verifiedUser = toSafeUser(verified.user);

    if (verificationError || !verifiedUser || verifiedUser.id !== user.id) {
      await supabase.auth.signOut().catch(() => undefined);
      return {
        ok: false,
        error: "Your account was created, but its session could not be verified. Please log in.",
      };
    }

    return {
      ok: true,
      user: verifiedUser,
      requiresConfirmation: Boolean(!signupData.session),
    };
  });

export const logout = createServerFn({ method: "POST" }).handler(async () => {
  const supabase = createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { ok: false, error: "You could not be signed out. Please try again." };
  }

  return { ok: true };
}) satisfies () => Promise<AuthActionResult | { ok: true }>;
