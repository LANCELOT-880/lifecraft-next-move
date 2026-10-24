import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const MAX_ATTEMPTS = 3;
const STRUCTURED_RESPONSE_MAX_ATTEMPTS = 2;
const REQUEST_TIMEOUT_MS = 60_000;
const OPENROUTER_MAX_ATTEMPTS = 2;
const OPENROUTER_TIMEOUT_MS = 30_000;
const RETRY_BASE_DELAY_MS = 2_000;
const OPENROUTER_RETRY_STATUSES = new Set([429, 500, 502, 503, 504]);
const OPENROUTER_MODEL = "dots-studio/dots-3-note-preview:free";
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

export const GenerationErrorCategory = {
  RATE_LIMIT: "RATE_LIMIT",
  TIMEOUT: "TIMEOUT",
  NETWORK: "NETWORK",
  PROVIDER_ERROR: "PROVIDER_ERROR",
  INVALID_RESPONSE: "INVALID_RESPONSE",
  VALIDATION_ERROR: "VALIDATION_ERROR",
  CONFIGURATION_ERROR: "CONFIGURATION_ERROR",
} as const;

export type GenerationErrorCategoryType =
  (typeof GenerationErrorCategory)[keyof typeof GenerationErrorCategory];

export class GenerationError extends Error {
  category: GenerationErrorCategoryType;
  status?: number;
  attempt?: number;
  retryable: boolean;
  override cause: unknown;

  constructor(
    category: GenerationErrorCategoryType,
    message: string,
    options: { status?: number; attempt?: number; retryable?: boolean; cause?: unknown } = {},
  ) {
    super(message);
    this.name = "GenerationError";
    this.category = category;
    if (options.status !== undefined) this.status = options.status;
    if (options.attempt !== undefined) this.attempt = options.attempt;
    this.retryable = options.retryable ?? false;
    this.cause = options.cause;
  }
}

const inputSchema = z.object({
  goal: z.string().trim().min(1).max(240),
  why: z.string().trim().max(600),
  dailyTime: z.string().trim().min(1).max(30),
  targetDate: z.string().trim().max(20),
  provider: z.enum(["gemini", "openrouter"]),
});

const resourceQuerySchema = z.object({
  title: z.string().trim().min(1).max(120),
  query: z.string().trim().min(3).max(240),
  type: z.enum(["web", "video"]),
});

const generatedLessonSchema = z.object({
  overview: z.string().trim().min(1).max(800),
  learn: z.array(z.string().trim().min(1).max(500)).min(1).max(8),
  exercise: z.string().trim().min(1).max(1000),
  steps: z.array(z.string().trim().min(1).max(400)).min(1).max(8),
  successCriteria: z
    .array(z.string().trim().min(1).max(300))
    .min(1)
    .max(8),
  reflection: z.string().trim().max(500).optional(),
  resourceQueries: z.array(resourceQuerySchema).max(4),
});

const generatedTaskSchema = z.object({
  title: z.string().trim().min(3).max(160),
  estimatedMinutes: z.number().finite().min(1).max(240),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  impact: z.enum(["Low impact", "Medium impact", "High impact"]),
  lesson: generatedLessonSchema.optional(),
});

const generatedJourneySchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(1).max(500),
  categoryLabel: z.string().trim().min(1).max(80),
  phases: z
    .array(
      z.object({
        title: z.string().trim().min(2).max(100),
        summary: z.string().trim().min(1).max(300),
        tasks: z.array(generatedTaskSchema).min(3).max(5),
      }),
    )
    .min(4)
    .max(6),
});

export type GeneratedJourneyResponse = z.infer<typeof generatedJourneySchema>;
export type GenerateJourneyInput = z.infer<typeof inputSchema>;
export type GenerationProvider = GenerateJourneyInput["provider"];

export function getNextGenerationProvider(provider: GenerationProvider): GenerationProvider {
  return provider === "gemini" ? "openrouter" : "gemini";
}

const responseSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    categoryLabel: { type: "string" },
    phases: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          summary: { type: "string" },
          tasks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: { type: "string" },
                estimatedMinutes: { type: "number" },
                difficulty: { type: "string", enum: ["Easy", "Medium", "Hard"] },
                impact: { type: "string", enum: ["Low impact", "Medium impact", "High impact"] },
                lesson: {
                  type: "object",
                  properties: {
                    overview: { type: "string" },
                    learn: { type: "array", items: { type: "string" } },
                    exercise: { type: "string" },
                    steps: { type: "array", items: { type: "string" } },
                    successCriteria: { type: "array", items: { type: "string" } },
                    reflection: { type: "string" },
                    resourceQueries: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: { type: "string" },
                          query: { type: "string" },
                          type: { type: "string", enum: ["web", "video"] },
                        },
                        required: ["title", "query", "type"],
                      },
                    },
                  },
                },
              },
              required: ["title", "estimatedMinutes", "difficulty", "impact"],
            },
          },
        },
        required: ["title", "summary", "tasks"],
      },
    },
  },
  required: ["title", "description", "categoryLabel", "phases"],
};

const prompt = (input: GenerateJourneyInput) => `
Create a practical beginner-friendly learning roadmap for this goal: "${input.goal}".

Why it matters: "${input.why || "Not specified"}".
Available daily time: ${input.dailyTime}.
Target date: ${input.targetDate || "Open-ended"}.

Assume the learner is a beginner unless the goal explicitly says otherwise.

Generate exactly 4 phases.
Each phase must contain exactly 3 specific tasks.

For each phase, return:
- title
- summary
- tasks

For each task, return only:
- title
- estimatedMinutes
- difficulty
- impact

Do NOT generate lesson content here.
Do NOT include:
- overview
- learn
- exercise
- steps
- successCriteria
- reflection
- resourceQueries

Make the roadmap progress logically from prerequisites and fundamentals to guided practice, application, and review.

Never use vague task titles such as:
"learn the fundamentals"
"practice the skill"
"complete a practical task"

Instead, name the exact concept, technique, problem type, artifact, or skill being learned.

Adapt estimatedMinutes to the user's available daily time.

Return only the structured JSON requested by the response schema.
`;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function normalizeText(value: unknown, fallback?: string): string {
  if (typeof value !== "string") return fallback ?? "";
  return value.trim();
}

function clampNumber(value: number, min: number, max: number): number {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, Math.round(value)));
}

function normalizeGeneratedTask(
  value: unknown,
): GeneratedJourneyResponse["phases"][number]["tasks"][number] | null {
  if (!isRecord(value)) return null;

  const title = normalizeText(value["title"]);
  const rawMinutes = Number(value["estimatedMinutes"]);

  const rawDifficulty = normalizeText(value["difficulty"]).toLowerCase();

  const difficulty: "Easy" | "Medium" | "Hard" =
    rawDifficulty === "easy"
      ? "Easy"
      : rawDifficulty === "hard"
        ? "Hard"
        : "Medium";

  const rawImpact = normalizeText(value["impact"]).toLowerCase();

  const impact: "Low impact" | "Medium impact" | "High impact" =
    rawImpact === "low" || rawImpact === "low impact"
      ? "Low impact"
      : rawImpact === "high" || rawImpact === "high impact"
        ? "High impact"
        : "Medium impact";

  if (!title) return null;

  return {
    title: title.slice(0, 160),
    estimatedMinutes: clampNumber(rawMinutes, 10, 120),
    difficulty,
    impact,
  };
}
function normalizeGeneratedPhase(
  value: unknown,
): GeneratedJourneyResponse["phases"][number] | null {
  if (!isRecord(value)) return null;

  const title = normalizeText(value["title"]);
  const summary = normalizeText(value["summary"]);
  const tasks = Array.isArray(value["tasks"]) ? value["tasks"] : [];

  if (!title || !summary) return null;

  const normalizedTasks = tasks
    .map((task) => normalizeGeneratedTask(task))
    .filter((task): task is GeneratedJourneyResponse["phases"][number]["tasks"][number] =>
      Boolean(task),
    )
    .slice(0, 5);

  if (normalizedTasks.length === 0) return null;

  return {
    title: title.slice(0, 100),
    summary: summary.slice(0, 300),
    tasks: normalizedTasks,
  };
}

