export interface LessonExample {
  text: string;
  meaning?: string;
}

export interface VocabularyEntry {
  term: string;
  reading?: string;
  meaning: string;
}

export interface PracticeAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface PracticeQuestion {
  id: string;
  question: string;
  answers: PracticeAnswer[];
}

export interface Lesson {
  overview?: string;
  /** Short beginner-friendly explanation, one paragraph per entry. */
  learn: string[];
  examples: LessonExample[];
  vocabulary?: VocabularyEntry[];
  practice: PracticeQuestion[];
  /** Small completion exercise the learner does before finishing. */
  exercise: string;
  steps?: string[];
  successCriteria?: string[];
  reflection?: string;
  resourceQueries?: import("../types").ResourceQuery[];
}

/** Compact authoring helper so each step can own a full, distinct lesson. */
export function L(
  learn: string[],
  examples: Array<[string, string, string?]>,
  practice: Array<[string, string[], number]>,
  exercise: string,
  vocabulary?: VocabularyEntry[],
): Lesson {
  return {
    learn,
    examples: examples.map(([text, meaning]) => ({ text, meaning })),
    ...(vocabulary ? { vocabulary } : {}),
    practice: practice.map(([question, options, answerIndex], index) => {
      const questionId = `q${index + 1}`;
      return {
        id: questionId,
        question,
        answers: options.map((text, optionIndex) => ({
          id: `${questionId}-a${optionIndex + 1}`,
          text,
          isCorrect: optionIndex === answerIndex,
        })),
      };
    }),
    exercise,
  };
}

/** Lesson content keyed by an exact task title (lowercased) within one category. */
export type LessonsByTitle = Record<string, Lesson>;
