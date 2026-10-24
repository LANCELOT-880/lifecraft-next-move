import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";
import { useEffect, useState, type ReactNode } from "react";
import { getSupabaseBrowserClient } from "./client";
import { AuthStateContext, type AuthState } from "./auth-context";
import { setStorageUserId } from "@/lib/storage/userStorage";

export function AuthStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, loading: true });

  function setUser(user: User) {
    setStorageUserId(user.id);
    setState({ user, loading: false });
  }

  useEffect(() => {
    const client = getSupabaseBrowserClient();
    let mounted = true;
    let verificationId = 0;
    let verificationTimer: ReturnType<typeof setTimeout> | undefined;

    async function verifyCurrentUser() {
      const currentVerificationId = ++verificationId;

      try {
        const { data, error } = await client.auth.getUser();
        if (!mounted || currentVerificationId !== verificationId) return;

        const user = error ? null : data.user;
        setStorageUserId(user?.id ?? null);
        setState({ user, loading: false });
      } catch {
        if (!mounted || currentVerificationId !== verificationId) return;
        setStorageUserId(null);
        setState({ user: null, loading: false });
      }
    }

    const { data } = client.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (event === "SIGNED_OUT" || !session) {
          verificationId += 1;
          if (verificationTimer) clearTimeout(verificationTimer);
          setStorageUserId(null);
          if (mounted) setState({ user: null, loading: false });
          return;
        }

        if (mounted) setState((current) => ({ ...current, loading: true }));
        verificationTimer = setTimeout(() => void verifyCurrentUser(), 0);
      },
    );

    void verifyCurrentUser();

    return () => {
      mounted = false;
      verificationId += 1;
      if (verificationTimer) clearTimeout(verificationTimer);
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthStateContext.Provider value={{ ...state, setUser }}>{children}</AuthStateContext.Provider>
  );
}
