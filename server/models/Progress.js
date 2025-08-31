// models/Progress.js
import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true }, // Clerk userId
    novelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Novel",
      required: true,
    },
    lastChapterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chapter",
      required: true,
    },
    readingPosition: { type: Number, default: 0 }, // Position within the chapter (character count)
    readChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chapter" }], // Array of completed chapters
    lastReadAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

progressSchema.index({ userId: 1, novelId: 1 }, { unique: true }); // one progress per user per novel

export default mongoose.model("Progress", progressSchema);
