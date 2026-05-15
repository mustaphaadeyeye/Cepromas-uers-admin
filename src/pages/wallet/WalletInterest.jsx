import React, { useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import TransactionList from '../../components/cardcontainer/TransactionList'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import FilterIcon from "../../assets/icons/filter.png"
import Pagination from '../../components/buttons/Pagination';
import { Link, Links } from 'react-router-dom'


const WalletInterest = () => {
     const [open, setOpen] = useState(false)
  return (
    <div>
        <Wrapper>
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
                <div className='mt-6'>
                  <Pagination currentPage={1} totalPages={2} onPageChange={(page) => console.log("Page changed to:", page)} />
                </div>
        </Wrapper>
    </div>
  )
}

export default WalletInterest