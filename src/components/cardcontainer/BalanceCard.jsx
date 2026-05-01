import React from 'react'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  bgColor,
 
} from "../../components/styles/theme";
import Circleicon from "../../assets/icons/circlegroup.png"

const BalanceCard = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)',
      }}
      className="
        rounded-[20px]
        p-5 md:p-6
        w-full xl:w-238.5
        h-70
         
        relative
      "
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className={`${textColor.white} ${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>Total Amount</p>

        {/* Eye slash icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-75">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Amount */}
      <p className={`${textColor.white} ${fontSize["7xl"]} ${fontWeight.light} ${fontFamily.main} mt-4`}>
        ₦500,000,000
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between absolute bottom-5 left-5 right-5">
        {/* Growth indicator */}
        <div className="flex items-center gap-1.5">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M7 17L17 7M17 7H7M17 7v10" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`${fontSize["2xl"]} ${textColor.white} ${fontWeight.normal} ${fontFamily.main}`}>₦200,000,000 (20%)</span>
        </div>

        {/* Card chip icon */}
        <div className="flex items-center">
          {/* <div className="w-7 h-4.5 bg-[#3D52C4] rounded-sm opacity-90 -mr-2 z-0" />
          <div className="w-7 h-4.5 bg-[#1a1a2e] rounded-sm opacity-85 z-10" /> */}
          <img src={Circleicon} alt="card chip" className="w-14.5 h-[39.88px]" />
        </div>
      </div>

    </div>
  )
}

export default BalanceCard