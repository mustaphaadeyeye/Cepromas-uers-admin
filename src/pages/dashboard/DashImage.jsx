import React, { useState } from 'react'
import BgImg from "../../assets/image/bgnew.png"
import arrowImg from "../../assets/icons/arrow.png"
import { fontSize, fontWeight, textColor, fontFamily } from "../../components/styles/theme";

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#e00000" : "none"}
    stroke={filled ? "#e00000" : "#000000"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const DashImage = () => {
  const [liked, setLiked] = useState(false)

  return (
    <div
      style={{ backgroundImage: `url(${BgImg})` }}
      className='relative h-48 md:h-64 lg:h-72 xl:h-80 w-full lg:flex-1 bg-cover bg-center rounded-[14px] flex items-end p-4 md:p-5 lg:p-6 xl:p-6'
    >
      {/* Heart */}
      <div
        onClick={() => setLiked(!liked)}
        className='absolute top-4 right-4 w-9 h-9 rounded-full bg-[#f0f0f0] flex items-center justify-center cursor-pointer shadow-sm'
      >
        <HeartIcon filled={liked} />
      </div>

      {/* Bottom content */}
      <div className='flex items-center justify-between w-full'>
        <div>
          <h1 className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.white}`}>Luxury Apartment</h1>
          <span className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} ${textColor.white}`}>N50,000</span>
        </div>
        <div>
          <img src={arrowImg} alt="arrow" />
        </div>
      </div>
    </div>
  )
}

export default DashImage