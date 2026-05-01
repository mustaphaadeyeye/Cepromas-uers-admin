import React from "react";

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

const Wrapper = ({
  children,
  size = "xl",
  as: Tag = "div",
  className = "",
  ...props
}) => {
  return (
    <Tag
      className={`w-full mx-auto px-4 md:px-6 lg:px-6 xl:px-3  ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

export default Wrapper;