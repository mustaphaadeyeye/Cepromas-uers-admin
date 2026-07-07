import React from "react";
import { Link } from "react-router-dom";
import Bgimg from "../../assets/image/bgcard.png";
import AgricImage from "../../assets/image/estate.png";
import Cicon from "../../assets/icons/cicon.png";

import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";

const InvestmentEstate = ({ to }) => {
  const cards = [
    {
      id: 1,
      image: Bgimg,
      title: "Luxury Apartment",
      price: "₦50,000",
      location: "Mauris adipiscing aliquam",
      duration: "12 months",
      description: "tristique integer adipiscing",
      roi: "30% ROI",
      extra: "aliquam",
    },
    {
      id: 2,
      image: AgricImage,
      title: "Agricultural Investment",
      price: "₦80,000",
      location: "Farm Estate",
      duration: "18 months",
      description: "Cassava Farming",
      roi: "40% ROI",
      extra: "Available",
    },
    {
      id: 3,
      image: Bgimg,
      title: "Luxury Apartment",
      price: "₦50,000",
      location: "Mauris adipiscing aliquam",
      duration: "12 months",
      description: "tristique integer adipiscing",
      roi: "30% ROI",
      extra: "aliquam",
    },
    {
      id: 4,
      image: AgricImage,
      title: "Agricultural Investment",
      price: "₦80,000",
      location: "Farm Estate",
      duration: "18 months",
      description: "Cassava Farming",
      roi: "40% ROI",
      extra: "Available",
    },
    {
      id: 5,
      image: Bgimg,
      title: "Luxury Apartment",
      price: "₦50,000",
      location: "Mauris adipiscing aliquam",
      duration: "12 months",
      description: "tristique integer adipiscing",
      roi: "30% ROI",
      extra: "aliquam",
    },
    {
      id: 6,
      image: AgricImage,
      title: "Agricultural Investment",
      price: "₦80,000",
      location: "Farm Estate",
      duration: "18 months",
      description: "Cassava Farming",
      roi: "40% ROI",
      extra: "Available",
    },
  ];

  return (
    <>
      {cards.map((card) => {
        const Wrapper = to ? Link : "div";

        return (
          <div
            key={card.id}
            className="w-full rounded-[20px] bg-white shadow-md overflow-hidden relative"
          >
            <Wrapper {...(to ? { to } : {})}>
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-[200px] object-cover"
              />

              <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white flex items-center justify-center cursor-pointer shadow-sm opacity-65">
                <img src={Cicon} alt="heart" />
              </div>

              <div className="py-3 px-4 flex flex-col gap-1">
                <div className="flex justify-between items-center">
                  <h1
                    className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}
                  >
                    {card.title}
                  </h1>

                  <p
                    className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}
                  >
                    {card.price}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p
                    className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
                  >
                    {card.location}
                  </p>

                  <p
                    className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
                  >
                    {card.duration}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p
                    className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
                  >
                    {card.description}
                  </p>

                  <p
                    className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
                  >
                    {card.roi}
                  </p>
                </div>

                <div>
                  <p
                    className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}
                  >
                    {card.extra}
                  </p>
                </div>
              </div>
            </Wrapper>
          </div>
        );
      })}
    </>
  );
};

export default InvestmentEstate;