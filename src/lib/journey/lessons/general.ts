import { L, type LessonsByTitle } from "./types";

export const generalLessons: LessonsByTitle = {
  "define the goal clearly": L(
    [
      "A clear goal names the outcome, the evidence and the deadline. Without evidence you can never tell whether you arrived.",
      "Replace adjectives with observable results: not 'get better at writing' but 'publish four short articles'.",
      "Write the goal in one sentence you could read to someone else without explaining it.",
    ],
    [
      ['"Publish four articles by 30 June"', "Outcome, evidence and deadline in one line."],
      ['"Get better at writing"', "No evidence, no deadline — not yet a goal."],
      ["Evidence: the thing you can point at", "How you know you are done."],
    ],
    [
      ["What must a clear goal include?", ["Outcome, evidence and deadline", "Only enthusiasm", "A long plan", "A budget"], 0],
      ["What replaces vague adjectives?", ["Observable results", "Stronger adjectives", "More words", "Nothing"], 0],
      ["How long should the goal statement be?", ["One sentence", "Three pages", "A list of 20 items", "Undefined"], 0],
    ],
    "Write your goal as one sentence containing the outcome, the evidence you will point at, and a date.",
  ),
  "learn the fundamentals": L(
    [
      "Every skill has a small core that explains most of it. Finding that core is faster than consuming everything about the topic.",
      "Pick one good source and finish it before collecting more. Switching sources feels productive and teaches little.",
      "Summarise what you learn in your own words — if you cannot explain it simply, you have not learned it yet.",
    ],
    [
      ["One book or course, finished", "Depth beats a bookmark folder."],
      ["Write a one-page summary from memory", "Recall reveals the gaps."],
      ["Explain it to someone in five minutes", "The real comprehension test."],
    ],
    [
      ["What should you look for first?", ["The small core that explains most", "Every advanced detail", "The newest trend", "Nothing"], 0],
      ["How many sources to start?", ["One, finished", "Ten at once", "Zero", "As many as possible"], 0],
      ["How do you check understanding?", ["Explain it simply from memory", "Reread it", "Highlight it", "Save it for later"], 0],
    ],
    "Finish one section of a single source, then write a one-page summary from memory without looking back.",
  ),
  "identify the first milestone": L(
    [
      "A milestone is the first point where progress becomes visible to someone other than you.",
      "Make it small enough to reach in a week or two, and concrete enough that finishing is not a judgement call.",
      "Write the two or three steps that lead to it. That short list becomes your plan.",
    ],
    [
      ['"First article drafted"', "Visible, small, unambiguous."],
      ["Reachable in 1-2 weeks", "Close enough to keep momentum."],
      ["Steps: outline → draft → edit", "The milestone broken into moves."],
    ],
    [
      ["What makes a good milestone?", ["Small, concrete and visible", "Large and vague", "Secret", "Years away"], 0],
      ["How soon should it be reachable?", ["A week or two", "A year", "A decade", "Never"], 0],
      ["What should accompany it?", ["Two or three concrete steps", "A long manifesto", "Nothing", "A budget"], 0],
    ],
    "Define your first milestone in one line and list the two or three steps that get you there.",
  ),
  "complete the first practical task": L(
    [
      "The first practical task exists to break the gap between reading and doing. It should be small enough to finish in one sitting.",
      "Expect it to be rough. A finished rough attempt teaches more than a perfect plan.",
      "Note what was harder than expected — that note is where your next study session should aim.",
    ],
    [
      ["One sitting, one output", "Finishable by design."],
      ["Rough is fine, finished is required", "Completion is the lesson."],
      ['"Harder than expected: ___"', "Turns the attempt into direction."],
    ],
    [
      ["What is the first practical task for?", ["Turning reading into doing", "Perfecting the result", "Impressing others", "Avoiding practice"], 0],
      ["How good should the result be?", ["Rough but finished", "Flawless", "Unstarted", "Hidden"], 0],
      ["What do you record afterwards?", ["What was harder than expected", "Nothing", "Only praise", "The date only"], 0],
    ],
    "Do the smallest real version of your skill in one sitting, finish it, and note what was harder than expected.",
  ),
  "practice the core skill": L(
    [
      "Practice is repetition with attention. Repeating on autopilot maintains ability; repeating with a focus improves it.",
      "Work in short focused blocks on one specific aspect, and get feedback quickly — from a result, a person, or a recording.",
      "Deliberately practise the part you are worst at. Comfortable practice mostly rehearses what you can already do.",
    ],
    [
      ["25 minutes, one aspect, no switching", "A focused practice block."],
      ["Feedback within the same session", "Fast correction, faster learning."],
      ["Train the weakest part first", "Where improvement is available."],
    ],
    [
      ["What makes practice effective?", ["Attention on one specific aspect", "Sheer volume", "Background repetition", "Watching others"], 0],
      ["How quickly should feedback arrive?", ["Within the session", "Months later", "Never", "Only at the end"], 0],
      ["Which part should you practise?", ["The weakest part", "The most comfortable part", "None", "Random parts"], 0],
    ],
    "Do one 25-minute focused block on your weakest aspect and get feedback on the result before you finish.",
  ),
  "review progress": L(
    [
      "Reviewing converts activity into information. Without it, weeks of effort blur into a feeling instead of a fact.",
      "Compare where you are against the milestone you wrote, not against how you feel today.",
      "Finish the review with one decision: continue, adjust, or drop something.",
    ],
    [
      ["Milestone vs actual output", "The only honest comparison."],
      ["Two lines: what worked, what did not", "Enough detail to act on."],
      ["One decision per review", "Keeps reviews useful."],
    ],
    [
      ["What does a review produce?", ["Information you can act on", "Extra work", "A feeling", "Nothing"], 0],
      ["What do you compare against?", ["The milestone you wrote", "Your mood", "Other people", "Nothing"], 0],
      ["How should a review end?", ["With one decision", "With no decision", "With a new goal", "With quitting"], 0],
    ],
    "Compare your output against your milestone, write what worked and what did not, and make one decision for the next week.",
  ),
  "complete a small real-world project": L(
    [
      "A real project is the point where practice becomes proof: something used, read, seen or shipped outside your notes.",
      "Choose the smallest project that still counts as real, and decide up front what finished means.",
      "Ship it before it feels ready. Feedback on a finished small thing beats polish on an unfinished big one.",
    ],
    [
      ["One real output with a real audience", "Even an audience of one."],
      ['"Done means: published and readable"', "Defined before starting."],
      ["Ship, then improve", "Feedback needs something to exist."],
    ],
    [
      ["What makes a project real?", ["It exists outside your practice notes", "It is long", "It is private", "It is perfect"], 0],
      ["What should you decide first?", ["What finished means", "The sequel", "Your reward", "Nothing"], 0],
      ["When should you ship?", ["Before it feels perfect", "Only when flawless", "Never", "After a year"], 0],
    ],
    "Pick the smallest real project you can finish this week, define what done means, and complete it.",
  ),
  "review the result": L(
    [
      "Reviewing the result is separate from reviewing your effort. Look at what you produced as if someone else made it.",
      "Ask three questions: what worked, what failed, and what you would change if you did it again tomorrow.",
      "Gather one piece of outside feedback. Your own view of your work always has blind spots.",
    ],
    [
      ["Worked · failed · would change", "Three questions, honest answers."],
      ["Ask one person for one specific comment", "Targeted feedback is actionable."],
      ["Judge the output, not your effort", "Effort is not evidence."],
    ],
    [
      ["How should you look at the result?", ["As if someone else produced it", "Only with pride", "Not at all", "As unfinished"], 0],
      ["Which questions do you ask?", ["What worked, failed and would change", "Only what worked", "Only what failed", "None"], 0],
      ["Why get outside feedback?", ["Your own view has blind spots", "It is polite", "It is required", "To delay work"], 0],
    ],
    "Write what worked, what failed and what you would change, then get one specific comment from another person.",
  ),
  "identify the next level": L(
    [
      "Once a level is solid, the next goal should be one clear step harder — not a bigger version of the same thing.",
      "Choose based on the gap your review exposed: the skill that limited the last result is the natural next target.",
      "Write the next goal in the same clear form as the first: outcome, evidence, deadline.",
    ],
    [
      ["Article → article with research and edits", "One clear step up, same domain."],
      ["Next target = last limiting factor", "Chosen from evidence, not mood."],
      ["Outcome · evidence · deadline", "Reuse the format that worked."],
    ],
    [
      ["What should the next level be?", ["One clear step harder", "Ten times bigger", "Identical", "Unrelated"], 0],
      ["How do you choose it?", ["From the gap your review exposed", "At random", "From trends", "Never"], 0],
      ["How should it be written?", ["Outcome, evidence and deadline", "As a vague wish", "As a list of 30 items", "Not at all"], 0],
    ],
    "Write your next goal in one sentence with outcome, evidence and a date, based on the gap your review exposed.",
  ),
};