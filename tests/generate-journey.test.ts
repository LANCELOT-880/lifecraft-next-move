import assert from "node:assert/strict";
import test from "node:test";

import {
  GenerationError,
  GenerationErrorCategory,
  classifyGenerationFailure,
  generateJourneyResponse,
  getNextGenerationProvider,
  normalizeGeneratedJourney,
} from "../src/lib/journey/generateJourney.ts";

const generationInput = {
  goal: "Learn web development",
  why: "Build a personal project",
  dailyTime: "30 minutes",
  targetDate: "2027-01-01",
  provider: "gemini" as const,
};

function validJourney() {
  return {
    title: "Learn web development",
    description: "Build practical web development skills.",
    categoryLabel: "Technology",
    phases: Array.from({ length: 4 }, (_, phaseIndex) => ({
      title: `Phase ${phaseIndex + 1}`,
      summary: "Build a focused foundation.",
      tasks: Array.from({ length: 3 }, (_, taskIndex) => ({
        title: `Complete focused task ${taskIndex + 1}`,
        estimatedMinutes: 30,
        difficulty: "Easy",
        impact: "Medium impact",
        lesson: {
          overview: "Understand this practical concept.",
          learn: ["Study the core concept"],
          exercise: "Apply the concept in a small example.",
          steps: ["Read the concept", "Build a small example"],
          successCriteria: ["The example works as intended"],
          resourceQueries: [],
        },
      })),
    })),
  };
}

function modelResponse(text: string): Response {
  return new Response(
    JSON.stringify({
      steps: [{ type: "model_output", content: [{ type: "text", text }] }],
    }),
    { status: 200, headers: { "Content-Type": "application/json" } },
  );
}

function openRouterResponse(text: string, status = 200): Response {
  return new Response(
    JSON.stringify({
      choices: [{ message: { role: "assistant", content: text } }],
    }),
    { status, headers: { "Content-Type": "application/json" } },
  );
}

async function withMockedResponses<T>(
  responses: Array<Response | Error>,
  run: (
    getCallCount: () => number,
    getCalls: () => Array<{ url: string; init?: RequestInit }>,
  ) => Promise<T>,
  options: { openRouterApiKey?: string } = {},
): Promise<T> {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env["GEMINI_API_KEY"];
  const originalOpenRouterApiKey = process.env["OPENROUTER_API_KEY"];
  let callCount = 0;
  const calls: Array<{ url: string; init?: RequestInit }> = [];
  process.env["GEMINI_API_KEY"] = "test-api-key";
  delete process.env["OPENROUTER_API_KEY"];
  if (options.openRouterApiKey) {
    process.env["OPENROUTER_API_KEY"] = options.openRouterApiKey;
  }
  globalThis.fetch = async (input, init) => {
    calls.push({ url: String(input), init });
    const response = responses[callCount];
    callCount += 1;
    if (!response) throw new Error("Unexpected provider request");
    if (response instanceof Error) throw response;
    return response;
  };

  try {
    return await run(
      () => callCount,
      () => calls,
    );
  } finally {
    globalThis.fetch = originalFetch;
    if (originalOpenRouterApiKey === undefined) {
      delete process.env["OPENROUTER_API_KEY"];
    } else {
      process.env["OPENROUTER_API_KEY"] = originalOpenRouterApiKey;
    }
    if (originalApiKey === undefined) {
      delete process.env["GEMINI_API_KEY"];
    } else {
      process.env["GEMINI_API_KEY"] = originalApiKey;
    }
  }
}

