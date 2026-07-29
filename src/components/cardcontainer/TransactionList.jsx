import React, { useState, useEffect } from "react";
import ListIcon from "../../assets/icons/Vector.png";
import ArrowUp from "../../assets/icons/ArrowLineUp.png";
import ArrowDown from "../../assets/icons/ArrowLineDown.png";
import ArrowChart from "../../assets/icons/ChartLineUp.png";
import {
  fontSize,
  fontWeight,
  textColor,
  fontFamily,
} from "../../components/styles/theme";
import { getWalletHistory } from "../../api/wallet";

// Icon + background mapping by transaction type
const typeConfig = {
  Withdraw: { icon: ArrowUp, bg: "bg-[#E1FBC1]" },
  WITHDRAWAL: { icon: ArrowUp, bg: "bg-[#E1FBC1]" },
  Interest: { icon: ArrowChart, bg: "bg-[#FEFAA2]" },
  ROI: { icon: ArrowChart, bg: "bg-[#FEFAA2]" },
  Received: { icon: ArrowDown, bg: "bg-[#DBE8FD]" },
  DEPOSIT: { icon: ArrowDown, bg: "bg-[#DBE8FD]" },
};

const TransactionRow = ({ type, amount, date, id, status, onClick }) => {
  const { icon, bg } = typeConfig[type] || {
    icon: ListIcon,
    bg: "bg-[#FEFAA2]",
  };

  return (
    <div
      onClick={onClick}
      className="flex items-center justify-between gap-3 px-4 py-3 border border-gray-100 rounded-xl bg-white cursor-pointer hover:bg-gray-50 transition"
    >
      {/* Icon */}
      <div
        className={`${bg} rounded-lg p-2 w-9 h-9 flex items-center justify-center shrink-0`}
      >
        <img src={icon} alt={`${type} icon`} className="w-4 h-4" />
      </div>

      {/* Left group */}
      <div className="flex flex-col sm:flex-row sm:items-center flex-1 min-w-0 gap-0.5 sm:gap-0">
        <span
          className={`${textColor.primary} ${fontSize.base} ${fontWeight.medium} sm:${fontWeight.normal} ${fontFamily.main} sm:w-30 truncate capitalize`}
        >
          {type?.toLowerCase()}
        </span>
        <span
          className={`text-gray-500 sm:${textColor.primary} text-xs sm:${fontSize.base} ${fontWeight.normal} ${fontFamily.main} sm:w-50 truncate`}
        >
          {date}
        </span>
        <span
          className={`hidden sm:inline ${textColor.primary} ${fontSize.base} ${fontWeight.normal} ${fontFamily.main} sm:w-40 truncate`}
        >
          {id}
        </span>
      </div>

      {/* Right group */}
      <div className="flex flex-col sm:flex-row sm:items-center items-end gap-0.5 sm:gap-4 shrink-0">
        <span
          className={`${textColor.primary} ${fontSize.base} ${fontWeight.medium} sm:${fontWeight.normal} ${fontFamily.main} sm:w-30 text-right sm:text-left whitespace-nowrap`}
        >
          {amount}
        </span>
        <span
          className={`text-gray-500 sm:${textColor.primary} text-xs sm:${fontSize.base} ${fontWeight.normal} ${fontFamily.main} whitespace-nowrap`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

const TransactionDetailsModal = ({ tx, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black/40 flex items-center justify-center z-50 ${fontFamily.main}`}
    >
      <div className="bg-white rounded-[20px] w-105 relative shadow-xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 font-bold rounded-full border cursor-pointer border-black text-gray-400 flex items-center justify-center text-sm hover:bg-gray-100"
        >
          ✕
        </button>
        <h2 className="text-lg font-bold text-[#0f1c3f] mb-6">
          Transaction Details
        </h2>
        <div className="flex flex-col gap-4">
          {[
            { label: "Provider", value: tx.provider || "N/A" },
            { label: "Amount", value: tx.amount },
            { label: "Status", value: tx.status },
            { label: "Transaction Reference", value: tx.id },
            { label: "Date", value: tx.date },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-[#0f1c3f] text-sm font-medium">
                {label}
              </span>
              <span className="text-gray-500 text-sm truncate max-w-50">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const TransactionList = ({ filter = "All", limit = 10, page = 1 }) => {
  const [selectedTx, setSelectedTx] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const params = {
          skip: (page - 1) * limit,
          take: limit,
        };

        if (filter === "Received") params.type = "DEPOSIT";
        if (filter === "Withdraw") params.type = "WITHDRAWAL";
        if (filter === "Interest") params.type = "ROI";

        const data = await getWalletHistory(params);

        // Transform backend response into component structure
        const formatted = (data || []).map((tx) => {
          const isCredit = tx.type === "DEPOSIT" || tx.type === "PAYOUT";
          const formattedAmount = `${isCredit ? "+" : "-"}₦${Number(tx.amount).toLocaleString()}`;
          const dateFormatted = new Date(tx.createdAt).toLocaleDateString(
            "en-NG",
            {
              hour: "2-digit",
              minute: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            },
          );

          let displayType = "Received";
          if (tx.type === "WITHDRAWAL") displayType = "Withdraw";
          if (tx.type === "PAYOUT" || tx.category === "ROI")
            displayType = "Interest";

          return {
            id: tx.reference,
            type: displayType,
            amount: formattedAmount,
            date: dateFormatted,
            status: tx.status,
            provider: tx.provider,
          };
        });

        setTransactions(formatted);
      } catch (err) {
        console.error("Failed to load wallet history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [filter, page, limit]);

  if (loading) {
    return (
      <div className="py-8 text-center text-gray-500">
        Loading transactions...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500 border border-dashed rounded-xl">
        No transactions found.
      </div>
    );
  }

  return (
    <div className={`${fontFamily.main}`}>
      <div className="flex flex-col gap-2 w-full">
        {transactions.map((tx, i) => (
          <TransactionRow
            key={`${tx.id}-${i}`}
            {...tx}
            onClick={() => setSelectedTx(tx)}
          />
        ))}
      </div>

      {selectedTx && (
        <TransactionDetailsModal
          tx={selectedTx}
          onClose={() => setSelectedTx(null)}
        />
      )}
    </div>
  );
};

export default TransactionList;
