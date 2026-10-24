import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { AuthPanel } from "@/components/lifecraft/AuthPanel";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireGuestUser } from "@/lib/auth/redirect";
import { signup } from "@/lib/supabase/auth-actions";

export const Route = createFileRoute("/signup")({
  beforeLoad: ({ context }) => {
    requireGuestUser(context);
  },
  component: SignupPage,
});

const signupSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name.").max(100),
    email: z.string().trim().email("Enter a valid email address."),
    password: z.string().min(8, "Use at least 8 characters for your password."),
    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "The passwords do not match.",
  });

function SignupPage() {
  const signupAction = useServerFn(signup);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [developmentError, setDevelopmentError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    setDevelopmentError("");
    setMessage("");

    const parsed = signupSchema.safeParse({ fullName, email, password, confirmPassword });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Check the information and try again.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await signupAction({
        data: {
          fullName: parsed.data.fullName,
          email: parsed.data.email,
          password: parsed.data.password,
        },
      });

      if (!result.ok) {
        setError(result.error);
        return;
      }

      setPassword("");
      setConfirmPassword("");

      if (result.requiresConfirmation) {
        setMessage("Check your email to confirm your account. Then return here to log in.");
        return;
      }

      window.location.assign("/dashboard");
    } catch {
      setError("Sign-up is temporarily unavailable. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AuthPanel
      eyebrow="Start building momentum"
      title="Create your account."
      description="A little structure turns a big intention into your next move."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            search={{ redirect: undefined }}
            className="font-medium text-primary hover:underline"
          >
            Login
          </Link>
        </>
      }
    >
      <form className="space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full name</Label>
          <Input
            id="signup-name"
            type="text"
            autoComplete="name"
            required
            maxLength={100}
            value={fullName}
            onChange={(event) => setFullName(event.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input
            id="signup-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={submitting}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={submitting}
          />
          <p className="text-xs text-muted-foreground">Use at least 8 characters.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="signup-confirm-password">Confirm password</Label>
          <Input
            id="signup-confirm-password"
            type="password"
            autoComplete="new-password"
            required
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            disabled={submitting}
          />
        </div>
        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}
        {import.meta.env.DEV && developmentError ? (
          <p role="status" className="text-sm text-muted-foreground">
            Development detail: {developmentError}
          </p>
        ) : null}
        {message ? (
          <p role="status" className="text-sm text-primary">
            {message}
          </p>
        ) : null}
        <Button type="submit" className="w-full" disabled={submitting} aria-busy={submitting}>
          {submitting ? "Creating account…" : "Sign up"}
        </Button>
      </form>
    </AuthPanel>
  );
}
