import React from 'react'
import Wrapper from "../../components/wrapper/Wrapper";
import GrowthCard from '../../components/cardcontainer/GrowthCard';
import Circleicon from "../../assets/icons/naira.png";
import ListIcon from "../../assets/icons/groiconm.png";
import ActionCard from '../../components/cardcontainer/ActionCard';
import RevenueOverview from '../../components/charts/RevenueOverview';
import GrowthTab from './GrowthTab';





const GrowthLayout = () => {
  return (
    <Wrapper>
        <div className='flex  gap-4 xl:flex-row lg:flex-row md:flex-col flex-col'>
      <div className='flex flex-col gap-2'>
        <GrowthCard
        title='Total Amount'
        amount='₦2,500,000'
        icon={Circleicon}
        />
        <GrowthCard
        title='Total Return Value'
        amount='₦40,000'
        icon={ListIcon}
        />
      </div>
      <div className='flex flex-col gap-2'>
        <ActionCard
        text='5 Total'
         bg='bg-[#DBE8FD]'
         width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
         height='h-[85px]'
         rounded='rounded-[6px]'
        />
        <ActionCard
        text='2 Ongoing'
        bg='bg-[#FEFAA2]'
        width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
         height='h-[85px]'
        rounded='rounded-[6px]'
        />
        <ActionCard
        text='3 Completed'
        bg="bg-[#E1FBC1]"
         width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
         height='h-[85px]'
        rounded='rounded-[6px]'
        />
      </div>
        </div>
        <div className='mt-10'>
            <RevenueOverview/>
        </div>
        <div className='mt-10'>
            <GrowthTab/>
        </div>
    </Wrapper>
  )
}

export default GrowthLayout