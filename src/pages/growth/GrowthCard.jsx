import React from 'react'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";

const GrowthCard = () => {
    const properties = [
  {
    id: 1,
    title: 'Ikoyi Residential Estate',
    location: '₦50,000',
    amount: '₦55,000',
    date: 'January 31st, 2025',
    roi: '30%',
    duration: '9 months',
    interestEarned: '₦20,000',
    transactionId: '109928765412678',
    rawDate: '10/09/2025',
  },
  {
    id: 2,
    title: 'Ikoyi Residential Estate',
    location: '₦50,000',
    amount: '₦55,000',
    date: 'January 31st, 2025',
    roi: '30%',
    duration: '9 months',
    interestEarned: '₦20,000',
    transactionId: '109928765412679',
    rawDate: '10/09/2025',
  },
    {
    id: 2,
    title: 'Ikoyi Residential Estate',
    location: '₦50,000',
    amount: '₦55,000',
    date: 'January 31st, 2025',
    roi: '30%',
    duration: '9 months',
    interestEarned: '₦20,000',
    transactionId: '109928765412679',
    rawDate: '10/09/2025',
  },
    {
    id: 2,
    title: 'Ikoyi Residential Estate',
    location: '₦50,000',
    amount: '₦55,000',
    date: 'January 31st, 2025',
    roi: '30%',
    duration: '9 months',
    interestEarned: '₦20,000',
    transactionId: '109928765412679',
    rawDate: '10/09/2025',
  },
    {
    id: 2,
    title: 'Ikoyi Residential Estate',
    location: '₦50,000',
    amount: '₦55,000',
    date: 'January 31st, 2025',
    roi: '30%',
    duration: '9 months',
    interestEarned: '₦20,000',
    transactionId: '109928765412679',
    rawDate: '10/09/2025',
  },
]
  return (
    <div>
         <div className='grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4'>
                {properties.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(item)}
                    className='bg-white rounded-[10px] shadow border-[0.2px] border-[#CCCCCCB2] p-5 flex flex-col gap-4 cursor-pointer hover:shadow-md transition duration-200'
                  >
                    <p className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                      {item.title}
                    </p>
        
                    <div className='flex items-start justify-between'>
                      <div className='flex flex-col gap-1'>
                        <p className={`${fontSize.xs} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                          Amount Invested
                        </p>
                        <p className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                          {item.location}
                        </p>
                      </div>
                      <div className='flex flex-col gap-1 text-right'>
                        <p className={`${fontSize.xs} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                         Total Payback
                        </p>
                        <p className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                          {item.amount}
                        </p>
                      </div>
                    </div>
        
                    <div className='border-t border-gray-100' />
        
                    <div className='flex items-center gap-2'>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="4" width="18" height="18" rx="2" stroke="#888" strokeWidth="1.8"/>
                        <path d="M16 2v4M8 2v4M3 10h18" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      <p className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}>
                        Date Purchased: {item.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
    </div>
  )
}

export default GrowthCard