export function normalizeGeneratedJourney(
  value: unknown,
  input?: GenerateJourneyInput,
): GeneratedJourneyResponse | null {
  if (!isRecord(value)) return null;

  const title =
    normalizeText(value["title"]) ||
    normalizeText(input?.goal) ||
    "Personal Learning Journey";

  const description =
    normalizeText(value["description"]) ||
    (input?.goal
      ? `A practical learning roadmap for ${input.goal}.`
      : "A practical personalized learning roadmap.");

  const categoryLabel =
    normalizeText(value["categoryLabel"]) ||
    "Learning";
    
  const phases = Array.isArray(value["phases"]) ? value["phases"] : [];


  const normalizedPhases = phases
    .map((phase) => normalizeGeneratedPhase(phase))
    .filter((phase): phase is GeneratedJourneyResponse["phases"][number] => Boolean(phase))
    .slice(0, 6);

  if (normalizedPhases.length === 0) return null;

  const normalized = {
    title: title.slice(0, 120),
    description: description.slice(0, 500),
    categoryLabel: categoryLabel.slice(0, 80),
    phases: normalizedPhases,
  } satisfies GeneratedJourneyResponse;

  const result = generatedJourneySchema.safeParse(normalized);
  if (!result.success) {
    return null;
  }

  return result.data;
}

function extractText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const interaction = payload as {
    status?: unknown;
    steps?: unknown;
  };
  if (!Array.isArray(interaction.steps)) return null;

  return (
    interaction.steps
      .filter(
        (step): step is { type: "model_output"; content?: unknown } =>
          Boolean(step) &&
          typeof step === "object" &&
          (step as { type?: unknown }).type === "model_output",
      )
      .flatMap((step) => (Array.isArray(step.content) ? step.content : []))
      .find(
        (content): content is { type: "text"; text: string } =>
          Boolean(content) &&
          typeof content === "object" &&
          (content as { type?: unknown }).type === "text" &&
          typeof (content as { text?: unknown }).text === "string",
      )?.text ?? null
  );
}

