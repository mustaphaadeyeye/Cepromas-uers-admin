import React, { useState } from 'react'
import Bgimg from "../../assets/image/newdash.png"
import CircleIcon from "../../assets/icons/circleicon.png"
import { fontSize, fontWeight, fontFamily, textColor } from "../../components/styles/theme";
import { Link } from 'react-router-dom';
import LocationIcon from "../../assets/icons/locationicon.png"
import Button from '../../components/buttons/Button';
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

const DashImage = ({ to }) => {
  // const [liked, setLiked] = useState(false);

  const Wrapper = to ? Link : 'div';

  return (
    <div className='w-full rounded-[20px] bg-white shadow-md overflow-hidden relative'>
      <Wrapper {...(to ? { to } : {})}>

        <img src={Bgimg} alt="bg" className='w-full h-50 object-cover rounded-bl-[20px] rounded-br-[20px]' />

        {/* Heart */}
        <div
         
          className='absolute top-4 right-4 w-9 h-9 rounded-full bg-[#FFFFFF] flex items-center justify-center cursor-pointer shadow-sm opacity-65'
        >
          <img src={Cicon} alt="heart" />
        </div>

        <div className='py-3 px-4 flex flex-col gap-1'>

          <div className='flex justify-between items-center'>
            <div className='flex items-center '>
              <img src={CircleIcon} alt="circle" className='w-3 h-3 inline-block mr-2' />
              <span className={`${fontSize.sm} ${fontWeight.light} ${fontFamily.main} ${textColor.primary}`}>For Sale</span>
            </div>
            <div>
              <p className={`${fontSize.sm} ${fontWeight.light} ${fontFamily.main} ${textColor.primary}`}>
                Available
              </p>
            </div>
          </div>


          <div className=''>
            <h1 className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}>Luxury 3-Bedroom Apartment</h1>
            {/* <p className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}>₦50,000</p> */}
          </div>
          <div className='flex  items-center'>
             <img src={LocationIcon} alt="location" className='w-[20px] h-[20px] inline-block mr-2' />
            <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}> Ajah, Lagos Coastal Area</p>
           
          </div>
          <div>
            <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>3 Bedrooms, 3 Bathrooms, 250 sqm, Parking Available</p>
            {/* <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>30% ROI</p> */}
          </div>


          <div className='flex justify-between items-center mt-3'>
           <div>
              <h2 className={`${fontSize.base} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}>Price:</h2>
              <h1 className={` ${fontSize["2xl"]} ${fontWeight.medium} ${fontFamily.main} text-[#2540A8]`}>
                N50,000
              </h1>
           </div>
           <div>
            <Button
              text="View Details"
              bg="bg-[#DBE8FD]"
              width="w-[102px]"
              height="h-[36px]"
              rounded="rounded-[10px]"
              className={`
                flex-1
                ${fontSize.sm} ${fontWeight.medium} ${fontFamily.main}
                  ${textColor.primary}
              `}
            />
           </div>
          </div>
        </div>

      </Wrapper>
    </div>
  )
}

export default DashImage