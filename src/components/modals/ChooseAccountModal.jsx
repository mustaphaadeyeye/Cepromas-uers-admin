import React, { useState } from "react";
import HouseIcon from "../../assets/image/modalhouse.png";
import UBALogo from "../../assets/image/uba.png";
import UBAicon from "../../assets/icons/ubaicon.png";
import { fontFamily } from "../../components/styles/theme";
import { fundWallet, withdrawWallet } from "../../api/wallet";

const ChooseAccountModal = ({ onClose, type, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    accountNumber: "",
    bank: "",
    accountName: "",
  });
  const [amount, setAmount] = useState("");
  const [transactionPin, setTransactionPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successDetails, setSuccessDetails] = useState(null);

  // Robust Error Extraction Helper
  // Robust Error Extraction Helper
  const extractErrorMessage = (err) => {
    // 1. NestJS structured error message (e.g. from BadRequestException)
    const serverMessage = err.response?.data?.message;

    if (serverMessage) {
      if (Array.isArray(serverMessage)) {
        return serverMessage.join(" | ");
      }
      if (typeof serverMessage === "string") {
        return serverMessage;
      }
    }

    // 2. Direct string payload returned from server
    if (
      typeof err.response?.data === "string" &&
      err.response.data.trim().length > 0
    ) {
      return err.response.data;
    }

    // 3. Network or connection failure (when backend is unreachable)
    if (err.code === "ERR_NETWORK" || !err.response) {
      return "Unable to connect to server. Please check your internet connection.";
    }

    // 4. Default clean fallback (Never show raw Axios error strings or status codes)
    return "Failed to process request. Please check your inputs and try again.";
  };

  // Handle Fund Wallet
  const handleFund = async () => {
    if (!amount || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid amount.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");
      const res = await fundWallet(Number(amount), "paystack");

      if (res.paymentLink) {
        window.location.href = res.paymentLink;
      } else {
        setSuccessDetails({
          title: "Wallet Funded!",
          message:
            res.message ||
            "Deposit successful. Your wallet balance has been updated.",
          amount: Number(amount),
        });
        setStep(4);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setErrorMsg(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  // Handle Withdrawal Request
  const handleWithdraw = async () => {
    if (!amount || Number(amount) <= 0) {
      setErrorMsg("Please enter a valid withdrawal amount.");
      return;
    }
    if (!transactionPin) {
      setErrorMsg("Please enter your transaction PIN.");
      return;
    }

    try {
      setLoading(true);
      setErrorMsg("");

      const destinationInfo = `${form.accountName || "Personal Bank"} - ${form.accountNumber || ""} (${(form.bank || "Bank").toUpperCase()})`;
      const res = await withdrawWallet(
        Number(amount),
        transactionPin,
        destinationInfo,
      );

      setSuccessDetails({
        title: "Withdrawal Successful!",
        message:
          res.message ||
          "Your withdrawal request has been processed successfully.",
        amount: Number(amount),
      });
      setStep(4); // Move to custom success view
      if (onSuccess) onSuccess();
    } catch (err) {
      setErrorMsg(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${fontFamily.main}`}
    >
      <div className="bg-white rounded-[20px] w-152.25 min-h-119 flex flex-col items-center justify-center gap-6 relative shadow-xl px-10 py-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100"
        >
          ✕
        </button>

        {/* Error Banner */}
        {errorMsg && (
          <div className="w-full bg-red-50 text-red-600 text-xs p-3 rounded-lg text-center font-medium border border-red-100">
            {errorMsg}
          </div>
        )}

        {/* WITHDRAW: Step 1 - Choose Account */}
        {type === "withdraw" && step === 1 && (
          <>
            <h2 className="text-xl font-bold text-[#0f1c3f]">Choose Account</h2>
            <div className="w-30 h-30">
              <img
                src={HouseIcon}
                alt="House Icon"
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={() => setStep(2)}
              className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-66 h-12.5"
            >
              Add Bank
            </button>
          </>
        )}

        {/* WITHDRAW: Step 2 - Add Bank Details */}
        {type === "withdraw" && step === 2 && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#0f1c3f]">
                Add your account
              </h2>
              <p className="text-gray-400 text-xs mt-1">
                Only add a personal bank account that's linked to your BVN
              </p>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">
                  Account Number
                </label>
                <input
                  type="text"
                  maxLength={11}
                  placeholder="00000000000"
                  value={form.accountNumber}
                  onChange={(e) =>
                    setForm({ ...form, accountNumber: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-4 h-11.25 text-sm outline-none text-gray-800 placeholder:text-gray-300"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">
                  Choose Bank
                </label>
                <div className="relative">
                  <select
                    value={form.bank}
                    onChange={(e) => setForm({ ...form, bank: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 h-11.25 text-sm outline-none text-gray-800 appearance-none cursor-pointer"
                  >
                    <option value="">select bank</option>
                    <option value="uba">UBA</option>
                    <option value="gtb">GTBank</option>
                    <option value="access">Access Bank</option>
                    <option value="zenith">Zenith Bank</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                    ▾
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">
                  Account Name
                </label>
                <input
                  type="text"
                  placeholder="enter account name"
                  value={form.accountName}
                  onChange={(e) =>
                    setForm({ ...form, accountName: e.target.value })
                  }
                  className="border border-gray-200 rounded-lg px-4 h-11.25 text-sm outline-none text-gray-800 placeholder:text-gray-300"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(3)}
              className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-full h-12.5"
            >
              Continue
            </button>
          </>
        )}

        {/* WITHDRAW: Step 3 - Confirm Withdrawal Form */}
        {type === "withdraw" && step === 3 && (
          <>
            <h2 className="text-xl font-bold text-[#0f1c3f]">
              Confirm Withdrawal
            </h2>
            <div className="w-91 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={UBALogo}
                  alt="UBA"
                  className="w-10 h-10 object-contain"
                />
                <div className="flex flex-col">
                  <span className="text-[#0f1c3f] font-semibold text-sm">
                    {form.accountName || "John Abraham"}
                  </span>
                  <span className="text-gray-400 text-xs">
                    {form.accountNumber || "12345678901"}
                  </span>
                </div>
              </div>
              <img src={UBAicon} alt="toggle" className="object-contain" />
            </div>

            <div className="w-full flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 placeholder:text-gray-300 w-full"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">
                  Transaction PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  placeholder="Enter PIN"
                  value={transactionPin}
                  onChange={(e) => setTransactionPin(e.target.value)}
                  className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 placeholder:text-gray-300 w-full"
                />
              </div>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={loading}
              className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-full h-12.5 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Submit Withdrawal"}
            </button>
          </>
        )}

        {/* ADD MONEY: Fund Wallet */}
        {type === "addmoney" && step === 1 && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#0f1c3f]">Fund Wallet</h2>
              <p className="text-gray-400 text-sm mt-1">
                Enter the amount you'd like to add to your wallet.
              </p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-[#0f1c3f] font-medium">
                Enter Amount (₦)
              </label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 placeholder:text-gray-300 w-full"
              />
            </div>
            <button
              onClick={handleFund}
              disabled={loading}
              className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-full h-12 disabled:opacity-50"
            >
              {loading ? "Processing..." : "Proceed"}
            </button>
          </>
        )}

        {/* CUSTOM SUCCESS MODAL VIEW (Step 4) */}
        {step === 4 && successDetails && (
          <div className="flex flex-col items-center text-center gap-4 py-2">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-sm">
              ✓
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#0f1c3f]">
                {successDetails.title}
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                {successDetails.message}
              </p>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 w-full text-center">
              <span className="text-xs text-gray-400 uppercase tracking-wider block">
                Total Amount
              </span>
              <span className="text-2xl font-bold text-[#0f1c3f] mt-1 block">
                ₦{Number(successDetails.amount).toLocaleString()}
              </span>
            </div>
            <button
              onClick={onClose}
              className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-full h-12.5 mt-2"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChooseAccountModal;
