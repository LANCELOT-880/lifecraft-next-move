import { useContext } from "react";
import { AuthStateContext } from "./auth-context";

export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error("useAuthState must be used inside AuthStateProvider.");
  return state;
}
