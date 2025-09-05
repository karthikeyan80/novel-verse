import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    novelId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Novel", 
      required: true 
    },
    chapterId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Chapter" 
    }, // optional, if it's for a specific chapter
    userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    content: { 
      type: String, 
      required: true, 
      trim: true 
    },
  },
  { timestamps: true } // auto adds createdAt & updatedAt
);

export default mongoose.model("Comment", commentSchema);
