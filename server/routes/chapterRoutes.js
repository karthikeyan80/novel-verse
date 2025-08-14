import express from "express";
import { addChapter, getChaptersByNovel, getChapter } from "../controllers/chapterController.js";

const router = express.Router();

// POST - Add chapter
router.post("/", addChapter);

// GET - All chapters for a specific novel
router.get("/novel/:novelId", getChaptersByNovel);

// GET - Single chapter
router.get("/:id", getChapter);

export default router;
