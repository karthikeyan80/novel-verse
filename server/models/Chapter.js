import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  novel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Novel",
    required: true,
  },
  chapterTitle: {
    type: String,
    required: true,
  },
  content: {
    type: String, // Can later extend to HTML/Markdown
    required: true,
  },
  chapterNumber: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent model overwrite error in development
const Chapter =
  mongoose.models.Chapter || mongoose.model("Chapter", chapterSchema);

export default Chapter;
