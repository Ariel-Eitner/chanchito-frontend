"use client";

import React, { useState } from "react";

interface WalletFormProps {
  handleAddWallet: (walletType: string, walletName: string) => void;
}

const WalletForm: React.FC<WalletFormProps> = () => {
  const [walletType, setWalletType] = useState("");
  const [walletName, setWalletName] = useState("");
  const [walletSubType, setWalletSubType] = useState("");

  const handleWalletTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWalletType(e.target.value);
    setWalletSubType(""); // Reset the subtype when type changes
  };

  const handleWalletNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletName(e.target.value);
  };

  const handleWalletSubTypeChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setWalletSubType(e.target.value);
  };

  // const handleAddWalletClick = () => {
  //   walletType, walletSubType || walletName;
  // };

  const renderSubTypeOptions = () => {
    switch (walletType) {
      case "efectivo":
        return (
          <select
            value={walletSubType}
            onChange={handleWalletSubTypeChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          >
            <option value="">Selecciona una opción</option>
            <option value="efectivo">Efectivo</option>
            <option value="alcancia">Alcancía</option>
            <option value="caja chica">Caja Chica</option>
          </select>
        );
      case "banco":
        return (
          <select
            value={walletSubType}
            onChange={handleWalletSubTypeChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          >
            <option value="">Selecciona un banco</option>
            <option value="banco santander">Banco Santander</option>
            <option value="banco bbva">Banco BBVA</option>
            <option value="banco nacion">Banco Nación</option>
            <option value="otro banco">Otro Banco</option>
          </select>
        );
      case "billetera virtual":
        return (
          <select
            value={walletSubType}
            onChange={handleWalletSubTypeChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          >
            <option value="">Selecciona una billetera virtual</option>
            <option value="mercado pago">Mercado Pago</option>
            <option value="uala">Ualá</option>
            <option value="naranja x">Naranja X</option>
            <option value="otro billetera">Otra Billetera</option>
          </select>
        );
      case "tarjeta de crédito":
        return (
          <select
            value={walletSubType}
            onChange={handleWalletSubTypeChange}
            className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          >
            <option value="">Selecciona una tarjeta</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="american express">American Express</option>
            <option value="otra tarjeta">Otra Tarjeta</option>
          </select>
        );
      case "otro":
        return (
          <input
            type="text"
            value={walletName}
            onChange={handleWalletNameChange}
            placeholder="Nombre de la Wallet"
            className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <select
        value={walletType}
        onChange={handleWalletTypeChange}
        className="w-full p-2 mb-2 border border-gray-300 rounded text-black"
      >
        <option value="">Selecciona el tipo de wallet</option>
        <option value="efectivo">Efectivo</option>
        <option value="banco">Banco</option>
        <option value="billetera virtual">Billetera Virtual</option>
        <option value="tarjeta de crédito">Tarjeta de Crédito</option>
        <option value="otro">Otro</option>
      </select>

      {walletType && renderSubTypeOptions()}

      <button
        // onClick={handleAddWalletClick}
        className="w-full bg-blue-500 py-2 rounded hover:bg-blue-600 text-white"
        disabled={!walletType || (!walletSubType && walletType !== "otro")}
      >
        Agregar Wallet
      </button>
    </div>
  );
};

export default WalletForm;
