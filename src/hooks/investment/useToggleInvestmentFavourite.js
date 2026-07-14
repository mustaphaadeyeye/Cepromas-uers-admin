import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleInvestmentFavourite } from "../../api/investment.api.js"; // Adjust the path if your API folder structure is different
import toast from "react-hot-toast";

export const useToggleInvestmentFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (packageId) => toggleInvestmentFavourite(packageId),
    onSuccess: (response) => {
      const data = response?.data ?? response;
      toast.success(
        data?.message || "Investment favorites updated successfully!",
      );

      // 🔄 Invalidate the "investments" query cache keys so the grid re-renders with fresh database states
      queryClient.invalidateQueries({ queryKey: ["investments"] });
    },
    onError: (err) => {
      const message =
        err.response?.data?.message || "Failed to update investment favorites.";
      toast.error(message);
    },
  });
};
