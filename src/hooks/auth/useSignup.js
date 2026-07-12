import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signup } from "../../api/auth.api";
import { useAuthStore } from "../../stores/auth.store";

export const useSignup = (onSuccessCallback, onErrorCallback) => {
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: signup,
    onSuccess: (response) => {
      const responseData = response?.data ?? response;
      const nestedData = responseData?.data ?? {};
      const user = responseData?.user ?? nestedData?.user ?? null;
      const token = responseData?.token ?? nestedData?.token ?? null;
      const successMessage =
        responseData?.message ||
        nestedData?.message ||
        "Account successfully created!";

      if (user && token) {
        setAuth(user, token);
      }

      if (typeof onSuccessCallback === "function") {
        onSuccessCallback({
          response,
          user,
          token,
          message: successMessage,
        });
      }

      toast.success(successMessage, {
        id: "signup-toast",
      });
    },

    onError: (err) => {
      const resp = err.response?.data;
      const hasFieldErrors = !!(
        resp &&
        (resp.errors ||
          (resp.error && typeof resp.error === "object") ||
          (resp.message && typeof resp.message === "object"))
      );

      let toastMessage =
        resp?.message ||
        resp?.error ||
        err.message ||
        "Account creation failed. Please try again.";

      if (toastMessage && typeof toastMessage === "object") {
        toastMessage = Object.values(toastMessage).join(" ");
      }

      if (!toastMessage) {
        toastMessage = hasFieldErrors
          ? "Account creation failed. Please fix the highlighted fields."
          : "We could not create your account right now. Please try again shortly.";
      }

      if (typeof onErrorCallback === "function") {
        onErrorCallback(toastMessage);
      }

      toast.error(toastMessage, { id: "signup-toast" });
      console.error("Sign Up Error:", err);
    },
  });
};
