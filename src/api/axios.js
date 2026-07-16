import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const api = axios.create({
  // baseURL: import.meta.env.DEV
  //   ? "http://localhost:3000" // <-- Just hardcode your local NestJS URL right here
  //   : "https://cepromas-backend-api.onrender.com",
  baseURL: "https://cepromas-backend-api.onrender.com",
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
