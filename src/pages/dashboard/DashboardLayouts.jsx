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
import SarahImg from "../../assets/image/sarahero.png";
import Card from "../../components/cardcontainer/Card";
import DropdownInput from "../../components/inputs/DropdownInput";
import Button from "../../components/buttons/Button";
import Cardbg from "../../components/cardcontainer/Cardbg";
import DashImage from "./DashImage";

const DashboardLayouts = () => {
  const [activeTab, setActiveTab] = useState('investments')

  return (
    <div>
      <Wrapper>

        {/* HERO BANNER  */}
        <div
          style={{ backgroundImage: `url(${SarahImg})` }}
          className="
            h-48 md:h-64 lg:h-72 xl:h-80
            w-full bg-cover bg-center rounded-[20px]
            flex items-end
            p-4 md:p-5 lg:p-6 xl:p-6
          "
        >
          <div className="w-full flex flex-col gap-2 md:gap-3 text-white">
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
          <div className="flex items-center gap-6 border-b border-gray-200 mb-5">

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

          {/* Tab content */}
          {activeTab === 'investments' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
              <Cardbg />
              <Cardbg />
              <Cardbg />
              <Cardbg />
              <Cardbg />
              <Cardbg />
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