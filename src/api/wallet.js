import api from "./axios";

// Fetch current wallet balance
export const getWalletBalance = async () => {
  const response = await api.get("/wallet/balance");
  return response.data;
};

// Initialize wallet funding (deposit)
export const fundWallet = async (amount, provider = "paystack") => {
  const response = await api.post("/wallet/fund", { amount, provider });
  return response.data;
};

// Request withdrawal
export const withdrawWallet = async (
  amount,
  transactionPin,
  destination = "",
) => {
  const response = await api.post("/wallet/withdraw", {
    amount: Number(amount),
    transactionPin,
    destination,
  });
  return response.data;
};

// Fetch transaction history with optional filters
export const getWalletHistory = async (params = {}) => {
  const response = await api.get("/wallet/history", { params });
  return response.data;
};
