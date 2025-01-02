import { incomeCategories } from "@/data/categories";
import { Subcategory } from "@/types/DailyExpensesTypes";
import React, { useEffect, useState } from "react";
import SaveButton from "../../Buttons/SaveButton/SaveButton";
import useTransactions from "@/hooks/useTransactions";
import { capitalizeFirstLetter } from "@/utils/formatters";

import UpdateButton from "../../Buttons/UpdateButton/UpdateButton";

// import { toast } from "react-toastify";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";
// import { updateTransactionService } from "@/services/transactions/transactionsService";

interface DailyExpensesModalProps {
  paymentType: "payment" | "income";
  initialData?: CreateTransactionDto;
  onClose?: () => void;
  transaction?: CreateTransactionDto | null;
}

const NewIncomeModal: React.FC<DailyExpensesModalProps> = ({
  paymentType,
  initialData,
  // onClose,
  transaction,
}) => {
  const initialFormData: CreateTransactionDto = {
    date: initialData?.date || new Date().toISOString().slice(0, 10),
    concept: initialData?.concept || "",
    amountInCents: initialData?.amountInCents || null,
    category: initialData?.category ?? "",
    subcategory: initialData?.subcategory || "",
    notes: initialData?.notes || "",
    type: paymentType,
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

  useEffect(() => {
    if (transaction) {
      setFormData(transaction);
    }
  }, [transaction]);

  // const handleSave = () => {};

  const [formData, setFormData] = useState(initialFormData);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);

  const {
    createTransactionHook,
    loading,
    error,
    refetch,
    updateTransactionHook,
  } = useTransactions();

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    setFormData({
      ...formData,
      category,
      subcategory: "", // Reset subcategory when category changes
    });

    // Update subcategories based on selected category
    const selectedCategory = incomeCategories.find(
      (cat) => cat.name === category
    );
    if (selectedCategory) {
      setSubcategories(selectedCategory.subcategories);
    } else {
      setSubcategories([]);
    }
  };

  const handleSubcategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subcategory = event.target.value;
    setFormData({
      ...formData,
      subcategory,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
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
      date: new Date(formData.date).toISOString(),
      concept: formData.concept,
      amountInCents: Math.round((formData.amountInCents ?? 0) * 100),
      category: formData.category,
      subcategory: formData.subcategory,
      notes: formData.notes,
      type: formData.type,
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
    const updatedTransactionForm: CreateTransactionDto = {
      date: new Date(formData.date).toISOString(),
      concept: formData.concept,
      amountInCents: Math.round((formData.amountInCents ?? 0) * 100),
      category: formData.category,
      subcategory: formData.subcategory,
      subsubcategory: formData.subsubcategory,
      unitPrice: Math.round((formData.unitPrice ?? 0) * 100),
      quantity: Math.round(formData.quantity ?? 0),
      store: formData.store,
      brand: formData.brand,
      notes: formData.notes,
      type: formData.type,
    };

    if (!transaction || !transaction._id) {
      console.error("Transaction is null or undefined");
      return;
    }

    const response = await updateTransactionHook(
      transaction?._id,
      updatedTransactionForm
    );
    console.log(response);

    // toast.success(response.message);
    setFormData(initialFormData);
    // refetch();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
      <h2 className="text-2xl font-bold mb-4">{getTitle()}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700"
            >
              Fecha <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="concept"
              className="block text-sm font-medium text-gray-700"
            >
              Concepto <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="concept"
              name="concept"
              value={formData.concept}
              onChange={handleChange}
              autoFocus
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/3">
            <label
              htmlFor="amountInCents"
              className="block text-sm font-medium text-gray-700"
            >
              Monto <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="amountInCents"
              name="amountInCents"
              value={formData.amountInCents || 0}
              onChange={handleChange}
              required
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-2/3">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Categoría <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleCategoryChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Ninguna</option>
              {incomeCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {subcategories.length > 0 && (
          <div className="flex space-x-4">
            <div className="w-1/3">
              <label
                htmlFor="subcategory"
                className="block text-sm font-medium text-gray-700"
              >
                Subcategoría <span className="text-red-500">*</span>
              </label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleSubcategoryChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Ninguna</option>
                {subcategories.map((subcat) => (
                  <option key={subcat.name} value={subcat.name}>
                    {subcat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notas
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {transaction ? (
          <UpdateButton loading={loading} onClick={handleUpdate} />
        ) : (
          <SaveButton loading={loading} onClick={handleClick} />
        )}
      </form>
    </div>
  );
};

export default NewIncomeModal;
