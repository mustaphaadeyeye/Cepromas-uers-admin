import React from 'react'
import ListIcon from "../../assets/icons/Vector.png"
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  textDecoration,
  letterSpacing,
  bgColor,
} from "../../components/styles/theme";

const transactions = [
  { id: '109928765412678', type: 'Interest', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412679', type: 'Interest', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412680', type: 'Interest', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412681', type: 'Interest', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412682', type: 'Interest', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
  { id: '109928765412683', type: 'Interest', amount: '₦50,000', date: '17:31:02 - 10/09/2025', status: 'Successful' },
]

const TransactionRow = ({ type, amount, date, id, status }) => {
  return (
    <div className='
      flex items-center justify-between
      px-4 py-3
      border border-gray-100
      rounded-xl
      bg-white
    '>
      {/* Icon */}
      <div className='bg-[#FEFAA2] rounded-lg p-2 w-9 h-9 flex items-center justify-center shrink-0'>
       <img src={ListIcon} alt="list icon" clas />
      </div>

      {/* Type */}
      <span className={`
        ${textColor.primary}
        ${fontSize.base}
        ${fontWeight.normal}
        ${fontFamily.main}
        w-[120px]
      `}>
        {type}
      </span>

      {/* Amount */}
      <span className={`
        ${textColor.primary}
        ${fontSize.base}
        ${fontWeight.normal}
        ${fontFamily.main}
        w-[120px]
      `}>
        {amount}
      </span>

      {/* Date */}
      <span className={`
       ${textColor.primary}
        ${fontSize.base}
        ${fontWeight.normal}
        ${fontFamily.main}
        w-[200px]
      `}>
        {date}
      </span>

      {/* ID */}
      <span className={`
        ${textColor.primary}
        ${fontSize.base}
        ${fontWeight.normal}
        ${fontFamily.main}
        w-[160px]
      `}>
        {id}
      </span>

      {/* Status */}
      <span className={`
        ${textColor.primary}
        ${fontSize.base}
        ${fontWeight.normal}
        ${fontFamily.main}
       
      `}>
        {status}
      </span>
    </div>
  )
}

const TransactionList = () => {
  return (
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
  )
}

export default TransactionList