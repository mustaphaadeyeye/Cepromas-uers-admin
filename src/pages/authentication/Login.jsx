import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/cepromasLogo.svg";
import Button from "../../components/buttons/Button";
import { fontFamily } from "../../components/styles/theme";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

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
            <h2 className="text-[22px] font-semibold text-[#111827]">
              Login
            </h2>

            <p className="text-[#6B7280] text-[13px] leading-5 mt-2">
              Let's get you back to discovering
              <br />
              your perfect property.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/app");
            }}
          >
            {/* Email */}
            <div className="mb-5">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="enter email"
                className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 focus:border-[#2540A8]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 pr-10 focus:border-[#2540A8]"
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
              text="Login"
              bg="bg-[#02024D]"
              width="w-full"
              height="h-[48px]"
              rounded="rounded-md"
              className="text-white text-sm font-medium hover:opacity-90 transition"
              type="submit"
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
    </div>
  );
};

export default Login;