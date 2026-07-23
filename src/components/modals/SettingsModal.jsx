import React, { useState, useEffect } from "react";
import {
  fontFamily,
  fontSize,
  fontWeight,
  textColor,
} from "../../components/styles/theme";
import Button from "../buttons/Button";
import toast from "react-hot-toast";

const SettingsModal = ({
  onClose,
  field,
  value,
  type,
  item,
  onConfirmLogout,
  onSave, // Handles detail edits (Full Name, Address, etc.)
  onSubmitPassword, // Handles password updates
  onSubmitPin, // Handles transaction PIN updates
  isPending = false,
}) => {
  // Local state for single text field edits
  const [detailInput, setDetailInput] = useState(value || "");

  // Local state for password change fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Local state for PIN change fields
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);

  // Keep detail input in sync if prop changes
  useEffect(() => {
    setDetailInput(value || "");
  }, [value]);

  const handlePinChange = (val, index, setter, state) => {
    const updated = [...state];
    updated[index] = val.slice(-1);
    setter(updated);
  };

  const PinBoxes = ({ value, setter }) => (
    <div className="flex gap-2 sm:gap-3">
      {value.map((v, i) => (
        <input
          key={i}
          type="password"
          maxLength={1}
          value={v}
          disabled={isPending}
          onChange={(e) => handlePinChange(e.target.value, i, setter, value)}
          className="w-full max-w-[80px] h-12 sm:h-14 border border-gray-200 rounded-lg text-center text-lg outline-none bg-gray-50 focus:border-[#05062F] transition duration-200"
        />
      ))}
    </div>
  );

  // 1. SAVE DETAIL (e.g. Full Name, Address)
  const handleDetailSave = () => {
    if (onSave) {
      onSave(detailInput);
    } else {
      onClose();
    }
  };

  // 2. SAVE PASSWORD
  const handlePasswordSave = () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both old and new passwords");
      return;
    }
    if (onSubmitPassword) {
      onSubmitPassword({ oldPassword, newPassword });
    } else {
      onClose();
    }
  };

  // 3. SAVE PIN
  const handlePinSave = () => {
    const pinStr = pin.join("");
    const confirmPinStr = confirmPin.join("");

    if (pinStr.length < 4) {
      toast.error("Please enter a full 4-digit PIN");
      return;
    }
    if (pinStr !== confirmPinStr) {
      toast.error("Transaction PINs do not match");
      return;
    }

    if (onSubmitPin) {
      onSubmitPin({ transactionPin: pinStr });
    } else {
      onClose();
    }
  };

  const propertyRows = item
    ? [
        { label: "Amount", value: item.amount },
        { label: "ROI", value: item.roi },
        { label: "Duration", value: item.duration },
        { label: "Interest Earned", value: item.interestEarned },
        { label: "Transaction ID", value: item.transactionId },
        { label: "Date:", value: item.date || item.rawDate },
      ]
    : [];

  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4 ${fontFamily.main}`}
    >
      {/* ================= EDIT DETAILS MODAL ================= */}
      {type === "details" && (
        <div className="bg-white rounded-[20px] w-full max-w-[420px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-6">
          <button
            onClick={onClose}
            disabled={isPending}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Edit {field}</h2>
          <div className="w-full flex flex-col gap-1">
            <label className="text-sm text-[#0f1c3f] font-medium">
              {field}
            </label>
            <input
              type="text"
              value={detailInput}
              disabled={isPending}
              onChange={(e) => setDetailInput(e.target.value)}
              autoComplete="off"
              className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 w-full bg-gray-50 focus:border-[#05062F] transition duration-200"
            />
          </div>
          <Button
            onClick={handleDetailSave}
            text={isPending ? "Saving..." : "Save"}
            disabled={isPending}
            width="w-full max-w-[257px]"
            height="h-[50px]"
            bg="bg-[#05062F]"
            className="text-white cursor-pointer rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-[#0c0f4f] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* ================= EDIT PASSWORD MODAL ================= */}
      {type === "password" && (
        <div className="bg-white rounded-[20px] w-full max-w-[420px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-6">
          <button
            onClick={onClose}
            disabled={isPending}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f]">Change Password</h2>

          <div className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-[#0f1c3f] font-medium">
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter current password"
                value={oldPassword}
                disabled={isPending}
                onChange={(e) => setOldPassword(e.target.value)}
                autoComplete="current-password"
                className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 w-full bg-gray-50 focus:border-[#05062F] transition duration-200"
              />
            </div>

            <div className="w-full flex flex-col gap-1">
              <label className="text-sm text-[#0f1c3f] font-medium">
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                disabled={isPending}
                onChange={(e) => setNewPassword(e.target.value)}
                autoComplete="new-password"
                className="border border-gray-200 rounded-lg px-4 h-11 text-sm outline-none text-gray-800 w-full bg-gray-50 focus:border-[#05062F] transition duration-200"
              />
            </div>
          </div>

          <Button
            onClick={handlePasswordSave}
            text={isPending ? "Updating..." : "Save"}
            disabled={isPending}
            width="w-full max-w-[257px]"
            height="h-[50px]"
            bg="bg-[#05062F]"
            className="text-white cursor-pointer rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-[#0c0f4f] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* ================= EDIT TRANSACTION PIN MODAL ================= */}
      {type === "pin" && (
        <div className="bg-white rounded-[20px] w-full max-w-[425px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-6">
          <button
            onClick={onClose}
            disabled={isPending}
            className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100 transition"
          >
            ✕
          </button>
          <h2 className="text-xl font-bold text-[#0f1c3f] text-center">
            Set Transaction PIN
          </h2>
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#0f1c3f] font-medium">
                Transaction PIN
              </label>
              <PinBoxes value={pin} setter={setPin} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm text-[#0f1c3f] font-medium">
                Confirm Transaction PIN
              </label>
              <PinBoxes value={confirmPin} setter={setConfirmPin} />
            </div>
          </div>
          <Button
            onClick={handlePinSave}
            text={isPending ? "Setting PIN..." : "Save"}
            disabled={isPending}
            width="w-full max-w-[257px]"
            height="h-[50px]"
            bg="bg-[#05062F]"
            className="text-white cursor-pointer rounded-lg font-semibold text-sm transition-all duration-200 hover:bg-[#0c0f4f] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          />
        </div>
      )}

      {/* ================= PROPERTY SUMMARY MODAL ================= */}
      {type === "property" && item && (
        <div className="bg-white rounded-[20px] w-full max-w-[430px] flex flex-col relative shadow-xl p-6 sm:p-8 gap-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 cursor-pointer hover:bg-gray-100 transition"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="#888"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <p
            className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary} pr-8`}
          >
            {item.name || item.title}
          </p>
          <div className="flex flex-col gap-4">
            {propertyRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 border-b border-gray-100 pb-3"
              >
                <p
                  className={`${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} ${textColor.secondary}`}
                >
                  {row.label}
                </p>
                <p
                  className={`${fontSize.sm} ${fontWeight.medium} ${fontFamily.main} ${textColor.primary} text-right break-all`}
                >
                  {row.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= LOGOUT MODAL ================= */}
      {type === "logout" && (
        <div className="bg-white rounded-[20px] w-full max-w-[360px] flex flex-col items-center relative shadow-xl p-6 sm:p-8 gap-5">
          <h2 className="text-xl font-bold text-[#0f1c3f]">Log Out?</h2>
          <p className="text-sm text-gray-500 text-center leading-relaxed">
            Are you sure you want to log out of your account? You'll need to log
            in again to access your dashboard.
          </p>
          <div className="w-full flex flex-col items-center gap-3 mt-2">
            <Button
              onClick={onConfirmLogout}
              text="Logout"
              width="w-full max-w-[257px]"
              height="h-[50px]"
              bg="bg-[#E02020]"
              className="text-white cursor-pointer rounded-xl font-semibold text-sm transition-all duration-200 hover:bg-[#c81919] active:scale-95"
            />
            <Button
              onClick={onClose}
              text="Cancel"
              width="w-full max-w-[257px]"
              height="h-[50px]"
              bg="bg-white"
              className="text-[#0f1c3f] cursor-pointer rounded-xl font-semibold text-sm border border-gray-200 transition-all duration-200 hover:bg-gray-50 active:scale-95"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsModal;
