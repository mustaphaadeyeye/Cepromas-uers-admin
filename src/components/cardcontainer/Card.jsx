import React from "react";

const Card = ({
  children,
  width = "w-full",
  height = "h-auto",
  rounded = "rounded-[8px]",
  bg = "bg-[#FFFFFF]",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        ${width}
        ${height}
        ${rounded}
        ${bg}
        p-4 sm:p-5 lg:p-6
        shadow-sm
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;