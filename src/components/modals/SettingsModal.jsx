import React, { useState } from 'react'
import { fontFamily, fontSize, fontWeight, textColor } from "../../components/styles/theme";
import Button from "../buttons/Button";

const SettingsModal = ({ onClose, field, value, type, item, onConfirmLogout }) => {
  const [pin, setPin] = useState(['', '', '', ''])
  const [confirmPin, setConfirmPin] = useState(['', '', '', ''])

  const handlePinChange = (val, index, setter, state) => {
    const updated = [...state]
    updated[index] = val.slice(-1)
    setter(updated)
  }

  const PinBoxes = ({ value, setter }) => (
    <div className='flex gap-3'>
      {value.map((v, i) => (
        <input
          key={i}
          type='password'
          maxLength={1}
          value={v}
          onChange={(e) => handlePinChange(e.target.value, i, setter, value)}
          className='w-[80px] h-14 border border-gray-200 rounded-lg text-center text-lg outline-none bg-gray-50'
        />
      ))}
    </div>
  )

  const propertyRows = item ? [
    { label: 'Amount',          value: item.amount         },
    { label: 'ROI',             value: item.roi            },
    { label: 'Duration',        value: item.duration       },
    { label: 'Interest Earned', value: item.interestEarned },
    { label: 'Transaction ID',  value: item.transactionId  },
    { label: 'Date:',           value: item.rawDate        },
  ] : []

  return (
    <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${fontFamily.main}`}>

      {/* Details modal */}
      {type === 'details' && (
        <div className="bg-white rounded-[20px] w-[420px] flex flex-col items-center relative shadow-xl p-8 gap-6">
          <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100">✕</button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Edit Details</h2>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-[#0f1c3f] font-medium">{field}</label>
            <input type="text" defaultValue={value} autoComplete='off' className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-400 w-full bg-gray-50" />
          </div>
          <Button onClick={onClose} text='Save' width='w-[257px]' height='h-[50px]' bg='bg-[#05062F]' className='text-white cursor-pointer rounded-lg font-semibold text-sm' />
        </div>
      )}

      {/* Password modal */}
      {type === 'password' && (
        <div className="bg-white rounded-[20px] w-[420px] flex flex-col items-center relative shadow-xl p-8 gap-6">
          <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100">✕</button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Edit Password</h2>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-[#0f1c3f] font-medium">New Password</label>
            <input type="password" placeholder="enter password" autoComplete='new-password' className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-400 w-full bg-gray-50" />
          </div>
          <Button onClick={onClose} text='Save' width='w-[257px]' height='h-[50px]' bg='bg-[#05062F]' className='text-white cursor-pointer rounded-lg font-semibold text-sm' />
        </div>
      )}

      {/* Pin modal */}
      {type === 'pin' && (
        <div className="bg-white rounded-[20px] w-[425px] flex flex-col items-center relative shadow-xl p-8 gap-6">
          <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100">✕</button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Edit Transaction Pin</h2>
          <input type="text" style={{ display: 'none' }} autoComplete='username' readOnly />
          <input type="password" style={{ display: 'none' }} autoComplete='current-password' readOnly />
          <div className="w-full flex flex-col gap-4">
            <div className='flex flex-col gap-2'>
              <label className="text-sm text-[#0f1c3f] font-medium">Transaction Pin</label>
              <PinBoxes value={pin} setter={setPin} />
            </div>
            <div className='flex flex-col gap-2'>
              <label className="text-sm text-[#0f1c3f] font-medium">Confirm Transaction Pin</label>
              <PinBoxes value={confirmPin} setter={setConfirmPin} />
            </div>
          </div>
          <Button onClick={onClose} text='Save' width='w-[257px]' height='h-[50px]' bg='bg-[#05062F]' className='text-white cursor-pointer rounded-lg font-semibold text-sm' />
        </div>
      )}

      {/* Property modal */}
      {type === 'property' && item && (
        <div className="bg-white rounded-[20px] w-[90%] max-w-[430px] flex flex-col relative shadow-xl p-8 gap-5">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100 transition">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="#888" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <p className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}>
            {item.title}
          </p>
          <div className='flex flex-col gap-4'>
            {propertyRows.map((row) => (
              <div key={row.label} className='flex items-center justify-between border-b border-gray-100 pb-3'>
                <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}>
                  {row.label}
                </p>
                <p className={`${fontSize.sm} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary}`}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logout modal */}
      {type === 'logout' && (
        <div className="bg-white rounded-[20px] w-[90%] max-w-[360px] flex flex-col items-center relative shadow-xl p-8 gap-5">
          <h2 className="text-xl font-bold text-[#0f1c3f]">Log Out?</h2>
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            Are you sure you want to log out of your account? You'll need to log in again to access your dashboard.
          </p>
          <div className="w-full flex flex-col items-center gap-3 mt-2">
            <Button
              onClick={onConfirmLogout}
              text='Logout'
              width='w-[257px]'
              height='h-[50px]'
              bg='bg-[#E02020]'
              className='text-white cursor-pointer rounded-xl font-semibold text-sm'
            />
            <Button
              onClick={onClose}
              text='Cancel'
              width='w-[257px]'
              height='h-[50px]'
              bg='bg-white'
              className='text-[#0f1c3f] cursor-pointer rounded-xl font-semibold text-sm border border-gray-200'
            />
          </div>
        </div>
      )}

    </div>
  )
}

export default SettingsModal