import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useAuthStore } from "../../stores/auth.store";
import { login } from "../../api/auth.api";

// export const useLogin = () => {
//   const setAuth = useAuthStore((state) => state.setAuth);

//   return useMutation({
//     mutationFn: login,

//     onSuccess: (res) => {
//       const responseData = res?.data ?? res;
//       const nestedData = responseData?.data ?? {};
//       const user = responseData?.user ?? nestedData?.user ?? null;
//       const token = responseData?.token ?? nestedData?.token ?? null;

//       if (user && token) {
//         setAuth(user, token);
//         toast.success(`Welcome back, ${user.fullName || user.role}!`, {
//           id: "login-toast",
//         });
//       } else {
//         alert("Account verification failed. Please try again.");
//       }
//     },

//     onError: (err) => {
//       const message =
//         err.response?.data?.message ||
//         "Login failed. Please check your credentials.";
//       toast.error(message, { id: "login-toast" });
//       console.error("Login Error:", err);
//     },
//   });
// };

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: login,

    onSuccess: (res) => {
      const responseData = res?.data ?? res;
      const nestedData = responseData?.data ?? {};
      const user = responseData?.user ?? nestedData?.user ?? null;

      // Look for access_token as well as token
      const token =
        responseData?.access_token ??
        responseData?.token ??
        nestedData?.token ??
        null;

      if (user && token) {
        setAuth(user, token);
        toast.success(`Welcome back, ${user.fullName || user.role}!`, {
          id: "login-toast",
        });
      } else {
        // If it falls here, it means keys didn't match
        alert("Account verification failed. Server keys mismatch.");
      }
    },
    // ... rest of code
    onError: (err) => {
      const message =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      toast.error(message, { id: "login-toast" });
      console.error("Login Error:", err);
    },
  });
};
