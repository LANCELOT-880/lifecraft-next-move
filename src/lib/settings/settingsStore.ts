import { useSyncExternalStore } from "react";
import { user } from "@/data/mock";

export interface AppSettings {
  fullName: string;
  dailyReminderEnabled: boolean;
}

export interface SettingsSnapshot extends AppSettings {
  loaded: boolean;
}

const SETTINGS_KEY = "lifecraft.settings.v1";
const DEFAULT_SETTINGS: AppSettings = {
  fullName: user.fullName,
  dailyReminderEnabled: true,
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function read(): AppSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;

  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : null;
    return {
      fullName:
        isRecord(parsed) && typeof parsed["fullName"] === "string"
          ? parsed["fullName"]
          : DEFAULT_SETTINGS.fullName,
      dailyReminderEnabled:
        isRecord(parsed) && typeof parsed["dailyReminderEnabled"] === "boolean"
          ? parsed["dailyReminderEnabled"]
          : DEFAULT_SETTINGS.dailyReminderEnabled,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

let cache: AppSettings | null = null;
let snapshotCache: SettingsSnapshot | null = null;
const listeners = new Set<() => void>();
const SERVER_SNAPSHOT: SettingsSnapshot = {
  fullName: "",
  dailyReminderEnabled: true,
  loaded: false,
};

function emit() {
  listeners.forEach((listener) => listener());
}

export const settingsStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): SettingsSnapshot {
    if (!cache) cache = read();
    if (!snapshotCache) snapshotCache = { ...cache, loaded: true };
    return snapshotCache;
  },
  getServerSnapshot(): SettingsSnapshot {
    return SERVER_SNAPSHOT;
  },
  update(next: AppSettings): boolean {
    if (!isBrowser()) return false;

    try {
      window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(next));
      cache = next;
      snapshotCache = { ...next, loaded: true };
      emit();
      return true;
    } catch {
      return false;
    }
  },
};

export function useSettings(): SettingsSnapshot {
  return useSyncExternalStore(
    settingsStore.subscribe,
    settingsStore.getSnapshot,
    settingsStore.getServerSnapshot,
  );
}