test("normalizeGeneratedJourney clamps numeric limits and caps arrays", () => {
  const normalized = normalizeGeneratedJourney({
    title: "Test goal",
    description: "A complete goal",
    categoryLabel: "Learning",
    phases: [
      {
        title: "Phase One",
        summary: "A strong start",
        tasks: [
          {
            title: "Task name",
            estimatedMinutes: 999,
            difficulty: "Hard",
            impact: "High impact",
            lesson: {
              overview: "Overview",
              learn: Array.from({ length: 12 }, (_, index) => `Point ${index}`),
              exercise: "Exercise",
              steps: Array.from({ length: 12 }, (_, index) => `Step ${index}`),
              successCriteria: Array.from({ length: 12 }, (_, index) => `Result ${index}`),
              reflection: "",
              resourceQueries: [
                { title: "Alpha", query: "alpha search", type: "web" },
                { title: "Beta", query: "beta search", type: "video" },
                { title: "Gamma", query: "gamma search", type: "web" },
                { title: "Delta", query: "delta search", type: "video" },
                { title: "Epsilon", query: "epsilon search", type: "web" },
              ],
            },
          },
          {
            title: "Second task",
            estimatedMinutes: 25,
            difficulty: "Easy",
            impact: "Medium impact",
            lesson: {
              overview: "Overview 2",
              learn: ["A", "B", "C"],
              exercise: "Exercise 2",
              steps: ["Step 1", "Step 2", "Step 3"],
              successCriteria: ["Done", "Done", "Done"],
              resourceQueries: [{ title: "Zeta", query: "zeta search", type: "video" }],
            },
          },
          {
            title: "Third task",
            estimatedMinutes: 35,
            difficulty: "Medium",
            impact: "Low impact",
            lesson: {
              overview: "Overview 3",
              learn: ["Alpha", "Beta", "Gamma"],
              exercise: "Exercise 3",
              steps: ["First", "Second", "Third"],
              successCriteria: ["Complete", "Complete", "Complete"],
              resourceQueries: [{ title: "Eta", query: "eta search", type: "web" }],
            },
          },
        ],
      },
      {
        title: "Phase Two",
        summary: "Another strong step",
        tasks: [
          {
            title: "Task four",
            estimatedMinutes: 40,
            difficulty: "Easy",
            impact: "Medium impact",
            lesson: {
              overview: "Overview 4",
              learn: ["A", "B", "C"],
              exercise: "Exercise 4",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Theta", query: "theta search", type: "web" }],
            },
          },
          {
            title: "Task five",
            estimatedMinutes: 45,
            difficulty: "Medium",
            impact: "High impact",
            lesson: {
              overview: "Overview 5",
              learn: ["A", "B", "C"],
              exercise: "Exercise 5",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Iota", query: "iota search", type: "video" }],
            },
          },
          {
            title: "Task six",
            estimatedMinutes: 50,
            difficulty: "Hard",
            impact: "High impact",
            lesson: {
              overview: "Overview 6",
              learn: ["A", "B", "C"],
              exercise: "Exercise 6",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Kappa", query: "kappa search", type: "web" }],
            },
          },
        ],
      },
      {
        title: "Phase Three",
        summary: "Another strong step",
        tasks: [
          {
            title: "Task seven",
            estimatedMinutes: 55,
            difficulty: "Hard",
            impact: "High impact",
            lesson: {
              overview: "Overview 7",
              learn: ["A", "B", "C"],
              exercise: "Exercise 7",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Lambda", query: "lambda search", type: "video" }],
            },
          },
          {
            title: "Task eight",
            estimatedMinutes: 60,
            difficulty: "Medium",
            impact: "Medium impact",
            lesson: {
              overview: "Overview 8",
              learn: ["A", "B", "C"],
              exercise: "Exercise 8",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Mu", query: "mu search", type: "video" }],
            },
          },
          {
            title: "Task nine",
            estimatedMinutes: 65,
            difficulty: "Easy",
            impact: "Low impact",
            lesson: {
              overview: "Overview 9",
              learn: ["A", "B", "C"],
              exercise: "Exercise 9",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Nu", query: "nu search", type: "web" }],
            },
          },
        ],
      },
      {
        title: "Phase Four",
        summary: "Another strong step",
        tasks: [
          {
            title: "Task ten",
            estimatedMinutes: 70,
            difficulty: "Easy",
            impact: "Medium impact",
            lesson: {
              overview: "Overview 10",
              learn: ["A", "B", "C"],
              exercise: "Exercise 10",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Xi", query: "xi search", type: "video" }],
            },
          },
          {
            title: "Task eleven",
            estimatedMinutes: 75,
            difficulty: "Medium",
            impact: "High impact",
            lesson: {
              overview: "Overview 11",
              learn: ["A", "B", "C"],
              exercise: "Exercise 11",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Omicron", query: "omicron search", type: "web" }],
            },
          },
          {
            title: "Task twelve",
            estimatedMinutes: 80,
            difficulty: "Hard",
            impact: "High impact",
            lesson: {
              overview: "Overview 12",
              learn: ["A", "B", "C"],
              exercise: "Exercise 12",
              steps: ["One", "Two", "Three"],
              successCriteria: ["Check", "Check", "Check"],
              resourceQueries: [{ title: "Pi", query: "pi search", type: "web" }],
            },
          },
        ],
      },
    ],
  });

  assert.equal(normalized?.phases[0]?.tasks[0]?.estimatedMinutes, 120);
  assert.equal(normalized?.phases[0]?.tasks[0]?.lesson.learn.length, 8);
  assert.equal(normalized?.phases[0]?.tasks[0]?.lesson.steps.length, 8);
  assert.equal(normalized?.phases[0]?.tasks[0]?.lesson.successCriteria.length, 8);
  assert.equal(normalized?.phases[0]?.tasks[0]?.lesson.resourceQueries.length, 4);
  assert.equal(normalized?.phases[0]?.tasks[0]?.lesson.reflection, undefined);
});

