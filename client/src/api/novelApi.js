// src/api/novelApi.js
import api from "/src/api/api.js"; // import the central Axios instance

// Fetch all novels
export const fetchAllNovels = async () => {
  try {
    const response = await api.get("/novels/all"); // uses baseURL from api.js
    return response.data;
  } catch (error) {
    console.error("Error fetching novels:", error);
    throw error;
  }
};

// Create a new novel
export const createNovel = async (novelData) => {
  try {
    const response = await api.post("/novels/create", novelData);
    return response.data;
  } catch (error) {
    console.error("Error creating novel:", error);
    throw error;
  }
};
