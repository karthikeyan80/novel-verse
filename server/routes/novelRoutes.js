import express from 'express';
import { createNovel, getAllNovels } from '../controllers/novelController.js';
import Novel from '../models/Novel.js';
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });



router.post("/create", upload.single("coverImage"), createNovel);
router.get("/", getAllNovels);


router.post('/create', createNovel);
router.get('/all', getAllNovels);

router.get('/:id', async (req, res) => {
  try {
    const novel = await Novel.findById(req.params.id);

    if (!novel) {
      return res.status(404).json({ message: 'Novel not found' });
    }

    res.json(novel);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});
export default router;
