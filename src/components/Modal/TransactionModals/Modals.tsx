import React from "react";

import TransactionForm from "./TransactionForm";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: CreateTransactionDto | null;
}

const NewPaymentModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <TransactionForm
          paymentType="payment"
          onClose={onClose}
          transaction={transaction}
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

const NewIncomeModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <TransactionForm
          paymentType="income"
          onClose={onClose}
          transaction={transaction}
        />
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export { NewPaymentModal, NewIncomeModal };
