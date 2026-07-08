import React from 'react'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import Circleicon from "../../assets/icons/circlegroup.png"

const BalanceCard = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)',
      }}
      className="
        w-full max-w-238.5
        rounded-[6px] sm:rounded-[12px] lg:rounded-[20px]
        p-4 sm:p-5 md:p-6
        flex flex-col justify-between
        min-h-45 sm:min-h-52 md:min-h-60 xl:min-h-70
        gap-6
      "
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <p className={`${textColor.white} ${fontWeight.normal} ${fontFamily.main} text-base sm:text-lg md:text-xl xl:${fontSize["2xl"]}`}>
          Total Amount
        </p>

        {/* Eye slash icon */}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="opacity-75 shrink-0">
          <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="1" y1="1" x2="23" y2="23" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Amount */}
      <p className={`${textColor.white} ${fontWeight.light} ${fontFamily.main} break-words text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight`}>
        ₦500,000,000
      </p>

      {/* Bottom row */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        {/* Growth indicator */}
        <div className="flex items-center gap-1.5 min-w-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0 sm:w-6 sm:h-6">
            <path d="M7 17L17 7M17 7H7M17 7v10" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className={`${textColor.white} ${fontWeight.normal} ${fontFamily.main} text-sm sm:text-base md:text-lg xl:${fontSize["2xl"]} truncate`}>
            ₦200,000,000 (20%)
          </span>
        </div>

        {/* Card chip icon */}
        <img
          src={Circleicon}
          alt="card chip"
          className="w-10 h-7 sm:w-12 sm:h-8 md:w-14.5 md:h-[39.88px] shrink-0"
        />
      </div>
    </div>
  )
}

export default BalanceCard