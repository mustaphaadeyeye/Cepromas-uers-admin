import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.js";
import { getWalletBalance } from "../../api/wallet";
import Wrapper from "../../components/wrapper/Wrapper";
import DashImage from "../dashboard/DashImage";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Media & Slider States
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedImageModal, setSelectedImageModal] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Call Agent Modal State
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  const handleverification = () => {
    if (!property) return;
    navigate("/app/verify-property", { state: { property } });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedImageModal(null);
        setActiveVideoModal(null);
        setIsCallModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const { data: walletData, isPending: isWalletPending } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      try {
        const res = await getWalletBalance();
        return res;
      } catch (err) {
        console.error("Failed to fetch wallet balance:", err);
        return { availableBalance: 0, balance: 0 };
      }
    },
  });

  const { data: relatedProperties } = useQuery({
    queryKey: ["related-properties", id],
    queryFn: async () => {
      const response = await api.get("/properties");
      const responseData = response?.data ?? response;
      const items = responseData?.data ?? responseData ?? [];
      return items.filter((item) => item.id !== id).slice(0, 3);
    },
  });

  const title = property?.title || "Property Details";
  const location = property?.location || "Location Not Provided";
  const description = property?.description || "No description provided.";
  const priceDisplay = property?.price
    ? `₦${Number(property.price).toLocaleString()}`
    : "Contact Agent";
  const category = property?.category || "SALE";
  const categoryLabel =
    category === "RENT"
      ? "For Rent"
      : category === "LEASE"
        ? "For Lease"
        : "For Sale";
  const propertyType = property?.types?.[0] || "Residential";
  const featuresList = property?.features || [];

  // Live Owner / Agent attributes directly from property.agent
  const agent = property?.agent;
  const agentName = agent?.fullName || "Listing Agent";
  const agentPhone = agent?.phoneNumber || "";
  const agentOccupation = agent?.occupation;
  const agentAddress = agent?.address
    ? `${agent.address}${agent?.state ? `, ${agent.state}` : ""}`
    : agent?.state || "Nigeria";
  const agentAvatar = agent?.faceCaptureUrl || null;
  const agentMemberSince = agent?.createdAt
    ? new Date(agent.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : null;

  const rawBalance =
    walletData?.availableBalance ??
    walletData?.balance ??
    walletData?.data?.availableBalance ??
    walletData?.data?.balance ??
    0;
  const currentBalance = Number(rawBalance || 0);

  const gallery =
    Array.isArray(property?.images) && property.images.length > 0
      ? property.images
      : property?.coverImage
        ? [property.coverImage, ...(property.otherImages || [])]
        : ["https://via.placeholder.com/800x600?text=No+Property+Image"];

  const videos = Array.isArray(property?.videos) ? property.videos : [];
  const isSold = property?.status === "SOLD" || property?.status === "INACTIVE";

  useEffect(() => {
    if (
      gallery.length <= 1 ||
      isHovered ||
      selectedImageModal ||
      activeVideoModal ||
      isCallModalOpen
    )
      return;

    const autoSlideTimer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % gallery.length);
    }, 4000);

    return () => clearInterval(autoSlideTimer);
  }, [
    gallery.length,
    isHovered,
    selectedImageModal,
    activeVideoModal,
    isCallModalOpen,
  ]);

  const handlePrevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) =>
      prev === 0 ? gallery.length - 1 : prev - 1,
    );
  };

  const handleNextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlideIndex((prev) =>
      prev === gallery.length - 1 ? 0 : prev + 1,
    );
  };

  const openImageModal = (index) => {
    setActiveImageIndex(index);
    setSelectedImageModal(gallery[index]);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (activeImageIndex + 1) % gallery.length;
    setActiveImageIndex(nextIndex);
    setSelectedImageModal(gallery[nextIndex]);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (activeImageIndex - 1 + gallery.length) % gallery.length;
    setActiveImageIndex(prevIndex);
    setSelectedImageModal(gallery[prevIndex]);
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 animate-pulse font-medium">
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
          className="mt-4 text-sm text-[#2540A8] underline cursor-pointer"
        >
          Go Back
        </button>
      </div>
    );
  }

  const DetailsContent = () => (
    <div className="flex flex-col gap-4 font-sans w-full">
      {/* 1. Header: Title & Current Balance */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#05062F] tracking-tight">
          {title}
        </h1>
        <span className="text-xs sm:text-sm font-medium text-[#4D67D4] whitespace-nowrap">
          {isWalletPending
            ? "Current Balance: ₦..."
            : `Current Balance: ₦${currentBalance.toLocaleString()}`}
        </span>
      </div>

      {/* 2. Location Line */}
      <div className="flex items-center gap-1.5 text-gray-700 text-sm -mt-2">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-gray-600 shrink-0"
        >
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span className="font-normal text-[#1A1A1A]">{location}</span>
      </div>

      {/* 3. Category Dot & Price Display */}
      <div className="flex items-center justify-between gap-4 pt-1">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2540A8] inline-block" />
          <span className="text-sm font-medium text-gray-700">
            {categoryLabel}
          </span>
        </div>

        <div className="flex items-baseline gap-1.5">
          <span className="text-sm font-medium text-gray-800">Price:</span>
          <span className="text-lg sm:text-xl text-[#1D3BA8] font-bold">
            {priceDisplay}
          </span>
        </div>
      </div>

      {/* 4. Specification Badges / Pills */}
      <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#E9F0FE] text-[#2540A8] rounded-xl text-xs font-semibold">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>{propertyType}</span>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#E9F0FE] text-[#2540A8] rounded-xl text-xs font-semibold">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
            <line x1="8" y1="2" x2="8" y2="18" />
            <line x1="16" y1="6" x2="16" y2="22" />
          </svg>
          <span>{location.split(",")[0] || "Lagos"}</span>
        </div>

        <div className="flex items-center gap-1.5 px-4 py-2 bg-[#E9F0FE] text-[#2540A8] rounded-xl text-xs font-semibold">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          </svg>
          <span>{property?.bedrooms || 0} bedroom</span>
        </div>
      </div>

      {/* 5. Description Paragraph */}
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-1">
        {description}
      </p>

      {/* 6. Action Buttons Row: Proceed, Call Agent & Message Owner */}
      <div className="pt-2 flex flex-col gap-2.5">
        <button
          disabled={isSold}
          onClick={handleverification}
          className={`w-full text-sm font-semibold rounded-xl py-3.5 px-4 transition-colors duration-200 shadow-sm ${
            isSold
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-[#05062F] hover:bg-[#121447] text-white cursor-pointer active:scale-[0.99]"
          }`}
        >
          {isSold ? "Property Sold Out" : "Proceed"}
        </button>
        <p className="text-[10px] text-gray-400 text-center leading-tight -mt-1 mb-1">
          The payment will be deducted from your wallet.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Call Agent Button -> Opens Call Agent Modal */}
          <button
            onClick={() => setIsCallModalOpen(true)}
            className="w-full bg-[#C82A2A] hover:bg-[#a82222] text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer h-[46px] shadow-xs font-medium text-sm"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
            </svg>
            Call Agent
          </button>

          {/* Message Owner Button -> Routes to Direct Chat */}
          <button
            onClick={() => navigate("/app/chat")}
            className="w-full bg-[#DBE8FD] hover:bg-[#ccdefd] text-[#05062F] rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer h-[46px] font-medium text-sm"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-[#05062F]"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            Message Owner
          </button>
        </div>
      </div>

      {/* 7. Features Grid Section */}
      {featuresList.length > 0 && (
        <div className="flex flex-col gap-2.5 pt-2">
          <h3 className="text-sm font-bold text-[#05062F]">Features</h3>
          <div className="flex flex-wrap gap-2">
            {featuresList.map((feat, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#F3F6FD] text-[#2540A8] rounded-xl text-xs font-medium capitalize border border-blue-50"
              >
                {feat.toLowerCase().replace("_", " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 8. Live Owner Profile Capsule ("Marketed by") */}
      {agent && (
        <div className="bg-[#F8FAFD] border border-gray-100 rounded-2xl p-5 mt-3 flex flex-col gap-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-gray-700">Property Owner</h3>
            {agent?.isKycVerified && (
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-semibold">
                ✓ Verified Owner
              </span>
            )}
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-16 h-16 rounded-full bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
              {agentAvatar ? (
                <img
                  src={agentAvatar}
                  alt={agentName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#05062F] flex items-center justify-center text-white font-bold text-base">
                  {agentName.charAt(0)}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <h4 className="text-sm font-bold text-[#05062F] truncate">
                  {agentName}
                </h4>
                {agentOccupation && (
                  <span className="text-[11px] text-gray-600 truncate">
                    • {agentOccupation}
                  </span>
                )}
              </div>

              <div className="flex items-start gap-1.5 text-xs text-gray-600">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="shrink-0 mt-0.5 text-gray-400"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="leading-snug">{agentAddress}</span>
              </div>

              {agentMemberSince && (
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="shrink-0 text-gray-400"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>Member since {agentMemberSince}</span>
                </div>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-200/60">
            <Link
              to={`/app/owner-properties/${agent.id || property.agentId}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A32222] hover:text-[#7d1a1a] transition-colors cursor-pointer"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
              View all properties from this owner
            </Link>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div key={id}>
      <Wrapper>
        {/* ============ MOBILE SURFACE VIEW ============ */}
        <div className="block md:hidden">
          <div
            className="relative -mx-4 -mt-4 overflow-hidden group h-72"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <button
              onClick={() => navigate(-1)}
              className="absolute top-4 left-4 z-20 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow"
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

            {gallery.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${title} slide ${idx + 1}`}
                onClick={() => openImageModal(currentSlideIndex)}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 cursor-pointer ${
                  currentSlideIndex === idx
                    ? "opacity-100 z-10"
                    : "opacity-0 pointer-events-none z-0"
                }`}
              />
            ))}

            {gallery.length > 1 && (
              <>
                <button
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
                >
                  ‹
                </button>
                <button
                  onClick={handleNextSlide}
                  aria-label="Next Slide"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition backdrop-blur-xs cursor-pointer"
                >
                  ›
                </button>
              </>
            )}

            <div className="absolute bottom-3 right-4 z-20 bg-black/60 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none">
              {currentSlideIndex + 1} / {gallery.length} Photos
            </div>
          </div>

          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto py-3 -mx-4 px-4 bg-gray-50 no-scrollbar">
              {gallery.map((img, idx) => (
                <div
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`shrink-0 w-20 h-16 rounded-xl overflow-hidden border cursor-pointer group transition-all duration-200 ${
                    currentSlideIndex === idx
                      ? "border-[#05062F] ring-2 ring-[#05062F]/20"
                      : "border-gray-200 opacity-80"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          )}

          <div className="relative w-full bg-white px-1 pt-4 pb-6 flex flex-col gap-4">
            <DetailsContent />

            {videos.length > 0 && (
              <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-[#05062F]">
                  Property Video Tour ({videos.length})
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {videos.map((vidUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveVideoModal(vidUrl)}
                      className="relative h-24 rounded-xl bg-black overflow-hidden cursor-pointer group flex items-center justify-center border border-gray-200 shadow-xs"
                    >
                      <video
                        src={`${vidUrl}#t=0.5`}
                        preload="metadata"
                        muted
                        playsInline
                        className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors pointer-events-none" />

                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-9 h-9 bg-white/95 rounded-full flex items-center justify-center shadow transition-transform duration-300 group-hover:scale-110">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="#05062F"
                            className="ml-0.5"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>

                      <span className="absolute bottom-1.5 left-2 z-10 text-[10px] text-white font-medium bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                        Tour #{idx + 1}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ============ DESKTOP GRID LAYOUT ============ */}
        <div className="hidden md:flex flex-col gap-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start w-full">
            <div className="flex flex-col gap-4 w-full">
              <div
                className="relative rounded-[20px] overflow-hidden shadow-sm border border-gray-100 group h-[360px]"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <button
                  onClick={() => navigate(-1)}
                  className="absolute top-4 left-4 z-20 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow hover:bg-white transition"
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

                {gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${title} banner ${idx + 1}`}
                    onClick={() => openImageModal(currentSlideIndex)}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 cursor-pointer ${
                      currentSlideIndex === idx
                        ? "opacity-100 z-10"
                        : "opacity-0 pointer-events-none z-0"
                    }`}
                  />
                ))}

                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevSlide}
                      aria-label="Previous Slide"
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/65 text-white flex items-center justify-center transition backdrop-blur-xs cursor-pointer text-lg font-bold opacity-0 group-hover:opacity-100"
                    >
                      ‹
                    </button>
                    <button
                      onClick={handleNextSlide}
                      aria-label="Next Slide"
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/35 hover:bg-black/65 text-white flex items-center justify-center transition backdrop-blur-xs cursor-pointer text-lg font-bold opacity-0 group-hover:opacity-100"
                    >
                      ›
                    </button>
                  </>
                )}

                <div className="absolute top-4 right-4 z-20 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-md">
                  📍 {location}
                </div>

                <div className="absolute bottom-3 left-4 z-20 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md pointer-events-none">
                  {currentSlideIndex + 1} / {gallery.length}
                </div>

                <div className="absolute bottom-3 right-4 z-20 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md pointer-events-none flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                  Click to Expand
                </div>
              </div>

              {gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {gallery.slice(0, 4).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setCurrentSlideIndex(idx)}
                      className={`relative w-full h-20 rounded-xl overflow-hidden border cursor-pointer shadow-xs group transition-all duration-200 ${
                        currentSlideIndex === idx
                          ? "border-[#05062F] ring-2 ring-[#05062F]/30"
                          : "border-gray-200 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail preview ${idx + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {idx === 3 && gallery.length > 4 && (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageModal(3);
                          }}
                          className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xs font-bold"
                        >
                          +{gallery.length - 4} More
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {videos.length > 0 && (
                <div className="mt-2 bg-gray-50/80 rounded-2xl p-4 border border-gray-100 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-[#05062F] uppercase tracking-wider">
                      Property Video Tours ({videos.length})
                    </span>
                    <span className="text-[11px] text-gray-400 font-medium">
                      Click to Play Video
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {videos.map((videoUrl, vIdx) => (
                      <div
                        key={vIdx}
                        onClick={() => setActiveVideoModal(videoUrl)}
                        className="relative h-28 rounded-xl bg-black border border-gray-200 overflow-hidden cursor-pointer group flex items-center justify-center shadow-xs"
                      >
                        <video
                          src={`${videoUrl}#t=0.5`}
                          preload="metadata"
                          muted
                          playsInline
                          className="w-full h-full object-cover pointer-events-none transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors pointer-events-none" />

                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <div className="w-10 h-10 bg-white/95 rounded-full flex items-center justify-center shadow-md transition-transform duration-300 group-hover:scale-115">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="#05062F"
                              className="ml-0.5"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2.5 z-10 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded backdrop-blur-sm">
                          Tour Video #{vIdx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-full">
              <DetailsContent />
            </div>
          </div>

          {relatedProperties && relatedProperties.length > 0 && (
            <div className="border-t border-gray-100 pt-8 mt-4">
              <h1 className="text-2xl font-semibold text-[#05062F]">
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

      {/* ============ 1. FULL-RESOLUTION IMAGE LIGHTBOX MODAL ============ */}
      {selectedImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setSelectedImageModal(null)}
        >
          <button
            onClick={() => setSelectedImageModal(null)}
            className="absolute top-5 right-5 z-50 w-11 h-11 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition cursor-pointer text-lg font-bold"
          >
            ✕
          </button>

          {gallery.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition cursor-pointer text-xl font-bold"
              >
                ‹
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center transition cursor-pointer text-xl font-bold"
              >
                ›
              </button>
            </>
          )}

          <div
            className="w-full max-w-4xl h-[75vh] md:h-[80vh] flex flex-col items-center justify-center gap-3 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImageModal}
              alt="Expanded view"
              className="w-full h-full object-contain rounded-2xl shadow-2xl"
            />
            <div className="text-xs text-white/75 font-medium bg-black/50 px-3 py-1 rounded-full shrink-0">
              Photo {activeImageIndex + 1} of {gallery.length}
            </div>
          </div>
        </div>
      )}

      {/* ============ 2. POPUP VIDEO PLAYER MODAL ============ */}
      {activeVideoModal && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setActiveVideoModal(null)}
        >
          <button
            onClick={() => setActiveVideoModal(null)}
            className="absolute top-5 right-5 z-50 w-11 h-11 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition cursor-pointer text-lg font-bold"
          >
            ✕
          </button>

          <div
            className="w-full max-w-3xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={activeVideoModal}
              controls
              autoPlay
              className="w-full max-h-[75vh] object-contain bg-black"
            />
          </div>
        </div>
      )}

      {/* ============ 3. CALL AGENT NUMBERS MODAL ============ */}
      {isCallModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setIsCallModalOpen(false)}
        >
          <div
            className="bg-white rounded-[24px] w-full max-w-[420px] p-6 shadow-2xl relative flex flex-col gap-5 animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsCallModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-100 transition cursor-pointer text-lg font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="flex flex-col gap-1 pr-6">
              <h2 className="text-xl font-bold text-[#05062F]">Call agent</h2>
              <p className="text-xs text-gray-500">Choose a number to call</p>
            </div>

            {/* Agent Info Banner */}
            <div className="bg-[#F8FAFD] border border-gray-100 rounded-xl p-3 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                {agentAvatar ? (
                  <img
                    src={agentAvatar}
                    alt={agentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-[#05062F] flex items-center justify-center text-white font-bold text-base">
                    {agentName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-bold text-[#05062F]">
                  {agentName}
                </span>
                {agentOccupation && (
                  <span className="text-xs text-gray-500">
                    {agentOccupation}
                  </span>
                )}
              </div>
            </div>

            {/* Actionable Phone Numbers List */}
            <div className="flex flex-col gap-2.5">
              {agentPhone ? (
                <a
                  href={`tel:${agentPhone}`}
                  className="w-full bg-[#FFF5F5] hover:bg-[#ffebeb] border border-red-100 rounded-2xl p-4 flex items-center justify-between transition-colors duration-200 group cursor-pointer"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-full bg-[#C82A2A] flex items-center justify-center text-white shadow-xs shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
                      </svg>
                    </div>
                    <span className="text-base font-bold text-gray-900 tracking-tight">
                      {agentPhone}
                    </span>
                  </div>

                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-gray-400 group-hover:text-gray-600 transition-transform group-hover:translate-x-0.5"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </a>
              ) : (
                <div className="text-center py-4 text-xs text-gray-400">
                  No active phone contact available for this agent.
                </div>
              )}
            </div>

            {/* Call Disclaimer Footer */}
            <div className="flex items-start gap-2 text-xs text-gray-500 pt-1">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="shrink-0 mt-0.5 text-gray-400"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
              <p className="leading-tight">
                Tap a number to start a call. Standard call rates may apply.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
