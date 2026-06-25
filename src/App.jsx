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
import WalletInterest from "./pages/wallet/WalletInterest";
import GrowthLayout from "./pages/growth/GrowthLayout";
import GrowthInvesments from "./pages/growth/GrowthInvesments";
import Login from "./pages/authentication/Login";
import SignUp from "./pages/authentication/SignUp";
import PersonalInfo from "./pages/authentication/PersonalInfo";
import Kyc from "./pages/authentication/Kyc";
import ForgotPassword from "./pages/authentication/ForgotPassword";
import MarketPlace from "./pages/market/MarketPlace"
import InvestmentLayout from "./pages/investment/InvestmentLayout";


const App = () => {
  return (
    <Routes>
      {/* Login is the first page at "/" */}
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/personal-info" element={<PersonalInfo />} />
      <Route path="/kyc" element={<Kyc/>}/>
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* All app pages live under "/app" */}
      <Route path="/app" element={<MainLayout />}>
        <Route index element={<DashboardLayouts />} />
        <Route path="wallet" element={<Wallet />} />
        <Route path="settings" element={<SettingsLayout />} />
        <Route path="favorites" element={<FavouriteLayout />} />
        <Route path="investment-description" element={<InvestmentDescription />} />
        <Route path="contact" element={<ContactChat />} />
        <Route path="terms" element={<TermsAndConditions />} />
        <Route path="wallet-see-all" element={<WalletSeeAll />} />
        <Route path="wallet-interest" element={<WalletInterest />} />
        <Route path="growth" element={<GrowthLayout />} />
        <Route path="investments" element={<GrowthInvesments />} />
        <Route path="market" element={<MarketPlace/>}/>
        <Route path="investment" element={<InvestmentLayout />} />
      </Route>
    </Routes>
  );
};

export default App;