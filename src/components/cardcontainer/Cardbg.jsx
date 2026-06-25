import React, { useState } from 'react'
import Bgimg from "../../assets/image/bgcard.png"
import { fontSize, fontWeight, fontFamily, textColor } from "../../components/styles/theme";
import { Link } from 'react-router-dom';
import Cicon from "../../assets/icons/cicon.png"

// const HeartIcon = ({ filled }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="18"
//     height="16"
//     viewBox="0 0 24 24"
//     fill={filled ? "#e00000" : "none"}
//     stroke={filled ? "#e00000" : "#000000"}
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
//   </svg>
// )

const Cardbg = ({ to }) => {
  // const [liked, setLiked] = useState(false);

  const Wrapper = to ? Link : 'div';

  return (
    <div className='w-full rounded-[20px] bg-white shadow-md overflow-hidden relative'>
      <Wrapper {...(to ? { to } : {})}>

        <img src={Bgimg} alt="bg" className='w-full h-50 object-cover' />

        {/* Heart */}
        <div
          // onClick={(e) => {
          //   e.preventDefault()
          //   e.stopPropagation()
          //   setLiked(!liked)
          // }}
          className='absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer shadow-sm opacity-65'
          >
            {/* <HeartIcon filled={liked} /> */}
            <img src={Cicon} alt="heart" />
        </div>

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

      </Wrapper>
    </div>
  )
}

export default Cardbg