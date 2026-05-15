import React, { useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import TransactionList from '../../components/cardcontainer/TransactionList'
import Pagination from '../../components/buttons/Pagination';



const WalletSeeAll = () => {
  return (
    <div>
        <Wrapper>
            <div>
                <h1 className={`${fontSize['2xl']} ${fontWeight.semibold} ${textColor.primary}`}>Recent Earnings</h1>
                <div className='mt-5'>
                    <TransactionList/>
                </div>
                <div>
                    <Pagination currentPage={1} totalPages={2} onPageChange={(page) => console.log("Page changed to:", page)} />
                </div>
            </div>
        </Wrapper>
    </div>
  )
}

export default WalletSeeAll