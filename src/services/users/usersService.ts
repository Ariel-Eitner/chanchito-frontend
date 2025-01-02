import axios from "axios";
import axiosInstance from "../../utils/axiosConfig";

import { UpdateUserDto } from "./dto/updateUserDto";

const baseUrl = "/users";

export const getUserByIdService = async (id: string) => {
  try {
    const response = await axiosInstance.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    } else {
      throw new Error("Error desconocido al obtener el usuario");
    }
  }
};

export const updateUserService = async (id: string, user: UpdateUserDto) => {
  try {
    const response = await axiosInstance.put(`${baseUrl}/${id}`, user);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    } else {
      throw new Error("Error desconocido al actualizar el usuario");
    }
  }
};

export const deleteUserUservice = async (id: string, password: string) => {
  try {
    const response = await axiosInstance.delete(`${baseUrl}/${id}`, {
      data: { password },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    } else {
      throw new Error("Error desconocido al eliminar el usuario");
    }
  }
};
