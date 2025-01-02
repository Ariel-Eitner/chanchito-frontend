"use client";
import React, { useMemo, useState } from "react";
import useTransactions from "@/hooks/useTransactions";

import TransactionGrid from "./TransactionGrid";
import AddTransactionModal from "../Modal/TransactionModals/AddTransactionModal";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";
import { useRecoilState } from "recoil";
import { userNameState } from "@/recoil/recoilState";

const RecentTransactions: React.FC = () => {
  const {
    transactions,
    loading,
    //  error,
    deleteTransactionHook,
  } = useTransactions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userName, setUserName] = useRecoilState(userNameState);
  const [selectedTransaction, setSelectedTransaction] =
    useState<CreateTransactionDto | null>(null);
  const sortedTransactions = useMemo(() => {
    return [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, [transactions]);

  console.log(transactions);

  const handleEdit = (transaction: CreateTransactionDto) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleChangeUserName = () => {
    const newName =
      userName === "Usuario Inicial" ? "Nuevo Usuario" : "Usuario Inicial";
    setUserName(newName);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div className="bg-white shadow-md p-4 text-black">
      {userName}
      <button
        onClick={handleChangeUserName}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Cambiar Nombre
      </button>
      <h2 className="text-xl font-bold mb-4">Últimas Transacciones</h2>
      <TransactionGrid
        transactions={sortedTransactions}
        onEdit={handleEdit}
        onDelete={deleteTransactionHook}
      />
      {selectedTransaction && (
        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={closeModal}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};

export default RecentTransactions;
