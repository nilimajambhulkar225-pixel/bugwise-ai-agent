import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  timeout: 30000,
});

export const listAnalyses = (params = {}) => api.get("/analyses", { params });
export const getAnalysis = (id) => api.get(`/analyses/${id}`);
export const analyzeBug = (payload) => api.post("/analyze-bug", payload);
export const deleteAnalysis = (id) => api.delete(`/analyses/${id}`);
export const setSaved = (id, isSaved) => api.patch(`/analyses/${id}/saved`, { isSaved });
export default api;
