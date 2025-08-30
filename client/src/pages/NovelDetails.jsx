import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import { getNovelById } from "../api/novelApi";
import { getChaptersByNovel } from "../api/chapterapi.js";
import ClipLoader from "react-spinners/ClipLoader";
import ChapterList from "../components/ChapterList.jsx";

const NovelDetails = () => {
  const { id: novelId } = useParams();
  const { user } = useUser();
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

  const isOwner =
    user && novel && novel.uploadedBy && user.id === novel.uploadedBy;

  return (
    <div className="min-h-screen text-white">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="spinner"
            className="flex justify-center items-center min-h-[60vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ClipLoader color="#E0FFFF" size={50} />
          </motion.div>
        ) : !novel ? (
          <motion.p
            key="notfound"
            className="text-center text-red-500 text-lg"
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
            className="w-full"
          >
            {/* Cover Image Section */}
            <div className="w-full flex items-center justify-center py-10">
              <img
                src={novel.coverImage || "/default-cover.jpg"}
                alt={novel.title}
                className="w-48 md:w-64 lg:w-80 object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Info Section */}
            <div className="px-6 md:px-16 py-6 w-full mx-auto text-left">
              <h1 className="text-3xl md:text-4xl font-extrabold bg-gray-400 bg-clip-text text-transparent">
                {novel.title}
              </h1>
              <p className="text-lg text-gray-400 italic mt-2">
                by {novel.authorName}
              </p>
              <p className="mt-6 text-gray-300 leading-relaxed text-base md:text-lg max-w-4xl">
                {novel.description}
              </p>

              {/* Genres */}
              <div className="mt-6 flex flex-wrap gap-3">
                {novel.genres?.map((genre, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium 
                      bg-gradient-to-r from-purple-500 to-pink-500 shadow-md"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Add Chapter Button (visible only to novel owner) */}
              {isOwner && (
                <Link
                  to={`/novels/${novelId}/add-chapter`}
                  className="inline-block mt-8 px-6 py-3 rounded-lg 
                  bg-gradient-to-r from-blue-600 to-cyan-500 
                  text-white font-semibold shadow-lg 
                  hover:scale-105 transform transition duration-300"
                >
                  ➕ Add Chapter
                </Link>
              )}
            </div>

            {/* Chapter List */}
            <div className="px-6 md:px-16 w-full mt-10 mx-auto mb-4">
              <ChapterList chapters={chapters} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NovelDetails;
