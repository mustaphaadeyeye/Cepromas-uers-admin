import React from 'react'
import {
  fontWeight,
  fontFamily,
  textDecoration,
} from "../../components/styles/theme";

const ActionCard = ({
  icon,
  number,          
  text,             
  mobileText,
  label,             
  bg = "bg-[#E8F5E2]",
  textColor = "text-[#05062F]",
  width = "w-[314px]",
  height = "h-[100px]",
  onClick,
  rounded,
}) => {
  const isStatCard = number !== undefined

  return (
    <div
      onClick={onClick}
      className={`
        ${bg} ${width} ${height} ${rounded}
        rounded-2xl flex ${isStatCard ? 'flex-col md:flex-row' : 'flex-row'}
        items-center justify-center text-center
        gap-1 md:gap-2 px-2 cursor-pointer transition duration-200 hover:opacity-90
      `}
    >
      {icon && (
        <span className={`${textColor} flex items-center shrink-0`}>
          {icon}
        </span>
      )}

      {isStatCard ? (
        <>
          <span
            className={`
              ${textColor} ${fontWeight.bold} ${fontFamily.main} ${textDecoration.none}
              text-[18px] md:text-[22px] leading-tight
            `}
          >
            {number}
          </span>
          <span
            className={`
              text-gray-500 ${fontWeight.normal} ${fontFamily.main} ${textDecoration.none}
              text-[12px] md:text-[14px] leading-tight
            `}
          >
            {label}
          </span>
        </>
      ) : (
        <span
          className={`
            ${textColor} ${fontWeight.normal} ${fontFamily.main} ${textDecoration.none}
            tracking-wide leading-tight text-[13px] md:text-[18px]
          `}
        >
          <span className="md:hidden">{mobileText || text}</span>
          <span className="hidden md:inline">{text}</span>
        </span>
      )}
    </div>
  )
}

export default ActionCard