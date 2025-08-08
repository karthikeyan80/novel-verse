import Chapter from '../models/Chapter.js';

export const createChapter = async (req, res) => {
  try {
    const { novel, chapterTitle, content, chapterNumber } = req.body;

    const newChapter = new Chapter({
      novel,
      chapterTitle,
      content,
      chapterNumber,
    });

    await newChapter.save(); 
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getChaptersByNovel = async (req, res) => {
  try {
    const { novelId } = req.params;
    const chapters = await Chapter.find({ novel: novelId }).sort({ chapterNumber: 1 });
    res.status(200).json(chapters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
