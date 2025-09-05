// routes/commentRoutes.js
import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

// ➕ Add comment
router.post("/add", async (req, res) => {
  try {
    const { userId, userName, content, novelId, chapterId } = req.body;
    if (!userId || !content || (!novelId && !chapterId)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newComment = new Comment({
      userId,
      userName: userName || "",
      content,
      novelId: novelId || null,
      chapterId: chapterId || null,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// 📖 Get comments by novel or chapter
router.get("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    let filter = {};
    if (type === "novel") filter = { novelId: id };
    if (type === "chapter") filter = { chapterId: id };

    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
