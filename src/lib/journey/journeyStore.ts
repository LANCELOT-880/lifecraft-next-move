import { analyzeGoal, cleanGoalTitle } from "./analyzer";
import { demoJourneys } from "./demo";
import { awardForCompletedTask } from "./rewards";
import { journeyTemplates } from "./templates";
import {
  categoryLabels,
  type GoalInput,
  type Journey,
  type NextMove,
  type Phase,
  type Task,
} from "./types";

const JOURNEYS_KEY = "lifecraft.journeys.v1";
const ACTIVE_KEY = "lifecraft.activeJourney.v1";

/* ---------- pure helpers ---------- */

export function allTasks(journey: Journey): Task[] {
  return journey.phases.flatMap((phase) => phase.tasks);
}

export function completedCount(journey: Journey): number {
  return allTasks(journey).filter((task) => task.completed).length;
}

export function calcProgress(journey: Journey): number {
  const tasks = allTasks(journey);
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100);
}

export function findTask(
  journey: Journey,
  taskId: string,
): { task: Task; phase: Phase } | null {
  for (const phase of journey.phases) {
    const task = phase.tasks.find((item) => item.id === taskId);
    if (task) return { task, phase };
  }
  return null;
}

export function getNextMove(journey: Journey): NextMove | null {
  for (const phase of journey.phases) {
    const task = phase.tasks.find((item) => !item.completed);
    if (task) {
      return {
        taskId: task.id,
        task: task.title,
        journeyId: journey.id,
        journey: journey.title,
        phase: phase.title,
        minutes: task.estimatedMinutes,
        difficulty: task.difficulty,
        impact: task.impact,
        reason: `This is the next open step in ${phase.title.toLowerCase()} — completing it moves ${journey.title} forward.`,
      };
    }
  }
  return null;
}

function uid(prefix: string): string {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export function buildJourney(input: GoalInput): Journey {
  const category = analyzeGoal(input.goal);
  const template = journeyTemplates[category];
  const id = uid("journey");
  const title = cleanGoalTitle(input.goal);

  return {
    id,
    title,
    description: input.why.trim() || `${categoryLabels[category]} journey shaped around your goal.`,
    category,
    why: input.why.trim(),
    progress: 0,
    dailyTime: input.dailyTime,
    targetDate: input.targetDate,
    createdAt: new Date().toISOString(),
    phases: template.map((phase, phaseIndex) => ({
      id: `${id}-p${phaseIndex + 1}`,
      title: phase.title,
      order: phaseIndex + 1,
      summary: phase.summary,
      tasks: phase.tasks.map((task, taskIndex) => ({
        id: `${id}-p${phaseIndex + 1}-t${taskIndex + 1}`,
        title: task.title,
        completed: false,
        estimatedMinutes: task.estimatedMinutes,
        difficulty: task.difficulty,
        impact: task.impact,
      })),
    })),
  };
}

/* ---------- persistence ---------- */

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function read(): Journey[] {
  if (!isBrowser()) return demoJourneys;
  try {
    const raw = window.localStorage.getItem(JOURNEYS_KEY);
    const saved = raw ? (JSON.parse(raw) as Journey[]) : [];
    const list = Array.isArray(saved) ? saved.filter((j) => j && Array.isArray(j.phases)) : [];
    const missingDemos = demoJourneys.filter((demo) => !list.some((j) => j.id === demo.id));
    return [...missingDemos, ...list];
  } catch {
    return demoJourneys;
  }
}

function write(list: Journey[]) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(JOURNEYS_KEY, JSON.stringify(list));
  } catch {
    /* storage unavailable — keep in-memory state */
  }
}

let cache: Journey[] | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export const journeyStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot(): Journey[] {
    if (!cache) cache = read();
    return cache;
  },
  getServerSnapshot(): Journey[] {
    return demoJourneys;
  },
  setAll(list: Journey[]) {
    cache = list;
    write(list);
    emit();
  },
  create(input: GoalInput): Journey {
    const journey = buildJourney(input);
    journeyStore.setAll([journey, ...journeyStore.getSnapshot()]);
    journeyStore.setActiveId(journey.id);
    return journey;
  },
  toggleTask(journeyId: string, taskId: string): { xp: number; gems: number } {
    let completedJourney: Journey | null = null;
    let completedTask: Task | null = null;
    const next = journeyStore.getSnapshot().map((journey) => {
      if (journey.id !== journeyId) return journey;
      const updated: Journey = {
        ...journey,
        phases: journey.phases.map((phase) => ({
          ...phase,
          tasks: phase.tasks.map((task) =>
            task.id === taskId ? { ...task, completed: !task.completed } : task,
          ),
        })),
      };
      const withProgress = { ...updated, progress: calcProgress(updated) };
      const toggled = findTask(withProgress, taskId);
      if (toggled?.task.completed) {
        completedJourney = withProgress;
        completedTask = toggled.task;
      }
      return withProgress;
    });
    journeyStore.setAll(next);
    if (completedJourney && completedTask) {
      return awardForCompletedTask(completedJourney, completedTask);
    }
    return { xp: 0, gems: 0 };
  },
  getActiveId(): string | null {
    if (!isBrowser()) return null;
    try {
      return window.localStorage.getItem(ACTIVE_KEY);
    } catch {
      return null;
    }
  },
  setActiveId(id: string) {
    if (!isBrowser()) return;
    try {
      window.localStorage.setItem(ACTIVE_KEY, id);
    } catch {
      /* ignore */
    }
    emit();
  },
};
