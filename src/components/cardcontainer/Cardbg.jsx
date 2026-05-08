import React, { useState } from 'react'
import Bgimg from "../../assets/image/bgcard.png"
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";
import LoveIcon from "../../assets/icons/mylove.svg"
import { Link } from 'react-router-dom';

const Cardbg = () => {

  const [liked, setLiked] = useState(false);

  return (
    <div className='w-full rounded-[20px] bg-white shadow-md overflow-hidden  relative'>
      <Link to="/investment-description">
      {/* Image */}
      <img src={Bgimg} alt="bg" className='w-full h-50 object-cover' />

      {/* Heart - top right corner */}
    <img
  src={LoveIcon}
  alt="heart"
  onClick={() => setLiked(!liked)}
  className={`absolute top-4 right-4 w-[20px] h-[18px] cursor-pointer transition`}
  style={{
    filter: liked
      ? "invert(16%) sepia(91%) saturate(7498%) hue-rotate(356deg) brightness(95%) contrast(118%)"
      : "none"
  }}
/>

      {/* Content */}
      <div className='py-3 px-4 flex flex-col gap-1'>
        <div className='flex justify-between items-center'>
          <h1 className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}>Luxury Apartment</h1>
          <p className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}>₦50,000</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>Mauris adipiscing aliquam</p>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>12 months</p>
        </div>

        <div className='flex justify-between items-center'>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>tristique integer adipiscing</p>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>30% ROI</p>
        </div>

        <div>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>aliquam</p>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default Cardbg