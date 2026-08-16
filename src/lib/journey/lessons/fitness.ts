import { L, type LessonsByTitle } from "./types";

export const fitnessLessons: LessonsByTitle = {
  "establish a consistent routine": L(
    [
      "Consistency beats intensity. Three sessions you actually complete each week outperform a perfect plan you abandon.",
      "Anchor training to a fixed time and place so the decision is already made before you feel like deciding.",
      "Make the minimum version tiny — a session you can do tired is a session you will not skip.",
    ],
    [
      ["Mon / Wed / Fri, 7pm, same place", "A schedule that removes daily decisions."],
      ["Minimum session: 15 minutes", "The version you do on bad days."],
      ["Bag packed the night before", "Removes friction before it appears."],
    ],
    [
      ["What matters most at the start?", ["Consistency", "Maximum weight", "Long sessions", "Supplements"], 0],
      ["Why fix a time and place?", ["It removes the daily decision", "It burns more calories", "Gyms require it", "It builds muscle directly"], 0],
      ["What is a minimum session for?", ["Days when you are tired", "Competition", "Testing maxes", "Showing off"], 0],
    ],
    "Write your weekly schedule with fixed days and times, and define a 15-minute minimum version of each session.",
  ),
  "learn basic movement patterns": L(
    [
      "Almost all training is built from a few patterns: squat, hinge, push, pull, carry and a core brace.",
      "Learn each pattern with light or bodyweight load first. Technique learned badly has to be unlearned later.",
      "Film one set from the side. You will see more in ten seconds of video than in ten minutes of guessing.",
    ],
    [
      ["Squat · hinge · push · pull · carry", "The pattern menu behind most exercises."],
      ["Bodyweight squat before loaded squat", "Load comes after the shape is right."],
      ["Film from the side", "The cheapest form check available."],
    ],
    [
      ["How many core patterns cover most training?", ["Around five or six", "Fifty", "One", "None"], 0],
      ["What load should you learn with?", ["Light or bodyweight", "Your maximum", "As heavy as possible", "Machines only"], 0],
      ["What is a simple form check?", ["Filming a set from the side", "Asking nobody", "Guessing", "Skipping it"], 0],
    ],
    "Practise each pattern for two light sets, film one of them, and note the single thing you want to correct.",
  ),
  "set realistic training targets": L(
    [
      "A useful target is specific, measurable and close enough to reach in weeks — not a vague wish about someday.",
      "Set process targets (sessions per week) alongside outcome targets (a weight, a time, a rep count). Process targets are the ones you control.",
      "Write the target down with a date so progress can actually be checked instead of felt.",
    ],
    [
      ['"3 sessions per week for 6 weeks"', "A process target you fully control."],
      ['"10 push-ups in one set by 30 April"', "Specific, measurable, dated."],
      ['"Get fit"', "Not a target — nothing to check."],
    ],
    [
      ["What makes a target useful?", ["Specific, measurable and dated", "Vague and inspiring", "Secret", "Impossible"], 0],
      ["Which target do you control most?", ["Sessions completed per week", "Bodyweight this week", "Genetics", "Others' progress"], 0],
      ["Why write it down?", ["So progress can be checked", "To decorate", "To forget it", "No reason"], 0],
    ],
    "Write one process target and one outcome target with a date, and put both somewhere you will see weekly.",
  ),
  "track workouts": L(
    [
      "If it is not written down it did not happen. A log turns guesswork into evidence you can act on.",
      "Record the minimum: date, exercise, sets, reps or minutes, and how hard it felt.",
      "Read the last entry before you train — that is how the log actually drives progression.",
    ],
    [
      ["12/03 · squat · 3×8 · felt 7/10", "One complete log line."],
      ["Notes app or paper is enough", "The tool matters far less than the habit."],
      ["Read last session first", "Turns the log into a plan."],
    ],
    [
      ["Why track workouts?", ["To see real progression", "To fill time", "To impress others", "No reason"], 0],
      ["What is the minimum to record?", ["Exercise, sets, reps and effort", "Only the date", "Only your mood", "Nothing"], 0],
      ["When should you read the log?", ["Before the next session", "Never", "Only yearly", "After quitting"], 0],
    ],
    "Log today's session with sets, reps or minutes and an effort rating, then read it back before your next session.",
  ),
  "increase training consistency": L(
    [
      "Consistency is an engineering problem, not a willpower problem. Find the specific reason sessions get missed and remove it.",
      "Common fixes: earlier sessions, a closer place to train, shorter workouts, or training with someone.",
      "Never miss twice. One missed session is noise; two in a row is how habits die.",
    ],
    [
      ["Missed because of evening plans → train mornings", "Fix the cause, not the motivation."],
      ["Never miss twice", "The single most useful consistency rule."],
      ["Shorter session > skipped session", "Something always beats nothing."],
    ],
    [
      ["How should missed sessions be treated?", ["As a problem to diagnose", "As a moral failure", "As inevitable", "Ignored"], 0],
      ["What is the never-miss-twice rule?", ["Never skip two sessions in a row", "Never train twice", "Always double up", "Train daily"], 0],
      ["What beats skipping?", ["A shorter session", "Nothing at all", "Extra rest weeks", "Quitting"], 0],
    ],
    "Identify the exact reason you missed sessions recently, change one thing about your schedule, and apply the never-miss-twice rule this week.",
  ),
  "improve technique": L(
    [
      "Technique is what lets load increase safely. Better positions mean more of the work reaches the muscles you are training.",
      "Fix one cue at a time — bracing, depth, bar path or tempo. Chasing everything at once fixes nothing.",
      "Drop the load while you rebuild a movement. Temporarily lighter is how you get permanently stronger.",
    ],
    [
      ["One cue per session", "Focused practice actually changes movement."],
      ["Slow the tempo down", "Control exposes and fixes weak positions."],
      ["Reduce load 20% during a rebuild", "Short-term cost, long-term gain."],
    ],
    [
      ["Why does technique matter?", ["It lets load increase safely", "It looks stylish", "It shortens sessions", "It replaces effort"], 0],
      ["How many cues at a time?", ["One", "All of them", "None", "Ten"], 0],
      ["What helps while rebuilding a lift?", ["Lower load and slower tempo", "Maximum weight", "Skipping warm-ups", "More sets only"], 0],
    ],
    "Pick one exercise and one cue, do three lighter sets focused only on that cue, and film the last set.",
  ),
  "track progression": L(
    [
      "Progression means the training is getting harder over time in some measurable way: more weight, more reps, more sets, or better control.",
      "Compare against your log, not against how you feel today. Feelings fluctuate; numbers do not.",
      "Progress a single variable at a time so you know what caused the change.",
    ],
    [
      ["3×8 → 3×9 at the same weight", "Reps as the progression variable."],
      ["Same reps, +2.5kg", "Load as the progression variable."],
      ["Same numbers, cleaner reps", "Quality counts as progress too."],
    ],
    [
      ["What does progression mean?", ["Training gets measurably harder over time", "Training feels easier", "Nothing changes", "You train daily"], 0],
      ["What should you compare against?", ["Your log", "Your mood", "Someone else's numbers", "Nothing"], 0],
      ["How many variables at once?", ["One", "All", "Zero", "Three"], 0],
    ],
    "Compare this week's key session with the same session two weeks ago and write down which variable improved.",
  ),
  "adjust workload": L(
    [
      "Workload is the total amount of work you do. Too little stalls progress, too much causes fatigue and missed sessions.",
      "Read the signals: sleep, soreness that lingers, dropping performance and dread before training all mean back off.",
      "Change workload in small steps, then hold it for two weeks before judging the result.",
    ],
    [
      ["Performance dropping 2 weeks running → reduce volume", "A clear signal to back off."],
      ["Add one set, not four", "Small changes are readable."],
      ["A lighter week every 4-6 weeks", "Planned recovery keeps progress going."],
    ],
    [
      ["What does too much workload cause?", ["Fatigue and missed sessions", "Faster progress always", "Nothing", "Better sleep"], 0],
      ["What is a signal to back off?", ["Performance dropping over weeks", "One tough session", "A good night's sleep", "A new playlist"], 0],
      ["How long before judging a change?", ["About two weeks", "One session", "One year", "Never"], 0],
    ],
    "Review the past two weeks, decide to add or remove one set per session, and hold that change for two weeks.",
  ),
  "review progress": L(
    [
      "A review turns scattered sessions into a decision. Look at the log, not at the mirror, and ask what actually changed.",
      "Check three things: sessions completed, performance trend, and how you felt across the block.",
      "End every review with one concrete change for the next block — reviews without decisions are just reading.",
    ],
    [
      ["Sessions planned 12 · completed 10", "Consistency measured, not guessed."],
      ["Main lift 3×8 → 3×10", "A performance trend you can see."],
      ['"Next block: add one session"', "The decision that makes the review useful."],
    ],
    [
      ["What should a review be based on?", ["Your training log", "How you look today", "Guesswork", "Others' opinions"], 0],
      ["Which three things do you check?", ["Sessions, performance, how you felt", "Only weight lifted", "Only bodyweight", "Nothing"], 0],
      ["How should a review end?", ["With one concrete change", "With no decision", "With quitting", "With a new sport"], 0],
    ],
    "Review your last four weeks of logs and write down completed sessions, one performance trend and one change for next block.",
  ),
  "identify weaknesses": L(
    [
      "A weakness is the specific thing that limits you: a sticking point in a lift, a lagging movement, poor mobility, or low work capacity.",
      "Find it from evidence — where reps fail, which pattern lags behind the others, what you avoid training.",
      "Whatever you avoid is usually the thing worth training. Avoidance is a diagnosis.",
    ],
    [
      ["Reps fail out of the bottom position", "A specific sticking point, not a vague weakness."],
      ["Pull strength far behind push strength", "An imbalance visible in the log."],
      ["The session you always skip", "The strongest hint you have."],
    ],
    [
      ["What is a weakness?", ["The specific thing limiting you", "Any exercise you dislike", "A body part shape", "A supplement gap"], 0],
      ["Where do you find it?", ["In your log and where reps fail", "In social media", "By guessing", "Nowhere"], 0],
      ["What does avoidance usually mean?", ["It is worth training", "It is unnecessary", "It is dangerous", "Nothing"], 0],
    ],
    "Look through your log, name one specific weakness with the evidence for it, and pick one exercise that targets it.",
  ),
  "refine the routine": L(
    [
      "Refining means keeping what works and replacing what does not. The routine should fit your week, your equipment and your target.",
      "Change one or two things per block: swap an exercise, reorder the session, adjust set counts to address your weakness.",
      "Protect the parts that are working. Novelty for its own sake resets progress.",
    ],
    [
      ["Swap one exercise for a weakness-focused one", "Targeted change, stable routine."],
      ["Move the priority lift first in the session", "Best effort goes to what matters most."],
      ["Keep the schedule that you actually attend", "Do not fix what is not broken."],
    ],
    [
      ["What does refining mean?", ["Keep what works, replace what does not", "Change everything", "Change nothing", "Train less"], 0],
      ["How many changes per block?", ["One or two", "Every exercise", "None ever", "Ten"], 0],
      ["What should stay?", ["The parts that are working", "Nothing", "Only new exercises", "Only cardio"], 0],
    ],
    "Rewrite your routine with one targeted change that addresses your weakness, keeping everything that already works.",
  ),
  "maintain consistency": L(
    [
      "Long-term progress is mostly about not stopping. Plan for busy weeks instead of pretending they will not come.",
      "Have a maintenance version of your routine — two short sessions a week is enough to hold what you built.",
      "Restarting is normal. Drop the load, keep the schedule, and rebuild over two weeks rather than starting from zero.",
    ],
    [
      ["Busy week plan: 2 × 20 minutes", "Maintenance instead of a gap."],
      ["Keep the days, cut the volume", "The habit survives the schedule."],
      ["Return at 80% load for two weeks", "A structured restart after a break."],
    ],
    [
      ["What matters most long term?", ["Not stopping", "Peak intensity", "Perfect weeks", "New programmes"], 0],
      ["What is a maintenance routine for?", ["Holding progress during busy weeks", "Setting records", "Replacing rest", "Losing progress"], 0],
      ["How should you return after a break?", ["Lighter load, same schedule", "Straight to maxes", "Never return", "Start a new sport"], 0],
    ],
    "Write your two-session maintenance plan for busy weeks and your return-to-training rule after a break.",
  ),
};