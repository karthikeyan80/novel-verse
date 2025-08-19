// src/pages/ChapterDetails.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ChapterDetails = () => {
  const { id } = useParams();
  const [chapter, setChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChapter = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/chapters/${id}`
        );
        setChapter(response.data);
      } catch (error) {
        console.error("Error fetching chapter:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchChapter();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading chapter...</p>;
  }

  if (!chapter) {
    return <p className="text-center text-red-500">Chapter not found.</p>;
  }

  return (
    <motion.div
      className="p-4 sm:p-6 text-white rounded-lg shadow-lg h-screen flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Fixed Header */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 sticky top-0 z-10 p-3 shadow-md">
        Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
      </h1>

      {/* Scrollable Content */}
      <div className="overflow-y-auto flex-1 pr-2 sm:pr-4 pt-2 sm:pt-4">
        <p className="text-gray-300 leading-relaxed whitespace-pre-line break-words text-sm sm:text-base">
          {chapter.content}
        </p>
      </div>
    </motion.div>
  );
};

export default ChapterDetails;
