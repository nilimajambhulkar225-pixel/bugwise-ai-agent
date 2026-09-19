const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 160 },
    description: { type: String, required: true, trim: true, maxlength: 10000 },
    programmingLanguage: { type: String, required: true, trim: true },
    errorMessage: { type: String, trim: true, default: "" },
    expectedBehavior: { type: String, trim: true, default: "" },
    actualBehavior: { type: String, trim: true, default: "" },
    stepsToReproduce: { type: String, trim: true, default: "" },
    category: { type: String, required: true, trim: true },
    severity: { type: String, required: true, trim: true },
    priority: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    possibleCause: { type: String, required: true, trim: true },
    suggestedFix: { type: String, required: true, trim: true },
    developerAdvice: { type: String, required: true, trim: true },
    testingSuggestions: { type: [String], default: [] },
    isSaved: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Analysis", analysisSchema);
