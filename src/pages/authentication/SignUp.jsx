import React, { useMemo, useState } from "react";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/image/cepromasLogo.svg";
import Button from "../../components/buttons/Button";
import GlobalLoader from "../../components/loaders/GlobalLoader";
import GlobalModal from "../../components/modals/GlobalModal";
import { fontFamily } from "../../components/styles/theme";
import { useSignup } from "../../hooks/auth/useSignup";
import Face from "../../assets/icons/faceid.png";

const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

const SignUp = () => {
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [skipFaceCapture, setSkipFaceCapture] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });
  const navigate = useNavigate();

  const {
    mutate,
    isPending: isLoading,
    error: backendError,
    reset: resetMutation,
  } = useSignup(
    () => {
      setModalConfig({
        isOpen: true,
        type: "success",
        title: "Account created",
        message:
          "Your account has been created successfully. Please log in to continue.",
      });
      resetMutation();
    },
    (message) => {
      setModalConfig({
        isOpen: true,
        type: "error",
        title: "Signup failed",
        message,
      });
      resetMutation();
    },
  );

  const [localErrors, setLocalErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    referralCode: "",
    occupation: "",
    state: "",
    role: "user",
    password: "",
    confirmPassword: "",
    nin: "",
    faceCaptureUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (localErrors[name] || localErrors._global)
      setLocalErrors((p) => ({ ...p, [name]: undefined, _global: undefined }));
  };

  const backendFieldErrors = useMemo(() => {
    const map = {};
    const data = backendError?.response?.data;
    if (!data) return map;
    const push = (field, msg) => {
      if (!msg) return;
      map[field] = map[field] ? [...map[field], msg] : [msg];
    };
    if (
      data.message &&
      typeof data.message === "object" &&
      !Array.isArray(data.message)
    ) {
      Object.entries(data.message).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach((x) => push(k, x));
        else push(k, v);
      });
    }
    const errors = data.errors || data.error;
    if (Array.isArray(errors)) {
      errors.forEach((e) => {
        if (typeof e === "string") {
          const parts = e.split(":");
          if (parts.length > 1)
            push(parts[0].trim(), parts.slice(1).join(":").trim());
          else map._global = map._global ? [...map._global, e] : [e];
        } else if (e.param || e.field) {
          push(e.param || e.field, e.msg || e.message || JSON.stringify(e));
        } else if (e.msg) {
          map._global = map._global ? [...map._global, e.msg] : [e.msg];
        }
      });
    } else if (errors && typeof errors === "object") {
      Object.entries(errors).forEach(([k, v]) => {
        if (Array.isArray(v)) v.forEach((x) => push(k, x));
        else push(k, v);
      });
    }
    if (data.message && typeof data.message === "string")
      map._global = map._global
        ? [...map._global, data.message]
        : [data.message];
    return map;
  }, [backendError]);

  const getFieldError = (fieldName) => {
    if (localErrors && localErrors[fieldName]) return localErrors[fieldName];
    if (backendFieldErrors && backendFieldErrors[fieldName])
      return Array.isArray(backendFieldErrors[fieldName])
        ? backendFieldErrors[fieldName].join(". ")
        : backendFieldErrors[fieldName];
    return null;
  };

  const getInputClass = (fieldName) => {
    const hasError = !!getFieldError(fieldName);
    return `w-full h-[48px] px-4 bg-[#F8FAFC] rounded-md outline-none text-sm placeholder:text-gray-300 transition duration-200 ${
      hasError
        ? "border border-red-500 focus:border-red-500"
        : "border border-[#E5E7EB] focus:border-[#2540A8]"
    }`;
  };

  const getRoleClass = () => {
    const hasError = !!getFieldError("role");
    return `grid grid-cols-2 gap-3 mt-2 p-px rounded-md ${
      hasError ? "border border-red-500 bg-red-50" : ""
    }`;
  };

  const isActionDisabled = useMemo(() => {
    if (step === 1) {
      return (
        !form.fullName.trim() ||
        !form.email.trim() ||
        !form.phoneNumber.trim() ||
        !form.address.trim() ||
        !agreed
      );
    }
    if (step === 2) {
      return (
        !form.occupation.trim() ||
        !form.state ||
        !form.role ||
        !form.password ||
        !form.confirmPassword ||
        form.password !== form.confirmPassword
      );
    }
    if (step === 3) {
      return !form.nin.trim() || !/^[0-9]{6,16}$/.test(form.nin.trim());
    }
    if (step === 4) {
      return !form.faceCaptureUrl && !skipFaceCapture;
    }
    return true;
  }, [step, form, agreed, skipFaceCapture]);

  const validateStepOne = () => {
    const errs = {};
    if (!form.fullName || !form.fullName.trim())
      errs.fullName = "Full name is required";
    if (!form.email || !form.email.trim()) errs.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      errs.email = "Enter a valid email";
    if (!form.phoneNumber || !form.phoneNumber.trim())
      errs.phoneNumber = "Phone number is required";
    if (!form.address || !form.address.trim())
      errs.address = "Address is required";
    if (!agreed) errs._global = "You must agree to the Terms & Conditions";
    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStepTwo = () => {
    const errs = {};
    if (!form.occupation || !form.occupation.trim())
      errs.occupation = "Occupation is required";
    if (!form.state) errs.state = "Please select your state";
    if (!form.role) errs.role = "Please select your role";
    if (!form.password) errs.password = "Password is required";
    if (!form.confirmPassword) errs.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStepThree = () => {
    const errs = {};
    if (form.nin && !/^\d{6,16}$/.test(form.nin.trim()))
      errs.nin = "Enter a valid NIN (numbers only)";
    setLocalErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStepFour = () => true;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setForm((p) => ({ ...p, faceCaptureUrl: reader.result }));
      if (localErrors.faceCaptureUrl)
        setLocalErrors((p) => ({ ...p, faceCaptureUrl: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const handleSkipKyc = () => {
    if (step === 3) {
      setSkipFaceCapture(false);
      setLocalErrors({});
      setStep(4);
      return;
    }

    if (step === 4) {
      setSkipFaceCapture(true);
      setForm((p) => ({ ...p, faceCaptureUrl: "" }));
      setLocalErrors({});
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      if (!validateStepOne()) return setStep(1);
      setLocalErrors({});
      setSkipFaceCapture(false);
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!validateStepTwo()) return setStep(2);
      setLocalErrors({});
      setSkipFaceCapture(false);
      setStep(3);
      return;
    }
    if (step === 3) {
      if (!validateStepThree()) return setStep(3);
      setLocalErrors({});
      setSkipFaceCapture(false);
      setStep(4);
      return;
    }
    if (step === 4) {
      if (!validateStepFour()) return;
    }

    const payload = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      password: form.password,
      confirmPassword: form.confirmPassword,
      phoneNumber: form.phoneNumber.trim(),
      address: form.address.trim(),
      occupation: form.occupation.trim(),
      state: form.state,
      referralCode: form.referralCode.trim() || undefined,
      role: form.role.toUpperCase(),
      nin: form.nin?.trim() || "",
      faceCaptureUrl: form.faceCaptureUrl || "",
    };
    mutate(payload);
  };

  const closeModal = () => {
    setModalConfig((p) => ({ ...p, isOpen: false }));
    if (modalConfig.type === "success") navigate("/");
  };

  return (
    <div
      className={`min-h-screen bg-[#F9FAFB] flex items-center justify-center px-6 py-6 ${fontFamily.main}`}
    >
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-32 w-full lg:w-auto">
        <div className="hidden lg:flex justify-center items-center">
          <img
            src={logo}
            alt="Cepromas Logo"
            className="w-[300px] lg:w-[520px] object-contain"
          />
        </div>

        <div
          className={`"w-full max-w-xl bg-white rounded-2xl  shadow-sm" ${step === 3 || step === 4 ? "py-16 p-12" : "py-12 p-12"}`}
        >
          <div className="flex items-center justify-between mb-6">
            {step !== 1 ? (
              <button
                type="button"
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                    setLocalErrors({});
                    if (step - 1 < 4) setSkipFaceCapture(false);
                  } else {
                    navigate("/");
                  }
                }}
                className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center text-gray-600"
                aria-label="Back"
              >
                <FaArrowLeft size={12} />
              </button>
            ) : (
              <div />
            )}
            {(step === 3 || step === 4) && (
              <button
                type="button"
                onClick={handleSkipKyc}
                className="text-[#2540A8] text-sm font-semibold"
              >
                Skip
              </button>
            )}
          </div>

          <div className="text-center mb-8">
            <h2 className="text-[22px] font-semibold text-[#111827]">
              {step === 1
                ? "Signup"
                : step === 2
                  ? "Personal Information"
                  : "KYC"}
            </h2>

            <p className="text-[#6B7280] text-[13px] w-[50%] mx-auto leading-5 mt-2">
              {step === 1
                ? "Create an account to explore, buy, and invest in top properties with ease."
                : step === 2
                  ? "Help us create a secure and personalized experience for you."
                  : "Verify your identity to secure your account and access all platform features."}
            </p>
            <div className="inline-flex items-center rounded-full border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-1 text-[12px] font-medium text-[#4B5563]">
              Step {step} of 4
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* <h2 className="text-[18px] font-semibold mb-1">
              {step === 1
                ? "Personal Information"
                : step === 2
                  ? "Account Details"
                  : step === 3
                    ? "NIN"
                    : "Face Capture"}
            </h2> */}
            {/* <p className="text-[#6B7280] text-[13px] leading-5 mb-4">
              {step === 1
                ? "Provide personal details to continue."
                : step === 2
                  ? "Set up your account and password."
                  : step === 3
                    ? "Enter your NIN or skip."
                    : "Upload a face photo or skip to create your account."}
            </p> */}

            {getFieldError("_global") && (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                {getFieldError("_global")}
              </div>
            )}

            {step === 1 && (
              <>
                <label className="block text-xs text-[#6B7280] mt-2">
                  Full Name
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className={getInputClass("fullName")}
                  placeholder="Enter full name"
                />
                {getFieldError("fullName") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("fullName")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Email
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className={getInputClass("email")}
                  placeholder="Enter email"
                />
                {getFieldError("email") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("email")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Phone Number
                </label>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  className={getInputClass("phoneNumber")}
                  placeholder="Enter phone number"
                />
                {getFieldError("phoneNumber") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("phoneNumber")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Address
                </label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className={getInputClass("address")}
                  placeholder="Enter address"
                />
                {getFieldError("address") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("address")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Referral Code{" "}
                  <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  name="referralCode"
                  value={form.referralCode}
                  onChange={handleChange}
                  className={getInputClass("referralCode")}
                  placeholder="Enter referral code"
                />
                {getFieldError("referralCode") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("referralCode")}
                  </p>
                )}

                <div className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                  />
                  <label htmlFor="terms" className="text-sm text-[#6B7280]">
                    I agree to the Terms & Conditions
                  </label>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <label className="block text-xs text-[#6B7280] mt-2">
                  Occupation
                </label>
                <input
                  name="occupation"
                  value={form.occupation}
                  onChange={handleChange}
                  className={getInputClass("occupation")}
                  placeholder="Enter occupation"
                />
                {getFieldError("occupation") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("occupation")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  State
                </label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  className={getInputClass("state")}
                >
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                {getFieldError("state") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("state")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Choose Account Role
                </label>
                <div className={getRoleClass()}>
                  {[
                    ["user", "User"],
                    ["agent", "Agent"],
                  ].map(([val, label]) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, role: val }))}
                      className={`w-full p-3 rounded-md ${form.role === val ? "border-[#02024D] bg-[#F5F7FF]" : "border border-[#E5E7EB] bg-white"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                {getFieldError("role") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("role")}
                  </p>
                )}

                <label className="block text-xs text-[#6B7280] mt-3">
                  Password
                </label>
                <div className="relative">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleChange}
                    className={getInputClass("password")}
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>

                <label className="block text-xs text-[#6B7280] mt-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={getInputClass("confirmPassword")}
                    placeholder="Confirm password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-500"
                  >
                    {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                  </button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <label className="block text-xs text-[#6B7280] mt-2">
                  National Identification Number (NIN)
                </label>
                <input
                  name="nin"
                  value={form.nin}
                  onChange={handleChange}
                  className={getInputClass("nin")}
                  placeholder="Enter NIN (optional)"
                />
                {getFieldError("nin") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("nin")}
                  </p>
                )}

                <div className="mt-6">
                  <button
                    type="submit"
                    className="w-full h-12 bg-[#02024D] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isActionDisabled}
                  >
                    Continue
                  </button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <label className="block text-center text-xs text-[#6B7280] mt-2">
                  Face Capture (photo)
                </label>
                {/* Face scan avatar */}
                <div className="flex justify-center items-center mt-8 mb-8">
                  <img
                    src={Face}
                    alt="Face Scan Avatar"
                    className="w-[120px] h-[120px] object-contain"
                  />
                </div>
                {/* <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`mt-2 rounded-md px-3 py-2 border ${
                    getFieldError("faceCaptureUrl")
                      ? "border-red-500"
                      : "border-[#E5E7EB]"
                  }`}
                /> */}
                {getFieldError("faceCaptureUrl") && (
                  <p className="text-xs text-red-600 mt-1">
                    {getFieldError("faceCaptureUrl")}
                  </p>
                )}
                {form.faceCaptureUrl && (
                  <img
                    src={form.faceCaptureUrl}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded-md mt-3"
                  />
                )}

                <div className="mt-6">
                  <Button
                    type="submit"
                    text={isLoading ? "Creating account..." : "Create Account"}
                    bg="bg-[#02024D]"
                    width="w-full"
                    height="h-12"
                    rounded="rounded-md"
                    className="text-white"
                    disabled={isActionDisabled || isLoading}
                  />
                </div>
              </>
            )}

            {(step === 1 || step === 2) && (
              <>
                <div className="mt-6">
                  <Button
                    type="submit"
                    text="Continue"
                    bg="bg-[#02024D]"
                    width="w-full"
                    height="h-12"
                    rounded="rounded-md"
                    className="text-white"
                    disabled={isActionDisabled || isLoading}
                  />
                </div>

                <button
                  type="button"
                  className="w-full h-12 border rounded-md mt-3 flex items-center justify-center gap-3 text-sm"
                  onClick={() => {}}
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  Continue with Google
                </button>

                <p className="text-center text-sm text-[#6B7280] mt-6">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/")}
                    className="text-[#3658C9] font-medium cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </>
            )}
          </form>
        </div>
      </div>

      {isLoading && <GlobalLoader label="Creating your account" />}

      <GlobalModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        type={modalConfig.type}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={
          modalConfig.type === "success" ? "Go to Login" : "Try Again"
        }
      />
    </div>
  );
};

export default SignUp;
