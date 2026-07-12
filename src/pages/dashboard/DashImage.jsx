import React from "react";
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

const DashImage = ({ to, property }) => {
  const Wrapper = to ? Link : "div";

  // Fallbacks if the data hasn't fully synced or is missing keys
  const title = property?.title || "Luxury Apartment";
  const location = property?.location || "Unknown Location";
  const price = property?.price
    ? `₦${Number(property.price).toLocaleString()}`
    : "Contact Agent";
  const status = property?.status || "For Sale";
  const bedrooms = property?.bedrooms || 0;
  const bathrooms = property?.bathrooms || 0;
  const area = property?.area ? `${property.area} sqm` : "";
  const imageUrl = property?.images?.[0] || Bgimg; // Use first image from array if available, else static asset fallback

  return (
    <div className="w-full rounded-[20px] bg-white shadow-md overflow-hidden relative transition-all duration-300 hover:shadow-lg">
      <Wrapper {...(to ? { to } : {})}>
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-50 object-cover rounded-bl-[20px] rounded-br-[20px]"
        />

        {/* Heart */}
        <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer shadow-sm opacity-65 hover:opacity-100 transition">
          <img src={Cicon} alt="heart" />
        </div>

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
                className={`${fontSize.sm} ${fontWeight.light} ${fontFamily.main} ${textColor.primary}`}
              >
                Available
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
              className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
            >
              {bedrooms} Bedrooms, {bathrooms} Bathrooms
              {area ? `, ${area}` : ""}
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
      </Wrapper>
    </div>
  );
};

export default DashImage;
