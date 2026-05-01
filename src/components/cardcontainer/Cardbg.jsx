import React from 'react'
import Wrapper from '../wrapper/Wrapper'
import Bgimg from "../../assets/image/bgcard.png"
import {
  fontSize,
  fontWeight,
  fontFamily,
} from "../../components/styles/theme";

const Cardbg = () => {
  return (
    <Wrapper>
      <div className='w-full xl:w-[405px] lg:w-[400px] rounded-[20px] bg-white shadow-md overflow-hidden'>
        
        {/* Image */}
        <img src={Bgimg} alt="bg" className='w-full h-[200px] object-cover' />

        {/* Content */}
        <div className='py-3 px-4 flex flex-col gap-1'>
          <div className='flex justify-between items-center'>
            <h1 className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}>Luxury Apartment</h1>
            <p className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main}`}>N50,000</p>
          </div>

          <div className='flex justify-between items-center'>
            <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main}`}>Mauris adipiscing aliquam</p>
            <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main}`}>12 months</p>
          </div>

          <div className='flex justify-between items-center'>
            <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main}`}>tristique integer adipiscing</p>
            <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main}`}>30% ROI</p>
          </div>

          <div>
            <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main}`}>aliquam</p>
          </div>
        </div>

      </div>
    </Wrapper>
  )
}

export default Cardbg