import type { Difficulty, Impact, JourneyCategory } from "./types";

export interface TemplateTask {
  title: string;
  estimatedMinutes: number;
  difficulty: Difficulty;
  impact: Impact;
}

export interface TemplatePhase {
  title: string;
  summary: string;
  tasks: TemplateTask[];
}

const t = (
  title: string,
  estimatedMinutes: number,
  difficulty: Difficulty,
  impact: Impact,
): TemplateTask => ({ title, estimatedMinutes, difficulty, impact });

export const journeyTemplates: Record<JourneyCategory, TemplatePhase[]> = {
  language: [
    {
      title: "Foundations",
      summary: "Scripts, sounds and first phrases.",
      tasks: [
        t("Learn the basic writing system or alphabet", 30, "Medium", "High impact"),
        t("Learn essential vocabulary", 25, "Easy", "High impact"),
        t("Learn basic greetings", 15, "Easy", "Medium impact"),
        t("Learn simple sentence structure", 20, "Medium", "High impact"),
      ],
    },
    {
      title: "Beginner Skills",
      summary: "Core grammar and everyday language.",
      tasks: [
        t("Learn common grammar patterns", 30, "Medium", "High impact"),
        t("Build everyday vocabulary", 25, "Easy", "Medium impact"),
        t("Practice listening", 20, "Easy", "Medium impact"),
        t("Practice reading", 25, "Medium", "Medium impact"),
      ],
    },
    {
      title: "Real Practice",
      summary: "Turn knowledge into fluency.",
      tasks: [
        t("Write simple sentences", 20, "Easy", "Medium impact"),
        t("Listen to beginner conversations", 25, "Medium", "Medium impact"),
        t("Practice speaking", 30, "Hard", "High impact"),
        t("Complete a short real-world conversation", 30, "Hard", "High impact"),
      ],
    },
  ],
  gamedev: [
    {
      title: "Foundations",
      summary: "Set up and prove the idea.",
      tasks: [
        t("Choose a game concept", 30, "Easy", "High impact"),
        t("Set up the project", 25, "Easy", "Medium impact"),
        t("Learn the engine interface", 45, "Medium", "High impact"),
        t("Create the basic player", 40, "Medium", "High impact"),
      ],
    },
    {
      title: "Core Systems",
      summary: "Build the parts that make it a game.",
      tasks: [
        t("Implement player movement", 45, "Medium", "High impact"),
        t("Add collisions", 30, "Medium", "Medium impact"),
        t("Add game mechanics", 60, "Hard", "High impact"),
        t("Add UI", 40, "Medium", "Medium impact"),
      ],
    },
    {
      title: "Polish",
      summary: "Make it feel finished and ship it.",
      tasks: [
        t("Add sound", 30, "Easy", "Low impact"),
        t("Add visual effects", 40, "Medium", "Medium impact"),
        t("Add menus", 30, "Easy", "Medium impact"),
        t("Test and publish the game", 60, "Hard", "High impact"),
      ],
    },
  ],
  programming: [
    {
      title: "Foundations",
      summary: "The syntax you will use every day.",
      tasks: [
        t("Learn variables and data types", 25, "Easy", "High impact"),
        t("Learn conditions", 20, "Easy", "Medium impact"),
        t("Learn loops", 25, "Easy", "High impact"),
        t("Learn functions", 30, "Medium", "High impact"),
      ],
    },
    {
      title: "Core Skills",
      summary: "Structure, data and debugging.",
      tasks: [
        t("Learn arrays and collections", 30, "Medium", "High impact"),
        t("Learn objects/classes", 35, "Medium", "High impact"),
        t("Work with files", 30, "Medium", "Medium impact"),
        t("Debug programs", 25, "Medium", "Medium impact"),
      ],
    },
    {
      title: "Practice",
      summary: "Ship something real.",
      tasks: [
        t("Build a small project", 60, "Hard", "High impact"),
        t("Refactor the project", 40, "Medium", "Medium impact"),
        t("Fix bugs", 30, "Medium", "Medium impact"),
        t("Publish the project", 30, "Easy", "High impact"),
      ],
    },
  ],
  fitness: [
    {
      title: "Foundations",
      summary: "Build the habit before the intensity.",
      tasks: [
        t("Establish a consistent routine", 20, "Easy", "High impact"),
        t("Learn basic movement patterns", 30, "Medium", "High impact"),
        t("Set realistic training targets", 15, "Easy", "Medium impact"),
        t("Track workouts", 10, "Easy", "Medium impact"),
      ],
    },
    {
      title: "Progress",
      summary: "Get stronger, week over week.",
      tasks: [
        t("Increase training consistency", 30, "Medium", "High impact"),
        t("Improve technique", 30, "Medium", "High impact"),
        t("Track progression", 15, "Easy", "Medium impact"),
        t("Adjust workload", 20, "Medium", "Medium impact"),
      ],
    },
    {
      title: "Long-Term",
      summary: "Keep it sustainable.",
      tasks: [
        t("Review progress", 20, "Easy", "Medium impact"),
        t("Identify weaknesses", 20, "Medium", "Medium impact"),
        t("Refine the routine", 25, "Medium", "High impact"),
        t("Maintain consistency", 30, "Medium", "High impact"),
      ],
    },
  ],
  general: [
    {
      title: "Understand",
      summary: "Get clear on what you are aiming at.",
      tasks: [
        t("Define the goal clearly", 15, "Easy", "High impact"),
        t("Learn the fundamentals", 30, "Medium", "High impact"),
        t("Identify the first milestone", 20, "Easy", "Medium impact"),
      ],
    },
    {
      title: "Build",
      summary: "Practice the core skill.",
      tasks: [
        t("Complete the first practical task", 30, "Medium", "High impact"),
        t("Practice the core skill", 30, "Medium", "High impact"),
        t("Review progress", 20, "Easy", "Medium impact"),
      ],
    },
    {
      title: "Apply",
      summary: "Use it for something real.",
      tasks: [
        t("Complete a small real-world project", 60, "Hard", "High impact"),
        t("Review the result", 20, "Easy", "Medium impact"),
        t("Identify the next level", 20, "Easy", "Medium impact"),
      ],
    },
  ],
};
