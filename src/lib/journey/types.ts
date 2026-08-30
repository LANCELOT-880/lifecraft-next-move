export type JourneyCategory = "language" | "gamedev" | "programming" | "fitness" | "general";
export type TargetLanguage = "japanese" | "german" | "spanish" | "french" | "english" | string;

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Impact = "Low impact" | "Medium impact" | "High impact";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  estimatedMinutes: number;
  difficulty: Difficulty;
  impact: Impact;
  /** Optional per-step overrides for the local reward system. */
  xpReward?: number;
  gemReward?: number;
  /** Architectural foundation for a future LIFECRAFT Plus tier. Nothing is locked today. */
  isPremium?: boolean;
}

export interface Phase {
  id: string;
  title: string;
  order: number;
  summary?: string;
  tasks: Task[];
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  category: JourneyCategory;
  /** Present for language journeys when the requested language is identifiable. */
  targetLanguage?: TargetLanguage;
  why: string;
  progress: number;
  dailyTime: string;
  targetDate: string;
  phases: Phase[];
  createdAt: string;
  isDemo?: boolean;
}

export interface NextMove {
  taskId: string;
  task: string;
  journeyId: string;
  journey: string;
  phase: string;
  minutes: number;
  difficulty: Difficulty;
  impact: Impact;
  reason: string;
}

export interface GoalInput {
  goal: string;
  why: string;
  dailyTime: string;
  targetDate: string;
}

export const categoryLabels: Record<JourneyCategory, string> = {
  language: "Language",
  gamedev: "Game development",
  programming: "Programming",
  fitness: "Fitness",
  general: "Personal growth",
};
