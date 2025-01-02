"use client";
import { RootState } from "@/redux/store/store";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  groupTransactionsByCategory,
  groupTransactionsByType,
  groupTransactionsByStore,
} from "./transactionFilters";

// Define las opciones de filtros disponibles
const filterOptions = [
  {
    value: "category",
    label: "Categoría",
    dataKey: "category",
    barKey: "totalAmount",
    color: "#82ca9d",
  },
  {
    value: "type",
    label: "Tipo",
    dataKey: "type",
    barKey: "totalAmount",
    color: "#8884d8",
  },
  {
    value: "store",
    label: "Tienda",
    dataKey: "store",
    barKey: "totalAmount",
    color: "#ffc658",
  },
];

const TransactionBarChart = () => {
  const transactions = useSelector(
    (state: RootState) => state.transactions.transactions
  );

  // Datos agrupados
  const categoryData = Object.values(groupTransactionsByCategory(transactions));
  const typeData = Object.values(groupTransactionsByType(transactions));
  const storeData = Object.values(groupTransactionsByStore(transactions));

  // Estado para manejar el filtro seleccionado
  const [selectedFilter, setSelectedFilter] = useState(filterOptions[0]);

  // Mapea los filtros seleccionados a los datos correspondientes
  const getData = () => {
    switch (selectedFilter.value) {
      case "category":
        return categoryData;
      case "type":
        return typeData;
      case "store":
        return storeData;
      default:
        return categoryData;
    }
  };

  // Maneja el cambio de filtro
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = filterOptions.find(
      (option) => option.value === event.target.value
    );
    if (selectedOption) {
      setSelectedFilter(selectedOption);
    }
  };

  return (
    <div>
      {/* Lista desplegable para seleccionar el filtro */}
      <select
        onChange={handleFilterChange}
        value={selectedFilter.value}
        className="mb-4 p-2 border rounded"
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Gráfico de barras con los datos según el filtro seleccionado */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={getData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={selectedFilter.dataKey} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={selectedFilter.barKey} fill={selectedFilter.color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionBarChart;
