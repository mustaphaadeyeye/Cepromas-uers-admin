import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  confirmText = "Proceed to Terms",
  details = [],
}) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isKycRequired, setIsKycRequired] = useState(false);
  const [isPinRequired, setIsPinRequired] = useState(false);

  // Lockup confirmation step state
  const [showLockupNotice, setShowLockupNotice] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Extract lockup timeline value from details if available
  const durationDetail =
    details.find(
      (item) =>
        item.label.toLowerCase().includes("lockup") ||
        item.label.toLowerCase().includes("duration"),
    )?.value || "the selected duration";

  // Reset modal state whenever it opens
  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setPin("");
      setErrorMsg("");
      setLoading(false);
      setIsKycRequired(false);
      setIsPinRequired(false);
      setShowLockupNotice(false);
      setAcceptedTerms(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, loading]);

  // Error extraction helper
  const extractErrorMessage = (err) => {
    const serverMessage = err.response?.data?.message;

    if (serverMessage) {
      if (Array.isArray(serverMessage)) {
        return serverMessage.join(" | ");
      }
      if (typeof serverMessage === "string") {
        return serverMessage;
      }
    }

    if (
      typeof err.response?.data === "string" &&
      err.response.data.trim().length > 0
    ) {
      return err.response.data;
    }

    if (err.response?.data?.error) {
      return err.response.data.error;
    }

    if (err.code === "ERR_NETWORK" || !err.response) {
      return "Unable to connect to server. Please check your internet connection.";
    }

    if (err.message && err.message !== "Network Error") {
      return err.message;
    }

    return "Failed to process subscription. Please check your details and try again.";
  };

  // Step 1: Validate PIN and show Lockup Notice
  const handleProceedToNotice = () => {
    if (!pin) {
      setErrorMsg("Please enter your transaction PIN.");
      return;
    }
    setErrorMsg("");
    setShowLockupNotice(true);
  };

  // Step 2: Final Submission upon agreeing to terms
  const handleFinalConfirm = async () => {
    if (!acceptedTerms) {
      setErrorMsg("You must accept the lockup policy to proceed.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      // Call parent handleConfirm which connects to API
      await onConfirm(pin);

      setSuccess(true);
    } catch (err) {
      setShowLockupNotice(false); // Go back to main form view if API fails
      const extractedErr = extractErrorMessage(err);
      setErrorMsg(extractedErr);

      const lowerErr = extractedErr.toLowerCase();

      // Detect KYC error keywords
      if (lowerErr.includes("kyc") || lowerErr.includes("verification")) {
        setIsKycRequired(true);
      }
      // Detect PIN not set error keywords
      else if (
        lowerErr.includes("pin not set") ||
        lowerErr.includes("set up your pin") ||
        lowerErr.includes("transaction pin")
      ) {
        setIsPinRequired(true);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoToKyc = () => {
    onClose();
    navigate("/app/settings", { state: { openKyc: true } });
  };

  const handleGoToPin = () => {
    onClose();
    navigate("/app/settings", { state: { openPin: true } });
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/45 ${fontFamily.main}`}
      onClick={(e) => {
        if (e.target === e.currentTarget && !loading) onClose();
      }}
    >
      <div className="bg-white w-full max-w-105 rounded-[20px] p-7 flex flex-col gap-4 relative shadow-xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={loading}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition cursor-pointer text-sm disabled:opacity-50"
          aria-label="Close"
        >
          ✕
        </button>

        {/* 1. KYC REQUIRED VIEW */}
        {isKycRequired ? (
          <div className="flex flex-col items-center text-center gap-4 py-3">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
              ⚠️
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#05062F]">
                KYC Verification Required
              </h2>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                You must verify your identity (NIN) before you can invest in
                this growth package.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 mt-2">
              <Button
                text="Complete KYC in Settings"
                onClick={handleGoToKyc}
                width="w-full"
                bg="bg-[#05062F]"
                className="text-white rounded-xl py-3.5 hover:bg-[#1a2352] transition text-sm font-semibold cursor-pointer"
              />
              <Button
                text="Cancel"
                onClick={onClose}
                width="w-full"
                bg="bg-transparent"
                className="border border-gray-200 text-gray-600 rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium cursor-pointer"
              />
            </div>
          </div>
        ) : isPinRequired ? (
          /* 2. TRANSACTION PIN REQUIRED VIEW */
          <div className="flex flex-col items-center text-center gap-4 py-3">
            <div className="w-16 h-16 bg-blue-100 text-[#05062F] rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
              🔑
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#05062F]">
                Transaction PIN Required
              </h2>
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                You have not set up a transaction PIN yet. Please configure your
                security PIN before subscribing.
              </p>
            </div>

            <div className="w-full flex flex-col gap-2 mt-2">
              <Button
                text="Set Transaction PIN in Settings"
                onClick={handleGoToPin}
                width="w-full"
                bg="bg-[#05062F]"
                className="text-white rounded-xl py-3.5 hover:bg-[#1a2352] transition text-sm font-semibold cursor-pointer"
              />
              <Button
                text="Cancel"
                onClick={onClose}
                width="w-full"
                bg="bg-transparent"
                className="border border-gray-200 text-gray-600 rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium cursor-pointer"
              />
            </div>
          </div>
        ) : showLockupNotice && !success ? (
          /* 3. LOCKUP TERMS & CONDITIONS NOTICE VIEW */
          <div className="flex flex-col gap-4 py-1">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                🔒
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#05062F]">
                  Important Subscription Rule
                </h2>
                <p className="text-xs text-gray-400">
                  Lockup policy confirmation
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="w-full bg-red-50 text-red-600 text-xs p-3 rounded-xl text-center font-medium border border-red-100">
                {errorMsg}
              </div>
            )}

            <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-4 text-xs text-amber-950 flex flex-col gap-2 leading-relaxed">
              <p className="font-semibold text-sm text-amber-900">
                Please review before confirming:
              </p>
              <ul className="list-disc pl-4 space-y-1 text-amber-900">
                <li>
                  Your allocated capital will be strictly locked for{" "}
                  <strong className="text-black font-bold">
                    {durationDetail}
                  </strong>
                  .
                </li>
                <li>
                  <strong className="text-black font-bold">
                    Early unsubscription or capital pull-out is not permitted
                  </strong>{" "}
                  prior to the maturity date.
                </li>
                <li>
                  Your projected returns and initial capital will automatically
                  disburse to your wallet balance upon maturity completion.
                </li>
              </ul>
            </div>

            <label className="flex items-start gap-2.5 cursor-pointer mt-1 select-none">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => {
                  setErrorMsg("");
                  setAcceptedTerms(e.target.checked);
                }}
                className="mt-0.5 w-4 h-4 rounded text-[#05062F] focus:ring-[#05062F] cursor-pointer"
              />
              <span className="text-xs text-gray-600 leading-snug">
                I understand and agree that this investment is non-refundable
                and locked for{" "}
                <span className="font-bold text-[#05062F]">
                  {durationDetail}
                </span>
                .
              </span>
            </label>

            <div className="flex items-center gap-3 mt-2">
              <Button
                text="Back"
                onClick={() => setShowLockupNotice(false)}
                disabled={loading}
                width="w-full"
                bg="bg-transparent"
                className="border border-gray-200 text-[#05062F] rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 cursor-pointer"
              />
              <Button
                text={loading ? "Processing..." : "I Agree & Subscribe"}
                onClick={handleFinalConfirm}
                disabled={loading || !acceptedTerms}
                width="w-full"
                bg="bg-[#05062F]"
                className="text-white rounded-xl py-3 hover:bg-[#1a2352] transition text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              />
            </div>
          </div>
        ) : !success ? (
          /* 4. STANDARD DETAILS FORM VIEW */
          <>
            <div className="text-center flex flex-col gap-1">
              <h2 className="text-[20px] font-bold text-[#05062F]">{title}</h2>
              <p className="text-xs text-gray-400">{subtitle}</p>
            </div>

            {/* Error Banner */}
            {errorMsg && (
              <div className="w-full bg-red-50 text-red-600 text-xs p-3 rounded-xl text-center font-medium border border-red-100">
                {errorMsg}
              </div>
            )}

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
                className="border border-gray-200 text-[#05062F] rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 cursor-pointer"
              />
              <Button
                text={confirmText}
                onClick={handleProceedToNotice}
                disabled={loading}
                width="w-full"
                bg="bg-[#05062F]"
                className="text-white rounded-xl py-3 hover:bg-[#1a2352] transition text-sm font-semibold disabled:opacity-50 cursor-pointer"
              />
            </div>
          </>
        ) : (
          /* 5. SUCCESS VIEW */
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
              className="text-white rounded-xl py-3.5 hover:bg-[#1a2352] transition text-sm font-semibold cursor-pointer"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestmentModal;
