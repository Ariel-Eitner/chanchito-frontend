import { Subcategory } from "@/types/DailyExpensesTypes";
import React, { useEffect, useState } from "react";
import useTransactions from "@/hooks/useTransactions";
import { capitalizeFirstLetter } from "@/utils/formatters";

import { paymentCategories } from "@/data/categories";

import UpdateButton from "@/components/Buttons/UpdateButton/UpdateButton";
import SaveButton from "@/components/Buttons/SaveButton/SaveButton";
import { toast } from "react-toastify";
import { updateTransactionService } from "@/services/transactions/transactionsService";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";

interface DailyExpensesModalProps {
  paymentType: "payment" | "income";
  initialData?: CreateTransactionDto;
  onClose?: () => void;
  transaction?: CreateTransactionDto | null;
}

const NewPaymentModal: React.FC<DailyExpensesModalProps> = ({
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
    subsubcategory: initialData?.subsubcategory || "",
    quantity: initialData?.quantity || null,
    unitPrice: initialData?.unitPrice || null,
    store: initialData?.store || "",
    brand: initialData?.brand || "",
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
      const mappedTransaction = {
        ...transaction,
        amountInCents: (transaction.amountInCents ?? 0) / 100,
        unitPrice: (transaction.unitPrice ?? 0) / 100,
      };
      setFormData(mappedTransaction);
    }
  }, [transaction]);

  const [formData, setFormData] = useState(initialFormData);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [subSubcategories, setSubSubcategories] = useState<string[]>([]);

  const { createTransactionHook, loading, error, refetch } = useTransactions();

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const category = event.target.value;
    const selectedCategoryObj = paymentCategories.find(
      (cat) => cat.name === category
    );
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
    event: React.ChangeEvent<HTMLSelectElement>
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
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "number") {
      setFormData((prev) => ({
        ...prev,
        [name]: parseFloat(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: capitalizeFirstLetter(value),
      }));
    }
  };

  const handleSubmit = async (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    const transaction: CreateTransactionDto = {
      date: new Date(formData.date).toISOString(),
      concept: formData.concept,
      amountInCents: Math.round((formData.amountInCents ?? 0) * 100),
      category: formData.category,
      subcategory: formData.subcategory,
      subsubcategory: formData.subsubcategory,
      quantity: Math.round(formData.quantity ?? 0),
      unitPrice: Math.round((formData.unitPrice ?? 0) * 100),
      store: formData.store,
      brand: formData.brand,
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
    const updatedTransaction: CreateTransactionDto = {
      date: new Date(formData.date).toISOString(),
      concept: formData.concept,
      amountInCents: Math.round((formData.amountInCents ?? 0) * 100),
      category: formData.category,
      subcategory: formData.subcategory,
      subsubcategory: formData.subsubcategory,
      quantity: Math.round(formData.quantity ?? 0),
      unitPrice: Math.round((formData.unitPrice ?? 0) * 100),
      store: formData.store,
      brand: formData.brand,
      notes: formData.notes,
      type: formData.type,
    };

    if (!transaction || !transaction._id) {
      console.error("Transaction is null or undefined");
      return;
    }
    const response = await updateTransactionService(
      transaction._id,
      updatedTransaction
    );
    toast.success(response.message);
    setFormData(initialFormData);
    refetch();
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
              Artículo <span className="text-red-500">*</span>
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
              value={
                formData.amountInCents !== null ? formData.amountInCents : ""
              }
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
              {paymentCategories.map((category) => (
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
            {subSubcategories.length > 0 && (
              <div className="w-2/3">
                <label
                  htmlFor="subsubcategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subsubcategoría
                </label>
                <select
                  id="subsubcategory"
                  name="subsubcategory"
                  value={formData.subsubcategory}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Ninguna</option>
                  {subSubcategories.map((subsubcat) => (
                    <option key={subsubcat} value={subsubcat}>
                      {subsubcat}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        <div className="flex space-x-4">
          <div className="w-1/3">
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
            >
              Cantidad
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={formData.quantity !== null ? formData.quantity : ""}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-2/3">
            <label
              htmlFor="unitPrice"
              className="block text-sm font-medium text-gray-700"
            >
              Precio Unitario
            </label>
            <input
              type="number"
              id="unitPrice"
              name="unitPrice"
              value={formData.unitPrice !== null ? formData.unitPrice : ""}
              onChange={handleChange}
              min="0"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <div className="w-1/2">
            <label
              htmlFor="store"
              className="block text-sm font-medium text-gray-700"
            >
              Tienda
            </label>
            <input
              type="text"
              id="store"
              name="store"
              value={formData.store}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700"
            >
              Marca
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>

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

export default NewPaymentModal;
