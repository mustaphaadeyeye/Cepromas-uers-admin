import React, { useState } from "react";
import Wrapper from "../wrapper/Wrapper";
import logoImg from "../../assets/icons/applogo.png";
import DashImg from "../../assets/icons/myhouse.png";
import WalletIcon from "../../assets/icons/mywallet.svg";
import SavedIcon from "../../assets/icons/newsavedicon.png";
import SettingIcon from "../../assets/icons/myset.png";
import GrowthIcon from "../../assets/icons/mygro.png";
// import SearchInput from "../inputs/SearchInput";
import NotificationIcon from "../../assets/icons/notIcon.png";
import { NavLink } from "react-router-dom";
import SarahImg from "../../assets/image/sarahjohn.png";
import ProfileImg from "../../assets/image/profile.png";
import { fontSize, fontWeight, fontFamily, textColor } from "../styles/theme";
import StoreIcon from "../../assets/icons/store.png"
import ChatIcon from "../../assets/icons/chaticon.png"
import { FiMenu, FiX } from "react-icons/fi";


const navItems = [
  { label: "Dashboard", icon: DashImg,     path: "/app",            end: true },
  { label: "Growth",    icon: GrowthIcon,  path: "/app/growth",     end: true },
  { label: "Market Place", icon: StoreIcon, path: "/app/market",    end: true },
  { label: "Investment", icon: GrowthIcon,  path: "/app/investment", end: true },
  { label: "Wallet",    icon: WalletIcon,  path: "/app/wallet",     end: true },
  { label: "Saved", icon: SavedIcon, path: "/app/saved",             end: true },
  { label: "Chat", icon: ChatIcon, path: "/app/chat",                end: true },
  { label: "Settings",  icon: SettingIcon, path: "/app/settings",   end: true },
];

// Mobile bottom nav only shows these 5 items, with "Dashboard" relabeled as "Home"
const bottomNavItems = [
  { label: "Home",     icon: DashImg,     path: "/app",           end: true },
  { label: "Growth",   icon: GrowthIcon,  path: "/app/growth",    end: true },
  { label: "Wallet",   icon: WalletIcon,  path: "/app/wallet",    end: true },
  { label: "Saved",    icon: SavedIcon,   path: "/app/saved",     end: true },
  { label: "Settings", icon: SettingIcon, path: "/app/settings",  end: true },
];

// Whatever is in navItems but NOT already reachable from bottomNavItems on mobile.
// These are the items the hamburger menu will reveal.
const hamburgerNavItems = navItems.filter(
  (item) => !bottomNavItems.some((b) => b.path === item.path)
);

const activeFilter = "invert(20%) sepia(90%) saturate(5000%) hue-rotate(355deg) brightness(90%)";

const TopBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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

              {/* Mobile: hamburger only */}
              <div className="flex items-center xl:hidden lg:hidden">
                <button
                  onClick={() => setMenuOpen((prev) => !prev)}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition"
                >
                  {menuOpen ? (
                    <FiX className="text-xl text-[#05062F]" />
                  ) : (
                    <FiMenu className="text-xl text-[#05062F]" />
                  )}
                </button>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-6">
                {navItems.map((item, index) => (
                  <NavLink key={index} to={item.path} end={item.end}>
                    {({ isActive }) => (
                      <div className="flex items-center gap-2 cursor-pointer transition duration-200 flex-shrink-0">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-[18px] h-[18px] transition duration-200"
                          style={{ filter: isActive ? activeFilter : "none" }}
                        />

                        <span
                          className={`
                            whitespace-nowrap
                            ${fontSize.md}
                            ${fontWeight.normal}
                            ${fontFamily.main}
                            ${isActive ? "text-[#EC2614]" : "text-[#05062F]"}
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
              <div className="hidden lg:block w-60">
                {/* <SearchInput /> */}
              </div>
              <div className="relative cursor-pointer">
                <img
                  src={NotificationIcon}
                  alt="Notifications"
                  className="hover:scale-105 transition hidden lg:block"
                />
              </div>
              <img
                src={SarahImg}
                alt="Sarah John"
                className="w-9 h-9 rounded-full object-cover hidden lg:block"
              />
              <img
                src={ProfileImg}
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover block lg:hidden"
              />
            </div>
          </div>
        </Wrapper>

        {/* ── HAMBURGER DROPDOWN — mobile/tablet only ── */}
        {menuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white shadow-md">
            <Wrapper>
              <nav className="flex flex-col py-2">
                {hamburgerNavItems.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.path}
                    end={item.end}
                    onClick={() => setMenuOpen(false)}
                  >
                    {({ isActive }) => (
                      <div className="flex items-center gap-3 py-3 px-1 cursor-pointer transition duration-200">
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="w-5 h-5 transition duration-200"
                          style={{ filter: isActive ? activeFilter : "none" }}
                        />
                        <span
                          className={`
                            ${fontSize.md}
                            ${fontWeight.normal}
                            ${fontFamily.main}
                            ${isActive ? "text-[#EC2614]" : "text-[#05062F]"}
                          `}
                        >
                          {item.label}
                        </span>
                      </div>
                    )}
                  </NavLink>
                ))}
              </nav>
            </Wrapper>
          </div>
        )}
      </header>

      {/* ── BOTTOM NAV — mobile only ── */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-lg z-50">
        <div className="flex items-center justify-around px-2 py-2">
          {bottomNavItems.map((item, index) => (
            <NavLink key={index} to={item.path} end={item.end}>
              {({ isActive }) => (
                <div className="flex flex-col items-center gap-1 py-1 px-3 cursor-pointer transition duration-200">
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-6 h-6 transition duration-200"
                    style={{ filter: isActive ? activeFilter : "none" }}
                  />
                  <span
                    className={`
                      text-[11px] leading-none
                      ${fontFamily.main}
                      ${isActive ? "text-[#EC2614] font-medium" : "text-[#05062F]"}
                    `}
                  >
                    {item.label}
                  </span>
                </div>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="lg:hidden h-16" />
    </>
  );
};

export default TopBar;