import React from "react";

interface DeleteButtonProps {
  transactionId: string;
  onDelete: (id: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  transactionId,
  onDelete,
}) => {
  return (
    <button
      onClick={() => onDelete(transactionId)}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Eliminar
    </button>
  );
};

export default DeleteButton;
