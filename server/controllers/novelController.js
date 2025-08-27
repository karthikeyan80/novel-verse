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
    console.log("Fetching novels with filters...");

    const { search, genre } = req.query; // ?search=magic&genre=fantasy
    const query = {};

    // Search in title or authorName (case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { authorName: { $regex: search, $options: "i" } }
      ];
    }

    // Filter by genre
    if (genre) {
      query.genres = genre;
    }

    const novels = await Novel.find(query);
    console.log(`Found ${novels.length} novels`);

    res.status(200).json(
      novels.map(novel => ({
        ...novel._doc,
        coverImage: novel.coverImage?.data
          ? `data:${novel.coverImage.contentType};base64,${novel.coverImage.data.toString("base64")}`
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

export const getNovelById = async (req, res) => {
  try {
    const { id } = req.params;
    const novel = await Novel.findById(id);

    if (!novel) {
      return res.status(404).json({ message: "Novel not found" });
    }

    // Convert buffer to base64 string
    res.status(200).json({
      ...novel._doc,
      coverImage: novel.coverImage?.data
        ? `data:${novel.coverImage.contentType};base64,${novel.coverImage.data.toString("base64")}`
        : null,
    });
  } catch (error) {
    console.error("Error fetching novel:", error);
    res.status(500).json({ message: "Failed to fetch novel", error: error.message });
  }
};

export const listGenres = async (_req, res) => {
  try {
    const genres = await Novel.distinct("genres");
    res.json((genres || []).filter(Boolean).sort());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to list genres" });
  }
};