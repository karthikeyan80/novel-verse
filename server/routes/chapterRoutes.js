import express from "express";
import {
  addChapter,
  getChaptersByNovel,
  getChapter,
} from "../controllers/chapterController.js";
import { verifyClerkJWT } from "../middleware/verifyClerkJWT.js";

const router = express.Router();

// POST - Add chapter (restricted to novel owner)
router.post("/add", verifyClerkJWT, addChapter);

// GET - All chapters for a specific novel
router.get("/novel/:novelId", getChaptersByNovel);

// GET - Single chapter
router.get("/:id", getChapter);

export default router;
