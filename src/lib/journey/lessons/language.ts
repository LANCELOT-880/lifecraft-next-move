import { L, type LessonsByTitle } from "./types";

type LanguageProfile = {
  name: string;
  writing: Array<[string, string]>;
  vocabulary: Array<[string, string]>;
  greetings: Array<[string, string]>;
  sentences: Array<[string, string]>;
  grammar: Array<[string, string]>;
  everyday: Array<[string, string]>;
  listening: Array<[string, string]>;
  reading: Array<[string, string]>;
  writingPractice: Array<[string, string]>;
  conversations: Array<[string, string]>;
  speaking: Array<[string, string]>;
  realWorld: Array<[string, string]>;
};

const p = (
  question: string,
  correct: string,
  ...distractors: string[]
): [string, string[], number] => [question, [correct, ...distractors], 0];

// prettier-ignore
function buildLanguageLessons(profile: LanguageProfile): LessonsByTitle {
  return {
    "learn the basic writing system or alphabet": L(
      [
        `Start with the ${profile.name} writing system before vocabulary. Reading the symbols aloud makes every later word easier to remember.`,
        "Learn in small sets, write each item by hand, and review it the next day. Short, repeated sessions beat cramming.",
      ],
      profile.writing,
      [
        p("Why learn the writing system first?", "It supports reading and pronunciation", "It replaces grammar", "It is required by law", "It removes the need to speak"),
        p("How large should each study set be?", "About five items", "The entire system at once", "One item per week", "No set is needed"),
        p("What helps new symbols stick?", "Writing them by hand and saying them aloud", "Reading them once silently", "Only highlighting them", "Skipping review"),
      ],
      `Write five ${profile.name} symbols or letters by hand three times each, saying the sound aloud as you write.`,
    ),
    "learn essential vocabulary": L(
      [
        `Learn high-frequency ${profile.name} words before rare ones. The first useful words should be words you can use every day.`,
        "Learn each word inside a short phrase, then recall yesterday's words before adding new ones.",
      ],
      profile.vocabulary,
      [
        p("Which words should you learn first?", "The most common ones", "The longest ones", "Rare literary words", "Only nouns"),
        p("Why learn words in phrases?", "You learn how they are used", "They are easier to forget", "It replaces pronunciation", "There is no benefit"),
        p("What should come before new words?", "Recalling yesterday's words", "A harder word list", "Skipping review", "A new subject"),
      ],
      `Choose ten ${profile.name} words you would use today. Put each in a short phrase and say it aloud.`,
    ),
    "learn basic greetings": L(
      [
        `Greetings are an immediate usable win in ${profile.name}. Learn the opening, the reply, and a polite way to close the exchange.`,
        "Pay attention to formality and use the safer polite form with people you do not know.",
      ],
      profile.greetings,
      [
        p("Why start with greetings?", "They create an immediately usable exchange", "They replace vocabulary", "They are the hardest topic", "They are optional"),
        p("What should you learn with a greeting?", "Its natural reply", "Only its history", "Only a written translation", "Nothing else"),
        p("What matters when greeting a stranger?", "Using an appropriately polite form", "Using slang", "Speaking as quickly as possible", "Avoiding a reply"),
      ],
      `Practise a four-line ${profile.name} greeting exchange: greet, ask how someone is, answer, and say thank you.`,
    ),
    "learn simple sentence structure": L(
      [
        `Word order is the skeleton of a ${profile.name} sentence. Learn the default pattern and reuse it with vocabulary you already know.`,
        "Build short sentences first. The goal is a reliable pattern, not a large collection of unfamiliar words.",
      ],
      profile.sentences,
      [
        p("What does sentence structure give you?", "A reusable pattern for making new sentences", "A replacement for vocabulary", "A list of rare words", "A way to avoid practice"),
        p("What should you use when drilling a new pattern?", "Words you already know", "Only rare words", "No words at all", "Unrelated translations"),
        p("What is more useful at the beginning?", "Short, accurate sentences", "Long guesses", "Memorised paragraphs only", "Avoiding output"),
      ],
      `Write three ${profile.name} sentences using one pattern and words you already know.`,
    ),
    "learn common grammar patterns": L(
      [
        `Treat ${profile.name} grammar as reusable patterns rather than isolated rules. One useful pattern can be reused with dozens of words.`,
        "Start with frequent patterns such as statements, negation, questions, and past events.",
      ],
      profile.grammar,
      [
        p("How should you approach grammar?", "As reusable patterns", "As trivia", "As optional decoration", "As a vocabulary list"),
        p("Which patterns should come first?", "The patterns used most often", "The rarest forms", "Poetic forms only", "Forms you never need"),
        p("How do you make a pattern automatic?", "Swap one word at a time", "Read it once", "Copy it without speaking", "Skip repetition"),
      ],
      `Take one ${profile.name} sentence and produce four versions: a statement, a negative, a question, and a past version.`,
    ),
    "build everyday vocabulary": L(
      [
        `Grow your ${profile.name} vocabulary around your actual life: home, work, travel, food, and hobbies.`,
        "Words connected to daily activities get natural repetition. Keep a list of words you wanted but did not have.",
      ],
      profile.everyday,
      [
        p("How should everyday vocabulary be grouped?", "By themes from your own life", "Alphabetically only", "By word length", "At random"),
        p("Why do themed words stick?", "You repeat them naturally", "They are always shorter", "They never need review", "They rhyme"),
        p("Where should new words come from?", "Gaps you hit in real situations", "Rare-word lists", "Unrelated examples", "Nothing"),
      ],
      `Choose one part of your day and learn twelve ${profile.name} words for it, then describe it aloud.`,
    ),
    "practice listening": L(
      [
        `Listening to ${profile.name} trains your ear to separate speech into words. Understanding the gist is a useful first win.`,
        "Use short clips more than once: first for the gist, then details, then the transcript.",
      ],
      profile.listening,
      [
        p("What is the goal of the first listen?", "The overall gist", "Every word perfectly", "Perfect spelling", "Grammar analysis"),
        p("When should you read the transcript?", "After listening a couple of times", "Before listening", "Instead of listening", "Never"),
        p("What material works best?", "Something slightly above your level", "Something impossibly difficult", "Silence", "Only familiar recordings"),
      ],
      `Listen to one two-minute ${profile.name} clip three times: gist, details, then with the transcript. Note three new phrases.`,
    ),
    "practice reading": L(
      [
        `Reading ${profile.name} grows vocabulary in context. Start with short texts and resist looking up every unfamiliar word immediately.`,
        "Finish the paragraph first, check only a few words, and reread the same passage the next day.",
      ],
      profile.reading,
      [
        p("Should you look up every unknown word?", "No, finish first and check a few", "Yes, all of them immediately", "Never look up any", "Only verbs"),
        p("Why does reading build vocabulary?", "Words repeat in context", "Words become shorter", "It removes the need for grammar", "It avoids pronunciation"),
        p("What is worth rereading?", "A short text from yesterday", "Only a dictionary", "Nothing", "Only a brand-new text"),
      ],
      `Read one short ${profile.name} text, underline unknown words, look up three, and reread it once.`,
    ),
    "write simple sentences": L(
      [
        `Writing in ${profile.name} gives you a pause button. It lets you produce the language while taking time to get the pattern right.`,
        "Write about your own day using patterns you have already learned, then read the result aloud.",
      ],
      profile.writingPractice,
      [
        p("Why write before speaking?", "You can produce with time to think", "It avoids all grammar", "It replaces listening", "It removes the need to practise"),
        p("What should you write about first?", "Your own everyday life", "Abstract topics only", "Random word lists", "Nothing"),
        p("What should you do after writing?", "Read it aloud", "Delete it", "Translate it twice", "Never review it"),
      ],
      `Write five ${profile.name} sentences about your day, then read them aloud and mark two improvements.`,
    ),
    "listen to beginner conversations": L(
      [
        `Beginner ${profile.name} dialogues teach the shape of real exchanges: openings, replies, fillers, and closings.`,
        "Shadow one speaker by playing a line, pausing, and repeating it aloud with the same rhythm.",
      ],
      profile.conversations,
      [
        p("What do dialogues teach particularly well?", "How real exchanges are structured", "Alphabet order", "Only spelling", "Nothing"),
        p("What is shadowing?", "Repeating a line aloud right after it plays", "Reading silently", "Writing a summary", "Skipping difficult words"),
        p("What is better practice?", "One dialogue studied deeply", "Many dialogues heard once", "Only background audio", "No repetition"),
      ],
      `Shadow one short beginner ${profile.name} dialogue line by line, then play one speaker's part from memory.`,
    ),
    "practice speaking": L(
      [
        `Speaking ${profile.name} is a separate skill from understanding it. Improve by producing sound, even when nobody else is listening.`,
        "Narrate your day, answer questions in full sentences, and keep going through small mistakes.",
      ],
      profile.speaking,
      [
        p("Why practise speaking separately?", "It is its own skill", "It replaces reading", "It is the same as listening", "It is optional"),
        p("How can you practise without a partner?", "Narrate and record yourself", "Wait for a tutor", "Read silently", "Watch subtitles"),
        p("How should you handle mistakes?", "Keep going and finish the sentence", "Stop immediately", "Switch topics", "Give up"),
      ],
      `Record yourself speaking ${profile.name} for 60 seconds about your day. Play it back and note two things to improve.`,
    ),
    "complete a short real-world conversation": L(
      [
        `A short real-world exchange is the milestone for this ${profile.name} journey. Keep it brief, practical, and low pressure.`,
        "Prepare a greeting, one question, two likely replies, thanks, and goodbye. Then let the conversation go naturally.",
      ],
      profile.realWorld,
      [
        p("What makes a good first real conversation?", "Short and low-stakes", "Long and formal", "A public speech", "A written exam"),
        p("Why prepare a small script?", "It helps you start confidently", "To avoid speaking", "To read every word", "To impress people"),
        p("What should you do afterwards?", "Note what you could not say", "Forget the experience", "Restart the entire course", "Do nothing"),
      ],
      `Have one short real ${profile.name} conversation today, then write down three things you wanted to say but could not.`,
    ),
  };
}

