import React from "react";

interface DashboardButtonProps {
  onClick: () => void;
}

const AddTransactionButton: React.FC<DashboardButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
    >
      Añadir Transacción
    </button>
  );
};

export default AddTransactionButton;
