import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { fontFamily } from "../../components/styles/theme";
import api from "../../api/axios"; // 👈 Fixed import path to custom axios instance

const WalletVerify = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying payment...");

  useEffect(() => {
    const txRef =
      searchParams.get("transaction_id") || searchParams.get("tx_ref");

    if (!txRef) {
      setStatus("error");
      setMessage("No transaction reference found.");
      return;
    }

    api
      .get(`/wallet/verify?transaction_id=${txRef}`)
      .then((res) => {
        setStatus("success");
        setMessage(res.data?.message || "Wallet funded successfully!");
        setTimeout(() => navigate("/app/wallet"), 2000);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(
          err.response?.data?.message || "Failed to verify transaction.",
        );
      });
  }, [searchParams, navigate]);

  return (
    <div
      className={`min-h-screen bg-gray-50 flex items-center justify-center p-4 ${fontFamily.main}`}
    >
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-[#0f1c3f] border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-700 font-medium">{message}</p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-2xl font-bold">
              ✓
            </div>
            <h2 className="text-xl font-bold text-[#0f1c3f]">Success!</h2>
            <p className="text-gray-600 text-sm">{message}</p>
            <p className="text-xs text-gray-400 mt-2">
              Redirecting to your wallet...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-2xl font-bold">
              ✕
            </div>
            <h2 className="text-xl font-bold text-[#0f1c3f]">
              Verification Failed
            </h2>
            <p className="text-gray-600 text-sm">{message}</p>
            <button
              onClick={() => navigate("/app/wallet")}
              className="mt-4 bg-[#0f1c3f] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#1a2f5e] cursor-pointer"
            >
              Back to Wallet
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalletVerify;
