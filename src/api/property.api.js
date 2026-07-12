import api from "./axios.js";

/**
 * Fetches all properties from the backend.
 * @param {Object} params - Optional filters for the query
 * @param {string} params.status - Filter by property status (e.g., 'AVAILABLE', 'SOLD')
 * @param {string} params.search - Text search filtering title or location
 */
export const getAllProperties = async (params = {}) => {
  return api.get("/properties", { params });
};
