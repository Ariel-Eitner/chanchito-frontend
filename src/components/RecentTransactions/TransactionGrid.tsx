import React, { useState } from "react";

import TransactionRow from "./TransactionRow";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";

interface TransactionGridProps {
  transactions: CreateTransactionDto[];
  onEdit: (transaction: CreateTransactionDto) => void;
  onDelete: (id: string) => void;
}

// Función para agrupar las transacciones por mes y año
const groupTransactionsByMonth = (transactions: CreateTransactionDto[]) => {
  return transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; // Formato "YYYY-MM"

    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }

    acc[monthYear].push(transaction);
    return acc;
  }, {} as Record<string, CreateTransactionDto[]>);
};

// Función para obtener el nombre completo del mes
const getMonthName = (monthIndex: number) => {
  const date = new Date();
  date.setMonth(monthIndex);
  return date.toLocaleString("default", { month: "long" }); // Nombre completo del mes
};

// Función para obtener el mes y año actuales
const getCurrentMonthYear = () => {
  const date = new Date();
  return {
    year: date.getFullYear(),
    month: date.getMonth(), // Ajustar mes para el índice de 0 a 11
  };
};

const TransactionGrid: React.FC<TransactionGridProps> = ({
  transactions,
  onEdit,
  onDelete,
}) => {
  const [currentMonth, setCurrentMonth] = useState(getCurrentMonthYear());

  // Agrupa las transacciones
  const groupedTransactions = groupTransactionsByMonth(transactions);

  // Filtra las transacciones por el mes y año seleccionados
  const currentMonthYear = `${currentMonth.year}-${currentMonth.month + 1}`; // Ajustar mes para el formato "YYYY-MM"
  const filteredTransactions = groupedTransactions[currentMonthYear] || [];

  // Cambia al mes siguiente
  const goToNextMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev.year, prev.month + 1);
      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
      };
    });
  };

  // Cambia al mes anterior
  const goToPreviousMonth = () => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev.year, prev.month - 1);
      return {
        year: newDate.getFullYear(),
        month: newDate.getMonth(),
      };
    });
  };

  // Nombre del mes actual
  const monthName = getMonthName(currentMonth.month);

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={goToPreviousMonth}
          className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Anterior
        </button>
        <h3 className="text-lg font-bold">
          {monthName} {currentMonth.year}{" "}
          {/* Muestra el nombre del mes y el año */}
        </h3>
        <button
          onClick={goToNextMonth}
          className="py-2 px-4 bg-gray-300 hover:bg-gray-400 rounded"
        >
          Siguiente
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr className="text-left">
            <th className="py-3 px-6 border-b border-gray-300">Fecha</th>
            <th className="py-3 px-6 border-b border-gray-300">Concepto</th>
            <th className="py-3 px-6 border-b border-gray-300">Monto</th>
            <th className="py-3 px-6 border-b border-gray-300">Categoría</th>
            <th className="py-3 px-6 border-b border-gray-300">Subcategoría</th>
            <th className="py-3 px-6 border-b border-gray-300">
              Sub-subcategoría
            </th>
            <th className="py-3 px-6 border-b border-gray-300">Cantidad</th>
            <th className="py-3 px-6 border-b border-gray-300">
              Precio Unitario
            </th>
            <th className="py-3 px-6 border-b border-gray-300">Tienda</th>
            <th className="py-3 px-6 border-b border-gray-300">Marca</th>
            <th className="py-3 px-6 border-b border-gray-300">Notas</th>
            <th className="py-3 px-6 border-b border-gray-300">Tipo</th>
            <th className="py-3 px-6 border-b border-gray-300">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredTransactions.map((transaction) => (
            <TransactionRow
              key={transaction._id}
              transaction={transaction}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionGrid;
