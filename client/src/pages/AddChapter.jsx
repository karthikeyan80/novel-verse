import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const AddChapter = () => {
  const { id: novelId } = useParams(); // from route /novels/:id/add-chapter
  const navigate = useNavigate();

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterContent, setChapterContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(true);

  // Simulate loading (optional)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "text/plain") {
      alert("Only .txt files are allowed");
      return;
    }

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      setChapterContent(event.target.result);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!chapterTitle || !chapterContent) {
      alert("Please provide both a title and a text file.");
      return;
    }

    try {
      const newChapter = {
        chapterTitle,
        content: chapterContent,
      };

      // server expects POST /api/chapters/add with body including novelId
      const response = await axios.post(
        `http://localhost:5000/api/chapters/add`,
        {
          novelId,
          ...newChapter,
        }
      );

      console.log("Chapter saved:", response.data);

      // Redirect to ChapterDetails (server returns { chapter: {...} })
      navigate(`/chapters/${response.data.chapter._id}`);
    } catch (error) {
      console.error("Error saving chapter:", error);
      alert("Failed to save chapter. Please try again.");
    }
  };

  return (
    <div
      className="flex items-baseline justify-center p-6 bg-cover bg-center"
      style={{
        backgroundImage: "url('/your-background.jpg')",
      }}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="flex justify-center items-start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-12 h-12 border-2 border-[#E0FFFF] border-t-transparent rounded-full animate-spin" />
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="backdrop-blur-lg bg-black/20 border border-blue-800 p-4 rounded-3xl shadow-blue-900/50 w-full shadow-2xl space-y-4 sm:w-[40vw] max-w-lg"
          >
            <motion.h2
              className="text-2xl font-bold text-white text-center mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Add New Chapter
            </motion.h2>

            {/* Chapter Title */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="chaptitle"
                className="ml-2 block mb-1 font-semibold text-gray-200"
              >
                Title
              </label>
              <input
                className="backdrop-blur-lg bg-black/20 border border-blue-800 p-4 rounded-lg shadow-blue-900/50 w-full shadow-2xl space-y-4 focus:ring-1 focus:ring-blue-400"
                id="chaptitle"
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Enter chapter title"
              />
            </motion.div>

            {/* File Upload */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="fileUpload"
                className="ml-2 block mb-1 font-semibold text-gray-200"
              >
                Add Chapter
              </label>
              <label
                htmlFor="fileUpload"
                className="cursor-pointer inline-block backdrop-blur-lg bg-black/20 border border-blue-800 px-4 py-2 rounded-lg shadow-blue-900/50 shadow-2xl text-white hover:bg-blue-900/30 focus:ring-1 focus:ring-blue-400"
              >
                📂 Upload Chapter File (.txt)
              </label>
              <input
                id="fileUpload"
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              {fileName && (
                <p className="mt-2 text-sm text-gray-400">
                  Selected file: {fileName}
                </p>
              )}
            </motion.div>

            {/* Preview */}
            <AnimatePresence>
              {chapterContent && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gray-700/60 p-3 rounded mt-4 text-gray-100 max-h-40 overflow-y-auto"
                >
                  <h3 className="font-semibold mb-2">Preview:</h3>
                  <pre className="whitespace-pre-wrap">{chapterContent}</pre>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-blue-500/90 hover:bg-blue-600 px-4 py-2 rounded w-full font-semibold text-white"
            >
              Save Chapter
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddChapter;
