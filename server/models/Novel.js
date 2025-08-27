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

// Faster searches:
NovelSchema.index({ title: "text", description: "text", authorName: "text" });
// Faster genre filtering:
NovelSchema.index({ genres: 1 });


// Prevent model overwrite error in development
const Novel = mongoose.models.Novel || mongoose.model("Novel", NovelSchema);

export default Novel;
