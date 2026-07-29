import api from "./axios.js";

// GET /profile
export const getProfile = async () => {
  const response = await api.get("/profile");
  return response?.data ?? response;
};

// PATCH /profile/update
export const updateProfile = async (data) => {
  const response = await api.patch("/profile/update", data);
  return response?.data ?? response;
};

// PATCH /profile/change-password
export const changePassword = async (data) => {
  const response = await api.patch("/profile/change-password", data);
  return response?.data ?? response;
};

// PATCH /profile/set-pin
export const setTransactionPin = async (data) => {
  const response = await api.patch("/profile/set-pin", data);
  return response?.data ?? response;
};

// GET /profile/referrals
export const getReferrals = async () => {
  const response = await api.get("/profile/referrals");
  return response?.data ?? response;
};

export const submitKyc = async (data) => {
  const headers =
    data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {};
  const response = await api.post("/profile/kyc", data, { headers });
  return response?.data ?? response;
};

export const getKycStatus = async () => {
  const response = await api.get("/profile/kyc");
  return response?.data ?? response;
};

export const verifyNin = async () => {
  const response = await api.post("/profile/kyc/verify-nin");
  return response?.data ?? response;
};
