import React from "react";

const GlobalLoader = ({ label = "Please wait" }) => {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-white/60 bg-white/95 p-6 shadow-[0_20px_70px_rgba(2,2,77,0.18)]">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F7FF]">
            <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#02024D]/20 border-t-[#02024D]" />
            <div className="absolute inset-0 rounded-full border border-[#C7D2FE]" />
          </div>

          <h3 className="text-lg font-semibold text-[#111827]">{label}</h3>
          <p className="mt-2 text-sm text-[#6B7280]">
            Setting up your account securely. This should only take a moment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoader;
