import React, { useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import ProfileImg from '../../assets/image/profile.png' 
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import TransferIcon from "../../assets/icons/transfericon.png"
import PersonalIcon from '../../assets/icons/UserCircle.png'   
import ReferralIcon from '../../assets/icons/UsersFour.png'
import SecurityIcon from '../../assets/icons/Keyhole.png'
import HouseIcon from '../../assets/icons/House.png'
import ContactIcon from '../../assets/icons/PhoneCall.png'
import LogoutIcon from '../../assets/icons/SignOut.png'
import EditIcon from '../../assets/icons/PencilSimpleLine.png'
import InviteCode from './InviteCode'
import LoginPwdIcon from '../../assets/icons/LoginPwd.png'
import SettingsModal from '../../components/modals/SettingsModal'
import SecurityBgIcon from "../../assets/icons/securityicon.png"
import ContactChat from '../../components/chatandconditions/ContactChat'
import Pagination from "../../components/buttons/Pagination"
import Button from '../../components/buttons/Button';


const menuItems = [
  { id: 'personal',    label: 'Personal Information', icon: PersonalIcon },
  { id: 'properties',  label: 'Managed Properties',   icon: HouseIcon    },
  { id: 'referrals',   label: 'Referrals',             icon: ReferralIcon },
  { id: 'security',    label: 'Security',              icon: SecurityIcon },
  { id: 'contact',     label: 'Contact Us',            icon: ContactIcon  },
  { id: 'logout',      label: 'Logout',                icon: LogoutIcon   },
]

const securityItems = [
  { label: 'Login Password',  sub: 'Change your login password', icon: LoginPwdIcon },
  { label: 'Transaction Pin', sub: 'Set transaction pin',        icon: LoginPwdIcon },
]

const personalFields = [
  { label: 'Full Name',    value: 'John Abraham'                  },
  { label: 'Email',        value: 'johnabraham@gmail.com'         },
  { label: 'Phone Number', value: '+1-123-456-7890'               },
  { label: 'Address',      value: '123 Main St, Springfield, USA' },
  { label: 'Occupation',   value: 'Software Engineer'             },
   { label: 'Nin',            value: '123456789'             },
]

const properties = [
  {
    id: 1,
    title: 'Luxury Apartments',
    location: 'Lagos',
    amount: '₦55,000',
    date: 'January 31st, 2025',
    roi: '30%',
    duration: '9 months',
    interestEarned: '₦20,000',
    transactionId: '109928765412678',
    rawDate: '10/09/2025',
  },
  {
    id: 2,
    title: 'Luxury Apartments',
    location: 'Lagos',
    amount: '₦55,000',
    date: 'January 31st, 2025',
    roi: '30%',
    duration: '9 months',
    interestEarned: '₦20,000',
    transactionId: '109928765412679',
    rawDate: '10/09/2025',
  },
]

// Personal Information 
const PersonalInformation = () => {
  const [editField, setEditField] = useState(null)

  return (
    <div className='flex flex-col gap-5'>
      <div className='flex flex-col items-center gap-2 mb-2'>
        <div className='relative'>
          <img src={ProfileImg} alt='profile' className='w-50 h-50 rounded-full object-cover' />
          <button className='absolute bottom-5 right-10 bg-gray-200 rounded-full p-1 shadow'>
            <img src={EditIcon} alt='edit' className='w-3.5 h-3.5' />
          </button>
        </div>
        <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
          John Abraham
        </span>
      </div>

      {personalFields.map((field) => (
        <div key={field.label} className='flex items-start justify-between border-b border-gray-100 pb-4'>
          <div className='flex flex-col gap-1'>
            <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
              {field.label}
            </span>
            <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}>
              {field.value}
            </span>
          </div>
          <button
            onClick={() => setEditField(field)}
            className='p-2 rounded-full bg-gray-100 transition cursor-pointer'
          >
            <img src={EditIcon} alt='edit' className='w-4 h-4' />
          </button>
        </div>
      ))}

      {editField && (
        <SettingsModal
          type='details'
          field={editField.label}
          value={editField.value}
          onClose={() => setEditField(null)}
        />
      )}
      <div className='flex justify-center mt-10'>
        <Button
          text="Save"
          bg="bg-[#05062F]"
          width="w-[330px]"
          height="h-[50px]"
          rounded="rounded-[10px]"
          className={`
           text-white
            ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}
          `}
        />
      </div>
    </div>
  )
}

