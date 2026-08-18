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

const KEY = "lifecraft.rewards.v1";
const EMPTY: RewardState = { xp: 0, gems: 0, awarded: [], history: [] };

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function read(): RewardState {
  if (!isBrowser()) return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw) as Partial<RewardState>;
    return {
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      gems: typeof parsed.gems === "number" ? parsed.gems : 0,
      awarded: Array.isArray(parsed.awarded) ? parsed.awarded.filter((k) => typeof k === "string") : [],
      history: Array.isArray(parsed.history)
        ? (parsed.history.filter(
            (entry) => entry && typeof entry === "object" && typeof (entry as RewardEntry).key === "string",
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
    if (state.awarded.includes(key)) return { xp: 0, gems: 0 };
    const entry: RewardEntry = { key, label, xp, gems, at: new Date().toISOString() };
    commit({
      xp: state.xp + xp,
      gems: state.gems + gems,
      awarded: [...state.awarded, key],
      history: [entry, ...state.history].slice(0, 25),
    });
    return { xp, gems };
  },
  reset() {
    commit(EMPTY);
  },
};

/**
 * Grants step / phase / journey rewards for a journey whose task list already
 * reflects the completion. Idempotent: reopening a completed step pays nothing.
 */
export function awardForCompletedTask(journey: Journey, task: Task): { xp: number; gems: number } {
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
  if (phase && phase.tasks.every((t) => t.completed)) {
    const phaseAward = rewardStore.award(
      `phase:${phase.id}`,
      REWARDS.phaseXp,
      REWARDS.phaseGems,
      `Finished phase ${phase.title}`,
    );
    xp += phaseAward.xp;
    gems += phaseAward.gems;
  }

  if (journey.phases.every((p) => p.tasks.every((t) => t.completed))) {
    const journeyAward = rewardStore.award(
      `journey:${journey.id}`,
      0,
      REWARDS.journeyGems,
      `Completed journey ${journey.title}`,
    );
    xp += journeyAward.xp;
    gems += journeyAward.gems;
  }

  return { xp, gems };
}

/** Practice XP for finishing all check-your-understanding questions of a step. */
export function awardPracticeCompletion(
  taskId: string,
  taskTitle = "practice",
): { xp: number; gems: number } {
  return rewardStore.award(`practice:${taskId}`, REWARDS.practiceXp, 0, `Practice — ${taskTitle}`);
}
