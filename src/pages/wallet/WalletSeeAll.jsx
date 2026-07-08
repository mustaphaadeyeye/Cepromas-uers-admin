import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../../components/wrapper/Wrapper'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import TransactionList from '../../components/cardcontainer/TransactionList'
import Pagination from '../../components/buttons/Pagination';

const filters = ['All', 'Received', 'Withdraw', 'Interest']

const WalletSeeAll = () => {
  const navigate = useNavigate()
  const [activeFilter, setActiveFilter] = useState('All')

  return (
    <div>
        <Wrapper>
            <div>
                {/* Mobile header: back arrow + title */}
                <div className='flex md:hidden items-center gap-3 mb-4'>
                    <button onClick={() => navigate(-1)} className='cursor-pointer'>
                        <span className='text-xl'>←</span>
                    </button>
                    <h1 className={`${fontSize.lg} ${fontWeight.semibold} ${textColor.primary}`}>
                        Transaction History
                    </h1>
                </div>

                {/* Desktop header */}
                <h1 className={`hidden md:block ${fontSize['2xl']} ${fontWeight.semibold} ${textColor.primary}`}>
                    Recent Earnings
                </h1>

                {/* Mobile filter tabs */}
                <div className='flex md:hidden items-center gap-6 mt-4 overflow-x-auto'>
                    {filters.map((f) => (
                        <button
                            key={f}
                            onClick={() => setActiveFilter(f)}
                            className={`
                                px-4 py-2 rounded-[6px] text-sm whitespace-nowrap transition
                                ${fontFamily.main}
                                ${activeFilter === f
                                    ? 'bg-[#0f1c3f] text-white'
                                    : 'bg-gray-100 text-gray-500'}
                            `}
                        >
                            {f}
                        </button>
                    ))}
                </div>

                <div className='mt-5'>
                    <TransactionList filter={activeFilter} />
                </div>

                {/* Pagination shown on desktop; mobile relies on scroll per the design */}
                <div className='hidden md:block'>
                    <Pagination currentPage={1} totalPages={2} onPageChange={(page) => console.log("Page changed to:", page)} />
                </div>
            </div>
        </Wrapper>
    </div>
  )
}

export default WalletSeeAll