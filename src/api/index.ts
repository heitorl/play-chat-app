import axios from "axios";

export const api = axios.create({
  baseURL: "https://play-for-a-cause-chat-server-production.up.railway.app",

  timeout: 12000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@TOKEN");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
