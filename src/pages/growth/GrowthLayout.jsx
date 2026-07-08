import React from 'react'
import Wrapper from "../../components/wrapper/Wrapper";
import GrowthCard from '../../components/cardcontainer/GrowthCard';
import Circleicon from "../../assets/icons/naira.png";
import ListIcon from "../../assets/icons/groiconm.png";
import ActionCard from '../../components/cardcontainer/ActionCard';
import RevenueOverview from '../../components/charts/RevenueOverview';
import GrowthTab from './GrowthTab';
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";





const GrowthLayout = () => {
  return (
    <Wrapper>
      <div className='lg:hidden  block'>
        <h1 className={`${fontFamily.main} ${fontSize.xl} ${fontWeight.bold} ${textColor.black}`}>
          My Investment Growth
        </h1>

        <p className={`${fontFamily.main}  ${fontWeight.normal} text-[14px] ${textColor.gray500} mb-5`}>
          Track how your investments are performing over time.
        </p>
      </div>
        <div className='flex flex-col gap-4 lg:flex-row'>
      <div className='flex flex-col gap-2 w-full'>
        <GrowthCard
        title='Total Investment Value'
        amount='₦2,550,000'
        icon={Circleicon}
        />
        <GrowthCard
        title='Total Returns Value'
        amount='₦485,000'
        icon={ListIcon}
        />
      </div>
      <div className='flex flex-row flex-wrap gap-2 lg:flex-col lg:flex-nowrap w-full lg:w-auto'>
        <ActionCard
  number='5'
  label='Total Investment'
  bg='bg-[#DBE8FD]'
  width='w-[31%] lg:w-[314px]'
  height='h-[64px] lg:h-[85px]'
  rounded='rounded-[8px] lg:rounded-[6px]'
/>
<ActionCard
  number='2'
  label='Ongoing'
  bg='bg-[#FEFAA2]'
  width='w-[31%] lg:w-[314px]'
  height='h-[64px] lg:h-[85px]'
  rounded='rounded-[8px] lg:rounded-[6px]'
/>
<ActionCard
  number='3'
  label='Completed'
  bg="bg-[#E1FBC1]"
  width='w-[31%] lg:w-[314px]'
  height='h-[64px] lg:h-[85px]'
  rounded='rounded-[8px] lg:rounded-[6px]'
/>
      </div>
        </div>
        <div className='mt-6 md:mt-10'>
            <RevenueOverview/>
        </div>
        <div className='mt-6 md:mt-10'>
            <GrowthTab/>
        </div>
    </Wrapper>
  )
}

export default GrowthLayout