import React, { useState, useEffect } from "react";
import Bgimg from "../../assets/image/newdash.png";
import CircleIcon from "../../assets/icons/circleicon.png";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";
import { Link } from "react-router-dom";
import LocationIcon from "../../assets/icons/locationicon.png";
import Button from "../../components/buttons/Button";
import Cicon from "../../assets/icons/cicon.png";
import { useToggleFavourite } from "../../hooks/property/useToggleFavourite"; // 👈 IMPORT TOGGLE HOOK

const DashImage = ({ to, property, investment, isFavourite = false }) => {
  const Wrapper = to ? Link : "div";

  // Check if this card instance is acting as an investment or marketplace property
  const isInvestment = !!investment;

  // 1. Sync properties database value with optimistic local rendering state
  const [localIsFavourite, setLocalIsFavourite] = useState(isFavourite);
  const { mutate: toggleFav, isPending } = useToggleFavourite();

  useEffect(() => {
    setLocalIsFavourite(isFavourite);
  }, [isFavourite]);

  // 2. Prevent card link navigation and toggle favorites cleanly
  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Safety guards
    if (isInvestment) return;
    const propertyId = property?.id;
    if (!propertyId || isPending) return;

    // Optimistically toggle state locally
    setLocalIsFavourite((prev) => !prev);

    toggleFav(propertyId, {
      onSuccess: (response) => {
        const data = response?.data ?? response;
        if (data && typeof data.isFavourite === "boolean") {
          setLocalIsFavourite(data.isFavourite);
        }
      },
      onError: (err) => {
        console.error("❌ Failed to save favorite status, rolling back:", err);
        setLocalIsFavourite(isFavourite); // Rollback state
      },
    });
  };

  // Bind parameters dynamically based on data source
  const title = isInvestment
    ? investment?.name || "Investment Package"
    : property?.title || "Luxury Apartment";
  const location = isInvestment
    ? "Lagos Regional Hub"
    : property?.location || "Unknown Location";

  const price = isInvestment
    ? `Min: ₦${Number(investment?.minAmount).toLocaleString()}`
    : property?.price
      ? `₦${Number(property.price).toLocaleString()}`
      : "Contact Agent";

  const status = isInvestment
    ? investment?.status || "ACTIVE"
    : property?.status || "For Sale";

  // Custom display line depending on item structure
  const metadataLine = isInvestment
    ? `${investment?.durationMonths || 0} Months Maturity Cycle`
    : `${property?.bedrooms || 0} Bedrooms, ${property?.bathrooms || 0} Bathrooms${property?.area ? `, ${property.area} sqm` : ""}`;

  const ROIBadge = isInvestment
    ? `${investment?.roi || 0}% Projected ROI`
    : "Available";

  const imageUrl = isInvestment
    ? investment?.images?.[0] || Bgimg
    : property?.images?.[0] || Bgimg;

  return (
    <div className="w-full rounded-[20px] bg-white shadow-md overflow-hidden relative transition-all duration-300 hover:shadow-lg">
      {/* 3. Render heart button strictly for properties, keeping investments clean */}
      {!isInvestment && (
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
      )}

      <Wrapper {...(to ? { to } : {})}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-50 object-cover rounded-bl-[20px] rounded-br-[20px]"
        />

        <div className="py-3 px-4 flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img
                src={CircleIcon}
                alt="circle"
                className="w-3 h-3 inline-block mr-2"
              />
              <span
                className={`${fontSize.sm} ${fontWeight.light} ${fontFamily.main} ${textColor.primary} capitalize`}
              >
                {status.toLowerCase()}
              </span>
            </div>
            <div>
              <p
                className={`${fontSize.sm} ${fontWeight.light} ${fontFamily.main} text-[#2540A8] font-medium`}
              >
                {ROIBadge}
              </p>
            </div>
          </div>

          <div>
            <h1
              className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary} line-clamp-1`}
            >
              {title}
            </h1>
          </div>

          <div className="flex items-center">
            <img
              src={LocationIcon}
              alt="location"
              className="w-[20px] h-[20px] inline-block mr-2"
            />
            <p
              className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary} line-clamp-1`}
            >
              {location}
            </p>
          </div>

          <div>
            <p
              className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary} line-clamp-1`}
            >
              {metadataLine}
            </p>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div>
              <h2
                className={`${fontSize.base} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}
              >
                {isInvestment ? "Capital entry:" : "Price:"}
              </h2>
              <h1
                className={`${fontSize["2xl"]} ${fontWeight.medium} ${fontFamily.main} text-[#2540A8]`}
              >
                {price}
              </h1>
            </div>
            <div>
              <Button
                text="View Details"
                bg="bg-[#DBE8FD]"
                width="w-[102px]"
                height="h-[36px]"
                rounded="rounded-[10px]"
                className={`flex-1 ${fontSize.sm} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}
              />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default DashImage;
