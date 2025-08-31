// src/api/progressApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"; // adjust if needed

// ✅ Mark a chapter as read
export const markChapterAsRead = async (userId, chapterId) => {
  try {
    const response = await axios.post(`${API_URL}/api/progress`, {
      userId,
      chapterId,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking chapter as read:", error);
    throw error;
  }
};

// ✅ Get user progress for a novel
export const getUserProgress = async (userId, novelId) => {
  try {
    const response = await axios.get(`${API_URL}/api/progress/${userId}/${novelId}`);
    return response.data; // returns { readChapters: [chapterIds] }
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return { readChapters: [] }; // fallback
  }
};
