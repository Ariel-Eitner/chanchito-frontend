// transactionFilters.ts

import { Types } from "mongoose";

// Agrupar transacciones por categoría
export const groupTransactionsByCategory = (transactions: any[]) => {
  return transactions.reduce((acc, transaction) => {
    const category = transaction.category || "Otros";
    if (!acc[category]) {
      acc[category] = { category, totalAmount: 0 };
    }
    acc[category].totalAmount += transaction.amountInCents / 100;
    return acc;
  }, {} as Record<string, { category: string; totalAmount: number }>);
};

// Agrupar transacciones por tipo (pago o ingreso)
export const groupTransactionsByType = (transactions: any[]) => {
  return transactions.reduce((acc, transaction) => {
    const type = transaction.type;
    if (!acc[type]) {
      acc[type] = { type, totalAmount: 0 };
    }
    acc[type].totalAmount += transaction.amountInCents / 100;
    return acc;
  }, {} as Record<string, { type: string; totalAmount: number }>);
};

// Calcular el total de gastos o ingresos
export const calculateTotalAmount = (
  transactions: any[],
  type: "payment" | "income"
) => {
  return transactions
    .filter((transaction) => transaction.type === type)
    .reduce((total, transaction) => total + transaction.amountInCents / 100, 0);
};

// Filtrar transacciones por usuario
export const filterTransactionsByUser = (
  transactions: any[],
  userId: Types.ObjectId
) => {
  return transactions.filter((transaction) =>
    transaction.userId.equals(userId)
  );
};

// Filtrar transacciones por rango de fechas
export const filterTransactionsByDateRange = (
  transactions: any[],
  startDate: string,
  endDate: string
) => {
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate >= new Date(startDate) &&
      transactionDate <= new Date(endDate)
    );
  });
};

// Agrupar transacciones por tienda
export const groupTransactionsByStore = (transactions: any[]) => {
  return transactions.reduce((acc, transaction) => {
    const store = transaction.store || "Sin tienda";
    if (!acc[store]) {
      acc[store] = { store, totalAmount: 0 };
    }
    acc[store].totalAmount += transaction.amountInCents / 100;
    return acc;
  }, {} as Record<string, { store: string; totalAmount: number }>);
};
