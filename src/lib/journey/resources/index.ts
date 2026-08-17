import type { Journey, Task } from "../types";
import { categoryResources } from "./categories";
import { demoTaskResources } from "./demoTasks";
import type { Resource } from "./types";

export { resourceTypeLabels } from "./types";
export type { Resource, ResourceType } from "./types";

/**
 * Resolves the resources for one specific step.
 * Lookup order — never positional, never a shared fallback:
 *  1. exact task id
 *  2. the step's own title inside its journey's category
 * No match means the step has no resources and the section is hidden.
 */
export function getResources(task: Task, journey: Journey): Resource[] {
  const byId = demoTaskResources[task.id];
  if (byId?.length) return byId;

  const catalogue = categoryResources[journey.category];
  const byTitle = catalogue?.[task.title.trim().toLowerCase()];
  return byTitle ?? [];
}
