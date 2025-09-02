import api from "/src/api/api.js";

// Add a novel to a user's favorites
export const addFavorite = async (userId, novelId) => {
  const res = await api.post("/favorites/add", { userId, novelId });
  return res.data;
};

// Remove a novel from a user's favorites
export const removeFavorite = async (userId, novelId) => {
  const res = await api.post("/favorites/remove", { userId, novelId });
  return res.data;
};

// Get all favorites for a user
export const getFavorites = async (userId) => {
  const res = await api.get(`/favorites/${userId}`);
  return res.data;
};
