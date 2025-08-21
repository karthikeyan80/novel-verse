// src/pages/ChapterDetails.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const ChapterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [chapter, setChapter] = useState(null);
  const [chaptersInNovel, setChaptersInNovel] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        setLoading(true);
        const chapterRes = await axios.get(
          `http://localhost:5000/api/chapters/${id}`
        );
        if (!mounted) return;
        const ch = chapterRes.data;
        setChapter(ch);

        // ✅ normalize novelId (string only)
        const novelId =
          typeof ch.novel === "string" ? ch.novel : ch.novel?._id;

        if (!novelId) return;

        const listRes = await axios.get(
          `http://localhost:5000/api/chapters/novel/${novelId}`
        );
        if (!mounted) return;
        setChaptersInNovel(listRes.data || []);
      } catch (error) {
        console.error("Error fetching chapter or chapter list:", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [id]);

  // ✅ prev / next calculation
  const { prevId, nextId } = useMemo(() => {
    if (!chapter || chaptersInNovel.length === 0)
      return { prevId: null, nextId: null };
    const idx = chaptersInNovel.findIndex((c) => c._id === chapter._id);
    const prev =
      idx > 0 ? chaptersInNovel[idx - 1]._id : null;
    const next =
      idx >= 0 && idx < chaptersInNovel.length - 1
        ? chaptersInNovel[idx + 1]._id
        : null;
    return { prevId: prev, nextId: next };
  }, [chapter, chaptersInNovel]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading chapter...</p>;
  }

  if (!chapter) {
    return <p className="text-center text-red-500">Chapter not found.</p>;
  }

  // ✅ normalized novelId for Back button
  const novelId =
    typeof chapter.novel === "string" ? chapter.novel : chapter.novel?._id;

  return (
    <motion.div
      className="p-4 sm:p-6 text-white min-h-screen flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
      </h1>

      {/* Chapter Content */}
      <div className="mb-24">
        <p className="text-gray-300 leading-relaxed whitespace-pre-line break-words text-sm sm:text-base">
          {chapter.content}
        </p>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/80 border-t border-gray-700 p-4 flex items-center justify-between gap-2">
        <Link
          to={`/novels/${novelId}`}
          className="text-sm sm:text-base bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded transition"
        >
          ← Back to Novel
        </Link>

        <div className="flex items-center gap-2">
          <button
            disabled={!prevId}
            onClick={() => prevId && navigate(`/chapters/${prevId}`)}
            className={`text-sm sm:text-base px-3 py-2 rounded transition ${
              prevId
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-900 opacity-50 cursor-not-allowed"
            }`}
          >
            ← Previous
          </button>

          <button
            disabled={!nextId}
            onClick={() => nextId && navigate(`/chapters/${nextId}`)}
            className={`text-sm sm:text-base px-3 py-2 rounded transition ${
              nextId
                ? "bg-gray-700 hover:bg-gray-600"
                : "bg-gray-900 opacity-50 cursor-not-allowed"
            }`}
          >
            Next →
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterDetails;
