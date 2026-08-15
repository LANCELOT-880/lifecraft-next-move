import type { Journey, JourneyCategory, Task } from "./types";

export interface LessonExample {
  text: string;
  meaning?: string;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface Lesson {
  /** Short beginner-friendly explanation, one paragraph per entry. */
  learn: string[];
  examples: LessonExample[];
  practice: PracticeQuestion[];
  /** Small completion exercise the learner does before finishing. */
  exercise: string;
}

const q = (id: string, question: string, options: string[], answerIndex: number): PracticeQuestion => ({
  id,
  question,
  options,
  answerIndex,
});

/** Lesson content keyed by task title (lowercased). Reusable across journeys. */
const lessonsByTitle: Record<string, Lesson> = {
  /* ---------- PROGRAMMING ---------- */
  "learn variables and data types": {
    learn: [
      "A variable is a named box that stores a value so your program can use it again later. You put something in the box once, then refer to it by name.",
      "Variables make code readable and changeable: update the value in one place and every use of that name follows.",
      "Most languages have a few core data types: text (string), whole numbers (int), decimals (float), true/false (boolean), and empty (None/null).",
    ],
    examples: [
      { text: 'name = "Sameer"', meaning: "A string — text wrapped in quotes." },
      { text: "age = 20", meaning: "An integer — a whole number." },
      { text: "height = 1.75", meaning: "A float — a decimal number." },
      { text: "is_student = True", meaning: "A boolean — either True or False." },
      { text: 'print("Hi " + name)', meaning: "Uses the stored value instead of repeating the text." },
    ],
    practice: [
      q("p1", "What does a variable store?", ["A value", "A monitor", "A keyboard", "A file"], 0),
      q("p2", 'What data type is "hello"?', ["Integer", "String", "Boolean", "Float"], 1),
      q("p3", "Which value is a boolean?", ["42", "3.14", "True", '"yes"'], 2),
    ],
    exercise:
      "Write three variables of your own: your name (string), your age (integer) and whether you are learning to code (boolean). Print a sentence that uses all three.",
  },
  "learn conditions": {
    learn: [
      "A condition lets your program choose between paths. It asks a yes/no question and runs code only when the answer is yes.",
      "if runs when the condition is true, elif checks another condition, else covers everything left over.",
      "Comparisons produce the true/false answer: == equal, != not equal, > greater, < less, >= and <=.",
    ],
    examples: [
      { text: "if score >= 50:\n    print(\"Pass\")", meaning: "Runs only when score is 50 or more." },
      { text: "else:\n    print(\"Fail\")", meaning: "Runs when the condition was false." },
      { text: "if age >= 18 and has_id:", meaning: "and requires both parts to be true." },
    ],
    practice: [
      q("p1", "What does a condition evaluate to?", ["True or False", "A string", "A loop", "A file"], 0),
      q("p2", "Which operator checks equality?", ["=", "==", "=>", "!"], 1),
      q("p3", "When does else run?", ["Always", "When the if condition is false", "Never", "Before the if"], 1),
    ],
    exercise:
      "Write a small check: if a number is greater than 10 print \"big\", otherwise print \"small\". Try it with 5 and with 25.",
  },
  "learn loops": {
    learn: [
      "A loop repeats work so you do not copy and paste the same lines. It is the difference between writing 5 lines and 500.",
      "A for loop repeats once per item in a collection or range. A while loop repeats as long as a condition stays true.",
      "Always make sure a while loop can end, or it runs forever.",
    ],
    examples: [
      { text: "for i in range(3):\n    print(i)", meaning: "Prints 0, 1, 2." },
      { text: 'for word in ["a", "b"]:\n    print(word)', meaning: "Runs once per item in the list." },
      { text: "count = 0\nwhile count < 3:\n    count = count + 1", meaning: "Repeats until the condition is false." },
    ],
    practice: [
      q("p1", "Why use a loop?", ["To repeat work", "To store a value", "To style text", "To open a file"], 0),
      q("p2", "How many times does range(4) loop?", ["3", "4", "5", "Forever"], 1),
      q("p3", "What ends a while loop?", ["Nothing", "Its condition becoming false", "A print", "A comment"], 1),
    ],
    exercise: "Use a loop to print the numbers 1 to 10, then change it to print only the even ones.",
  },
  "learn functions": {
    learn: [
      "A function is a named block of reusable code. You define it once, then call it whenever you need that behaviour.",
      "Parameters are the inputs; return sends a result back to whoever called the function.",
      "Small, well-named functions make programs easier to read, test and fix.",
    ],
    examples: [
      { text: "def greet(name):\n    return \"Hi \" + name", meaning: "Defines a function with one parameter." },
      { text: 'greet("Sameer")', meaning: 'Calls it — the result is "Hi Sameer".' },
      { text: "def add(a, b):\n    return a + b", meaning: "Two parameters, one returned value." },
    ],
    practice: [
      q("p1", "What does return do?", ["Sends a result back", "Prints forever", "Deletes code", "Starts a loop"], 0),
      q("p2", "What are function inputs called?", ["Loops", "Parameters", "Types", "Modules"], 1),
      q("p3", "Why write functions?", ["To reuse logic", "To slow code down", "To avoid variables", "To style output"], 0),
    ],
    exercise: "Write a function that takes two numbers and returns their average. Call it with 4 and 8.",
  },

  /* ---------- LANGUAGE ---------- */
  "learn the basic writing system or alphabet": {
    learn: [
      "Start with the sound system before vocabulary. If you can read the script out loud, every later word becomes easier to remember.",
      "Learn in small sets: five characters or letters at a time, written by hand, then read back the next day.",
      "German uses the Latin alphabet plus ä, ö, ü and ß. Japanese starts with Hiragana, a 46-character syllable script.",
    ],
    examples: [
      { text: "ä / ö / ü", meaning: "German umlauts — Mädchen (girl), schön (beautiful), müde (tired)." },
      { text: "ß", meaning: "Sharp s — Straße (street)." },
      { text: "あ い う え お", meaning: "Japanese Hiragana vowels: a, i, u, e, o." },
      { text: "か き く け こ", meaning: "ka, ki, ku, ke, ko — consonant + vowel pairs." },
    ],
    practice: [
      q("p1", "Why learn the writing system first?", ["It unlocks reading and pronunciation", "It is required by law", "It replaces grammar", "It is faster than speaking"], 0),
      q("p2", "What sound does あ make?", ["a", "ka", "sh", "n"], 0),
      q("p3", "What is ß in German?", ["A sharp s", "A silent letter", "A number", "A vowel"], 0),
    ],
    exercise: "Write out five characters or letters by hand three times each, saying the sound aloud as you write.",
  },
  "learn essential vocabulary": {
    learn: [
      "A few hundred common words cover most everyday conversation. Learn high-frequency words first, not rare ones.",
      "Learn words inside a short phrase so you also absorb how they are used.",
      "Review yesterday's words before adding new ones — recall beats rereading.",
    ],
    examples: [
      { text: "ja / nein", meaning: "German: yes / no." },
      { text: "Wasser", meaning: "German: water." },
      { text: "danke", meaning: "German: thank you." },
      { text: "みず (mizu)", meaning: "Japanese: water." },
      { text: "ありがとう (arigatou)", meaning: "Japanese: thank you." },
    ],
    practice: [
      q("p1", 'What does "danke" mean?', ["Thank you", "Goodbye", "Water", "Please"], 0),
      q("p2", 'What does "mizu" mean?', ["Fire", "Water", "Friend", "Yes"], 1),
      q("p3", "Which words should you learn first?", ["The most common ones", "The longest ones", "Rare literary words", "Only nouns"], 0),
    ],
    exercise: "Pick ten words you would use today. Write each in a two-word phrase and say it out loud.",
  },
  "learn basic greetings": {
    learn: [
      "Greetings are the fastest usable win in a new language — a whole exchange from four or five phrases.",
      "Note formality: most languages have a casual and a polite greeting. Use the polite one with strangers.",
    ],
    examples: [
      { text: "Hallo / Guten Tag", meaning: "German: hello / good day (polite)." },
      { text: "Wie geht es dir?", meaning: "German: how are you?" },
      { text: "こんにちは (konnichiwa)", meaning: "Japanese: hello / good afternoon." },
      { text: "はじめまして (hajimemashite)", meaning: "Japanese: nice to meet you." },
    ],
    practice: [
      q("p1", 'What does "Guten Tag" mean?', ["Good day", "Good night", "Thank you", "Sorry"], 0),
      q("p2", "When do you say konnichiwa?", ["During the day", "Only at midnight", "When leaving", "When apologising"], 0),
    ],
    exercise: "Practise a four-line greeting exchange out loud: greet, ask how they are, answer, say thank you.",
  },
  "learn simple sentence structure": {
    learn: [
      "Word order is the skeleton of a sentence. Learn the default pattern and you can slot new vocabulary into it forever.",
      "German main clauses are subject–verb–object, with the verb locked in second position. Japanese is subject–object–verb, with particles marking roles.",
    ],
    examples: [
      { text: "Ich trinke Wasser.", meaning: "German: I drink water (subject–verb–object)." },
      { text: "わたしは みずを のみます。", meaning: "Japanese: I water drink (subject–object–verb)." },
      { text: "は / を", meaning: "Japanese particles marking the topic and the object." },
    ],
    practice: [
      q("p1", "What is German main-clause order?", ["Subject–verb–object", "Verb–object–subject", "Object first always", "Random"], 0),
      q("p2", "Where does the verb go in Japanese?", ["At the end", "First", "Second", "It is omitted"], 0),
    ],
    exercise: "Write three sentences in the target language using the pattern: I + verb + object.",
  },
  "learn hiragana": {
    learn: [
      "Hiragana is the 46-character phonetic script used for Japanese grammar and native words. It is the correct first step.",
      "Every character is one syllable: a vowel, or a consonant plus vowel. Learn it in rows of five.",
    ],
    examples: [
      { text: "あ い う え お", meaning: "a, i, u, e, o." },
      { text: "か き く け こ", meaning: "ka, ki, ku, ke, ko." },
      { text: "さ し す せ そ", meaning: "sa, shi, su, se, so." },
      { text: "ねこ", meaning: "neko — cat." },
    ],
    practice: [
      q("p1", "How many basic Hiragana characters are there?", ["26", "46", "100", "12"], 1),
      q("p2", "What does each character represent?", ["A syllable", "A whole word", "A number", "A tone"], 0),
      q("p3", "Read ねこ.", ["neko", "kone", "nike", "kane"], 0),
    ],
    exercise: "Write the あ and か rows by hand twice, then read ねこ, いえ and かお aloud.",
  },
  "learn 100 essential words": {
    learn: [
      "The first hundred words carry an outsized share of daily speech. Drill them until recall is instant.",
      "Group by theme — people, food, places, time — so each word has hooks to the others.",
    ],
    examples: [
      { text: "ひと (hito)", meaning: "person." },
      { text: "いえ (ie)", meaning: "house." },
      { text: "たべる (taberu)", meaning: "to eat." },
      { text: "きょう (kyou)", meaning: "today." },
    ],
    practice: [
      q("p1", 'What does "taberu" mean?', ["To eat", "To sleep", "To run", "To read"], 0),
      q("p2", "Best way to review vocabulary?", ["Recall from memory", "Reread the list", "Copy it once", "Skip review"], 0),
    ],
    exercise: "Choose 10 of today's words and write one short sentence for each.",
  },
};

/** Category-level fallbacks so every task has usable instructional content. */
const lessonsByCategory: Record<JourneyCategory, Lesson> = {
  language: {
    learn: [
      "Work in short focused blocks: review yesterday, learn a small new set, then use it out loud.",
      "Comprehensible input plus active recall is what moves a language forward — reading and listening slightly above your level, then producing it yourself.",
    ],
    examples: [
      { text: "5 minutes review → 10 minutes new material → 5 minutes speaking", meaning: "A repeatable study block." },
      { text: "Say every new word aloud three times", meaning: "Links sound to meaning." },
    ],
    practice: [
      q("p1", "What makes vocabulary stick best?", ["Active recall", "Rereading", "Highlighting", "Listening once"], 0),
      q("p2", "How should a session end?", ["Producing the language yourself", "Closing the app", "Watching TV", "Nothing"], 0),
    ],
    exercise: "Do one 20-minute block now: review, learn, then speak or write five sentences.",
  },
  programming: {
    learn: [
      "Read a short explanation, then immediately type the code yourself — do not copy and paste.",
      "Break the task into the smallest runnable piece, run it, and only then add the next piece.",
    ],
    examples: [
      { text: "Write it → run it → break it → fix it", meaning: "The fastest learning loop in programming." },
      { text: "print() everywhere", meaning: "Printing values is the simplest way to see what your code is doing." },
    ],
    practice: [
      q("p1", "Best way to learn a coding concept?", ["Type and run it yourself", "Watch only", "Read only", "Skip it"], 0),
      q("p2", "What should you do when code breaks?", ["Read the error message", "Delete the file", "Restart the laptop", "Guess randomly"], 0),
    ],
    exercise: "Write the smallest possible program that demonstrates this task's concept, and run it.",
  },
  gamedev: {
    learn: [
      "Build the smallest playable version first. A cube that moves correctly beats a beautiful character that does not.",
      "Work in one vertical slice: one mechanic, one scene, one loop the player can actually complete.",
    ],
    examples: [
      { text: "Grey-box the level before art", meaning: "Prove the layout works with placeholder shapes." },
      { text: "Test after every change", meaning: "Play it yourself for 30 seconds after each edit." },
    ],
    practice: [
      q("p1", "What should you build first?", ["The smallest playable version", "The main menu", "The store page", "The soundtrack"], 0),
      q("p2", "When should art come in?", ["After the mechanic works", "Before anything else", "Never", "Only at launch"], 0),
    ],
    exercise: "Open the project and make one change for this task, then play it for 30 seconds to confirm it works.",
  },
  fitness: {
    learn: [
      "Consistency outranks intensity. A repeatable session you actually do beats a perfect plan you skip.",
      "Track what you did — sets, reps or minutes — so progression is visible instead of guessed at.",
    ],
    examples: [
      { text: "Warm up 5 min → main work 20 min → cool down 5 min", meaning: "A simple reliable session shape." },
      { text: "Add a little each week", meaning: "Small increases in load or time drive progress." },
    ],
    practice: [
      q("p1", "What matters most early on?", ["Consistency", "Maximum weight", "Long sessions", "Supplements"], 0),
      q("p2", "Why track workouts?", ["To see real progression", "To fill time", "To impress others", "No reason"], 0),
    ],
    exercise: "Complete one session for this task and write down what you did, including time or reps.",
  },
  general: {
    learn: [
      "Make the task concrete: define what finished looks like before you start, so you know when to stop.",
      "Do one focused block with no switching. Reviewing the result afterwards is part of the work.",
    ],
    examples: [
      { text: "Define done → do one block → review", meaning: "A reusable structure for any skill." },
      { text: "One clear output per session", meaning: "Something you can point at afterwards." },
    ],
    practice: [
      q("p1", "What should you decide before starting?", ["What finished looks like", "Nothing", "Your reward", "The music"], 0),
      q("p2", "What follows a focused block?", ["Reviewing the result", "Another unrelated task", "Nothing at all", "Restarting"], 0),
    ],
    exercise: "Spend one focused block on this task, then write two lines on what you produced and what is next.",
  },
};

export function getLesson(task: Task, journey: Journey): { lesson: Lesson; isTailored: boolean } {
  const tailored = lessonsByTitle[task.title.trim().toLowerCase()];
  if (tailored) return { lesson: tailored, isTailored: true };
  return { lesson: lessonsByCategory[journey.category], isTailored: false };
}
