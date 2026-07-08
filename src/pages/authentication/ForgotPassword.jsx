import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import logo from "../../assets/image/cepromasLogo.svg";
import { useNavigate } from "react-router-dom";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  bgColor,
} from "../../components/styles/theme";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
   const navigate = useNavigate();
  return (
    <div className={`min-h-screen bg-[#f3f3f3] flex ${fontFamily.main}`}>
      {/* Left Side */}
      <div className="w-[45%] hidden lg:flex items-center justify-center">
        <img
          src={logo}
          alt="CEPROMAS"
          className="w-[320px] object-contain"
        />
      </div>

      {/* Right Side */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-5">
        <div className="bg-white w-full max-w-[500px] min-h-[560px] rounded-[10px] shadow-lg p-7">
          <button
            className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600"
            onClick={() => step > 1 && setStep(step - 1)}
          >
            <FaArrowLeft size={12} />
          </button>

          {/* Forgot Password */}
          {step === 1 && (
            <div className="mt-16">
              <div className="text-center">
                <h2 className="text-[20px] font-semibold text-[#111]">
                  Forgot Password
                </h2>
                <p className="text-[13px] text-gray-500 mt-3 leading-5">
                  We'll send you an OTP to reset your
                  <br />
                  password and get you moving again.
                </p>
              </div>

              <div className="mt-14">
                <label className="block text-[13px] text-gray-600 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="enter email"
                  className="w-full h-12 bg-[#f8f9fb] px-4 rounded outline-none text-sm"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full h-12 bg-[#02024d] text-white rounded mt-10 text-sm font-medium"
              >
                Continue
              </button>
            </div>
          )}

          {/* OTP */}
          {step === 2 && (
            <div className="mt-16">
              <div className="text-center">
                <h2 className="text-[20px] font-semibold text-[#111]">OTP</h2>
                <p className="text-[13px] text-gray-500 mt-3 leading-5">
                  Enter the 5-digit code we sent to your email
                  <br />
                  to continue.
                </p>
              </div>

              <div className="mt-14">
                <label className="block text-[13px] text-gray-600 mb-2">
                  OTP
                </label>

                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <input
                      key={item}
                      maxLength={1}
                      className="w-full h-12 bg-[#f8f9fb] rounded text-center outline-none"
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={() => setStep(3)}
                className="w-full h-12 bg-[#02024d] text-white rounded mt-10 text-sm font-medium"
              >
                Continue
              </button>
            </div>
          )}

          {/* Reset Password */}
          {step === 3 && (
            <div className="mt-16">
              <div className="text-center">
                <h2 className="text-[20px] font-semibold text-[#111]">
                  Reset Password
                </h2>
                <p className="text-[13px] text-gray-500 mt-3 leading-5">
                  Create a strong, secure password to keep
                  <br />
                  your account safe.
                </p>
              </div>

              <div className="mt-10">
                <label className="block text-[13px] text-gray-600 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="enter password"
                  className="w-full h-12 bg-[#f8f9fb] px-4 rounded outline-none text-sm"
                />
              </div>

              <div className="mt-6">
                <label className="block text-[13px] text-gray-600 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="confirm password"
                  className="w-full h-12 bg-[#f8f9fb] px-4 rounded outline-none text-sm"
                />
              </div>

              

              <button className="w-full h-12 bg-[#02024d] text-white rounded mt-10 text-sm font-medium"
                 onClick={() => navigate("/")}
              >
                Continue
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;