//  Managed Properties 
const ManagedProperties = () => {
  const [selectedItem, setSelectedItem] = useState(null)

  return (
    <div className='flex flex-col gap-5 py-5'>
      <p className={`${fontSize.lg} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
        Bought Properties
      </p>

      <div className='flex flex-col gap-4'>
        {properties.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className='bg-white rounded-[10px] shadow border-[0.2px] border-[#CCCCCCB2] p-5 flex flex-col gap-4 cursor-pointer hover:shadow-md transition duration-200'
          >
            <p className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
              {item.title}
            </p>

            <div className='flex items-start justify-between'>
              <div className='flex flex-col gap-1'>
                <p className={`${fontSize.xs} ${fontWeight.medium} ${textColor.secondary} ${fontFamily.main}`}>
                  Location
                </p>
                <p className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                  {item.location}
                </p>
              </div>
              <div className='flex flex-col gap-1 text-right'>
                <p className={`${fontSize.xs} ${fontWeight.medium} ${textColor.secondary} ${fontFamily.main}`}>
                  Purchase Amount
                </p>
                <p className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                  {item.amount}
                </p>
              </div>
            </div>

            <div className='border-t border-gray-100' />

            <div className='flex items-center gap-2'>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="4" width="18" height="18" rx="2" stroke="#888" strokeWidth="1.8"/>
                <path d="M16 2v4M8 2v4M3 10h18" stroke="#888" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <p className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}>
                Date Purchased: {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div>
        <Pagination
          currentPage={1}
          totalPages={3}
          onPageChange={(page) => console.log('Go to page:', page)}
        />
      </div>

      {selectedItem && (
        <SettingsModal
          type='property'
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  )
}

// Referrals 
const Referrals = () => (
  <div>
    <div className='flex justify-center items-center flex-col'>
      <div
        style={{ background: 'linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)' }}
        className="rounded-md p-5 md:p-10 w-full xl:w-160 h-40"
      >
        <div className='flex items-center justify-between'>
          <h1 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.white} ${fontFamily.main}`}>
            Reward Balance
          </h1>
          <h1 className={`${fontSize['4xl']} ${fontWeight.medium} ${textColor.white} ${fontFamily.main}`}>
            4
          </h1>
        </div>
        <div className='flex items-center justify-between'>
          <p className={`${fontSize["4xl"]} ${fontWeight.medium} ${textColor.white} ${fontFamily.main} mt-2`}>
            ₦20,000
          </p>
          <p className={`${fontSize.sm} ${fontWeight.normal} ${textColor.white} ${fontFamily.main} mt-2`}>
            Referrals
          </p>
        </div>
      </div>
    </div>
 
    <div className='px-4 mt-8'>
      <p className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main}`}>Invite and Earn</p>
      <p className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary} mt-1`}>
        Mauris adipiscing aliquam tristique integer adipiscing aliqu 
        Mauris adipiscing aliquam tristique integer adipiscing aliquam
      </p>
    </div>
 
    <div className='flex justify-center my-8'>
      <img src={TransferIcon} alt="" />
    </div>
 
    <div className='flex justify-center my-2'>
      <InviteCode code='jshetsnbff' />
    </div>
  </div>
)

