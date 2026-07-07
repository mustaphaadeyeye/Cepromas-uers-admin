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
import SearchFilterTabs from "../../components/inputs/SearchFilterTabs";
import { Link } from "react-router-dom";
import DashImage from "../dashboard/DashImage";




const SavedLayout = () => {
  const [activeTab, setActiveTab] = useState('investments')

  return (
    <div>
      <Wrapper>   
<div>
  
  {/* Content */}
  <div className="mt-6">
    <h1
      className={`
        ${fontSize["2xl"]}
        ${fontWeight.medium}
        ${textColor.primary}
        ${fontFamily.main}
      `}
    >
   Saved Items
    </h1>
    <div>
      <p
      className={`${fontFamily.main}  ${fontWeight.normal} ${fontSize.lg} ${textColor.primary} mt-4 mb-4`}
      >
       Access properties and investment opportunities you've saved for later.
      </p>
    </div>
  </div>
</div>

        {/* ─── TABS ─── */}
        <div className="mt-4 md:mt-5 lg:mt-5 xl:mt-5">

          {/* Tab headers */}
          {/* <div className="lg:flex items-center gap-20 border-b border-gray-200 mb-5  md:hidden hidden ">

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

          </div> */}

          <div>
            {/* Search + Filter  */}
            <div className="block lg:hidden mb-4 xl:block md:block">
              <SearchFilterTabs activeTab={activeTab} onTabChange={setActiveTab} />
            </div>
          </div>

          {/* Tab content */}
          {/* {activeTab === 'investments' && (
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
              
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
              <Cardbg to="/investment-description" />
            </div>
          )} */}

          {/* {activeTab === 'properties' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
              <DashImage />
              <DashImage />
              <DashImage />
              <DashImage />
              <DashImage />
            </div>
          )} */}

        </div>

      </Wrapper>
    </div>
  );
};

export default SavedLayout;