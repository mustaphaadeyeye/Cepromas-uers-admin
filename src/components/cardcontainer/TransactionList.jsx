import React, { useState } from 'react'
import ListIcon from "../../assets/icons/Vector.png"
import { fontSize, fontWeight, textColor, fontFamily } from "../../components/styles/theme";

const transactions = [
  { id: '28912721635217891278', type: 'Interest', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891279', type: 'Withdraw', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891280', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891280', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891280', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
  { id: '28912721635217891280', type: 'Received', amount: '₦50,000', date: '12:12pm - 10/09/2025', status: 'Successful', receiver: 'John Abraham', accountNumber: '12345678901', bank: 'UBA' },
]

const TransactionRow = ({ type, amount, date, id, status, onClick }) => (
  <div onClick={onClick} className='flex items-center justify-between px-4 py-3 border border-gray-100 rounded-xl bg-white cursor-pointer hover:bg-gray-50 transition'>
    <div className='bg-[#FEFAA2] rounded-lg p-2 w-9 h-9 flex items-center justify-center shrink-0'>
      <img src={ListIcon} alt="list icon" />
    </div>
    <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-30`}>{type}</span>
    <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-30`}>{amount}</span>
    <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-50`}>{date}</span>
    <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} w-40`}>{id}</span>
    <span className={`${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main}`}>{status}</span>
  </div>
)
    // transaction modal
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

const TransactionList = () => {
  const [selectedTx, setSelectedTx] = useState(null)

  return (
    <div className={`${fontFamily.main}`}>
      <div className='flex flex-col gap-2 w-full'>
        {transactions.map((tx) => (
          <TransactionRow key={tx.id} {...tx} onClick={() => setSelectedTx(tx)} />
        ))}
      </div>

      {selectedTx && (
        <TransactionDetailsModal tx={selectedTx} onClose={() => setSelectedTx(null)} />
      )}
    </div>
  )
}

export default TransactionList