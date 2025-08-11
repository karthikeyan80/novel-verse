import React, { useEffect, useState } from 'react';
import { fetchAllNovels } from '../api/novelApi';
import { Link } from 'react-router-dom';

const NovelList = () => {
  const [novels, setNovels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getNovels = async () => {
      try {
        const data = await fetchAllNovels();
        setNovels(data);
      } catch (error) {
        console.error("Failed to fetch novels:", error.message);
      } finally {
        setLoading(false);
      }
    };

    getNovels();
  }, []);

  if (loading) return <p className="text-center text-gray-300">Loading novels...</p>;

  return (
    <section className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4 text-white">Novel List</h2>
      {novels.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          No novels available.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 flex-1">
          {novels.map((novel, index) => (
            <Link
              key={novel._id}
              to={`/novels/${novel._id}`}
              className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow hover:shadow-lg hover:scale-105 transform transition duration-300 fade-in-up flex flex-col"
              style={{ animationDelay: `${index * 0.1}s`, minHeight: "220px" }}
            >
              <h3 className="text-lg font-bold text-white">{novel.title}</h3>
              <p className="text-sm text-gray-300">Author: {novel.authorName}</p>

              {/* Fixed-height description block */}
              <p className="text-sm text-gray-400 flex-grow line-clamp-3">
                {novel.description || "No description."}
              </p>

              {novel.genres.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  Genres: {novel.genres.join(', ')}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default NovelList;
