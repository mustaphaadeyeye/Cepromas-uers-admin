import React from "react";
import MarketCard from "./MarketCard";
import { fontFamily } from "../../components/styles/theme";

export const TABS = [
  "Apartment",
  "Lands",
  "Shops",
  "Hostels",
  "Warehouses",
  "Event Centers",
];

const MarketPlaceTab = ({
  activeTab,
  setActiveTab,
  hideTabsOnMobile = false,
  properties = [],
  isLoading = false,
  isError = false,
}) => {
  return (
    <div className={`w-full ${fontFamily.main}`}>
      <div
        className={`${hideTabsOnMobile ? "hidden md:flex" : "flex"} justify-start md:justify-center gap-6 md:gap-30 px-4 overflow-x-auto md:overflow-visible scrollbar-hide border-b border-gray-100 mb-6`}
      >
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-4 text-sm whitespace-nowrap shrink-0 transition-colors focus:outline-none cursor-pointer ${
                isActive
                  ? "font-semibold text-gray-900 border-b-2 border-gray-900"
                  : "font-normal text-gray-400 hover:text-gray-600"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Loading States */}
      {isLoading && (
        <p className="text-gray-500 text-center py-12">
          Loading properties from the marketplace...
        </p>
      )}

      {/* Error States */}
      {isError && (
        <p className="text-red-500 text-center py-12">
          Failed to load marketplace properties. Please try again.
        </p>
      )}

      {/* Empty States */}
      {!isLoading && !isError && properties.length === 0 && (
        <p className="text-gray-400 text-center py-12">
          No available properties found matching these criteria.
        </p>
      )}

      {/* Live Data Render Grid */}
      {!isLoading && !isError && properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2 px-4">
          {properties.map((property) => (
            <MarketCard
              key={property.id}
              to={`/app/property/${property.id}`}
              id={property.id}
              image={property.images?.[0] || ""} // Fallback gracefully if no image string exists
              status={
                property.category === "SALE"
                  ? "For Sale"
                  : property.category || "Available"
              }
              availability={
                property.status === "ACTIVE" ? "Available" : "Unavailable"
              }
              title={property.title}
              location={property.location}
              details={`${property.bedrooms || 0} Bed, ${property.bathrooms || 0} Bath | ${property.description}`}
              price={
                property.price
                  ? `₦${Number(property.price).toLocaleString()}`
                  : "Price on Request"
              }
              isFavourite={property.isFavourite} // 👈 FIXED: Successfully passing the database state down!
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketPlaceTab;
