import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import novelRoutes from './routes/novelRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';

dotenv.config({ quiet: true });
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/novels', novelRoutes);
app.use('/api/chapters', chapterRoutes);

app.get('/', (req, res) => res.send("BookVerse API Running"));


const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error(err));
