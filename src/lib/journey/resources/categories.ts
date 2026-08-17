import type { JourneyCategory } from "../types";
import { R, type ResourcesByKey } from "./types";

/**
 * Resources for template-generated steps, keyed by the step's exact lowercased
 * title inside its own category. A missing key means the step simply has no
 * resource section — never another step's list.
 */
export const categoryResources: Record<JourneyCategory, ResourcesByKey> = {
  language: {
    "learn the basic writing system or alphabet": R("lang-alphabet", [
      ["video", "Reading a new alphabet", "How to map unfamiliar letters to sounds you already produce.", "https://example.com/lifecraft/mock/video/new-alphabet"],
      ["practice", "Letter recognition drill", "Five minutes of shuffled letter-to-sound recall.", "https://example.com/lifecraft/mock/practice/letters"],
    ]),
    "learn essential vocabulary": R("lang-vocab", [
      ["documentation", "Beginner frequency list", "The first few hundred words that cover everyday speech.", "https://example.com/lifecraft/mock/docs/frequency-list"],
    ]),
    "learn basic greetings": R("lang-greetings", [
      ["video", "Greetings and introductions", "Short dialogues you can copy word for word.", "https://example.com/lifecraft/mock/video/greetings"],
    ]),
    "practice speaking": R("lang-speaking", [
      ["practice", "Two-minute speaking prompts", "Record yourself answering one prompt a day.", "https://example.com/lifecraft/mock/practice/speaking-prompts"],
    ]),
  },
  programming: {
    "learn variables and data types": R("prog-variables", [
      ["documentation", "Built-in types reference", "Numbers, strings, booleans and when each is the right choice.", "https://example.com/lifecraft/mock/docs/data-types"],
      ["practice", "Variable exercises", "Ten tiny programs that store and print values.", "https://example.com/lifecraft/mock/practice/variables"],
    ]),
    "learn conditions": R("prog-conditions", [
      ["video", "if / else, clearly", "Branching logic explained with traced examples.", "https://example.com/lifecraft/mock/video/conditions"],
    ]),
    "learn loops": R("prog-loops", [
      ["article", "Choosing for vs while", "Counted repetition versus condition-driven repetition.", "https://example.com/lifecraft/mock/article/loops"],
      ["practice", "Loop katas", "Sum, count and filter drills over small lists.", "https://example.com/lifecraft/mock/practice/loops"],
    ]),
    "learn functions": R("prog-functions", [
      ["documentation", "Functions and scope", "Parameters, return values and where names live.", "https://example.com/lifecraft/mock/docs/functions"],
    ]),
    "build a small project": R("prog-project", [
      ["article", "Picking a first project", "Small, boring and finishable beats ambitious and abandoned.", "https://example.com/lifecraft/mock/article/first-project"],
    ]),
  },
  gamedev: {},
  fitness: {},
  general: {},
};
