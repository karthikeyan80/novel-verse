import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { getUserProgress, markChapterAsRead } from "../api/progressapi.js";

const ChapterList = ({ chapters, userProgress = null, novelId }) => {
  const navigate = useNavigate();
  const { user } = useUser();

  // Refresh progress data when component mounts or when userProgress changes
  useEffect(() => {
    console.log("ChapterList received userProgress:", userProgress);
  }, [userProgress]);

  // Handle chapter click -> mark as read -> navigate
  const handleChapterClick = async (chapterId) => {
    try {
      // Mark chapter as read when clicked
      if (user && novelId) {
        await markChapterAsRead(user.id, novelId, chapterId);
        console.log("Chapter marked as read:", chapterId);
      }
      navigate(`/chapters/${chapterId}`);
    } catch (error) {
      console.error("Error marking chapter as read:", error);
      // Still navigate even if marking fails
      navigate(`/chapters/${chapterId}`);
    }
  };

  // Check if chapter is read (completed)
  const isChapterRead = (chapterId) => {
    if (!userProgress || !userProgress.readChapters) {
      console.log("No userProgress or readChapters:", {
        userProgress,
        chapterId,
      });
      return false;
    }

    // Convert chapterId to string for comparison
    const chapterIdString = chapterId.toString();

    // Check if this specific chapter is in the readChapters array
    // Server now returns string IDs, so we can use includes directly
    const isRead = userProgress.readChapters.includes(chapterIdString);

    console.log("Chapter read status:", {
      chapterId: chapterIdString,
      isRead,
      readChaptersCount: userProgress.readChapters?.length,
      readChapters: userProgress.readChapters,
    });
    return isRead;
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
            const isRead = isChapterRead(chapter._id);

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
