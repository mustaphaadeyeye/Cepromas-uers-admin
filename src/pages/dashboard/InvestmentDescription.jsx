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
import Arrowdown from "../../assets/icons/caretDown.jpg"
import ActionCard from '../../components/cardcontainer/ActionCard'
import Calenderimg from "../../assets/icons/Calendar.png"
import trendUp from "../../assets/icons/TrendUp.png"
import MapIcon from "../../assets/icons/MapTrifold.png"
import BadgeButton from '../../components/buttons/BadgeButton'
import Button from "../../components/buttons/Button";
import HeadIcon from "../../assets/icons/Headset.png"
import { Link } from 'react-router-dom'
import Cardbg from '../../components/cardcontainer/Cardbg'
import InvestmentModal from '../../components/modals/InvestmentModal'





const packages = [
  { label: 'N50,000', value: 50000 },
  { label: 'N100,000', value: 100000 },
  { label: 'N200,000', value: 200000 },
  { label: 'N500,000', value: 500000 },
]
const durations = ['6 months', '12 months', '24 months']

const InvestmentDescription = () => {
  const [selectedPackage, setSelectedPackage] = useState(packages[0])
  const [selectedDuration, setSelectedDuration] = useState('6 months')
  const [open, setOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [durationOpen, setDurationOpen] = useState(false)


  
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
               <div className='flex items-center gap-3 relative'>
  <h1 className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>
    Investment Duration:
  </h1>

  <button
    onClick={() => setDurationOpen(!durationOpen)}
    className='flex items-center gap-1 cursor-pointer hover:opacity-80 transition'
  >
    <span className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>
      {selectedDuration}
    </span>
    <svg
      width="16" height="16" viewBox="0 0 24 24" fill="none"
      className={`transition duration-200 ${durationOpen ? 'rotate-180' : ''} w-5 h-5`}
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>

  {/* Dropdown */}
  {durationOpen && (
    <div className='absolute top-full left-32 mt-1 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden min-w-35'>
      {durations.map((d) => (
        <button
          key={d}
          onClick={() => {
            setSelectedDuration(d)
            setDurationOpen(false)
          }}
          className={`
            w-full px-4 py-2.5 text-left
            transition duration-200 hover:bg-gray-50
            ${fontSize.sm} ${fontFamily.main}
            ${selectedDuration === d
              ? `${fontWeight.medium} ${textColor.primary} bg-gray-50`
              : `${fontWeight.normal} ${textColor.secondary}`
            }
          `}
        >
          {d}
        </button>
      ))}
    </div>
  )}
          </div>
          {/* buttons */}
            <div className='flex items-center gap-3'>
              <BadgeButton icon={Calenderimg} label="6 months" />
              <BadgeButton icon={trendUp} label="12% ROI" />
                <BadgeButton icon={MapIcon} label="lagos" />
            </div>

            {/* details */}
            <div className="w-125">
              <p className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary}`}>
                Lorem ipsum dolor sit amet consectetur. Eu semper enim aliquam 
                consequat ac consectetur aliquet et pellentesque. Pulvinar mollis 
                aliquam non lectus molestie et. Velit accumsan nullam luctus et 
                massa rhoncus eget malesuada. Sit urna viverra pretium faucibus 
                id pulvinar. Nibh blandit et lacus eget non. Sollicitudin metus 
                aenean nibh gravida. Cras eget tristique aliquet in mattis. Faucibus 
                massa ipsum convallis at maecenas nulla. Dictumst nulla gravida est quam mauris faucibus 
                viverra sit. Nulla quam suspendisse sed eleifend aenean tempor.
              </p>
            </div>

        {/* flex button */}
          <div className='flex iitems-center gap-5'>
            <Button text = "Invest Now" 
              width = "w-[354px]"
              bg='bg-[#05062F]'
              className={`text-white ${fontSize.lg} ${fontWeight.normal} ${fontFamily.main} rounded-lg px-6 py-3 hover:bg-[#1a2352] transition`}
               onClick={() => setModalOpen(true)}
            />
          <Link to="/contact">
            <BadgeButton icon={HeadIcon}  label="Ask a Question" />
          </Link>
          </div>
          {/* investment modal */}
          <InvestmentModal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  onConfirm={() => {
    
    setModalOpen(false)
  }}
  title="Investment Details"
  subtitle="Confirm investment details before you proceed"
  cancelText="Cancel"
  confirmText="Confirm"
  details={[
    { label: 'Amount',        value: `₦${selectedPackage.value.toLocaleString()}` },
    { label: 'Duration',      value: selectedDuration },
    { label: 'Interest',      value: '30% ROI'    },
    { label: 'Location',      value: 'Lagos'      },
    { label: 'Tax',           value: '5%'         },
    { label: 'Total Payback', value: '₦65,000'    },
    { label: 'Maturity Date', value: '10/09/2026' },
  ]}
/>
        <div>
          <Link to="/terms">
            <p className={`${textColor.primary} underline ${fontSize.sm} ${fontWeight.light} ${fontFamily.main}`}>
              Read Terms & Condition
            </p>
          </Link>
          </div> 
          </div>
        </div>

        <div>
          <h1 className={`${fontSize["2xl"]} ${fontWeight.semibold} ${fontFamily.main} ${textColor.primary} mt-3`}>
            Related Investments
          </h1>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5 lg:gap-6 xl:gap-6 mt-3">
              <Cardbg />
              <Cardbg />
              <Cardbg />
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

export default InvestmentDescription