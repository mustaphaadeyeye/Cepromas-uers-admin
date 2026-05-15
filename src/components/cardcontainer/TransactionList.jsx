import React, { useState } from 'react'
import ListIcon from "../../assets/icons/Vector.png"
import FilterIcon from "../../assets/icons/filter.png"

import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";

const transactions = [
  { id: '109928765412678', type: 'Interest', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412679', type: 'Withdraw', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412680', type: 'Received', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412680', type: 'Received', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412680', type: 'Received', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412680', type: 'Received', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412680', type: 'Received', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
]

const TransactionRow = ({ type, amount, date, id, status }) => {
  return (
    <div
      className='
        flex items-center justify-between
        px-4 py-3
        border border-gray-100
        rounded-xl
        bg-white
      '
    >
      {/* Icon */}
      <div className='bg-[#FEFAA2] rounded-lg p-2 w-9 h-9 flex items-center justify-center shrink-0'>
        <img src={ListIcon} alt="list icon" />
      </div>

      <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-30`}>
        {type}
      </span>

      <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-30`}>
        {amount}
      </span>

      <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-50`}>
        {date}
      </span>

      <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-40`}>
        {id}
      </span>

      <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main}`}>
        {status}
      </span>
    </div>
  )
}

const TransactionList = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={`${fontFamily.main}`}>
      

      <div className='flex flex-col gap-2 w-full'>
        {transactions.map((tx) => (
          <TransactionRow
            key={tx.id}
            type={tx.type}
            amount={tx.amount}
            date={tx.date}
            id={tx.id}
            status={tx.status}
          />
        ))}
      </div>
    </div>
  )
}

export default TransactionList