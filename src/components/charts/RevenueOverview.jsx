import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  fontSize,
  fontWeight,
  fontFamily,
  textColor,
} from "../../components/styles/theme";

const filterOptions = [
  { label: "Last 12 months", value: "12m" },
  { label: "Last 6 months", value: "6m" },
  { label: "Last 3 months", value: "3m" },
];

const RevenueOverview = ({
  revenueData = [],
  timeframe = "12m",
  setTimeframe,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const selectedOption =
    filterOptions.find((opt) => opt.value === timeframe) || filterOptions[0];

  return (
    <div className="bg-white rounded-[13px] p-5 w-full">
      {/* Header */}
      <div className="flex items-center lg:gap-70 gap-20 mb-6 justify-between">
        <p
          className={`${fontSize.md} ${fontWeight.medium} ${textColor.primary} ${fontFamily.main}`}
        >
          Revenue Overview
        </p>

        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 cursor-pointer hover:bg-gray-50 transition"
          >
            <span
              className={`${fontSize.sm} ${fontWeight.normal} ${textColor.secondary} ${fontFamily.main}`}
            >
              {selectedOption.label}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              className={`transition duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden min-w-40">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    if (setTimeframe) setTimeframe(option.value);
                    setDropdownOpen(false);
                  }}
                  className={`
                    w-full px-4 py-2.5 text-left transition duration-200 hover:bg-gray-50
                    ${fontSize.sm} ${fontFamily.main}
                    ${
                      selectedOption.value === option.value
                        ? `${fontWeight.medium} ${textColor.primary}`
                        : `${fontWeight.normal} ${textColor.secondary}`
                    }
                  `}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={revenueData}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E02020" stopOpacity={0.3} />
              <stop offset="100%" stopColor="#E02020" stopOpacity={0.0} />
            </linearGradient>
          </defs>

          <CartesianGrid vertical={false} stroke="#F3F4F5" />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "inherit" }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF", fontFamily: "inherit" }}
          />

          <Tooltip
            contentStyle={{
              background: "#fff",
              border: "1px solid #F3F4F5",
              borderRadius: "10px",
              fontSize: "12px",
              fontFamily: "inherit",
            }}
            formatter={(value) => [
              `₦${Number(value).toLocaleString()}`,
              "Revenue",
            ]}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#E02020"
            strokeWidth={2}
            fill="url(#redGradient)"
            dot={{ r: 4, fill: "#E02020", strokeWidth: 0 }}
            activeDot={{ r: 6, fill: "#E02020" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueOverview;
