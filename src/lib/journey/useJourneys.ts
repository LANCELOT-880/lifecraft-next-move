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

/** Resolves an explicit id exactly; only an omitted id uses the active fallback. */
export function useJourney(id?: string | undefined): Journey | undefined {
  const journeys = useJourneys();
  const activeId = useSyncExternalStore(
    journeyStore.subscribe,
    () => journeyStore.getActiveId(),
    () => null,
  );

  if (id) return journeys.find((journey) => journey.id === id);
  if (activeId) {
    const active = journeys.find((journey) => journey.id === activeId);
    if (active) return active;
  }
  return journeys[0];
}
