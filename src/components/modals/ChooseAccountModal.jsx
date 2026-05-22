import React, { useState } from 'react'
import HouseIcon from "../../assets/image/modalhouse.png"
import UBALogo from "../../assets/image/uba.png"
import UBAicon from "../../assets/icons/ubaicon.png"
import { fontFamily } from "../../components/styles/theme";

const ChooseAccountModal = ({ onClose, type }) => {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ accountNumber: '', bank: '', accountName: '' })
  const [amount, setAmount] = useState('')

  return (
    <div className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${fontFamily.main}`}>
      <div className="bg-white rounded-[20px] w-152.25 h-119 flex flex-col items-center justify-center gap-6 relative shadow-xl px-10">

        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100">
          ✕
        </button>

        {/* WITHDRAW  Choose Account */}
        {type === 'withdraw' && step === 1 && (
          <>
            <h2 className="text-xl font-bold text-[#0f1c3f]">Choose Account</h2>
            <div className="w-30 h-30">
              <img src={HouseIcon} alt="House Icon" className="w-full h-full object-contain" />
            </div>
            <button onClick={() => setStep(2)} className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-66 h-12.5">
              Add Bank
            </button>
          </>
        )}

        {/* WITHDRAW - Add Account Form */}
        {type === 'withdraw' && step === 2 && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#0f1c3f]">Add your account</h2>
              <p className="text-gray-400 text-xs mt-1">Only add a personal bank account that's linked to your BVN</p>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">Account Number</label>
                <input type="text" maxLength={11} placeholder="00000000000" value={form.accountNumber}
                  onChange={(e) => setForm({ ...form, accountNumber: e.target.value })}
                  className="border border-gray-200 rounded-lg px-4 h-11.25 text-sm outline-none text-gray-400 placeholder:text-gray-300" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">Choose Bank</label>
                <div className="relative">
                  <select value={form.bank} onChange={(e) => setForm({ ...form, bank: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 h-11.25 text-sm outline-none text-gray-400 appearance-none cursor-pointer">
                    <option value="">select bank</option>
                    <option value="uba">UBA</option>
                    <option value="gtb">GTBank</option>
                    <option value="access">Access Bank</option>
                    <option value="zenith">Zenith Bank</option>
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">▾</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm text-[#0f1c3f] font-medium">Account Name</label>
                <input type="text" placeholder="enter account name" value={form.accountName}
                  onChange={(e) => setForm({ ...form, accountName: e.target.value })}
                  className="border border-gray-200 rounded-lg px-4 h-11.25 text-sm outline-none text-gray-400 placeholder:text-gray-300" />
              </div>
            </div>
            <button onClick={() => setStep(3)} className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-full h-12.5">
              Add Bank
            </button>
          </>
        )}

        {/* WITHDRAW  UBA Card */}
        {type === 'withdraw' && step === 3 && (
          <>
            <h2 className="text-xl font-bold text-[#0f1c3f]">Choose Account</h2>
            <div className="w-91 border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={UBALogo} alt="UBA" className="w-10 h-10 object-contain" />
                <div className="flex flex-col">
                  <span className="text-[#0f1c3f] font-semibold text-sm">John Abraham</span>
                  <span className="text-gray-400 text-xs">12345678901</span>
                </div>
              </div>
              <img src={UBAicon} alt="toggle" className="object-contain" />
            </div>
            <button onClick={onClose} className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-66 h-12.5">
              Add Bank
            </button>
          </>
        )}

        {/* ADD MONEY - Fund Wallet */}
        {type === 'addmoney' && (
          <>
            <div className="text-center">
              <h2 className="text-xl font-bold text-[#0f1c3f]">Fund Wallet</h2>
              <p className="text-gray-400 text-sm mt-1">Enter the amount you'd like to add to your wallet.</p>
            </div>
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-[#0f1c3f] font-medium">Enter Amount</label>
              <input type="text" placeholder="00000000000" value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-400 placeholder:text-gray-300 w-full" />
            </div>
            <button onClick={onClose} className="bg-[#0f1c3f] cursor-pointer text-white rounded-lg font-semibold text-sm hover:bg-[#1a2f5e] active:scale-95 transition-all w-full h-12">
              Proceed
            </button>
          </>
        )}

      </div>
    </div>
  )
}

export default ChooseAccountModal