import React from 'react'
import Bgimg from "../../assets/image/bgcard.png"
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";

const Cardbg = () => {
  return (
    <div className='w-full rounded-[20px] bg-white shadow-md overflow-hidden'>

      {/* Image */}
      <img src={Bgimg} alt="bg" className='w-full h-50 object-cover' />

      {/* Content */}
      <div className='py-3 px-4 flex flex-col gap-1'>
        <div className='flex justify-between items-center'>
          <h1 className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}>Luxury Apartment</h1>
          <p className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}>₦50,000</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}>Mauris adipiscing aliquam</p>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}>12 months</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}>tristique integer adipiscing</p>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}>30% ROI</p>
        </div>

        <div>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}>aliquam</p>
        </div>
      </div>

    </div>
  )
}

export default Cardbg