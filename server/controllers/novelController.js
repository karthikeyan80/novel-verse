import Novel from "../models/Novel.js";

export const createNovel = async (req, res) => {
  try {
    const { title, authorName, description, coverImage, genres, uploadedBy } =
      req.body;

    // Validate required fields
    if (!title || !authorName) {
      return res.status(400).json({
        message: "Title and author name are required fields",
      });
    }

    const newNovel = new Novel({
      title,
      authorName,
      description: description || "",
      coverImage: coverImage || "",
      genres: genres || [],
      uploadedBy: uploadedBy || null,
    });

    await newNovel.save();

    // ✅ Send response only once
    console.log("Novel created successfully:", newNovel);
    return res.status(201).json(newNovel);
  } catch (error) {
    console.error("Error creating novel:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: "Validation error",
        details: error.message,
      });
    }

    return res.status(500).json({ message: error.message });
  }
};

export const getAllNovels = async (req, res) => {
  try {
    console.log("Fetching all novels...");

    // Simplified query without population for now
    const novels = await Novel.find();
    console.log(`Found ${novels.length} novels`);

    res.status(200).json(novels);
  } catch (error) {
    console.error("Error in getAllNovels:", error);
    res.status(500).json({
      message: "Failed to fetch novels",
      error: error.message,
    });
  }
};
