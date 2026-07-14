import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Wrapper from "../../components/wrapper/Wrapper";
import ProfileImg from "../../assets/image/profile.png";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import TransferIcon from "../../assets/icons/transfericon.png";
import PersonalIcon from "../../assets/icons/UserCircle.png";
import ReferralIcon from "../../assets/icons/UsersFour.png";
import SecurityIcon from "../../assets/icons/Keyhole.png";
import HouseIcon from "../../assets/icons/House.png";
import ContactIcon from "../../assets/icons/PhoneCall.png";
import LogoutIcon from "../../assets/icons/SignOut.png";
import EditIcon from "../../assets/icons/PencilSimpleLine.png";
import InviteCode from "./InviteCode";
import LoginPwdIcon from "../../assets/icons/LoginPwd.png";
import SettingsModal from "../../components/modals/SettingsModal";
import SecurityBgIcon from "../../assets/icons/securityicon.png";
import ContactChat from "../../components/chatandconditions/ContactChat";
import Pagination from "../../components/buttons/Pagination";
import Button from "../../components/buttons/Button";
import { useAuthStore } from "../../stores/auth.store";

// Use our profile, security and referral hooks
import { useProfile, useUpdateProfile } from "../../hooks/profile/useProfile";
import { useReferrals } from "../../hooks/profile/useReferrals";

const menuItems = [
  { id: "personal", label: "Personal Information", icon: PersonalIcon },
  { id: "properties", label: "Managed Properties", icon: HouseIcon },
  { id: "referrals", label: "Referrals", icon: ReferralIcon },
  { id: "security", label: "Security", icon: SecurityIcon },
  { id: "contact", label: "Contact Us", icon: ContactIcon },
  { id: "logout", label: "Logout", icon: LogoutIcon },
];

const securityItems = [
  {
    label: "Login Password",
    sub: "Change your login password",
    icon: LoginPwdIcon,
  },
  { label: "Transaction Pin", sub: "Set transaction pin", icon: LoginPwdIcon },
];

// ==========================================================
// 1. PERSONAL INFORMATION (Live connected with GET & PATCH)
// ==========================================================
const PersonalInformation = () => {
  const [editField, setEditField] = useState(null);
  const { data: user, isLoading } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  // Local state to manage live field value mutations
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
        occupation: user.occupation || "",
        nin: user.nin || "",
      });
    }
  }, [user]);

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading your profile details...
      </p>
    );
  }

  const personalFields = [
    { label: "Full Name", key: "fullName", value: formData.fullName },
    { label: "Email", key: "email", value: formData.email },
    { label: "Phone Number", key: "phoneNumber", value: formData.phoneNumber },
    { label: "Address", key: "address", value: formData.address },
    { label: "Occupation", key: "occupation", value: formData.occupation },
    { label: "Nin", key: "nin", value: formData.nin || "Not Provided" },
  ];

  const handleSave = () => {
    updateProfile(formData);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-center gap-2 mb-2">
        <div className="relative">
          <img
            src={user?.faceCaptureUrl || ProfileImg}
            alt="profile"
            className="w-50 h-50 rounded-full object-cover"
          />
          <button className="absolute bottom-5 right-10 bg-gray-200 rounded-full p-1 shadow hover:bg-gray-300 transition cursor-pointer">
            <img src={EditIcon} alt="edit" className="w-3.5 h-3.5" />
          </button>
        </div>
        <span
          className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
        >
          {user?.fullName}
        </span>
      </div>

      {personalFields.map((field) => (
        <div
          key={field.label}
          className="flex items-start justify-between border-b border-gray-100 pb-4"
        >
          <div className="flex flex-col gap-1">
            <span
              className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
            >
              {field.label}
            </span>
            <span
              className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}
            >
              {field.value}
            </span>
          </div>
          <button
            onClick={() => setEditField(field)}
            className="p-2 rounded-full bg-gray-100 transition cursor-pointer hover:bg-gray-200"
          >
            <img src={EditIcon} alt="edit" className="w-4 h-4" />
          </button>
        </div>
      ))}

      {editField && (
        <SettingsModal
          type="details"
          field={editField.label}
          value={editField.value}
          onClose={() => setEditField(null)}
          onSave={(newValue) => {
            setFormData((prev) => ({ ...prev, [editField.key]: newValue }));
            setEditField(null);
          }}
        />
      )}

      <div className="flex justify-center mt-10">
        <Button
          text={isPending ? "Saving..." : "Save"}
          bg="bg-[#05062F]"
          width="w-[330px]"
          height="h-[50px]"
          disabled={isPending}
          rounded="rounded-[10px]"
          className={`text-white ${fontSize.md} ${fontWeight.medium} ${fontFamily.main}`}
          onClick={handleSave}
        />
      </div>
    </div>
  );
};