test("classifyGenerationFailure returns safe categories for common provider failures", () => {
  assert.equal(
    classifyGenerationFailure({ status: 429 }).category,
    GenerationErrorCategory.RATE_LIMIT,
  );
  assert.equal(
    classifyGenerationFailure({ isAbort: true }).category,
    GenerationErrorCategory.TIMEOUT,
  );
  assert.equal(
    classifyGenerationFailure({ isNetwork: true }).category,
    GenerationErrorCategory.NETWORK,
  );
  assert.equal(
    classifyGenerationFailure({ isInvalidJson: true }).category,
    GenerationErrorCategory.INVALID_RESPONSE,
  );
  assert.equal(
    classifyGenerationFailure({ zodIssues: [{ path: ["phases", "0", "tasks", "0", "lesson"] }] })
      .category,
    GenerationErrorCategory.VALIDATION_ERROR,
  );
  assert.equal(
    classifyGenerationFailure({ status: 401 }).category,
    GenerationErrorCategory.CONFIGURATION_ERROR,
  );
});

test("retries an invalid structured response once and succeeds with valid output", async () => {
  await withMockedResponses(
    [modelResponse("not valid JSON"), modelResponse(JSON.stringify(validJourney()))],
    async (getCallCount) => {
      const generated = await generateJourneyResponse(generationInput);
      assert.equal(generated.title, "Learn web development");
      assert.equal(getCallCount(), 2);
    },
  );
});

test("retries a schema validation failure once and succeeds with valid output", async () => {
  const invalidJourney = { ...validJourney(), title: "x" };
  await withMockedResponses(
    [modelResponse(JSON.stringify(invalidJourney)), modelResponse(JSON.stringify(validJourney()))],
    async (getCallCount) => {
      const generated = await generateJourneyResponse(generationInput);
      assert.equal(generated.title, "Learn web development");
      assert.equal(getCallCount(), 2);
    },
  );
});

test("returns a safe validation error after two invalid generated responses", async () => {
  const invalidJourney = { ...validJourney(), title: "x" };
  await withMockedResponses(
    [modelResponse(JSON.stringify(invalidJourney)), modelResponse(JSON.stringify(invalidJourney))],
    async (getCallCount) => {
      await assert.rejects(generateJourneyResponse(generationInput), (error: unknown) => {
        assert.ok(error instanceof GenerationError);
        assert.equal(error.category, GenerationErrorCategory.VALIDATION_ERROR);
        assert.equal(error.attempt, 2);
        assert.equal(error.message, "AI generation is temporarily unavailable. Try again.");
        assert.doesNotMatch(error.message, /"phases"|"title"/);
        return true;
      });
      assert.equal(getCallCount(), 2);
    },
  );
});

