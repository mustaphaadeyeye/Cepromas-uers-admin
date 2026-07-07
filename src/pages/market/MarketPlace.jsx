import { useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import {
  FiSearch,
  FiSliders,
} from "react-icons/fi";
import LocationSelect from "../../components/inputs/LocationSelect";
import MarketPlaceTab from "./MarketPlaceTab";


const MarketPlace = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [filter, setFilter] = useState("All");
  return (
    <div>
      <Wrapper>
         <h1
                  className={`
                    ${fontSize["2xl"]}
                    ${fontWeight.medium}
                    ${textColor.primary}
                    ${fontFamily.main}
                  `}
                >
                  Market Place - Explore Properties
                </h1>
        
                <p
                  className={`
                    mt-4 mb-6
                    ${fontFamily.main}
                    ${fontWeight.normal}
                    ${fontSize.lg}
                    ${textColor.primary}
                  `}
                >
                 Find homes, apartments, land, and commercial spaces available for rent, lease, or purchase.
                </p>

                  {/* Search Area */}
                        <div className="flex-1 bg-[#F8F9FD] rounded-xl p-3 flex flex-wrap lg:flex-nowrap items-center gap-3">
                          {/* Search */}
                          <div className="flex items-center flex-1 h-12 bg-white border border-gray-200 rounded-lg px-4">
                            <FiSearch className="text-gray-400 text-lg" />
                
                            <input
                              type="text"
                              placeholder="Search"
                              className="ml-3 w-full outline-none text-sm placeholder:text-gray-400"
                            />
                          </div>
                
                          {/* Filter */}
                          <div className="relative">
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
                
                          {/* Location */}
                          <LocationSelect />
                        </div>

                      
                <div>
                  <MarketPlaceTab/>
                </div>
        
      </Wrapper>
    </div>
  )
}

export default MarketPlace