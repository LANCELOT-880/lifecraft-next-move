import { R, type ResourcesByKey } from "./types";

/** Step-specific resources for the demo journeys, keyed by exact task id. */
// prettier-ignore
export const demoTaskResources: ResourcesByKey = {
  "demo-japanese-t1": R("demo-japanese-t1", [
    ["article", "Hiragana in one sitting", "Row-by-row guide to all 46 characters with pronunciation.", "https://www.tofugu.com/japanese/learn-hiragana/"],
    ["documentation", "Hiragana chart", "Full syllabary chart and handwriting guidance.", "https://www.tofugu.com/japanese/learn-hiragana/"],
    ["practice", "Japanese Foundation IRODORI", "Free Japanese learning materials with reading and pronunciation practice.", "https://www.irodori.jpf.go.jp/en/"],
  ]),
  "demo-japanese-t2": R("demo-japanese-t2", [
    ["article", "Katakana through loanwords", "Learn katakana with a structured character-by-character guide.", "https://www.tofugu.com/japanese/learn-katakana/"],
    ["article", "When Japanese uses Katakana", "Learn where katakana appears in everyday Japanese writing.", "https://www.tofugu.com/japanese/learn-katakana/"],
  ]),
  "demo-japanese-t3": R("demo-japanese-t3", [
    ["article", "Greetings by time of day", "Useful Japanese greetings and phrases for everyday conversations.", "https://www.tofugu.com/japanese/basic-japanese-phrases/"],
    ["practice", "Japanese Foundation IRODORI", "Practice practical Japanese communication for daily life.", "https://www.irodori.jpf.go.jp/en/"],
  ]),
  "demo-japanese-t5": R("demo-japanese-t5", [
    ["article", "Tofugu Japanese vocabulary guide", "A practical starting point for building useful Japanese vocabulary.", "https://www.tofugu.com/japanese/japanese-vocabulary/"],
  ]),

  "demo-game-t1": R("demo-game-t1", [
    ["documentation", "Your first Godot 2D game", "A guided first project that keeps the core game loop small and finishable.", "https://docs.godotengine.org/en/stable/getting_started/step_by_step/your_first_2d_game.html"],
    ["article", "Godot project workflow", "Official guidance for structuring a small Godot game project.", "https://docs.godotengine.org/en/stable/tutorials/best_practices/index.html"],
  ]),
  "demo-game-t2": R("demo-game-t2", [
    ["documentation", "Godot 2D movement", "Official CharacterBody2D movement patterns and velocity handling.", "https://docs.godotengine.org/en/stable/tutorials/2d/2d_movement.html"],
    ["documentation", "Godot input examples", "Use input actions and controls to make movement responsive.", "https://docs.godotengine.org/en/stable/tutorials/inputs/input_examples.html"],
    ["practice", "Godot first 2D game", "Apply movement in a small playable project and iterate on how it feels.", "https://docs.godotengine.org/en/stable/getting_started/step_by_step/your_first_2d_game.html"],
  ]),
  "demo-game-t3": R("demo-game-t3", [
    ["documentation", "Godot tilemaps", "Build and iterate on 2D level layouts using the official tilemap workflow.", "https://docs.godotengine.org/en/stable/tutorials/2d/using_tilemaps.html"],
    ["practice", "Your first Godot 2D game", "Block out a playable level before adding polish or final art.", "https://docs.godotengine.org/en/stable/getting_started/step_by_step/your_first_2d_game.html"],
  ]),
  "demo-game-t6": R("demo-game-t6", [
    ["documentation", "Godot testing best practices", "Official guidance for testing and checking a project as it develops.", "https://docs.godotengine.org/en/stable/tutorials/best_practices/index.html"],
  ]),
};
