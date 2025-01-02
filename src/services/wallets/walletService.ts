import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";
import { CreateWalletDto } from "./dto/CreateWalletDto";
import { UpdateWalletDto } from "./dto/UpdateWalletDto";

const baseUrl = "/wallets";

export const getWalletsService = async () => {
  try {
    const response = await axiosInstance.get(`${baseUrl}`); // Ajusta el endpoint según tu backend
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al obtener las wallets: ${error.message}`);
    } else {
      throw new Error("Error desconocido al obtener las wallets");
    }
  }
};

export const getWalletByIdService = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al obtener la wallet: ${error.message}`);
    } else {
      throw new Error("Error desconocido al obtener la wallet");
    }
  }
};

export const createWalletService = async (wallet: CreateWalletDto) => {
  try {
    const response = await axiosInstance.post(baseUrl, wallet);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al crear la wallet: ${error.message}`);
    } else {
      throw new Error("Error desconocido al crear la wallet");
    }
  }
};

export const updateWalletService = async (
  id: string,
  wallet: UpdateWalletDto
) => {
  try {
    const response = await axiosInstance.put(`${baseUrl}/${id}`, wallet);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al actualizar la wallet: ${error.message}`);
    } else {
      throw new Error("Error desconocido al actualizar la wallet");
    }
  }
};

export const deleteWalletService = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al eliminar la wallet: ${error.message}`);
    } else {
      throw new Error("Error desconocido al eliminar la wallet");
    }
  }
};
