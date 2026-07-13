import React, { useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import InvestmentTabs from "../../components/inputs/InvestmentTabs";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import { useGetAllInvestments } from "../../hooks/investment/useGetAllInvestments.js";

const InvestmentLayout = () => {
  const [activeTab, setActiveTab] = useState("Real Estate"); // "Real Estate" or "Agriculture"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // Map user selections cleanly to your backend InvestmentCategory Enum tokens
  const backendCategory =
    activeTab === "Real Estate" ? "REAL_ESTATE" : "AGRICULTURE";

  // Single source of live database data truth
  const {
    data: investments = [],
    isPending: investmentsLoading,
    isError: investmentsError,
  } = useGetAllInvestments({
    search: searchQuery,
    location: selectedLocation,
    category: backendCategory,
  });

  return (
    <Wrapper>
      <div className="mt-6">
        <h1
          className={`
            ${fontSize["2xl"]}
            ${fontWeight.medium}
            ${textColor.primary}
            ${fontFamily.main}
            lg:block md:hidden hidden
          `}
        >
          Investment Opportunities
        </h1>
        <h1
          className={`
            text-[16px]
            font-semibold
            ${textColor.primary}
            ${fontFamily.main}
            lg:hidden md:block block
          `}
        >
          Investment - Explore Investment Opportunities
        </h1>

        <p
          className={`
            mt-4 mb-6
            ${fontFamily.main}
            ${fontWeight.normal}
            ${fontSize.lg}
            ${textColor.primary}
            lg:block md:hidden hidden
          `}
        >
          Browse through our Real Estate and Agriculture investment
          opportunities.
        </p>

        <p
          className={`
            mt-4 mb-6
            ${fontFamily.main}
            ${fontWeight.normal}
            ${fontSize.lg}
            ${textColor.primary}
            lg:hidden md:block block
          `}
        >
          Discover real estate and agricultural projects designed to help you
          grow your wealth.
        </p>

        <InvestmentTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          investments={investments}
          isLoading={investmentsLoading}
          isError={investmentsError}
        />
      </div>
    </Wrapper>
  );
};

export default InvestmentLayout;
