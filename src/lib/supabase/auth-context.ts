import { createContext } from "react";
import type { User } from "@supabase/supabase-js";

export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface AuthStateContextValue extends AuthState {
  setUser: (user: User) => void;
}

export const AuthStateContext = createContext<AuthStateContextValue | null>(null);
