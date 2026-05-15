// BadgeButton.jsx
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
  bgColor,
} from "../../components/styles/theme"

export default function BadgeButton({ icon, label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="inline-flex items-center gap-2.5  px-4 py-2.5 bg-[#B8CCFF] rounded-[6px] shadow-[0_0_0_1px_rgba(100,120,220,0.15),0_1px_4px_rgba(30,50,140,0.07)] hover:-translate-y-px hover:bg-[#dce4ff] active:translate-y-0 transition-all disabled:opacity-40 disabled:cursor-not-allowed border-0 cursor-pointer"
    >
      <span className="flex items-center justify-center">
        <img src={icon} alt="" className="" />
      </span>
      <span className={`${textColor.primary} ${fontSize.sm} ${fontWeight.normal} ${fontFamily.main} whitespace-nowrap`}>
        {label}
      </span>
    </button>
  );
}