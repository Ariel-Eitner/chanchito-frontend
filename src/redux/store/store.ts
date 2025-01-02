"use client";
import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from "../slices/transactionSlice/transactionsSlice";
import financialStatsReducer from "../slices/financialSlice/financialSlice";
import userReducer from "../slices/userSlice/userSlice";
import walletsReducer from "../slices/walletSlice/walletSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    financialStats: financialStatsReducer,
    user: userReducer,
    wallets: walletsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
