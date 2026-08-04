import React, { useEffect, useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import GrowthCard from "../../components/cardcontainer/GrowthCard";
import Circleicon from "../../assets/icons/naira.png";
import ListIcon from "../../assets/icons/groiconm.png";
import ActionCard from "../../components/cardcontainer/ActionCard";
import RevenueOverview from "../../components/charts/RevenueOverview";
import GrowthTab from "./GrowthTab";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import { getGrowthSummary } from "../../api/growth";

const GrowthLayout = () => {
  const [loading, setLoading] = useState(true);
  const [timeframe, setTimeframe] = useState("12m");
  const [summaryData, setSummaryData] = useState({
    metrics: {
      totalInvestmentValue: 0,
      totalReturnsValue: 0,
      totalInvestmentCount: 0,
      ongoingCount: 0,
      completedCount: 0,
    },
    revenueOverview: [],
    currentInvestments: [],
    recentEarnings: [],
  });

  const fetchGrowthData = async (tf) => {
    try {
      setLoading(true);
      const data = await getGrowthSummary(tf);
      if (data) {
        setSummaryData(data);
      }
    } catch (err) {
      console.error("Failed to load growth summary data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrowthData(timeframe);
  }, [timeframe]);

  const { metrics, revenueOverview, currentInvestments, recentEarnings } =
    summaryData;

  // Format currency helpers
  const formattedInvestmentValue = `₦${Number(metrics.totalInvestmentValue || 0).toLocaleString()}`;
  const formattedReturnsValue = `₦${Number(metrics.totalReturnsValue || 0).toLocaleString()}`;

  if (loading) {
    return (
      <Wrapper>
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-10 h-10 border-4 border-[#0f1c3f] border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm mt-3 font-medium">
            Loading Growth Metrics...
          </p>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="lg:hidden block">
        <h1
          className={`${fontFamily.main} ${fontSize.xl} ${fontWeight.bold} ${textColor.black}`}
        >
          My Investment Growth
        </h1>

        <p
          className={`${fontFamily.main} ${fontWeight.normal} text-[14px] ${textColor.gray500} mb-5`}
        >
          Track how your investments are performing over time.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-2 w-full">
          <GrowthCard
            title="Total Investment Value"
            amount={formattedInvestmentValue}
            icon={Circleicon}
          />
          <GrowthCard
            title="Total Returns Value"
            amount={formattedReturnsValue}
            icon={ListIcon}
          />
        </div>

        <div className="flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap w-full lg:w-auto">
          <ActionCard
            number={String(metrics.totalInvestmentCount || 0)}
            label="Total Investment"
            bg="bg-[#DBE8FD]"
            width="w-[31%] lg:w-[314px]"
            height="h-[64px] lg:h-[85px]"
            rounded="rounded-[8px] lg:rounded-[6px]"
          />
          <ActionCard
            number={String(metrics.ongoingCount || 0)}
            label="Ongoing"
            bg="bg-[#FEFAA2]"
            width="w-[31%] lg:w-[314px]"
            height="h-[64px] lg:h-[85px]"
            rounded="rounded-[8px] lg:rounded-[6px]"
          />
          <ActionCard
            number={String(metrics.completedCount || 0)}
            label="Completed"
            bg="bg-[#E1FBC1]"
            width="w-[31%] lg:w-[314px]"
            height="h-[64px] lg:h-[85px]"
            rounded="rounded-[8px] lg:rounded-[6px]"
          />
        </div>
      </div>

      <div className="mt-6 md:mt-10">
        <RevenueOverview
          revenueData={revenueOverview}
          timeframe={timeframe}
          setTimeframe={setTimeframe}
        />
      </div>

      <div className="mt-6 md:mt-10">
        <GrowthTab
          currentInvestments={currentInvestments}
          recentEarnings={recentEarnings}
        />
      </div>
    </Wrapper>
  );
};

export default GrowthLayout;
