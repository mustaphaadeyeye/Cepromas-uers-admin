import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.js";

export const useGetSavedProperties = () => {
  return useQuery({
    queryKey: ["saved-properties"],
    queryFn: async () => {
      // Calls properties and filters down to only isFavourite items on client-side
      const response = await api.get("/properties");
      const data = response?.data ?? response;
      return Array.isArray(data)
        ? data.filter((p) => p.isFavourite === true)
        : [];
    },
  });
};
