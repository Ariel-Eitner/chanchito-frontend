"use client";

import useWallets from "@/hooks/useWallet";
import React from "react";

interface Wallet {
  id: number;
  name: string;
}

interface WalletListProps {
  wallets: Wallet[];
  isEditing: number | null;
  editWalletName: string;
  handleEditClick: (id: number, name: string) => void;
  handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSaveEdit: (id: number) => void;
  handleDeleteWallet: (id: number) => void;
}

const WalletList: React.FC<WalletListProps> = ({
  // wallets,
  isEditing,
  editWalletName,
  handleEditClick,
  handleEditChange,
  handleSaveEdit,
  handleDeleteWallet,
}) => {
  const { wallets } = useWallets();
  return (
    <ul className="space-y-2">
      {wallets.map((wallet) => (
        <li
          key={wallet.id}
          className="p-4 border border-gray-300 rounded flex justify-between items-center"
        >
          {isEditing === wallet.id ? (
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={editWalletName}
                onChange={handleEditChange}
                className="p-2 border border-gray-300 rounded text-black"
              />
              <button
                onClick={() => handleSaveEdit(wallet.id)}
                className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
              >
                Guardar
              </button>
            </div>
          ) : (
            <>
              <span className="text-black">{wallet.name}</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEditClick(wallet.id, wallet.name)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  edit
                </button>
                <button
                  onClick={() => handleDeleteWallet(wallet.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  eliminar
                </button>
              </div>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default WalletList;
