import React, { useEffect, useState } from 'react'
import Button from "../buttons/Button"
import { fontSize, fontWeight, fontFamily, textColor } from "../../components/styles/theme"

const InvestmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Investment Details',
  subtitle = 'Confirm investment details before you proceed',
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  details = [],
}) => {
  const [success, setSuccess] = useState(false)   

  // reset success state every time modal opens
  useEffect(() => {
    if (isOpen) setSuccess(false)
  }, [isOpen])

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (isOpen) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 ${fontFamily.main}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className='bg-white w-full max-w-95 rounded-[20px] p-8 flex flex-col gap-5 relative'>

        {/* Close */}
        <button
          onClick={onClose}
          className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition cursor-pointer text-sm'
          aria-label="Close"
        >
          ✕
        </button>

        {!success ? (
          
          <>
            <div className='text-center flex flex-col gap-1.5'>
              <h2 className='text-[20px] font-bold text-[#05062F]'>{title}</h2>
              <p className='text-sm text-gray-400'>{subtitle}</p>
            </div>

            <div className='flex flex-col px-10'>
              {details.map((item, i) => (
                <div key={i} className='flex justify-between items-center py-3 '>
                  <span className={`${fontSize.sm} ${fontWeight.light} ${textColor.primary}`}>{item.label}</span>
                  <span className={`${fontSize.sm} ${fontWeight.light} ${textColor.primary}`}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className='flex items-center gap-3 mt-1'>
              <Button
                text={cancelText}
                onClick={onClose}
                width='w-full'
                bg='bg-transparent'
                className='border border-gray-200 text-[#05062F] rounded-md py-3 hover:bg-gray-50 transition'
              />
              <Button
                text={confirmText}
                onClick={() => setSuccess(true)}   
                width='w-full'
                bg='bg-[#05062F]'
                className='text-white rounded-md py-3 hover:bg-[#1a2352] transition'
              />
            </div>
          </>
        ) : (
          // ── SUCCESS VIEW ──
          <>
            <div className='text-center flex flex-col items-center gap-3'>
              
              <h2 className='text-[20px] font-bold text-[#05062F]'>🎉Investment Successful!</h2>
              <p className='text-sm text-gray-400'>Your investment has been processed successfully.</p>
            </div>

            <div className='flex flex-col px-10'>
              {details.map((item, i) => (
                <div key={i} className='flex justify-between items-center py-3 '>
                  <span className={`${fontSize.sm} ${fontWeight.light} ${textColor.primary}`}>{item.label}</span>
                  <span className={`${fontSize.sm} ${fontWeight.light} ${textColor.primary}`}>{item.value}</span>
                </div>
              ))}
            </div>

            <Button
              text="Done"
              onClick={onClose}
              width='w-full'
              bg='bg-[#05062F]'
              className='text-white rounded-md py-3 hover:bg-[#1a2352] transition'
            />
          </>
        )}

      </div>
    </div>
  )
}

export default InvestmentModal