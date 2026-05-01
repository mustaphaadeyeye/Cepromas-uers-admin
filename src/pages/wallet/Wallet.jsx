import React from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import BalanceCard from '../../components/cardcontainer/BalanceCard'
import ActionCard from '../../components/cardcontainer/ActionCard'
import ArrowUp from "../../assets/icons/ArrowLineUp.png"
import ArrowDown from "../../assets/icons/ArrowLineDown.png"
import ArrowChart from "../../assets/icons/ChartLineUp.png"
import TransactionList from '../../components/cardcontainer/TransactionList'




const Wallet = () => {
  return (
    <div>
      <Wrapper>
        <div className='flex  gap-4 xl:flex-row lg:flex-row md:flex-col flex-col'>
          
          {/* Balance Card takes up remaining space */}
          <div className='flex-1'>
            <BalanceCard/>
          </div>

          {/* Action cards stack on the right */}
          <div className='flex flex-col gap-3'>
            <ActionCard
              icon={<img src={ArrowUp} alt="arrow up" className="w-5 h-5" />}
              text="Withdraw"
              bg='bg-[#E1FBC1]'
             width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
              height='h-[85px]'
            />
             <ActionCard
              icon={<img src={ArrowDown} alt="arrow up" className="w-5 h-5" />}
              text="Add Money"
              bg='bg-[#DBE8FD]'
             width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
              height='h-[85px]'
            />
            <ActionCard
              icon={<img src={ArrowChart} alt="arrow up" className="w-5 h-5" />}
              text="Interest"
              bg='bg-[#FEFAA2]'
             width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
              height='h-[85px]'
            />
            {/* Add more ActionCards here */}
          </div>

        </div>

        <div className='mt-6'>
          <TransactionList/>
        </div>
      </Wrapper>
    </div>
  )
}

export default Wallet