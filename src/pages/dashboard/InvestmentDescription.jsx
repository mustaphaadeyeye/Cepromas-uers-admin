import React, { useState, useEffect } from "react";
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

  const [open, setOpen] = useState(false);
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

  const { data: relatedInvestments } = useQuery({
    queryKey: ["related-investments", id],
    queryFn: async () => {
      const response = await api.get("/investments");
      const responseData = response?.data ?? response;
      const items = responseData?.data ?? responseData ?? [];
      return items.filter((item) => item.id !== id).slice(0, 3);
    },
  });

  useEffect(() => {
    if (pkg?.minAmount) {
      setSelectedAmount(Number(pkg.minAmount));
    }
  }, [pkg]);

  // Subscription execution handler
  const handleSubscriptionSubmit = async (transactionPin) => {
    await subscribeToInvestment(id, {
      amount: selectedAmount,
      transactionPin,
    });

    // Invalidate cached query balances, profile subscriptions, and current package query
    queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
    queryClient.invalidateQueries({ queryKey: ["user-subscriptions"] });
    queryClient.invalidateQueries({ queryKey: ["profile"] });
    queryClient.invalidateQueries({ queryKey: ["investment", id] });
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">
          Loading active portfolio specs...
        </p>
      </div>
    );
  }

  if (isError || !pkg) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 font-medium">
          Failed to retrieve investment framework specs.
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
  const minPrice = pkg.minAmount
    ? `₦${Number(pkg.minAmount).toLocaleString()}`
    : "₦0";
  const maxPrice = pkg.maxAmount
    ? `₦${Number(pkg.maxAmount).toLocaleString()}`
    : "₦0";
  const imageUrl = pkg.images?.[0] || Investimg;

  const isSubscribed = pkg?.isSubscribed || false;

  const packageOptions = [
    { label: `Min Entry: ${minPrice}`, value: Number(pkg.minAmount) },
    {
      label: `Mid Entry: ₦${Math.floor((Number(pkg.minAmount) + Number(pkg.maxAmount)) / 2).toLocaleString()}`,
      value: Math.floor((Number(pkg.minAmount) + Number(pkg.maxAmount)) / 2),
    },
    { label: `Max Cap: ${maxPrice}`, value: Number(pkg.maxAmount) },
  ];

  const modalDetails = [
    { label: "Package Model", value: name },
    {
      label: "Funding Allocation",
      value: `₦${selectedAmount.toLocaleString()}`,
    },
    { label: "Lockup Timeline", value: duration },
    { label: "Projected Return", value: roi },
    { label: "Geographic Hub", value: pkg.location || "Lagos Base" },
  ];

  return (
    <div key={id}>
      <Wrapper>
        {/* MOBILE VIEW */}
        <div className="block md:hidden">
          <div className="relative -mx-4 -mt-4">
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 z-10 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="#05062F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-72 object-cover"
            />
          </div>

          <div className="relative -mt-3 w-full bg-white rounded-t-3xl px-5 pt-6 pb-6 flex flex-col gap-4 shadow-xl">
            <h1
              className={`${fontSize.xl} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary}`}
            >
              {name}
            </h1>

            <div className="flex items-center gap-2 relative">
              <span
                className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
              >
                Capital Allocation:
              </span>
              <button
                onClick={() => !isSubscribed && setOpen(!open)}
                disabled={isSubscribed}
                className="flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition text-[#2540A8] font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>₦{selectedAmount.toLocaleString()}</span>
                {!isSubscribed && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  >
                    <path
                      d="M6 9l6 6 6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </button>

              {open && !isSubscribed && (
                <div className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden min-w-[180px]">
                  {packageOptions.map((pkgOpt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedAmount(pkgOpt.value);
                        setOpen(false);
                      }}
                      className={`w-full px-4 py-2.5 text-left transition duration-200 hover:bg-gray-50 ${fontSize.sm} ${fontFamily.main} ${
                        selectedAmount === pkgOpt.value
                          ? `${fontWeight.medium} text-[#2540A8] bg-blue-50/50`
                          : `${fontWeight.normal} ${textColor.secondary}`
                      }`}
                    >
                      {pkgOpt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <BadgeButton icon={Calenderimg} label={duration} />
              <BadgeButton icon={trendUp} label={roi} />
              <BadgeButton icon={MapIcon} label={pkg.location || "Lagos Hub"} />
            </div>

            <p
              className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary} leading-relaxed`}
            >
              {description}
            </p>

            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
              <p
                className={`${fontSize.xs} text-gray-400 uppercase font-bold tracking-wider`}
              >
                Bound Guidelines
              </p>
              <p className="text-xs text-gray-600 mt-1">
                Min entry limit:{" "}
                <span className="font-semibold text-black">{minPrice}</span>
              </p>
              <p className="text-xs text-gray-600">
                Max compound volume:{" "}
                <span className="font-semibold text-black">{maxPrice}</span>
              </p>
            </div>

            <Button
              text={isSubscribed ? "Already Subscribed" : "Invest Now"}
              width="w-full"
              bg={isSubscribed ? "bg-emerald-600" : "bg-[#05062F]"}
              disabled={isSubscribed}
              className={`text-white ${fontSize.md} ${fontWeight.normal} ${fontFamily.main} rounded-lg px-6 py-3 transition disabled:opacity-90 disabled:cursor-not-allowed`}
              onClick={() => !isSubscribed && setModalOpen(true)}
            />

            <Link to="/app/contact" className="w-full">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition">
                <img src={HeadIcon} alt="Contact" className="w-5 h-5" />
                <span
                  className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
                >
                  Ask a Question
                </span>
              </button>
            </Link>

            <Link to="/terms" className="text-center">
              <p
                className={`${textColor.primary} underline text-center ${fontSize.sm} ${fontWeight.light} ${fontFamily.main}`}
              >
                Read Terms & Condition
              </p>
            </Link>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:flex gap-6 items-start">
          <div className="max-w-[480px] w-full shrink-0">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-[340px] object-cover rounded-[20px] shadow-md"
            />
          </div>

          <div className="flex flex-col gap-5 flex-1">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h1
                  className={`${fontSize["2xl"]} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary}`}
                >
                  {name}
                </h1>
                <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-wider">
                  Dynamic Growth Package
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400 uppercase font-bold">
                  Allowed Boundaries
                </p>
                <p
                  className={`${fontSize.sm} font-semibold ${fontFamily.main} text-gray-700 mt-0.5`}
                >
                  {minPrice} - {maxPrice}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p
                  className={`${fontSize.md} font-medium ${fontFamily.main} ${textColor.primary}`}
                >
                  Selected Volume:
                </p>
                <div className="relative">
                  <button
                    onClick={() => !isSubscribed && setOpen(!open)}
                    disabled={isSubscribed}
                    className="flex items-center gap-1.5 px-4 py-2 bg-gray-50 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-100 transition font-bold text-[#2540A8] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>₦{selectedAmount.toLocaleString()}</span>
                    {!isSubscribed && (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M6 9l6 6 6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  {open && !isSubscribed && (
                    <div className="absolute top-full mt-1 left-0 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden min-w-[200px]">
                      {packageOptions.map((pkgOpt, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSelectedAmount(pkgOpt.value);
                            setOpen(false);
                          }}
                          className={`w-full px-4 py-3 text-left transition duration-200 hover:bg-gray-50 ${fontSize.sm} ${fontFamily.main} ${
                            selectedAmount === pkgOpt.value
                              ? `${fontWeight.medium} text-[#2540A8] bg-blue-50`
                              : `${fontWeight.normal} ${textColor.secondary}`
                          }`}
                        >
                          {pkgOpt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} text-[#4169E1]`}
                >
                  Maturity Duration:{" "}
                  <span className="font-bold text-black">{duration}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BadgeButton icon={Calenderimg} label={duration} />
              <BadgeButton icon={trendUp} label={roi} />
              <BadgeButton
                icon={MapIcon}
                label={pkg.location || "Lagos Base"}
              />
            </div>

            <div className="w-full">
              <p
                className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} text-gray-600 leading-relaxed`}
              >
                {description}
              </p>
            </div>

            <div className="flex items-center gap-5 mt-4">
              <Button
                text={isSubscribed ? "Already Subscribed" : "Invest Now"}
                width="w-[354px]"
                bg={isSubscribed ? "bg-emerald-600" : "bg-[#05062F]"}
                disabled={isSubscribed}
                className={`text-white ${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} rounded-xl px-6 py-3.5 transition-colors duration-300 disabled:opacity-90 disabled:cursor-not-allowed shadow-sm`}
                onClick={() => !isSubscribed && setModalOpen(true)}
              />
              <Link to="/app/contact">
                <button className="flex items-center justify-center gap-2 px-5 py-3.5 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium transition duration-200 text-gray-700">
                  <img src={HeadIcon} alt="Help" className="w-4 h-4" />
                  Ask a Question
                </button>
              </Link>
            </div>

            <div className="mt-2">
              <Link to="/terms">
                <p
                  className={`${textColor.primary} underline ${fontSize.sm} ${fontWeight.light} ${fontFamily.main}`}
                >
                  Read Terms & Condition
                </p>
              </Link>
            </div>
          </div>
        </div>

        {/* Investment Modal Component */}
        <InvestmentModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleSubscriptionSubmit}
          title="Investment Confirmation"
          subtitle="Review details and enter your transaction PIN to confirm."
          cancelText="Cancel"
          confirmText="Confirm & Invest"
          details={modalDetails}
        />

        {/* Related Opportunities Grid */}
        {relatedInvestments && relatedInvestments.length > 0 && (
          <div className="hidden md:block border-t border-gray-100 pt-8 mt-12">
            <h1
              className={`${fontSize["2xl"]} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary}`}
            >
              Related Investment Opportunities
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
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
