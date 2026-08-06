import React, { useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";

import logo from "../../assets/image/newcep.png";

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

// NOTE: placeholder transaction data — replace with real property/payment data
const transaction = {
  receiver: "Cephas Property & Assets Management",
  accountNumber: "0123456789",
  bank: "Ceproam Wallet",
  amount: 120000000,
  date: "10/09/2025",
};

const purchase = {
  property: "Luxury 3-Bedroom Apartment",
  location: "Ajah, Lekki, Lagos",
  transactionType: "Rent",
  amount: 120000000,
  status: "Successful",
  transactionId: "TRX-2026-001245",
  date: "10/09/2026",
};

const formatNaira = (amount) => `₦${amount.toLocaleString("en-NG")}`;

// Shared modal shell: backdrop + centered white card + close button
const ModalShell = ({ onClose, children }) => (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
    <div className="relative bg-white rounded-2xl w-full max-w-95 px-6 pt-8 pb-6">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute top-4 right-4 w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition-colors"
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
      {children}
    </div>
  </div>
);

const SkipVerificationModal = ({ onClose, onSkip }) => (
  <ModalShell onClose={onClose}>
    <h2 className="text-center text-lg font-bold text-[#0B1533] mb-3">
      Skip Property Verification
    </h2>
    <p className="text-center text-[12.5px] text-gray-500 leading-relaxed mb-7">
      If you skip this process it means you want to go directly to payment
      without having a physical inspection for the property
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
  </ModalShell>
);

const ConfirmTransferModal = ({ onClose, onConfirm, processing }) => (
  <ModalShell onClose={onClose}>
    <h2 className="text-center text-lg font-bold text-[#0B1533] mb-2">
      Confirm Transfer
    </h2>
    <p className="text-center text-[12.5px] text-gray-500 leading-relaxed mb-6">
      You&apos;re about to send {formatNaira(transaction.amount)} to{" "}
      {transaction.receiver}. Please confirm the details before proceeding.
    </p>

    <p className="text-sm font-bold text-gray-900 mb-3">
      Transaction Details
    </p>
    <div className="flex flex-col gap-3 mb-7">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Receiver</span>
        <span className="text-[13px] text-gray-700">{transaction.receiver}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Account Number</span>
        <span className="text-[13px] text-gray-700">
          {transaction.accountNumber}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Bank</span>
        <span className="text-[13px] text-gray-700">{transaction.bank}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Amount</span>
        <span className="text-[13px] text-gray-700">
          {formatNaira(transaction.amount)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Date:</span>
        <span className="text-[13px] text-gray-700">{transaction.date}</span>
      </div>
    </div>

    <button
      disabled={processing}
      onClick={onConfirm}
      className={`w-full rounded-xl py-3.5 text-[15px] font-semibold text-white transition-colors ${
        processing
          ? "bg-gray-300 cursor-not-allowed"
          : "bg-[#0B1533] hover:bg-[#141f4a] cursor-pointer"
      }`}
    >
      {processing ? "Processing..." : "Continue"}
    </button>
  </ModalShell>
);

const PurchaseSuccessfulModal = ({ onClose, onBackHome }) => (
  <ModalShell onClose={onClose}>
    <h2 className="text-lg font-bold text-gray-900 mb-2">
      Purchase Successful 🎉
    </h2>
    <p className="text-[12.5px] text-gray-500 leading-relaxed mb-6">
      Transaction successful. Your property has been secured, and all
      related documents and receipts are safely stored in{" "}
      <span className="font-semibold text-[#2F6FED]">Manage Properties</span>{" "}
      for easy access anytime.
    </p>

    <p className="text-sm font-bold text-gray-900 mb-1">
      Purchase Description
    </p>
    <p className="text-[12.5px] text-gray-500 mb-4">
      Your transaction has been completed successfully.
    </p>

    <div className="flex flex-col gap-3 mb-7">
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Property</span>
        <span className="text-[13px] text-gray-700 text-right">
          {purchase.property}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Location</span>
        <span className="text-[13px] text-gray-700 text-right">
          {purchase.location}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Transaction Type</span>
        <span className="text-[13px] text-gray-700">
          {purchase.transactionType}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Amount</span>
        <span className="text-[13px] text-gray-700">
          {formatNaira(purchase.amount)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Status</span>
        <span className="text-[13px] text-green-600 font-semibold">
          {purchase.status}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Transaction ID</span>
        <span className="text-[13px] text-gray-700">
          {purchase.transactionId}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-gray-400">Date:</span>
        <span className="text-[13px] text-gray-700">{purchase.date}</span>
      </div>
    </div>

    <button
      onClick={onBackHome}
      className="text-sm font-semibold text-gray-900 underline hover:text-gray-700"
    >
      Back to Home
    </button>
  </ModalShell>
);

const VerifyProperty = () => {
  const [checked, setChecked] = useState({});
  const [modal, setModal] = useState(null); // null | "skip" | "confirm" | "success"
  const [processing, setProcessing] = useState(false);

  const toggleItem = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allChecked = checklistItems.every((item) => checked[item.id]);

  const handleConfirm = () => {
    setProcessing(true);
    // TODO: replace with real payment/transfer API call
    setTimeout(() => {
      setProcessing(false);
      setModal("success");
    }, 1200);
  };

  const handleBackHome = () => {
    // TODO: replace with real navigation, e.g. navigate("/")
    setModal(null);
    setChecked({});
  };

  const handleSkip = () => {
    // Skipping verification goes straight to payment confirmation
    setModal("confirm");
  };

  return (
    <div className={`${fontFamily.main} `}>
      <Wrapper>
        <div className="flex justify-between items-start bg-white px-7 pt-6 pb-8">
          <div className="w-full max-w-115 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <button
                aria-label="Go back"
                className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
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
                onClick={() => setModal("skip")}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Skip
              </button>
            </div>

            <h1 className="text-lg font-bold text-gray-900 mb-2">
              Property Verification Checklist
            </h1>
            <p className="text-[13px] text-gray-500 leading-relaxed mb-7">
              Your safety is our priority. Complete all required verification
              steps to confirm the property&apos;s authenticity and
              documentation before making payment.
            </p>

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
                          ? { backgroundColor: "#FF6000", borderColor: "#FF6000" }
                          : undefined
                      }
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                        checked[item.id] ? "" : "bg-white border-gray-300"
                      }`}
                    >
                      {checked[item.id] && (
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
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
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.9 21 3 13.1 3 3.9c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1L6.6 10.8z"
                    fill="#2F6FED"
                  />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-gray-500 mb-0.5">Contact Info</p>
                <p className="text-sm font-semibold text-gray-900">
                  09012345678
                </p>
              </div>
            </div>

            <button
              disabled={!allChecked}
              onClick={() => setModal("confirm")}
              className={`w-full rounded-xl py-3.5 text-[15px] font-semibold text-white transition-colors ${
                allChecked
                  ? "bg-[#05062F]  cursor-pointer"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Proceed
            </button>
            <p className="text-center text-[11px] text-blue-600 mt-2">
              The payment will be deducted from your wallet.
            </p>
          </div>

          <div className="hidden md:flex flex-1 items-center justify-center opacity-21">
            <img
              src={logo}
              alt="Ceproam"
              className="max-w-100 w-full h-auto object-contain"
            />
          </div>
        </div>
      </Wrapper>

      {modal === "skip" && (
        <SkipVerificationModal
          onClose={() => setModal(null)}
          onSkip={handleSkip}
        />
      )}

      {modal === "confirm" && (
        <ConfirmTransferModal
          onClose={() => setModal(null)}
          onConfirm={handleConfirm}
          processing={processing}
        />
      )}

      {modal === "success" && (
        <PurchaseSuccessfulModal
          onClose={() => setModal(null)}
          onBackHome={handleBackHome}
        />
      )}
    </div>
  );
};

export default VerifyProperty;