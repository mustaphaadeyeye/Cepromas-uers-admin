import React from "react";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  textDecoration,
  letterSpacing,
  bgColor,
} from "../../components/styles/theme";
import Wrapper from "../../components/wrapper/Wrapper";
import SarahImg from "../../assets/image/sarahero.png";
import Card from "../../components/cardcontainer/Card";
import DropdownInput from "../../components/inputs/DropdownInput";
import Button from "../../components/buttons/Button";
import Cardbg from "../../components/cardcontainer/Cardbg";
import DashImage from "./DashImage";



const DashboardLayouts = () => {
  return (
    <div>
      <Wrapper>

        {/* ─── HERO BANNER ─── */}
        <div
          style={{ backgroundImage: `url(${SarahImg})` }}
          className="
            h-48 md:h-64 lg:h-72 xl:h-80
            w-full bg-cover bg-center rounded-[20px]
            flex items-end
            p-4 md:p-5 lg:p-6 xl:p-6
          "
        >
          <div className="w-full flex flex-col gap-2 md:gap-3 text-white">

            <h1
              className={`
                ${fontSize["4xl"]}
                ${fontWeight.medium}
                ${textColor.white}
                ${fontFamily.main}
              `}
            >
              Most Popular
            </h1>

        
            <div className="flex items-center flex-wrap gap-3 md:gap-4 lg:gap-5 xl:gap-5">
              <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>
                Luxury Apartment
              </p>
              <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>
                N50,000
              </p>
              <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>
                30% ROI
              </p>
              <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>
                12 months
              </p>
            </div>

          </div>
        </div>

        {/* ─── AVAILABLE INVESTMENTS ─── */}
        <div className="mt-4 md:mt-5 lg:mt-5 xl:mt-5">
          <h1
            className={`
              ${fontSize["4xl"]}
              ${fontWeight.medium}
              ${textColor.primary}
              ${fontFamily.main}
            `}
          >
            Available Investments
          </h1>

          <div className="mt-2">
          
            <Card>
              <div
                className="
                  grid
                  grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-5
                  xl:grid-cols-5
                  gap-3 md:gap-4 lg:gap-5 xl:gap-6
                "
              >

                {/* Location */}
                <div className="flex flex-col">
                  <h1
                    className={`
                      ${fontSize["xs"]}
                      ${fontWeight.normal}
                      ${textColor.secondary}
                      ${fontFamily.main}
                      ${textDecoration.uppercase}
                      ${letterSpacing.xs}
                      mb-2
                    `}
                  >
                    Location
                  </h1>
                  <DropdownInput
                    text="All Global Market"
                    className={`
                      ${fontFamily.main}
                      ${fontSize.md}
                      ${fontWeight.normal}
                      ${textColor.primary}
                    `}
                  />
                </div>

                {/* Price Range */}
                <div className="flex flex-col">
                  <h1
                    className={`
                      ${fontSize["xs"]}
                      ${fontWeight.normal}
                      ${textColor.secondary}
                      ${fontFamily.main}
                      ${textDecoration.uppercase}
                      ${letterSpacing.xs}
                      mb-2
                    `}
                  >
                    Price Range
                  </h1>
                  
                  <DropdownInput
                    text="NGN200,000 - NGN500,000"
                    className={`
                      ${fontFamily.main}
                      ${fontSize.md}
                      ${fontWeight.normal}
                      ${textColor.primary}
                    `}
                  />
                </div>

                {/* Duration */}
                <div className="flex flex-col">
                  <h1
                    className={`
                      ${fontSize["xs"]}
                      ${fontWeight.normal}
                      ${textColor.secondary}
                      ${fontFamily.main}
                      ${textDecoration.uppercase}
                      ${letterSpacing.xs}
                      mb-2
                    `}
                  >
                    Duration
                  </h1>
                  <DropdownInput
                    text="0 - 6 months"
                    className={`
                      ${fontFamily.main}
                      ${fontSize.md}
                      ${fontWeight.normal}
                      ${textColor.primary}
                    `}
                  />
                </div>

                {/* ROI */}
                <div className="flex flex-col">
                  <h1
                    className={`
                      ${fontSize["xs"]}
                      ${fontWeight.normal}
                      ${textColor.secondary}
                      ${fontFamily.main}
                      ${textDecoration.uppercase}
                      ${letterSpacing.xs}
                      mb-2
                    `}
                  >
                    ROI
                  </h1>
                  <DropdownInput
                    text="6 - 10%"
                    className={`
                      ${fontFamily.main}
                      ${fontSize.md}
                      ${fontWeight.normal}
                      ${textColor.primary}
                    `}
                  />
                </div>

                {/* Asset Class + Search */}
                <div className="flex flex-col  xl:col-span-1">
                  <h1
                    className={`
                      ${fontSize["xs"]}
                      ${fontWeight.normal}
                      ${textColor.secondary}
                      ${fontFamily.main}
                      ${textDecoration.uppercase}
                      ${letterSpacing.xs}
                      mb-2
                    `}
                  >
                    Asset Class
                  </h1>
                  <div className="flex items-center gap-2">
                    <Button
                      text="Residential"
                      bg={bgColor.primaryDark}
                      className={`
                        ${fontFamily.main}
                        ${fontSize.md}
                        ${fontWeight.normal}
                        ${textColor.white}
                      `}
                    />
                    <Button
                      text="Search"
                      bg={bgColor.accentRed}
                      className={`
                        ${fontFamily.main}
                        ${fontSize.md}
                        ${fontWeight.normal}
                        ${textColor.white}
                      `}
                    />
                  </div>
                </div>

              </div>
            </Card>
          </div>
        </div>

        <div className="mt-4 md:mt-5 lg:mt-5 xl:mt-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6">
               <Cardbg />
                <Cardbg />
                 <Cardbg />
            </div>
        </div>

      
{/* Available properties */}
<div className="mt-4 md:mt-5 lg:mt-5 xl:mt-5">
  <h1
    className={`
      ${fontSize["4xl"]}
      ${fontWeight.medium}
      ${textColor.primary}
      ${fontFamily.main}
    `}
  >
    Available Properties
  </h1>

  <div className="mt-2">
    <Card>
      <div className="flex flex-col xl:flex-row xl:items-center gap-4 xl:gap-6">

        {/* Location */}
        <div className="flex flex-col w-full xl:w-87.5 shrink-0">
          <h1
            className={`
              ${fontSize["xs"]}
              ${fontWeight.normal}
              ${textColor.secondary}
              ${fontFamily.main}
              ${textDecoration.uppercase}
              ${letterSpacing.xs}
              mb-2
            `}
          >
            Location
          </h1>
          <DropdownInput
            text="All Global Market"
            width="w-full"
            className={`
              ${fontFamily.main}
              ${fontSize.md}
              ${fontWeight.normal}
              ${textColor.primary}
            `}
          />
        </div>

        {/* Price Range */}
        <div className="flex flex-col w-full xl:w-100.25 shrink-0">
          <h1
            className={`
              ${fontSize["xs"]}
              ${fontWeight.normal}
              ${textColor.secondary}
              ${fontFamily.main}
              ${textDecoration.uppercase}
              ${letterSpacing.xs}
              mb-2
            `}
          >
            Price Range
          </h1>
          <DropdownInput
            text="NGN200,000 - NGN500,000"
            width="w-full"
            className={`
              ${fontFamily.main}
              ${fontSize.md}
              ${fontWeight.normal}
              ${textColor.primary}
            `}
          />
        </div>

        {/* Property Type + Search */}
        <div className="flex flex-col w-full xl:flex-1 min-w-0">
          <h1
            className={`
              ${fontSize["xs"]}
              ${fontWeight.normal}
              ${textColor.secondary}
              ${fontFamily.main}
              ${textDecoration.uppercase}
              ${letterSpacing.xs}
              mb-2
            `}
          >
            Property type
          </h1>
          <div className="flex items-center gap-2 flex-nowrap">
            <Button
              text="Commercial"
              bg={bgColor.primaryDark}
              width="w-auto"
              className={`
                px-3 shrink-0
                ${fontFamily.main}
                ${fontSize.md}
                ${fontWeight.normal}
                ${textColor.white}
              `}
            />
            <Button
              text="Residential"
              bg={bgColor.darkGray}
              width="w-auto"
              className={`
                px-3 shrink-0
                ${fontFamily.main}
                ${fontSize.md}
                ${fontWeight.normal}
                ${textColor.darkGray}
              `}
            />
            <Button
              text="Apartment"
              bg={bgColor.darkGray}
              width="w-auto"
              className={`
                px-3 shrink-0
                ${fontFamily.main}
                ${fontSize.md}
                ${fontWeight.normal}
                ${textColor.darkGray}
              `}
            />
            <Button
              text="Search"
              bg={bgColor.accentRed}
              width="w-auto"
              className={`
                px-3 shrink-0
                ${fontFamily.main}
                ${fontSize.md}
                ${fontWeight.normal}
                ${textColor.white}
              `}
            />
          </div>
        </div>

      </div>
    </Card>
  </div>
</div>

    <div className="mt-4 md:mt-5 lg:mt-5 xl:mt-5 flex flex-col lg:flex-row gap-4 md:gap-5 lg:gap-6 xl:gap-6">
  <DashImage/>
  <DashImage/>
  <DashImage/>
</div>
      </Wrapper>
    </div>
  );
};

export default DashboardLayouts;