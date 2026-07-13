import React from "react";
import { Link } from "react-router-dom";
import FallbackImg from "../../assets/image/bgcard.png"; // Fallback placeholder
import Cicon from "../../assets/icons/cicon.png";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme.js";

const InvestmentGrid = ({
  investments = [],
  isLoading = false,
  isError = false,
}) => {
  if (isLoading) {
    return (
      <p className="text-gray-500 text-center w-full py-12">
        Loading active funding blocks...
      </p>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500 text-center w-full py-12">
        Failed to sync with investment services.
      </p>
    );
  }

  if (investments.length === 0) {
    return (
      <p className="text-gray-400 text-center w-full py-12">
        No investment items found for your selected filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6 w-full">
      {investments.map((pkg) => (
        <div
          key={pkg.id}
          className="w-full rounded-[20px] bg-white shadow-md overflow-hidden relative border border-gray-50"
        >
          <Link to={`/app/investment-description/${pkg.id}`}>
            <img
              src={pkg.images?.[0] || FallbackImg}
              alt={pkg.name}
              className="w-full h-[200px] object-cover"
            />

            {/* Favorite Indicator */}
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white window-blur flex items-center justify-center cursor-pointer shadow-sm opacity-80">
              <img src={Cicon} alt="heart icon" />
            </div>

            <div className="py-4 px-4 flex flex-col gap-2">
              <div className="flex justify-between items-start gap-2">
                <h1
                  className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} text-gray-900 truncate flex-1`}
                >
                  {pkg.name}
                </h1>
                <p
                  className={`${fontSize.base} ${fontWeight.semibold} ${fontFamily.main} text-[#2540A8] shrink-0`}
                >
                  ₦{Number(pkg.minAmount).toLocaleString()}
                </p>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500">
                <p className={`${fontFamily.main}`}>
                  {pkg.location || "Lagos"}
                </p>
                <p
                  className={`${fontFamily.main} font-medium bg-gray-100 px-2 py-0.5 rounded`}
                >
                  {pkg.durationMonths} Months
                </p>
              </div>

              <div className="border-t border-gray-100 pt-2 flex justify-between items-center mt-1">
                <p className="text-xs text-gray-400 line-clamp-3 flex-1 pr-2">
                  {pkg.description}
                </p>
                <p className="text-sm font-bold text-emerald-600 shrink-0 bg-emerald-50 px-2 py-0.5 rounded">
                  {pkg.roi}% ROI
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default InvestmentGrid;
