import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { motion } from "framer-motion";

const NovelDetails = () => {
  const { id } = useParams();
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovelAndChapters = async () => {
      try {
        const { data: novelData } = await axios.get(
          `http://localhost:5000/api/novels/${id}`
        );
        setNovel(novelData);

        const { data: chapterData } = await axios.get(
          `http://localhost:5000/api/chapters/novel/${id}`
        );
        setChapters(chapterData);
      } catch (error) {
        console.error("Error fetching novel/chapters:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNovelAndChapters();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <ClipLoader color="#4c3ff0" size={50} />
      </div>
    );

  if (!novel)
    return (
      <p className="text-center text-red-400 mt-8">Novel not found</p>
    );

  return (
    <motion.div
      className="p-6 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cover Image */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        {novel.coverImage ? (
          <img
            src={novel.coverImage}
            alt={`${novel.title} cover`}
            className="w-full max-h-[400px] object-cover rounded-lg shadow-lg"
          />
        ) : (
          <div className="w-full h-60 bg-gray-600 flex items-center justify-center rounded-lg text-gray-300">
            No Image
          </div>
        )}
      </motion.div>

      {/* Novel Info */}
      <motion.h1
        className="text-3xl font-bold"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {novel.title}
      </motion.h1>
      <motion.p
        className="text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Author: {novel.authorName}
      </motion.p>
      <motion.p
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {novel.description}
      </motion.p>
      {novel.genres?.length > 0 && (
        <motion.p
          className="mt-2 text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Genres: {novel.genres.join(", ")}
        </motion.p>
      )}

      {/* Add Chapter Button */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <Link
          to={`/novels/${id}/add-chapter`}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold"
        >
          + Add Chapter
        </Link>
      </motion.div>

      {/* Chapters List */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
        {chapters.length === 0 ? (
          <p className="text-gray-400">No chapters yet.</p>
        ) : (
          <motion.ul
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {chapters.map((chapter) => (
              <motion.li
                key={chapter._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  to={`/chapters/${chapter._id}`}
                  className="text-blue-400 hover:underline"
                >
                  Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NovelDetails;
