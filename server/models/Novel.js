import mongoose from 'mongoose';

const novelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  description: String,
  coverImage: String, // URL or filename
  genres: [String],
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const Novel = mongoose.model('Novel', novelSchema);

export default Novel;
