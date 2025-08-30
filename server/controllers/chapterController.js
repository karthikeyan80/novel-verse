// chapterController.js
import Chapter from "../models/Chapter.js";
import Novel from "../models/Novel.js";

// Add new chapter (only the novel owner can add)
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

    // Authorization: allow only the creator (uploadedBy) to add a chapter
    // req.user is set by verifyClerkJWT middleware and should contain the Clerk user id as `sub`
    const requesterId = req.user?.sub; // Clerk's subject (user id)
    if (!requesterId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!novel.uploadedBy || novel.uploadedBy !== requesterId) {
      return res
        .status(403)
        .json({ message: "Only the novel author can add chapters" });
    }

    // Determine next chapter number
    const chapterCount = await Chapter.countDocuments({ novel: novelId });

    const newChapter = new Chapter({
      novel: novelId,
      chapterTitle,
      content,
      chapterNumber: chapterCount + 1,
    });

    await newChapter.save();

    res.status(201).json({
      message: "Chapter added successfully",
      chapter: newChapter,
    });
  } catch (error) {
    console.error("Error adding chapter:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all chapters for a novel
export const getChaptersByNovel = async (req, res) => {
  try {
    const { novelId } = req.params;

    const chapters = await Chapter.find({ novel: novelId })
      .sort({ chapterNumber: 1 })
      .select("chapterTitle chapterNumber createdAt"); // return only needed fields

    res.json(chapters);
  } catch (error) {
    console.error("Error fetching chapters:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get single chapter
export const getChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await Chapter.findById(id).populate(
      "novel",
      "title authorName"
    );

    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }

    res.json(chapter);
  } catch (error) {
    console.error("Error fetching chapter:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
