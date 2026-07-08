import React, { useState } from 'react'
import ListIcon from "../../assets/icons/Vector.png"
import ArrowUp from "../../assets/icons/ArrowLineUp.png"
import ArrowDown from "../../assets/icons/ArrowLineDown.png"
import ArrowChart from "../../assets/icons/ChartLineUp.png"
import { fontSize, fontWeight, textColor, fontFamily } from "../../components/styles/theme";

const transactions = [
  { id: '28912721635217891278', type: 'Interest', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891279', type: 'Withdraw', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891280', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891281', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891282', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891283', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
]

// icon + background per transaction type
const typeConfig = {
  Withdraw: { icon: ArrowUp, bg: 'bg-[#E1FBC1]' },
  Interest: { icon: ArrowChart, bg: 'bg-[#FEFAA2]' },
  Received: { icon: ArrowDown, bg: 'bg-[#DBE8FD]' },
}

const TransactionRow = ({ type, amount, date, id, status, onClick }) => {
  const { icon, bg } = typeConfig[type] || { icon: ListIcon, bg: 'bg-[#FEFAA2]' }

  return (
    <div
      onClick={onClick}
      className='flex items-center justify-between gap-3 px-4 py-3 border border-gray-100 rounded-xl bg-white cursor-pointer hover:bg-gray-50 transition'
    >
      {/* Icon */}
      <div className={`${bg} rounded-lg p-2 w-9 h-9 flex items-center justify-center shrink-0`}>
        <img src={icon} alt={`${type} icon`} className="w-4 h-4" />
      </div>

      {/* Left group: type + date (stacked on mobile) */}
      <div className='flex flex-col sm:flex-row sm:items-center flex-1 min-w-0 gap-0.5 sm:gap-0'>
        <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.medium} sm:${fontWeight.normal} ${fontFamily.main} sm:w-30 truncate`}>
          {type}
        </span>
        <span className={`text-gray-500 sm:${textColor.primary} text-xs sm:${fontSize.base} ${fontWeight.normal} ${fontFamily.main} sm:w-50 truncate`}>
          {date}
        </span>
        <span className={`hidden sm:inline ${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} sm:w-40 truncate`}>
          {id}
        </span>
      </div>

      {/* Right group: amount + status (stacked, right-aligned on mobile) */}
      <div className='flex flex-col sm:flex-row sm:items-center items-end gap-0.5 sm:gap-4 shrink-0'>
        <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.medium} sm:${fontWeight.normal} ${fontFamily.main} sm:w-30 text-right sm:text-left whitespace-nowrap`}>
          {amount}
        </span>
        <span className={`text-gray-500 sm:${textColor.primary} text-xs sm:${fontSize.base} ${fontWeight.normal} ${fontFamily.main} whitespace-nowrap`}>
          {status}
        </span>
      </div>
    </div>
  )
}

const TransactionDetailsModal = ({ tx, onClose }) => {
  const [time, date] = tx.date.split(' - ')
  return (
    <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${fontFamily.main}`}>
      <div className="bg-white rounded-[20px] w-105 relative shadow-xl p-8">
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100">
          ✕
        </button>
        <h2 className="text-lg font-bold text-[#0f1c3f] mb-6">Transaction Details</h2>
        <div className="flex flex-col gap-4">
          {[
            { label: 'Receiver', value: tx.receiver },
            { label: 'Account Number', value: tx.accountNumber },
            { label: 'Bank', value: tx.bank },
            { label: 'Amount', value: tx.amount },
            { label: 'Transaction ID', value: tx.id },
            { label: 'Date:', value: date },
            { label: 'Time:', value: time },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[#0f1c3f] text-sm font-medium">{label}</span>
              <span className="text-gray-500 text-sm">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// filter prop lets parent (e.g. mobile tabs) filter by type; 'All' shows everything
const TransactionList = ({ filter = 'All' }) => {
  const [selectedTx, setSelectedTx] = useState(null)

  const filtered = filter === 'All'
    ? transactions
    : transactions.filter((tx) => tx.type === filter)

  return (
    <div className={`${fontFamily.main}`}>
      <div className='flex flex-col gap-2 w-full'>
        {filtered.map((tx, i) => (
          <TransactionRow key={`${tx.id}-${i}`} {...tx} onClick={() => setSelectedTx(tx)} />
        ))}
      </div>

      {selectedTx && (
        <TransactionDetailsModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
      )}
    </div>
  )
}

export default TransactionList