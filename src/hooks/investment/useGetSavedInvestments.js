import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.js";

export const useGetSavedInvestments = () => {
  return useQuery({
    queryKey: ["saved-investments"],
    queryFn: async () => {
      // Calls investments and filters down to only isFavourite packages
      const response = await api.get("/investments");
      const data = response?.data ?? response;
      return Array.isArray(data)
        ? data.filter((i) => i.isFavourite === true)
        : [];
    },
  });
};
