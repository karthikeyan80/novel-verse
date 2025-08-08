import express from 'express';
import { createChapter, getChaptersByNovel } from '../controllers/chapterController.js';

const router = express.Router();

router.post('/create', createChapter);
router.get('/:novelId', getChaptersByNovel);

export default router;
