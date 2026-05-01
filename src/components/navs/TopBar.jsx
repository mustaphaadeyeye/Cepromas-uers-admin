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
  textColor,
  fontFamily,
} from "../styles/theme";

const navItems = [
  { label: "Dashboard", icon: DashImg, path: "/" },
  { label: "Wallet", icon: WalletIcon, path: "/wallet" },
  { label: "Favorites", icon: FavIcon, path: "/favorites" },
  { label: "Settings", icon: SettingIcon, path: "/settings" },
  { label: "Growth", icon: GrowthIcon, path: "/growth" },
];
const TopBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-md shadow-sm z-50">
      <Wrapper>

        <div className="h-18 flex items-center justify-between">

          {/* LEFT SIDE */}
          <div className="flex items-center xl:gap-14 lg:gap-7">

            {/* LOGO */}
            <div className="flex items-center">
              <img
                src={logoImg}
                alt="Logo"
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* NAV → ONLY LG & XL */}
            <nav className="hidden lg:flex items-center gap-6">
  {navItems.map((item, index) => (
    <NavLink
      key={index}
      to={item.path}
      className={({ isActive }) =>
        `
        flex items-center gap-2 cursor-pointer
        transition duration-200
        ${isActive ? "text-[#EC2614]" : "text-[#05062F]"}
      `
      }
    >
      <img src={item.icon} alt={item.label} className="w-5 h-5" />

      <span
        className={`
          ${fontSize.md}
          ${fontWeight.normal}
          ${fontFamily.main}
        `}
      >
        {item.label}
      </span>
    </NavLink>
  ))}
</nav>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-5">

            {/* SEARCH → ONLY LG & XL */}
            <div className="hidden lg:block w-60">
              <SearchInput />
            </div>

            {/* NOTIFICATION */}
            <div className="relative cursor-pointer">
              <img
                src={NotificationIcon}
                alt="Notifications"
                className="hover:scale-105 transition"
              />
            </div>

            <div>
                <img src={SarahImg} alt="Sarah John" className="w-10 h-10 rounded-full object-cover" />
            </div>

            {/* HAMBURGER → MD + SM ONLY */}
            <div className="lg:hidden">
              <button onClick={() => setOpen(!open)}>
                <div className="space-y-1">
                  <span className="block w-6 h-0.5 bg-[#05062F]"></span>
                  <span className="block w-6 h-0.5 bg-[#05062F]"></span>
                  <span className="block w-6 h-0.5 bg-[#05062F]"></span>
                </div>
              </button>
            </div>

          </div>
        </div>
      </Wrapper>

      {/* MOBILE + TABLET MENU */}
      {open && (
        <div className="lg:hidden bg-white shadow-md border-t border-gray-100 px-5 py-4 space-y-4">

          {navItems.map((item, index) => (
    <NavLink
      key={index}
      to={item.path}
      className={({ isActive }) =>
        `
        flex items-center gap-2 cursor-pointer
        transition duration-200
        ${isActive ? "text-[#EC2614]" : "text-[#05062F]"}
      `
      }
    >
      <img src={item.icon} alt={item.label} className="w-5 h-5" />

      <span
        className={`
          ${fontSize.md}
          ${fontWeight.normal}
          ${fontFamily.main}
        `}
      >
        {item.label}
      </span>
    </NavLink>
  ))}

          <div className="pt-3">
            <SearchInput />
          </div>

        </div>
      )}
    </header>
  );
};

export default TopBar;