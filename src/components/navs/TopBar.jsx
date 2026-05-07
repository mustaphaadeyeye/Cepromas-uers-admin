import React, { useState } from "react";
import Wrapper from "../wrapper/Wrapper";

import logoImg from "../../assets/image/realLogo.png";
import DashImg from "../../assets/icons/medash.png";
import WalletIcon from "../../assets/icons/Wallet.png";
import FavIcon from "../../assets/icons/faveicon.png";
import SettingIcon from "../../assets/icons/seticon.png";
import GrowthIcon from "../../assets/icons/groicon.png";
import SearchInput from "../inputs/SearchInput";
import NotificationIcon from "../../assets/icons/notIcon.png";
import { NavLink } from "react-router-dom";
import SarahImg from "../../assets/image/sarahjohn.png";

import {
  fontSize,
  fontWeight,
  fontFamily,
} from "../styles/theme";

const navItems = [
  { label: "Dashboard", icon: DashImg,     path: "/"          },
  { label: "Wallet",    icon: WalletIcon,  path: "/wallet"    },
  { label: "Favorites", icon: FavIcon,     path: "/favorites" },
  { label: "Settings",  icon: SettingIcon, path: "/settings"  },
  { label: "Growth",    icon: GrowthIcon,  path: "/growth"    },
];

const TopBar = () => {
  return (
    <>
      {/* ── TOP HEADER ── */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <Wrapper>
          <div className="h-18 flex items-center justify-between">

            {/* LEFT — Logo */}
            <div className="flex items-center xl:gap-14 lg:gap-7">
              <div className="flex items-center">
                <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" />
              </div>

              {/* NAV — desktop only */}
              <nav className="hidden lg:flex items-center gap-6">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    className={({ isActive }) => `
                      flex items-center gap-2 cursor-pointer transition duration-200
                      ${isActive ? "text-[#EC2614]" : "text-[#05062F]"}
                    `}
                  >
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                    <span className={`${fontSize.md} ${fontWeight.normal} ${fontFamily.main}`}>
                      {item.label}
                    </span>
                  </NavLink>
                ))}
              </nav>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">

              {/* Search — desktop only */}
              <div className="hidden lg:block w-60">
                <SearchInput />
              </div>

              {/* Notification — always visible */}
              <div className="relative cursor-pointer">
                <img
                  src={NotificationIcon}
                  alt="Notifications"
                  className="hover:scale-105 transition"
                />
              </div>

              {/* Profile image — always visible */}
              <img
                src={SarahImg}
                alt="Sarah John"
                className="w-9 h-9 rounded-full object-cover"
              />

            </div>
          </div>
        </Wrapper>
      </header>

      {/* ── BOTTOM NAV — mobile only ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center gap-1 py-1 px-3
                transition duration-200 cursor-pointer
                ${isActive ? "text-[#EC2614]" : "text-[#05062F]"}
              `}
            >
              <img
                src={item.icon}
                alt={item.label}
                className="w-6 h-6"
              />
              {/* <span className={`text-[10px] ${fontWeight.normal} ${fontFamily.main}`}>
                {item.label}
              </span> */}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── BOTTOM SPACER — pushes content above bottom nav on mobile ── */}
      <div className="lg:hidden h-16 md:h-16" />
    </>
  )
}

export default TopBar;