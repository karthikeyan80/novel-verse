import Chapter from "../models/Chapter.js";

// Add new chapter
export const addChapter = async (req, res) => {
  try {
    const { novel, chapterTitle, content, chapterNumber } = req.body;

    if (!novel || !chapterTitle || !content || !chapterNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newChapter = new Chapter({ novel, chapterTitle, content, chapterNumber });
    await newChapter.save();

    res.status(201).json(newChapter);
  } catch (error) {
    console.error("Error adding chapter:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all chapters for a novel
export const getChaptersByNovel = async (req, res) => {
  try {
    const { novelId } = req.params;
    const chapters = await Chapter.find({ novel: novelId }).sort({ chapterNumber: 1 });

    res.json(chapters);
  } catch (error) {
    console.error("Error fetching chapters:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get single chapter
export const getChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id);

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error);
    res.status(500).json({ message: "Server error" });
  }
};
