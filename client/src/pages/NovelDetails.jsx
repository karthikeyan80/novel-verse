import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const NovelDetails = () => {
  const { id } = useParams(); // Get novel ID from URL
  const [novel, setNovel] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovelAndChapters = async () => {
      try {
        // Fetch novel details
        const { data: novelData } = await axios.get(
          `http://localhost:5000/api/novels/${id}`
        );
        setNovel(novelData);

        // Fetch chapters for this novel
        const { data: chapterData } = await axios.get(
          `http://localhost:5000/api/chapters/novel/${id}`
        );
        setChapters(chapterData);
      } catch (error) {
        console.error("Error fetching novel/chapters:", error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNovelAndChapters();
  }, [id]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <ClipLoader color="#4c3ff0" size={50} />
      </div>
    );

  if (!novel)
    return (
      <p className="text-center text-red-400 mt-8">Novel not found</p>
    );

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Novel Info */}
      <h1 className="text-3xl font-bold">{novel.title}</h1>
      <p className="text-gray-300">Author: {novel.authorName}</p>
      <p className="mt-4">{novel.description}</p>
      {novel.genres?.length > 0 && (
        <p className="mt-2 text-gray-500">
          Genres: {novel.genres.join(", ")}
        </p>
      )}

      {/* Add Chapter Button */}
      <div className="mt-6">
        <Link
          to={`/novels/${id}/add-chapter`}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold"
        >
          + Add Chapter
        </Link>
      </div>

      {/* Chapters List */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Chapters</h2>
        {chapters.length === 0 ? (
          <p className="text-gray-400">No chapters yet.</p>
        ) : (
          <ul className="space-y-3">
            {chapters.map((chapter) => (
              <li
                key={chapter._id}
                className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                <Link
                  to={`/chapters/${chapter._id}`}
                  className="text-blue-400 hover:underline"
                >
                  Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NovelDetails;
