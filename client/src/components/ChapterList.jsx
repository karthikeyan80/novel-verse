import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ChapterList = ({ chapters }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {chapters.length > 0 ? (
          chapters.map((chapter) => (
            <motion.li
              key={chapter._id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition"
              whileHover={{ scale: 1.02 }}
            >
              <Link to={`/chapters/${chapter._id}`}>
                <h3 className="text-lg font-semibold">
                  Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
                </h3>
              </Link>
            </motion.li>
          ))
        ) : (
          <p>No chapters available yet.</p>
        )}
      </motion.ul>
    </div>
  );
};

export default ChapterList;
