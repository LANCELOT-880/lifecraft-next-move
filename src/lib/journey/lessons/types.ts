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

/** Compact authoring helper so each step can own a full, distinct lesson. */
export function L(
  learn: string[],
  examples: Array<[string, string]>,
  practice: Array<[string, string[], number]>,
  exercise: string,
): Lesson {
  return {
    learn,
    examples: examples.map(([text, meaning]) => ({ text, meaning })),
    practice: practice.map(([question, options, answerIndex], index) => ({
      id: `q${index + 1}`,
      question,
      options,
      answerIndex,
    })),
    exercise,
  };
}

/** Lesson content keyed by an exact task title (lowercased) within one category. */
export type LessonsByTitle = Record<string, Lesson>;