import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import DashboardLayouts from "./pages/dashboard/DashboardLayouts";
import Wallet from "./pages/wallet/Wallet";
import SettingsLayout from "./pages/settings/SettingsLayout";
import FavouriteLayout from "./pages/favorites/FavouriteLayout";
import InvestmentDescription from "./pages/dashboard/InvestmentDescription";
import ContactChat from "./components/chatandconditions/ContactChat";
import TermsAndConditions from "./components/chatandconditions/TermsAndConditions";
import WalletSeeAll from "./pages/wallet/WalletSeeAll";
import  WalletInterest from "./pages/wallet/WalletInterest";



  


const App = () => {
  return (
    <Routes>
      
      <Route path="/" element={<MainLayout />}>
        <Route index element={<DashboardLayouts />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="settings" element={<SettingsLayout />} />
        <Route path="favorites" element={<FavouriteLayout />} />
        <Route path="investment-description" element={<InvestmentDescription />} />
        <Route path="contact" element={<ContactChat />} />
        <Route path="terms" element={<TermsAndConditions />} />
        <Route path="wallet-see-all" element={<WalletSeeAll />} />
        <Route path="wallet-interest" element={<WalletInterest />} />
      </Route>
    </Routes>
  );
};

export default App;