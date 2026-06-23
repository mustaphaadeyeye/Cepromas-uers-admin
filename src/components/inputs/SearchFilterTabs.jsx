import React, { useState } from "react";
import SearchInput from "../../components/inputs/SearchInput";
import Button from "../../components/buttons/Button";
import FilterIcon from "../../assets/icons/Faders.png";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";
import Cardbg from "../cardcontainer/Cardbg";
import DashImage from "../../pages/dashboard/DashImage";

const SearchFilterTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("investments");
  const [activeSubTab, setActiveSubTab] = useState("rent");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("");

  const handleTab = (tab) => {
    setActiveTab(tab);
    onTabChange && onTabChange(tab);
  };

  return (
    <div>
      <div className="flex flex-row gap-3">
        {/* Tabs row */}
        <div className="flex items-center gap-3">
          <Button
            text="Invest"
            bg={
              activeTab === "investments"
                ? "bg-[#05062F]"
                : "bg-[#F3F4F5]"
            }
            width="w-[185px]"
            height="h-[44px]"
            rounded="rounded-[10px]"
            className={`
              flex-1
              ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
              ${
                activeTab === "investments"
                  ? "text-white"
                  : textColor.secondary
              }
            `}
            onClick={() => handleTab("investments")}
          />

          <Button
            text="Properties"
            bg={
              activeTab === "properties"
                ? "bg-[#05062F]"
                : "bg-[#F3F4F5]"
            }
            width="w-[185px]"
            height="h-[44px]"
            rounded="rounded-[10px]"
            className={`
              flex-1
              ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
              ${
                activeTab === "properties"
                  ? "text-white"
                  : textColor.secondary
              }
            `}
            onClick={() => handleTab("properties")}
          />
        </div>

        {/* Search + Filter row */}
        <div className="flex items-center gap-3 w-full bg-[#769AF2] p-4 rounded-[10px] opacity-15">
          <div className="flex-1">
            <SearchInput
              placeholder="Search"
              width="w-[399px]"
              height="h-[48px]"
              bg="bg-[#F3F4F5]"
              className="border-none"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="
                w-[44px] h-[48px] shrink-0
                bg-[#F3F4F5] rounded-[10px]
                flex items-center justify-center
                cursor-pointer hover:opacity-80 transition
              "
            >
              <img src={FilterIcon} alt="filter" className="w-5 h-5" />
            </button>

            {showFilter && (
              <div className="absolute top-full mt-2 right-0 bg-white shadow-md rounded-[10px] p-2 w-40 z-50">
                <p
                  onClick={() => {
                    setFilterType("low");
                    setShowFilter(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  Lowest Price
                </p>

                <p
                  onClick={() => {
                    setFilterType("short");
                    setShowFilter(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  &lt; 6 Months
                </p>

                <p
                  onClick={() => {
                    setFilterType("long");
                    setShowFilter(false);
                  }}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  &gt; 6 Months
                </p>
              </div>
            )}
          </div>

          <div className="flex-1">
            <SearchInput
              placeholder="Search"
              width="w-[368px]"
              height="h-[48px]"
              bg="bg-[#F3F4F5]"
              className="border-none"
            />
          </div>
        </div>
      </div>
          <div className={`flex flex-row justify-between mt-6 ${fontFamily.main}`}>
            <p className={`${fontWeight.semibold} ${textColor.primary} ${fontSize.lg}`}>Smart Investment Opportunities</p>
            <p className={`${textColor.lightBlue} ${fontWeight.semibold} ${fontSize.lg}`}>View More</p>
          </div>
      {/* Content Section */}
      <div className="mt-6">
        {activeTab === "investments" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
            <Cardbg to="/investment-description" />
            <Cardbg to="/investment-description" />
            <Cardbg to="/investment-description" />
            <Cardbg to="/investment-description" />
            <Cardbg to="/investment-description" />
            <Cardbg to="/investment-description" />
          </div>
        )}

        {activeTab === "properties" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
            <DashImage />
            <DashImage />
            <DashImage />
            <DashImage />
            <DashImage />
            <DashImage />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilterTabs;