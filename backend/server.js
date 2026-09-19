require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const analysisRoutes = require("./routes/analysisRoutes");
const healthRoutes = require("./routes/healthRoutes");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", healthRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/analyses", analysisRoutes);
app.use("/api/analyze-bug", analysisRoutes);
app.use(errorMiddleware);

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
      console.log("MongoDB connected");
    } catch (error) {
      console.error("MongoDB connection failed:", error.message);
    }
  } else {
    console.warn("MONGODB_URI is not configured; persistence endpoints will return 503.");
  }

  app.listen(PORT, () => {
    console.log(`BugWise backend running on http://localhost:${PORT}`);
  });
}

startServer();
