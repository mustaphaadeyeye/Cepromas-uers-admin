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

const MarketPlace = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("Apartment");

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
          Find homes, apartments, land, and commercial spaces available for rent, lease, or purchase.
        </p>

        {/* Mobile-only category strip, sits above search/location */}
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
          {/* Location - first on mobile, last on desktop (matches original desktop order) */}
          <div className="order-1 md:order-3 w-full md:w-auto">
            <LocationSelect />
          </div>

          {/* Search + Filter row */}
          <div className="order-2 md:order-1 flex items-center gap-3 w-full md:flex-1">
            <div className="flex items-center flex-1 h-12 bg-white border border-gray-200 rounded-lg px-4">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search"
                className="ml-3 w-full outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            <div className="relative shrink-0">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center"
              >
                <FiSliders className="text-lg text-gray-500" />
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                  {["All", "Real Estate", "Agriculture"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setFilter(item);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
                        filter === item
                          ? "bg-gray-50 font-semibold text-[#0F1B4C]"
                          : "text-gray-600"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <MarketPlaceTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            hideTabsOnMobile
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default MarketPlace;