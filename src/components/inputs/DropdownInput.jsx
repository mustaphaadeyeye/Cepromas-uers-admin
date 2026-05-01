import React, { useState, useRef, useEffect } from "react";
import DropImg from "../../assets/icons/dropicon.png";

const DropdownInput = ({
  text = "Select option",
  icon = <img src={DropImg} alt="dropdown" />,
  width = "w-full",
  height = "h-[36px] md:h-[40px] lg:h-[44px] xl:h-[48px]",
  rounded = "rounded-[6px]",
  bg = "bg-[#F3F4F5]",
  options = [],
  children,
  onSelect,
  className = "",
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(text);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    setSelected(item);
    setOpen(false);
    onSelect && onSelect(item);
  };

  return (
    // ✅ wrapper now uses the width prop instead of hardcoded w-full
    <div className={`relative ${width}`} ref={dropdownRef}>

      {/* Trigger */}
      <div
        onClick={() => setOpen(!open)}
        className={`
          flex items-center justify-between
          px-2 md:px-3 lg:px-4 xl:px-4
          gap-2 md:gap-3 lg:gap-4 xl:gap-5
          w-full ${height} ${rounded} ${bg}
          cursor-pointer select-none
          ${className}
        `}
      >
        <span className="truncate leading-none">
          {selected}
        </span>

        <span className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}>
          {icon}
        </span>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {children ? (
            children
          ) : (
            <ul className="py-1">
              {options.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleSelect(item)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

    </div>
  );
};

export default DropdownInput;