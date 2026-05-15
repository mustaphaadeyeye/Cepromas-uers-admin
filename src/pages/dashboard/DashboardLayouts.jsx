import React, { useState } from "react";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  textDecoration,
  letterSpacing,
  bgColor,
} from "../../components/styles/theme";
import Wrapper from "../../components/wrapper/Wrapper";
import SarahImg from "../../assets/image/sara.jpg";
import Card from "../../components/cardcontainer/Card";
import DropdownInput from "../../components/inputs/DropdownInput";
import Button from "../../components/buttons/Button";
import Cardbg from "../../components/cardcontainer/Cardbg";
import DashImage from "./DashImage";
import SearchFilterTabs from "../../components/inputs/SearchFilterTabs";
import { Link } from "react-router-dom";




const DashboardLayouts = () => {
  const [activeTab, setActiveTab] = useState('investments')

  return (
    <div>
      <Wrapper>

       {/* HERO BANNER */}
<div
  style={{ backgroundImage: `url(${SarahImg})` }}
  className="
    relative
    h-48 md:h-64 lg:h-72 xl:h-80
    w-full bg-cover bg-center rounded-[20px]
    lg:flex items-end
    overflow-hidden
    md:hidden hidden
  "
>
  {/* Dark gradient overlay at bottom */}
  <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent rounded-[20px]" />

  {/* Content */}
  <div className="relative z-10 w-full flex flex-col gap-2 md:gap-3 text-white p-4 md:p-5 lg:p-6 xl:p-6">
    <h1
      className={`
        ${fontSize["4xl"]}
        ${fontWeight.medium}
        ${textColor.white}
        ${fontFamily.main}
      `}
    >
      Most Popular
    </h1>
    <div className="flex items-center flex-wrap gap-3 md:gap-4 lg:gap-5 xl:gap-5">
      <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>Luxury Apartment</p>
      <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>N50,000</p>
      <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>30% ROI</p>
      <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>12 months</p>
    </div>
  </div>
</div>

        {/* ─── TABS ─── */}
        <div className="mt-4 md:mt-5 lg:mt-5 xl:mt-5">

          {/* Tab headers */}
          <div className="lg:flex items-center gap-20 border-b border-gray-200 mb-5  md:hidden hidden ">

            <button
              onClick={() => setActiveTab('investments')}
              className={`
                pb-3 text-left transition duration-200 cursor-pointer
                ${fontSize["lg"]} ${fontWeight.medium} ${fontFamily.main}
                ${activeTab === 'investments'
                  ? `${textColor.primary}  -mb-px`
                  : `${textColor.secondary} hover:${textColor.primary}`
                }
              `}
            >
              Available Investments
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`
                pb-3 text-left transition duration-200 cursor-pointer
                ${fontSize["lg"]} ${fontWeight.medium} ${fontFamily.main}
                ${activeTab === 'properties'
                  ? `${textColor.primary}  -mb-px`
                  : `${textColor.secondary} hover:${textColor.primary}`
                }
              `}
            >
              Available Properties
            </button>

          </div>

          <div>
            {/* Search + Filter + Tabs (mobile) */}
            <div className="block lg:hidden mb-4 xl:hidden md:block">
              <SearchFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>

          {/* Tab content */}
          {activeTab === 'investments' && (
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
              
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
              <DashImage />
              <DashImage />
              <DashImage />
              <DashImage />
              <DashImage />
            </div>
          )}

        </div>

      </Wrapper>
    </div>
  );
};

export default DashboardLayouts;