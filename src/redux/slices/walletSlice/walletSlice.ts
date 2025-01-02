import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Wallet {
  id: number;
  name: string;
}

interface WalletState {
  wallets: Wallet[];
  loading: boolean;
  error: string | null;
}

const initialState: WalletState = {
  wallets: [],
  loading: false,
  error: null,
};

const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setWallets(state, action: PayloadAction<Wallet[]>) {
      state.wallets = action.payload;
    },
    addWallet(state, action: PayloadAction<Wallet>) {
      state.wallets.push(action.payload);
    },
    updateWallet(state, action: PayloadAction<Wallet>) {
      const index = state.wallets.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.wallets[index] = action.payload;
      }
    },
    deleteWallet(state, action: PayloadAction<number>) {
      state.wallets = state.wallets.filter((w) => w.id !== action.payload);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const {
  setWallets,
  addWallet,
  updateWallet,
  deleteWallet,
  setLoading,
  setError,
} = walletSlice.actions;

export default walletSlice.reducer;
