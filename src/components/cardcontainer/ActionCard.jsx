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
  bg = "bg-[#E8F5E2]",
  textColor = "text-[#05062F]",
  width = "w-[314px]",
  height = "h-[100px]",
}) => {
  return (
    <div
      className={`
        ${bg}
        ${width}
        ${height}
        rounded-2xl
        flex items-center justify-center
        gap-3
        cursor-pointer
        transition duration-200
        hover:opacity-90
      `}
    >
      <div>
        
      </div>
      {icon && (
        <span className={`${textColor} flex items-center`}>
          {icon}
        </span>
      )}
      <span
        className={`
          ${textColor}
          ${fontSize.lg}
          ${fontWeight.normal}
          ${fontFamily.main}
         ${textDecoration.none}
         tracking-wide
        `}
      >
        {text}
      </span>
    </div>
  )
}

export default ActionCard