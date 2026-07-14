import { useQuery } from "@tanstack/react-query";
import { getReferrals } from "../../api/profile.api.js";

export const useReferrals = () => {
  return useQuery({
    queryKey: ["profile-referrals"],
    queryFn: getReferrals,
  });
};
