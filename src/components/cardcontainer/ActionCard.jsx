import React from 'react'
import {
  fontWeight,
  fontFamily,
  textDecoration,
} from "../../components/styles/theme";

const ActionCard = ({
  icon,
  number = "0",
  label = "Action",
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
        rounded-2xl flex flex-col md:flex-row items-center justify-center text-center
        gap-1 md:gap-2 px-2 cursor-pointer transition duration-200 hover:opacity-90
      `}
    >
      {icon && (
        <span className={`${textColor} flex items-center shrink-0`}>
          {icon}
        </span>
      )}

      <span
        className={`
          ${textColor}
          ${fontWeight.normal}
          ${fontFamily.main}
          ${textDecoration.none}
          text-[18px] md:text-[22px] leading-tight
        `}
      >
        {number}
      </span>

      <span
        className={`
          text-gray-500
          ${fontWeight.normal}
          ${fontFamily.main}
          ${textDecoration.none}
          text-[12px] md:text-[14px] leading-tight
        `}
      >
        {label}
      </span>
    </div>
  )
}

export default ActionCard