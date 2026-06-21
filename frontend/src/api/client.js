import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const fetchSuggestions = (q, signal) =>
  api.get("/suggest", { params: { q }, signal }).then((r) => r.data);

export const recordSearch = (query) =>
  api.post("/search", { query }).then((r) => r.data);

export const fetchMetrics = () => api.get("/metrics").then((r) => r.data);

export const fetchTrending = () => api.get("/trending").then((r) => r.data);

export const debugCache = (prefix) =>
  api.get("/cache/debug", { params: { prefix } }).then((r) => r.data);
