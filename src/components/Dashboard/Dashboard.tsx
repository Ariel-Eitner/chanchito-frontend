"use client";
import React, { useState } from "react";
import useTransactions from "@/hooks/useTransactions";

import BalanceIndicator from "./BalanceIndicator";
import AddTransactionButton from "../Buttons/AddTransactionButton/AddTransactionButton";
import AddTransactionModal from "../Modal/TransactionModals/AddTransactionModal";
import { useRecoilValue } from "recoil";
import { userNameState } from "@/recoil/recoilState";

const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    // transactions,
    loading,
    // error,
    saldoDisponible,
    totalGastadoMensual,
    totalIngresoMensual,
    saldoTotal,
    refetch,
  } = useTransactions();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userName = useRecoilValue(userNameState);

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  return (
    <div className="bg-gray-200 shadow-md p-6 text-black">
      <div className="flex justify-between">
        {userName}
        <h2 className="text-xl font-bold">Dashboard</h2>

        <AddTransactionButton onClick={openModal} />
      </div>
      <hr className="border-gray-400 my-4" />
      <div className="flex justify-between">
        <div className="flex flex-col space-y-4">
          <BalanceIndicator
            label="Saldo disponible"
            amount={saldoTotal}
            positive={saldoDisponible >= 0}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <BalanceIndicator
            label="Total gastado mensual"
            amount={totalGastadoMensual}
          />
          <BalanceIndicator
            label="Total ingreso mensual"
            amount={totalIngresoMensual}
            positive
          />
        </div>
      </div>
      <AddTransactionModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Dashboard;
