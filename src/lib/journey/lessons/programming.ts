import { L, type LessonsByTitle } from "./types";

export const programmingLessons: LessonsByTitle = {
  "learn variables and data types": L(
    [
      "A variable is a named box that stores a value so your program can use it again later. You put something in the box once, then refer to it by name.",
      "Update the value in one place and every use of that name follows — that is what makes code readable and changeable.",
      "Core data types: text (string), whole numbers (int), decimals (float), true/false (boolean), and empty (None/null).",
    ],
    [
      ['name = "Sameer"', "A string — text wrapped in quotes."],
      ["age = 20", "An integer — a whole number."],
      ["height = 1.75", "A float — a decimal number."],
      ["is_student = True", "A boolean — either True or False."],
    ],
    [
      ["What does a variable store?", ["A value", "A monitor", "A keyboard", "A file"], 0],
      ['What data type is "hello"?', ["Integer", "String", "Boolean", "Float"], 1],
      ["Which value is a boolean?", ["42", "3.14", "True", '"yes"'], 2],
    ],
    "Write three variables: your name (string), your age (integer) and whether you are learning to code (boolean). Print a sentence using all three.",
  ),
  "learn conditions": L(
    [
      "A condition lets your program choose between paths. It asks a yes/no question and runs code only when the answer is yes.",
      "if runs when the condition is true, elif checks another condition, else covers everything left over.",
      "Comparisons produce that true/false answer: == equal, != not equal, > greater, < less, >= and <=.",
    ],
    [
      ['if score >= 50:\n    print("Pass")', "Runs only when score is 50 or more."],
      ['else:\n    print("Fail")', "Runs when the condition was false."],
      ["if age >= 18 and has_id:", "and requires both parts to be true."],
    ],
    [
      ["What does a condition evaluate to?", ["True or False", "A string", "A loop", "A file"], 0],
      ["Which operator checks equality?", ["=", "==", "=>", "!"], 1],
      ["When does else run?", ["Always", "When the if condition is false", "Never", "Before the if"], 1],
    ],
    'Write a check: if a number is greater than 10 print "big", otherwise print "small". Try it with 5 and with 25.',
  ),
  "learn loops": L(
    [
      "A loop repeats work so you do not copy and paste the same lines. It is the difference between writing 5 lines and 500.",
      "A for loop repeats once per item in a collection or range. A while loop repeats as long as a condition stays true.",
      "Always make sure a while loop can end, or it runs forever.",
    ],
    [
      ["for i in range(3):\n    print(i)", "Prints 0, 1, 2."],
      ['for word in ["a", "b"]:\n    print(word)', "Runs once per item in the list."],
      ["count = 0\nwhile count < 3:\n    count = count + 1", "Repeats until the condition is false."],
    ],
    [
      ["Why use a loop?", ["To repeat work", "To store a value", "To style text", "To open a file"], 0],
      ["How many times does range(4) loop?", ["3", "4", "5", "Forever"], 1],
      ["What ends a while loop?", ["Nothing", "Its condition becoming false", "A print", "A comment"], 1],
    ],
    "Use a loop to print the numbers 1 to 10, then change it to print only the even ones.",
  ),
  "learn functions": L(
    [
      "A function is a named block of reusable code. Define it once, then call it whenever you need that behaviour.",
      "Parameters are the inputs; return sends a result back to whoever called the function.",
      "Small, well-named functions make programs easier to read, test and fix.",
    ],
    [
      ['def greet(name):\n    return "Hi " + name', "Defines a function with one parameter."],
      ['greet("Sameer")', 'Calls it — the result is "Hi Sameer".'],
      ["def add(a, b):\n    return a + b", "Two parameters, one returned value."],
    ],
    [
      ["What does return do?", ["Sends a result back", "Prints forever", "Deletes code", "Starts a loop"], 0],
      ["What are function inputs called?", ["Loops", "Parameters", "Types", "Modules"], 1],
      ["Why write functions?", ["To reuse logic", "To slow code down", "To avoid variables", "To style output"], 0],
    ],
    "Write a function that takes two numbers and returns their average. Call it with 4 and 8.",
  ),
  "learn arrays and collections": L(
    [
      "A collection holds many values under one name. A list (array) keeps them in order and lets you reach any item by its position.",
      "Indexes start at 0, so the first item is [0]. len() tells you how many items there are.",
      "A dictionary/map stores pairs instead of positions: you look a value up by its key.",
    ],
    [
      ['fruits = ["apple", "pear", "fig"]', "A list of three strings."],
      ["fruits[0]", 'The first item — "apple".'],
      ["fruits.append(\"plum\")", "Adds an item to the end."],
      ['ages = {"sam": 20}\nages["sam"]', "A dictionary looked up by key."],
    ],
    [
      ["What index is the first list item?", ["0", "1", "-1", "It has none"], 0],
      ["What does len(list) return?", ["The item count", "The last item", "A sorted copy", "True"], 0],
      ["How do you read a dictionary value?", ["By key", "By colour", "By length", "By index only"], 0],
    ],
    "Build a list of five things you did today, print the third one, then add a sixth and print the length.",
  ),
  "learn objects/classes": L(
    [
      "A class is a blueprint that bundles data and the behaviour that belongs to it. An object is one thing built from that blueprint.",
      "Attributes are what the object knows; methods are what it can do. The constructor sets up a new object.",
      "Classes shine when you have many similar things — every player, invoice or enemy shares the same shape.",
    ],
    [
      ["class Dog:\n    def __init__(self, name):\n        self.name = name", "A class with a constructor and one attribute."],
      ["    def speak(self):\n        return self.name + \" barks\"", "A method — behaviour that uses the object's own data."],
      ['d = Dog("Rex")\nd.speak()', "Creates an object and calls its method."],
    ],
    [
      ["What is an object?", ["One instance of a class", "A loop", "A file type", "A comment"], 0],
      ["What is a method?", ["A function on a class", "A variable name", "An error", "A data type"], 0],
      ["What does the constructor do?", ["Sets up a new object", "Deletes an object", "Prints the class", "Sorts data"], 0],
    ],
    "Write a class for something in your project with two attributes and one method, then create two objects from it.",
  ),
  "work with files": L(
    [
      "Files let your program keep data after it stops running. You open a file, read or write it, then close it.",
      "Most languages give you a safe block (with/using/try-finally) that closes the file for you even if something fails.",
      "Read modes and write modes matter: writing in 'w' replaces the file, 'a' appends to it.",
    ],
    [
      ['with open("notes.txt", "w") as f:\n    f.write("hello")', "Creates or replaces the file and writes a line."],
      ['with open("notes.txt") as f:\n    text = f.read()', "Reads the whole file into a string."],
      ['open("log.txt", "a")', "Append mode — keeps what was already there."],
    ],
    [
      ["Why write to a file?", ["To keep data after the program ends", "To speed up loops", "To style output", "To hide bugs"], 0],
      ['What does mode "w" do?', ["Replaces the file contents", "Appends", "Reads only", "Deletes the disk"], 0],
      ["Why use a with/using block?", ["It closes the file for you", "It sorts lines", "It encrypts data", "It prints faster"], 0],
    ],
    "Write a short program that saves three lines to a file, then reads the file back and prints each line.",
  ),
  "debug programs": L(
    [
      "Debugging is a search, not a guess. Read the error message first: it names the file, the line and the kind of failure.",
      "Shrink the problem. Comment out code or print values until you find the smallest case that still breaks.",
      "Check your assumptions by printing the actual values — bugs usually live where reality differs from what you expected.",
    ],
    [
      ["Traceback ... line 12, in add\nTypeError: unsupported operand", "The message points straight at the line and the cause."],
      ["print(type(value), value)", "Shows what the variable really holds."],
      ["Comment out half the code", "Binary-search the failure to the smallest region."],
    ],
    [
      ["What do you read first?", ["The error message", "The last commit", "The README", "The changelog"], 0],
      ["Why print values while debugging?", ["To check assumptions", "To slow the program", "To format output", "To remove types"], 0],
      ["What is a good next step after finding the line?", ["Reproduce it in a smaller case", "Rewrite everything", "Ignore it", "Delete the file"], 0],
    ],
    "Deliberately break one line in your code, read the error, then fix it using only the message and printed values.",
  ),
  "build a small project": L(
    [
      "A project is where separate concepts finally connect. Pick something tiny with a clear finished state — a to-do list, a quiz, a converter.",
      "Write the smallest working version first, then add one feature at a time, running it after each step.",
      "Keep a short list of what is done and what is next so you never lose your place.",
    ],
    [
      ["Version 1: input → calculate → print", "The smallest end-to-end program that works."],
      ["Then: save results to a file", "One feature added on top of a working base."],
      ["Run after every change", "Bugs stay small when you catch them immediately."],
    ],
    [
      ["What should version 1 be?", ["The smallest thing that works end to end", "Everything at once", "Only the UI", "Only tests"], 0],
      ["How should features be added?", ["One at a time, running each", "All before running", "Randomly", "Never"], 0],
      ["What makes a good first project?", ["A clear finished state", "No defined goal", "A huge scope", "Someone else's code"], 0],
    ],
    "Choose a project you can finish in one sitting, write version 1 end to end, and run it.",
  ),
  "refactor the project": L(
    [
      "Refactoring improves the shape of working code without changing what it does. You do it once the behaviour is already correct.",
      "Look for repetition, long functions and unclear names — those three cover most cleanup you will ever need.",
      "Change one thing, run the program, confirm it still behaves the same. Never refactor and add features in the same step.",
    ],
    [
      ["Repeated block → one function", "Removes duplication."],
      ["x → total_price", "A clearer name replaces a comment."],
      ["40-line function → three small ones", "Each piece becomes testable."],
    ],
    [
      ["What does refactoring change?", ["The structure, not the behaviour", "The behaviour", "The language", "The output only"], 0],
      ["When should you refactor?", ["After it works correctly", "Before it runs at all", "Never", "Only at launch"], 0],
      ["What is the top smell to fix?", ["Duplication", "Short names on loops", "Blank lines", "Comments"], 0],
    ],
    "Find one repeated block in your project, extract it into a well-named function, and confirm the program still behaves identically.",
  ),
  "fix bugs": L(
    [
      "Fixing a bug has four steps: reproduce it reliably, find the cause, change the smallest amount of code, then verify.",
      "Reproduce first. A bug you cannot trigger on demand cannot be confirmed fixed.",
      "After the fix, re-run the case that failed and one nearby case, so you know you did not break something next door.",
    ],
    [
      ["Steps to reproduce: 1, 2, 3 → wrong result", "Write it down before touching code."],
      ["One-line change, not a rewrite", "Small fixes are easy to review and revert."],
      ["Re-run the failing case + a neighbour", "Confirms the fix and guards the surroundings."],
    ],
    [
      ["What comes first?", ["Reproducing the bug", "Rewriting the module", "Renaming files", "Publishing"], 0],
      ["How big should a fix be?", ["The smallest change that works", "As large as possible", "A full rewrite", "Zero lines"], 0],
      ["What proves it is fixed?", ["Re-running the failing case", "Hope", "Deleting the test", "A comment"], 0],
    ],
    "Pick one bug in your project, write down the steps to reproduce it, fix it, then re-run those steps.",
  ),
  "publish the project": L(
    [
      "Publishing turns practice into something you can show. It also forces the last 10% — a README, a working run command and no crashes on a clean machine.",
      "Write setup instructions as if you had never seen the project: install, run, expected output.",
      "Put it somewhere public with a clear name and description, then check the instructions by following them yourself.",
    ],
    [
      ["README: what it is, how to run it, one screenshot", "The minimum a reader needs."],
      ["Remove secrets and dead files", "Ship only what the project needs."],
      ["Clone it fresh and follow your own steps", "The only real test of your instructions."],
    ],
    [
      ["What must a README answer?", ["What it is and how to run it", "Your favourite colour", "Nothing", "The full source"], 0],
      ["What should never be published?", ["Secrets and keys", "The README", "Screenshots", "Licences"], 0],
      ["How do you verify setup steps?", ["Follow them on a clean copy", "Assume they work", "Ask nobody", "Delete them"], 0],
    ],
    "Write a README with install and run steps, publish the project, then follow your own instructions from a fresh copy.",
  ),
};