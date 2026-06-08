import React, { useState } from 'react'
import GrowthCard from './GrowthCard'
import TransactionList from '../../components/cardcontainer/TransactionList';

import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";

import { useNavigate } from "react-router-dom";

const GrowthTab = () => {
  const [activeTab, setActiveTab] = useState("investment");
  const navigate = useNavigate();

  const handleSeeAll = () => {
    if (activeTab === "investment") {
      navigate("/investments");
    } else {
      navigate("/wallet-see-all");
    }
  };

  return (
    <div>
      <div className={`flex justify-between items-center ${fontFamily.main}`}>
        
        <div className='flex items-center gap-30'>
          
         
          <h1
            onClick={() => setActiveTab("investment")}
            className={`cursor-pointer pb-2 transition-all duration-300
              ${
                activeTab === "investment"
                  ? "text-[24px] font-semibold text-[#05062F]"
                  : "font-normal text-[24px] text-[#05062F]"
              }`}
          >
            Current Investment
          </h1>

         
          <h1
            onClick={() => setActiveTab("earnings")}
            className={`cursor-pointer pb-2 transition-all duration-300
              ${
                activeTab === "earnings"
                  ? "text-[24px] font-semibold text-[#05062F]"
                  : "font-normal text-[24px] text-[#05062F]"
              }`}
          >
            Recent Earnings
          </h1>
        </div>

       
        <div>
          <p
            onClick={handleSeeAll}
            className={`${fontSize.lg} ${fontWeight.normal} ${textColor.red} cursor-pointer`}
          >
            See all
          </p>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === "investment" && <GrowthCard />}

        {activeTab === "earnings" && <TransactionList />}
      </div>
    </div>
  );
};

export default GrowthTab;