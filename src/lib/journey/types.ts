export type JourneyCategory = "language" | "gamedev" | "programming" | "fitness" | "general";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type Impact = "Low impact" | "Medium impact" | "High impact";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  estimatedMinutes: number;
  difficulty: Difficulty;
  impact: Impact;
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
