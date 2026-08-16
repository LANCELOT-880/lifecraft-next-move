import { L, type LessonsByTitle } from "./types";

export const gamedevLessons: LessonsByTitle = {
  "choose a game concept": L(
    [
      "A good first concept is one sentence long and one mechanic deep: the player does X to achieve Y.",
      "Scope is the whole battle. Pick something you could finish in weeks, not the dream game you would need years for.",
      "Write down what the player does in the first ten seconds — if that is not fun, no amount of art will save it.",
    ],
    [
      ['"Dodge falling blocks to survive as long as possible."', "One sentence, one mechanic, clearly finishable."],
      ["One player verb: jump", "Everything else supports that single action."],
      ["Cut list: multiplayer, story, open world", "Decide what you are NOT building."],
    ],
    [
      ["How long should the concept be?", ["One sentence", "Ten pages", "A whole design bible", "Undefined"], 0],
      ["What kills most first games?", ["Scope that is too large", "Too few colours", "Short titles", "Small levels"], 0],
      ["What should you define alongside the concept?", ["What you will not build", "The launch trailer", "The sequel", "The price"], 0],
    ],
    "Write your concept in one sentence, name the single core player action, and list three things you will deliberately not build.",
  ),
  "set up the project": L(
    [
      "A tidy project at the start saves hours later. Create the folders you know you need before files start piling up.",
      "Set the target resolution and input scheme now — changing them later touches everything.",
      "Get version control in place immediately so experiments are safe to make and easy to undo.",
    ],
    [
      ["/scenes /scripts /assets /audio", "A folder layout you will not have to reorganise."],
      ["Set base resolution + window mode", "Decided once, respected everywhere."],
      ["git init + first commit", "An escape hatch for every future mistake."],
    ],
    [
      ["Why set up folders first?", ["Files pile up fast", "It looks impressive", "The engine requires it", "It renders faster"], 0],
      ["When should resolution be set?", ["At the start", "After art is done", "At launch", "Never"], 0],
      ["Why use version control?", ["Experiments become safe to undo", "It compresses art", "It adds physics", "It writes code"], 0],
    ],
    "Create the project with its folder structure, set the base resolution, and make your first commit.",
  ),
  "learn the engine interface": L(
    [
      "Before writing gameplay, learn where things live: the scene tree/hierarchy, the inspector, the asset browser, the console and the play button.",
      "Learn how to run and stop the game, and where errors appear — you will use those a thousand times.",
      "Build one throwaway scene with a shape, a camera and a print statement. That single exercise teaches the whole layout.",
    ],
    [
      ["Scene/hierarchy panel", "The list of everything in the current scene."],
      ["Inspector", "Where you change the selected object's properties."],
      ["Output/console", "Where your prints and errors show up."],
    ],
    [
      ["What does the inspector do?", ["Edits the selected object's properties", "Compiles the game", "Stores audio", "Publishes builds"], 0],
      ["Where do errors appear?", ["The console/output panel", "The asset folder", "The store page", "The title screen"], 0],
      ["What is a good first exercise?", ["A throwaway scene with a shape and a print", "A full level", "The main menu", "Marketing"], 0],
    ],
    "Create a throwaway scene with one shape and a camera, print a message on start, and run it.",
  ),
  "create the basic player": L(
    [
      "The player object is the centre of your game. Start as a plain shape with a script attached — art comes much later.",
      "Give it only what it needs now: a body, a collider and a script. Resist adding stats, inventory or animation yet.",
      "Getting a controllable placeholder on screen is the milestone that makes the project feel real.",
    ],
    [
      ["Capsule/square + collider + script", "The minimum viable player."],
      ["Placeholder colour, not a sprite", "Keeps focus on behaviour."],
      ["One script file: Player", "Everything player-related in one obvious place."],
    ],
    [
      ["What should the first player look like?", ["A placeholder shape", "A finished character", "An animated sprite sheet", "Nothing"], 0],
      ["What does the player need at this stage?", ["Body, collider, script", "Inventory and stats", "Voice acting", "A skill tree"], 0],
      ["Why build the player early?", ["It makes the project testable", "It looks nice", "It reduces file size", "It sells copies"], 0],
    ],
    "Add a placeholder player object with a collider and an empty script, then confirm it appears when you run the scene.",
  ),
  "implement player movement": L(
    [
      "Movement is where a game starts to feel like something. Read input, turn it into a direction, apply it every frame.",
      "Multiply movement by delta time so speed is the same on fast and slow machines.",
      "Tune it by feel: acceleration, top speed and stopping. Play it for thirty seconds after each tweak.",
    ],
    [
      ["direction = input_x", "Input becomes a direction, not a position."],
      ["position += direction * speed * delta", "Frame-rate independent movement."],
      ["Tune speed → play → tune again", "Feel is found by playing, not by maths."],
    ],
    [
      ["Why multiply by delta time?", ["So speed is frame-rate independent", "To slow the game", "To add gravity", "For collisions"], 0],
      ["What does input become?", ["A direction", "A texture", "A sound", "A menu"], 0],
      ["How do you tune movement?", ["Play it after each change", "Read documentation only", "Guess once", "Never change it"], 0],
    ],
    "Make the player move with keyboard or stick input using delta time, then tune the speed until it feels right.",
  ),
  "add collisions": L(
    [
      "Collision gives the world substance: floors stop falls, walls stop movement, triggers detect overlaps.",
      "Separate solid collision (physical blocking) from trigger areas (detect without blocking) — most bugs come from mixing them up.",
      "Keep collision shapes simple. A box or capsule is faster and more predictable than a detailed outline.",
    ],
    [
      ["Ground body + player collider", "The player stops falling."],
      ["Trigger area → on_enter(pickup)", "Detects overlap without blocking movement."],
      ["Box collider, not per-pixel outline", "Simpler shapes behave better."],
    ],
    [
      ["What does a trigger do?", ["Detects overlap without blocking", "Blocks movement", "Renders art", "Plays music"], 0],
      ["Why keep collision shapes simple?", ["Faster and more predictable", "It looks better", "It is required", "To save disk"], 0],
      ["What stops the player falling?", ["A solid body with a collider", "A trigger", "A sprite", "A menu"], 0],
    ],
    "Add a solid floor and one wall so the player is blocked, then add a trigger area that prints a message on overlap.",
  ),
  "add game mechanics": L(
    [
      "Mechanics are the rules that turn movement into a game: a goal, an obstacle, and a win or lose condition.",
      "Add one mechanic at a time and play the loop after each. If the loop is not fun with placeholders, more mechanics will not fix it.",
      "Every mechanic needs feedback the player can perceive — a number, a sound, a flash, a state change.",
    ],
    [
      ["Collect 10 coins → win", "Goal plus win condition."],
      ["Touch a hazard → lose a life", "Obstacle plus lose condition."],
      ["Score label updates on pickup", "Perceivable feedback for the rule."],
    ],
    [
      ["What turns movement into a game?", ["Goals, obstacles and win/lose rules", "Better art", "A logo", "A trailer"], 0],
      ["How many mechanics at a time?", ["One, then playtest", "All at once", "None", "Ten"], 0],
      ["What must every mechanic have?", ["Feedback the player can perceive", "A separate scene", "Voice acting", "A menu entry"], 0],
    ],
    "Implement one complete rule with a win or lose condition and visible feedback, then play the loop start to finish.",
  ),
  "add ui": L(
    [
      "UI tells the player what the rules are doing: score, health, timer, and the state they are in.",
      "Anchor UI elements to screen edges so they hold up at different window sizes, and keep it readable over busy backgrounds.",
      "Connect UI to game state through one update point rather than scattering label updates across your code.",
    ],
    [
      ["Score label, top-left, anchored", "Survives resolution changes."],
      ["Health bar reflecting a variable", "State made visible."],
      ["update_ui() called on state change", "One place to maintain."],
    ],
    [
      ["What is UI for?", ["Showing the player the game state", "Decorating the menu", "Raising the frame rate", "Storing saves"], 0],
      ["Why anchor UI elements?", ["They stay correct at other sizes", "They load faster", "It adds physics", "For audio"], 0],
      ["How should UI read game state?", ["Through one update point", "Scattered everywhere", "Randomly", "Not at all"], 0],
    ],
    "Add a score or health display anchored to the screen edge and update it from one function when the state changes.",
  ),
  "add sound": L(
    [
      "Sound is the cheapest way to make actions feel good. A jump with a sound feels twice as responsive as a silent one.",
      "Start with three or four effects tied to the player's main actions, then add music last.",
      "Keep volumes balanced and short effects short — harsh or long sounds get annoying within minutes of play.",
    ],
    [
      ["jump.wav · pickup.wav · hit.wav", "The essential first set."],
      ["Play on the action, not on a timer", "Sound must feel connected to input."],
      ["Music quieter than effects", "Effects carry the feedback."],
    ],
    [
      ["Why add sound early?", ["It makes actions feel responsive", "It reduces bugs", "It replaces UI", "It speeds loading"], 0],
      ["Which sounds come first?", ["The player's main actions", "Ambient music", "Voice acting", "The credits theme"], 0],
      ["How should effects and music be mixed?", ["Music quieter than effects", "Music loudest", "Both at maximum", "Silent"], 0],
    ],
    "Add three sound effects for your main player actions, then play the game and balance their volumes.",
  ),
  "add visual effects": L(
    [
      "Effects — often called juice — communicate impact: a small screen shake, a particle burst, a flash on hit.",
      "Keep them short and subtle. Effects should confirm what happened, not obscure it.",
      "Tie every effect to a game event you already implemented, so feedback and rules stay in sync.",
    ],
    [
      ["Particle burst on pickup", "Confirms the collection instantly."],
      ["0.1s screen shake on hit", "Short enough to feel, not to annoy."],
      ["White flash on damage", "Cheap, extremely readable feedback."],
    ],
    [
      ["What are visual effects for?", ["Communicating impact and feedback", "Hiding bugs", "Replacing UI", "Boosting FPS"], 0],
      ["How long should a screen shake be?", ["A fraction of a second", "Several seconds", "Permanent", "One minute"], 0],
      ["What should each effect be tied to?", ["An existing game event", "A random timer", "The menu", "Nothing"], 0],
    ],
    "Add one particle or flash effect to your most important action, then playtest that it reads clearly without distracting.",
  ),
  "add menus": L(
    [
      "Menus wrap the game into a product: a start screen, a pause option, and a way to restart or quit.",
      "Keep it to the essentials and make every button work before styling anything.",
      "Test the flow in a loop: start → play → lose → restart → quit. Any dead end there will be the first thing a player finds.",
    ],
    [
      ["Main menu: Play · Quit", "The minimum viable menu."],
      ["Pause: Resume · Restart", "Handles the most common player needs."],
      ["Game over → Restart", "Closes the loop instead of dead-ending."],
    ],
    [
      ["What must menus include?", ["Start, pause and restart/quit", "A shop", "A level editor", "Achievements"], 0],
      ["What comes before styling?", ["Every button working", "The colour palette", "Fonts", "Animations"], 0],
      ["What must you test?", ["The full start-to-restart loop", "Only the first screen", "Nothing", "The credits"], 0],
    ],
    "Add a start menu, a pause option and a restart path, then run the loop start → play → lose → restart → quit.",
  ),
  "test and publish the game": L(
    [
      "Testing is watching someone else play without helping them. Where they hesitate is where your game is unclear.",
      "Export a real build and run it on a clean machine — dev-only bugs like missing assets appear only there.",
      "Publishing needs a name, a short description, a few screenshots and a working download. Then you are done.",
    ],
    [
      ["Watch, do not explain", "Silence exposes unclear design."],
      ["Export build → run outside the editor", "Catches packaging bugs."],
      ["Title · description · 3 screenshots · build", "A complete store listing."],
    ],
    [
      ["What do you do while someone playtests?", ["Watch without helping", "Give instructions", "Take over", "Leave the room"], 0],
      ["Why test an exported build?", ["Packaging bugs only appear there", "It is faster", "The editor is broken", "No reason"], 0],
      ["What does a listing need?", ["Name, description, screenshots, build", "Only a name", "A trailer only", "A price only"], 0],
    ],
    "Export a build, have one person play it while you stay silent, fix the clearest issue, then publish the listing.",
  ),
};