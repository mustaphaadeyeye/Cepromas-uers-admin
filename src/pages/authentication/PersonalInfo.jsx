import React, { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/cepromasLogo.svg";
import Button from "../../components/buttons/Button";
import { fontFamily } from "../../components/styles/theme";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const PersonalInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 ${fontFamily.main}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-24 lg:gap-36">
        {/* Logo Section */}
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="Cepromas Logo"
            className="w-[280px] lg:w-[500px] object-contain"
          />
        </div>

        {/* Card */}
        <div className="bg-white w-full max-w-[520px] h-full rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F1F1F1] px-13 py-5">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-[22px] font-semibold text-[#111827]">
              Personal Information
            </h2>

            <p className="text-[#6B7280] text-[13px] leading-5 mt-2">
              Help us create a secure and
              <br />
              personalized experience for you.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/kyc");
            }}
          >
            {/* Occupation */}
            <div className="mb-5">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Occupation
              </label>

              <input
                type="text"
                placeholder="enter occupation"
                className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 focus:border-[#2540A8]"
              />
            </div>

            {/* State */}
            <div className="mb-5">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                State
              </label>

              <div className="relative">
                <select
                  defaultValue=""
                  className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm appearance-none cursor-pointer focus:border-[#2540A8]"
                >
                  <option value="" disabled>
                    Select state
                  </option>

                  {NIGERIAN_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▾
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="mb-5">
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

            {/* Confirm Password */}
            <div className="mb-8">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="confirm password"
                  className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 pr-10 focus:border-[#2540A8]"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showConfirmPassword ? (
                    <FaEye size={15} />
                  ) : (
                    <FaEyeSlash size={15} />
                  )}
                </button>
              </div>
            </div>

            {/* Continue Button */}
            <Button
              text="Continue"
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

            {/* Login Link */}
            <p className="text-center text-sm text-[#6B7280] mt-6">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/")}
                className="text-[#3658C9] font-medium cursor-pointer hover:underline"
              >
                Login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;