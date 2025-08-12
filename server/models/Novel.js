import mongoose from "mongoose";

const NovelSchema = new mongoose.Schema({
  title: { type: String, required: true },
  authorName: { type: String, required: true },
  description: String,
  coverImage: {
    data: Buffer,
    contentType: String,
  },
  genres: [String],
  uploadedBy: String,
  createdAt: { type: Date, default: Date.now },
});

// Prevent model overwrite error in development
const Novel = mongoose.models.Novel || mongoose.model("Novel", NovelSchema);

export default Novel;
