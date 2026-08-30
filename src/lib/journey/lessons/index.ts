import type { Journey, JourneyCategory, Task } from "../types";
import { demoTaskLessons } from "./demoTasks";
import { fitnessLessons } from "./fitness";
import { gamedevLessons } from "./gamedev";
import { generalLessons } from "./general";
import { languageLessonsByTarget } from "./language";
import { programmingLessons } from "./programming";
import type { Lesson, LessonsByTitle } from "./types";

export type { Lesson, LessonExample, PracticeQuestion } from "./types";

const lessonsByCategory: Record<JourneyCategory, LessonsByTitle> = {
  language: {},
  gamedev: gamedevLessons,
  programming: programmingLessons,
  fitness: fitnessLessons,
  general: generalLessons,
};

/**
 * Resolves the lesson for one specific step.
 *
 * Lookup order — never positional, never a shared generic fallback:
 *  1. exact task id (demo journeys own hand-written content per step)
 *  2. the step's own title inside its journey's category
 * If neither matches, no lesson exists for this step and the caller shows an
 * explicit "unavailable" state rather than another task's content.
 */
export function getLesson(task: Task, journey: Journey): Lesson | null {
  if (journey.isDemo) {
    const byId = demoTaskLessons[task.id];
    if (byId) return byId;
  }

  const catalogue =
    journey.category === "language"
      ? journey.targetLanguage
        ? languageLessonsByTarget[journey.targetLanguage.toLowerCase()]
        : undefined
      : lessonsByCategory[journey.category];
  const byTitle = catalogue?.[task.title.trim().toLowerCase()];
  return byTitle ?? null;
}
