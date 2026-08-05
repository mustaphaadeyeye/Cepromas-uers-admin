import api from "./axios.js";

export const getGrowthSummary = async (timeframe = "12m") => {
  const response = await api.get(`/growth/summary?timeframe=${timeframe}`);
  return response.data;
};
