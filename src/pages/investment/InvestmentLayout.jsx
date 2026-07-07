import React from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import InvestmentTabs from "../../components/inputs/InvestmentTabs";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";

const InvestmentLayout = () => {
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
          Browse through our Real Estate and Agriculture
          investment opportunities.
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
         Discover real estate and agricultural projects designed to help you grow your wealth.
        </p>

        <InvestmentTabs />
      </div>
    </Wrapper>
  );
};

export default InvestmentLayout;