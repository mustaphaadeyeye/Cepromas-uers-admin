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
          `}
        >
          Investment Opportunities
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
          Browse through our Real Estate and Agriculture
          investment opportunities.
        </p>

        <InvestmentTabs />
      </div>
    </Wrapper>
  );
};

export default InvestmentLayout;