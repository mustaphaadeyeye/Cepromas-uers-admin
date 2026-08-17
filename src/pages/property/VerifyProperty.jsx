import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getWalletBalance } from "../../api/wallet";
import { purchaseProperty } from "../../api/property.api.js";
import Wrapper from "../../components/wrapper/Wrapper";
import Button from "../../components/buttons/Button";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";
import logo from "../../assets/image/newcep.png";
import toast from "react-hot-toast";

const checklistItems = [
  {
    id: 1,
    title: "Schedule a Property Inspection",
    description:
      "Visit the property or arrange a physical inspection to verify its condition and location.",
  },
  {
    id: 2,
    title: "Review Title and Ownership Documents",
    description:
      "Examine all legal documents to confirm property ownership and confirm the seller or landlord's authority over the property.",
  },
  {
    id: 3,
    title: "Confirm Terms and Conditions",
    description:
      "Ensure you understand the purchase, lease, or rental terms before proceeding.",
  },
];

const formatNaira = (amount) =>
  `₦${Number(amount || 0).toLocaleString("en-NG")}`;

// Reusable Skip Verification Dialog
const SkipVerificationModal = ({ onClose, onSkip }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 px-4">
    <div className="relative bg-white rounded-2xl w-full max-w-95 px-6 pt-8 pb-6 shadow-2xl">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 6L18 18M6 18L18 6"
            stroke="#1F2A44"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <h2 className="text-center text-lg font-bold text-[#0B1533] mb-3">
        Skip Property Verification
      </h2>
      <p className="text-center text-[12.5px] text-gray-500 leading-relaxed mb-7">
        If you skip this process it means you want to go directly to payment
        without having a physical inspection for the property.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 rounded-xl py-3.5 text-[15px] font-semibold text-[#0B1533] border border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={onSkip}
          className="flex-1 rounded-xl py-3.5 text-[15px] font-semibold text-white bg-[#0B1533] hover:bg-[#141f4a] transition-colors cursor-pointer"
        >
          Skip
        </button>
      </div>
    </div>
  </div>
);

// Comprehensive Property Purchase Modal (Matching InvestmentModal Flow & Design)
const PropertyPurchaseModal = ({
  isOpen,
  onClose,
  onConfirm,
  property,
  currentDate,
}) => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isKycRequired, setIsKycRequired] = useState(false);
  const [isPinRequired, setIsPinRequired] = useState(false);
  const [showPolicyNotice, setShowPolicyNotice] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState(null);

  const amount = property?.price || 0;
  const receiver = property?.agent?.fullName || "Cephas Asset Management";

  const details = [
    { label: "Property Name", value: property?.title || "Real Estate Asset" },
    { label: "Location", value: property?.location || "Lagos, Nigeria" },
    {
      label: "Category",
      value:
        property?.category === "RENT"
          ? "Rent Agreement"
          : property?.category === "LEASE"
            ? "Leasehold Structure"
            : "Direct Purchase",
    },
    { label: "Amount Payable", value: formatNaira(amount) },
    { label: "Recipient / Agent", value: receiver },
    { label: "Transaction Date", value: currentDate },
  ];

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setPin("");
      setErrorMsg("");
      setLoading(false);
      setIsKycRequired(false);
      setIsPinRequired(false);
      setShowPolicyNotice(false);
      setAcceptedTerms(false);
      setPurchaseResult(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape" && !loading) onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, loading]);

  const extractErrorMessage = (err) => {
    const serverMessage = err.response?.data?.message;
    if (serverMessage) {
      if (Array.isArray(serverMessage)) return serverMessage.join(" | ");
      if (typeof serverMessage === "string") return serverMessage;
    }
    if (
      typeof err.response?.data === "string" &&
      err.response.data.trim().length > 0
    ) {
      return err.response.data;
    }
    if (err.response?.data?.error) return err.response.data.error;
    // if (err.code === "ERR_NETWORK" || !err.response) {
    //   return "Unable to connect to server. Please check your backend server status.";
    // }
    return err.message || "Failed to complete property purchase. Try again.";
  };

  const handleProceedToNotice = () => {
    if (!pin || pin.trim().length < 4) {
      setErrorMsg("Please enter your 4-6 digit transaction PIN.");
      return;
    }
    setErrorMsg("");
    setShowPolicyNotice(true);
  };

  const handleFinalConfirm = async () => {
    if (!acceptedTerms) {
      setErrorMsg("You must accept the acquisition and transfer policy.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const res = await onConfirm(pin);
      setPurchaseResult(res);
      setSuccess(true);
    } catch (err) {
      setShowPolicyNotice(false);
      const extractedErr = extractErrorMessage(err);
      setErrorMsg(extractedErr);

      const lowerErr = extractedErr.toLowerCase();
      if (lowerErr.includes("kyc") || lowerErr.includes("verification")) {
        setIsKycRequired(true);
      } else if (
        lowerErr.includes("pin not set") ||
        lowerErr.includes("set up your pin") ||
        lowerErr.includes("transaction pin") ||
        lowerErr.includes("incorrect transaction pin")
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
                You must complete your identity verification (NIN) before you
                can acquire or purchase this property asset.
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
                {errorMsg ||
                  "You have not configured your security transaction PIN yet. Please set up your PIN in settings to authorise property wallet payments."}
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
        ) : success ? (
          /* 3. PURCHASE SUCCESSFUL VIEW */
          <div className="flex flex-col items-center text-center gap-4 py-3">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#05062F]">
                Purchase Successful 🎉
              </h2>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Your transaction has been processed. The property is secured and
                your wallet balance has been deducted.
              </p>
            </div>

            <div className="flex flex-col w-full bg-gray-50/80 rounded-xl px-5 py-2 border border-gray-100 text-left">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Property</span>
                <span className="text-xs font-semibold text-[#05062F] text-right max-w-[200px] truncate">
                  {property?.title}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Amount Paid</span>
                <span className="text-xs font-bold text-[#05062F]">
                  {formatNaira(property?.price)}
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Transaction ID</span>
                <span className="text-xs font-mono text-gray-700">
                  {purchaseResult?.transactionId ||
                    purchaseResult?.reference ||
                    `TRX-${Date.now().toString().slice(-8)}`}
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-500">Status</span>
                <span className="text-xs font-bold text-emerald-600">
                  Completed
                </span>
              </div>
            </div>

            <Button
              text="Back to Marketplace"
              onClick={() => {
                onClose();
                navigate("/app/market");
              }}
              width="w-full"
              bg="bg-[#05062F]"
              className="text-white rounded-xl py-3.5 hover:bg-[#1a2352] transition text-sm font-semibold cursor-pointer"
            />
          </div>
        ) : showPolicyNotice ? (
          /* 4. POLICY & TRANSFER TERMS VIEW */
          <div className="flex flex-col gap-4 py-1">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-700 rounded-xl flex items-center justify-center text-xl shrink-0">
                🔒
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#05062F]">
                  Acquisition Terms & Confirmation
                </h2>
                <p className="text-xs text-gray-400">
                  Transfer authorization agreement
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
                  Payment of{" "}
                  <strong className="text-black font-bold">
                    {formatNaira(amount)}
                  </strong>{" "}
                  will be directly deducted from your wallet balance.
                </li>
                <li>
                  Ownership documents and assignment deeds will be assigned
                  under your verified legal KYC identity.
                </li>
                <li>
                  All receipts and tracking will be archived under your{" "}
                  <strong className="text-black font-bold">
                    Managed Properties
                  </strong>{" "}
                  portfolio.
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
                I authorize this transfer and agree to the terms of ownership
                and title deed conveyance for{" "}
                <span className="font-bold text-[#05062F]">
                  {property?.title}
                </span>
                .
              </span>
            </label>

            <div className="flex items-center gap-3 mt-2">
              <Button
                text="Back"
                onClick={() => setShowPolicyNotice(false)}
                disabled={loading}
                width="w-full"
                bg="bg-transparent"
                className="border border-gray-200 text-[#05062F] rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 cursor-pointer"
              />
              <Button
                text={loading ? "Authorizing Payment..." : "I Agree & Pay Now"}
                onClick={handleFinalConfirm}
                disabled={loading || !acceptedTerms}
                width="w-full"
                bg="bg-[#05062F]"
                className="text-white rounded-xl py-3 hover:bg-[#1a2352] transition text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              />
            </div>
          </div>
        ) : (
          /* 5. MAIN DETAILS & PIN INPUT VIEW */
          <>
            <div className="text-center flex flex-col gap-1">
              <h2 className="text-[20px] font-bold text-[#05062F]">
                Confirm Property Transfer
              </h2>
              <p className="text-xs text-gray-400">
                Authorize payment from your Cepromas wallet
              </p>
            </div>

            {errorMsg && (
              <div className="w-full bg-red-50 text-red-600 text-xs p-3 rounded-xl text-center font-medium border border-red-100">
                {errorMsg}
              </div>
            )}

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
                    className={`${fontSize.xs} ${fontWeight.semibold} ${textColor.primary} text-right max-w-[200px] truncate`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <label className="text-xs font-semibold text-[#05062F]">
                Enter 4-6 Digit Transaction PIN
              </label>
              <input
                type="password"
                maxLength={6}
                placeholder="Enter Security PIN"
                value={pin}
                onChange={(e) => {
                  setErrorMsg("");
                  setPin(e.target.value);
                }}
                className="w-full border border-gray-200 rounded-xl px-4 h-11 text-sm outline-none text-gray-800 placeholder:text-gray-300 focus:border-[#05062F] transition-all"
              />
            </div>

            <div className="flex items-center gap-3 mt-2">
              <Button
                text="Cancel"
                onClick={onClose}
                disabled={loading}
                width="w-full"
                bg="bg-transparent"
                className="border border-gray-200 text-[#05062F] rounded-xl py-3 hover:bg-gray-50 transition text-sm font-medium disabled:opacity-50 cursor-pointer"
              />
              <Button
                text="Proceed to Authorize"
                onClick={handleProceedToNotice}
                disabled={loading}
                width="w-full"
                bg="bg-[#05062F]"
                className="text-white rounded-xl py-3 hover:bg-[#1a2352] transition text-sm font-semibold disabled:opacity-50 cursor-pointer"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main Verify Property Page
const VerifyProperty = () => {
  const [checked, setChecked] = useState({});
  const [showSkipModal, setShowSkipModal] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const property = location.state?.property;

  const { data: walletData } = useQuery({
    queryKey: ["wallet-balance"],
    queryFn: getWalletBalance,
  });

  const availableBalance = Number(
    walletData?.availableBalance ?? walletData?.balance ?? 0,
  );

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const toggleItem = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked = checklistItems.every((item) => checked[item.id]);

  const handlePurchaseSubmit = async (transactionPin) => {
    const propertyPrice = Number(property?.price || 0);

    if (availableBalance < propertyPrice) {
      throw new Error(
        `Insufficient wallet balance. You need ${formatNaira(
          propertyPrice,
        )} but have ${formatNaira(availableBalance)}.`,
      );
    }

    const data = await purchaseProperty(property.id, transactionPin);

    // Refresh wallet, transactions, and profile data
    await queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
    await queryClient.invalidateQueries({ queryKey: ["wallet-history"] });
    await queryClient.invalidateQueries({ queryKey: ["profile"] });
    await queryClient.invalidateQueries({ queryKey: ["properties"] });

    toast.success("Property payment completed successfully!");
    return data;
  };

  return (
    <div className={`${fontFamily.main}`}>
      <Wrapper>
        <div className="flex justify-between items-start bg-white px-7 pt-6 pb-8 rounded-2xl shadow-xs">
          <div className="w-full max-w-115 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <button
                aria-label="Go back"
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5M5 12L12 19M5 12L12 5"
                    stroke="#1F2A44"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={() => setShowSkipModal(true)}
                className="text-blue-600 text-sm font-semibold hover:underline cursor-pointer"
              >
                Skip
              </button>
            </div>

            <h1 className="text-lg font-bold text-gray-900 mb-2">
              Property Verification Checklist
            </h1>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-4">
              Your safety is our priority. Complete all required verification
              steps to confirm the property&apos;s authenticity and
              documentation before making payment.
            </p>

            {property && (
              <div className="flex items-center justify-between p-3.5 bg-blue-50/60 border border-blue-100 rounded-xl mb-6">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#05062F] max-w-[200px] truncate">
                    {property.title}
                  </span>
                  <span className="text-[11px] text-gray-500">
                    {property.location}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block">
                    Price Tag
                  </span>
                  <span className="text-sm font-bold text-[#2540A8]">
                    {formatNaira(property.price)}
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-col mb-7">
              {checklistItems.map((item, index) => (
                <div key={item.id} className="flex gap-3.5">
                  <div className="flex flex-col items-center">
                    <button
                      onClick={() => toggleItem(item.id)}
                      aria-pressed={!!checked[item.id]}
                      aria-label={item.title}
                      style={
                        checked[item.id]
                          ? {
                              backgroundColor: "#FF6000",
                              borderColor: "#FF6000",
                            }
                          : undefined
                      }
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors cursor-pointer ${
                        checked[item.id] ? "" : "bg-white border-gray-300"
                      }`}
                    >
                      {checked[item.id] && (
                        <svg
                          width="11"
                          height="11"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="#fff"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>
                    {index < checklistItems.length - 1 && (
                      <div className="flex-1 border-l-[1.5px] border-dashed border-gray-300 mt-1 min-h-8" />
                    )}
                  </div>

                  <div className="pb-5">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      {item.title}
                    </p>
                    <p className="text-[12.5px] text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 bg-blue-50 rounded-xl px-4 py-3.5 mb-4">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-xs">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
                    fill="#2F6FED"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mb-0.5">
                  Listing Agent Contact
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {property?.agent?.phoneNumber || "09012345678"}
                </p>
              </div>
            </div>

            <button
              disabled={!allChecked}
              onClick={() => setIsPurchaseModalOpen(true)}
              className={`w-full rounded-xl py-3.5 text-[15px] font-semibold text-white transition-colors cursor-pointer ${
                allChecked
                  ? "bg-[#05062F] hover:bg-[#11144f]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Proceed with Payment
            </button>
            <p className="text-center text-[11px] text-blue-600 mt-2">
              The payment ({formatNaira(property?.price)}) will be deducted from
              your wallet.
            </p>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center opacity-20">
            <img
              src={logo}
              alt="Cepromas"
              className="max-w-100 w-full h-auto object-contain"
            />
          </div>
        </div>
      </Wrapper>

      {/* Skip Confirmation Dialog */}
      {showSkipModal && (
        <SkipVerificationModal
          onClose={() => setShowSkipModal(false)}
          onSkip={() => {
            setShowSkipModal(false);
            setIsPurchaseModalOpen(true);
          }}
        />
      )}

      {/* Authentication & PIN Protected Purchase Modal */}
      <PropertyPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        onConfirm={handlePurchaseSubmit}
        property={property}
        currentDate={currentDate}
      />
    </div>
  );
};

export default VerifyProperty;
