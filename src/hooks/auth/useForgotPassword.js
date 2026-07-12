import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { forgotPassword } from "../../api/auth.api";

export const useForgotPassword = (onSuccessCallback, onErrorCallback) => {
  return useMutation({
    mutationFn: forgotPassword,

    onSuccess: (response) => {
      const responseData = response?.data ?? response;
      const nestedData = responseData?.data ?? {};
      const message =
        responseData?.message ||
        nestedData?.message ||
        "If an account exists for that email, you'll receive instructions shortly.";

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback({ response, message });
      }

      toast.success(message, { id: "forgot-password-toast" });
    },

    onError: (err) => {
      const resp = err.response?.data;
      let toastMessage =
        resp?.message ||
        resp?.error ||
        err.message ||
        "Unable to process request. Please try again.";

      if (toastMessage && typeof toastMessage === "object") {
        toastMessage = Object.values(toastMessage).join(" ");
      }

      if (typeof onErrorCallback === "function") {
        onErrorCallback(toastMessage);
      }

      toast.error(toastMessage, { id: "forgot-password-toast" });
      console.error("Forgot Password Error:", err);
    },
  });
};

export default useForgotPassword;
