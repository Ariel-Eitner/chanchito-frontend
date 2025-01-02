import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TransactionForm from "./TransactionForm";
import { paymentCategories, incomeCategories } from "@/data/categories";
import { Subcategory } from "@/types/DailyExpensesTypes";
import useTransactions from "@/hooks/useTransactions";
import { updateTransactionService } from "@/services/transactions/transactionsService";

// Mock the hooks and services
jest.mock("@/hooks/useTransactions");
jest.mock("@/services/transactions/transactionsService");

const mockCreateTransactionHook = jest.fn();
const mockUpdateTransactionService = jest.fn();
const mockRefetch = jest.fn();

(useTransactions as jest.Mock).mockReturnValue({
  createTransactionHook: mockCreateTransactionHook,
  loading: false,
  error: null,
  refetch: mockRefetch,
});

(updateTransactionService as jest.Mock).mockImplementation(
  mockUpdateTransactionService
);

const mockCategories = [
  {
    name: "Food",
    subcategories: [
      {
        name: "Snacks",
        subSubcategories: ["Chips", "Cookies"],
      },
    ],
  },
];

describe("TransactionForm", () => {
  test("renders with title based on transaction prop", () => {
    render(<TransactionForm paymentType="payment" onClose={() => {}} />);
    expect(screen.getByText("Nuevo Gasto")).toBeInTheDocument();

    render(
      <TransactionForm
        paymentType="payment"
        transaction={{
          _id: "1",
          date: "2024-01-01",
          concept: "Test",
          amountInCents: 1000,
          category: "Food",
          subcategory: "Snacks",
          type: "payment",
        }}
        onClose={() => {}}
      />
    );
    expect(screen.getByText("Modificar Gasto")).toBeInTheDocument();
  });

  test("updates subcategories when category changes", () => {
    render(
      <TransactionForm
        paymentType="payment"
        initialData={{
          category: "Food",
          amountInCents: 1000,
          concept: "test",
          date: "2024-01-01",
          type: "payment",
        }}
        onClose={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText("Categoría"), {
      target: { value: "Food" },
    });

    expect(screen.getByLabelText("Subcategoría")).toBeInTheDocument();
    expect(screen.getByLabelText("Subcategoría")).toHaveValue("");
  });

  test("calls createTransactionHook on form submit for new transaction", async () => {
    render(<TransactionForm paymentType="payment" onClose={() => {}} />);

    fireEvent.change(screen.getByLabelText("Fecha"), {
      target: { value: "2024-01-01" },
    });
    fireEvent.change(screen.getByLabelText("Artículo"), {
      target: { value: "Test Item" },
    });
    fireEvent.change(screen.getByLabelText("Monto"), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(mockCreateTransactionHook).toHaveBeenCalledWith({
        date: "2024-01-01T00:00:00.000Z",
        concept: "Test Item",
        amountInCents: 10000,
        category: "",
        subcategory: "",
        subsubcategory: "",
        quantity: null,
        unitPrice: null,
        store: "",
        brand: "",
        notes: "",
        type: "payment",
      });
    });
  });

  test("calls updateTransactionService on form submit for existing transaction", async () => {
    render(
      <TransactionForm
        paymentType="payment"
        transaction={{
          _id: "1",
          date: "2024-01-01",
          concept: "Test Item",
          amountInCents: 10000,
          category: "Food",
          type: "payment",
        }}
        onClose={() => {}}
      />
    );

    fireEvent.change(screen.getByLabelText("Fecha"), {
      target: { value: "2024-01-02" },
    });
    fireEvent.change(screen.getByLabelText("Artículo"), {
      target: { value: "Updated Item" },
    });

    fireEvent.click(screen.getByText("Actualizar"));

    await waitFor(() => {
      expect(mockUpdateTransactionService).toHaveBeenCalledWith("1", {
        date: "2024-01-02T00:00:00.000Z",
        concept: "Updated Item",
        amountInCents: 10000,
        category: "Food",
        subcategory: "",
        subsubcategory: "",
        quantity: null,
        unitPrice: null,
        store: "",
        brand: "",
        notes: "",
        type: "payment",
      });
    });
  });
});
