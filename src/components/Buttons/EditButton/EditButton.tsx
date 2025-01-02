import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";
import React from "react";

interface EditButtonProps {
  transaction: CreateTransactionDto;
  onEdit: (transaction: CreateTransactionDto) => void;
}

const EditButton: React.FC<EditButtonProps> = ({ transaction, onEdit }) => {
  return (
    <button
      onClick={() => onEdit(transaction)}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Editar
    </button>
  );
};

export default EditButton;
