import { L, type LessonsByTitle } from "./types";

export const languageLessons: LessonsByTitle = {
  "learn the basic writing system or alphabet": L(
    [
      "Start with the sound system before vocabulary. If you can read the script out loud, every later word becomes easier to remember.",
      "Learn in small sets: five characters or letters at a time, written by hand, then read back the next day.",
      "Some languages add letters to the Latin alphabet (German ä, ö, ü, ß); others use their own script (Japanese Hiragana, 46 characters).",
    ],
    [
      ["ä / ö / ü", "German umlauts — Mädchen (girl), schön (beautiful), müde (tired)."],
      ["ß", "Sharp s — Straße (street)."],
      ["あ い う え お", "Japanese Hiragana vowels: a, i, u, e, o."],
    ],
    [
      ["Why learn the writing system first?", ["It unlocks reading and pronunciation", "It is required by law", "It replaces grammar", "It is faster than speaking"], 0],
      ["How big should each study set be?", ["About five characters", "The whole script at once", "One per week", "None"], 0],
      ["What helps characters stick?", ["Writing them by hand and saying them aloud", "Reading silently once", "Highlighting", "Skipping review"], 0],
    ],
    "Write out five characters or letters by hand three times each, saying the sound aloud as you write.",
  ),
  "learn essential vocabulary": L(
    [
      "A few hundred common words cover most everyday conversation. Learn high-frequency words first, not rare ones.",
      "Learn each word inside a short phrase so you absorb how it is actually used.",
      "Review yesterday's words before adding new ones — recall beats rereading.",
    ],
    [
      ["water / thank you / yes / no", "The kind of words you will use every single day."],
      ["Wasser · danke · ja · nein", "German versions of those four."],
      ["みず · ありがとう", "Japanese: water, thank you."],
    ],
    [
      ["Which words should you learn first?", ["The most common ones", "The longest ones", "Rare literary words", "Only nouns"], 0],
      ["Why learn words in phrases?", ["You learn how they are used", "It looks nicer", "It is quicker to forget", "No reason"], 0],
      ["What comes before new words?", ["Recalling yesterday's", "Nothing", "A new script", "Grammar drills"], 0],
    ],
    "Pick ten words you would use today. Write each in a two-word phrase and say it out loud.",
  ),
  "learn basic greetings": L(
    [
      "Greetings are the fastest usable win in a new language — a whole exchange from four or five phrases.",
      "Note formality: most languages have a casual and a polite greeting. Use the polite one with strangers.",
      "Learn the reply as well as the question, so a real conversation does not stall after one line.",
    ],
    [
      ["Hallo / Guten Tag", "German: hello / good day (polite)."],
      ["Wie geht es dir?", "German: how are you?"],
      ["こんにちは / はじめまして", "Japanese: hello / nice to meet you."],
    ],
    [
      ["Why start with greetings?", ["They give an immediate usable exchange", "They are the hardest part", "They replace vocabulary", "They are optional"], 0],
      ["Which greeting do you use with a stranger?", ["The polite one", "The casual one", "Neither", "Any slang"], 0],
      ["What else should you learn with each question?", ["Its reply", "Its spelling only", "Its history", "Nothing"], 0],
    ],
    "Practise a four-line greeting exchange out loud: greet, ask how they are, answer, say thank you.",
  ),
  "learn simple sentence structure": L(
    [
      "Word order is the skeleton of a sentence. Learn the default pattern and you can slot new vocabulary into it forever.",
      "German main clauses are subject–verb–object with the verb locked in second position. Japanese is subject–object–verb with particles marking roles.",
      "Build sentences with words you already know — the point is the pattern, not new vocabulary.",
    ],
    [
      ["Ich trinke Wasser.", "German: I drink water (subject–verb–object)."],
      ["わたしは みずを のみます。", "Japanese: I water drink (subject–object–verb)."],
      ["は / を", "Japanese particles marking the topic and the object."],
    ],
    [
      ["What is German main-clause order?", ["Subject–verb–object", "Verb–object–subject", "Object first always", "Random"], 0],
      ["Where does the verb go in Japanese?", ["At the end", "First", "Second", "It is omitted"], 0],
      ["Which words should you practise the pattern with?", ["Ones you already know", "Brand new rare ones", "None", "Only numbers"], 0],
    ],
    "Write three sentences in the target language using the pattern: I + verb + object.",
  ),
  "learn common grammar patterns": L(
    [
      "Grammar is a set of reusable patterns, not a list of rules to memorise. Learn one pattern, then reuse it with dozens of words.",
      "Prioritise the patterns that appear constantly: present tense, negation, questions, and past tense.",
      "Drill a pattern by swapping one word at a time so the shape becomes automatic.",
    ],
    [
      ["I eat → I do not eat", "Negation applied to a sentence you can already say."],
      ["I eat → Do you eat?", "Turning a statement into a question."],
      ["I eat → I ate", "Present shifted to past."],
    ],
    [
      ["What is the best way to treat grammar?", ["As reusable patterns", "As trivia to memorise", "As optional", "As vocabulary"], 0],
      ["Which patterns come first?", ["The most frequent ones", "The rarest ones", "Poetic forms", "Idioms"], 0],
      ["How do you drill a pattern?", ["Swap one word at a time", "Read it once", "Copy a table", "Skip it"], 0],
    ],
    "Take one sentence you can already say and produce four versions: negative, question, past and plural.",
  ),
  "build everyday vocabulary": L(
    [
      "After the core words, grow vocabulary by theme around your actual life: your home, your commute, your work, your food.",
      "Words attached to something you do daily get free repetition and stick without extra study.",
      "Keep a running list of words you wanted but did not have — that list is your best study material.",
    ],
    [
      ["Kitchen: plate, spoon, water, bread", "One themed set you use every day."],
      ["Label objects around you", "Turns your room into a vocabulary trainer."],
      ['"I wanted to say ___" list', "Gaps from real situations, worth learning first."],
    ],
    [
      ["How should everyday vocabulary be grouped?", ["By themes from your own life", "Alphabetically", "By length", "At random"], 0],
      ["Why do themed words stick?", ["You repeat them naturally", "They are shorter", "They are rare", "They rhyme"], 0],
      ["What is the best source of words to learn?", ["Gaps you hit in real situations", "A rare-words list", "Poetry only", "Nothing"], 0],
    ],
    "Choose one theme from your day and learn twelve words for it, then describe that part of your day out loud.",
  ),
  "practice listening": L(
    [
      "Listening trains your ear to segment speech into words. Early on, understanding the gist is a win — you do not need every word.",
      "Use short clips and listen more than once: first for the gist, then for details, then with the transcript.",
      "Pick material slightly above your level. Too easy is boring; too hard is noise.",
    ],
    [
      ["Listen 3× : gist → details → transcript", "A repeatable listening routine."],
      ["Slow the audio to 0.8×", "Buys your ear time without changing the content."],
      ["One 2-minute clip, well studied", "Beats thirty minutes of background noise."],
    ],
    [
      ["What is the goal of the first listen?", ["The overall gist", "Every single word", "Perfect spelling", "Grammar analysis"], 0],
      ["When should you read the transcript?", ["After listening a couple of times", "Before listening", "Never", "Instead of listening"], 0],
      ["What material works best?", ["Slightly above your level", "Far above your level", "Far below your level", "Silence"], 0],
    ],
    "Listen to one two-minute clip three times: gist, details, then with the transcript. Write down three new phrases.",
  ),
  "practice reading": L(
    [
      "Reading grows vocabulary faster than any drill because words arrive in context and repeat naturally.",
      "Read short texts and resist looking up every word. Underline unknowns, finish the paragraph, then check two or three.",
      "Re-reading the same short text a second day is one of the highest-value habits in language learning.",
    ],
    [
      ["Graded readers / children's news", "Level-appropriate text that is still real content."],
      ["Underline, finish, then look up 3 words", "Keeps momentum while still learning."],
      ["Re-read yesterday's paragraph", "Fluency comes from repetition, not novelty."],
    ],
    [
      ["Should you look up every unknown word?", ["No — finish first, then check a few", "Yes, all of them", "Never look up any", "Only nouns"], 0],
      ["Why does reading build vocabulary?", ["Words repeat in context", "Words are shorter", "It is silent", "It avoids grammar"], 0],
      ["What is worth re-reading?", ["A short text from yesterday", "Nothing", "Only new texts", "Dictionaries"], 0],
    ],
    "Read one short level-appropriate text, underline unknown words, then look up three and re-read it once.",
  ),
  "write simple sentences": L(
    [
      "Writing is speaking with a pause button. It forces you to produce the language while giving you time to get the pattern right.",
      "Write about your own day using patterns you have already drilled — short and correct beats long and guessed.",
      "Read what you wrote out loud; awkward sentences are much easier to hear than to see.",
    ],
    [
      ["Five sentences about today", "Simple, personal, immediately reusable."],
      ["Reuse a drilled pattern with new nouns", "Consolidates grammar and vocabulary together."],
      ["Read it aloud afterwards", "Catches mistakes and rehearses speaking."],
    ],
    [
      ["Why write before speaking?", ["It lets you produce with time to think", "It is easier to grade", "It avoids grammar", "It replaces listening"], 0],
      ["What should you write about first?", ["Your own everyday life", "Abstract philosophy", "Random word lists", "Nothing"], 0],
      ["What do you do after writing?", ["Read it aloud", "Delete it", "Translate it twice", "Nothing"], 0],
    ],
    "Write five sentences about your day using patterns you know, then read them out loud.",
  ),
  "listen to beginner conversations": L(
    [
      "Dialogues teach the shape of a real exchange: openings, replies, fillers and closings — things monologues never show you.",
      "Shadow one speaker: play a line, pause, repeat it aloud copying the rhythm, then continue.",
      "The same beginner dialogue studied five times is worth more than five new ones heard once.",
    ],
    [
      ["Line → pause → repeat aloud", "Shadowing, the core exercise here."],
      ["Note fillers and short replies", "Real speech runs on these."],
      ["Study one dialogue for a week", "Depth builds fluency, breadth does not."],
    ],
    [
      ["What do dialogues teach that monologues do not?", ["How exchanges are structured", "Spelling", "Alphabet order", "Nothing"], 0],
      ["What is shadowing?", ["Repeating a line aloud right after it plays", "Reading silently", "Writing a summary", "Skipping words"], 0],
      ["What is better use of time?", ["One dialogue studied deeply", "Many heard once", "None at all", "Only music"], 0],
    ],
    "Shadow one short beginner dialogue line by line, then play the other speaker's part from memory.",
  ),
  "practice speaking": L(
    [
      "Speaking is a separate skill from understanding. It only improves by producing sound, even when nobody is listening.",
      "Talk to yourself: describe what you are doing, narrate your day, answer a question out loud in full sentences.",
      "Accept mistakes. Fluency comes from finishing sentences, not from starting perfect ones.",
    ],
    [
      ["Narrate what you are doing right now", "No partner needed, unlimited practice."],
      ["Record 60 seconds and play it back", "You hear what to fix immediately."],
      ["Answer in full sentences, not one word", "Trains real production."],
    ],
    [
      ["Why practise speaking separately?", ["It is its own skill", "It replaces listening", "It is the same as reading", "It is optional"], 0],
      ["How can you practise without a partner?", ["Narrate and record yourself", "Only wait for a tutor", "Read silently", "Watch subtitles"], 0],
      ["How should you handle mistakes?", ["Keep going and finish the sentence", "Stop immediately", "Switch languages", "Give up"], 0],
    ],
    "Record yourself speaking for 60 seconds about your day, play it back, and note two things to fix.",
  ),
  "complete a short real-world conversation": L(
    [
      "This is the milestone the whole phase was for: a real exchange with a real person, however short.",
      "Prepare a small script — greeting, one question, two likely replies, thanks and goodbye — then let it go off-script.",
      "Afterwards write down what you could not say. That list becomes your next study session.",
    ],
    [
      ["Order a drink · ask for directions · greet a neighbour", "Short, low-risk real conversations."],
      ["Prepared: greeting → question → thanks", "A safety rail, not a cage."],
      ["Post-chat gap list", "The words you reached for and missed."],
    ],
    [
      ["What makes a good first real conversation?", ["Short and low-stakes", "Long and formal", "A public speech", "A written exam"], 0],
      ["Why prepare a small script?", ["It gets you started confidently", "To read it word for word", "To avoid speaking", "To impress"], 0],
      ["What do you do afterwards?", ["Note what you could not say", "Forget it", "Restart the language", "Nothing"], 0],
    ],
    "Have one short real conversation in the language today, then write down three things you wanted to say but could not.",
  ),
};