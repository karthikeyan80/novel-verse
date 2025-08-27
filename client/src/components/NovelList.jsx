import { useEffect, useState } from "react";
import { fetchAllNovels, fetchGenres } from "../api/novelApi";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { motion, AnimatePresence } from "framer-motion";

const NovelList = () => {
  const [novels, setNovels] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // debounce search input to avoid fetching on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // fetch genres once
  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error("Failed to fetch genres:", error.message);
      }
    };
    getGenres();
  }, []);

  // fetch novels whenever filters change (initially fetches all)
  useEffect(() => {
    const getNovels = async () => {
      setLoading(true);
      try {
        const data = await fetchAllNovels(debouncedSearch, selectedGenre);
        setNovels(data);
      } catch (error) {
        console.error("Failed to fetch novels:", error.message);
      } finally {
        setTimeout(() => setLoading(false), 200); // smooth transition
      }
    };
    getNovels();
  }, [debouncedSearch, selectedGenre]);

  return (
    <section className="flex flex-col h-full items-center">
      <h2 className="text-2xl font-bold mb-4 text-white">Novel List</h2>

      {/* Search & Filter Controls */}
     {/* Search & Filter Controls */}
<div className="w-full max-w-3xl flex flex-col sm:flex-row gap-3 mb-8 justify-center">
  <input
    type="text"
    placeholder="Search by title or author..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full sm:w-96 px-3 py-2 
               bg-gray-800 text-white border border-gray-700 
               rounded-lg focus:outline-none 
               focus:ring-2 focus:ring-cyan-400 
               hover:border-cyan-300
               transition-colors duration-300"
  />
  <select
    value={selectedGenre}
    onChange={(e) => setSelectedGenre(e.target.value)}
    className="w-full sm:w-52 px-3 py-2 
               rounded-lg bg-gray-800 text-white border border-gray-700 
               focus:outline-none focus:ring-2 focus:ring-cyan-400 
               hover:border-cyan-300
               transition-colors duration-300"
  >
    <option value="">All Genres</option>
    {genres.map((g) => (
      <option key={g} value={g}>
        {g}
      </option>
    ))}
  </select>
</div>


      {/* Loading indicator that doesn't remove the controls */}
      {loading && (
        <div className="flex justify-center items-center h-24">
          <ClipLoader color="#E0FFFF" size={28} />
        </div>
      )}

      {/* Show message only when not loading AND a filter is active */}
      {!loading &&
      (debouncedSearch.trim() !== "" || selectedGenre !== "") &&
      novels.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No novels found.
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            {novels.map((novel, index) => (
              <motion.div
                key={novel._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <Link
                  to={`/novels/${novel._id}`}
                  className="bg-gray-800 border border-gray-700 p-2.5 rounded-lg shadow hover:shadow-lg hover:scale-105 transform transition duration-300 flex flex-col"
                  style={{ minHeight: "300px" }}
                >
                  {/* Cover Image */}
                  {novel.coverImage ? (
                    <img
                      src={novel.coverImage}
                      alt={`${novel.title} cover`}
                      className="w-full h-50 object-cover rounded mb-3"
                    />
                  ) : (
                    <div className="w-full h-40 bg-gray-600 flex items-center justify-center rounded mb-3 text-gray-300">
                      No Image
                    </div>
                  )}

                  {/* Title & Author */}
                  <h3 className="text-lg font-bold text-white">
                    {novel.title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Author: {novel.authorName}
                  </p>

                  {/* Genres */}
                  {Array.isArray(novel.genres) && novel.genres.length > 0 && (
                    <p className="text-xs text-gray-500 mt-2">
                      Genres: {novel.genres.join(", ")}
                    </p>
                  )}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
};

export default NovelList;
