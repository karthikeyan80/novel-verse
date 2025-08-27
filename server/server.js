import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import novelRoutes from './routes/novelRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';
import User from "./models/User.js";


dotenv.config({ quiet: true });
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/novels', novelRoutes);

// Chapter routes
app.use("/api/chapters", chapterRoutes);


app.get('/', (req, res) => res.send("BookVerse API Running"));

// ✅ Route to sync/save user
app.post("/api/users/sync", async (req, res) => {
  try {
    const { clerkId, email, name } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await User.findOneAndUpdate(
      { clerkId },
      { email, name },
      { upsert: true, new: true }
    );

    res.json(user);
  } catch (error) {
    console.error("Error syncing user:", error);
    res.status(500).json({ error: "Failed to sync user" });
  }
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