test("does not retry a configuration error", async () => {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env["GEMINI_API_KEY"];
  const originalOpenRouterApiKey = process.env["OPENROUTER_API_KEY"];
  let callCount = 0;
  delete process.env["GEMINI_API_KEY"];
  delete process.env["OPENROUTER_API_KEY"];
  globalThis.fetch = async () => {
    callCount += 1;
    return modelResponse(JSON.stringify(validJourney()));
  };

  try {
    await assert.rejects(generateJourneyResponse(generationInput), (error: unknown) => {
      assert.ok(error instanceof GenerationError);
      assert.equal(error.category, GenerationErrorCategory.CONFIGURATION_ERROR);
      return true;
    });
    assert.equal(callCount, 0);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalApiKey !== undefined) process.env["GEMINI_API_KEY"] = originalApiKey;
    if (originalOpenRouterApiKey !== undefined) {
      process.env["OPENROUTER_API_KEY"] = originalOpenRouterApiKey;
    }
  }
  await withMockedResponses(
    [
      new Response("Invalid API key", { status: 400 }),
      modelResponse(JSON.stringify(validJourney())),
    ],
    async (getCallCount) => {
      await assert.rejects(generateJourneyResponse(generationInput), (error: unknown) => {
        assert.ok(error instanceof GenerationError);
        assert.equal(error.category, GenerationErrorCategory.CONFIGURATION_ERROR);
        return true;
      });
      assert.equal(getCallCount(), 1);
    },
  );
});

test("initial generation uses Gemini only", async () => {
  await withMockedResponses(
    [modelResponse(JSON.stringify(validJourney()))],
    async (getCallCount, getCalls) => {
      const generated = await generateJourneyResponse(generationInput);
      assert.equal(generated.title, "Learn web development");
      assert.equal(getCallCount(), 1);
      assert.match(getCalls()[0]?.url ?? "", /generativelanguage\.googleapis\.com/);
    },
    { openRouterApiKey: "test-openrouter-key" },
  );
});

test("Gemini failure does not automatically call OpenRouter", async () => {
  await withMockedResponses(
    [new Response("Provider unavailable", { status: 400 })],
    async (getCallCount, getCalls) => {
      await assert.rejects(generateJourneyResponse(generationInput), (error: unknown) => {
        assert.ok(error instanceof GenerationError);
        assert.equal(error.message, "AI generation is temporarily unavailable. Try again.");
        return true;
      });
      assert.equal(getCallCount(), 1);
      assert.match(getCalls()[0]?.url ?? "", /generativelanguage\.googleapis\.com/);
    },
    { openRouterApiKey: "test-openrouter-key" },
  );
});

test("an explicit OpenRouter attempt calls only OpenRouter and validates its response", async () => {
  await withMockedResponses(
    [openRouterResponse(JSON.stringify(validJourney()))],
    async (getCallCount, getCalls) => {
      const generated = await generateJourneyResponse({
        ...generationInput,
        provider: "openrouter",
      });
      assert.equal(generated.title, "Learn web development");
      assert.equal(generated.phases.length, 4);
      assert.equal(generated.phases[0]?.tasks.length, 3);
      assert.equal(getCallCount(), 1);
      assert.match(getCalls()[0]?.url ?? "", /openrouter\.ai\/api\/v1\/chat\/completions/);
      const requestBody = JSON.parse(String(getCalls()[0]?.init?.body)) as {
        model?: string;
        response_format?: { type?: string };
      };
      assert.equal(requestBody.model, "openrouter/free");
      assert.equal(requestBody.response_format?.type, "json_object");
    },
    { openRouterApiKey: "test-openrouter-key" },
  );
});

