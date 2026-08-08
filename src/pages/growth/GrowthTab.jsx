import React, { useState } from "react";
import TransactionList from "../../components/cardcontainer/TransactionList";

import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";

import { useNavigate } from "react-router-dom";

const GrowthTab = ({ currentInvestments = [], recentEarnings = [] }) => {
  const [activeTab, setActiveTab] = useState("investment");
  const navigate = useNavigate();

  const handleSeeAll = () => {
    if (activeTab === "investment") {
      navigate("/app/investments");
    } else {
      navigate("/app/wallet-see-all");
    }
  };

  return (
    <div className="w-full">
      {/* Tab Navigation Header */}
      <div
        className={`flex flex-wrap justify-between items-center gap-3 ${fontFamily.main} mb-4`}
      >
        <div className="flex items-center gap-6 md:gap-10 lg:gap-20">
          <h1
            onClick={() => setActiveTab("investment")}
            className={`cursor-pointer pb-2 transition-all duration-300 text-base md:text-xl lg:text-[24px]
              ${
                activeTab === "investment"
                  ? "font-semibold text-[#05062F] border-b-2 border-[#05062F]"
                  : "font-normal text-gray-400"
              }`}
          >
            Current Investments ({currentInvestments.length})
          </h1>

          <h1
            onClick={() => setActiveTab("earnings")}
            className={`cursor-pointer pb-2 transition-all duration-300 text-base md:text-xl lg:text-[24px]
              ${
                activeTab === "earnings"
                  ? "font-semibold text-[#05062F] border-b-2 border-[#05062F]"
                  : "font-normal text-gray-400"
              }`}
          >
            Recent Earnings
          </h1>
        </div>

        <div>
          <p
            onClick={handleSeeAll}
            className={`${fontSize.lg} ${fontWeight.normal} ${textColor.red} cursor-pointer whitespace-nowrap lg:block hidden hover:underline`}
          >
            See all
          </p>
        </div>
      </div>

      {/* Grid Content Layer */}
      <div className="mt-4">
        {activeTab === "investment" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentInvestments.length > 0 ? (
              currentInvestments.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm space-y-3 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h3 className="font-bold text-[#05062F] text-base">
                        {sub.packageName}
                      </h3>
                      <p className="text-[11px] text-gray-400">
                        📍 {sub.location || "Lagos Hub"}
                      </p>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0">
                      {sub.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-50">
                    <div>
                      <span className="text-gray-400 block">
                        Capital Invested
                      </span>
                      <strong className="text-[#05062F] text-sm">
                        ₦{Number(sub.amountInvested).toLocaleString()}
                      </strong>
                    </div>
                    <div>
                      <span className="text-gray-400 block">
                        Accrued Profit To Date
                      </span>
                      <strong className="text-emerald-600 text-sm">
                        +₦
                        {Number(sub.currentAccruedProfit || 0).toLocaleString(
                          undefined,
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </strong>
                    </div>
                  </div>

                  {/* Tenure Progress Bar */}
                  <div className="space-y-1 pt-1">
                    <div className="flex justify-between text-[11px] text-gray-400">
                      <span>
                        Tenure Progress ({sub.daysElapsed}/{sub.totalDays} Days)
                      </span>
                      <span className="font-bold text-[#05062F]">
                        {sub.progressPercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#05062F] h-full rounded-full transition-all duration-500"
                        style={{ width: `${sub.progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-gray-400 pt-1 border-t border-gray-50">
                    <span>
                      Daily Accrual Rate:{" "}
                      <strong className="text-gray-700">
                        +₦{sub.dailyGrowthRate}/day
                      </strong>
                    </span>
                    <span>
                      Payback at Maturity:{" "}
                      <strong className="text-[#05062F]">
                        ₦{Number(sub.totalPayback).toLocaleString()}
                      </strong>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200">
                <p className="text-gray-400 text-sm">
                  No active investments found.
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "earnings" && (
          <TransactionList transactions={recentEarnings} />
        )}
      </div>
    </div>
  );
};

export default GrowthTab;
