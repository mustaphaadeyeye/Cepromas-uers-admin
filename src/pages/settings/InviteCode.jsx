import React, { useState } from 'react'
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme"

const InviteCode = ({ code = 'jshetsnbff' }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className='xl:w-160 w-full rounded-2xl border border-gray-200 overflow-hidden'>

      {/* Top section */}
      <div className='px-5 py-4 bg-white'>
        <p className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main} mb-1`}>
          Your Invite Code
        </p>
        <p className={`${fontSize.lg} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
          {code}
        </p>
      </div>

      {/* Copy button */}
      <button
        onClick={handleCopy}
        className='
          w-full bg-[#A0AEED] hover:bg-[#8B9FE8]
          py-4
          flex items-center justify-center gap-2
          transition duration-200
          cursor-pointer
        '
      >
        {/* Copy icon */}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <rect x="9" y="9" width="13" height="13" rx="2" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} text-white`}>
          {copied ? 'Copied!' : 'Copy'}
        </span>
      </button>

    </div>
  )
}

export default InviteCode