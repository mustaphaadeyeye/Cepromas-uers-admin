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
import LocationSelect from "../../components/inputs/LocationSelect";


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
      <div
        className="
          flex xl:flex-row gap-3 lg:flex-row md:flex-row flex-col
          bg-[#769AF2]/5 md:bg-transparent lg:bg-transparent xl:bg-transparent
          p-4 md:p-0 lg:p-0 xl:p-0
          rounded-[10px]
        "
      >
        {/* Tabs row — below search/location on mobile, above it on md+ */}
        <div className="flex items-center gap-3 order-2 md:order-1 lg:order-1 xl:order-1">
          <Button
            text="Investments"
            bg={
              activeTab === "investments"
                ? "bg-[#05062F]"
                : "bg-[#F3F4F5]"
            }
            width="w-[166px] md:w-[185px] lg:w-[185px] xl:w-[185px]"
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
            text="Market Place"
            bg={
              activeTab === "properties"
                ? "bg-[#05062F]"
                : "bg-[#F3F4F5]"
            }
            width="w-[166px] md:w-[185px] lg:w-[185px] xl:w-[185px]"
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

        {/* Search + Filter + Location — above tabs on mobile, below them on md+ */}
        <div className="flex items-center xl:flex-row lg:flex-row md:flex-row flex-col gap-3 w-full xl:bg-[#769AF2] xl:opacity-15  xl:p-4 rounded-[10px] order-1 md:order-2 lg:order-2 xl:order-2">
          {/* Search + Filter stay paired on one row, even on mobile */}
          <div className="flex items-center gap-3 flex-1 w-full">
            <div className="flex-1">
              <SearchInput
                placeholder="Search"
                width="xl:w-[368px] lg:w-[368px] md:w-[368px] w-full"
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
          </div>

          {/* Location — own full-width row on mobile, inline with search on md+ */}
          <div className="flex-1 w-full">
            <LocationSelect
              placeholder="Location"
              width="xl:w-[368px] lg:w-[368px] md:w-[368px] w-full"
              height="h-[48px]"
              bg="bg-[#F3F4F5]"
              className="border-none"
            />
          </div>
        </div>
      </div>
          <div className={`flex flex-row justify-between mt-6 ${fontFamily.main}`}>
            <p className={`${fontWeight.semibold} ${textColor.primary} ${fontSize.lg}`}>Smart Investment Opportunities</p>
            <p className={`${textColor.lightBlue} ${fontWeight.semibold} ${fontSize.lg} lg:block hidden`}>View All</p>
          </div>
      {/* Content Section */}
      <div className="mt-6">
        {activeTab === "investments" && (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
  <Cardbg to="/app/investment-description" />
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