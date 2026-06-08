import React from 'react'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  textDecoration,
  letterSpacing,
  bgColor,
} from "../../components/styles/theme";

const ActionCard = ({
  icon,
  text = "Action",
  mobileText,
  bg = "bg-[#E8F5E2]",
  textColor = "text-[#05062F]",
  width = "w-[314px]",
  height = "h-[100px]",
  onClick,
  rounded,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        ${bg} ${width} ${height} ${rounded}
        rounded-2xl flex items-center justify-center
        gap-3 cursor-pointer transition duration-200 hover:opacity-90
      `}
    >
      {icon && (
        <span className={`${textColor} flex items-center`}>
          {icon}
        </span>
      )}
      <span
        className={`
          ${textColor}
          ${fontWeight.normal}
          ${fontFamily.main}
          ${textDecoration.none}
          tracking-wide
          xl:text-[18px] lg:text-[18px] md:text-[18px] text-[14px]
        `}
      >
        {/* show mobileText on mobile, text on md and above */}
        <span className="md:hidden">{mobileText || text}</span>
        <span className="hidden md:inline">{text}</span>
      </span>
    </div>
  )
}

export default ActionCard