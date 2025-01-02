import React from "react";
import { formatDate, formatToCurrency } from "@/utils/formatters";
import EditButton from "../Buttons/EditButton/EditButton";
import DeleteButton from "../Buttons/DeleteButton.tsx/DeleteButton";
import { CreateTransactionDto } from "@/services/transactions/dto/createTransactionDto";

interface TransactionRowProps {
  transaction: CreateTransactionDto;
  onEdit: (transaction: CreateTransactionDto) => void;
  onDelete: (id: string) => void;
}

const TransactionRow: React.FC<TransactionRowProps> = ({
  transaction,
  onEdit,
  onDelete,
}) => {
  return (
    <tr key={transaction._id} className="text-left">
      <td className="py-4 px-6 border-b border-gray-300">
        {formatDate(transaction.date)}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.concept}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.amountInCents !== null
          ? formatToCurrency(transaction.amountInCents / 100)
          : "Monto no especificado"}
      </td>

      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.category}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.subcategory}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.subsubcategory}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.quantity}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.unitPrice
          ? formatToCurrency(transaction.unitPrice / 100)
          : "No especificado"}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.store}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.brand}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">
        {transaction.notes}
      </td>
      <td className="py-4 px-6 border-b border-gray-300">{transaction.type}</td>
      <td className="py-4 px-6 border-b border-gray-300">
        <EditButton transaction={transaction} onEdit={onEdit} />
        <DeleteButton
          transactionId={transaction._id || ""}
          onDelete={onDelete}
        />
      </td>
    </tr>
  );
};

export default TransactionRow;
