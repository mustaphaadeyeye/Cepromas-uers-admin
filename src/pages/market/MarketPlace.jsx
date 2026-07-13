import { useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import { FiSearch, FiSliders } from "react-icons/fi";
import LocationSelect from "../../components/inputs/LocationSelect";
import MarketPlaceTab, { TABS } from "./MarketPlaceTab";
import { useGetAllProperties } from "../../hooks/property/useGetAllProperties.js";

// Map frontend tab display labels directly to your backend PropertyType enum values
const TAB_ENUM_MAPPING = {
  Apartment: "RESIDENTIAL",
  Lands: "LAND",
  Shops: "COMMERCIAL",
  Hostels: "LODGING",
  Warehouses: "INDUSTRIAL",
  "Event Centers": "COMMERCIAL", // Event centers roll into Commercial in your system types
};

const MarketPlace = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [propertyStatus, setPropertyStatus] = useState(""); // Maps to backend property status strings
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [activeTab, setActiveTab] = useState("Apartment");

  // Fetch data dynamically from the backend with concurrent multi-filter support
  const {
    data: properties = [],
    isPending: propertiesLoading,
    isError: propertiesError,
  } = useGetAllProperties({
    search: searchQuery,
    status: propertyStatus,
    location: selectedLocation,
    type: TAB_ENUM_MAPPING[activeTab] || "",
  });

  return (
    <div>
      <Wrapper>
        <h1
          className={`${fontSize["2xl"]} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
        >
          Market Place - Explore Properties
        </h1>

        <p
          className={`mt-4 mb-6 ${fontFamily.main} ${fontWeight.normal} ${fontSize.lg} ${textColor.primary}`}
        >
          Find homes, apartments, land, and commercial spaces available for
          rent, lease, or purchase.
        </p>

        {/* Mobile category strip */}
        <div className="md:hidden mb-3 -mx-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 px-1">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative py-2 text-sm whitespace-nowrap shrink-0 transition-colors ${
                  tab === activeTab
                    ? "font-semibold text-gray-900"
                    : "font-normal text-gray-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Search Area */}
        <div className="bg-[#F8F9FD] rounded-xl p-3 flex flex-col md:flex-row md:flex-nowrap items-stretch md:items-center gap-3">
          <div className="order-1 md:order-3 w-full md:w-auto">
            <LocationSelect
              value={selectedLocation}
              onChange={(val) => setSelectedLocation(val)}
            />
          </div>

          {/* Search + Filter row */}
          <div className="order-2 md:order-1 flex items-center gap-3 w-full md:flex-1">
            <div className="flex items-center flex-1 h-12 bg-white border border-gray-200 rounded-lg px-4">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or area..."
                className="ml-3 w-full outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
              >
                <FiSliders className="text-lg text-gray-500" />
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                  <button
                    onClick={() => {
                      setPropertyStatus("");
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
                      propertyStatus === ""
                        ? "bg-gray-50 font-semibold text-[#0F1B4C]"
                        : "text-gray-600"
                    }`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => {
                      setPropertyStatus("AVAILABLE");
                      setShowFilter(false);
                    }}
                    className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
                      propertyStatus === "AVAILABLE"
                        ? "bg-gray-50 font-semibold text-[#0F1B4C]"
                        : "text-gray-600"
                    }`}
                  >
                    Available Listings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Display Section */}
        <div>
          <MarketPlaceTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            hideTabsOnMobile
            properties={properties}
            isLoading={propertiesLoading}
            isError={propertiesError}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default MarketPlace;
