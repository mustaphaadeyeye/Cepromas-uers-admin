import { useMutation } from "@tanstack/react-query";
import { changePassword, setTransactionPin } from "../../api/profile.api.js";
import toast from "react-hot-toast";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: (data) => {
      toast.success(data?.message || "Password changed successfully!");
    },
    onError: (err) => {
      const message =
        err.response?.data?.message || "Failed to change password.";
      toast.error(message);
    },
  });
};

export const useSetTransactionPin = () => {
  return useMutation({
    mutationFn: setTransactionPin,
    onSuccess: (data) => {
      toast.success(data?.message || "Transaction PIN saved successfully!");
    },
    onError: (err) => {
      const message = err.response?.data?.message || "Failed to set PIN.";
      toast.error(message);
    },
  });
};
