export type TaskStatus = "done" | "current" | "todo";

export interface Task {
  id: string;
  title: string;
  status: TaskStatus;
  minutes: number;
  difficulty: "Easy" | "Medium" | "Hard";
  impact: "Low impact" | "Medium impact" | "High impact";
}

export interface Milestone {
  id: string;
  index: string;
  name: string;
  summary: string;
  tasks: Task[];
}

export interface Journey {
  id: string;
  title: string;
  description: string;
  progress: number;
  milestonesDone: number;
  milestonesTotal: number;
  cadence: string;
  milestones: Milestone[];
}

export interface NextMove {
  task: string;
  journey: string;
  minutes: number;
  difficulty: string;
  impact: string;
  reason: string;
}

export const user = {
  name: "Sameer",
  fullName: "Sameer Kahar",
  email: "Demo account",
  initials: "SK",
  timezone: "Asia/Kolkata",
  dailyTime: "30 min",
};

export const journeys: Journey[] = [
  {
    id: "japanese",
    title: "Learn Japanese",
    description: "Build conversational Japanese skills.",
    progress: 68,
    milestonesDone: 12,
    milestonesTotal: 18,
    cadence: "30 min daily",
    milestones: [
      {
        id: "foundations",
        index: "01",
        name: "Foundations",
        summary: "Scripts, sounds and first phrases.",
        tasks: [
          {
            id: "hiragana",
            title: "Learn Hiragana",
            status: "done",
            minutes: 30,
            difficulty: "Medium",
            impact: "High impact",
          },
          {
            id: "katakana",
            title: "Learn Katakana",
            status: "done",
            minutes: 30,
            difficulty: "Medium",
            impact: "High impact",
          },
          {
            id: "greetings",
            title: "Basic greetings",
            status: "done",
            minutes: 15,
            difficulty: "Easy",
            impact: "Medium impact",
          },
        ],
      },
      {
        id: "beginner",
        index: "02",
        name: "Beginner",
        summary: "Core grammar and everyday vocabulary.",
        tasks: [
          {
            id: "grammar",
            title: "Basic grammar",
            status: "done",
            minutes: 25,
            difficulty: "Medium",
            impact: "High impact",
          },
          {
            id: "vocab-100",
            title: "Learn 100 essential words",
            status: "current",
            minutes: 20,
            difficulty: "Easy",
            impact: "High impact",
          },
          {
            id: "sentences",
            title: "Simple sentences",
            status: "todo",
            minutes: 20,
            difficulty: "Medium",
            impact: "Medium impact",
          },
        ],
      },
      {
        id: "practice",
        index: "03",
        name: "Practice",
        summary: "Turn knowledge into fluency.",
        tasks: [
          {
            id: "listening",
            title: "Listening",
            status: "todo",
            minutes: 20,
            difficulty: "Medium",
            impact: "Medium impact",
          },
          {
            id: "reading",
            title: "Reading",
            status: "todo",
            minutes: 25,
            difficulty: "Medium",
            impact: "Medium impact",
          },
          {
            id: "conversation",
            title: "Conversation",
            status: "todo",
            minutes: 30,
            difficulty: "Hard",
            impact: "High impact",
          },
        ],
      },
    ],
  },
  {
    id: "game",
    title: "Build a Game",
    description: "Create and publish a complete game.",
    progress: 34,
    milestonesDone: 6,
    milestonesTotal: 17,
    cadence: "1 hour daily",
    milestones: [
      {
        id: "prototype",
        index: "01",
        name: "Prototype",
        summary: "Prove the core loop is fun.",
        tasks: [
          {
            id: "concept",
            title: "Lock the core concept",
            status: "done",
            minutes: 45,
            difficulty: "Medium",
            impact: "High impact",
          },
          {
            id: "movement",
            title: "Complete player movement",
            status: "current",
            minutes: 25,
            difficulty: "Medium",
            impact: "High impact",
          },
          {
            id: "level",
            title: "Block out first level",
            status: "todo",
            minutes: 60,
            difficulty: "Medium",
            impact: "Medium impact",
          },
        ],
      },
      {
        id: "production",
        index: "02",
        name: "Production",
        summary: "Build the real thing.",
        tasks: [
          {
            id: "art",
            title: "Art pass on player + enemies",
            status: "todo",
            minutes: 60,
            difficulty: "Hard",
            impact: "Medium impact",
          },
          {
            id: "audio",
            title: "Add sound effects",
            status: "todo",
            minutes: 30,
            difficulty: "Easy",
            impact: "Low impact",
          },
        ],
      },
      {
        id: "launch",
        index: "03",
        name: "Launch",
        summary: "Ship it publicly.",
        tasks: [
          {
            id: "playtest",
            title: "Run 5 playtests",
            status: "todo",
            minutes: 45,
            difficulty: "Medium",
            impact: "High impact",
          },
          {
            id: "publish",
            title: "Publish store page",
            status: "todo",
            minutes: 60,
            difficulty: "Medium",
            impact: "High impact",
          },
        ],
      },
    ],
  },
];

export const dashboardNextMove: NextMove = {
  task: "Complete player movement",
  journey: "Build a Game",
  minutes: 25,
  difficulty: "Medium",
  impact: "High impact",
  reason: "This unblocks every prototype task that follows it.",
};

export const focusNextMove: NextMove = {
  task: "Learn 20 vocabulary words",
  journey: "Japanese Journey",
  minutes: 20,
  difficulty: "Easy",
  impact: "High impact",
  reason: "Completing this task moves you closer to your current milestone.",
};

export const steps = [
  {
    n: "01",
    title: "Define your goal",
    body: "Describe the intention in your own words. No structure required.",
  },
  {
    n: "02",
    title: "Build your journey",
    body: "LIFECRAFT shapes it into phases, milestones and sized tasks.",
  },
  {
    n: "03",
    title: "Take your next move",
    body: "Open the app and get exactly one action that matters today.",
  },
];