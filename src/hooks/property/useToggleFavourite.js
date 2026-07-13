import { useMutation, useQueryClient } from "@tanstack/react-query";
import { togglePropertyFavourite } from "../../api/property.api.js";
import toast from "react-hot-toast";

export const useToggleFavourite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (propertyId) => togglePropertyFavourite(propertyId),
    onSuccess: (response) => {
      const data = response?.data ?? response;
      toast.success(data?.message || "Favorites updated successfully!");

      // Invalidate the property queries to sync active ui indicators seamlessly
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
    onError: (err) => {
      const message =
        err.response?.data?.message || "Failed to update favorites.";
      toast.error(message);
    },
  });
};
