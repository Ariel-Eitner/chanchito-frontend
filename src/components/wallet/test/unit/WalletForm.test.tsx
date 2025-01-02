import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import WalletForm from "../../WalletForm";

describe("WalletForm Component", () => {
  const handleAddWalletMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders wallet type select and button", () => {
    render(<WalletForm handleAddWallet={handleAddWalletMock} />);

    // Verifica que el selector de tipo de wallet esté presente
    expect(
      screen.getByText("Selecciona el tipo de wallet")
    ).toBeInTheDocument();

    // Verifica que el botón "Agregar Wallet" esté presente y deshabilitado inicialmente
    expect(
      screen.getByRole("button", { name: /Agregar Wallet/i })
    ).toBeDisabled();
  });

  test("enables the button when a valid wallet type and sub-type are selected", () => {
    render(<WalletForm handleAddWallet={handleAddWalletMock} />);

    // Selecciona el tipo de wallet
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "efectivo" },
    });

    // Verifica que las opciones de subtipo se rendericen correctamente
    expect(screen.getByText("Selecciona una opción")).toBeInTheDocument();

    // Selecciona un subtipo de wallet
    fireEvent.change(screen.getByDisplayValue("Selecciona una opción"), {
      target: { value: "efectivo" },
    });

    // Verifica que el botón esté habilitado
    expect(
      screen.getByRole("button", { name: /Agregar Wallet/i })
    ).toBeEnabled();
  });

  test("calls handleAddWallet when the button is clicked", () => {
    render(<WalletForm handleAddWallet={handleAddWalletMock} />);

    // Selecciona el tipo de wallet
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "efectivo" },
    });

    // Selecciona un subtipo de wallet
    fireEvent.change(screen.getByDisplayValue("Selecciona una opción"), {
      target: { value: "efectivo" },
    });

    // Hacer clic en el botón
    fireEvent.click(screen.getByRole("button", { name: /Agregar Wallet/i }));

    // Verifica que la función `handleAddWallet` se haya llamado con los argumentos correctos
    expect(handleAddWalletMock).toHaveBeenCalledTimes(1);
    expect(handleAddWalletMock).toHaveBeenCalledWith("efectivo", "efectivo");
  });

  test("resets walletSubType when walletType changes", () => {
    render(<WalletForm handleAddWallet={handleAddWalletMock} />);

    // Selecciona un tipo y subtipo inicial
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "efectivo" },
    });
    fireEvent.change(screen.getByDisplayValue("Selecciona una opción"), {
      target: { value: "alcancia" },
    });

    // Cambia el tipo de wallet
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "banco" },
    });

    // Verifica que el subtipo se haya reiniciado
    expect(screen.getByDisplayValue("Selecciona un banco")).toBeInTheDocument();
  });
});
