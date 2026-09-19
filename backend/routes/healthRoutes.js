const router = require("express").Router();

router.get("/", (req, res) => {
  res.json({ success: true, message: "BugWise AI backend is running" });
});

module.exports = router;
