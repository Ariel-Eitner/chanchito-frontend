import { useState } from "react";

export const useWalletManager = () => {
  const [wallets, setWallets] = useState([
    { id: 1, name: "Efectivo" },
    { id: 2, name: "Mercado Pago" },
  ]);
  const [newWalletName, setNewWalletName] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editWalletName, setEditWalletName] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewWalletName(e.target.value);
  };

  const handleAddWallet = () => {
    if (newWalletName.trim()) {
      setWallets([...wallets, { id: wallets.length + 1, name: newWalletName }]);
      setNewWalletName("");
    }
  };

  const handleEditClick = (id: number, name: string) => {
    setIsEditing(id);
    setEditWalletName(name);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditWalletName(e.target.value);
  };

  const handleSaveEdit = (id: number) => {
    setWallets(
      wallets.map((wallet) =>
        wallet.id === id ? { ...wallet, name: editWalletName } : wallet
      )
    );
    setIsEditing(null);
  };

  const handleDeleteWallet = (id: number) => {
    setWallets(wallets.filter((wallet) => wallet.id !== id));
  };

  return {
    wallets,
    newWalletName,
    isEditing,
    editWalletName,
    handleInputChange,
    handleAddWallet,
    handleEditClick,
    handleEditChange,
    handleSaveEdit,
    handleDeleteWallet,
  };
};