// prettier-ignore
const germanProfile: LanguageProfile = {
  name: "German",
  writing: [
    ["A / Ä / Ö / Ü", "German vowels and umlauts."],
    ["ß", "The German sharp s used in words such as Straße."],
    ["sch", "A common German sound pattern, as in schön."],
  ],
  vocabulary: [
    ["Wasser · danke · ja · nein", "Water, thank you, yes, and no."],
    ["Guten Morgen · bitte", "Good morning and please."],
    ["Heute lerne ich Deutsch.", "Today I am learning German."],
  ],
  greetings: [
    ["Hallo / Guten Tag", "Hello / good day."],
    ["Wie geht es Ihnen?", "How are you? — polite form."],
    ["Auf Wiedersehen", "Goodbye."],
  ],
  sentences: [
    ["Ich trinke Wasser.", "I drink water."],
    ["Ich lerne Deutsch.", "I am learning German."],
    ["Ich habe Zeit.", "I have time."],
  ],
  grammar: [
    ["Ich esse → Ich esse nicht", "A simple German negative sentence."],
    ["Ich lerne → Lernst du?", "A statement changed into a question."],
    ["Ich gehe → Ich ging", "A present idea shifted into the past."],
  ],
  everyday: [
    ["Küche: Teller, Löffel, Brot", "Kitchen words: plate, spoon, bread."],
    ["Mein Alltag", "My daily routine."],
    ["Das möchte ich sagen: ___", "A useful list of words you wanted in real situations."],
  ],
  listening: [
    ["Hör zu: erst die Idee, dann die Details", "Listen first for meaning, then details."],
    ["Ein kurzer deutscher Dialog", "A short German dialogue."],
    ["Noch einmal mit dem Text", "Listen again with the transcript."],
  ],
  reading: [
    ["Kurze Texte für Anfänger", "Short texts for beginners."],
    ["Drei neue Wörter markieren", "Mark three new words."],
    ["Den Absatz noch einmal lesen", "Read the paragraph again."],
  ],
  writingPractice: [
    ["Heute ist mein Tag.", "Today is my day."],
    ["Ich arbeite und lerne.", "I work and learn."],
    ["Das möchte ich morgen tun.", "This is what I want to do tomorrow."],
  ],
  conversations: [
    ["Hallo! Wie geht es Ihnen?", "Hello! How are you? — polite form."],
    ["Danke, gut. Und Ihnen?", "Thank you, well. And you? — polite reply."],
    ["Bis bald!", "See you soon!"],
  ],
  speaking: [
    ["Ich beschreibe meinen Tag.", "I describe my day."],
    ["Eine Minute laut sprechen", "Speak aloud for one minute."],
    ["Eine Aufnahme anhören", "Listen back to a recording."],
  ],
  realWorld: [
    ["Einen Kaffee bestellen", "Order a coffee."],
    ["Nach dem Weg fragen", "Ask for directions."],
    ["Danke und auf Wiedersehen", "Thank you and goodbye."],
  ],
};

