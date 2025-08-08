import express from 'express';
import { createNovel, getAllNovels } from '../controllers/novelController.js';

const router = express.Router();

router.post('/create', createNovel);
router.get('/all', getAllNovels);

export default router;
