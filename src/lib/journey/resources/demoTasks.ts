import { R, type ResourcesByKey } from "./types";

/** Step-specific resources for the demo journeys, keyed by exact task id. */
export const demoTaskResources: ResourcesByKey = {
  "demo-japanese-t1": R("demo-japanese-t1", [
    ["video", "Hiragana in one sitting", "Row-by-row walkthrough of all 46 characters with pronunciation.", "https://example.com/lifecraft/mock/video/hiragana-walkthrough"],
    ["documentation", "Hiragana chart (printable)", "Full syllabary chart with stroke order for handwriting practice.", "https://example.com/lifecraft/mock/docs/hiragana-chart"],
    ["practice", "Hiragana reading drill", "Timed recognition drill over the あ and か rows.", "https://example.com/lifecraft/mock/practice/hiragana-drill"],
  ]),
  "demo-japanese-t2": R("demo-japanese-t2", [
    ["video", "Katakana through loanwords", "Learn Katakana by reading words you already know in English.", "https://example.com/lifecraft/mock/video/katakana-loanwords"],
    ["article", "When Japanese uses Katakana", "Loanwords, names, onomatopoeia and emphasis explained with examples.", "https://example.com/lifecraft/mock/article/katakana-usage"],
  ]),
  "demo-japanese-t3": R("demo-japanese-t3", [
    ["video", "Greetings by time of day", "おはよう, こんにちは and こんばんは with natural intonation.", "https://example.com/lifecraft/mock/video/japanese-greetings"],
    ["practice", "Greeting role-play cards", "Ten short prompts to answer out loud in under a minute.", "https://example.com/lifecraft/mock/practice/greeting-cards"],
  ]),
  "demo-japanese-t5": R("demo-japanese-t5", [
    ["documentation", "Core 100 word list", "The highest-frequency beginner words grouped by topic.", "https://example.com/lifecraft/mock/docs/core-100"],
  ]),

  "demo-game-t1": R("demo-game-t1", [
    ["article", "Writing a one-sentence game pitch", "How to compress a concept into a single testable sentence.", "https://example.com/lifecraft/mock/article/game-pitch"],
    ["video", "Scoping your first game", "Why the first project should be finishable in weeks, not years.", "https://example.com/lifecraft/mock/video/scope-first-game"],
  ]),
  "demo-game-t2": R("demo-game-t2", [
    ["documentation", "CharacterBody2D reference", "Engine reference for move_and_slide and velocity handling.", "https://example.com/lifecraft/mock/docs/character-body"],
    ["video", "Platformer movement feel", "Coyote time, jump buffering and acceleration tuning.", "https://example.com/lifecraft/mock/video/movement-feel"],
    ["practice", "Movement tuning checklist", "Adjust one value at a time and log how the jump feels.", "https://example.com/lifecraft/mock/practice/movement-checklist"],
  ]),
  "demo-game-t3": R("demo-game-t3", [
    ["article", "Grey-box level design", "Block out layout and pacing before any art exists.", "https://example.com/lifecraft/mock/article/greybox-levels"],
    ["practice", "First level beat sheet", "Plan teach, test, twist beats for your opening level.", "https://example.com/lifecraft/mock/practice/level-beats"],
  ]),
  "demo-game-t6": R("demo-game-t6", [
    ["article", "Running a useful playtest", "What to watch, what to ask, and what to ignore.", "https://example.com/lifecraft/mock/article/playtesting"],
  ]),
};
