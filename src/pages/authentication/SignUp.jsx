import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/cepromasLogo.svg";
import Button from "../../components/buttons/Button";
import { fontFamily } from "../../components/styles/theme";

const SignUp = () => {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className={`min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 py-6 ${fontFamily.main}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32">
        
        {/* Logo Section */}
        <div className="flex justify-center items-center">
          <img
            src={logo}
            alt="Cepromas Logo"
            className="w-[300px] lg:w-[520px] object-contain"
          />
        </div>

        {/* Signup Card */}
        <div className="bg-white w-full max-w-[520px] rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-[#F1F1F1] px-10 py-10">
          
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-[22px] font-semibold text-[#111827]">
              Signup
            </h2>

            <p className="text-[#6B7280] text-[13px] leading-5 mt-2">
              Create an account to explore,
              <br />
              buy, and invest in top properties
              <br />
              with ease.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate("/personal-info");
            }}
          >
            {/* Email */}
            <div className="mb-4">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="enter email"
                className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 focus:border-[#2540A8]"
              />
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Phone Number
              </label>

              <input
                type="tel"
                placeholder="enter phone number"
                className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 focus:border-[#2540A8]"
              />
            </div>

            {/* Address */}
            <div className="mb-4">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Address
              </label>

              <input
                type="text"
                placeholder="enter address"
                className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 focus:border-[#2540A8]"
              />
            </div>

            {/* Referral Code */}
            <div className="mb-5">
              <label className="block text-[13px] text-[#6B7280] mb-2">
                Referral Code
                <span className="text-gray-400 font-normal">
                  {" "}
                  (optional)
                </span>
              </label>

              <input
                type="text"
                placeholder="enter referral code"
                className="w-full h-[48px] px-4 bg-[#F8FAFC] border border-[#E5E7EB] rounded-md outline-none text-sm placeholder:text-gray-300 focus:border-[#2540A8]"
              />
            </div>

            {/* Terms */}
            <div className="flex items-center gap-2 mb-6">
              <input
                type="checkbox"
                id="terms"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#06064A]"
              />

              <label
                htmlFor="terms"
                className="text-sm text-[#6B7280] cursor-pointer"
              >
                Agree to{" "}
                <span className="text-[#3658C9] hover:underline">
                  Terms & Conditions
                </span>
              </label>
            </div>

            {/* Continue */}
            <Button
              text="Continue"
              bg="bg-[#02024D]"
              width="w-full"
              height="h-[48px]"
              rounded="rounded-md"
              className="text-white text-sm font-medium hover:opacity-90 transition"
              type="submit"
            />

            {/* Google */}
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

            {/* Login */}
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

export default SignUp;