test("an explicit OpenRouter attempt with no server key fails safely without calling Gemini", async () => {
  await withMockedResponses([], async (getCallCount) => {
    await assert.rejects(
      generateJourneyResponse({ ...generationInput, provider: "openrouter" }),
      (error: unknown) => {
        assert.ok(error instanceof GenerationError);
        assert.equal(error.category, GenerationErrorCategory.CONFIGURATION_ERROR);
        assert.equal(error.message, "AI generation is temporarily unavailable. Try again.");
        return true;
      },
    );
    assert.equal(getCallCount(), 0);
  });
});

test("OpenRouter malformed JSON is retried once then rejected safely", async () => {
  await withMockedResponses(
    [openRouterResponse("not valid JSON"), openRouterResponse("still not valid JSON")],
    async (getCallCount) => {
      await assert.rejects(
        generateJourneyResponse({ ...generationInput, provider: "openrouter" }),
        (error: unknown) => {
          assert.ok(error instanceof GenerationError);
          assert.equal(error.category, GenerationErrorCategory.INVALID_RESPONSE);
          assert.equal(error.message, "AI generation is temporarily unavailable. Try again.");
          assert.equal(error.cause, undefined);
          return true;
        },
      );
      assert.equal(getCallCount(), 2);
    },
    { openRouterApiKey: "test-openrouter-key" },
  );
});

test("provider choice alternates after every failed manual attempt", () => {
  let provider: "gemini" | "openrouter" = "gemini";
  const sequence = [provider];
  for (let attempt = 0; attempt < 4; attempt += 1) {
    provider = getNextGenerationProvider(provider);
    sequence.push(provider);
  }
  assert.deepEqual(sequence, ["gemini", "openrouter", "gemini", "openrouter", "gemini"]);
});

test("OpenRouter failure does not automatically call Gemini", async () => {
  await withMockedResponses(
    [
      new Response("Unexpected Gemini fallback", { status: 500 }),
      new Response("Rate limited", { status: 429 }),
      new Response("Still rate limited", { status: 429 }),
    ],
    async (getCallCount, getCalls) => {
      await assert.rejects(
        generateJourneyResponse({ ...generationInput, provider: "openrouter" }),
        (error: unknown) => {
          assert.ok(error instanceof GenerationError);
          assert.equal(error.message, "AI generation is temporarily unavailable. Try again.");
          return true;
        },
      );
      assert.equal(getCallCount(), 2);
      assert.ok(getCalls().every((call) => call.url.includes("openrouter.ai")));
    },
    { openRouterApiKey: "test-openrouter-key" },
  );
});

test("OpenRouter retries a 429 once and succeeds", async () => {
  await withMockedResponses(
    [
      new Response("Rate limited", { status: 429 }),
      openRouterResponse(JSON.stringify(validJourney())),
    ],
    async (getCallCount) => {
      const generated = await generateJourneyResponse({
        ...generationInput,
        provider: "openrouter",
      });
      assert.equal(generated.title, "Learn web development");
      assert.equal(getCallCount(), 2);
    },
    { openRouterApiKey: "test-openrouter-key" },
  );
});

test("OpenRouter retries a network failure once and succeeds", async () => {
  await withMockedResponses(
    [new TypeError("Failed to fetch"), openRouterResponse(JSON.stringify(validJourney()))],
    async (getCallCount) => {
      const generated = await generateJourneyResponse({
        ...generationInput,
        provider: "openrouter",
      });
      assert.equal(generated.title, "Learn web development");
      assert.equal(getCallCount(), 2);
    },
    { openRouterApiKey: "test-openrouter-key" },
  );
});

test("provider API keys are never included in generated output or final errors", async () => {
  const key = "secret-test-openrouter-key";
  await withMockedResponses(
    [new Response("OpenRouter unavailable", { status: 400 })],
    async () => {
      try {
        await generateJourneyResponse({ ...generationInput, provider: "openrouter" });
        assert.fail("Expected OpenRouter generation to fail");
      } catch (error) {
        assert.ok(error instanceof GenerationError);
        assert.doesNotMatch(JSON.stringify(error), new RegExp(key));
        assert.doesNotMatch(error.message, new RegExp(key));
      }
    },
    { openRouterApiKey: key },
  );
});
