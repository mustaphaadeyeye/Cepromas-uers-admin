import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import MarketPlace from "./pages/market/MarketPlace";
import InvestmentLayout from "./pages/investment/InvestmentLayout";
import SavedLayout from "./pages/saved/SavedLayout";
import ChatLayout from "./pages/chat/ChatLayout";
import RequireAuth from "./components/auth/RequireAuth";
import PropertyDetails from "./pages/property/PropertyDetails";

const App = () => {
  return (
    <>
      <Toaster
        position="top-center" // Changes the location to the center
        toastOptions={{
          duration: 4000,
          // Base style mirroring the image (solid white, square/subtle corners, flat shadow)
          style: {
            background: "#ffffff",
            color: "#555555", // Soft gray text like in the image
            borderRadius: "6px", // Tight, professional corner radius
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Smooth, dark background contrast shadow
            padding: "16px",
            fontSize: "14px",
            fontWeight: "500",
            borderBottom: "4px solid transparent", // Placeholder for the bottom accent bar
          },
          success: {
            iconTheme: {
              primary: "#00b300", // Vibrant green check from your reference image
              secondary: "#fff",
            },
            style: {
              borderBottom: "4px solid #00b300", // The green accent bar at the bottom left
            },
          },
          error: {
            iconTheme: {
              primary: "#EF4444",
              secondary: "#fff",
            },
            style: {
              borderBottom: "4px solid #EF4444", // Red accent bar for error states
            },
          },
        }}
        reverseOrder={false}
      />
      <Routes>
        {/* Login is the first page at "/" */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/kyc" element={<Kyc />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* All app pages live under "/app" and require authentication */}
        <Route
          path="/app"
          element={
            <RequireAuth>
              <MainLayout />
            </RequireAuth>
          }
        >
          <Route index element={<DashboardLayouts />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="settings" element={<SettingsLayout />} />
          <Route path="favorites" element={<FavouriteLayout />} />
          <Route
            path="investment-description/:id"
            element={<InvestmentDescription />}
          />
          <Route path="contact" element={<ContactChat />} />
          <Route path="terms" element={<TermsAndConditions />} />
          <Route path="wallet-see-all" element={<WalletSeeAll />} />
          <Route path="wallet-interest" element={<WalletInterest />} />
          <Route path="growth" element={<GrowthLayout />} />
          <Route path="investments" element={<GrowthInvesments />} />
          <Route path="market" element={<MarketPlace />} />
          <Route path="investment" element={<InvestmentLayout />} />
          <Route path="saved" element={<SavedLayout />} />
          <Route path="chat" element={<ChatLayout />} />
          <Route path="property/:id" element={<PropertyDetails />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
