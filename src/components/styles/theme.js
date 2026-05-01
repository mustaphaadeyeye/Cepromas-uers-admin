// COLORS
export const colors = {
  primaryDark: "#05062F",
  primaryBlue: "#0E1D70",
  accentRed: "#EC2614",
  white: "#FFFFFF",
  muted: "#6B7280",
  lightGray: "#F3F4F6",
  
};


// TYPOGRAPHY (FONT SIZE SCALE)
// Pattern: default (mobile) → md (768px) → lg (1024px) → xl (1280px)

export const fontSize = {
  xs:    "text-[10px]  md:text-[10px]  lg:text-xs    xl:text-xs",     // 10 → 10 → 12 → 12
  sm:    "text-[10px]  md:text-xs      lg:text-xs    xl:text-sm",     // 10 → 12 → 12 → 14
  base:  "text-xs      md:text-sm      lg:text-sm    xl:text-base",   // 12 → 14 → 14 → 16
  md:    "text-sm      md:text-base    lg:text-base  xl:text-base",   // 14 → 16 → 16 → 16
  lg:    "text-sm      md:text-base    lg:text-lg    xl:text-lg",     // 14 → 16 → 18 → 18
  xl:    "text-base    md:text-lg      lg:text-xl    xl:text-xl",     // 16 → 18 → 20 → 20
  "2xl": "text-lg      md:text-xl      lg:text-2xl   xl:text-2xl",   // 18 → 20 → 24 → 24
  "3xl": "text-xl      md:text-2xl     lg:text-3xl   xl:text-3xl",   // 20 → 24 → 30 → 30
  "4xl": "text-2xl     md:text-3xl     lg:text-4xl   xl:text-4xl",   // 24 → 30 → 36 → 36
  "5xl": "text-3xl     md:text-4xl     lg:text-5xl   xl:text-5xl",   // 30 → 36 → 48 → 48
  "6xl": "text-4xl     md:text-5xl     lg:text-6xl   xl:text-6xl",   // 36 → 48 → 60 → 60
  "7xl": "text-5xl     md:text-6xl     lg:text-7xl   xl:text-7xl",   // 48 → 60 → 72 → 72
  "8xl": "text-6xl     md:text-7xl     lg:text-[96px] xl:text-[96px]", // 60 → 72 → 96 → 96
};


// FONT WEIGHTS
export const fontWeight = {
  light:   "font-light",
  normal:    "font-normal",
  medium:    "font-medium",
  semibold:  "font-semibold",
  bold:      "font-bold",
  extrabold: "font-extrabold",
};


// FONT FAMILY
export const fontFamily = {
  main: "font-[Outfit]",
};


// TEXT COLOR SYSTEM
export const textColor = {
  primary:   "text-[#05062F]",
  blue:      "text-[#0E1D70]",
  red:       "text-[#EC2614]",
  secondary: "text-[#94A3B8]",
  white:     "text-white",
  muted:     "text-gray-500",
  dark:      "text-gray-900",
  darkGray: "#64748B",
};


// BACKGROUND COLORS
export const bgColor = {
  primaryDark: "bg-[#05062F]",
  primaryBlue: "bg-[#0E1D70]",
  accentRed:   "bg-[#EC2614]",
  accentedGray: "bg-[#F3F4F5]",
  white:       "bg-white",
  lightGray:   "bg-gray-100",
  darkGray: "bg-gray-300",
};


// STYLE GUIDE HELPERS
export const StyleGuide = {
  contentFlex: "flex items-center gap-2",
  flexContent: "flex justify-center gap-2",
};


// TEXT DECORATION
export const textDecoration = {
  underline:   "underline",
  lineThrough: "line-through",
  none:        "no-underline",
  uppercase:   "uppercase",
  lowercase:   "lowercase",
  capitalize:  "capitalize",
};


// LETTER SPACING
export const letterSpacing = {
  xs:    "tracking-[1px]",
  sm:    "tracking-[2px]",
  md:    "tracking-[4px]",
  lg:    "tracking-[6px]",
  xl:    "tracking-[8px]",
  "2xl": "tracking-[10px]",
  "3xl": "tracking-[12px]",
  "4xl": "tracking-[16px]",
  "5xl": "tracking-[20px]",
};