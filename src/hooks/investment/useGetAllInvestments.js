import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllInvestments } from "../../api/investment.api";
import api from "../../api/axios.js"; // Import your axios instance directly

/**
 * Custom hook to fetch all available investment packages from the backend with dynamic filters.
 * @param {Object} params - Contains query strings like { search: searchQuery }
 */
export const useGetAllInvestments = (params = {}) => {
  return useQuery({
    // 1. MUST include params here so React Query watches it and refetches when you type
    queryKey: ["investments", params],

    queryFn: async () => {
      // 2. Pass the params object as query parameters to your endpoint
      const response = await api.get("/investments", { params });

      const responseData = response?.data ?? response;
      return responseData?.data ?? responseData ?? [];
    },

    meta: {
      onError: (err) => {
        const message =
          err.response?.data?.message ||
          "Failed to pull investment opportunities. Please try again.";
        toast.error(message, { id: "investments-fetch-toast" });
        console.error("Fetch Investments Error:", err);
      },
    },
  });
};
