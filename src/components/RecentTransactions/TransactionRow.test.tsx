// TransactionRow.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TransactionRow from "./TransactionRow";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";

const mockTransaction: CreateTransactionDto = {
  _id: "1",
  date: "2023-08-21",
  concept: "Compra de prueba",
  amountInCents: 1000,
  category: "Comida",
  subcategory: "Snacks",
  subsubcategory: "",
  quantity: 2,
  unitPrice: 500,
  store: "Supermercado X",
  brand: "Marca Y",
  notes: "Nota de prueba",
  type: "payment",
};

const mockOnEdit = jest.fn();
const mockOnDelete = jest.fn();

describe("TransactionRow", () => {
  it("renders the transaction details correctly", () => {
    render(
      <TransactionRow
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    expect(screen.getByText("20/08/2023")).toBeInTheDocument(); // Verifica la fecha formateada
    expect(screen.getByText("Compra de prueba")).toBeInTheDocument();
    expect(screen.getByText("$ 10,00")).toBeInTheDocument(); // Verifica la cantidad formateada a moneda
    expect(screen.getByText("Comida")).toBeInTheDocument();
    expect(screen.getByText("Snacks")).toBeInTheDocument();
  });

  it("calls onEdit function when EditButton is clicked", () => {
    render(
      <TransactionRow
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /edit/i }));
    expect(mockOnEdit).toHaveBeenCalledWith(mockTransaction);
  });

  it("calls onDelete function when DeleteButton is clicked", () => {
    render(
      <TransactionRow
        transaction={mockTransaction}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
    expect(mockOnDelete).toHaveBeenCalledWith("1");
  });
});
