import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getFavorites } from "../api/favoriteapi";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

const FavoritesPage = () => {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  // Normalize possible Buffer-like coverImage from backend to base64 data URL
  const bufferLikeToBase64 = (bufLike) => {
    try {
      const arr = Array.isArray(bufLike) ? bufLike : bufLike?.data || bufLike;
      if (!arr) return null;
      const uint8 = new Uint8Array(arr);
      let binary = "";
      const chunkSize = 0x8000; // process in chunks to avoid stack limits
      for (let i = 0; i < uint8.length; i += chunkSize) {
        binary += String.fromCharCode.apply(
          null,
          uint8.subarray(i, i + chunkSize)
        );
      }
      return btoa(binary);
    } catch (e) {
      console.error("Failed to convert image buffer to base64", e);
      return null;
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getFavorites(user.id); // Clerk userId
        // Ensure coverImage is a data URL similar to NovelList
        const normalized = (data || []).map((novel) => {
          // If backend already sends a data URL string, keep it
          if (typeof novel.coverImage === "string") {
            return novel;
          }
          // Try to construct data URL from buffer-like shape
          const contentType =
            novel.coverImage?.contentType ||
            novel.coverImage?.type ||
            "image/jpeg";
          const base64 = novel.coverImage?.data
            ? bufferLikeToBase64(novel.coverImage.data)
            : bufferLikeToBase64(novel.coverImage);

          return {
            ...novel,
            coverImage: base64 ? `data:${contentType};base64,${base64}` : null,
          };
        });
        setFavorites(normalized);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchFavorites();
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ClipLoader color="#E0FFFF" size={50} />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-12 py-10 text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 flex items-center gap-2">
        <Heart className="text-cyan-800 w-8 h-8" />
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[50vh] text-center">
          <Heart className="w-14 h-14 text-gray-500 mb-4" />
          <p className="text-gray-400 text-lg">
            You haven’t added any favorites yet. <br />
            Start exploring novels and add them here 💖
          </p>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {favorites.map((novel, index) => (
              <motion.div
                key={novel._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={`/novels/${novel._id}`}
                  className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-transform transform hover:-translate-y-2"
                >
                  {/* Cover Image */}
                  <div className="relative w-full h-56">
                    {novel.coverImage ? (
                      <img
                        src={novel.coverImage}
                        alt={`${novel.title} cover`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-300">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="text-lg font-bold line-clamp-1">
                      {novel.title}
                    </h2>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {novel.description || "No description available."}
                    </p>

                    {/* Genres */}
                    {novel.genres?.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {novel.genres.slice(0, 2).map((genre, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium 
                              bg-gradient-to-r from-purple-500 to-pink-500 shadow"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default FavoritesPage;
