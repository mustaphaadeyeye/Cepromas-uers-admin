import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios.js";
import { subscribeToInvestment } from "../../api/investment.api.js";
import Wrapper from "../../components/wrapper/Wrapper";
import Investimg from "../../assets/image/meinvest.svg";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";
import Calenderimg from "../../assets/icons/Calendar.png";
import trendUp from "../../assets/icons/TrendUp.png";
import MapIcon from "../../assets/icons/MapTrifold.png";
import BadgeButton from "../../components/buttons/BadgeButton";
import Button from "../../components/buttons/Button";
import HeadIcon from "../../assets/icons/Headset.png";
import DashImage from "../dashboard/DashImage";
import InvestmentModal from "../../components/modals/InvestmentModal";

const InvestmentDescription = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const {
    data: pkg,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["investment", id],
    queryFn: async () => {
      const response = await api.get(`/investments/${id}`);
      const responseData = response?.data ?? response;
      return responseData?.data ?? responseData;
    },
    enabled: !!id,
  });

  const { data: walletBalanceData } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      const res = await api.get("/wallet/balance");
      return res?.data?.availableBalance ?? res?.data?.balance ?? 0;
    },
  });

  const { data: relatedInvestments } = useQuery({
    queryKey: ["related-investments", id],
    queryFn: async () => {
      const response = await api.get("/investments");
      const responseData = response?.data ?? response;
      const items = responseData?.data ?? responseData ?? [];
      return items.filter((item) => item.id !== id).slice(0, 3);
    },
  });

  const walletBalance = Number(walletBalanceData || 0);
  const userActiveStake = Number(pkg?.userActiveStake || 0);
  const maxAmount = Number(pkg?.maxAmount || 0);
  const minAmount = Number(pkg?.minAmount || 0);

  // Cumulative Boundary Calculations
  const remainingCapacity = Math.max(0, maxAmount - userActiveStake);
  const isMaxLimitReached = maxAmount > 0 && userActiveStake >= maxAmount;

  // Initialize selectedAmount to minAmount or remaining capacity
  useEffect(() => {
    if (pkg) {
      if (isMaxLimitReached) {
        setSelectedAmount(0);
      } else if (userActiveStake > 0) {
        setSelectedAmount(Math.min(remainingCapacity, 50000));
      } else {
        setSelectedAmount(minAmount);
      }
    }
  }, [pkg, isMaxLimitReached, userActiveStake, remainingCapacity, minAmount]);

  // Live Projections Engine
  const projections = useMemo(() => {
    const P = Number(selectedAmount) || 0;
    const roi = Number(pkg?.roi) || 0;
    const durationMonths = Number(pkg?.durationMonths) || 1;

    const expectedProfit = (P * roi) / 100;
    const totalPayback = P + expectedProfit;
    const totalDays = durationMonths * 30;
    const dailyAccrual = expectedProfit / totalDays;

    const maturityDate = new Date();
    maturityDate.setMonth(maturityDate.getMonth() + durationMonths);

    return {
      principal: P,
      expectedProfit,
      totalPayback,
      dailyAccrual,
      maturityDateStr: maturityDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    };
  }, [selectedAmount, pkg]);

  // Enforce Boundary Validation
  const validationError = useMemo(() => {
    if (isMaxLimitReached) {
      return `Maximum limit of ₦${maxAmount.toLocaleString()} reached for this package.`;
    }
    if (!selectedAmount || selectedAmount <= 0) return "Enter an amount";
    if (userActiveStake === 0 && selectedAmount < minAmount)
      return `Min initial limit is ₦${minAmount.toLocaleString()}`;
    if (selectedAmount > remainingCapacity)
      return `Top-up exceeds remaining limit of ₦${remainingCapacity.toLocaleString()}`;
    if (selectedAmount > walletBalance) return "Insufficient wallet balance";
    return null;
  }, [
    selectedAmount,
    isMaxLimitReached,
    maxAmount,
    userActiveStake,
    minAmount,
    remainingCapacity,
    walletBalance,
  ]);

  const handleSubscriptionSubmit = async (transactionPin) => {
    await subscribeToInvestment(id, {
      amount: selectedAmount,
      transactionPin,
    });

    queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
    queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    queryClient.invalidateQueries({ queryKey: ["investment", id] });
    queryClient.invalidateQueries({ queryKey: ["growth-summary"] });
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse font-medium">
          Loading package parameters...
        </p>
      </div>
    );
  }

  if (isError || !pkg) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 font-medium">
          Failed to retrieve investment details.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-sm text-[#2540A8] underline"
        >
          Go Back
        </button>
      </div>
    );
  }

  const name = pkg.name || "Investment Opportunity";
  const description = pkg.description || "No description provided.";
  const roi = pkg.roi ? `${pkg.roi}% ROI` : "0% ROI";
  const duration = pkg.durationMonths
    ? `${pkg.durationMonths} Months`
    : "Flexible Duration";
  const imageUrl = pkg.images?.[0] || Investimg;

  const modalDetails = [
    { label: "Package Name", value: name },
    {
      label: "Selected Volume",
      value: `₦${Number(selectedAmount).toLocaleString()}`,
    },
    { label: "Tenure Lockup", value: duration },
    {
      label: "Expected Return",
      value: `+₦${projections.expectedProfit.toLocaleString()}`,
    },
    {
      label: "Total Payback",
      value: `₦${projections.totalPayback.toLocaleString()}`,
    },
    { label: "Maturity Date", value: projections.maturityDateStr },
  ];

  return (
    <div key={id}>
      <Wrapper>
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Media Section */}
          <div className="w-full lg:w-5/12 shrink-0">
            <div className="relative rounded-[24px] overflow-hidden shadow-md">
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-[320px] lg:h-[420px] object-cover"
              />
              <div className="absolute top-4 left-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md">
                📍 {pkg.location || "Lagos Base"}
              </div>
            </div>

            <div className="mt-4 bg-gray-50 border border-gray-100 rounded-2xl p-4 text-xs text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Structure:</span>
                <span className="font-semibold text-[#05062F]">
                  Bullet Return (Principal + Profit)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Risk Profile:</span>
                <span className="font-semibold text-emerald-600">
                  Low Risk (Asset Backed)
                </span>
              </div>
            </div>
          </div>

          {/* Investment Control Terminal */}
          <div className="flex-1 w-full flex flex-col justify-between gap-5">
            <div>
              <div className="flex justify-between items-start border-b border-gray-100 pb-4">
                <div>
                  <h1
                    className={`${fontSize["2xl"]} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary}`}
                  >
                    {name}
                  </h1>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                    {pkg.category || "DYNAMIC GROWTH PACKAGE"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 uppercase font-bold">
                    Allowed Boundaries
                  </p>
                  <p className="text-sm font-bold text-[#05062F] mt-0.5">
                    ₦{minAmount.toLocaleString()} - ₦
                    {maxAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Badges Bar */}
              <div className="flex items-center gap-3 mt-4">
                <BadgeButton icon={Calenderimg} label={duration} />
                <BadgeButton icon={trendUp} label={roi} />
                <BadgeButton
                  icon={MapIcon}
                  label={pkg.location || "Lagos Base"}
                />
              </div>

              {/* Volume Selection Control */}
              <div className="mt-6 bg-gray-50/80 p-4 rounded-2xl border border-gray-100 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-[#05062F]">
                    {isMaxLimitReached
                      ? "Maximum Cap Reached"
                      : "Select Investment Volume (₦)"}
                  </span>
                  <span className="text-gray-500">
                    Wallet:{" "}
                    <strong className="text-[#05062F]">
                      ₦{walletBalance.toLocaleString()}
                    </strong>
                  </span>
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                    ₦
                  </span>
                  <input
                    type="number"
                    disabled={isMaxLimitReached}
                    value={selectedAmount || ""}
                    onChange={(e) => setSelectedAmount(Number(e.target.value))}
                    className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-28 py-3 text-lg font-bold text-[#05062F] outline-none focus:border-blue-600 transition disabled:bg-gray-100 disabled:text-gray-400"
                  />
                  <button
                    disabled={isMaxLimitReached}
                    onClick={() =>
                      setSelectedAmount(
                        Math.min(walletBalance, remainingCapacity),
                      )
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-50 text-[#2540A8] hover:bg-blue-100 text-xs px-3 py-1.5 rounded-lg font-bold transition disabled:opacity-40"
                  >
                    Max Limit
                  </button>
                </div>

                {/* Quick Add Buttons */}
                {!isMaxLimitReached && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[11px] text-gray-400 font-medium">
                      Quick Add:
                    </span>
                    <button
                      onClick={() =>
                        setSelectedAmount((prev) =>
                          Math.min(remainingCapacity, prev + 50000),
                        )
                      }
                      className="bg-white border border-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-lg font-medium hover:bg-gray-100"
                    >
                      +₦50,000
                    </button>
                    <button
                      onClick={() =>
                        setSelectedAmount((prev) =>
                          Math.min(remainingCapacity, prev + 100000),
                        )
                      }
                      className="bg-white border border-gray-200 text-gray-700 text-xs px-2.5 py-1 rounded-lg font-medium hover:bg-gray-100"
                    >
                      +₦100,000
                    </button>
                  </div>
                )}

                {validationError && (
                  <p className="text-xs text-red-500 font-medium bg-red-50 p-2 rounded-lg border border-red-100">
                    ⚠️ {validationError}
                  </p>
                )}
              </div>

              {/* Live Real-Time Financial Projection Box */}
              <div className="mt-4 bg-[#05062F] text-white rounded-2xl p-5 space-y-3 shadow-md">
                <span className="text-[11px] text-gray-300 font-bold uppercase tracking-wider block">
                  Real-Time Projection Engine
                </span>

                <div className="grid grid-cols-2 gap-4 pt-1 border-t border-gray-700/50">
                  <div>
                    <span className="text-[11px] text-gray-400 block">
                      Expected Profit ({pkg.roi}%)
                    </span>
                    <span className="text-lg font-bold text-emerald-400">
                      +₦
                      {projections.expectedProfit.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">
                      Est. Daily Accrual
                    </span>
                    <span className="text-sm font-semibold text-gray-200">
                      +₦
                      {projections.dailyAccrual.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                      / day
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-gray-700/50 flex justify-between items-end">
                  <div>
                    <span className="text-[11px] text-gray-400 block">
                      Total Payback at Maturity
                    </span>
                    <span className="text-xl font-extrabold text-white">
                      ₦
                      {projections.totalPayback.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="text-right text-[11px] text-gray-400">
                    Maturity Date:{" "}
                    <strong className="text-gray-200">
                      {projections.maturityDateStr}
                    </strong>
                  </div>
                </div>
              </div>

              {/* User Current Active Stake Badge & Cap Indicator */}
              {userActiveStake > 0 && (
                <div className="mt-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl flex justify-between items-center">
                  <div>
                    <span>✅ Active Stake: </span>
                    <strong className="text-sm">
                      ₦{userActiveStake.toLocaleString()}
                    </strong>
                  </div>
                  <span className="text-emerald-700 font-medium">
                    Remaining Cap: ₦{remainingCapacity.toLocaleString()}
                  </span>
                </div>
              )}

              {/* Package Description */}
              <p className="text-sm text-gray-600 leading-relaxed mt-4">
                {description}
              </p>
            </div>

            {/* Action Triggers */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <Button
                text={
                  isMaxLimitReached
                    ? "Max Limit Reached"
                    : userActiveStake > 0
                      ? "Top Up Investment"
                      : "Invest Now"
                }
                width="w-full sm:w-[320px]"
                bg={isMaxLimitReached ? "bg-gray-400" : "bg-[#05062F]"}
                disabled={!!validationError || isMaxLimitReached}
                className="text-white text-base font-semibold rounded-xl py-3.5 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-sm cursor-pointer"
                onClick={() => !isMaxLimitReached && setModalOpen(true)}
              />

              <Link to="/app/contact" className="w-full sm:w-auto">
                <button className="w-full flex items-center justify-center gap-2 px-5 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium transition text-gray-700">
                  <img src={HeadIcon} alt="Help" className="w-4 h-4" />
                  Ask a Question
                </button>
              </Link>
            </div>

            <div className="mt-2 text-center sm:text-left">
              <Link to="/terms">
                <p className="text-xs text-gray-400 underline hover:text-[#05062F]">
                  Read Terms & Condition
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Investment Confirmation Modal */}
        <InvestmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleSubscriptionSubmit}
          title="Investment Confirmation"
          subtitle="Review details and accept lockup policy to confirm."
          cancelText="Cancel"
          confirmText="Proceed to Confirmation"
          details={modalDetails}
        />

        {/* Related Opportunities Grid */}
        {relatedInvestments && relatedInvestments.length > 0 && (
          <div className="border-t border-gray-100 pt-8 mt-12">
            <h2 className="text-2xl font-semibold text-[#05062F] mb-4">
              Related Investment Opportunities
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedInvestments.map((item) => (
                <DashImage
                  key={item.id}
                  investment={item}
                  to={`/app/investment-description/${item.id}`}
                />
              ))}
            </div>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default InvestmentDescription;
