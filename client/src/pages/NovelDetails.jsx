import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const NovelDetails = () => {
  const { id } = useParams(); // Get ID from URL
  const [novel, setNovel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNovel = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/novels/${id}`);
        setNovel(data);
      } catch (error) {
        console.error('Error fetching novel:', error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchNovel();
  }, [id]);

  if (loading) return <p className="text-center text-gray-300">Loading novel...</p>;
  if (!novel) return <p className="text-center text-red-400">Novel not found</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">{novel.title}</h1>
      <p className="text-gray-300">Author: {novel.authorName}</p>
      <p className="mt-4">{novel.description}</p>
      {novel.genres?.length > 0 && (
        <p className="mt-2 text-gray-500">Genres: {novel.genres.join(', ')}</p>
      )}
    </div>
  );
};

export default NovelDetails;
