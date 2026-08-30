import type { JourneyCategory, TargetLanguage } from "./types";

const keywords: Array<{ category: JourneyCategory; words: string[] }> = [
  {
    category: "language",
    words: [
      "japanese",
      "spanish",
      "french",
      "german",
      "english",
      "korean",
      "mandarin",
      "chinese",
      "italian",
      "portuguese",
      "hindi",
      "language",
      "vocabulary",
      "speaking",
      "grammar",
      "fluent",
    ],
  },
  {
    category: "gamedev",
    words: ["game", "gaming", "unity", "godot", "unreal", "videogame", "video game", "game dev"],
  },
  {
    category: "programming",
    words: [
      "python",
      "java",
      "javascript",
      "typescript",
      "c++",
      "c#",
      "rust",
      "go lang",
      "coding",
      "code",
      "programming",
      "software",
      "developer",
      "development",
      "web dev",
      "algorithms",
    ],
  },
  {
    category: "fitness",
    words: [
      "fitness",
      "workout",
      "gym",
      "muscle",
      "strength",
      "exercise",
      "training",
      "bodybuilding",
      "run",
      "running",
      "weight",
      "cardio",
    ],
  },
];

const languageNames: Array<{ language: TargetLanguage; words: string[] }> = [
  { language: "japanese", words: ["japanese", "日本語"] },
  { language: "german", words: ["german", "deutsch"] },
  { language: "spanish", words: ["spanish", "español"] },
  { language: "french", words: ["french", "français"] },
  { language: "english", words: ["english"] },
];

/** Interprets a plain-language goal and maps it to the journey shape that fits best. */
export function analyzeGoal(goal: string): JourneyCategory {
  const text = goal.toLowerCase();
  for (const group of keywords) {
    if (group.words.some((word) => text.includes(word))) return group.category;
  }
  return "general";
}

/** Returns a requested language only when the goal names one clearly. */
export function detectTargetLanguage(goal: string): TargetLanguage | undefined {
  const text = goal.toLowerCase();
  return languageNames.find((entry) => entry.words.some((word) => text.includes(word)))?.language;
}

/** Turns "I want to learn Japanese" into "Learn Japanese". */
export function cleanGoalTitle(goal: string): string {
  const trimmed = goal
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.!]+$/, "");
  const stripped = trimmed.replace(
    /^(i\s+(want|would like|wanna|need|wish)\s+to|i'd like to|my goal is to|i\s+am\s+going\s+to|help me)\s+/i,
    "",
  );
  const base = stripped.length > 0 ? stripped : trimmed;
  return base.charAt(0).toUpperCase() + base.slice(1);
}
