import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { resetPassword } from "../../api/auth.api";

export const useResetPassword = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: resetPassword,

    onSuccess: (response) => {
      const responseData = response?.data ?? response;
      const nestedData = responseData?.data ?? {};
      const message =
        responseData?.message ||
        nestedData?.message ||
        "Password reset successful. You can now log in with your new password.";

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback({ response, message });
      }

      toast.success(message, { id: "reset-password-toast" });
    },

    onError: (err) => {
      const resp = err.response?.data;
      let toastMessage =
        resp?.message ||
        resp?.error ||
        err.message ||
        "Unable to reset password. Please try again.";

      if (toastMessage && typeof toastMessage === "object") {
        toastMessage = Object.values(toastMessage).join(" ");
      }

      if (typeof onErrorCallback === "function") {
        onErrorCallback(toastMessage);
      }

      toast.error(toastMessage, { id: "reset-password-toast" });
      console.error("Reset Password Error:", err);
    },
  });
};

export default useResetPassword;
