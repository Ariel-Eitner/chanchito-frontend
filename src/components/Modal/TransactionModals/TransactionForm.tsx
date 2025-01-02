import React, { useEffect, useState } from "react";

import { Subcategory } from "@/types/DailyExpensesTypes";
import useTransactions from "@/hooks/useTransactions";
import { capitalizeFirstLetter } from "@/utils/formatters";

import UpdateButton from "@/components/Buttons/UpdateButton/UpdateButton";
import SaveButton from "@/components/Buttons/SaveButton/SaveButton";
import { paymentCategories, incomeCategories } from "@/data/categories";
import FormField from "./FormField";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";
import { updateTransactionService } from "@/services/transactions/transactionsService";

interface TransactionFormProps {
  paymentType: "payment" | "income";
  initialData?: CreateTransactionDto;
  onClose?: () => void;
  transaction?: CreateTransactionDto | null;
}

const TransactionForm: React.FC<TransactionFormProps> = ({
  paymentType,
  initialData,
  // onClose,
  transaction,
}) => {
  const categories =
    paymentType === "payment" ? paymentCategories : incomeCategories;

  const initialFormData: CreateTransactionDto = {
    date: initialData?.date || new Date().toISOString().slice(0, 10),
    concept: initialData?.concept || "",
    amountInCents: initialData?.amountInCents || null,
    category: initialData?.category ?? "",
    subcategory: initialData?.subcategory || "",
    subsubcategory: initialData?.subsubcategory || "",
    quantity: initialData?.quantity || null,
    unitPrice: initialData?.unitPrice || null,
    store: initialData?.store || "",
    brand: initialData?.brand || "",
    notes: initialData?.notes || "",
    type: paymentType,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subSubcategories, setSubSubcategories] = useState<string[]>([]);
  const { createTransactionHook, loading, error, refetch } = useTransactions();

  useEffect(() => {
    if (transaction) {
      const mappedTransaction = {
        ...transaction,
        amountInCents: (transaction.amountInCents ?? 0) / 100,
        unitPrice: (transaction.unitPrice ?? 0) / 100,
      };
      setFormData(mappedTransaction);
    }
  }, [transaction]);

  const handleCategoryChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const category = event.target.value;
    const selectedCategoryObj = categories.find((cat) => cat.name === category);
    if (selectedCategoryObj) {
      setFormData({
        ...formData,
        category,
        subcategory: "",
        subsubcategory: "",
      });
      setSubcategories(selectedCategoryObj.subcategories);
      setSubSubcategories([]);
    }
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const subcategory = event.target.value;
    const selectedSubcategoryObj = subcategories.find(
      (sub) => sub.name === subcategory
    );
    if (selectedSubcategoryObj) {
      setFormData({
        ...formData,
        subcategory,
        subsubcategory: "",
      });
      setSubSubcategories(selectedSubcategoryObj.subSubcategories || []);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value), // Convert to float for decimal numbers
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: capitalizeFirstLetter(value),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const transaction: CreateTransactionDto = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      amountInCents: Math.round((formData.amountInCents ?? 0) * 100),
      unitPrice: Math.round((formData.unitPrice ?? 0) * 100),
      quantity: Math.round(formData.quantity ?? 0),
    };

    await createTransactionHook(transaction);
    setFormData(initialFormData);
    refetch();
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await handleSubmit(e as any);
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const updatedTransaction: CreateTransactionDto = {
      ...formData,
      date: new Date(formData.date).toISOString(),
      amountInCents: Math.round((formData.amountInCents ?? 0) * 100),
      unitPrice: Math.round((formData.unitPrice ?? 0) * 100),
      quantity: Math.round(formData.quantity ?? 0),
    };

    if (!transaction || !transaction._id) {
      console.error("Transaction is null or undefined");
      return;
    }
    await updateTransactionService(transaction?._id, updatedTransaction);
    setFormData(initialFormData);
    refetch();
  };

  const getTitle = () => {
    if (transaction) {
      return paymentType === "payment"
        ? "Modificar Gasto"
        : "Modificar Ingreso";
    } else {
      return paymentType === "payment" ? "Nuevo Gasto" : "Nuevo Ingreso";
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
      <h2 className="text-2xl font-bold mb-4">{getTitle()}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <FormField
            id="date"
            label="Fecha"
            type="date"
            value={formData.date}
            onChange={handleChange}
            required
            autoFocus
          />
          <FormField
            id="concept"
            label="Artículo"
            type="text"
            value={formData.concept}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex space-x-4">
          <FormField
            id="amountInCents"
            label="Monto"
            type="number"
            value={formData.amountInCents}
            onChange={handleChange}
            required
            min={0}
          />
          <FormField
            id="quantity"
            label="Cantidad"
            type="number"
            value={formData.quantity}
            onChange={handleChange}
            min={0}
          />
          <FormField
            id="unitPrice"
            label="Precio Unitario"
            type="number"
            value={formData.unitPrice}
            onChange={handleChange}
            min={0}
          />
        </div>
        <FormField
          id="category"
          label="Categoría"
          type="select"
          value={formData.category}
          onChange={handleCategoryChange}
          options={categories.map((cat) => cat.name)}
          required
        />
        {subcategories.length > 0 && (
          <FormField
            id="subcategory"
            label="Subcategoría"
            type="select"
            value={formData.subcategory}
            onChange={handleSubcategoryChange}
            options={subcategories.map((sub) => sub.name)}
          />
        )}
        {subSubcategories.length > 0 && (
          <FormField
            id="subsubcategory"
            label="Subsubcategoría"
            type="select"
            value={formData.subsubcategory}
            onChange={handleChange}
            options={subSubcategories}
          />
        )}
        <FormField
          id="store"
          label="Comercio"
          type="text"
          value={formData.store}
          onChange={handleChange}
        />
        <FormField
          id="brand"
          label="Marca"
          type="text"
          value={formData.brand}
          onChange={handleChange}
        />
        <FormField
          id="notes"
          label="Notas"
          type="textarea"
          value={formData.notes}
          onChange={handleChange}
        />
        <div className="flex justify-end mt-6">
          {transaction ? (
            <UpdateButton onClick={handleUpdate} loading={loading} />
          ) : (
            <SaveButton onClick={handleClick} loading={loading} />
          )}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
