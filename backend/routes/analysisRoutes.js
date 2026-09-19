const router = require("express").Router();
const {
  createAnalysis,
  listAnalyses,
  getAnalysis,
  deleteAnalysis,
  updateSavedStatus,
} = require("../controllers/analysisController");

router.post("/", createAnalysis);
router.get("/", listAnalyses);
router.get("/:id", getAnalysis);
router.patch("/:id/saved", updateSavedStatus);
router.delete("/:id", deleteAnalysis);

module.exports = router;
