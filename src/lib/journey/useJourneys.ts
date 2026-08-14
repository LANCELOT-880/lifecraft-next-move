import { useSyncExternalStore } from "react";
import { journeyStore } from "./journeyStore";
import type { Journey } from "./types";

export function useJourneys(): Journey[] {
  return useSyncExternalStore(
    journeyStore.subscribe,
    journeyStore.getSnapshot,
    journeyStore.getServerSnapshot,
  );
}

/** Resolves a journey by id, falling back to the most recently active one. */
export function useJourney(id?: string | undefined): Journey | undefined {
  const journeys = useJourneys();
  const activeId = useSyncExternalStore(
    journeyStore.subscribe,
    () => journeyStore.getActiveId(),
    () => null,
  );

  if (id) {
    const match = journeys.find((journey) => journey.id === id);
    if (match) return match;
  }
  if (activeId) {
    const active = journeys.find((journey) => journey.id === activeId);
    if (active) return active;
  }
  return journeys[0];
}
