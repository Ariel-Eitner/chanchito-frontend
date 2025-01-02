import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FinancialStatsState {
  saldoDisponible: number;
  totalGastadoMensual: number;
  totalIngresoMensual: number;
}

const initialState: FinancialStatsState = {
  saldoDisponible: 0,
  totalGastadoMensual: 0,
  totalIngresoMensual: 0,
};

const financialStatsSlice = createSlice({
  name: "financialStats",
  initialState,
  reducers: {
    setSaldoDisponible: (state, action: PayloadAction<number>) => {
      state.saldoDisponible = action.payload;
    },
    setTotalGastadoMensual: (state, action: PayloadAction<number>) => {
      state.totalGastadoMensual = action.payload;
    },
    setTotalIngresoMensual: (state, action: PayloadAction<number>) => {
      state.totalIngresoMensual = action.payload;
    },
  },
});

export const {
  setSaldoDisponible,
  setTotalGastadoMensual,
  setTotalIngresoMensual,
} = financialStatsSlice.actions;
export default financialStatsSlice.reducer;
