import Novel from "../models/Novel.js";

export const createNovel = async (req, res) => {
  try {
    const { title, authorName, description, genres, uploadedBy } = req.body;

    if (!title || !authorName) {
      return res
        .status(400)
        .json({ message: "Title and author name are required" });
    }

    const newNovel = new Novel({
      title,
      authorName,
      description: description || "",
      coverImage: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
      genres: genres ? JSON.parse(genres) : [],
      uploadedBy: uploadedBy || null,
    });

    await newNovel.save();
    res.status(201).json(newNovel);
  } catch (error) {
    console.error("Error creating novel:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllNovels = async (req, res) => {
  try {
    console.log("Fetching all novels...");

    // Simplified query without population for now
    const novels = await Novel.find();
    console.log(`Found ${novels.length} novels`);

  // In backend getAllNovels
res.status(200).json(
  novels.map(novel => ({
    ...novel._doc,
    coverImage: novel.coverImage?.data
      ? `data:${novel.coverImage.contentType};base64,${novel.coverImage.data.toString('base64')}`
      : null
  }))
);

  } catch (error) {
    console.error("Error in getAllNovels:", error);
    res.status(500).json({
      message: "Failed to fetch novels",
      error: error.message,
    });
  }
};