function extractChatCompletionText(payload: unknown): string | null {
  if (!isRecord(payload) || !Array.isArray(payload["choices"])) return null;
  const firstChoice = payload["choices"][0];
  if (!isRecord(firstChoice) || !isRecord(firstChoice["message"])) return null;
  const content = firstChoice["message"]["content"];
  return typeof content === "string" ? content : null;
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

function parseGeneratedJourneyText(
  text: string,
  attempt: number,
  input?: GenerateJourneyInput,
): GeneratedJourneyResponse {
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch (error) {
    const classification = classifyGenerationFailure({
      isInvalidJson: true,
      message: error instanceof Error ? error.message : "malformed json",
    });
    throw new GenerationError(classification.category, classification.message, {
      attempt,
      retryable: classification.retryable,
    });
  }

  const normalized = normalizeGeneratedJourney(parsed, input);
  if (!normalized) {
    const validationIssue = generatedJourneySchema.safeParse(parsed);
    if (!validationIssue.success && process.env["NODE_ENV"] !== "production") {
      console.warn(
        "Journey validation issues",
        validationIssue.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      );
    }
    const classification = classifyGenerationFailure({
      ...(validationIssue.success ? {} : { zodIssues: validationIssue.error.issues }),
    });
    throw new GenerationError(classification.category, classification.message, {
      attempt,
      retryable: classification.retryable,
    });
  }

  return normalized;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRetryDelay(attempt: number): number {
  return RETRY_BASE_DELAY_MS * Math.pow(2, attempt - 1);
}

function canRetry(category: GenerationErrorCategoryType, attempt: number): boolean {
  switch (category) {
    case GenerationErrorCategory.RATE_LIMIT:
    case GenerationErrorCategory.TIMEOUT:
    case GenerationErrorCategory.NETWORK:
    case GenerationErrorCategory.PROVIDER_ERROR:
      return attempt < MAX_ATTEMPTS;
    case GenerationErrorCategory.INVALID_RESPONSE:
    case GenerationErrorCategory.VALIDATION_ERROR:
      return attempt < STRUCTURED_RESPONSE_MAX_ATTEMPTS;
    default:
      return false;
  }
}

function canRetryOpenRouter(error: GenerationError, attempt: number): boolean {
  if (attempt >= OPENROUTER_MAX_ATTEMPTS) return false;
  return (
    (error.status !== undefined && OPENROUTER_RETRY_STATUSES.has(error.status)) ||
    error.category === GenerationErrorCategory.TIMEOUT ||
    error.category === GenerationErrorCategory.NETWORK ||
    error.category === GenerationErrorCategory.INVALID_RESPONSE ||
    error.category === GenerationErrorCategory.VALIDATION_ERROR
  );
}

function getClassificationMessage(category: GenerationErrorCategoryType): string {
  switch (category) {
    case GenerationErrorCategory.RATE_LIMIT:
      return "AI generation is temporarily busy. Please try again in a moment.";
    case GenerationErrorCategory.TIMEOUT:
      return "Journey generation took too long. Please try again.";
    case GenerationErrorCategory.NETWORK:
      return "We couldn't reach the AI service. Check your connection and try again.";
    case GenerationErrorCategory.INVALID_RESPONSE:
      return "The AI returned an incomplete roadmap. Please try generating it again.";
    case GenerationErrorCategory.CONFIGURATION_ERROR:
      return "AI generation is temporarily unavailable.";
    case GenerationErrorCategory.VALIDATION_ERROR:
      return "The AI returned an incomplete roadmap. Please try generating it again.";
    case GenerationErrorCategory.PROVIDER_ERROR:
      return "AI generation is temporarily unavailable.";
    default:
      return "AI journey generation failed. Please try again.";
  }
}

export function classifyGenerationFailure(
  details: {
    status?: number;
    isAbort?: boolean;
    isNetwork?: boolean;
    isInvalidJson?: boolean;
    isMissingText?: boolean;
    zodIssues?: Array<{ path?: Array<string | number> }>;
    errorName?: string;
    message?: string;
  } = {},
) {
  const messageText = `${details.message ?? ""} ${details.errorName ?? ""}`.toLowerCase();

  if (details.status === 429) {
    return {
      category: GenerationErrorCategory.RATE_LIMIT,
      retryable: true,
      message: getClassificationMessage(GenerationErrorCategory.RATE_LIMIT),
    };
  }

  if (details.isAbort || /timeout|aborted/.test(messageText)) {
    return {
      category: GenerationErrorCategory.TIMEOUT,
      retryable: true,
      message: getClassificationMessage(GenerationErrorCategory.TIMEOUT),
    };
  }

  if (
    details.isNetwork ||
    /fetch|network|failed to fetch|failed to load|econnreset|enotfound/.test(messageText)
  ) {
    return {
      category: GenerationErrorCategory.NETWORK,
      retryable: true,
      message: getClassificationMessage(GenerationErrorCategory.NETWORK),
    };
  }

  if (details.status && details.status >= 500) {
    return {
      category: GenerationErrorCategory.PROVIDER_ERROR,
      retryable: true,
      message: getClassificationMessage(GenerationErrorCategory.PROVIDER_ERROR),
    };
  }

  if (details.isInvalidJson || details.isMissingText) {
    return {
      category: GenerationErrorCategory.INVALID_RESPONSE,
      retryable: true,
      message: getClassificationMessage(GenerationErrorCategory.INVALID_RESPONSE),
    };
  }

  if (details.zodIssues && details.zodIssues.length > 0) {
    return {
      category: GenerationErrorCategory.VALIDATION_ERROR,
      retryable: true,
      message: getClassificationMessage(GenerationErrorCategory.VALIDATION_ERROR),
    };
  }

  if (details.status && [400, 401, 403, 404].includes(details.status)) {
    return {
      category: GenerationErrorCategory.CONFIGURATION_ERROR,
      retryable: false,
      message: getClassificationMessage(GenerationErrorCategory.CONFIGURATION_ERROR),
    };
  }

  return {
    category: GenerationErrorCategory.PROVIDER_ERROR,
    retryable: false,
    message: getClassificationMessage(GenerationErrorCategory.PROVIDER_ERROR),
  };
}

async function generateOnce(
  data: GenerateJourneyInput,
  attempt: number,
): Promise<GeneratedJourneyResponse> {
  const apiKey = process.env["GEMINI_API_KEY"];
  if (!apiKey) {
    throw new GenerationError(
      GenerationErrorCategory.CONFIGURATION_ERROR,
      getClassificationMessage(GenerationErrorCategory.CONFIGURATION_ERROR),
    );
  }

  const model = "gemini-3.8-flash";
  const requestUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    if (process.env["NODE_ENV"] !== "production") {
      console.warn("Gemini generation attempt", { attempt, model, requestUrl });
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
                text: prompt(data),
              },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseJsonSchema: responseSchema,
        },
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text().catch(() => "");
      const classification = classifyGenerationFailure({
        status: response.status,
        message: errorBody || `HTTP ${response.status}`,
      });

      if (classification.retryable && canRetry(classification.category, attempt)) {
        if (process.env["NODE_ENV"] !== "production") {
          console.warn("Gemini retrying transient provider error", {
            attempt,
            category: classification.category,
            status: response.status,
          });
        }
        await sleep(getRetryDelay(attempt));
        return generateOnce(data, attempt + 1);
      }

      throw new GenerationError(classification.category, classification.message, {
        status: response.status,
        attempt,
        retryable: classification.retryable,
        cause: errorBody ? `HTTP ${response.status}: ${errorBody.slice(0, 240)}` : undefined,
      });
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch (error) {
      const classification = classifyGenerationFailure({
        isInvalidJson: true,
        message: error instanceof Error ? error.message : "invalid json",
      });
      if (classification.retryable && canRetry(classification.category, attempt)) {
        await sleep(getRetryDelay(attempt));
        return generateOnce(data, attempt + 1);
      }
      throw new GenerationError(classification.category, classification.message, {
        attempt,
        retryable: classification.retryable,
        cause: error,
      });
    }

    const text = extractGenerateContentText(payload);
    if (!text || !text.trim()) {
      const classification = classifyGenerationFailure({
        isMissingText: true,
        message: "Missing model output text",
      });
      throw new GenerationError(classification.category, classification.message, {
        attempt,
        retryable: classification.retryable,
      });
    }

    return parseGeneratedJourneyText(text, attempt, data);
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      const classification = classifyGenerationFailure({
        isAbort: true,
        errorName: error.name,
        message: error.message,
      });
      if (classification.retryable && canRetry(classification.category, attempt)) {
        if (process.env["NODE_ENV"] !== "production") {
          console.warn("Gemini timing out; retrying", {
            attempt,
            category: classification.category,
          });
        }
        await sleep(getRetryDelay(attempt));
        return generateOnce(data, attempt + 1);
      }
      throw new GenerationError(classification.category, classification.message, {
        attempt,
        retryable: classification.retryable,
        cause: error,
      });
    }

    if (error instanceof GenerationError) {
      if (error.retryable && canRetry(error.category, attempt)) {
        await sleep(getRetryDelay(attempt));
        return generateOnce(data, attempt + 1);
      }

      if (process.env["NODE_ENV"] !== "production") {
        console.warn("AI generation failed", {
          category: error.category,
          attempt,
          status: error.status,
          retryable: error.retryable,
          errorName: error.name,
        });
      }
      throw error;
    }

    const classification = classifyGenerationFailure({
      isNetwork: true,
      errorName: error instanceof Error ? error.name : "unknown",
      message: error instanceof Error ? error.message : String(error),
    });
    if (classification.retryable && canRetry(classification.category, attempt)) {
      await sleep(getRetryDelay(attempt));
      return generateOnce(data, attempt + 1);
    }
    throw new GenerationError(classification.category, classification.message, {
      attempt,
      retryable: classification.retryable,
      cause: error,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function generateWithOpenRouter(
  data: GenerateJourneyInput,
  attempt = 1,
): Promise<GeneratedJourneyResponse> {
  const apiKey = process.env["OPENROUTER_API_KEY"];
  if (!apiKey) {
    throw new GenerationError(
      GenerationErrorCategory.CONFIGURATION_ERROR,
      getClassificationMessage(GenerationErrorCategory.CONFIGURATION_ERROR),
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), OPENROUTER_TIMEOUT_MS);

  try {
    if (process.env["NODE_ENV"] !== "production") {
      console.info("OpenRouter generation attempt", {
        provider: "openrouter",
        attempt,
        model: OPENROUTER_MODEL,
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
            content: prompt(data),
          },
        ],
        response_format: { type: "json_object" },
        max_tokens: 2500,
        temperature: 0.3,
        stream: false,
      }),
    });

    if (!response.ok) {
      const classification = classifyGenerationFailure({ status: response.status });
      throw new GenerationError(classification.category, classification.message, {
        status: response.status,
        attempt,
        retryable: OPENROUTER_RETRY_STATUSES.has(response.status),
      });
    }

    let payload: unknown;
    try {
      payload = await response.json();
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === "AbortError") throw caught;
      throw new GenerationError(
        GenerationErrorCategory.INVALID_RESPONSE,
        getClassificationMessage(GenerationErrorCategory.INVALID_RESPONSE),
        { attempt },
      );
    }

    const text = extractChatCompletionText(payload);
    if (!text?.trim()) {
      throw new GenerationError(
        GenerationErrorCategory.INVALID_RESPONSE,
        getClassificationMessage(GenerationErrorCategory.INVALID_RESPONSE),
        { attempt },
      );
    }

    return parseGeneratedJourneyText(text, attempt, data);
  } catch (caught) {
    let error: GenerationError;
    if (caught instanceof GenerationError) {
      error = caught;
    } else {
      const isTimeout = caught instanceof DOMException && caught.name === "AbortError";
      const classification = classifyGenerationFailure({
        isAbort: isTimeout,
        isNetwork: !isTimeout,
        errorName: caught instanceof Error ? caught.name : "unknown",
        ...(caught instanceof Error ? { message: caught.message } : {}),
      });
      error = new GenerationError(classification.category, classification.message, {
        attempt,
        retryable: classification.retryable,
      });
    }

    if (canRetryOpenRouter(error, attempt)) {
      if (process.env["NODE_ENV"] !== "production") {
        console.warn("OpenRouter retrying provider request", {
          provider: "openrouter",
          attempt,
          status: error.status,
          category: error.category,
        });
      }
      await sleep(getRetryDelay(attempt));
      return generateWithOpenRouter(data, attempt + 1);
    }

    if (process.env["NODE_ENV"] !== "production") {
      console.warn("OpenRouter generation failed", {
        provider: "openrouter",
        attempt,
        status: error.status,
        category: error.category,
      });
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

const GENERATION_UNAVAILABLE_MESSAGE = "AI generation is temporarily unavailable. Try again.";

export async function generateJourneyResponse(data: GenerateJourneyInput) {
  try {
    return data.provider === "gemini"
      ? await generateOnce(data, 1)
      : await generateWithOpenRouter(data);
  } catch (caught) {
    const error =
      caught instanceof GenerationError
        ? caught
        : new GenerationError(
            GenerationErrorCategory.PROVIDER_ERROR,
            GENERATION_UNAVAILABLE_MESSAGE,
          );

    if (process.env["NODE_ENV"] !== "production") {
      console.warn("AI journey generation failed", {
        provider: data.provider,
        attempt: error.attempt,
        status: error.status,
        category: error.category,
      });
    }

    throw new GenerationError(error.category, GENERATION_UNAVAILABLE_MESSAGE, {
      ...(error.status !== undefined ? { status: error.status } : {}),
      ...(error.attempt !== undefined ? { attempt: error.attempt } : {}),
    });
  }
}

export const generateJourney = createServerFn({ method: "POST" })
  .validator((data: GenerateJourneyInput) => inputSchema.parse(data))
  .handler(async ({ data }) => generateJourneyResponse(data));
