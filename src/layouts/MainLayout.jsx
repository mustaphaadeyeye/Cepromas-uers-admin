import React from "react";
import TopBar from "../components/navs/TopBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-[#E5E7EB]">
      {/* GLOBAL TOPBAR */}
      <TopBar />

      {/* PAGE CONTENT */}
      <div className="pt-22">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;