// src/api/novelApi.js
import api from "/src/api/api.js"; // central Axios instance
import axios from "axios";

// Fetch all novels with optional search/filter
export const fetchAllNovels = async (search = "", genre = "") => {
  try {
    let url = "/novels"; // correct endpoint

    const params = [];
    if (search) params.push(`search=${encodeURIComponent(search)}`);
    if (genre) params.push(`genre=${encodeURIComponent(genre)}`);

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching novels:", error);
    throw error;
  }
};

// Fetch distinct list of genres
export const fetchGenres = async () => {
  try {
    const response = await api.get("/novels/genres");
    return response.data || [];
  } catch (error) {
    console.error("Error fetching genres:", error);
    return [];
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

export const getNovelById = async (id) => {
  try {
    const response = await api.get(`/novels/${id}`); // uses baseURL from api.js
    return response.data;
  } catch (error) {
    console.error("Error fetching novel details:", error);
    return null;
  }
};
