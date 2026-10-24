import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const REQUEST_TIMEOUT_MS = 45_000;
const OPENROUTER_TIMEOUT_MS = 30_000;

const OPENROUTER_URL =
  "https://openrouter.ai/api/v1/chat/completions";

const OPENROUTER_MODEL =
  "dots-studio/dots-3-note-preview:free";

const inputSchema = z.object({
  journeyTitle: z.string().trim().min(1).max(160),
  phaseTitle: z.string().trim().min(1).max(160),
  taskTitle: z.string().trim().min(1).max(160),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  estimatedMinutes: z.number().min(10).max(120),
  provider: z.enum(["gemini", "openrouter"]),
});

const resourceQuerySchema = z.object({
  title: z.string().trim().min(1).max(120),
  query: z.string().trim().min(3).max(240),
  type: z.enum(["web", "video"]),
});

export const generatedLessonSchema = z.object({
  overview: z.string().trim().min(1).max(800),
  learn: z.array(z.string().trim().min(1).max(500)).min(2).max(4),
  exercise: z.string().trim().min(1).max(1000),
  steps: z.array(z.string().trim().min(1).max(400)).min(2).max(5),
  successCriteria: z
    .array(z.string().trim().min(1).max(300))
    .min(2)
    .max(4),
  reflection: z.string().trim().max(500).optional(),
  resourceQueries: z.array(resourceQuerySchema).max(2),
});

export type GeneratedTaskLesson = z.infer<typeof generatedLessonSchema>;
export type LessonGenerationProvider =
  GenerateTaskLessonInput["provider"];
export type GenerateTaskLessonInput = z.infer<typeof inputSchema>;

const lessonResponseSchema = {
  type: "object",
  properties: {
    overview: { type: "string" },
    learn: {
      type: "array",
      items: { type: "string" },
    },
    exercise: { type: "string" },
    steps: {
      type: "array",
      items: { type: "string" },
    },
    successCriteria: {
      type: "array",
      items: { type: "string" },
    },
    reflection: { type: "string" },
    resourceQueries: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          query: { type: "string" },
          type: {
            type: "string",
            enum: ["web", "video"],
          },
        },
        required: ["title", "query", "type"],
      },
    },
  },
  required: [
    "overview",
    "learn",
    "exercise",
    "steps",
    "successCriteria",
    "resourceQueries",
  ],
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function extractGenerateContentText(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  const candidates = payload["candidates"];
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return null;
  }

  const candidate = candidates[0];
  if (!isRecord(candidate)) return null;

  const content = candidate["content"];
  if (!isRecord(content)) return null;

  const parts = content["parts"];
  if (!Array.isArray(parts)) return null;

  for (const part of parts) {
    if (
      isRecord(part) &&
      typeof part["text"] === "string" &&
      part["text"].trim()
    ) {
      return part["text"];
    }
  }

  return null;
}

function extractOpenRouterText(payload: unknown): string | null {
  if (!isRecord(payload)) return null;

  const choices = payload["choices"];

  if (!Array.isArray(choices) || choices.length === 0) {
    return null;
  }

  const firstChoice = choices[0];

  if (!isRecord(firstChoice)) return null;

  const message = firstChoice["message"];

  if (!isRecord(message)) return null;

  const content = message["content"];

  return typeof content === "string" ? content : null;
}


function buildPrompt(input: GenerateTaskLessonInput) {
  return `
Create a concise beginner-friendly lesson for this LIFECRAFT task.

Journey: "${input.journeyTitle}"
Phase: "${input.phaseTitle}"
Task: "${input.taskTitle}"
Difficulty: ${input.difficulty}
Available time: approximately ${input.estimatedMinutes} minutes.

The lesson must be specific to the task.

Return:

overview:
A concise explanation of the topic.

learn:
2 to 4 specific learning points.

exercise:
One practical exercise the learner can complete.

steps:
2 to 5 ordered practical steps.

successCriteria:
2 to 4 observable conditions showing that the learner completed the task successfully.

reflection:
Optional short reflection question.

resourceQueries:
At most 2 useful search queries.
Do not provide invented URLs.

Keep the lesson practical and concise.
Return only valid JSON matching the supplied schema.
`;
}

async function generateLessonWithGemini(
  data: GenerateTaskLessonInput,
): Promise<GeneratedTaskLesson> {
  const apiKey = process.env["GEMINI_API_KEY"];

  if (!apiKey) {
    throw new Error("Gemini API is not configured.");
  }

  const model = "gemini-3.8-flash";

  const requestUrl =
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    if (process.env["NODE_ENV"] !== "production") {
      console.info("Gemini lesson generation attempt", {
        model,
        task: data.taskTitle,
      });
    }

    const response = await fetch(requestUrl, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [
              {
                text: buildPrompt(data),
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: lessonResponseSchema,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini lesson generation failed: ${response.status}`);
    }

    const payload: unknown = await response.json();

    const text = extractGenerateContentText(payload);

    if (!text) {
      throw new Error("Gemini returned no lesson content.");
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("Gemini returned invalid lesson JSON.");
    }

    const result = generatedLessonSchema.safeParse(parsed);

    if (!result.success) {
      if (process.env["NODE_ENV"] !== "production") {
        console.warn(
          "Lesson validation issues",
          result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        );
      }

      throw new Error("Gemini returned an incomplete lesson.");
    }

    return result.data;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function generateLessonWithOpenRouter(
  data: GenerateTaskLessonInput,
): Promise<GeneratedTaskLesson> {
  const apiKey = process.env["OPENROUTER_API_KEY"];

  if (!apiKey) {
    throw new Error("OpenRouter API is not configured.");
  }

  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, OPENROUTER_TIMEOUT_MS);

  try {
    if (process.env["NODE_ENV"] !== "production") {
      console.info("OpenRouter lesson generation attempt", {
        model: OPENROUTER_MODEL,
        task: data.taskTitle,
      });
    }

    const response = await fetch(OPENROUTER_URL, {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },

      body: JSON.stringify({
        model: OPENROUTER_MODEL,

        messages: [
          {
            role: "user",
            content: buildPrompt(data),
          },
        ],

        response_format: {
          type: "json_schema",
          json_schema: {
            name: "lifecraft_task_lesson",
            strict: true,
            schema: lessonResponseSchema,
          },
        },

        max_tokens: 1400,
        temperature: 0.3,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `OpenRouter lesson generation failed: ${response.status}`,
      );
    }

    const payload: unknown = await response.json();

    const text = extractOpenRouterText(payload);

    if (!text?.trim()) {
      throw new Error("OpenRouter returned no lesson content.");
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("OpenRouter returned invalid lesson JSON.");
    }

    const result = generatedLessonSchema.safeParse(parsed);

    if (!result.success) {
      if (process.env["NODE_ENV"] !== "production") {
        console.warn(
          "OpenRouter lesson validation issues",
          result.error.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        );
      }

      throw new Error(
        "OpenRouter returned an incomplete lesson.",
      );
    }

    return result.data;
  } finally {
    clearTimeout(timeoutId);
  }
}


export const generateTaskLesson = createServerFn({
  method: "POST",
})
  .validator((data: GenerateTaskLessonInput) =>
    inputSchema.parse(data),
  )
  .handler(async ({ data }) => {
    if (data.provider === "openrouter") {
      return generateLessonWithOpenRouter(data);
    }

    return generateLessonWithGemini(data);
  });