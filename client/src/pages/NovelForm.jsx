import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
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

  return (
    <div className="flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-lg space-y-4 w-full max-w-lg"
      >
        <h2 className="text-xl font-bold text-white text-center">
          Create New Novel
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Author"
          className="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div>
          <label className="block text-white mb-1">Cover Image</label>
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
              className="inline-block p-4 w-[20vw] bg-black/90 text-white text-center cursor-pointer border border-gray-600 rounded hover:bg-gray-800 transition"
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
        </div>

        <div>
          <label className="block text-white mb-1">Genres</label>
          <div className="flex flex-wrap gap-2">
            {genresList.map((genre) => (
              <label key={genre} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={genres.includes(genre)}
                  onChange={() => handleGenreChange(genre)}
                />
                <span className="text-white">{genre}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NovelForm;