// ==========================================================
// 2. MANAGED PROPERTIES (Connected with user investments)
// ==========================================================
// Managed properties are mapped as active portfolio subscriptions!
const ManagedProperties = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { data: user, isLoading } = useProfile();

  if (isLoading) {
    return (
      <p className="text-center py-10 text-gray-500">
        Loading your property portfolio...
      </p>
    );
  }

  // Fallback map if the user hasn't active property entries in database subscriptions relation
  const activeProperties = user?.subscriptions || [];

  return (
    <div className="flex flex-col gap-5 py-5">
      <p
        className={`${fontSize.lg} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
      >
        Bought Properties
      </p>

      <div className="flex flex-col gap-4">
        {activeProperties.length === 0 ? (
          <p className="text-gray-400 text-center py-10">
            No purchased properties in your portfolio yet.
          </p>
        ) : (
          activeProperties.map((sub) => {
            const pkg = sub.package; // Holds details of the associated package
            return (
              <div
                key={sub.id}
                onClick={() =>
                  setSelectedItem({
                    ...pkg,
                    amount: `₦${Number(sub.amount).toLocaleString()}`,
                    date: new Date(sub.startDate).toLocaleDateString(),
                    roi: `${pkg.roi}%`,
                    duration: `${pkg.durationMonths} months`,
                    interestEarned: `₦${((sub.amount * pkg.roi) / 100).toLocaleString()}`,
                    transactionId: sub.id.slice(0, 15),
                  })
                }
                className="bg-white rounded-[10px] shadow border-[0.2px] border-[#CCCCCCB2] p-5 flex flex-col gap-4 cursor-pointer hover:shadow-md transition duration-200"
              >
                <p
                  className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
                >
                  {pkg?.name || "Premium Real Estate Package"}
                </p>

                <div className="flex items-start justify-between">
                  <div className="flex flex-col gap-1">
                    <p
                      className={`${fontSize.xs} ${fontWeight.medium} ${textColor.secondary} ${fontFamily.main}`}
                    >
                      Location
                    </p>
                    <p
                      className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
                    >
                      {pkg?.location || "Lagos"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 text-right">
                    <p
                      className={`${fontSize.xs} ${fontWeight.medium} ${textColor.secondary} ${fontFamily.main}`}
                    >
                      Purchase Amount
                    </p>
                    <p
                      className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
                    >
                      ₦{Number(sub.amount).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="4"
                      width="18"
                      height="18"
                      rx="2"
                      stroke="#888"
                      strokeWidth="1.8"
                    />
                    <path
                      d="M16 2v4M8 2v4M3 10h18"
                      stroke="#888"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <p
                    className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}
                  >
                    Date Purchased:{" "}
                    {new Date(sub.startDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {selectedItem && (
        <SettingsModal
          type="property"
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

// ==========================================================
// 3. REFERRALS (Connected with Reward Balance & Invite Code)
// ==========================================================
const Referrals = () => {
  const { data: user } = useProfile();
  const { data: referralData, isLoading } = useReferrals();

  const rewardBalance = user?.rewardBalance ?? 0;
  const referralCount = referralData?.history?.length ?? 0;
  const inviteCode = referralData?.referralCode || user?.referralCode || "N/A";

  return (
    <div>
      <div className="flex justify-center items-center flex-col">
        <div
          style={{
            background: "linear-gradient(135deg, #6B7FD4 0%, #8B9FE8 100%)",
          }}
          className="rounded-md p-5 md:p-10 w-full xl:w-160 h-40"
        >
          <div className="flex items-center justify-between">
            <h1
              className={`${fontSize.lg} ${fontWeight.normal} ${textColor.white} ${fontFamily.main}`}
            >
              Reward Balance
            </h1>
            <h1
              className={`${fontSize["4xl"]} ${fontWeight.medium} ${textColor.white} ${fontFamily.main}`}
            >
              {referralCount}
            </h1>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`${fontSize["4xl"]} ${fontWeight.medium} ${textColor.white} ${fontFamily.main} mt-2`}
            >
              ₦{Number(rewardBalance).toLocaleString()}
            </p>
            <p
              className={`${fontSize.sm} ${fontWeight.normal} ${textColor.white} ${fontFamily.main} mt-2`}
            >
              Referrals
            </p>
          </div>
        </div>
      </div>

      <div className="px-4 mt-8">
        <p className={`${fontSize.lg} ${fontWeight.medium} ${fontFamily.main}`}>
          Invite and Earn
        </p>
        <p
          className={`${fontSize.lg} ${fontWeight.normal} ${fontFamily.main} ${textColor.primary} mt-1`}
        >
          Share your referral invite link with friends and receive reward
          bonuses instantly inside your balance wallet upon their sign-up
          verification check!
        </p>
      </div>

      <div className="flex justify-center my-8">
        <img src={TransferIcon} alt="" />
      </div>

      <div className="flex justify-center my-2">
        <InviteCode code={inviteCode} />
      </div>
    </div>
  );
};

// ==========================================================
// 4. SECURITY & MODALS (Binds custom handlers down to Modal inputs)
// ==========================================================
const Security = () => {
  const [securityModal, setSecurityModal] = useState(null);

  return (
    <div className="flex flex-col gap-5 xl:px-12 lg:px-8 md:px-4 px-2">
      {securityItems.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between border-b border-gray-100 pb-4"
        >
          <div className="flex flex-col gap-1">
            <span
              className={`${fontSize.sm} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
            >
              {item.label}
            </span>
            <span
              className={`${fontSize.xs} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}
            >
              {item.sub}
            </span>
          </div>
          <button
            onClick={() => setSecurityModal(item.label)}
            className="p-2 rounded-lg transition cursor-pointer hover:bg-gray-50"
          >
            <img src={item.icon} alt={item.label} />
          </button>
        </div>
      ))}

      <div className="flex justify-center mt-10 opacity-10">
        <img src={SecurityBgIcon} alt="security" className="mt-10" />
      </div>

      {securityModal === "Login Password" && (
        <SettingsModal type="password" onClose={() => setSecurityModal(null)} />
      )}
      {securityModal === "Transaction Pin" && (
        <SettingsModal type="pin" onClose={() => setSecurityModal(null)} />
      )}
    </div>
  );
};

// Contact Us
const ContactUs = () => (
  <div className="flex flex-col h-full">
    <ContactChat variant="settings" />
  </div>
);

// Content map
const contentMap = {
  personal: <PersonalInformation />,
  properties: <ManagedProperties />,
  referrals: <Referrals />,
  security: <Security />,
  contact: <ContactUs />,
  logout: null,
};

// Main Layout
const SettingsLayout = () => {
  const [active, setActive] = useState("personal");
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const { data: user } = useProfile();

  const handleMenu = (id) => {
    if (id === "logout") {
      setShowLogout(true);
      return;
    }
    setActive(id);
    setMobileDetailOpen(true);
  };

  const handleConfirmLogout = () => {
    setShowLogout(false);
    logout();
    navigate("/", { replace: true });
  };

  const activeItem = menuItems.find((item) => item.id === active);

  return (
    <div>
      <Wrapper>
        {/*  MOBILE / TABLET   */}
        <div className="lg:hidden">
          {!mobileDetailOpen ? (
            /* Menu list screen */
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center gap-2 mt-2">
                <img
                  src={user?.faceCaptureUrl || ProfileImg}
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover"
                />
                <span
                  className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
                >
                  {user?.fullName || "Loading..."}
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleMenu(item.id)}
                    className="flex items-center gap-3 bg-white rounded-2xl px-5 py-4 shadow-sm text-left transition hover:bg-gray-50 cursor-pointer"
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      className="w-5 h-5 shrink-0"
                    />
                    <span
                      className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}
                    >
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Detail screen for the selected menu item */
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setMobileDetailOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-100 transition cursor-pointer"
                  aria-label="Back"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 18l-6-6 6-6"
                      stroke="#05062F"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <span
                  className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
                >
                  {activeItem?.label}
                </span>
              </div>

              <div className="bg-white rounded-2xl p-5 flex-1 flex flex-col">
                {contentMap[active]}
              </div>
            </div>
          )}
        </div>

        {/* DESKTOP (lg and up)*/}
        <div className="hidden lg:flex gap-6 items-stretch">
          {/* Left panel */}
          <div className="flex w-100 shrink-0 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl p-5 flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <img
                  src={user?.faceCaptureUrl || ProfileImg}
                  alt="profile"
                  className="w-50 h-50 rounded-full object-cover"
                />
                <button className="absolute bottom-5 right-10 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition">
                  <img src={EditIcon} alt="edit" className="w-3.5 h-3.5" />
                </button>
              </div>
              <span
                className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
              >
                {user?.fullName || "Loading..."}
              </span>
            </div>

            <div className="w-full flex flex-col gap-6">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenu(item.id)}
                  className={`
                    flex items-center gap-3 px-4 py-5 w-full text-left
                    transition duration-200 whitespace-nowrap
                    shadow-sm rounded-xl cursor-pointer
                    ${active === item.id ? "bg-[#DBE8FD]" : "bg-white hover:bg-gray-50"}
                  `}
                >
                  <img
                    src={item.icon}
                    alt={item.label}
                    className="w-5 h-5 shrink-0"
                  />
                  <span
                    className={`${fontSize.sm} ${fontWeight.normal} ${textColor.primary} ${fontFamily.main}`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div
            className={`flex-1 bg-white shadow-[100px_100px_100px_100px_rgba(0,0,0,0.1)] rounded-2xl px-20 py-5 flex flex-col gap-6 ${fontFamily.main} h-full`}
          >
            <div className="flex-1 flex flex-col h-full">
              {contentMap[active]}
            </div>
          </div>
        </div>

        {/* Logout modal */}
        {showLogout && (
          <SettingsModal
            type="logout"
            onClose={() => setShowLogout(false)}
            onConfirmLogout={handleConfirmLogout}
          />
        )}
      </Wrapper>
    </div>
  );
};

export default SettingsLayout;
