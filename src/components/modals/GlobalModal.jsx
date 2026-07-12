import React from "react";
import {
  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
  FaTimes,
} from "react-icons/fa";

const GlobalModal = ({
  isOpen,
  onClose,
  onCancel,
  type = "success",
  title,
  message,
  confirmText = "Continue",
  cancelText = "Cancel",
}) => {
  if (!isOpen) return null;

  const config = {
    success: {
      icon: <FaCheckCircle className="text-[#0E1D70]" size={32} />,
      iconBg: "bg-[#E8EEFF]",
      titleColor: "text-[#05062F]",
      messageColor: "text-[#64748B]",
      buttonBg: "bg-[#0E1D70]",
      buttonHover: "hover:bg-[#07104b]",
      secondaryBorder: "border-[#0E1D70]",
      confirmTextColor: "text-white",
    },
    error: {
      icon: <FaExclamationTriangle className="text-[#EC2614]" size={32} />,
      iconBg: "bg-[#FEEFEF]",
      titleColor: "text-[#05062F]",
      messageColor: "text-[#64748B]",
      buttonBg: "bg-[#EC2614]",
      buttonHover: "hover:bg-[#c81d12]",
      secondaryBorder: "border-[#EC2614]",
      confirmTextColor: "text-white",
    },
    info: {
      icon: <FaInfoCircle className="text-[#0E1D70]" size={32} />,
      iconBg: "bg-[#E8EEFF]",
      titleColor: "text-[#05062F]",
      messageColor: "text-[#64748B]",
      buttonBg: "bg-[#0E1D70]",
      buttonHover: "hover:bg-[#07104b]",
      secondaryBorder: "border-[#0E1D70]",
      confirmTextColor: "text-white",
    },
  };

  const theme = config[type] || config.info;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-[32px] border border-[#E5E7EB] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.18)]">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#64748B] transition hover:bg-[#F8FAFC] hover:text-[#0F172A]"
          >
            <FaTimes size={14} />
          </button>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${theme.iconBg} shadow-sm`}
          >
            {theme.icon}
          </div>

          <div>
            <h3 className={`text-2xl font-semibold ${theme.titleColor}`}>
              {title}
            </h3>
            <p className={`mt-3 text-sm leading-6 ${theme.messageColor}`}>
              {message}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onClose}
            className={`min-w-[160px] rounded-full px-5 py-3 text-sm font-semibold ${theme.confirmTextColor} ${theme.buttonBg} ${theme.buttonHover} transition`}
          >
            {confirmText}
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className={`min-w-[160px] rounded-full border px-5 py-3 text-sm font-semibold text-[#0E1D70] ${theme.secondaryBorder} bg-white transition hover:bg-[#F8FAFC]`}
            >
              {cancelText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalModal;
