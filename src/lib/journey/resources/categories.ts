import type { JourneyCategory } from "../types";
import { R, type ResourcesByKey } from "./types";

/**
 * Resources for template-generated steps, keyed by the step's exact lowercased
 * title inside its own category. A missing key means the step simply has no
 * resource section — never another step's list.
 */
export const categoryResources: Record<JourneyCategory, ResourcesByKey> = {
  language: {},
  programming: {
    "learn variables and data types": R("prog-variables", [
      [
        "documentation",
        "MDN JavaScript variables",
        "Reference and examples for declaring and using JavaScript variables.",
        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Variables",
      ],
      [
        "practice",
        "MDN JavaScript first steps",
        "Hands-on scripting exercises covering values, variables, and basic output.",
        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting",
      ],
    ]),
    "learn conditions": R("prog-conditions", [
      [
        "documentation",
        "MDN conditionals",
        "Learn how if and else statements control program flow.",
        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Conditionals",
      ],
    ]),
    "learn loops": R("prog-loops", [
      [
        "documentation",
        "MDN loops and iteration",
        "A practical guide to for, while, and other JavaScript iteration patterns.",
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration",
      ],
      [
        "practice",
        "MDN loop exercises",
        "Use iteration to repeat work over values and collections.",
        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Loops",
      ],
    ]),
    "learn functions": R("prog-functions", [
      [
        "documentation",
        "MDN JavaScript functions",
        "Parameters, return values, scope, and reusable functions.",
        "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions",
      ],
    ]),
    "build a small project": R("prog-project", [
      [
        "article",
        "MDN your first website",
        "A guided small project that combines HTML, CSS, and JavaScript.",
        "https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Your_first_website",
      ],
    ]),
  },
  gamedev: {},
  fitness: {},
  general: {},
};

/** Language resources are keyed by target language to prevent cross-language leakage. */
export const languageResourcesByTarget: Record<string, ResourcesByKey> = {
  german: {
    "learn the basic writing system or alphabet": R("german-alphabet", [
      [
        "practice",
        "Goethe-Institut German exercises",
        "Free German practice activities for building reading and language foundations.",
        "https://www.goethe.de/en/spr/ueb.html",
      ],
    ]),
    "learn essential vocabulary": R("german-vocabulary", [
      [
        "documentation",
        "DW Learn German",
        "Deutsche Welle's structured German learning material and vocabulary practice.",
        "https://learngerman.dw.com/en/overview",
      ],
    ]),
    "learn basic greetings": R("german-greetings", [
      [
        "practice",
        "DW German beginner course",
        "Beginner dialogues and everyday expressions from Deutsche Welle.",
        "https://learngerman.dw.com/en/nicos-weg/c-36519789",
      ],
    ]),
    "practice speaking": R("german-speaking", [
      [
        "practice",
        "Goethe-Institut speaking practice",
        "Practice German communication tasks at a beginner-friendly level.",
        "https://www.goethe.de/en/spr/ueb.html",
      ],
    ]),
  },
  japanese: {
    "learn the basic writing system or alphabet": R("japanese-alphabet", [
      [
        "article",
        "Tofugu Hiragana guide",
        "A detailed guide to learning all 46 hiragana characters.",
        "https://www.tofugu.com/japanese/learn-hiragana/",
      ],
    ]),
    "learn essential vocabulary": R("japanese-vocabulary", [
      [
        "article",
        "Tofugu Learn Japanese guide",
        "A curated guide covering Japanese reading, writing, speaking, and listening resources.",
        "https://www.tofugu.com/learn-japanese/",
      ],
    ]),
    "learn basic greetings": R("japanese-greetings", [
      [
        "article",
        "Tofugu basic Japanese phrases",
        "Useful Japanese greetings and phrases for everyday conversations.",
        "https://www.tofugu.com/japanese/basic-japanese-phrases/",
      ],
    ]),
    "practice speaking": R("japanese-speaking", [
      [
        "practice",
        "IRODORI Japanese for Life in Japan",
        "Japan Foundation materials for practical Japanese communication.",
        "https://www.irodori.jpf.go.jp/en/",
      ],
    ]),
  },
};
