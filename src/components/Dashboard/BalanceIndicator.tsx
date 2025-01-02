import React from "react";
import { formatToCurrency } from "@/utils/formatters";

interface BalanceIndicatorProps {
  label: string;
  amount: string;
  positive?: boolean;
}

const BalanceIndicator: React.FC<BalanceIndicatorProps> = ({
  label,
  amount,
  positive = false,
}) => {
  return (
    <div className="flex items-center">
      <p className="text-black">{label}:</p>
      <p
        className={`text-2xl font-bold ml-2 ${
          positive ? "text-green-500" : "text-red-500"
        }`}
      >
        {formatToCurrency(amount)}
      </p>
    </div>
  );
};

export default BalanceIndicator;
