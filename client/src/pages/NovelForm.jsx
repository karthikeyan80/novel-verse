import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import ClipLoader from "react-spinners/ClipLoader"; // Spinner
import api from "../api/api";

const genresList = ["Fantasy", "Romance", "Sci-Fi", "Thriller", "Mystery"];

const NovelForm = () => {
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [genres, setGenres] = useState([]);

  const [loading, setLoading] = useState(true); // Spinner control

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // spinner duration (1s)
    return () => clearTimeout(timer);
  }, []);

  const handleGenreChange = (genre) => {
    setGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("authorName", author);
    formData.append("description", description);
    formData.append("coverImage", coverImage);
    formData.append("genres", JSON.stringify(genres));
    formData.append("uploadedBy", user ? user.id : "");

    try {
      await api.post("/novels/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Novel added successfully!");
      setTitle("");
      setAuthor("");
      setDescription("");
      setCoverImage(null);
      setGenres([]);
      setPreview(null);
    } catch (err) {
      console.error("Failed to create novel", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <ClipLoader color="#4c3ff0" size={40} />
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-lg bg-black/20 border border-blue-800 p-8 rounded-lg shadow-blue-900/50 space-y-4 w-full max-w-lg"
      >
        <motion.h2
          className="text-xl font-bold text-white text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Create New Novel
        </motion.h2>

        {[
          <input key="title" type="text" placeholder="Title" className="backdrop-blur-lg bg-black/20 border border-blue-800 p-4 rounded-lg shadow-blue-900/50 w-full max-w-lg" value={title} onChange={(e) => setTitle(e.target.value)} required />,
          <input key="author" type="text" placeholder="Author" className="backdrop-blur-lg bg-black/20 border border-blue-800 p-4 rounded-lg shadow-blue-900/50 w-full max-w-lg" value={author} onChange={(e) => setAuthor(e.target.value)} required />,
          <textarea key="desc" placeholder="Description" className="backdrop-blur-lg bg-black/20 border border-blue-800 p-4 rounded-lg shadow-blue-900/50 w-full max-w-lg" value={description} onChange={(e) => setDescription(e.target.value)} />
        ].map((element, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            {element}
          </motion.div>
        ))}

        {/* Cover Image Upload */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-white mb-5.5">Cover Image</label>
          <div className="relative">
            <input
              id="cover-image-input"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            <label
              htmlFor="cover-image-input"
              className="backdrop-blur-lg bg-black/20 border border-blue-800 p-4 rounded-lg shadow-blue-900/50 w-full max-w-lg text-center cursor-pointer"
            >
              Upload Image
            </label>
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-2 w-[32vw] h-40 object-cover"
            />
          )}
        </motion.div>

        {/* Genres */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-white mb-1">Genres</label>
          <div className="flex flex-wrap gap-2">
            {genresList.map((genre, i) => (
              <motion.label
                key={genre}
                className="inline-flex items-center space-x-2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.05 }}
              >
                <input
                  type="checkbox"
                  checked={genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <span className="text-white">{genre}</span>
              </motion.label>
            ))}
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          Submit
        </motion.button>
      </motion.form>
    </div>
  );
};

export default NovelForm;
