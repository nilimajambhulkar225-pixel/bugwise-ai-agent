const { GoogleGenAI } = require("@google/genai");

const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  : null;

const schema = {
  category: "Frontend | Backend | Database | Authentication | Performance | Security | UI/UX | Other",
  programmingLanguage: "Detected or provided language",
  severity: "Critical | Major | Moderate | Minor",
  priority: "Critical | High | Medium | Low",
  summary: "Short explanation",
  possibleCause: "Likely technical causes, clearly marked as likely",
  suggestedFix: "Practical debugging suggestions",
  developerAdvice: "Advice for developers",
  testingSuggestions: ["Testing recommendation"],
};

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

function extractJson(text) {
  const withoutFences = text
    .replace(/^\s*```(?:json)?\s*/i, "")
    .replace(/\s*```\s*$/i, "")
    .trim();
  const start = withoutFences.indexOf("{");
  const end = withoutFences.lastIndexOf("}");

  if (start === -1 || end <= start) {
    throw new Error("Gemini returned no JSON object");
  }

  return JSON.parse(withoutFences.slice(start, end + 1));
}

function normalizeAnalysis(value, fallbackLanguage) {
  const requiredFields = [
    "category",
    "programmingLanguage",
    "severity",
    "priority",
    "summary",
    "possibleCause",
    "suggestedFix",
    "developerAdvice",
  ];

  for (const field of requiredFields) {
    if (typeof value[field] !== "string" || !value[field].trim()) {
      throw new Error(`Gemini response is missing ${field}`);
    }
  }

  if (!Array.isArray(value.testingSuggestions)) {
    throw new Error("Gemini response has invalid testingSuggestions");
  }

  return {
    ...value,
    programmingLanguage: value.programmingLanguage || fallbackLanguage,
    testingSuggestions: value.testingSuggestions.filter(
      (suggestion) => typeof suggestion === "string" && suggestion.trim(),
    ),
  };
}

async function analyzeBug(bug) {
  if (!ai) {
    const error = new Error("Gemini API is not configured");
    error.statusCode = 503;
    throw error;
  }

  const prompt = `You are a senior software debugging assistant. Analyze the supplied bug report carefully. Do not invent facts. Clearly distinguish likely causes from confirmed facts. Estimate severity and priority from user impact. Return only valid JSON, with no markdown or extra text, matching this exact shape:\n${JSON.stringify(schema, null, 2)}\n\nBug report:\n${JSON.stringify(bug, null, 2)}`;
  let lastError;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: { temperature: 0.2, responseMimeType: "application/json" },
      });
      return normalizeAnalysis(extractJson(response.text), bug.programmingLanguage);
    } catch (error) {
      lastError = error;
      if (attempt < 3) await sleep(1000 * 2 ** (attempt - 1));
    }
  }

  lastError.statusCode = 503;
  throw lastError;
}

module.exports = { analyzeBug };
