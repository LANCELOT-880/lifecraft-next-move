import { analyzeGoal, cleanGoalTitle, detectTargetLanguage } from "./analyzer";
import { demoJourneys } from "./demo";
import { awardForCompletedTask, type TaskCompletionResult } from "./rewards";
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
  if (!journey || !Array.isArray(journey.phases)) return [];
  return journey.phases.flatMap((phase) =>
    phase && Array.isArray(phase.tasks)
      ? phase.tasks.filter((task): task is Task => Boolean(task))
      : [],
  );
}

export function completedCount(journey: Journey): number {
  return allTasks(journey).filter((task) => task.completed).length;
}

export function calcProgress(journey: Journey): number {
  const tasks = allTasks(journey);
  if (tasks.length === 0) return 0;
  return Math.round((tasks.filter((task) => task.completed).length / tasks.length) * 100);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function normalizeTask(value: unknown): Task | null {
  const id = isRecord(value) ? value["id"] : undefined;
  const title = isRecord(value) ? value["title"] : undefined;
  if (!isRecord(value) || typeof id !== "string" || typeof title !== "string") return null;

  return {
    ...value,
    id,
    title,
    completed: typeof value["completed"] === "boolean" ? value["completed"] : false,
    estimatedMinutes: typeof value["estimatedMinutes"] === "number" ? value["estimatedMinutes"] : 0,
    difficulty:
      value["difficulty"] === "Easy" || value["difficulty"] === "Hard"
        ? value["difficulty"]
        : "Medium",
    impact:
      value["impact"] === "Low impact" || value["impact"] === "High impact"
        ? value["impact"]
        : "Medium impact",
  } as Task;
}

function normalizePhase(value: unknown, index: number): Phase | null {
  const id = isRecord(value) ? value["id"] : undefined;
  const title = isRecord(value) ? value["title"] : undefined;
  const tasks = isRecord(value) ? value["tasks"] : undefined;
  if (
    !isRecord(value) ||
    typeof id !== "string" ||
    typeof title !== "string" ||
    !Array.isArray(tasks)
  ) {
    return null;
  }

  return {
    ...value,
    id,
    title,
    order: typeof value["order"] === "number" ? value["order"] : index + 1,
    tasks: tasks.map(normalizeTask).filter((task): task is Task => task !== null),
  } as Phase;
}

export function normalizeJourney(value: unknown): Journey | null {
  const id = isRecord(value) ? value["id"] : undefined;
  const title = isRecord(value) ? value["title"] : undefined;
  const phasesValue = isRecord(value) ? value["phases"] : undefined;
  if (
    !isRecord(value) ||
    typeof id !== "string" ||
    typeof title !== "string" ||
    !Array.isArray(phasesValue)
  ) {
    return null;
  }

  const phases = phasesValue
    .map((phase, index) => normalizePhase(phase, index))
    .filter((phase): phase is Phase => phase !== null);
  const journey = { ...value, phases, progress: 0 } as Journey;
  return { ...journey, progress: calcProgress(journey) };
}

const DEMO_JOURNEYS = demoJourneys
  .map((journey) => normalizeJourney(journey))
  .filter((journey): journey is Journey => journey !== null);

export function findTask(journey: Journey, taskId: string): { task: Task; phase: Phase } | null {
  if (!journey || !Array.isArray(journey.phases)) return null;
  for (const phase of journey.phases) {
    if (!phase || !Array.isArray(phase.tasks)) continue;
    const task = phase.tasks.find((item) => item.id === taskId);
    if (task) return { task, phase };
  }
  return null;
}

export function getNextMove(journey: Journey): NextMove | null {
  if (!journey || !Array.isArray(journey.phases)) return null;
  for (const phase of journey.phases) {
    if (!phase || !Array.isArray(phase.tasks)) continue;
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
  const targetLanguage = category === "language" ? detectTargetLanguage(input.goal) : undefined;

  return {
    id,
    title,
    description: input.why.trim() || `${categoryLabels[category]} journey shaped around your goal.`,
    category,
    ...(targetLanguage ? { targetLanguage } : {}),
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
  if (!isBrowser()) return DEMO_JOURNEYS;
  try {
    const raw = window.localStorage.getItem(JOURNEYS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    const saved = Array.isArray(parsed)
      ? parsed
          .map((journey) => normalizeJourney(journey))
          .filter((journey): journey is Journey => journey !== null)
          .map((journey) => {
            if (journey.category !== "language" || journey.targetLanguage) return journey;
            const inferred = detectTargetLanguage(`${journey.title} ${journey.why}`);
            return inferred ? { ...journey, targetLanguage: inferred } : journey;
          })
      : [];
    if (raw && Array.isArray(parsed) && JSON.stringify(parsed) !== JSON.stringify(saved)) {
      write(saved);
    }
    const missingDemos = DEMO_JOURNEYS.filter((demo) => !saved.some((j) => j.id === demo.id));
    return [...missingDemos, ...saved];
  } catch {
    return DEMO_JOURNEYS;
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

function completionResult(
  journey: Journey,
  taskId: string,
  xp = 0,
  gems = 0,
  phaseRewarded = false,
  journeyRewarded = false,
): TaskCompletionResult {
  const found = findTask(journey, taskId);
  const phaseCompleted = Boolean(
    found && found.phase.tasks.length > 0 && found.phase.tasks.every((task) => task.completed),
  );
  const journeyCompleted =
    journey.phases.length > 0 &&
    journey.phases.every(
      (phase) => phase.tasks.length > 0 && phase.tasks.every((task) => task.completed),
    );

  return {
    taskCompleted: found?.task.completed ?? false,
    xp,
    gems,
    phaseCompleted,
    phaseRewarded,
    journeyCompleted,
    journeyRewarded,
  };
}

function updateTaskCompletion(
  journeyId: string,
  taskId: string,
  completed: boolean,
): TaskCompletionResult {
  const currentJourney = journeyStore.getSnapshot().find((journey) => journey.id === journeyId);
  const currentTask = currentJourney ? findTask(currentJourney, taskId)?.task : undefined;
  if (!currentJourney || !currentTask) {
    return {
      taskCompleted: false,
      xp: 0,
      gems: 0,
      phaseCompleted: false,
      phaseRewarded: false,
      journeyCompleted: false,
      journeyRewarded: false,
    };
  }

  const updatedJourney: Journey = {
    ...currentJourney,
    phases: currentJourney.phases.map((phase) => ({
      ...phase,
      tasks: phase.tasks.map((task) => (task.id === taskId ? { ...task, completed } : task)),
    })),
  };
  updatedJourney.progress = calcProgress(updatedJourney);
  journeyStore.setAll(
    journeyStore
      .getSnapshot()
      .map((journey) => (journey.id === journeyId ? updatedJourney : journey)),
  );

  if (completed && !currentTask.completed) {
    const updatedTask = findTask(updatedJourney, taskId)?.task;
    if (updatedTask) return awardForCompletedTask(updatedJourney, updatedTask);
  }

  return completionResult(updatedJourney, taskId);
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
    return DEMO_JOURNEYS;
  },
  setAll(list: Journey[]) {
    const normalized = list
      .map((journey) => normalizeJourney(journey))
      .filter((journey): journey is Journey => journey !== null);
    cache = normalized;
    write(normalized);
    emit();
  },
  create(input: GoalInput): Journey {
    const journey = buildJourney(input);
    journeyStore.setAll([journey, ...journeyStore.getSnapshot()]);
    journeyStore.setActiveId(journey.id);
    return journey;
  },
  toggleTask(journeyId: string, taskId: string): TaskCompletionResult {
    const journey = journeyStore.getSnapshot().find((item) => item.id === journeyId);
    const task = journey ? findTask(journey, taskId)?.task : undefined;
    return updateTaskCompletion(journeyId, taskId, task ? !task.completed : false);
  },
  completeTask(journeyId: string, taskId: string): TaskCompletionResult {
    return updateTaskCompletion(journeyId, taskId, true);
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
