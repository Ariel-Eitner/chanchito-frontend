import React, { useEffect, useState } from "react";

import NewIncomeModal from "./NewIncomeModal";
import NewPaymentModal from "./NewPaymentModal";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: CreateTransactionDto | null;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  transaction,
}) => {
  const [modalType, setModalType] = useState<"income" | "payment" | null>(
    "payment"
  );

  useEffect(() => {
    if (transaction) {
      setModalType(transaction.type === "income" ? "income" : "payment");
    }
  }, [transaction]);
  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setModalType(null);
      onClose();
    }
  };
  const handleOpenIncome = () => setModalType("income");
  const handleOpenPayment = () => setModalType("payment");

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex items-center justify-center"
          onClick={handleOutsideClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {!transaction && (
              <div className="flex justify-between mb-4">
                <button
                  onClick={handleOpenPayment}
                  className={`py-2 px-4 border border-transparent rounded-md ${
                    modalType === "payment" ? "bg-green-600" : "bg-green-500"
                  } text-white hover:bg-green-700 focus:outline-none`}
                >
                  Nuevo gasto
                </button>
                <button
                  onClick={handleOpenIncome}
                  className={`py-2 px-4 border border-transparent rounded-md ${
                    modalType === "income" ? "bg-blue-600" : "bg-blue-500"
                  } text-white hover:bg-blue-700 focus:outline-none`}
                >
                  Nuevo ingreso
                </button>
              </div>
            )}
            <div className="mt-2">
              {modalType === "income" && (
                <NewIncomeModal
                  paymentType={modalType}
                  onClose={onClose}
                  transaction={transaction}
                />
              )}
              {modalType === "payment" && (
                <NewPaymentModal
                  paymentType={modalType}
                  onClose={onClose}
                  transaction={transaction}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransactionModal;
