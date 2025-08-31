import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
// import { markChapterAsRead } from "@/api/progressapi"; // new API function

const ChapterList = ({ chapters, userProgress = [], userId }) => {
  const navigate = useNavigate();

  // Handle chapter click -> save progress -> navigate
  const handleChapterClick = async (chapterId) => {
    try {
      if (userId) {
        await markChapterAsRead(userId, chapterId);
      }
      navigate(`/chapters/${chapterId}`);
    } catch (error) {
      console.error("Error marking progress:", error);
      navigate(`/chapters/${chapterId}`); // fallback navigation
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold p-6">Chapters</h2>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {chapters.length > 0 ? (
          chapters.map((chapter) => {
            const isRead = userProgress.includes(chapter._id); // check progress
            return (
              <motion.li
                key={chapter._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition"
                whileHover={{ scale: 1.02 }}
              >
                <button
                  onClick={() => handleChapterClick(chapter._id)}
                  className="flex justify-between w-full text-left"
                >
                  <h3 className="text-lg font-semibold text-white">
                    Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
                  </h3>
                  <span
                    className={`ml-3 text-sm ${
                      isRead ? "text-green-400" : "text-gray-400"
                    }`}
                  >
                    {isRead ? "✓ Read" : "• Unread"}
                  </span>
                </button>
              </motion.li>
            );
          })
        ) : (
          <p>No chapters available yet.</p>
        )}
      </motion.ul>
    </div>
  );
};

export default ChapterList;
