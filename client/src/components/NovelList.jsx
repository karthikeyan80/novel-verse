import React, { useEffect, useState } from 'react';
import { fetchAllNovels, createNovel } from '../api/novelApi';

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

  if (loading) return <p className="text-center">Loading novels...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Novel List</h2>
      {novels.length === 0 ? (
        <p>No novels available.</p>
      ) : (
        <ul className="space-y-4">
          {novels.map((novel) => (
            <li key={novel._id} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold">{novel.title}</h3>
              <p className="text-sm">Author: {novel.authorName}</p>
              <p className="text-sm text-gray-600">{novel.description || "No description."}</p>
              {novel.genres.length > 0 && (
                <p className="text-sm text-gray-500">Genres: {novel.genres.join(', ')}</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NovelList;
