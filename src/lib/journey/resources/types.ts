export type ResourceType = "video" | "article" | "documentation" | "practice";

export interface Resource {
  id: string;
  type: ResourceType;
  title: string;
  description: string;
  url: string;
  isPremium?: boolean;
}

export const resourceTypeLabels: Record<ResourceType, string> = {
  video: "VIDEO",
  article: "ARTICLE",
  documentation: "DOCUMENTATION",
  practice: "PRACTICE",
};

/** Authoring helper: [type, title, description, url] tuples. */
export function R(
  prefix: string,
  entries: Array<[ResourceType, string, string, string]>,
): Resource[] {
  return entries.map(([type, title, description, url], index) => ({
    id: `${prefix}-r${index + 1}`,
    type,
    title,
    description,
    url,
    isPremium: false,
  }));
}

/** Resources keyed by an exact task id, or by lowercased task title in a category. */
export type ResourcesByKey = Record<string, Resource[]>;
