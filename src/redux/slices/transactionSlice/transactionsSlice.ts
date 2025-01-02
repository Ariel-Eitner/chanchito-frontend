"use client";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionsState {
  transactions: CreateTransactionDto[];
}

const initialState: TransactionsState = {
  transactions: [],
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<CreateTransactionDto[]>) => {
      state.transactions = action.payload;
    },
    addTransactionAction: (
      state,
      action: PayloadAction<CreateTransactionDto>
    ) => {
      state.transactions.push(action.payload);
    },
    updateTransactionAction: (
      state,
      action: PayloadAction<CreateTransactionDto>
    ) => {
      const index = state.transactions.findIndex(
        (t) => t._id === action.payload._id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransactionAction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (t) => t._id !== action.payload
      );
    },
  },
});

export const {
  setTransactions,
  addTransactionAction,
  updateTransactionAction,
  deleteTransactionAction,
} = transactionsSlice.actions;
export default transactionsSlice.reducer;
