import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function AuthPanel({
  eyebrow,
  title,
  description,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-10 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />
      <section className="relative w-full max-w-md">
        <Link
          to="/"
          className="mx-auto mb-8 flex w-fit items-center gap-2 font-display text-sm font-bold tracking-[0.28em] text-foreground"
        >
          <img src="/favicon.png" alt="" aria-hidden="true" className="size-7 object-contain" />
          LIFECRAFT
        </Link>
        <div className="surface-panel p-6 shadow-[var(--shadow-elevated)] sm:p-8">
          <p className="text-eyebrow text-primary">{eyebrow}</p>
          <h1 className="mt-3 text-2xl font-semibold">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
          <div className="mt-7">{children}</div>
          <div className="mt-6 border-t border-border pt-5 text-center text-sm text-muted-foreground">
            {footer}
          </div>
        </div>
      </section>
    </main>
  );
}
