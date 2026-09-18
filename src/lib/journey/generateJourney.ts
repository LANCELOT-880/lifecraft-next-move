import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  goal: z.string().trim().min(1).max(240),
  why: z.string().trim().max(600),
  dailyTime: z.string().trim().min(1).max(30),
  targetDate: z.string().trim().max(20),
});

const resourceQuerySchema = z.object({
  title: z.string().trim().min(1).max(120),
  query: z.string().trim().min(3).max(240),
  type: z.enum(["web", "video"]),
});

const generatedTaskSchema = z.object({
  title: z.string().trim().min(3).max(160),
  estimatedMinutes: z.number().finite().min(1).max(240),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  impact: z.enum(["Low impact", "Medium impact", "High impact"]),
  lesson: z.object({
    overview: z.string().trim().min(1).max(800),
    learn: z.array(z.string().trim().min(1).max(500)).min(1).max(8),
    exercise: z.string().trim().min(1).max(1000),
    steps: z.array(z.string().trim().min(1).max(400)).min(1).max(8),
    successCriteria: z.array(z.string().trim().min(1).max(300)).min(1).max(8),
    reflection: z.string().trim().max(500).optional(),
    resourceQueries: z.array(resourceQuerySchema).max(4),
  }),
});

const generatedJourneySchema = z.object({
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(1).max(500),
  categoryLabel: z.string().trim().min(1).max(80),
  phases: z.array(
    z.object({
      title: z.string().trim().min(2).max(100),
      summary: z.string().trim().min(1).max(300),
      tasks: z.array(generatedTaskSchema).min(3).max(5),
    }),
  ).min(4).max(6),
});

export type GeneratedJourneyResponse = z.infer<typeof generatedJourneySchema>;
export type GenerateJourneyInput = z.infer<typeof inputSchema>;

const responseSchema = {
  type: "object",
  properties: {
    title: {
      type: "string",
    },
    description: {
      type: "string",
    },
    categoryLabel: {
      type: "string",
    },
    phases: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          summary: {
            type: "string",
          },
          tasks: {
            type: "array",
            items: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                },
                estimatedMinutes: {
                  type: "number",
                },
                difficulty: {
                  type: "string",
                  enum: ["Easy", "Medium", "Hard"],
                },
                impact: {
                  type: "string",
                  enum: [
                    "Low impact",
                    "Medium impact",
                    "High impact",
                  ],
                },
                lesson: {
                  type: "object",
                  properties: {
                    overview: {
                      type: "string",
                    },
                    learn: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    exercise: {
                      type: "string",
                    },
                    steps: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    successCriteria: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
                    reflection: {
                      type: "string",
                    },
                    resourceQueries: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: {
                            type: "string",
                          },
                          query: {
                            type: "string",
                          },
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
                },
              },
              required: [
                "title",
                "estimatedMinutes",
                "difficulty",
                "impact",
                "lesson",
              ],
            },
          },
        },
        required: ["title", "summary", "tasks"],
      },
    },
  },
  required: [
    "title",
    "description",
    "categoryLabel",
    "phases",
  ],
};

const prompt = (input: GenerateJourneyInput) => `
Create a practical beginner-friendly learning curriculum for this goal: "${input.goal}".
Why it matters: "${input.why || "Not specified"}".
Available daily time: ${input.dailyTime}.
Target date: ${input.targetDate || "Open-ended"}.

Assume the learner is a beginner unless the goal explicitly says otherwise. Build prerequisites before advanced topics and progress from fundamentals to guided practice, application, and review. Generate 4 to 6 phases with 3 to 5 specific tasks per phase. Adapt task size to the daily time: smaller tasks for 15 or 30 minutes, broader tasks for 1 hour or Flexible.

Never use vague task titles such as "learn the fundamentals", "practice the skill", or "complete a practical task". Name the exact concept, technique, problem type, artifact, or performance being learned. Every lesson must contain actual subject-specific guidance, a practical exercise, ordered steps, and observable success criteria. Suggest resource search queries only, never URLs. Prefer reputable sources when relevant, such as official documentation, universities, Khan Academy, MIT OpenCourseWare, MDN, language-learning references, or open educational resources.

Return only the structured JSON requested by the response schema.
`;

function extractText(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;
  const interaction = payload as {
    status?: unknown;
    steps?: unknown;
  };
  if (!Array.isArray(interaction.steps)) return null;

  return interaction.steps
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
    )?.text ?? null;
}

export const generateJourney = createServerFn({ method: "POST" })
  .validator((data: GenerateJourneyInput) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["GEMINI_API_KEY"];
    const model = "gemini-3.6-flash";
    const requestUrl = "https://generativelanguage.googleapis.com/v1beta/interactions";
    if (!apiKey) throw new Error("AI journey generation is not configured.");

    console.log("Gemini model:", model);
    console.log("Gemini request URL:", requestUrl);
    console.log("Gemini request keys:", ["model", "input", "response_format"]);
    console.log("Gemini response_format structure:", {
      type: "text",
      mime_type: "application/json",
      schema: "generatedJourneyJsonSchema",
    });
    let response: Response;
    try {
      response = await fetch(requestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          model,
          input: prompt(data),
          response_format: {
            type: "text",
            mime_type: "application/json",
            schema: responseSchema,
          },
        }),
      });
    } catch (error) {
      console.error(
        "Gemini fetch exception:",
        error instanceof Error
          ? { name: error.name, message: error.message, cause: error.cause }
          : String(error),
      );
      throw new Error("AI journey generation failed. Please try again.");
    }

    console.log("Gemini HTTP status:", response.status);
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Gemini error body:", errorBody);
      throw new Error("AI journey generation failed. Please try again.");
    }

    let payload: unknown;
    try {
      payload = await response.json();
      if (payload && typeof payload === "object") {
        console.log("Gemini response keys:", Object.keys(payload));
      }
    } catch {
      throw new Error("AI journey generation returned an invalid response. Please try again.");
    }

    const text = extractText(payload);
    if (!text) {
      const interaction = payload as { status?: unknown; steps?: unknown };
      console.error("Gemini interaction status:", interaction.status);
      console.error(
        "Gemini interaction keys:",
        payload && typeof payload === "object" ? Object.keys(payload) : [],
      );
      console.error(
        "Gemini interaction step types:",
        Array.isArray(interaction.steps)
          ? interaction.steps.map((step) =>
              step && typeof step === "object" ? (step as { type?: unknown }).type : undefined,
            )
          : [],
      );
      throw new Error("AI journey generation returned no curriculum. Please try again.");
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error("AI journey generation returned malformed curriculum data. Please try again.");
    }

    const result = generatedJourneySchema.safeParse(parsed);
    if (!result.success) {
      console.error("Gemini journey schema validation failed", result.error.flatten());
      throw new Error("AI journey generation returned an incomplete curriculum. Please try again.");
    }

    return {
      ...result.data,
      phases: result.data.phases.slice(0, 6).map((phase) => ({
        ...phase,
        tasks: phase.tasks.slice(0, 5).map((task) => ({
          ...task,
          estimatedMinutes: Math.min(120, Math.max(10, Math.round(task.estimatedMinutes))),
          title: task.title.slice(0, 160),
          lesson: {
            ...task.lesson,
            learn: task.lesson.learn.slice(0, 8),
            steps: task.lesson.steps.slice(0, 8),
            successCriteria: task.lesson.successCriteria.slice(0, 8),
            resourceQueries: task.lesson.resourceQueries.slice(0, 4),
          },
        })),
      })),
    } satisfies GeneratedJourneyResponse;
  });
