import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const getComments = async ({ novelId, chapterId }) => {
  if (!novelId && !chapterId) return [];
  const type = chapterId ? "chapter" : "novel";
  const id = chapterId || novelId;
  const res = await axios.get(`${API_URL}/api/comments/${type}/${id}`);
  return res.data || [];
};

export const addComment = async ({
  userId,
  userName,
  novelId,
  chapterId,
  content,
}) => {
  const res = await axios.post(`${API_URL}/api/comments/add`, {
    userId,
    userName,
    novelId: novelId || null,
    chapterId: chapterId || null,
    content,
  });
  return res.data;
};
