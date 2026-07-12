import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getAllInvestments } from "../../api/investment.api";

/**
 * Custom hook to fetch all available investment packages from the backend.
 */
export const useGetAllInvestments = () => {
  return useQuery({
    queryKey: ["investments"],

    queryFn: async () => {
      const response = await getAllInvestments();

      // Safely handle varying axios unwrap interceptors
      const responseData = response?.data ?? response;

      // Extract the target array or default to an empty list fallback
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
