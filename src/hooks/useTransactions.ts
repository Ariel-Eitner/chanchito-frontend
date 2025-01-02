"use client";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  setSaldoDisponible,
  setTotalGastadoMensual,
  setTotalIngresoMensual,
} from "@/redux/slices/financialSlice/financialSlice";
import {
  addTransactionAction,
  deleteTransactionAction,
  setTransactions,
  updateTransactionAction,
} from "@/redux/slices/transactionSlice/transactionsSlice";
import { AppDispatch, RootState } from "@/redux/store/store";

import { UpdateTransactionDto } from "@/services/transactions/dto/updateTransactionDto";

import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";
import {
  createTransactionService,
  deleteTransactionService,
  getUserTransactionsService,
  updateTransactionService,
} from "@/services/transactions/transactionsService";

const useTransactions = () => {
  const dispatch = useDispatch<AppDispatch>();
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const saldoDisponible = useSelector(
    (state: RootState) => state.financialStats.saldoDisponible
  );
  const totalGastadoMensual = useSelector(
    (state: RootState) => state.financialStats.totalGastadoMensual
  );
  const totalIngresoMensual = useSelector(
    (state: RootState) => state.financialStats.totalIngresoMensual
  );

  //Fetch y CRUD
  const fetchTransactionsHook = useCallback(async () => {
    try {
      const data = await getUserTransactionsService();

      dispatch(setTransactions(data.transactions));
      setLoading(false);
    } catch (error) {
      const errorMessage =
        typeof error === "string" ? error : (error as Error).message;
      toast.error(errorMessage);
      setError("Error fetching transactions");
      console.log(error);
      setLoading(false);
    }
  }, [dispatch]);

  const createTransactionHook = async (transaction: CreateTransactionDto) => {
    setLoading(true);
    try {
      const newTransaction = await createTransactionService(transaction);
      toast.success(newTransaction.message);
      dispatch(addTransactionAction(newTransaction));
      setError(null);
    } catch (error) {
      console.error("Error creating transaction:", error);
      setError("Error al crear la transacción. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionHook = async (
    id: string,
    transaction: UpdateTransactionDto
  ) => {
    setLoading(true);
    try {
      console.log("Before service call");
      const updatedTransaction = await updateTransactionService(
        id,
        transaction
      );
      dispatch(updateTransactionAction(updatedTransaction));
      setError(null);
    } catch (error) {
      setError(
        "Error al actualizar la transacción. Inténtalo de nuevo más tarde."
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteTransactionHook = async (id: string) => {
    try {
      const deletedTransacion = await deleteTransactionService(id);
      toast.success(deletedTransacion.message);
      dispatch(deleteTransactionAction(id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  //Fetch y CRUD

  //Funciones Utilitarias

  const formatPrice = (amountInCents: number) =>
    (amountInCents / 100).toFixed(2);
  //Funciones Utilitarias

  // Cálculos y Lógica Derivada
  const calculateSaldoDisponible = useCallback(() => {
    const totalIngresos = transactions
      .filter((transaction) => transaction.type === "income")
      .reduce((acc, transaction) => acc + (transaction.amountInCents ?? 0), 0);

    const totalGastos = transactions
      .filter((transaction) => transaction.type === "payment")
      .reduce((acc, transaction) => acc + (transaction.amountInCents ?? 0), 0);

    dispatch(setSaldoDisponible(totalIngresos - totalGastos));
  }, [transactions, dispatch]);

  const calculateTotalGastadoMensual = useCallback(() => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const totalGastado = transactions
      .filter(
        (transaction) =>
          transaction.type === "payment" &&
          new Date(transaction.date) >= firstDayOfMonth &&
          new Date(transaction.date) <= lastDayOfMonth
      )
      .reduce((acc, transaction) => acc + (transaction.amountInCents ?? 0), 0);

    dispatch(setTotalGastadoMensual(totalGastado));
  }, [transactions, dispatch]);

  const calculateTotalIngresoMensual = useCallback(() => {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const lastDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    const totalIngresos = transactions
      .filter(
        (transaction) =>
          transaction.type === "income" &&
          new Date(transaction.date) >= firstDayOfMonth &&
          new Date(transaction.date) <= lastDayOfMonth
      )
      .reduce((acc, transaction) => acc + (transaction.amountInCents ?? 0), 0);

    dispatch(setTotalIngresoMensual(totalIngresos));
  }, [transactions, dispatch]);

  // Cálculos y Lógica Derivada

  //Efectos
  useEffect(() => {
    fetchTransactionsHook();
  }, [fetchTransactionsHook]);

  useEffect(() => {
    calculateSaldoDisponible();
    calculateTotalGastadoMensual();
    calculateTotalIngresoMensual();
  }, [
    transactions,
    calculateSaldoDisponible,
    calculateTotalGastadoMensual,
    calculateTotalIngresoMensual,
  ]);

  //Efectos

  return {
    transactions,
    loading,
    error,
    saldoDisponible,
    saldoTotal: formatPrice(saldoDisponible),
    totalGastadoMensual: formatPrice(totalGastadoMensual),
    totalIngresoMensual: formatPrice(totalIngresoMensual),
    refetch: fetchTransactionsHook,
    updateTransactionHook,
    deleteTransactionHook,
    createTransactionHook,
  };
};

export default useTransactions;
