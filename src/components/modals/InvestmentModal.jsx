import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";

const InvestmentModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Investment Details",
  subtitle = "Confirm investment details before you proceed",
  cancelText = "Cancel",
  confirmText = "Confirm & Invest",
  details = [],
}) => {
  const [success, setSuccess] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Reset modal state every time it opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setPin("");
      setErrorMsg("");
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Robust Error Extraction Helper (Matches Wallet logic)
  // Robust Error Extraction Helper
  const extractErrorMessage = (err) => {
    // 1. Direct NestJS error response (e.g., err.response.data.message)
    const serverMessage = err.response?.data?.message;

    if (serverMessage) {
      if (Array.isArray(serverMessage)) {
        return serverMessage.join(" | ");
      }
      if (typeof serverMessage === "string") {
        return serverMessage;
      }
    }

    // 2. Direct string in response data
    if (
      typeof err.response?.data === "string" &&
      err.response.data.trim().length > 0
    ) {
      return err.response.data;
    }

    // 3. Fallback to general response error description (e.g., "Forbidden resource")
    if (err.response?.data?.error) {
      return err.response.data.error;
    }

    // 4. Network or connection errors
    if (err.code === "ERR_NETWORK" || !err.response) {
      return "Unable to connect to server. Please check your internet connection.";
    }

    // 5. Standard JS error message (if thrown manually)
    if (err.message && err.message !== "Network Error") {
      return err.message;
    }

    return "Failed to process subscription. Please check your details and try again.";
  };

  const handleConfirm = async () => {
    if (!pin) {
      setErrorMsg("Please enter your transaction PIN.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      // Call parent handleConfirm which connects to API
      await onConfirm(pin);

      setSuccess(true);
    } catch (err) {
      setErrorMsg(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 ${fontFamily.main}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="bg-white w-full max-w-100 rounded-[20px] p-7 flex flex-col gap-4 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition cursor-pointer text-sm disabled:opacity-50"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Error Banner */}
        {errorMsg && (
          <div className="w-full bg-red-50 text-red-600 text-xs p-3 rounded-xl text-center font-medium border border-red-100 mt-2">
            {errorMsg}
          </div>
        )}

        {!success ? (
          <>
            <div className="text-center flex flex-col gap-1">
              <h2 className="text-[20px] font-bold text-[#05062F]">{title}</h2>
              <p className="text-xs text-gray-400">{subtitle}</p>
            </div>

            {/* Details Summary Table */}
            <div className="flex flex-col bg-gray-50/80 rounded-xl px-5 py-2 border border-gray-100">
              {details.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span
                    className={`${fontSize.xs} ${fontWeight.normal} text-gray-500`}
                  >
                    {item.label}
                  </span>
                  <span
                    className={`${fontSize.xs} ${fontWeight.semibold} ${textColor.primary}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Transaction PIN Input */}
            <div className="flex flex-col gap-1.5 mt-1">
              <label className="text-xs font-semibold text-[#05062F]">
                Transaction PIN
              </label>
              <input
                type="password"
                maxLength={6}
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => {
                  setErrorMsg("");
                  setPin(e.target.value);
                }}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm outline-none text-gray-800 placeholder:text-gray-300 focus:border-[#05062F] transition-all"
              />
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 mt-2">
              <Button
                text={cancelText}
                onClick={onClose}
                disabled={loading}
                width="w-full"
                bg="bg-transparent"
                className="border border-gray-200 text-[#05062F] rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50"
              />
              <Button
                text={loading ? "Processing..." : confirmText}
                onClick={handleConfirm}
                disabled={loading}
                width="w-full"
                bg="bg-[#05062F]"
                className="text-white rounded-xl py-3 hover:bg-[#1a2352] transition text-sm font-semibold disabled:opacity-50"
              />
            </div>
          </>
        ) : (
          /* SUCCESS VIEW */
          <div className="flex flex-col items-center text-center gap-4 py-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#05062F]">
                Investment Successful!
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Your capital has been allocated and your active portfolio has
                been updated.
              </p>
            </div>

            <div className="flex flex-col w-full bg-gray-50/80 rounded-xl px-5 py-2 border border-gray-100">
              {details.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                >
                  <span className={`${fontSize.xs} text-gray-500`}>
                    {item.label}
                  </span>
                  <span
                    className={`${fontSize.xs} font-semibold ${textColor.primary}`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <Button
              text="View Portfolio / Done"
              onClick={onClose}
              width="w-full"
              bg="bg-[#05062F]"
              className="text-white rounded-xl py-3.5 hover:bg-[#1a2352] transition text-sm font-semibold"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentModal;
