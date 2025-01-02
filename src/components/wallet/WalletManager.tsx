"use client";

import React from "react";
import { useWalletManager } from "./walletManagerLogic";
// import WalletForm from "./WalletForm";
import WalletList from "./WalletList";
import useWallets from "@/hooks/useWallet";

const WalletManager = () => {
  const {
    // wallets,
    // newWalletName,
    isEditing,
    editWalletName,
    // handleInputChange,
    // handleAddWallet,
    handleEditClick,
    handleEditChange,
    handleSaveEdit,
    handleDeleteWallet,
  } = useWalletManager();

  const { wallets } = useWallets();
  console.log(wallets);
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4 text-black">Administrar Wallets</h2>
      {/* <WalletForm
        newWalletName={newWalletName}
        handleInputChange={handleInputChange}
        handleAddWallet={handleAddWallet}
      /> */}
      <WalletList
        wallets={wallets}
        isEditing={isEditing}
        editWalletName={editWalletName}
        handleEditClick={handleEditClick}
        handleEditChange={handleEditChange}
        handleSaveEdit={handleSaveEdit}
        handleDeleteWallet={handleDeleteWallet}
      />
    </div>
  );
};

export default WalletManager;
