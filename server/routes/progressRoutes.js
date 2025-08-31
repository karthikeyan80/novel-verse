// routes/progressRoutes.js
import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

// Save/update progress
router.post("/save", async (req, res) => {
  try {
    const { userId, novelId, lastChapterId } = req.body;

    const progress = await Progress.findOneAndUpdate(
      { userId, novelId },
      { lastChapterId, lastReadAt: new Date() },
      { new: true, upsert: true }
    );

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error saving progress" });
  }
});

// Get progress for a user + novel
router.get("/:userId/:novelId", async (req, res) => {
  try {
    const { userId, novelId } = req.params;
    const progress = await Progress.findOne({ userId, novelId }).populate("lastChapterId");
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: "Error fetching progress" });
  }
});

export default router;