// prettier-ignore
const japaneseProfile: LanguageProfile = {
  name: "Japanese",
  writing: [
    ["あ い う え お", "The five Japanese hiragana vowels."],
    ["か き く け こ", "A beginner hiragana sound group."],
    ["ん", "The Japanese hiragana n sound."],
  ],
  vocabulary: [
    ["みず · ありがとう · はい · いいえ", "Water, thank you, yes, and no."],
    ["おはよう · おねがいします", "Good morning and please."],
    ["きょう は べんきょうします。", "I study today."],
  ],
  greetings: [
    ["こんにちは", "Hello / good afternoon."],
    ["おげんきですか。", "How are you?"],
    ["さようなら", "Goodbye."],
  ],
  sentences: [
    ["わたしは みずを のみます。", "I drink water."],
    ["わたしは にほんごを べんきょうします。", "I study Japanese."],
    ["じかんが あります。", "I have time."],
  ],
  grammar: [
    ["たべます → たべません", "A simple Japanese negative pattern."],
    ["たべます → たべますか。", "A statement changed into a question."],
    ["いきます → いきました", "A present idea shifted into the past."],
  ],
  everyday: [
    ["キッチン: さら、スプーン、パン", "Kitchen words: plate, spoon, bread."],
    ["わたしの いちにち", "My daily routine."],
    ["いいたいこと: ___", "A useful list of words you wanted in real situations."],
  ],
  listening: [
    ["まず いみ、つぎに こまかい こと", "Listen first for meaning, then details."],
    ["みじかい かいわ", "A short Japanese dialogue."],
    ["もういちど ぶんしょうと きく", "Listen again with the transcript."],
  ],
  reading: [
    ["やさしい ぶんしょう", "Short, accessible texts."],
    ["あたらしい ことばを みっつ", "Mark three new words."],
    ["きのうの ぶんを よむ", "Read yesterday's paragraph again."],
  ],
  writingPractice: [
    ["きょうの ことを かきます。", "I write about today."],
    ["はたらいて、べんきょうします。", "I work and study."],
    ["あした したいことです。", "This is what I want to do tomorrow."],
  ],
  conversations: [
    ["こんにちは。おげんきですか。", "Hello. How are you?"],
    ["げんきです。ありがとう。", "I am well. Thank you."],
    ["また あいましょう。", "See you again."],
  ],
  speaking: [
    ["わたしの いちにちを はなします。", "I talk about my day."],
    ["いちぷん はなす", "Speak for one minute."],
    ["ろくおんを きく", "Listen back to a recording."],
  ],
  realWorld: [
    ["コーヒーを おねがいします。", "Order a coffee."],
    ["みちを ききます。", "Ask for directions."],
    ["ありがとう。さようなら。", "Thank you. Goodbye."],
  ],
};

/** Detailed catalogues are opt-in: unsupported languages safely have no lesson. */
export const languageLessonsByTarget: Record<string, LessonsByTitle> = {
  german: buildLanguageLessons(germanProfile),
  japanese: buildLanguageLessons(japaneseProfile),
};
