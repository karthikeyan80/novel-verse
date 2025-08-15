import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getNovelById } from "../api/novelApi";
import { getChaptersByNovel } from "../api/chapterapi.js";

const NovelDetails = () => {
  // Match your route param name (adjust if in App.jsx you used ":id")
  const { id: novelId } = useParams();  

  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!novelId) return; // Prevent calling API with undefined

    const fetchData = async () => {
      try {
        const [novelData, chaptersData] = await Promise.all([
          getNovelById(novelId),
          getChaptersByNovel(novelId)
        ]);
        setNovel(novelData);
        setChapters(chaptersData);
      } catch (error) {
        console.error("Error fetching novel details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [novelId]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <motion.div
          className="w-12 h-12 border-4 border-t-transparent border-white rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      </div>
    );
  }

  if (!novel) {
    return <p className="text-center text-red-500">Novel not found.</p>;
  }

  return (
    <div className="min-h-screen text-white p-6">
      {/* Novel Header */}
      <div className="flex gap-6 mb-8">
        <img
          src={novel.coverImage || "/default-cover.jpg"}
          alt={novel.title}
          className="w-48 h-64 object-cover rounded-lg shadow-lg"
        />
        <div>
          <h1 className="text-3xl font-bold">{novel.title}</h1>
          <p className="text-lg text-gray-400">by {novel.authorName}</p>
          <p className="mt-4">{novel.description}</p>
          <div className="mt-4">
            {novel.genres?.map((genre, index) => (
              <span
                key={index}
                className="bg-gray-700 px-3 py-1 rounded-full mr-2"
              >
                {genre}
              </span>
            ))}
          </div>
          <Link
            to={`/novels/${novelId}/add-chapter`}
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Add Chapter
          </Link>
        </div>
      </div>

      {/* Chapters List */}
      <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
      <AnimatePresence>
        {chapters.length > 0 ? (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {chapters.map((chapter) => (
              <motion.li
                key={chapter._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition"
              >
                <Link to={`/chapters/${chapter._id}`}>
                  <h3 className="text-lg font-semibold">
                    Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
                  </h3>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        ) : (
          <p>No chapters available yet.</p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NovelDetails;
