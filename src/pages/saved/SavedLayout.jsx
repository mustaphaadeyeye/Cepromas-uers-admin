import React, { useState } from "react";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/buttons/Button";
import DashImage from "../dashboard/DashImage";

// Import our newly created saved fetching hooks
import { useGetSavedProperties } from "../../hooks/property/useGetSavedProperties";
import { useGetSavedInvestments } from "../../hooks/investment/useGetSavedInvestments";

const SavedLayout = () => {
  const [activeTab, setActiveTab] = useState("investments");

  // Fetch only user-favorited properties and investments
  const {
    data: savedProperties = [],
    isLoading: propertiesLoading,
    isError: propertiesError,
  } = useGetSavedProperties();

  const {
    data: savedInvestments = [],
    isLoading: investmentsLoading,
    isError: investmentsError,
  } = useGetSavedInvestments();

  return (
    <div>
      <Wrapper>
        <div>
          {/* Content Header */}
          <div className="mt-6">
            <h1
              className={`
                ${fontSize["2xl"]}
                ${fontWeight.medium}
                ${textColor.primary}
                ${fontFamily.main}
              `}
            >
              Saved Items
            </h1>
            <div>
              <p
                className={`${fontFamily.main} ${fontWeight.normal} ${fontSize.lg} ${textColor.primary} mt-4 mb-4`}
              >
                Access properties and investment opportunities you've saved for
                later.
              </p>
            </div>
          </div>
        </div>

        {/* ─── TABS SWITCHER ─── */}
        <div className="mt-4 md:mt-5 lg:mt-5 xl:mt-5">
          <div className="flex items-center gap-3 mb-6">
            <Button
              text="Investments"
              bg={activeTab === "investments" ? "bg-[#05062F]" : "bg-[#F3F4F5]"}
              width="w-[166px] md:w-[185px]"
              height="h-[44px]"
              rounded="rounded-[10px]"
              className={`
                ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
                ${activeTab === "investments" ? "text-white" : textColor.secondary}
              `}
              onClick={() => setActiveTab("investments")}
            />

            <Button
              text="Market Place"
              bg={activeTab === "properties" ? "bg-[#05062F]" : "bg-[#F3F4F5]"}
              width="w-[166px] md:w-[185px]"
              height="h-[44px]"
              rounded="rounded-[10px]"
              className={`
                ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
                ${activeTab === "properties" ? "text-white" : textColor.secondary}
              `}
              onClick={() => setActiveTab("properties")}
            />
          </div>

          {/* ─── TAB CONTENT RESULTS GRID ─── */}
          <div className="mt-6">
            {/* ============ SAVED INVESTMENTS ============ */}
            {activeTab === "investments" && (
              <>
                {investmentsLoading && (
                  <p className="text-gray-500 text-center py-10">
                    Loading saved investments...
                  </p>
                )}
                {investmentsError && (
                  <p className="text-red-500 text-center py-10">
                    Failed to load saved investments.
                  </p>
                )}
                {!investmentsLoading &&
                  !investmentsError &&
                  savedInvestments.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium">
                        You haven't saved any investments yet.
                      </p>
                    </div>
                  )}
                {!investmentsLoading &&
                  !investmentsError &&
                  savedInvestments.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                      {savedInvestments.map((pkg) => (
                        <DashImage
                          key={pkg.id}
                          investment={pkg}
                          isFavourite={true} // Hardcoded true because they're fetched from the saved collection!
                          to={`/app/investment-description/${pkg.id}`}
                        />
                      ))}
                    </div>
                  )}
              </>
            )}

            {/* ============ SAVED PROPERTIES ============ */}
            {activeTab === "properties" && (
              <>
                {propertiesLoading && (
                  <p className="text-gray-500 text-center py-10">
                    Loading saved properties...
                  </p>
                )}
                {propertiesError && (
                  <p className="text-red-500 text-center py-10">
                    Failed to load saved properties.
                  </p>
                )}
                {!propertiesLoading &&
                  !propertiesError &&
                  savedProperties.length === 0 && (
                    <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium">
                        You haven't saved any properties yet.
                      </p>
                    </div>
                  )}
                {!propertiesLoading &&
                  !propertiesError &&
                  savedProperties.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6">
                      {savedProperties.map((property) => (
                        <DashImage
                          key={property.id}
                          property={property}
                          isFavourite={true} // Hardcoded true because they're fetched from the saved collection!
                          to={`/app/property/${property.id}`}
                        />
                      ))}
                    </div>
                  )}
              </>
            )}
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default SavedLayout;
