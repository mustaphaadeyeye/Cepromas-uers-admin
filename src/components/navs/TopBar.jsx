import React from "react";
import Wrapper from "../wrapper/Wrapper";

import logoImg from "../../assets/image/realLogo.png";
import DashImg from "../../assets/icons/myhouse.png";
import WalletIcon from "../../assets/icons/mywallet.svg";
import FavIcon from "../../assets/icons/myfave.png";
import SettingIcon from "../../assets/icons/myset.png";
import GrowthIcon from "../../assets/icons/mygro.png";
import SearchInput from "../inputs/SearchInput";
import NotificationIcon from "../../assets/icons/notIcon.png";
import { NavLink } from "react-router-dom";
import SarahImg from "../../assets/image/sarahjohn.png";
import ProfileImg from "../../assets/image/profile.png";
import { fontSize, fontWeight, fontFamily, textColor } from "../styles/theme";
import MyNotIcon from "../../assets/icons/mynoticon.png";

const navItems = [
  { label: "Dashboard", icon: DashImg,     path: "/"          },
  { label: "Wallet",    icon: WalletIcon,  path: "/wallet"    },
  { label: "Favorites", icon: FavIcon,     path: "/favorites" },
  { label: "Settings",  icon: SettingIcon, path: "/settings"  },
  { label: "Growth",    icon: GrowthIcon,  path: "/growth"    },
];

const activeFilter = 'invert(20%) sepia(90%) saturate(5000%) hue-rotate(355deg) brightness(90%)'

const TopBar = () => {
  return (
    <>
      {/* ── TOP HEADER ── */}
      <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
        <Wrapper>
          <div className="h-18 flex items-center justify-between">

            {/* LEFT — Logo + Desktop Nav */}
            <div className="flex items-center xl:gap-14 lg:gap-7">
              <div className="xl:flex xl:items-center lg:flex lg:items-center md:hidden hidden">
                <img src={logoImg} alt="Logo" className="h-10 w-auto object-contain" />
              </div>
              {/* mobile nav */}
               <div className="flex items-center gap-3 xl:hidden lg:hidden md:flex">
  <img
    src={ProfileImg}
    alt="Profile"
    className="h-10 w-10 rounded-full object-cover"
  />

  <div className="flex flex-col">
    <span className="text-base font-semibold text-gray-800">
      Hello John
    </span>

    <span className={`leading-tight w-[150px] ${fontWeight.light} ${fontSize.sm} ${fontFamily.main} ${textColor.primary} `}>
      Discover, invest, and own properties with ease.
    </span>
  </div>
</div>
              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6">
                {navItems.map((item, index) => (
                  <NavLink key={index} to={item.path}>
                    {({ isActive }) => (
                      <div className="flex items-center gap-2 cursor-pointer transition duration-200">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-[18px] h-[18px] transition duration-200"
                          style={{ filter: isActive ? activeFilter : 'none' }}
                        />
                        <span
                          className={`
                            ${fontSize.md} ${fontWeight.normal} ${fontFamily.main}
                            ${isActive ? 'text-[#EC2614]' : 'text-[#05062F]'}
                          `}
                        >
                          {item.label}
                        </span>
                      </div>
                    )}
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

              {/* Notification */}
              <div className="relative cursor-pointer ">
                <img
                  src={NotificationIcon}
                  alt="Notifications"
                  className="hover:scale-105 transition hidden lg:block"
                />
              </div>

              {/* Profile */}
              <img
                src={SarahImg}
                alt="Sarah John"
                className="w-9 h-9 rounded-full object-cover hidden lg:block"
              />
              <img
                src={MyNotIcon}
                alt="My Notifications"
                className="w-9 h-9 rounded-full object-cover block lg:hidden"
              />
            </div>
          </div>
        </Wrapper>
      </header>

      {/* ── BOTTOM NAV — mobile only ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item, index) => (
            <NavLink key={index} to={item.path}>
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1 py-1 px-3 cursor-pointer transition duration-200">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-6 h-6 transition duration-200"
                    style={{ filter: isActive ? activeFilter : 'none' }}
                  />
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* ── BOTTOM SPACER ── */}
      <div className="lg:hidden h-16" />
    </>
  )
}

export default TopBar;