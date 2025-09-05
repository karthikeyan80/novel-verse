// src/api/commentApi.js
import api from "/src/api/api.js";

// Add a comment to a novel or chapter
export const addComment = async (novelId, userId, content, chapterId = null) => {
  const res = await api.post("/comments/add", {
    novelId,
    userId,
    content,
    chapterId, // optional
  });
  return res.data;
};

// Get all comments for a novel (and optionally for a specific chapter)
export const getComments = async (novelId, chapterId = null) => {
  const url = chapterId
    ? `/comments/${novelId}?chapterId=${chapterId}`
    : `/comments/${novelId}`;
  const res = await api.get(url);
  return res.data;
};
