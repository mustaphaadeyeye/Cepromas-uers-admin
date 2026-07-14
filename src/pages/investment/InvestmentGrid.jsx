import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FallbackImg from "../../assets/image/bgcard.png";
import Cicon from "../../assets/icons/cicon.png";
import { useToggleInvestmentFavourite } from "../../hooks/investment/useToggleInvestmentFavourite.js"; // 👈 IMPORT TOGGLE HOOK
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme.js";

// Inner card component to hold isolated state per investment package cleanly
const InvestmentCard = ({ pkg }) => {
  const { mutate: toggleFav, isPending } = useToggleInvestmentFavourite();
  const [localIsFavourite, setLocalIsFavourite] = useState(
    pkg.isFavourite || false,
  );

  // Sync state if backend shifts data parameters dynamically
  useEffect(() => {
    setLocalIsFavourite(pkg.isFavourite || false);
  }, [pkg.isFavourite]);

  const handleFavouriteClick = (e) => {
    e.preventDefault(); // Stop Link navigations
    e.stopPropagation(); // Stop click bubbling

    if (!pkg.id || isPending) return;

    // Optimistically toggle status
    setLocalIsFavourite((prev) => !prev);

    toggleFav(pkg.id, {
      onSuccess: (response) => {
        const data = response?.data ?? response;
        if (data && typeof data.isFavourite === "boolean") {
          setLocalIsFavourite(data.isFavourite);
        }
      },
      onError: (err) => {
        console.error("❌ Failed to update investment favorite:", err);
        setLocalIsFavourite(pkg.isFavourite || false); // Roll back to sync
      },
    });
  };

  return (
    <div className="w-full rounded-[20px] bg-white shadow-md overflow-hidden relative border border-gray-50 transition-all duration-300 hover:shadow-lg">
      <Link to={`/app/investment-description/${pkg.id}`}>
        <img
          src={pkg.images?.[0] || FallbackImg}
          alt={pkg.name}
          className="w-full h-[200px] object-cover"
        />

        {/* Dynamic Favorite Button Overlay */}
        <button
          type="button"
          onClick={handleFavouriteClick}
          disabled={isPending}
          className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-sm z-50 transition-all duration-300 transform active:scale-95 ${
            localIsFavourite
              ? "bg-red-500 text-white"
              : "bg-white text-gray-400 opacity-90 hover:opacity-100"
          }`}
        >
          <img
            src={Cicon}
            alt="heart status"
            className={`pointer-events-none transition-all duration-300 ${
              localIsFavourite ? "brightness-0 invert scale-110" : "opacity-75"
            }`}
          />
        </button>

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
            <p className={`${fontFamily.main}`}>{pkg.location || "Lagos"}</p>
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
  );
};

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
        <InvestmentCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
};

export default InvestmentGrid;