//  Security 
const Security = () => {
  const [securityModal, setSecurityModal] = useState(null)

  return (
    <div className='flex flex-col gap-5 xl:px-12 lg:px-8 md:px-4 px-2'>
      {securityItems.map((item) => (
        <div key={item.label} className='flex items-center justify-between border-b border-gray-100 pb-4'>
          <div className='flex flex-col gap-1'>
            <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
              {item.label}
            </span>
            <span className={`${fontSize.xs} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}>
              {item.sub}
            </span>
          </div>
          <button
            onClick={() => setSecurityModal(item.label)}
            className='p-2 rounded-lg transition cursor-pointer'
          >
            <img src={item.icon} alt={item.label} />
          </button>
        </div>
      ))}

      <div className='flex justify-center mt-10 opacity-10'>
        <img src={SecurityBgIcon} alt='security' className='mt-10' />
      </div>

      {securityModal === 'Login Password' && (
        <SettingsModal type='password' onClose={() => setSecurityModal(null)} />
      )}
      {securityModal === 'Transaction Pin' && (
        <SettingsModal type='pin' onClose={() => setSecurityModal(null)} />
      )}
    </div>
  )
}

// Contact Us
const ContactUs = () => (
  <div className='flex flex-col h-full'>
    <ContactChat variant='settings' />
  </div>
)

// Content map 
const contentMap = {
  personal:   <PersonalInformation />,
  properties: <ManagedProperties />,
  referrals:  <Referrals />,
  security:   <Security />,
  contact:    <ContactUs />,
  logout:     null,
}

// Main Layout 
const SettingsLayout = () => {
  const [active, setActive] = useState('personal')
  // Drives the mobile drill-down: false = menu list screen, true = detail screen for `active`
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const handleMenu = (id) => {
    if (id === 'logout') {
      setShowLogout(true)
      return
    }
    setActive(id)
    setMobileDetailOpen(true)
  }

  const handleConfirmLogout = () => {
    setShowLogout(false)
    console.log('logged out')
  }

  const activeItem = menuItems.find((item) => item.id === active)

  return (
    <div>
      <Wrapper>

        {/*  MOBILE / TABLET   */}
        <div className='lg:hidden'>

          {!mobileDetailOpen ? (
            /* Menu list screen */
            <div className='flex flex-col gap-6'>
              <div className='flex flex-col items-center gap-2 mt-2'>
                <img src={ProfileImg} alt='profile' className='w-28 h-28 rounded-full object-cover' />
                <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                  John Abraham
                </span>
              </div>

              <div className='flex flex-col gap-6'>
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenu(item.id)}
                    className='flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm text-left transition hover:bg-gray-50 cursor-pointer'
                  >
                    <img src={item.icon} alt={item.label} className='w-5 h-5 shrink-0' />
                    <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}>
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Detail screen for the selected menu item */
            <div className='flex flex-col gap-6'>
              <div className='flex items-center gap-3'>
                <button
                  onClick={() => setMobileDetailOpen(false)}
                  className='p-1 rounded-full hover:bg-gray-100 transition cursor-pointer'
                  aria-label='Back'
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M15 18l-6-6 6-6" stroke="#05062F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                  {activeItem?.label}
                </span>
              </div>

              <div className='bg-white rounded-2xl p-5 flex-1 flex flex-col'>
                {contentMap[active]}
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP (lg and up)*/}
        <div className='hidden lg:flex gap-6 items-stretch'>

          {/* Left panel */}
          <div className='flex w-100 shrink-0 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl p-5 flex-col items-center gap-6'>
            <div className='flex flex-col items-center gap-2'>
              <div className='relative'>
                <img src={ProfileImg} alt='profile' className='w-50 h-50 rounded-full object-cover' />
                <button className='absolute bottom-5 right-10 bg-white rounded-full p-1 shadow'>
                  <img src={EditIcon} alt='edit' className='w-3.5 h-3.5' />
                </button>
              </div>
              <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                John Abraham
              </span>
            </div>

            <div className='w-full flex flex-col gap-6'>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenu(item.id)}
                  className={`
                    flex items-center gap-3 px-4 py-5 w-full text-left
                    transition duration-200 whitespace-nowrap
                    shadow-sm rounded-xl cursor-pointer
                    ${active === item.id ? 'bg-[#DBE8FD]' : 'bg-white hover:bg-gray-50'}
                  `}
                >
                  <img src={item.icon} alt={item.label} className='w-5 h-5 shrink-0' />
                  <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className={`flex-1 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl px-20 py-5 flex flex-col gap-6 ${fontFamily.main} h-full`}>
            <div className='flex-1 flex flex-col h-full'>
              {contentMap[active]}
            </div>
          </div>

        </div>

        {/* Logout modal */}
        {showLogout && (
          <SettingsModal
            type='logout'
            onClose={() => setShowLogout(false)}
            onConfirmLogout={handleConfirmLogout}
          />
        )}
      </Wrapper>
    </div>
  )
}

export default SettingsLayout