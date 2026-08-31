import { demoJourneys } from "./demo";
import type { Journey, Task } from "./types";

/** Mock reward values — tuned locally, no backend involved. */
export const REWARDS = {
  lessonXp: 50,
  practiceXp: 30,
  phaseXp: 200,
  stepGems: 5,
  phaseGems: 25,
  journeyGems: 100,
} as const;

export const XP_PER_LEVEL = 500;

export interface RewardEntry {
  key: string;
  label: string;
  xp: number;
  gems: number;
  at: string;
}

export interface RewardState {
  xp: number;
  gems: number;
  /** Keys of activities already rewarded, so nothing pays out twice. */
  awarded: string[];
  /** Completion keys seeded by demo data; these never grant retroactive rewards. */
  historical: string[];
  /** Newest-first log of granted rewards, for the XP/Gem readouts. */
  history: RewardEntry[];
}

export interface RewardProgress {
  xp: number;
  gems: number;
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  percentToNextLevel: number;
  xpToNextLevel: number;
  recent: RewardEntry[];
}

export interface TaskCompletionResult {
  taskCompleted: boolean;
  xp: number;
  gems: number;
  phaseCompleted: boolean;
  phaseRewarded: boolean;
  journeyCompleted: boolean;
  journeyRewarded: boolean;
}

const KEY = "lifecraft.rewards.v1";
const EMPTY: RewardState = {
  xp: 0,
  gems: 0,
  awarded: [],
  historical: [],
  history: [],
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function seededHistoricalKeys(): string[] {
  const keys: string[] = [];

  for (const journey of demoJourneys) {
    for (const phase of journey.phases) {
      for (const task of phase.tasks) {
        if (task.completed) keys.push(`task:${task.id}`);
      }
      if (phase.tasks.length > 0 && phase.tasks.every((task) => task.completed)) {
        keys.push(`phase:${phase.id}`);
      }
    }
    if (
      journey.phases.every(
        (phase) => phase.tasks.length > 0 && phase.tasks.every((task) => task.completed),
      )
    ) {
      keys.push(`journey:${journey.id}`);
    }
  }

  return keys;
}

function read(): RewardState {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<RewardState>) : {};
    const historical = Array.isArray(parsed.historical)
      ? parsed.historical.filter((key) => typeof key === "string")
      : [];
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      gems: typeof parsed.gems === "number" ? parsed.gems : 0,
      awarded: Array.isArray(parsed.awarded)
        ? parsed.awarded.filter((k) => typeof k === "string")
        : [],
      historical: [...new Set([...historical, ...seededHistoricalKeys()])],
      history: Array.isArray(parsed.history)
        ? (parsed.history.filter(
            (entry) =>
              entry && typeof entry === "object" && typeof (entry as RewardEntry).key === "string",
          ) as RewardEntry[])
        : [],
    };
  } catch {
    return EMPTY;
  }
}

let cache: RewardState | null = null;
const listeners = new Set<() => void>();

function commit(next: RewardState) {
  cache = next;
  if (isBrowser()) {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable — keep in-memory state */
    }
  }
  listeners.forEach((listener) => listener());
}

export function getRewardProgress(state: RewardState): RewardProgress {
  const level = Math.floor(state.xp / XP_PER_LEVEL) + 1;
  const xpIntoLevel = state.xp % XP_PER_LEVEL;
  return {
    xp: state.xp,
    gems: state.gems,
    level,
    xpIntoLevel,
    xpForNextLevel: XP_PER_LEVEL,
    percentToNextLevel: Math.round((xpIntoLevel / XP_PER_LEVEL) * 100),
    xpToNextLevel: XP_PER_LEVEL - xpIntoLevel,
    recent: state.history.slice(0, 5),
  };
}

export const rewardStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): RewardState {
    if (!cache) cache = read();
    return cache;
  },
  getServerSnapshot(): RewardState {
    return EMPTY;
  },
  hasAwarded(key: string): boolean {
    return rewardStore.getSnapshot().awarded.includes(key);
  },
  /** Awards once per key. Returns what was actually granted. */
  award(key: string, xp: number, gems: number, label = "Reward"): { xp: number; gems: number } {
    const state = rewardStore.getSnapshot();
    if (state.awarded.includes(key) || state.historical.includes(key)) return { xp: 0, gems: 0 };
    const entry: RewardEntry = { key, label, xp, gems, at: new Date().toISOString() };
    commit({
      xp: state.xp + xp,
      gems: state.gems + gems,
      awarded: [...state.awarded, key],
      historical: state.historical,
      history: [entry, ...state.history].slice(0, 25),
    });
    return { xp, gems };
  },
  reset() {
    commit({ ...EMPTY, historical: seededHistoricalKeys() });
  },
};

/**
 * Grants step / phase / journey rewards for a journey whose task list already
 * reflects the completion. Idempotent: reopening a completed step pays nothing.
 */
export function awardForCompletedTask(journey: Journey, task: Task): TaskCompletionResult {
  let xp = 0;
  let gems = 0;

  const step = rewardStore.award(
    `task:${task.id}`,
    task.xpReward ?? REWARDS.lessonXp,
    task.gemReward ?? REWARDS.stepGems,
    `Completed ${task.title}`,
  );
  xp += step.xp;
  gems += step.gems;

  const phase = journey.phases.find((item) => item.tasks.some((t) => t.id === task.id));
  const phaseCompleted = Boolean(
    phase && phase.tasks.length > 0 && phase.tasks.every((t) => t.completed),
  );
  let phaseRewarded = false;
  if (phaseCompleted && phase) {
    const phaseAward = rewardStore.award(
      `phase:${phase.id}`,
      REWARDS.phaseXp,
      REWARDS.phaseGems,
      `Finished phase ${phase.title}`,
    );
    xp += phaseAward.xp;
    gems += phaseAward.gems;
    phaseRewarded = phaseAward.xp > 0 || phaseAward.gems > 0;
  }

  const journeyCompleted =
    journey.phases.length > 0 &&
    journey.phases.every((p) => p.tasks.length > 0 && p.tasks.every((t) => t.completed));
  let journeyRewarded = false;
  if (journeyCompleted) {
    const journeyAward = rewardStore.award(
      `journey:${journey.id}`,
      0,
      REWARDS.journeyGems,
      `Completed journey ${journey.title}`,
    );
    xp += journeyAward.xp;
    gems += journeyAward.gems;
    journeyRewarded = journeyAward.xp > 0 || journeyAward.gems > 0;
  }

  return {
    taskCompleted: true,
    xp,
    gems,
    phaseCompleted,
    phaseRewarded,
    journeyCompleted,
    journeyRewarded,
  };
}

/** Practice XP for finishing all check-your-understanding questions of a step. */
export function awardPracticeCompletion(
  taskId: string,
  taskTitle = "practice",
): { xp: number; gems: number } {
  return rewardStore.award(`practice:${taskId}`, REWARDS.practiceXp, 0, `Practice — ${taskTitle}`);
}
