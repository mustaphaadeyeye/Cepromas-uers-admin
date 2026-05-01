import React from 'react'
import BgImg from "../../assets/image/bgnew.png"
import arrowImg from "../../assets/icons/arrow.png"
import HeartImg from "../../assets/image/heart.png"
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  bgColor,
} from "../../components/styles/theme";

const DashImage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${BgImg})` }}
      className='
        relative
        h-48 md:h-64 lg:h-72 xl:h-80
        w-full lg:flex-1
        bg-cover bg-center rounded-[14px]
        flex items-end
        p-4 md:p-5 lg:p-6 xl:p-6
      '
    >
      {/* Heart - top right corner */}
      <img
        src={HeartImg}
        alt="heart"
        className='absolute top-4 right-4'
      />

      {/* Bottom content */}
      <div className='flex items-center justify-between w-full '>
        <div>
          <h1 className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.white}`}>
            Luxury Apartment
          </h1>
          <span className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} ${textColor.white}`}>
            N50,000
          </span>
        </div>
        <div>
          <img src={arrowImg} alt="arrow" />
        </div>
      </div>
    </div>
  )
}

export default DashImage