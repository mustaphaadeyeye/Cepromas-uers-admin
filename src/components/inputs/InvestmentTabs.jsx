import { useState } from "react";
import {
  FiSearch,
  FiSliders,
} from "react-icons/fi";

import InvestmentEstate from "../../pages/investment/InvestmentEstate";
import InvestmentAgric from "../../pages/investment/InvestmentAgric";
import LocationSelect from "./LocationSelect";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";


const InvestmentTabs = () => {
  const [activeTab, setActiveTab] = useState("Real Estate");
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");

  return (
    <div className="w-full">
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Tabs */}
        <div className={`flex lg:items-center justify-center lg:gap-10 gap-30 ${fontFamily.main}`}>
          <button
            onClick={() => setActiveTab("Real Estate")}
            className={`relative pb-3 text-[16px] font-medium transition ${
              activeTab === "Real Estate"
                ? "text-[#0F1B4C]"
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
            className={`relative pb-3 text-[16px] font-medium transition ${
              activeTab === "Agriculture"
                ? "text-[#0F1B4C]"
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
          {/* Location — its own full-width row on mobile, last item on desktop */}
          <div className="w-full lg:w-auto order-1 lg:order-3">
            <LocationSelect />
          </div>

          {/* Search + Filter — paired row on mobile, becomes plain siblings on desktop so original order (Search, Filter, Location) holds */}
          <div className="flex items-center w-full lg:w-auto flex-1 gap-3 order-2 lg:order-none lg:contents">
            {/* Search */}
            <div className="flex items-center flex-1 h-12 bg-white border border-gray-200 rounded-lg px-4 lg:order-1">
              <FiSearch className="text-gray-400 text-lg" />

              <input
                type="text"
                placeholder="Search"
                className="ml-3 w-full outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Filter */}
            <div className="relative lg:order-2">
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

                        if (item === "Real Estate") {
                          setActiveTab("Real Estate");
                        }

                        if (item === "Agriculture") {
                          setActiveTab("Agriculture");
                        }
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
      </div>

      {/* Active Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6 mt-6">
        {filter === "All" ? (
          activeTab === "Real Estate" ? (
            <InvestmentEstate />
          ) : (
            <InvestmentAgric />
          )
        ) : filter === "Real Estate" ? (
          <InvestmentEstate />
        ) : (
          <InvestmentAgric />
        )}
      </div>
    </div>
  );
};

export default InvestmentTabs;