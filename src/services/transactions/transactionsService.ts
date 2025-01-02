import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";
import { CreateTransactionDto } from "./dto/createTransactionDto";
import { UpdateTransactionDto } from "./dto/updateTransactionDto";

const baseUrl = "/transactions";

export const getUserTransactionsService = async () => {
  try {
    const response = await axiosInstance.get(baseUrl);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al obtener transacciones: ${error.message}`);
    } else {
      throw new Error("Error desconocido al obtener transacciones");
    }
  }
};

export const getTransactionByIdService = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al obtener la transacción: ${error.message}`);
    } else {
      throw new Error("Error desconocido al obtener la transacción");
    }
  }
};

export const createTransactionService = async (
  transaction: CreateTransactionDto
) => {
  try {
    const response = await axiosInstance.post(baseUrl, transaction);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al crear la transacción: ${error.message}`);
    } else {
      throw new Error("Error desconocido al crear la transacción");
    }
  }
};

export const updateTransactionService = async (
  id: string,
  transaction: UpdateTransactionDto
) => {
  try {
    const response = await axiosInstance.put(`${baseUrl}/${id}`, transaction);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al actualizar la transacción: ${error.message}`);
    } else {
      throw new Error("Error desconocido al actualizar la transacción");
    }
  }
};

export const deleteTransactionService = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al eliminar la transacción: ${error.message}`);
    } else {
      throw new Error("Error desconocido al eliminar la transacción");
    }
  }
};
