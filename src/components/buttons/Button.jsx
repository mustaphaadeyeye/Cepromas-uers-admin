import React from "react";

const Button = ({
  text = "Button",
  bg = "bg-blue-600",
  width = "w-[102px]",
  height = "h-[44px]",
  rounded = "rounded-[6px]",
  className = "",
  ...props
}) => {
  return (
    <button
      className={`
        ${bg}
        ${width}
        ${height}
        ${rounded}
        flex items-center justify-center
        font-medium
        transition duration-300
        hover:opacity-90
        cursor-pointer
        ${className}
      `}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;