import express from "express";
import {
  createNovel,
  getAllNovels,
  getNovelById,
  listGenres,
} from "../controllers/novelController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create a novel
router.post("/create", upload.single("coverImage"), createNovel);

// Get all novels (with optional search/filter)
router.get("/", getAllNovels);

// List distinct genres
router.get("/genres", listGenres);

// Get single novel by ID
router.get("/:id", getNovelById);

export default router;
