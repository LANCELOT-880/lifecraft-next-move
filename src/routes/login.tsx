import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { AuthPanel } from "@/components/lifecraft/AuthPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getNavigationTarget, requireGuestUser } from "@/lib/auth/redirect";
import { login } from "@/lib/supabase/auth-actions";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search["redirect"] === "string" ? (search["redirect"] as string) : undefined,
  }),
  beforeLoad: ({ context }) => {
    requireGuestUser(context);
  },
  component: LoginPage,
});

const loginSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

function sanitizeAuthErrorMessage(message: string): string {
  return message
    .replace(
      /\b(access[_ -]?token|refresh[_ -]?token|password|api[_ -]?key|authorization|cookie)\b\s*[:=]\s*[^,\s;]+/gi,
      "$1=[redacted]",
    )
    .replace(/\bBearer\s+\S+/gi, "Bearer [redacted]")
    .split("")
    .filter((character) => {
      const code = character.charCodeAt(0);
      return code >= 32 && code !== 127;
    })
    .join("")
    .slice(0, 300);
}

function LoginPage() {
  const loginAction = useServerFn(login);
  const { redirect } = Route.useSearch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");

    const parsed = loginSchema.safeParse({ email, password });
    if (!parsed.success) {
      setError(
        email.trim() ? "Enter your password to continue." : "Enter a valid email and password.",
      );
      return;
    }

    setSubmitting(true);
    try {
      const result = await loginAction({
        data: {
          email: parsed.data.email,
          password: parsed.data.password,
        },
      });

      if (!result.ok) {
        setError(sanitizeAuthErrorMessage(result.error));
        return;
      }

      setPassword("");
      const destination = getNavigationTarget(redirect, "/dashboard");
      const search = new URLSearchParams(destination.search).toString();
      window.location.assign(`${destination.to}${search ? `?${search}` : ""}`);
    } catch {
      setError("Sign-in is temporarily unavailable. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthPanel
      eyebrow="Welcome back"
      title="Continue your journey."
      description="Sign in to pick up where your next move is waiting."
      footer={
        <>
          New to LIFECRAFT?{" "}
          <Link to="/signup" search={{}} className="font-medium text-primary hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form className="space-y-5" onSubmit={(event) => void handleSubmit(event)}>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input
            id="login-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={submitting}
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={submitting} aria-busy={submitting}>
          {submitting ? "Signing in…" : "Login"}
        </Button>
      </form>
    </AuthPanel>
  );
}
