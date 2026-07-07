import React, { useState } from 'react'
import MarketCard from './MarketCard'
import Bgimg from "../../assets/image/newdash.png"
import Bgimg2 from "../../assets/image/shop.png"
import Bgimg3 from "../../assets/image/land.png"
import Bgimg4 from "../../assets/image/Hostel.png"
import Bgimg5 from "../../assets/image/warehouse.png"
import Bgimg6 from "../../assets/image/eventcenter.png"
import { fontSize, fontWeight, fontFamily, textColor } from "../../components/styles/theme";

export const TABS = ['Apartment', 'Lands', 'Shops', 'Hostels', 'Warehouses', 'Event Centers']

const LISTINGS = {
  Apartment: Array.from({ length: 6 }, (_, i) => ({
    image: Bgimg,
    title: 'Luxury 3-Bedroom Apartment',
    location: 'Ajah, Lagos Coastal Area',
    details: '3 Bedrooms, 3 Bathrooms, 250 sqm, Parking Available',
    price: 'N50,000',
    key: `apartment-${i}`,
  })),
  Lands: Array.from({ length: 6 }, (_, i) => ({
    image: Bgimg3,
    title: 'Prime Residential Land',
    location: 'Sangotedo, Lagos',
    details: '500 sqm, Dry Land, C of O Available',
    price: 'N15,000,000',
    key: `land-${i}`,
  })),
  Shops: Array.from({ length: 6 }, (_, i) => ({
    image: Bgimg2,
    title: 'Corner Shop Space',
    location: 'Ikeja, Lagos',
    details: '40 sqm, Ground Floor, High Foot Traffic',
    price: 'N800,000',
    key: `shop-${i}`,
  })),
  Hostels: Array.from({ length: 6 }, (_, i) => ({
    image: Bgimg4,
    title: 'Student Hostel Room',
    location: 'Yaba, Lagos',
    details: 'Self-Contained, Shared Facilities, 24/7 Power',
    price: 'N250,000',
    key: `hostel-${i}`,
  })),
  Warehouses: Array.from({ length: 6 }, (_, i) => ({
    image: Bgimg5,
    title: 'Industrial Warehouse',
    location: 'Ikorodu, Lagos',
    details: '1200 sqm, Loading Bay, 24hr Security',
    price: 'N120,000,000',
    key: `warehouse-${i}`,
  })),
  'Event Centers': Array.from({ length: 6 }, (_, i) => ({
    image: Bgimg6,
    title: 'Grand Event Hall',
    location: 'Lekki, Lagos',
    details: 'Capacity 500, Parking, Generator Backup',
    price: 'N5,000,000',
    key: `event-${i}`,
  })),
}

const MarketPlaceTab = ({ activeTab: activeTabProp, setActiveTab: setActiveTabProp, hideTabsOnMobile = false }) => {
  const [internalTab, setInternalTab] = useState('Apartment')
  const activeTab = activeTabProp ?? internalTab
  const setActiveTab = setActiveTabProp ?? setInternalTab
  const listings = LISTINGS[activeTab] || []

  return (
    <div className={`w-full ${fontFamily.main}`}>
      <div
        className={`${hideTabsOnMobile ? "hidden md:flex" : "flex"} justify-start md:justify-center gap-6 md:gap-30 px-4 overflow-x-auto md:overflow-visible scrollbar-hide`}
      >
        {TABS.map((tab) => {
          const isActive = tab === activeTab
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative py-4 text-sm whitespace-nowrap shrink-0 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 cursor-pointer focus-visible:ring-gray-400 rounded-sm ${
                isActive
                  ? 'font-semibold text-gray-900'
                  : 'font-normal text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2 px-4">
        {listings.map(({ key, ...item }) => (
          <MarketCard key={key} {...item} />
        ))}
      </div>
    </div>
  )
}

export default MarketPlaceTab