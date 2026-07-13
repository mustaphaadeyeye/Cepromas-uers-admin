import api from "./axios.js";

/**
 * GET /investments
 * List available packages with dynamic filters (search, location, category)
 * @param {Object} params - Contains query fields like { search, location }
 */
export const getAllInvestments = async (params = {}) => {
  return api.get("/investments", { params }); // 👈 FIXED: Passes parameters across the network wire!
};

/**
 * POST /investments
 * [Agent Only] Create package (ROI, Duration, Min/Max)
 * @param {FormData} formData - Data containing package fields and raw files
 */
export const createInvestment = async (formData) => {
  return api.post("/investments", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * GET /investments/{id}
 * Details of an investment package
 */
export const getInvestmentDetails = async (id) => {
  return api.get(`/investments/${id}`);
};

/**
 * PATCH /investments/{id}
 * [Agent Only] Update package
 * @param {string} id - Investment Package ID
 * @param {FormData} formData - Updated fields and/or new media files
 */
export const updateInvestment = async (id, formData) => {
  return api.patch(`/investments/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

/**
 * POST /investments/{id}/subscribe
 * [User Only] Purchase an investment
 * @param {string} id - Investment Package ID
 * @param {Object} data - Payload containing investment { amount }
 */
export const subscribeToInvestment = async (id, data) => {
  return api.post(`/investments/${id}/subscribe`, data);
};
