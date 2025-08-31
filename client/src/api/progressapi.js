// src/api/progressApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

// Save reading progress with position
export const saveReadingProgress = async (
  userId,
  novelId,
  chapterId,
  readingPosition = 0
) => {
  try {
    const response = await axios.post(`${API_URL}/api/progress/save`, {
      userId,
      novelId,
      chapterId,
      readingPosition,
    });
    return response.data;
  } catch (error) {
    console.error("Error saving reading progress:", error);
    throw error;
  }
};

// Mark chapter as read (completed)
export const markChapterAsRead = async (userId, novelId, chapterId) => {
  try {
    const response = await axios.post(`${API_URL}/api/progress/mark-read`, {
      userId,
      novelId,
      chapterId,
    });
    return response.data;
  } catch (error) {
    console.error("Error marking chapter as read:", error);
    throw error;
  }
};

// Get user progress for a novel
export const getUserProgress = async (userId, novelId) => {
  try {
    const response = await axios.get(
      `${API_URL}/api/progress/${userId}/${novelId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user progress:", error);
    return {
      lastChapterId: null,
      readingPosition: 0,
      readChapters: [],
      lastReadAt: null,
    };
  }
};
