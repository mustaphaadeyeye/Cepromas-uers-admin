import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayouts from "./pages/dashboard/DashboardLayouts";
import Wallet from "./pages/wallet/Wallet";
import SettingsLayout from "./pages/settings/SettingsLayout";
import FavouriteLayout from "./pages/favorites/FavouriteLayout";

  


const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardLayouts />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="settings" element={<SettingsLayout />} />
        <Route path="favorites" element={<FavouriteLayout />} />
      </Route>
    </Routes>
  );
};

export default App;