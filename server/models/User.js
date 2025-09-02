import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: String,
  lastName: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Novel" }], // NEW
}, { timestamps: true });

export default mongoose.model("User", userSchema);
