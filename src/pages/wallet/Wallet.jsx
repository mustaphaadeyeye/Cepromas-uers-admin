import React, { useState } from "react";
import Wrapper from "../../components/wrapper/Wrapper";
import BalanceCard from "../../components/cardcontainer/BalanceCard";
import ActionCard from "../../components/cardcontainer/ActionCard";
import ArrowUp from "../../assets/icons/ArrowLineUp.png";
import ArrowDown from "../../assets/icons/ArrowLineDown.png";
import ArrowChart from "../../assets/icons/ChartLineUp.png";
import TransactionList from "../../components/cardcontainer/TransactionList";
import { fontSize, fontWeight, textColor } from "../../components/styles/theme";
import FilterIcon from "../../assets/icons/filter.png";
import { Link } from "react-router-dom";
import ChooseAccountModal from "../../components/modals/ChooseAccountModal";

const Wallet = () => {
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <Wrapper>
        <div className="flex gap-4 xl:flex-row lg:flex-row md:flex-col flex-col">
          {/* Balance Card */}
          <div className="flex-1">
            <BalanceCard key={`balance-${refreshKey}`} />
          </div>

          {/* Action cards */}
          <div className="flex gap-3 xl:flex-col lg:flex-col md:flex-row flex-row">
            <ActionCard
              onClick={() => setModalOpen("withdraw")}
              icon={<img src={ArrowUp} alt="arrow up" className="w-5 h-5" />}
              text="Withdraw"
              bg="bg-[#E1FBC1]"
              width="w-[185px] md:w-full lg:w-[314px] xl:w-[314px]"
              height="xl:h-[85px] lg:h-[85px] md:h-[85px] h-[38px]"
              rounded="rounded-[6px]"
            />
            <ActionCard
              onClick={() => setModalOpen("addmoney")}
              icon={
                <img src={ArrowDown} alt="arrow down" className="w-5 h-5" />
              }
              text="Add Money"
              mobileText="Fund Wallet"
              bg="bg-[#DBE8FD]"
              width="w-[185px] md:w-full lg:w-[314px] xl:w-[314px]"
              height="xl:h-[85px] lg:h-[85px] md:h-[85px] h-[38px]"
              rounded="rounded-[6px]"
            />
            <Link to="/app/wallet-interest" className="hidden md:block">
              <ActionCard
                icon={
                  <img src={ArrowChart} alt="chart icon" className="w-5 h-5" />
                }
                text="Interest"
                bg="bg-[#FEFAA2]"
                width="w-[185px] md:w-full lg:w-[314px] xl:w-[314px]"
                height="xl:h-[85px] lg:h-[85px] md:h-[85px] h-[38px]"
                rounded="rounded-[6px]"
              />
            </Link>
          </div>

          {modalOpen && (
            <ChooseAccountModal
              type={modalOpen}
              onClose={() => setModalOpen(false)}
              onSuccess={handleSuccess}
            />
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-5 relative">
              <h1
                className={`${fontSize["2xl"]} ${fontWeight.semibold} ${textColor.primary}`}
              >
                Transaction History
              </h1>

              {/* Filter Icon */}
              <img
                src={FilterIcon}
                alt="filter icon"
                className="hidden md:block cursor-pointer"
                onClick={() => setOpen(!open)}
              />

              {/* Dropdown - Fixed filters to match backend types */}
              {open && (
                <div className="absolute top-10 right-0 bg-white shadow-lg border border-gray-200 rounded-lg w-40 z-50">
                  <ul className="flex flex-col">
                    {[
                      { label: "All", value: "All" },
                      { label: "Deposits", value: "DEPOSIT" },
                      { label: "Withdrawals", value: "WITHDRAWAL" },
                      { label: "Investments", value: "INVESTMENT" },
                      { label: "Payouts / ROI", value: "PAYOUT" },
                    ].map((opt) => (
                      <li
                        key={opt.value}
                        onClick={() => {
                          setSelectedFilter(opt.value);
                          setOpen(false);
                        }}
                        className="px-4 py-3 hover:bg-gray-100 cursor-pointer text-sm text-gray-700"
                      >
                        {opt.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div>
              <Link to="/app/wallet-see-all">
                <p
                  className={`${fontSize.lg} ${fontWeight.normal} lg:text-red-600 text-blue-600`}
                >
                  See all
                </p>
              </Link>
            </div>
          </div>

          <TransactionList
            key={`list-${refreshKey}`}
            filter={selectedFilter}
            limit={5}
          />
        </div>
      </Wrapper>
    </div>
  );
};

export default Wallet;
