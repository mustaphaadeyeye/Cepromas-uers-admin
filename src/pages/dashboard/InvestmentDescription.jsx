import React, { useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import Investimg from "../../assets/image/meinvest.svg"
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
  bgColor,
} from "../../components/styles/theme"

const packages = [
  { label: 'N50,000', value: 50000 },
  { label: 'N100,000', value: 100000 },
  { label: 'N200,000', value: 200000 },
  { label: 'N500,000', value: 500000 },
]

const InvestmentDescription = () => {
  const [selectedPackage, setSelectedPackage] = useState(packages[0])
  const [selectedDuration, setSelectedDuration] = useState('6 months')
  const [open, setOpen] = useState(false)

  return (
    <div>
      <Wrapper>
        <div className='flex gap-4 items-start'>
          
          <div>
            <img src={Investimg} alt="Investment" />
          </div>

          {/* Details */}
          <div className='flex flex-col gap-5'>

            {/* Top row — Packages + Current Balance */}
            <div className='flex items-center gap-40'>

              {/* Package dropdown */}
              <div className='flex items-center gap-4'>
                <p className={`${fontSize["2xl"]} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>
                  Packages
                </p>

                <div className='relative'>
                  <button
                    onClick={() => setOpen(!open)}
                    className='flex items-center gap-1 cursor-pointer hover:opacity-80 transition'
                  >
                    <span className={`${fontSize["2xl"]} ${fontWeight.nomal} ${fontFamily.main} ${textColor.primary}`}>
                      {selectedPackage.label}
                    </span>

                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      className={`transition duration-200 ${open ? 'rotate-180' : ''}`}
                    >
                      <path
                        d="M6 9l6 6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  {open && (
                    <div className='absolute top-full mt-1 left-0 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden min-w-35'>
                      {packages.map((pkg) => (
                        <button
                          key={pkg.value}
                          onClick={() => {
                            setSelectedPackage(pkg)
                            setOpen(false)
                          }}
                          className={`
                            w-full px-4 py-2.5 text-left
                            transition duration-200 hover:bg-gray-50
                            ${fontSize.md} ${fontFamily.main}
                            ${selectedPackage.value === pkg.value
                              ? `${fontWeight.medium} ${textColor.primary} bg-gray-50`
                              : `${fontWeight.normal} ${textColor.secondary}`
                            }
                          `}
                        >
                          {pkg.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Current Balance */}
              <div className='ml-auto text-right'>
                <p className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} text-[#4169E1]`}>
                  Current Balance: ₦{selectedPackage.value.toLocaleString()}
                </p>
              </div>

            </div>

          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default InvestmentDescription