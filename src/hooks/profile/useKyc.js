import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { submitKyc, getKycStatus } from ";
import toast from "react-hot-toast";
import { getKycStatus, submitKyc } from "../../api/profile.api";

export const useKycStatus = () => {
  return useQuery({
    queryKey: ["kyc-status"],
    queryFn: getKycStatus,
  });
};

export const useSubmitKyc = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitKyc,
    onSuccess: (data) => {
      toast.success(data?.message || "KYC submitted successfully!");
      // Refresh user profile and KYC state across app
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["kyc-status"] });
    },
    onError: (err) => {
      const msg = err.response?.data?.message || "Failed to submit KYC.";
      toast.error(msg);
    },
  });
};
