// routes/progressRoutes.js
import express from "express";
import Progress from "../models/Progress.js";

const router = express.Router();

// Save/update reading progress with position
router.post("/save", async (req, res) => {
  try {
    const { userId, novelId, chapterId, readingPosition = 0 } = req.body;

    if (!userId || !novelId || !chapterId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId, novelId },
      {
        lastChapterId: chapterId,
        readingPosition,
        lastReadAt: new Date(),
      },
      { new: true, upsert: true }
    );

    res.json(progress);
  } catch (error) {
    console.error("Error saving progress:", error);
    res.status(500).json({ error: "Error saving progress" });
  }
});

// Mark chapter as read (completed)
router.post("/mark-read", async (req, res) => {
  try {
    const { userId, novelId, chapterId } = req.body;

    if (!userId || !novelId || !chapterId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const progress = await Progress.findOneAndUpdate(
      { userId, novelId },
      {
        $addToSet: { readChapters: chapterId },
        lastChapterId: chapterId,
        readingPosition: 0, // Reset position when chapter is completed
        lastReadAt: new Date(),
      },
      { new: true, upsert: true }
    );

    res.json(progress);
  } catch (error) {
    console.error("Error marking chapter as read:", error);
    res.status(500).json({ error: "Error marking chapter as read" });
  }
});

// Get progress for a user + novel
router.get("/:userId/:novelId", async (req, res) => {
  try {
    const { userId, novelId } = req.params;

    const progress = await Progress.findOne({ userId, novelId })
      .populate({
        path: "lastChapterId",
        select: "_id chapterTitle chapterNumber novel",
      })
      .lean(); // Convert to plain JavaScript object without heavy fields

    if (!progress) {
      return res.json({
        lastChapterId: null,
        readingPosition: 0,
        readChapters: [],
        lastReadAt: null,
      });
    }

    // Convert ObjectIds to strings in readChapters array
    const progressWithStringIds = {
      ...progress,
      readChapters: progress.readChapters?.map((id) => id.toString()) || [],
    };

    res.json(progressWithStringIds);
  } catch (error) {
    console.error("Error fetching progress:", error);
    res.status(500).json({ error: "Error fetching progress" });
  }
});

export default router;
