import React from "react";
import {
  fontWeight,
  textColor,
  fontFamily,
  bgColor,
} from "../../components/styles/theme";

const GrowthCard = ({
  title = "Total Amount",
  amount = "₦2,500,000",
  subText,
  icon,
}) => {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)",
      }}
      className="rounded-[10px] p-4 md:p-6 w-full xl:w-[944px] min-h-[90px] md:min-h-[134px] relative flex flex-col justify-between"
    >
      <div className="flex justify-between items-center h-full">
        <div>
          <p
            className={`${textColor.white} text-sm md:text-xl ${fontWeight.normal} ${fontFamily.main}`}
          >
            {title}
          </p>
          <p
            className={`${textColor.white} text-xl md:text-3xl lg:text-4xl ${fontWeight.bold} ${fontFamily.main} mt-1 md:mt-2`}
          >
            {amount}
          </p>
          {subText && (
            <p className="text-white/80 text-[11px] md:text-xs font-medium mt-1">
              {subText}
            </p>
          )}
        </div>

        {icon && (
          <div className="relative w-[32px] h-[32px] md:w-[43px] md:h-[43px] rounded-[4px] flex items-center justify-center shrink-0">
            <div
              className={`${bgColor.primary100} absolute inset-0 rounded-[4px] opacity-[38%]`}
            />
            <img
              src={icon}
              alt="icon"
              className="relative z-10 w-[16px] h-[16px] md:w-[21px] md:h-[21px] object-contain"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GrowthCard;
