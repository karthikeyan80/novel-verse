import axios from "axios";

const API_URL = "http://localhost:5000/api/chapters"; // adjust if different

export const getChaptersByNovel = async (novelId) => {
  const res = await axios.get(`${API_URL}/novel/${novelId}`);
  return res.data;
};

export const getChapter = async (chapterId) => {
  const res = await axios.get(`${API_URL}/${chapterId}`);
  return res.data;
};

export const addChapter = async (chapterData) => {
  const res = await axios.post(`${API_URL}/add`, chapterData);
  return res.data;
};
