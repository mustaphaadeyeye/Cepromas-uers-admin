import React, { useState } from 'react'
import Wrapper from '../../components/wrapper/Wrapper'
import ProfileImg from '../../assets/image/profile.png' 
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
  textDecoration,
  letterSpacing,
  bgColor,
} from "../../components/styles/theme";
import TransferIcon from "../../assets/icons/transfericon.png"

import PersonalIcon from '../../assets/icons/UserCircle.png'   
import ReferralIcon from '../../assets/icons/UsersFour.png'
import SecurityIcon from '../../assets/icons/Keyhole.png'
import ContactIcon from '../../assets/icons/PhoneCall.png'
import LogoutIcon from '../../assets/icons/SignOut.png'
import EditIcon from '../../assets/icons/PencilSimpleLine.png'
import InviteCode from './InviteCode';





const menuItems = [
  { id: 'personal',  label: 'Personal Information', icon: PersonalIcon },
  { id: 'referrals', label: 'Referrals',             icon: ReferralIcon },
  { id: 'security',  label: 'Security',              icon: SecurityIcon },
  { id: 'contact',   label: 'Contact Us',            icon: ContactIcon  },
  { id: 'logout',    label: 'Logout',                icon: LogoutIcon   },
]

const personalFields = [
  { label: 'Full Name',    value: 'John Abraham'                  },
  { label: 'Email',        value: 'johnabraham@gmail.com'         },
  { label: 'Phone Number', value: '+1-123-456-7890'               },
  { label: 'Address',      value: '123 Main St, Springfield, USA' },
  { label: 'Occupation',   value: 'Software Engineer'             },
]

const PersonalInformation = () => (
  <div className='flex flex-col gap-5'>

    
    <div className='flex flex-col items-center gap-2 mb-2'>
      <div className='relative'>
        <img
          src={ProfileImg}
          alt='profile'
          className='w-50 h-50 rounded-full object-cover'
        />
        <button className='absolute bottom-5 right-10 bg-white rounded-full p-1 shadow'>
          <img src={EditIcon} alt='edit' className='w-3.5 h-3.5' />
        </button>
      </div>
      <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
        John Abraham
      </span>
    </div>

    {/* Fields */}
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
        <button className='p-2 rounded-lg hover:bg-gray-100 transition'>
          <img src={EditIcon} alt='edit' className='w-4 h-4' />
        </button>
      </div>
    ))}
  </div>
)

const Referrals = () => (

  <div>

  <div className='flex justify-center items-center flex-col'>
  <div
    style={{
        background: 'linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)',
      }}
      className="
        rounded-md
        p-5 md:p-10
        w-full xl:w-160
        h-40

        
      "
  >
    <h1 className={`${fontSize.lg} ${fontWeight.normal} ${textColor.white} ${fontFamily.main}`}>
      Reward Balance
    </h1>

    <p className={`${fontSize["4xl"]} ${fontWeight.semiboldbold} ${textColor.white} ${fontFamily.main} mt-2`}>
      ₦20,000
    </p>
  </div>

</div>
  <div className={`px-34 mt-8 `}>
    <p className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main}`}>Invite and Earn</p>
    <p className='mt-1'>
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

const Security = () => (
  <div className='flex flex-col gap-5'>
    {['Change Password', 'Two-Factor Authentication', 'Active Sessions'].map((item) => (
      <div key={item} className='flex items-center justify-between border-b border-gray-100 pb-4'>
        <span className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
          {item}
        </span>
        <button className='p-2 rounded-lg hover:bg-gray-100 transition'>
          <img src={EditIcon} alt='edit' className='w-4 h-4' />
        </button>
      </div>
    ))}
  </div>
)

const ContactUs = () => (
  <div className='flex flex-col gap-3'>
    <p className={`${fontSize.md} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}>
      Need help? Reach us at:
    </p>
    <p className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
      support@yourapp.com
    </p>
  </div>
)

const contentMap = {
  personal:  <PersonalInformation />,
  referrals: <Referrals />,
  security:  <Security />,
  contact:   <ContactUs />,
  logout:    null,
}

const SettingsLayout = () => {
  const [active, setActive] = useState('personal')

  const handleMenu = (id) => {
    if (id === 'logout') {
      console.log('logging out...')
      return
    }
    setActive(id)
  }

  return (
    <div>
      <Wrapper>
        <div className='flex gap-6 items-stretch'>

          {/* Left panel */}
          <div className='w-70 shrink-0 bg-white rounded-2xl p-5 flex flex-col items-center gap-6'>

            {/* Avatar */}
            <div className='flex flex-col items-center gap-2'>
              <div className='relative'>
                <img
                  src={ProfileImg}
                  alt='profile'
                  className='w-50 h-50 rounded-full object-cover'
                />
                <button className='absolute bottom-5 right-10 bg-white rounded-full p-1 shadow'>
                  <img src={EditIcon} alt='edit' className='w-3.5 h-3.5' />
                </button>
              </div>
              <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                John Abraham
              </span>
            </div>

            {/* Menu */}
            <div className='w-full flex flex-col gap-6 '>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenu(item.id)}
                  className={`
                    flex items-center gap-3 px-4 py-3  w-full text-left
                    transition duration-200 whitespace-nowrap
                    bg-[#FFFFFF] shadow-sm rounded-xl p-3 cursor-pointer
                    ${active === item.id ? 'bg-gray-100' : 'hover:bg-gray-50'}
                  `}
                >
                  <img src={item.icon} alt={item.label} className='w-4 h-4 shrink-0' />
                  <span className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}>
                    {item.label}
                  </span>
                </button>
              ))}
            </div>

          </div>

          {/* Right panel */}
          <div className={`flex-1 bg-white rounded-2xl p-6 flex flex-col gap-6 ${fontFamily.main}`}>

            {/* Avatar */}
            <div className='flex flex-col items-center gap-2'>
              <div className='relative'>
                {/* <img
                  src={ProfileImg}
                  alt='profile'
                  className='w-[200px] h-[200px] rounded-full object-cover'
                /> */}
                {/* <button className='absolute bottom-5 right-10 bg-white rounded-full p-1 shadow'>
                  <img src={EditIcon} alt='edit' className='w-3.5 h-3.5' />
                </button> */}
              </div>
              {/* <span className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}>
                John Abraham
              </span> */}
            </div>

            {/* Dynamic content */}
            <div>
              {contentMap[active]}
            </div>

          </div>

        </div>
      </Wrapper>
    </div>
  )
}

export default SettingsLayout