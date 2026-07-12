import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllProperties } from "../../api/property.api";

/**
 * Custom hook to fetch all properties with automatic error handling and toast updates.
 * @param {Object} filters - Optional query parameters ({ status, search })
 */
export const useGetAllProperties = (filters = {}) => {
  return useQuery({
    // The queryKey includes filters so the cache automatically refreshes when filters change
    queryKey: ["properties", filters],

    queryFn: async () => {
      const response = await getAllProperties(filters);
      console.log("Raw Axios Response from Backend:", response);
      // Safely unwraps nested structures depending on your axios interceptor setup
      const responseData = response?.data ?? response;
      console.log(responseData);
      return responseData?.data ?? responseData ?? [];
    },

    // Handles any network or backend service failures automatically
    meta: {
      onError: (err) => {
        const message =
          err.response?.data?.message ||
          "Failed to fetch properties. Please try reloading.";
        toast.error(message, { id: "properties-fetch-toast" });
        console.error("Fetch Properties Error:", err);
      },
    },
  });
};
