import { useState } from "react";
import api from "../api/api";

const NovelForm = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/novels/create", {
        title,
        authorName: author,
        description: "",
        coverImage: "",
        genres: [],
      });
      setTitle("");
      setAuthor("");
    } catch (err) {
      console.error("Failed to create novel", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-white">Create New Novel</h2>
      <input
        type="text"
        placeholder="Title"
        className="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        className="bg-gray-700 border border-gray-600 text-white p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition"
      >
        Submit
      </button>
    </form>
  );
};

export default NovelForm;
