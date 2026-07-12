import React, { useMemo, useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/cepromasLogo.svg";
import Button from "../../components/buttons/Button";
import GlobalLoader from "../../components/loaders/GlobalLoader";
import GlobalModal from "../../components/modals/GlobalModal";
import { fontFamily } from "../../components/styles/theme";
import { useLogin } from "../../hooks/auth/useLogin";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [localErrors, setLocalErrors] = useState({});
  const [form, setForm] = useState({ email: "", password: "" });
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
    confirmText: "Continue",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { mutate, isLoading, error: backendError } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (localErrors[name] || localErrors._global)
      setLocalErrors((prev) => ({
        ...prev,
        [name]: undefined,
        _global: undefined,
      }));
  };

  const backendFieldErrors = useMemo(() => {
    const map = {};
    const data = backendError?.response?.data;
    if (!data) return map;

    const push = (field, msg) => {
      if (!msg) return;
      map[field] = map[field] ? [...map[field], msg] : [msg];
    };

    if (
      data.message &&
      typeof data.message === "object" &&
      !Array.isArray(data.message)
    ) {
      Object.entries(data.message).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach((msg) => push(key, msg));
        else push(key, value);
      });
    }

    const errors = data.errors || data.error;
    if (Array.isArray(errors)) {
      errors.forEach((errorItem) => {
        if (typeof errorItem === "string") {
          const parts = errorItem.split(":");
          if (parts.length > 1)
            push(parts[0].trim(), parts.slice(1).join(":").trim());
          else
            map._global = map._global
              ? [...map._global, errorItem]
              : [errorItem];
        } else if (errorItem.param || errorItem.field) {
          push(
            errorItem.param || errorItem.field,
            errorItem.msg || errorItem.message || JSON.stringify(errorItem),
          );
        } else if (errorItem.msg) {
          map._global = map._global
            ? [...map._global, errorItem.msg]
            : [errorItem.msg];
        }
      });
    } else if (errors && typeof errors === "object") {
      Object.entries(errors).forEach(([key, value]) => {
        if (Array.isArray(value)) value.forEach((msg) => push(key, msg));
        else push(key, value);
      });
    }

    if (data.message && typeof data.message === "string") {
      map._global = map._global
        ? [...map._global, data.message]
        : [data.message];
    }

    return map;
  }, [backendError]);

  const getFieldError = (fieldName) => {
    if (localErrors[fieldName]) return localErrors[fieldName];
    if (backendFieldErrors[fieldName])
      return Array.isArray(backendFieldErrors[fieldName])
        ? backendFieldErrors[fieldName].join(". ")
        : backendFieldErrors[fieldName];
    return null;
  };

  const getInputClass = (fieldName) => {
    const hasError = !!getFieldError(fieldName);
    return `w-full h-[48px] px-4 bg-[#F8FAFC] rounded-md outline-none text-sm placeholder:text-gray-300 transition duration-200 ${
      hasError
        ? "border border-red-500 focus:border-red-500"
        : "border border-[#E5E7EB] focus:border-[#2540A8]"
    }`;
  };

  const validate = () => {
    const errors = {};
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      errors.email = "Enter a valid email";
    if (!form.password) errors.password = "Password is required";
    setLocalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    mutate(
      { email: form.email.trim(), password: form.password },
      {
        onSuccess: () => {
          setIsSubmitting(false);
          setModalConfig({
            isOpen: true,
            type: "success",
            title: "Login successful",
            message: "Welcome back! Redirecting you to your dashboard.",
            confirmText: "Continue",
          });
          navigate("/app", { replace: true });
        },
        onError: (err) => {
          setIsSubmitting(false);
          const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            "Login failed. Please check your credentials.";
          setModalConfig({
            isOpen: true,
            type: "error",
            title: "Login failed",
            message,
            confirmText: "Try again",
          });
        },
      },
    );
  };

  return (
    <div
      className={`min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 ${fontFamily.main}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-36 w-full lg:w-auto">
        {/* Logo Section - hidden on mobile to save vertical space, shown on lg+ */}
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={logo}
            alt="Cepromas Logo"
            className="w-[280px] lg:w-[500px] object-contain"
          />
        </div>

        {/* Login Card */}
        <div className="bg-white w-full max-w-[520px] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F1F1F1] px-6 sm:px-10 py-10 sm:py-12">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-[22px] font-semibold text-[#111827]">Login</h2>

            <p className="text-[#6B7280] text-[13px] leading-5 mt-2">
              Let's get you back to discovering
              <br />
              your perfect property.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {getFieldError("_global") && (
              <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {getFieldError("_global")}
              </div>
            )}
            {/* Email */}
            <div className="mb-5">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Email
              </label>

              <input
                name="email"
                type="email"
                placeholder="enter email"
                className={getInputClass("email")}
                value={form.email}
                onChange={handleChange}
              />
              {getFieldError("email") && (
                <p className="text-xs text-red-600 mt-1">
                  {getFieldError("email")}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className={getInputClass("password") + " pr-10"}
                  value={form.password}
                  onChange={handleChange}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <FaEye size={15} />
                  ) : (
                    <FaEyeSlash size={15} />
                  )}
                </button>
              </div>
              {getFieldError("password") && (
                <p className="text-xs text-red-600 mt-1">
                  {getFieldError("password")}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end mt-3 mb-8">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-[13px] text-[#2540A8] font-medium hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              text={isSubmitting ? "Logging in..." : "Login"}
              bg="bg-[#02024D]"
              width="w-full"
              height="h-[48px]"
              rounded="rounded-md"
              className="text-white text-sm font-medium hover:opacity-90 transition"
              type="submit"
              disabled={!form.email.trim() || !form.password || isSubmitting}
            />

            {/* Google Button */}
            <button
              type="button"
              className="w-full h-[48px] border border-[#E5E7EB] rounded-md mt-3 flex items-center justify-center gap-3 text-sm text-[#4B5563] bg-white hover:bg-gray-50 transition"
            >
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Continue with Google
            </button>

            {/* Signup */}
            <p className="text-center text-sm text-[#6B7280] mt-6">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-[#3658C9] font-medium cursor-pointer hover:underline"
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
      {(isLoading || isSubmitting) && <GlobalLoader label="Logging you in" />}
      <GlobalModal
        isOpen={modalConfig.isOpen}
        onClose={() => {
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        }}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
      />
    </div>
  );
};

export default Login;
