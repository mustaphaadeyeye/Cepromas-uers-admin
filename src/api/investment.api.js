import api from "./axios.js";

/**
 * POST /investments/{id}/subscribe
 * [User Only] Purchase an investment package
 * @param {string} id - Investment Package ID
 * @param {Object} data - { amount: number, transactionPin: string }
 */
export const subscribeToInvestment = async (id, data) => {
  const response = await api.post(`/investments/${id}/subscribe`, data);
  return response?.data ?? response;
};

export const getAllInvestments = async (params = {}) => {
  return api.get("/investments", { params });
};

export const createInvestment = async (formData) => {
  return api.post("/investments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getInvestmentDetails = async (id) => {
  return api.get(`/investments/${id}`);
};

export const updateInvestment = async (id, formData) => {
  return api.patch(`/investments/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const toggleInvestmentFavourite = async (id) => {
  return api.post(`/investments/${id}/favourite`);
};
