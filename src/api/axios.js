import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const api = axios.create({
  baseURL: "https://cepromas-api.cephasict.com/",
});

// Request Interceptor: Attach bearer token automatically
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor: Preserve exact backend error responses & handle unauthorized access
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle expired token / unauthorized logout
    if (error.response?.status === 401) {
      useAuthStore.getState().logout?.();
    }

    // IMPORTANT: Always pass the full error object down to the catch block
    return Promise.reject(error);
  },
);

export default api;
