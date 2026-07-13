import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LocationIcon from "../../assets/icons/locationicon.png";
import Button from "../../components/buttons/Button";
import CircleIcon from "../../assets/icons/circleicon.png";
import Cicon from "../../assets/icons/cicon.png";
import { useToggleFavourite } from "../../hooks/property/useToggleFavourite";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";

const MarketCard = ({
  id,
  to,
  image,
  status = "For Sale",
  availability = "Available",
  title,
  location,
  details,
  price,
  isFavourite = false,
}) => {
  const { mutate: toggleFav, isPending } = useToggleFavourite();

  // 1. Sync backend prop changes to a local UI state flag for instant updates
  const [localIsFavourite, setLocalIsFavourite] = useState(isFavourite);

  useEffect(() => {
    setLocalIsFavourite(isFavourite);
  }, [isFavourite]);

  const handleFavouriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!id || isPending) return;

    // Optimistically toggle the color locally so the user feels an instant change
    setLocalIsFavourite((prev) => !prev);

    toggleFav(id, {
      onSuccess: (response) => {
        console.log("🎉 STEP 3: API execution completed successfully!");
        const data = response?.data ?? response;
        // fallback match if backend returns structural delta payload directly
        if (data && typeof data.isFavourite === "boolean") {
          setLocalIsFavourite(data.isFavourite);
        }
      },
      onError: (err) => {
        console.error("❌ API call failed, rolling back UI color state:", err);
        setLocalIsFavourite(isFavourite); // Rollback to original value on network fail
      },
    });
  };

  return (
    <div className="w-full rounded-[20px] bg-white shadow-md overflow-hidden relative border border-gray-50">
      {/* Dynamic Favorite Icon Overlay Container */}
      <button
        type="button"
        onClick={handleFavouriteClick}
        disabled={isPending}
        className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-sm z-50 transition-all duration-300 transform active:scale-95 ${
          localIsFavourite // 👈 Updated to local state variable
            ? "bg-red-500 text-white"
            : "bg-white text-gray-400 opacity-90 hover:opacity-100"
        }`}
      >
        <img
          src={Cicon}
          alt="heart status"
          className={`pointer-events-none transition-all duration-300 ${
            localIsFavourite ? "brightness-0 invert scale-110" : "opacity-75" // 👈 Updated to local state variable
          }`}
        />
      </button>

      <Link to={to || "#"} className="block w-full h-full">
        <img
          src={image}
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
                className={`${fontSize.sm} ${fontWeight.light} ${fontFamily.main} ${textColor.primary}`}
              >
                {status}
              </span>
            </div>
            <div>
              <p
                className={`${fontSize.sm} ${fontWeight.light} ${fontFamily.main} ${textColor.primary}`}
              >
                {availability}
              </p>
            </div>
          </div>

          <div>
            <h1
              className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}
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
              className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
            >
              {location}
            </p>
          </div>

          <div>
            <p
              className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary} line-clamp-3`}
            >
              {details}
            </p>
          </div>

          <div className="flex justify-between items-center mt-3">
            <div>
              <h2
                className={`${fontSize.base} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}
              >
                Price:
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
      </Link>
    </div>
  );
};

export default MarketCard;
