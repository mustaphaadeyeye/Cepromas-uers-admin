import React, { useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import BalanceCard from '../../components/cardcontainer/BalanceCard'
import ActionCard from '../../components/cardcontainer/ActionCard'
import ArrowUp from "../../assets/icons/ArrowLineUp.png"
import ArrowDown from "../../assets/icons/ArrowLineDown.png"
import ArrowChart from "../../assets/icons/ChartLineUp.png"
import TransactionList from '../../components/cardcontainer/TransactionList'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import FilterIcon from "../../assets/icons/filter.png"
import { Link, Links } from 'react-router-dom'





const Wallet = () => {
  const [open, setOpen] = useState(false)
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
            <Link to="/wallet-interest">
              <ActionCard
                icon={<img src={ArrowChart} alt="arrow up" className="w-5 h-5" />}
                text="Interest"
                bg='bg-[#FEFAA2]'
               width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
                height='h-[85px]'
              />
            </Link>
            {/* <ActionCard
              icon={<img src={ArrowChart} alt="arrow up" className="w-5 h-5" />}
              text="Interest"
              bg='bg-[#FEFAA2]'
             width='w-full md:w-full lg:w-[314px] xl:w-[314px]'
              height='h-[85px]'
            /> */}
            {/* Add more ActionCards here */}
          </div>

        </div>
        <div className='mt-6'>
         <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center gap-5 relative'>
                  <h1 className={`${fontSize['2xl']} ${fontWeight.semibold} ${textColor.primary}`}>
                    Transaction History
                  </h1>
        
                  {/* Filter Icon */}
                  <img
                    src={FilterIcon}
                    alt="filter icon"
                    className='cursor-pointer '
                    onClick={() => setOpen(!open)}
                  />
        
                  {/* Dropdown */}
                  {open && (
                    <div className='absolute top-10 right-0 bg-white shadow-lg border border-gray-200 rounded-lg w-40 z-50'>
                      <ul className='flex flex-col'>
                        <li className='px-4 py-3 hover:bg-gray-100 cursor-pointer '>
                          Interest
                        </li>
        
                        <li className='px-4 py-3 hover:bg-gray-100 cursor-pointer '>
                          Withdraw
                        </li>
        
                        <li className='px-4 py-3 hover:bg-gray-100 cursor-pointer'>
                          Received
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
        
                <div>
                  <Link to="/wallet-see-all">
                        <p className={`${fontSize.lg} ${fontWeight.normal} ${textColor.red}`}>
                          See all
                        </p>
                  </Link>
                </div>
              </div>
          <TransactionList/>
        </div>
      </Wrapper>
    </div>
  )
}

export default Wallet