import React, { useState } from 'react'
import logo from "../../assets/image/cepromasLogo.svg";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  bgColor,
} from "../../components/styles/theme";
import { useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import Face from "../../assets/icons/faceid.png";

const Kyc = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 

  const handleSignUp = (e) => {
    e.preventDefault();
    setStep(2); 
  };

  return (
    <div className={`min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 py-10 ${fontFamily.main}`}>
      <div className='flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-24 w-full lg:w-auto'>
         {/* Left Side Logo - hidden on mobile, same sizing as Login logo */}
                <div className="hidden lg:flex justify-center items-center">
  <img
    src={logo}
    alt="Cepromas Logo"
    className="w-[280px] lg:w-[500px] object-contain"
  />
</div>
        <div className='bg-[#ffffff] w-full max-w-[500px] lg:w-[500px] lg:h-[500px] shadow-[0px_25px_50px_rgba(0,0,0,0.1)] rounded-2xl py-10 lg:py-18 px-6 sm:px-10 lg:px-20 border border-[#E5E7EB]'>

          
          {step === 1 && (
            <div>
              <p className={`text-[#2540A8] ${fontWeight.semibold} ${fontSize["2xl"]} ${fontFamily.main} text-right`}>
                Skip
              </p>
              <h2 className={`text-[#05062F] ${fontWeight.semibold} ${fontSize["2xl"]} ${fontFamily.main} text-center mb-4`}>
                KYC
              </h2>
              <p className={`text-[#6B7280] ${fontWeight.normal} ${fontSize.base} ${fontFamily.main} text-center`}>
                Verify your identity to secure your account and access all platform features.
              </p>

              <form onSubmit={handleSignUp}>
                {/* NIN */}
                <div className="mt-10">
                  <label className="block text-sm text-gray-500 mb-1.5">NIN</label>
                  <input
                    type="text"
                    placeholder="enter NIN number"
                    className="w-full px-4 py-2.5 bg-[#DBE8FD] border border-transparent rounded-md outline-none text-sm placeholder:text-gray-400 focus:border-blue-400 transition"
                  />
                </div>

                {/* Continue Button */}
                <div className="mt-14">
                  <Button
                    text="SignUp"
                    bg="bg-[#06064A]"
                    width="w-full"
                    height="h-[44px]"
                    rounded="rounded-md"
                    className="text-sm font-medium hover:opacity-90 transition text-white"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          )}

         
          {step === 2 && (
            <div className="flex flex-col h-full">
              <p
                className={`text-[#2540A8] ${fontWeight.semibold} ${fontSize["2xl"]} ${fontFamily.main} text-right cursor-pointer`}
                onClick={() => navigate("/dashboard")} 
              >
                Skip
              </p>
              <h2 className={`text-[#05062F] ${fontWeight.semibold} ${fontSize["2xl"]} ${fontFamily.main} text-center mb-4`}>
                KYC
              </h2>
              <p className={`text-[#6B7280] ${fontWeight.normal} ${fontSize.base} ${fontFamily.main} text-center`}>
                Verify your identity to secure your account and access all platform features.
              </p>

              {/* Face scan avatar */}
              <div className="flex justify-center items-center mt-8 mb-8">
                <img src={Face} alt="Face Scan Avatar" className="w-[120px] h-[120px] object-contain" />
              </div>

              {/* Continue Button */}
              <div className="mt-8 lg:mt-auto">
                <Button
                  text="Continue"
                  bg="bg-[#06064A]"
                  width="w-full"
                  height="h-[44px]"
                  rounded="rounded-md"
                  className="text-sm font-medium hover:opacity-90 transition text-white"
                  onClick={() => navigate("/forgot-password")} 
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Kyc;