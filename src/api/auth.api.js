import api from "./axios.js"

export const signup = async (data) => {
  return api.post("/auth/signup", data);
};

export const login = async (data) => {
  return api.post("/auth/login", data);
};

export const forgotPassword = async (data) => {
  return api.post("/auth/forgot-password", data);
};

export const resetPassword = async (data) => {
    return api.post("/auth/reset-password", data);
}