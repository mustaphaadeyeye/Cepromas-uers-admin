import React from 'react'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  bgColor,
} from "../../components/styles/theme";

const GrowthCard = ({
  title = 'Total Amount',
  amount = '₦2,500,000',
  icon,
}) => {
  return (
    <div
      style={{ background: 'linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)' }}
      className="rounded-[10px] p-5 md:p-6 w-full xl:w-[944px] h-[134px] relative"
    >
      <div className='flex justify-between items-center h-full'>

        <div>
          <p className={`${textColor.white} ${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main}`}>
            {title}
          </p>
          <p className={`${textColor.white} ${fontSize["4xl"]} ${fontWeight.bold} ${fontFamily.main} mt-4`}>
            {amount}
          </p>
        </div>

    {icon && (
  <div className="relative w-[43px] h-[43px] rounded-[4px] flex items-center justify-center">
   
    <div className={`${bgColor.primary100} absolute inset-0 rounded-[4px] opacity-[38%]`} />
   
    <img src={icon} alt="icon" className="relative z-10 w-[21px] h-[21px] object-contain" />
  </div>
)}

      </div>
    </div>
  )
}

export default GrowthCard