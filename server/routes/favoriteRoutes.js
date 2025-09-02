import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Add to favorites
router.post("/add", async (req, res) => {
  try {
    const { userId, novelId } = req.body;

    if (!userId || !novelId) {
      return res.status(400).json({ error: "userId and novelId are required" });
    }

    // userId is the Clerk ID in this app
    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    const alreadyFav = user.favorites.some((fav) => fav.toString() === novelId);
    if (!alreadyFav) {
      user.favorites.push(novelId);
      await user.save();
    }

    return res.json({
      message: "Novel added to favorites",
      favorites: user.favorites,
    });
  } catch (err) {
    console.error("/favorites/add error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
});

// Remove from favorites
router.post("/remove", async (req, res) => {
  try {
    const { userId, novelId } = req.body;

    if (!userId || !novelId) {
      return res.status(400).json({ error: "userId and novelId are required" });
    }

    const user = await User.findOne({ clerkId: userId });
    if (!user) return res.status(404).json({ error: "User not found" });

    user.favorites = user.favorites.filter(
      (favId) => favId.toString() !== novelId
    );
    await user.save();

    return res.json({
      message: "Novel removed from favorites",
      favorites: user.favorites,
    });
  } catch (err) {
    console.error("/favorites/remove error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
});

// Get favorites
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // Clerk ID

    const user = await User.findOne({ clerkId: userId }).populate("favorites");
    if (!user) return res.status(404).json({ error: "User not found" });

    return res.json(user.favorites || []);
  } catch (err) {
    console.error("/favorites/:userId error:", err);
    return res
      .status(500)
      .json({ error: err.message || "Internal Server Error" });
  }
});

export default router;
