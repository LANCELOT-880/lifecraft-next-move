import type { Journey, Task } from "./types";

const task = (
  id: string,
  title: string,
  completed: boolean,
  estimatedMinutes: number,
  difficulty: Task["difficulty"],
  impact: Task["impact"],
): Task => ({ id, title, completed, estimatedMinutes, difficulty, impact });

export const demoJourneys: Journey[] = [
  {
    id: "demo-japanese",
    title: "Learn Japanese",
    description: "Build conversational Japanese skills.",
    category: "language",
    targetLanguage: "japanese",
    why: "I want to travel through Japan without a phrasebook.",
    progress: 68,
    dailyTime: "30 min",
    targetDate: "",
    createdAt: "2026-05-02T09:00:00.000Z",
    isDemo: true,
    phases: [
      {
        id: "demo-japanese-p1",
        title: "Foundations",
        order: 1,
        summary: "Scripts, sounds and first phrases.",
        tasks: [
          task("demo-japanese-t1", "Learn Hiragana", true, 30, "Medium", "High impact"),
          task("demo-japanese-t2", "Learn Katakana", true, 30, "Medium", "High impact"),
          task("demo-japanese-t3", "Basic greetings", true, 15, "Easy", "Medium impact"),
        ],
      },
      {
        id: "demo-japanese-p2",
        title: "Beginner",
        order: 2,
        summary: "Core grammar and everyday vocabulary.",
        tasks: [
          task("demo-japanese-t4", "Basic grammar", true, 25, "Medium", "High impact"),
          task("demo-japanese-t5", "Learn 100 essential words", false, 20, "Easy", "High impact"),
          task("demo-japanese-t6", "Simple sentences", false, 20, "Medium", "Medium impact"),
        ],
      },
      {
        id: "demo-japanese-p3",
        title: "Practice",
        order: 3,
        summary: "Turn knowledge into fluency.",
        tasks: [
          task("demo-japanese-t7", "Listening", false, 20, "Medium", "Medium impact"),
          task("demo-japanese-t8", "Reading", false, 25, "Medium", "Medium impact"),
          task("demo-japanese-t9", "Conversation", false, 30, "Hard", "High impact"),
        ],
      },
    ],
  },
  {
    id: "demo-game",
    title: "Build a Game",
    description: "Create and publish a complete game.",
    category: "gamedev",
    why: "I want one finished game in my portfolio.",
    progress: 34,
    dailyTime: "1 hour",
    targetDate: "",
    createdAt: "2026-06-11T09:00:00.000Z",
    isDemo: true,
    phases: [
      {
        id: "demo-game-p1",
        title: "Prototype",
        order: 1,
        summary: "Prove the core loop is fun.",
        tasks: [
          task("demo-game-t1", "Lock the core concept", true, 45, "Medium", "High impact"),
          task("demo-game-t2", "Complete player movement", false, 25, "Medium", "High impact"),
          task("demo-game-t3", "Block out first level", false, 60, "Medium", "Medium impact"),
        ],
      },
      {
        id: "demo-game-p2",
        title: "Production",
        order: 2,
        summary: "Build the real thing.",
        tasks: [
          task("demo-game-t4", "Art pass on player + enemies", false, 60, "Hard", "Medium impact"),
          task("demo-game-t5", "Add sound effects", false, 30, "Easy", "Low impact"),
        ],
      },
      {
        id: "demo-game-p3",
        title: "Launch",
        order: 3,
        summary: "Ship it publicly.",
        tasks: [
          task("demo-game-t6", "Run 5 playtests", false, 45, "Medium", "High impact"),
          task("demo-game-t7", "Publish store page", false, 60, "Medium", "High impact"),
        ],
      },
    ],
  },
];
