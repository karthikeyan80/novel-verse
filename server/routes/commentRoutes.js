import express from "express";
import Comment from "../models/Comment.js";
import User from "../models/User.js";

const router = express.Router();

// POST /api/comments
router.post("/", async (req, res) => {
  try {
    const { novelId, chapterId, content, clerkId } = req.body;

    if (!novelId || !content || !clerkId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Find the user by Clerk ID (since we sync Clerk → DB)
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newComment = new Comment({
      novelId,
      chapterId: chapterId || null,
      userId: user._id,
      content,
    });

    await newComment.save();

    // Populate user info for frontend display
    await newComment.populate("userId", "firstName lastName");

    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error posting comment:", error);
    res.status(500).json({ error: "Failed to post comment" });
  }
});

// GET /api/comments/:novelId
// Optional: pass ?chapterId=xxx to fetch chapter-specific comments
router.get("/:novelId", async (req, res) => {
  try {
    const { novelId } = req.params;
    const { chapterId } = req.query;

    const query = { novelId };
    if (chapterId) {
      query.chapterId = chapterId;
    }

    const comments = await Comment.find(query)
      .populate("userId", "firstName lastName")
      .sort({ createdAt: -1 }); // newest first

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});



export default router;
