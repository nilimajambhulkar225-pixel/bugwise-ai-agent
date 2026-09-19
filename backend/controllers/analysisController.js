const Analysis = require("../models/Analysis");
const { analyzeBug } = require("../services/geminiService");

const optionalFields = [
  "errorMessage",
  "expectedBehavior",
  "actualBehavior",
  "stepsToReproduce",
];

function validateBugInput(body) {
  const required = ["title", "description", "programmingLanguage"];
  const missing = required.filter(
    (field) => typeof body[field] !== "string" || !body[field].trim(),
  );
  if (missing.length) {
    const error = new Error(`${missing.join(", ")} ${missing.length === 1 ? "is" : "are"} required`);
    error.statusCode = 400;
    throw error;
  }
}

function ensureDatabase() {
  if (Analysis.db.readyState !== 1) {
    const error = new Error("Database is unavailable");
    error.statusCode = 503;
    throw error;
  }
}

async function createAnalysis(req, res) {
  validateBugInput(req.body);
  ensureDatabase();

  const bug = {
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    programmingLanguage: req.body.programmingLanguage.trim(),
  };
  optionalFields.forEach((field) => {
    bug[field] = typeof req.body[field] === "string" ? req.body[field].trim() : "";
  });

  const result = await analyzeBug(bug);
  const analysis = await Analysis.create({ ...bug, ...result });
  res.status(201).json({ success: true, analysis });
}

async function listAnalyses(req, res) {
  ensureDatabase();
  const filter = {};
  ["category", "severity", "priority", "programmingLanguage"].forEach((field) => {
    if (req.query[field]) filter[field] = req.query[field];
  });
  if (req.query.isSaved === "true" || req.query.isSaved === "false") {
    filter.isSaved = req.query.isSaved === "true";
  }
  if (req.query.search) {
    filter.$or = [
      { title: { $regex: req.query.search, $options: "i" } },
      { summary: { $regex: req.query.search, $options: "i" } },
    ];
  }

  const analyses = await Analysis.find(filter).sort({ createdAt: -1 }).lean();
  res.json({ success: true, analyses });
}

async function getAnalysis(req, res) {
  ensureDatabase();
  const analysis = await Analysis.findById(req.params.id).lean();
  if (!analysis) {
    const error = new Error("Analysis not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, analysis });
}

async function deleteAnalysis(req, res) {
  ensureDatabase();
  const analysis = await Analysis.findByIdAndDelete(req.params.id);
  if (!analysis) {
    const error = new Error("Analysis not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, message: "Analysis deleted" });
}

async function updateSavedStatus(req, res) {
  ensureDatabase();
  const analysis = await Analysis.findByIdAndUpdate(
    req.params.id,
    { isSaved: Boolean(req.body.isSaved) },
    { new: true, runValidators: true },
  ).lean();
  if (!analysis) {
    const error = new Error("Analysis not found");
    error.statusCode = 404;
    throw error;
  }
  res.json({ success: true, analysis });
}

module.exports = {
  createAnalysis,
  listAnalyses,
  getAnalysis,
  deleteAnalysis,
  updateSavedStatus,
};
