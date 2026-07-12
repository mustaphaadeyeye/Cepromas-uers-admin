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
// IMPORT YOUR NEW HOOK HERE
import { useGetAllProperties } from "../../hooks/property/useGetAllProperties.js";

const SearchFilterTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState("investments");
  const [showFilter, setShowFilter] = useState(false);
  const [filterType, setFilterType] = useState("");

  // NEW FILTER STATES FOR BACKEND INTEGRATION
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyStatus, setPropertyStatus] = useState(""); // E.g., 'AVAILABLE', 'SOLD'

  // CALLING THE GET PROPERTIES HOOK
  // Enabled option prevents querying the endpoint if the user isn't on the properties tab
  const {
    data: properties,
    isPending,
    isError,
  } = useGetAllProperties({
    search: searchQuery,
    status: propertyStatus,
  });

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
        {/* Tabs row */}
        <div className="flex items-center gap-3 order-2 md:order-1 lg:order-1 xl:order-1">
          <Button
            text="Investments"
            bg={activeTab === "investments" ? "bg-[#05062F]" : "bg-[#F3F4F5]"}
            width="w-[166px] md:w-[185px] lg:w-[185px] xl:w-[185px]"
            height="h-[44px]"
            rounded="rounded-[10px]"
            className={`
              flex-1
              ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
              ${activeTab === "investments" ? "text-white" : textColor.secondary}
            `}
            onClick={() => handleTab("investments")}
          />

          <Button
            text="Market Place"
            bg={activeTab === "properties" ? "bg-[#05062F]" : "bg-[#F3F4F5]"}
            width="w-[166px] md:w-[185px] lg:w-[185px] xl:w-[185px]"
            height="h-[44px]"
            rounded="rounded-[10px]"
            className={`
              flex-1
              ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
              ${activeTab === "properties" ? "text-white" : textColor.secondary}
            `}
            onClick={() => handleTab("properties")}
          />
        </div>

        {/* Search + Filter + Location */}
        <div className="flex items-center xl:flex-row lg:flex-row md:flex-row flex-col gap-3 w-full xl:bg-[#769AF2] xl:opacity-15 xl:p-4 rounded-[10px] order-1 md:order-2 lg:order-2 xl:order-2">
          <div className="flex items-center gap-3 flex-1 w-full">
            <div className="flex-1">
              <SearchInput
                placeholder="Search properties..."
                width="xl:w-[368px] lg:w-[368px] md:w-[368px] w-full"
                height="h-[48px]"
                bg="bg-[#F3F4F5]"
                className="border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
                      setPropertyStatus(""); // Clears state to see all
                      setShowFilter(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    All Properties
                  </p>
                  <p
                    onClick={() => {
                      setPropertyStatus("AVAILABLE"); // Adjust strings matching your backend enum rules
                      setShowFilter(false);
                    }}
                    className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    Available
                  </p>
                </div>
              )}
            </div>
          </div>

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
        <p
          className={`${fontWeight.semibold} ${textColor.primary} ${fontSize.lg}`}
        >
          {activeTab === "investments"
            ? "Smart Investment Opportunities"
            : "Available Marketplace Properties"}
        </p>
        <p
          className={`${textColor.lightBlue} ${fontWeight.semibold} ${fontSize.lg} lg:block hidden`}
        >
          View All
        </p>
      </div>

      {/* Content Section */}
      <div className="mt-6">
        {activeTab === "investments" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
            <Cardbg to="/app/investment-description" />
          </div>
        )}

        {activeTab === "properties" && (
          <>
            {isPending && (
              <p className="text-gray-500 text-center py-10">
                Loading properties map...
              </p>
            )}

            {isError && (
              <p className="text-red-500 text-center py-10">
                Something went wrong fetching properties.
              </p>
            )}

            {!isPending && !isError && properties?.length === 0 && (
              <p className="text-gray-400 text-center py-10">
                No matching properties found.
              </p>
            )}

            {!isPending && !isError && properties?.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
                {properties.map((property) => (
                  <DashImage
                    key={property.id}
                    property={property}
                    to={`/app/property/${property.id}`}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchFilterTabs;
