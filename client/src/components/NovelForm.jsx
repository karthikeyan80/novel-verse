// src/components/NovelForm.jsx
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
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Create New Novel</h2>
      <input
        type="text"
        placeholder="Title"
        className="border p-2 mb-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        className="border p-2 mb-2 w-full"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default NovelForm;
