import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { saveReadingProgress, getUserProgress } from "../api/progressapi.js";
import CommentsSection from "../components/CommentsSection.jsx";

const ChapterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [chapter, setChapter] = useState(null);
  const [chaptersInNovel, setChaptersInNovel] = useState([]);
  const [loading, setLoading] = useState(true);
  const [readingPosition, setReadingPosition] = useState(0);
  const contentRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  const saveProgress = useCallback(
    async (position) => {
      if (!user || !chapter) return;

      try {
        const novelId =
          typeof chapter.novel === "string"
            ? chapter.novel
            : chapter.novel?._id;
        await saveReadingProgress(user.id, novelId, chapter._id, position);
      } catch (error) {
        console.error("Error saving progress:", error);
      }
    },
    [user, chapter]
  );

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

        const novelId = typeof ch.novel === "string" ? ch.novel : ch.novel?._id;
        if (!novelId) return;

        const listRes = await axios.get(
          `http://localhost:5000/api/chapters/novel/${novelId}`
        );
        if (!mounted) return;
        setChaptersInNovel(listRes.data || []);

        if (user) {
          try {
            const userProgress = await getUserProgress(user.id, novelId);
            const lastChapterId =
              typeof userProgress?.lastChapterId === "string"
                ? userProgress.lastChapterId
                : userProgress?.lastChapterId?._id;

            if (
              userProgress &&
              lastChapterId === ch._id &&
              userProgress.readingPosition > 0
            ) {
              setReadingPosition(userProgress.readingPosition);

              setTimeout(() => {
                if (contentRef.current && mounted) {
                  const element = contentRef.current;
                  const scrollHeight = element.scrollHeight;
                  const clientHeight = element.clientHeight;
                  const targetScrollTop =
                    (userProgress.readingPosition / 100) *
                    (scrollHeight - clientHeight);
                  element.scrollTop = targetScrollTop;
                }
              }, 100);
            } else {
              await saveReadingProgress(user.id, novelId, ch._id, 0);
            }
          } catch (error) {
            console.error("Error loading reading progress:", error);
          }
        }
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
  }, [id, user]);

  useEffect(() => {
    const element = contentRef.current;
    if (element && user && chapter) {
      const scrollHandler = () => {
        const scrollTop = element.scrollTop;
        const scrollHeight = element.scrollHeight;
        const clientHeight = element.clientHeight;
        const position = Math.min(
          100,
          Math.max(0, (scrollTop / (scrollHeight - clientHeight)) * 100)
        );

        setReadingPosition(position);

        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
        saveTimeoutRef.current = setTimeout(() => {
          saveProgress(position);
        }, 1000);
      };

      element.addEventListener("scroll", scrollHandler, { passive: true });

      return () => {
        element.removeEventListener("scroll", scrollHandler);
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }
      };
    }
  }, [user, chapter, saveProgress]);

  const { prevId, nextId } = useMemo(() => {
    if (!chapter || chaptersInNovel.length === 0)
      return { prevId: null, nextId: null };
    const idx = chaptersInNovel.findIndex((c) => c._id === chapter._id);
    const prev = idx > 0 ? chaptersInNovel[idx - 1]._id : null;
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

  const novelId =
    typeof chapter.novel === "string" ? chapter.novel : chapter.novel?._id;

  return (
    <motion.div
      className="p-4 sm:p-6 text-white min-h-screen flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
      </h1>

      <div
        ref={contentRef}
        className="mb-6 overflow-y-auto max-h-[70vh] pr-2"
        style={{ scrollbarWidth: "thin", scrollbarColor: "#4B5563 #1F2937" }}
      >
        <p className="text-gray-300 leading-relaxed whitespace-pre-line break-words text-sm sm:text-base">
          {chapter.content}
        </p>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <CommentsSection chapterId={chapter._id} />
      </div>

      {/* Bottom Navigation */}
      <div className="sticky bottom-0 bg-black/80 border-t border-gray-700 p-4 flex items-center justify-between gap-2">
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
