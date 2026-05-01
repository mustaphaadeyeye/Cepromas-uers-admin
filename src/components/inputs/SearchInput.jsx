import React from "react";
import SearchIcon from "../../assets/icons/iicon.png";
import { fontSize, fontWeight, textColor, fontFamily } from "../styles/theme";

const SearchInput = ({
  placeholder = "Search...",
  icon = <img src={SearchIcon} alt="Search" />,
  width = "w-[258px]",
  height = "h-[42px]",
  rounded = "rounded-[8px]",
  bg = "bg-white",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`
        flex items-center gap-2 px-3
        ${width} ${height} ${rounded} ${bg}
        border border-gray-300
        ${className}
      `}
    >
      <span className="text-gray-500">{icon}</span>

      <input
        type="text"
        className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.dark} w-full h-full outline-none bg-transparent`}
        placeholder={placeholder}
        className="w-full h-full outline-none bg-transparent text-sm"
        {...props}
      />
    </div>
  );
};

export default SearchInput;