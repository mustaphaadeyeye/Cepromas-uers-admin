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

// POST /profile/kyc
export const submitKyc = async (data) => {
  const response = await api.post("/profile/kyc", data);
  return response?.data ?? response;
};

// GET /profile/kyc
export const getKycStatus = async () => {
  const response = await api.get("/profile/kyc");
  return response?.data ?? response;
};

// POST /profile/kyc/verify-nin
export const verifyNin = async (data) => {
  const response = await api.post("/profile/kyc/verify-nin", data);
  return response?.data ?? response;
};
