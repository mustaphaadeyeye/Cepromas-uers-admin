import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.js";
import Wrapper from "../../components/wrapper/Wrapper";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";
import BadgeButton from "../../components/buttons/BadgeButton";
import Button from "../../components/buttons/Button";
import Calendarimg from "../../assets/icons/Calendar.png"; // Fallback badges matching theme
import trendUp from "../../assets/icons/TrendUp.png";
import MapIcon from "../../assets/icons/MapTrifold.png";
import HeadIcon from "../../assets/icons/Headset.png";
import DashImage from "../dashboard/DashImage"; // Dynamic item card template reuse

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Forces the window view to snap back up to the top whenever a new listing id mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Fetch individual property profile via parameter ID
  const {
    data: property,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["property", id],
    queryFn: async () => {
      const response = await api.get(`/properties/${id}`);
      const responseData = response?.data ?? response;
      return responseData?.data ?? responseData;
    },
    enabled: !!id,
  });

  // Fetch adjacent related properties to populate bottom recommendation rows
  const { data: relatedProperties } = useQuery({
    queryKey: ["related-properties", id],
    queryFn: async () => {
      const response = await api.get("/properties");
      const responseData = response?.data ?? response;
      const items = responseData?.data ?? responseData ?? [];
      // Filter out the active asset to ensure diversity
      return items.filter((item) => item.id !== id).slice(0, 3);
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse">
          Loading property specifications...
        </p>
      </div>
    );
  }

  if (isError || !property) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 font-medium">
          Failed to pull property metadata. Try refreshing.
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

  // Bind server data fields with secure fallbacks
  const title = property.title || "Luxury Apartment";
  const location = property.location || "Location Unknown";
  const description = property.description || "";
  const priceDisplay = property.price
    ? `₦${Number(property.price).toLocaleString()}`
    : "Contact Agent";
  const category = property.category || "SALE";
  const featuresList = property.features || [];
  const gallery = property.images?.length
    ? property.images
    : ["https://via.placeholder.com/600x400"];
  const heroImage = gallery[0];

  return (
    /* The key prop here forces React to tear down and recreate the view context when the ID shifts */
    <div key={id}>
      <Wrapper>
        {/* ============ MOBILE SURFACE SHEETS ============ */}
        <div className="block md:hidden">
          {/* Main Hero Slider Area */}
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
              src={heroImage}
              alt={title}
              className="w-full h-72 object-cover"
            />
          </div>

          {/* Content panel */}
          <div className="relative -mt-3 w-full bg-white rounded-t-3xl px-5 pt-6 pb-6 flex flex-col gap-4 shadow-xl">
            <span className="text-xs font-semibold text-[#2540A8] tracking-wider uppercase">
              {category}
            </span>
            <h1
              className={`${fontSize.xl} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary}`}
            >
              {title}
            </h1>

            {/* Badges metadata row */}
            <div className="flex items-center gap-2 flex-wrap">
              <BadgeButton
                icon={Calendarimg}
                label={`${property.bedrooms || 0} Bed`}
              />
              <BadgeButton
                icon={trendUp}
                label={`${property.bathrooms || 0} Bath`}
              />
              <BadgeButton icon={MapIcon} label={location} />
            </div>

            <h2 className={`${fontSize.xl} font-bold text-[#2540A8]`}>
              {priceDisplay}
            </h2>

            <p
              className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary} leading-relaxed`}
            >
              {description}
            </p>

            {/* Features Cloud mapping */}
            {featuresList.length > 0 && (
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-sm font-semibold text-gray-700">
                  Property Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {featuresList.map((feat, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase tracking-wide"
                    >
                      {feat.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Button
              text="Proceed with Inquiry"
              width="w-full"
              bg="bg-[#05062F]"
              className={`text-white ${fontSize.md} ${fontWeight.normal} ${fontFamily.main} rounded-lg px-6 py-3 hover:bg-[#1a2352] transition-colors duration-300 mt-2`}
            />

            <button
              onClick={() => navigate("/app/chat")}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-3 hover:bg-gray-50 transition"
            >
              <img src={HeadIcon} alt="Agent Chat" className="w-5 h-5" />
              <span
                className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
              >
                Message Listing Agent
              </span>
            </button>
          </div>
        </div>

        {/* ============ DESKTOP GRID LAYOUT ============ */}
        <div className="hidden md:flex flex-col gap-8">
          <div className="flex gap-6 items-start">
            {/* Left Column: Image Stack Mirroring Reference Grid Mockup */}
            <div className="flex-1 flex flex-col gap-4 max-w-[540px]">
              <div className="relative">
                <button
                  onClick={() => navigate(-1)}
                  className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
                  src={heroImage}
                  alt={title}
                  className="w-full h-[360px] object-cover rounded-[20px] shadow-sm"
                />
              </div>

              {/* Thumbnails list slider underneath */}
              <div className="grid grid-cols-4 gap-3">
                {gallery.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Thumbnail preview"
                    className="w-full h-20 object-cover rounded-xl border border-gray-100 cursor-pointer hover:opacity-90 transition shadow-xs"
                  />
                ))}
              </div>
            </div>

            {/* Right Column: Specification Sheets */}
            <div className="flex-1 flex flex-col gap-5">
              <div>
                <span className="text-xs font-bold text-[#2540A8] bg-[#DBE8FD] px-2.5 py-1 rounded-md tracking-wider uppercase">
                  For {category}
                </span>
                <h1
                  className={`${fontSize["2xl"]} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary} mt-2`}
                >
                  {title}
                </h1>
                <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>{" "}
                  Active Market Item
                </p>
              </div>

              <div className="flex items-center gap-3">
                <BadgeButton
                  icon={Calendarimg}
                  label={`${property.bedrooms || 0} Bedrooms`}
                />
                <BadgeButton
                  icon={trendUp}
                  label={`${property.bathrooms || 0} Bathrooms`}
                />
                <BadgeButton
                  icon={MapIcon}
                  label={property.area ? `${property.area} sqm Area` : location}
                />
              </div>

              <div className="p-4 bg-[#769AF2]/5 rounded-xl border border-gray-100/50 flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-400 font-medium tracking-wide uppercase">
                    Valuation Price
                  </p>
                  <h1
                    className={`${fontSize["2xl"]} font-bold text-[#2540A8] mt-0.5`}
                  >
                    {priceDisplay}
                  </h1>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">
                    Regional Location
                  </p>
                  <p className="text-sm font-semibold text-gray-700 mt-0.5">
                    {location}
                  </p>
                </div>
              </div>

              <div className="max-w-[500px]">
                <p
                  className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} text-gray-600 leading-relaxed`}
                >
                  {description}
                </p>
              </div>

              {/* Tag Features Cloud row from prompt images */}
              {featuresList.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                    Structural Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {featuresList.map((feat, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-50 border border-gray-100 text-gray-600 rounded-lg text-xs font-medium capitalize"
                      >
                        {feat.toLowerCase().replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Operations Interface Row */}
              <div className="flex items-center gap-4 mt-2">
                <Button
                  text="Proceed With Transaction"
                  width="w-[280px]"
                  bg="bg-[#05062F]"
                  className={`text-white ${fontSize.md} ${fontWeight.medium} ${fontFamily.main} rounded-xl px-6 py-3.5 hover:bg-[#1a2352] transition-all duration-300 transform active:scale-[0.99] shadow-sm`}
                />
                <button
                  onClick={() => navigate("/app/chat")}
                  className="flex items-center justify-center gap-2 px-5 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 text-sm font-medium transition duration-200 text-gray-700"
                >
                  <img src={HeadIcon} alt="Help Desk" className="w-4 h-4" />
                  Contact Agent Office
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Dynamic Related Grid Row */}
          {relatedProperties && relatedProperties.length > 0 && (
            <div className="border-t border-gray-100 pt-8 mt-4">
              <h1
                className={`${fontSize["2xl"]} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary}`}
              >
                Explore Similar Marketplace Listings
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {relatedProperties.map((item) => (
                  <DashImage
                    key={item.id}
                    property={item}
                    to={`/app/property/${item.id}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
};

export default PropertyDetails;
