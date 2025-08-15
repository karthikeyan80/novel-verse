// Add new chapter
import Chapter from "../models/Chapter.js";
import Novel from "../models/Novel.js";

export const addChapter = async (req, res) => {
  try {
    const { novelId, chapterTitle, content } = req.body;

    // Validate required fields
    if (!novelId || !chapterTitle || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if novel exists
    const novel = await Novel.findById(novelId);
    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    // Determine chapter number
    const chapterCount = await Chapter.countDocuments({ novel: novelId });

    const newChapter = new Chapter({
      novel: novelId,
      chapterTitle,
      content,
      chapterNumber: chapterCount + 1,
    });

    await newChapter.save();
    res.status(201).json({ message: "Chapter added successfully", chapter: newChapter });

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
