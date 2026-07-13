import React from "react";
import { FiChevronDown, FiMapPin } from "react-icons/fi";

const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT",
  "Gombe",
  "Imo",
  "USA",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const LocationSelect = ({ value, onChange }) => {
  return (
    <div className="relative w-full xl:w-[368px] lg:w-[368px] md:w-[368px]">
      <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full h-12 rounded-lg bg-[#F3F4F5] pl-10 pr-10 text-sm text-gray-500 outline-none border-none cursor-pointer"
      >
        <option value="">All Locations</option>
        {states.map((state) => (
          // Value maps cleanly to exact casing to resolve mismatch variations
          <option key={state} value={state}>
            {state}
          </option>
        ))}
      </select>

      <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
    </div>
  );
};

export default LocationSelect;
