import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios.js";
import Wrapper from "../../components/wrapper/Wrapper";
import DashImage from "../dashboard/DashImage";

const OwnerProperties = () => {
  const { agentId } = useParams();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [sortBy, setSortBy] = useState("FEATURED");
  const [showFullAbout, setShowFullAbout] = useState(false);

  // Fetch all properties to filter by this owner's agentId
  const {
    data: allProperties,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await api.get("/properties");
      const responseData = response?.data ?? response;
      return responseData?.data ?? responseData ?? [];
    },
  });

  // Filter properties belonging strictly to this agent
  const ownerProperties = useMemo(() => {
    if (!Array.isArray(allProperties)) return [];
    return allProperties.filter(
      (item) => (item?.agentId === agentId || item?.agent?.id === agentId),
    );
  }, [allProperties, agentId]);

  // Extract owner/agent profile from the first linked property record
  const agent = useMemo(() => {
    return ownerProperties[0]?.agent || null;
  }, [ownerProperties]);

  const agentName = agent?.fullName || "Property Owner";
  const agentAddress = agent?.address
    ? `${agent.address}${agent?.state ? `, ${agent.state}` : ""}`
    : agent?.state || "Lagos, Nigeria";
  const agentPhone = agent?.phoneNumber || "";
  const agentAvatar = agent?.faceCaptureUrl || null;
  const agentOccupation = agent?.occupation || "Real Estate Practitioner";

  // Computed Metrics based on real database records
  const stats = useMemo(() => {
    const total = ownerProperties.length;
    const forSale = ownerProperties.filter(
      (p) => p.category === "SALE" || !p.category,
    ).length;
    const forRent = ownerProperties.filter((p) => p.category === "RENT").length;
    const forLease = ownerProperties.filter((p) => p.category === "LEASE").length;

    const uniqueAreas = Array.from(
      new Set(
        ownerProperties
          .map((p) => p.location?.split(",")?.[0]?.trim())
          .filter(Boolean),
      ),
    );

    return {
      total,
      forSale,
      forRent,
      forLease,
      uniqueAreas,
    };
  }, [ownerProperties]);

  // Category Tab Filtering
  const filteredProperties = useMemo(() => {
    let result = [...ownerProperties];
    if (selectedCategory === "SALE") {
      result = result.filter((p) => p.category === "SALE" || !p.category);
    } else if (selectedCategory === "RENT") {
      result = result.filter((p) => p.category === "RENT");
    } else if (selectedCategory === "LEASE") {
      result = result.filter((p) => p.category === "LEASE");
    }

    if (sortBy === "PRICE_LOW") {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === "PRICE_HIGH") {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }
    return result;
  }, [ownerProperties, selectedCategory, sortBy]);

  const categoriesList = [
    { key: "ALL", label: "All", count: stats.total },
    { key: "SALE", label: "For sale", count: stats.forSale },
    { key: "RENT", label: "For rent", count: stats.forRent },
    { key: "LEASE", label: "Short let / Lease", count: stats.forLease },
  ];

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-72">
        <p className="text-gray-500 animate-pulse font-medium">
          Loading owner portfolio...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center p-12">
        <p className="text-red-500 font-medium">
          Failed to load owner profile details.
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

  return (
    <Wrapper>
      <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto font-sans pb-12">
        {/* Back Navigation Bar */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition cursor-pointer"
            aria-label="Back"
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
          <span className="text-sm font-medium text-gray-500">
            Back to property details
          </span>
        </div>

        {/* ============ 1. OWNER HERO HEADER CARD ============ */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            {/* Owner Logo & Text Info */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#05062F] text-white flex items-center justify-center font-bold text-2xl shrink-0 overflow-hidden shadow-xs border border-gray-100">
                {agentAvatar ? (
                  <img
                    src={agentAvatar}
                    alt={agentName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  agentName.charAt(0)
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-[#05062F]">
                    {agentName}
                  </h1>
                  {agent?.isKycVerified && (
                    <span className="bg-blue-50 text-[#2540A8] text-[11px] font-semibold px-2 py-0.5 rounded-md">
                      ✓ Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="shrink-0 text-gray-400"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{agentAddress}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons: Call & WhatsApp */}
            <div className="flex items-center gap-2.5 shrink-0">
              {agentPhone && (
                <a
                  href={`tel:${agentPhone}`}
                  className="bg-[#C82A2A] hover:bg-[#a62222] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 transition shadow-xs"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z" />
                  </svg>
                  Call
                </a>
              )}

              <button
                onClick={() => navigate("/app/chat")}
                className="border border-gray-200 hover:bg-gray-50 text-[#05062F] text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full flex items-center gap-2 transition cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
                Message Owner
              </button>
            </div>
          </div>

          {/* Metrics Counters Bar */}
          <div className="bg-[#F8FAFD] border border-gray-100 rounded-xl p-4 grid grid-cols-2 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-200/80 gap-3 text-center">
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-bold text-[#05062F]">
                {stats.total}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Active listings</p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-bold text-[#05062F]">
                {stats.forSale}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">For sale</p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-bold text-[#05062F]">
                {stats.forRent}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">For rent</p>
            </div>
            <div className="p-2">
              <p className="text-xl sm:text-2xl font-bold text-[#05062F]">
                {stats.forLease}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Short let</p>
            </div>
            <div className="p-2 col-span-2 sm:col-span-1">
              <p className="text-xl sm:text-2xl font-bold text-[#05062F]">
                {stats.uniqueAreas.length || 1}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">Areas covered</p>
            </div>
          </div>
        </div>

        {/* ============ 2. AREAS COVERED CAPSULE ============ */}
        {stats.uniqueAreas.length > 0 && (
          <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-xs flex flex-col gap-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-gray-700">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              <span>Areas covered</span>
              <span className="text-gray-400 font-normal">
                • {stats.uniqueAreas.length} area
                {stats.uniqueAreas.length > 1 ? "s" : ""} across {agentAddress}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {stats.uniqueAreas.map((area, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg text-xs font-medium"
                >
                  {area} <strong className="text-[#05062F] font-bold">1</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ============ 3. LISTINGS CATALOG SECTION ============ */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#05062F]">
                Listings from {agentName}
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Showing 1–{filteredProperties.length} of {stats.total} propert
                {stats.total === 1 ? "y" : "ies"}
              </p>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white border border-gray-200 text-gray-700 text-xs rounded-xl px-3 py-2 outline-none cursor-pointer focus:border-[#05062F]"
              >
                <option value="FEATURED">Sort: Featured</option>
                <option value="PRICE_LOW">Price: Low to High</option>
                <option value="PRICE_HIGH">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Sub-Category Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categoriesList.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat.key
                    ? "bg-[#05062F] text-white shadow-xs"
                    : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat.key
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Property Cards Grid */}
          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
              {filteredProperties.map((item) => (
                <DashImage
                  key={item.id}
                  property={item}
                  to={`/app/property/${item.id}`}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-2xl p-12 text-center text-gray-400">
              <p className="text-sm">
                No active properties listed under this category.
              </p>
            </div>
          )}
        </div>

        {/* ============ 4. ABOUT OWNER INFORMATION CARD ============ */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs flex flex-col gap-3">
          <h3 className="text-base font-bold text-[#05062F]">
            About {agentName}
          </h3>

          <p
            className={`text-xs sm:text-sm text-gray-600 leading-relaxed ${
              showFullAbout ? "" : "line-clamp-3"
            }`}
          >
            {agentName} is an active asset manager and developer with Cephas
            Property & Asset Management based in {agentAddress}. Providing
            verified real estate advisory, property acquisition, due diligence,
            and ownership structuring across Nigeria. Specializing in{" "}
            {agentOccupation}.
          </p>

          <button
            onClick={() => setShowFullAbout((prev) => !prev)}
            className="text-xs font-semibold text-[#A32222] hover:underline self-start cursor-pointer mt-1"
          >
            {showFullAbout ? "Show less" : "Show more"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default OwnerProperties;