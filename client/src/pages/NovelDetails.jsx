import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getNovelById } from "../api/novelApi";
import { getChaptersByNovel } from "../api/chapterapi.js";
import ClipLoader from "react-spinners/ClipLoader"; // ✅ Import spinner
import ChapterList from "../components/ChapterList.jsx";

const NovelDetails = () => {
  const { id: novelId } = useParams();
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!novelId) return;

    const fetchData = async () => {
      try {
        const [novelData, chaptersData] = await Promise.all([
          getNovelById(novelId),
          getChaptersByNovel(novelId),
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

  return (
    <div className="min-h-screen text-white p-4">
      {/* AnimatePresence will handle both spinner and content */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="spinner"
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 4 }}
            exit={{ opacity: 0 }}
          >
            {/* ✅ Replaced old spinner with ClipLoader */}
            <ClipLoader color="#E0FFFF" size={50} />
          </motion.div>
        ) : !novel ? (
          <motion.p
            key="notfound"
            className="text-center text-red-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Novel not found.
          </motion.p>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Novel Header */}
            <div className="flex flex-col">
              <img
                src={novel.coverImage || "/default-cover.jpg"}
                alt={novel.title}
                className="max-h-[55vh] rounded-lg shadow-lg p-4"
              />
              <div className="p-4">
                <h1 className="text-3xl mt-2 font-bold">{novel.title}</h1>
                <p className="text-lg text-gray-400">by {novel.authorName}</p>
                <p className="mt-4">{novel.description}</p>
                <div className="mt-4 mb-6 p-2">
                  {novel.genres?.map((genre, index) => (
                    <span
                      key={index}
                      className="bg-gray-500 p-3 mr-2 rounded-full"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/novels/${novelId}/add-chapter`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg mb-0"
                >
                  Add Chapter
                </Link>
              </div>
            </div>

            {/*Chapter List*/}
                  <ChapterList chapters={chapters} />
            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NovelDetails;
