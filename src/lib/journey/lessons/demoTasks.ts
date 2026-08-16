import { L, type Lesson } from "./types";

/**
 * Lessons for the two demo journeys, keyed by the exact task id so every step
 * resolves to its own content (never a sibling's, never a shared fallback).
 */
export const demoTaskLessons: Record<string, Lesson> = {
  /* ---------- Learn Japanese ---------- */
  "demo-japanese-t1": L(
    [
      "Hiragana is the 46-character phonetic script used for Japanese grammar and native words. It is the correct first step.",
      "Every character is one syllable: a vowel, or a consonant plus a vowel. Learn it in rows of five.",
      "Write each row by hand while saying it aloud, then read it back the next day before adding a new row.",
    ],
    [
      ["あ い う え お", "a, i, u, e, o."],
      ["か き く け こ", "ka, ki, ku, ke, ko."],
      ["さ し す せ そ", "sa, shi, su, se, so."],
      ["ねこ", "neko — cat."],
    ],
    [
      ["How many basic Hiragana characters are there?", ["26", "46", "100", "12"], 1],
      ["What does each character represent?", ["A syllable", "A whole word", "A number", "A tone"], 0],
      ["Read ねこ.", ["neko", "kone", "nike", "kane"], 0],
    ],
    "Write the あ and か rows by hand twice each, then read ねこ, いえ and かお aloud.",
  ),
  "demo-japanese-t2": L(
    [
      "Katakana is the second Japanese script — the same 46 sounds as Hiragana, but different shapes.",
      "It is used for loanwords, foreign names, onomatopoeia and emphasis, so it appears constantly on menus and signs.",
      "Because the sounds are already familiar, learn Katakana by reading loanwords you can guess from English.",
    ],
    [
      ["ア イ ウ エ オ", "a, i, u, e, o — the Katakana vowels."],
      ["カ キ ク ケ コ", "ka, ki, ku, ke, ko."],
      ["コーヒー", "koohii — coffee. The ー mark lengthens a vowel."],
      ["テレビ", "terebi — television."],
    ],
    [
      ["What is Katakana mainly used for?", ["Loanwords and foreign names", "Grammar particles", "Numbers only", "Formal verbs"], 0],
      ["What does the ー mark do?", ["Lengthens the vowel", "Doubles a consonant", "Adds a question", "Marks the topic"], 0],
      ["Read コーヒー.", ["koohii (coffee)", "kohai", "keiki", "kikai"], 0],
    ],
    "Write the ア and カ rows by hand, then read five Katakana loanwords aloud and guess their meanings before checking.",
  ),
  "demo-japanese-t3": L(
    [
      "Japanese greetings change with the time of day and with how formal the situation is — that choice matters more than in English.",
      "Learn the reply as well as the greeting so a first exchange does not stall after one line.",
      "A slight bow accompanies most greetings; the phrase and the gesture are learned together.",
    ],
    [
      ["おはようございます", "ohayou gozaimasu — good morning (polite)."],
      ["こんにちは", "konnichiwa — hello, used during the day."],
      ["こんばんは", "konbanwa — good evening."],
      ["はじめまして", "hajimemashite — nice to meet you (first meeting)."],
    ],
    [
      ["When do you say こんばんは?", ["In the evening", "In the morning", "At noon", "When leaving"], 0],
      ["What does はじめまして mean?", ["Nice to meet you", "Goodbye", "Thank you", "Excuse me"], 0],
      ["Which greeting is the polite morning one?", ["おはようございます", "こんにちは", "またね", "すみません"], 0],
    ],
    "Practise a four-line exchange aloud: greet for the current time of day, introduce yourself, ask how they are, and thank them.",
  ),
  "demo-japanese-t4": L(
    [
      "Japanese grammar marks the role of each word with particles instead of relying on word order the way English does.",
      "は marks the topic, を marks the object, に marks a destination, and the verb always comes last.",
      "Because particles carry the meaning, you can move words around and the sentence still holds — as long as the verb stays at the end.",
    ],
    [
      ["わたしは がくせいです。", "watashi wa gakusei desu — I am a student. は marks the topic."],
      ["みずを のみます。", "mizu o nomimasu — (I) drink water. を marks the object."],
      ["がっこうに いきます。", "gakkou ni ikimasu — (I) go to school. に marks the destination."],
      ["です / ます", "Polite endings used in everyday speech."],
    ],
    [
      ["What does the particle を mark?", ["The object", "The topic", "The destination", "A question"], 0],
      ["Where does the Japanese verb go?", ["At the end", "First", "Second", "Anywhere"], 0],
      ["What does に mark in がっこうに いきます?", ["The destination", "The object", "The topic", "The time"], 0],
    ],
    "Write three sentences using は, を and に once each, keeping the verb at the end, then read them aloud.",
  ),
  "demo-japanese-t5": L(
    [
      "The first hundred words carry an outsized share of daily speech. Drill them until recall is instant.",
      "Group them by theme — people, food, places, time — so each word has hooks to the others.",
      "Test yourself from Japanese to English and back; only the second direction prepares you to speak.",
    ],
    [
      ["ひと (hito)", "person."],
      ["いえ (ie)", "house."],
      ["たべる (taberu)", "to eat."],
      ["きょう (kyou)", "today."],
    ],
    [
      ['What does "taberu" mean?', ["To eat", "To sleep", "To run", "To read"], 0],
      ["Best way to review vocabulary?", ["Recall from memory", "Reread the list", "Copy it once", "Skip review"], 0],
      ["Why test English → Japanese too?", ["It prepares you to speak", "It is easier", "It saves time", "No reason"], 0],
    ],
    "Choose ten of today's words, write one short sentence for each, then recall all ten from English without looking.",
  ),
  "demo-japanese-t6": L(
    [
      "Now the pieces combine: a topic, an object and a verb at the end make a complete, natural Japanese sentence.",
      "Keep sentences short and swap only one word at a time — the pattern is the lesson, not the vocabulary.",
      "Japanese frequently drops the subject when it is obvious, so a two-word sentence is often the natural choice.",
    ],
    [
      ["わたしは みずを のみます。", "I drink water — topic, object, verb."],
      ["パンを たべます。", "(I) eat bread — the subject is dropped because it is obvious."],
      ["きょう がっこうに いきます。", "Today (I) go to school — time comes early in the sentence."],
    ],
    [
      ["What order does a basic Japanese sentence follow?", ["Topic – object – verb", "Verb – topic – object", "Object – verb – topic", "Random"], 0],
      ["When can the subject be dropped?", ["When it is obvious from context", "Never", "Only in writing", "Only in questions"], 0],
      ["Where does a time word like きょう usually go?", ["Early in the sentence", "After the verb", "It cannot be used", "Between は and を"], 0],
    ],
    "Write five sentences using the topic–object–verb pattern, then rewrite two of them with the subject dropped.",
  ),
  "demo-japanese-t7": L(
    [
      "Listening trains your ear to split continuous speech into words. Early on, catching the gist is already a win.",
      "Use short clips and listen three times: first for the gist, then for details, then with the transcript.",
      "Japanese is spoken in even syllable beats, so counting the beats of a phrase helps you catch its shape.",
    ],
    [
      ["Listen 3× : gist → details → transcript", "A repeatable routine for one clip."],
      ["Slow playback to 0.8×", "Buys your ear time without changing the content."],
      ["ta-be-ma-su = 4 beats", "Even syllable timing is the key to Japanese rhythm."],
    ],
    [
      ["What is the goal of the first listen?", ["The overall gist", "Every single word", "Perfect spelling", "Grammar analysis"], 0],
      ["When should you read the transcript?", ["After listening a couple of times", "Before listening", "Never", "Instead of listening"], 0],
      ["How is Japanese rhythm structured?", ["Even syllable beats", "Heavy stress accents", "Tones per word", "No pattern"], 0],
    ],
    "Listen to one two-minute beginner clip three times — gist, details, transcript — and write down three phrases you caught.",
  ),
  "demo-japanese-t8": L(
    [
      "Reading Japanese mixes three scripts: Hiragana for grammar, Katakana for loanwords, and Kanji for meaning-carrying words.",
      "Start with texts that include furigana — small Hiragana above the Kanji — so unknown Kanji never stop you.",
      "Read a short passage, underline unknowns, finish it, then look up only two or three.",
    ],
    [
      ["日本語 (にほんご)", "Kanji with furigana showing the reading."],
      ["Graded readers / NHK Easy News", "Real Japanese at a beginner level."],
      ["Re-read yesterday's passage", "Fluency comes from repetition."],
    ],
    [
      ["What is furigana for?", ["Showing how Kanji is read", "Marking the object", "Adding politeness", "Counting beats"], 0],
      ["Should you look up every unknown word?", ["No — finish first, then check a few", "Yes, all of them", "Never any", "Only Katakana"], 0],
      ["Which script carries word meaning?", ["Kanji", "Hiragana", "Katakana", "Romaji"], 0],
    ],
    "Read one short passage with furigana, underline unknown words, look up three, then re-read it once aloud.",
  ),
  "demo-japanese-t9": L(
    [
      "This is the milestone the journey was building toward: a short real conversation in Japanese.",
      "Prepare a small frame — greeting, self-introduction, one question, thanks — then let the exchange go where it goes.",
      "Politeness level matters. Stay with です/ます forms with people you do not know well.",
    ],
    [
      ["はじめまして。わたしは サミールです。", "Nice to meet you. I am Sameer."],
      ["おなまえは なんですか。", "What is your name? — a safe opening question."],
      ["ありがとうございます。", "Thank you (polite) — how to close well."],
    ],
    [
      ["Which forms suit a stranger?", ["です / ます forms", "Casual forms only", "No verbs", "English"], 0],
      ["Why prepare a small frame?", ["It gets you started confidently", "To read it word for word", "To avoid speaking", "To impress"], 0],
      ["What do you do after the conversation?", ["Note what you could not say", "Forget it", "Restart the journey", "Nothing"], 0],
    ],
    "Have one short Japanese exchange — greet, introduce yourself, ask one question, thank them — then note three things you could not say.",
  ),

  /* ---------- Build a Game ---------- */
  "demo-game-t1": L(
    [
      "Locking the concept means committing to one sentence and one core player action, then refusing to add to it.",
      "Write down the first ten seconds of play. If those seconds are not interesting, the rest of the game cannot rescue them.",
      "Decide the cut list now — the features you will not build — so scope creep has to argue against a written decision.",
    ],
    [
      ['"Dodge falling blocks and survive as long as you can."', "One sentence, one mechanic, finishable."],
      ["Core action: move left and right", "Everything else supports this."],
      ["Cut list: multiplayer, story, shop", "Written decisions resist scope creep."],
    ],
    [
      ["What does locking a concept mean?", ["Committing to one sentence and one core action", "Writing a design bible", "Choosing an engine", "Making art"], 0],
      ["What should you describe in detail?", ["The first ten seconds of play", "The credits", "The sequel", "The price"], 0],
      ["Why write a cut list?", ["It protects scope", "It fills time", "Publishers require it", "It speeds rendering"], 0],
    ],
    "Write your concept in one sentence, describe the first ten seconds of play, and list three features you will not build.",
  ),
  "demo-game-t2": L(
    [
      "Movement is the first thing every player judges. Read input, convert it to a direction, and apply it each frame.",
      "Multiply by delta time so the speed is identical on fast and slow machines.",
      "Finishing movement means it feels right, not just that it works: tune acceleration, top speed and how quickly it stops.",
    ],
    [
      ["direction = input_x", "Input becomes a direction, not a position."],
      ["position += direction * speed * delta", "Frame-rate independent movement."],
      ["Acceleration + friction, not instant snap", "Where movement starts to feel good."],
    ],
    [
      ["Why multiply movement by delta time?", ["So speed is frame-rate independent", "To slow the game", "To add gravity", "For collisions"], 0],
      ["What does completing movement mean?", ["It feels right, not just works", "The code compiles", "Art is final", "It has sound"], 0],
      ["What makes movement feel less rigid?", ["Acceleration and friction", "Instant snapping", "Lower frame rate", "Bigger sprites"], 0],
    ],
    "Finish player movement with delta time plus acceleration and friction, then play for 30 seconds and tune the top speed.",
  ),
  "demo-game-t3": L(
    [
      "Blocking out a level means building its layout from plain shapes before any art exists — often called grey-boxing.",
      "You are testing distances and pacing: can the player reach that ledge, is the gap between challenges right?",
      "Because everything is placeholder, changing the layout is cheap. That is exactly why this step comes before art.",
    ],
    [
      ["Grey boxes for platforms and walls", "Layout without art commitment."],
      ["Measure a jump, then space platforms to it", "Design around what the player can actually do."],
      ["Play the level end to end", "Pacing only shows up in play."],
    ],
    [
      ["What is blocking out a level?", ["Building the layout from placeholder shapes", "Painting the final art", "Adding music", "Writing the story"], 0],
      ["What are you testing at this stage?", ["Distances and pacing", "Texture quality", "Store copy", "Fonts"], 0],
      ["Why block out before art?", ["Layout changes stay cheap", "It renders faster", "Art is impossible", "Engines require it"], 0],
    ],
    "Block out your first level with placeholder shapes sized to the player's jump, then play it end to end and fix one pacing problem.",
  ),
  "demo-game-t4": L(
    [
      "An art pass replaces placeholders now that the gameplay is settled — art follows working mechanics, never the reverse.",
      "Readability comes first: the player and the enemies must be instantly distinguishable in silhouette and colour.",
      "Do one pass across everything rather than perfecting a single sprite; consistency reads better than one polished asset.",
    ],
    [
      ["Player bright, enemies dark red", "Instant readability from colour alone."],
      ["Check silhouettes at small size", "If it is unclear tiny, it is unclear in play."],
      ["One consistent pass > one perfect sprite", "Cohesion beats isolated polish."],
    ],
    [
      ["When should the art pass happen?", ["After the gameplay works", "Before any mechanics", "At the very start", "Never"], 0],
      ["What matters most in game art?", ["Readability of player and enemies", "Number of colours", "File format", "Resolution alone"], 0],
      ["How should you approach the pass?", ["One consistent pass over everything", "Perfect one asset only", "Randomly", "Skip the player"], 0],
    ],
    "Replace the player and enemy placeholders with readable art, then check their silhouettes at small size during play.",
  ),
  "demo-game-t5": L(
    [
      "Sound effects are the cheapest way to make actions feel good — the same jump feels far more responsive with a sound on it.",
      "Cover the player's main actions first: jump, hit, pickup, lose. Music comes after those exist.",
      "Trigger each effect from the event itself, keep effects short, and mix them so nothing is harsh on repeat.",
    ],
    [
      ["jump.wav · hit.wav · pickup.wav", "The essential first set of effects."],
      ["Play on the event, not on a timer", "Keeps sound tied to input."],
      ["Short effects, balanced volumes", "Survives hundreds of repetitions."],
    ],
    [
      ["Why add sound effects?", ["Actions feel more responsive", "They fix bugs", "They replace UI", "They speed loading"], 0],
      ["Which effects come first?", ["The player's main actions", "Ambient music", "Menu music", "Credits theme"], 0],
      ["How should effects be triggered?", ["From the game event", "On a fixed timer", "At random", "Once at startup"], 0],
    ],
    "Add sound effects for jump, hit and pickup, trigger them from their events, then balance the volumes while playing.",
  ),
  "demo-game-t6": L(
    [
      "A playtest is watching someone play without helping. Every place they hesitate is a place your design is unclear.",
      "Five short sessions with different people reveal far more than one long session with a friend who already knows the game.",
      "Record what they did, not what they suggested. Behaviour is evidence; suggestions are opinions.",
    ],
    [
      ["Say nothing for the first two minutes", "Silence exposes unclear design."],
      ["Note every hesitation and death", "Behaviour is the real feedback."],
      ["5 testers > 1 long session", "Different players find different problems."],
    ],
    [
      ["What should you do during a playtest?", ["Watch without helping", "Explain the controls constantly", "Play it yourself", "Leave"], 0],
      ["What should you record?", ["What the player did", "Only their compliments", "Only suggestions", "Nothing"], 0],
      ["Why run five short tests?", ["Different players find different problems", "It is faster", "It looks professional", "No reason"], 0],
    ],
    "Run playtests with at least two people while staying silent, note every hesitation, then fix the clearest issue you saw.",
  ),
  "demo-game-t7": L(
    [
      "The store page is how people decide whether to try your game, so it needs the same care as a level.",
      "It needs a clear name, a one-line hook, three to five screenshots showing actual play, and a build that runs on a clean machine.",
      "Export the build and test it outside the editor before publishing — missing assets and packaging bugs only appear there.",
    ],
    [
      ['"Survive as long as you can under falling blocks."', "A one-line hook that says what you do."],
      ["Screenshots of gameplay, not menus", "Players want to see play."],
      ["Run the exported build on a clean machine", "The only real launch test."],
    ],
    [
      ["What does a store page need?", ["Name, hook, gameplay screenshots and a working build", "Only a logo", "Only a price", "Only a trailer"], 0],
      ["What should screenshots show?", ["Actual gameplay", "The main menu only", "The engine editor", "The code"], 0],
      ["Why test the exported build?", ["Packaging bugs only appear there", "It is faster", "The editor is broken", "No reason"], 0],
    ],
    "Write the name and one-line hook, capture three gameplay screenshots, test the exported build, then publish the page.",
  ),
};