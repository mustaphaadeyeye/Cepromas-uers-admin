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

const SearchFilterTabs = ({ onTabChange }) => {
  const [activeTab, setActiveTab] = useState('investments');
  const [activeSubTab, setActiveSubTab] = useState("rent");
  const [showFilter, setShowFilter] = useState(false);
const [filterType, setFilterType] = useState("");

  const handleTab = (tab) => {
    setActiveTab(tab)
    onTabChange && onTabChange(tab)
  }

  return (

    <div>
    <div className="flex flex-col gap-3 w-full bg-[#769AF2] p-4 rounded-[10px]">

      {/* Search + Filter row */}
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SearchInput
            placeholder="Search"
            width="w-full"
            bg="bg-[#F3F4F5]"
            className="border-none"
          />
        </div>
      <div className="relative">
  <button
    onClick={() => setShowFilter(!showFilter)}
    className="
      w-11 h-11 shrink-0
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
          setFilterType("low")
          setShowFilter(false)
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
      >
        Lowest Price
      </p>

      <p
        onClick={() => {
          setFilterType("short")
          setShowFilter(false)
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
      >
        &lt; 6 Months
      </p>

      <p
        onClick={() => {
          setFilterType("long")
          setShowFilter(false)
        }}
        className="p-2 hover:bg-gray-100 cursor-pointer text-sm"
      >
        &gt; 6 Months
      </p>

    </div>
  )}
</div>
      </div>

      {/* Tabs row */}
      <div className="flex items-center gap-3">
        <Button
          text="Invest"
          bg={activeTab === 'investments' ? 'bg-[#05062F]' : 'bg-[#F3F4F5]'}
          width="w-full"
          height="h-[44px]"
          rounded="rounded-[10px]"
          className={`
            flex-1
            ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
            ${activeTab === 'investments' ? 'text-white' : textColor.secondary}
          `}
          onClick={() => handleTab('investments')}
        />
        <Button
          text="Properties"
          bg={activeTab === 'properties' ? 'bg-[#05062F]' : 'bg-[#F3F4F5]'}
          width="w-full"
          height="h-[44px]"
          rounded="rounded-[10px]"
          className={`
            flex-1
            ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
            ${activeTab === 'properties' ? 'text-white' : textColor.secondary}
          `}
          onClick={() => handleTab('properties')}
        />
      </div>

    </div>
      {/* Dynamic heading */}
      <h2 className={`${fontSize["2xl"]} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary} mt-3`}>
        {activeTab === 'investments' ? 'Available Investments' : 'Available Properties'}
      </h2>
        
       {
  activeTab === "properties" && (
    <div className="flex items-center gap-4 mt-2">

      <p
        onClick={() => setActiveSubTab("rent")}
        className={`${fontSize.xl} ${fontWeight.medium} ${fontFamily.main} 
        ${activeSubTab === "rent" ? "text-blue-500 border-b-2 border-blue-500" : textColor.secondary}`}
      >
        Rent
      </p>

      <p
        onClick={() => setActiveSubTab("lease")}
        className={`${fontSize.xl} ${fontWeight.medium} ${fontFamily.main} 
        ${activeSubTab === "lease" ? "text-blue-500 border-b-2 border-blue-500" : textColor.secondary}`}
      >
        Lease
      </p>

    </div>
  )
}
    </div>
  )
}

export default SearchFilterTabs;