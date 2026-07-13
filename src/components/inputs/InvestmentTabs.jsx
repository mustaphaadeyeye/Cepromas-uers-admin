import { useState } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";
import LocationSelect from "./LocationSelect";
// We consolidate the two files into a live component
import { fontFamily } from "../../components/styles/theme";
import InvestmentGrid from "../../pages/investment/InvestmentGrid";

const InvestmentTabs = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  investments,
  isLoading,
  isError,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Tabs */}
        <div
          className={`flex lg:items-center justify-center lg:gap-10 gap-30 ${fontFamily.main}`}
        >
          <button
            onClick={() => setActiveTab("Real Estate")}
            className={`relative pb-3 text-[16px] font-medium transition cursor-pointer ${
              activeTab === "Real Estate"
                ? "text-[#0F1B4C] font-semibold"
                : "text-gray-400"
            }`}
          >
            Real Estate
            {activeTab === "Real Estate" && (
              <span className="absolute left-0 bottom-0 w-full h-[3px] rounded-full bg-[#0F1B4C]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("Agriculture")}
            className={`relative pb-3 text-[16px] font-medium transition cursor-pointer ${
              activeTab === "Agriculture"
                ? "text-[#0F1B4C] font-semibold"
                : "text-gray-400"
            }`}
          >
            Agriculture
            {activeTab === "Agriculture" && (
              <span className="absolute left-0 bottom-0 w-full h-[3px] rounded-full bg-[#0F1B4C]" />
            )}
          </button>
        </div>

        {/* Search Area */}
        <div className="flex-1 bg-[#F8F9FD] rounded-xl p-3 flex flex-col lg:flex-row lg:flex-nowrap items-center gap-3">
          <div className="w-full lg:w-auto order-1 lg:order-3">
            <LocationSelect
              value={selectedLocation}
              onChange={setSelectedLocation}
            />
          </div>

          <div className="flex items-center w-full lg:w-auto flex-1 gap-3 order-2 lg:order-none lg:contents">
            {/* Search */}
            <div className="flex items-center flex-1 h-12 bg-white border border-gray-200 rounded-lg px-4 lg:order-1">
              <FiSearch className="text-gray-400 text-lg" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeTab.toLowerCase()}...`}
                className="ml-3 w-full outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Filter */}
            <div className="relative lg:order-2">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="w-12 h-12 bg-white border border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-50 transition"
              >
                <FiSliders className="text-lg text-gray-500" />
              </button>

              {showFilter && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border overflow-hidden z-50">
                  {["Real Estate", "Agriculture"].map((item) => (
                    <button
                      key={item}
                      onClick={() => {
                        setActiveTab(item);
                        setShowFilter(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-gray-100 ${
                        activeTab === item
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
      </div>

      {/* Live Data Results Layer */}
      <div className="mt-6">
        <InvestmentGrid
          investments={investments}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export default InvestmentTabs;
