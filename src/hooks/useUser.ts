import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUserDto } from "@/services/users/dto/updateUserDto";
import axiosInstance from "@/utils/axiosConfig";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { setUser } from "@/redux/slices/userSlice/userSlice";
import { RootState } from "@/redux/store/store";
import {
  deleteUserUservice,
  updateUserService,
} from "@/services/users/usersService";

export const useUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);

  // ************************** Read (Fetch) User **************************
  useEffect(() => {
    const fetchUserHook = async (id: string) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`/users/${id}`);
        dispatch(setUser(response.data.data));
        setError(null);
      } catch (err) {
        console.log(err);
        if (axios.isAxiosError(err)) {
          setError(`Error al obtener el usuario: ${err.message}`);
        } else {
          setError("Error desconocido al obtener el usuario");
        }
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      const token = Cookies.get("accessToken");
      if (token) {
        try {
          const decodedToken: any = jwtDecode(token);
          const userId = decodedToken.sub;
          fetchUserHook(userId);
        } catch (error) {
          setError("Error al decodificar el token");
          setLoading(false);
        }
      } else {
        setError("No se encontró el token JWT en las cookies");
        setLoading(false);
      }
    }
  }, [user, dispatch]);

  // ************************** Update User **************************
  const updateUserHook = async (id: string, user: UpdateUserDto) => {
    setLoading(true);
    try {
      const updatedUser = await updateUserService(id, user);
      toast.success("Usuario actualizado exitosamente");
      console.log(updatedUser, "UPDATEDUSER");
      // Aquí podrías agregar un dispatch si deseas actualizar el estado en Redux
      setError(null);
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Error al actualizar el usuario. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // ************************** Delete User **************************
  const deleteUserHook = async (id: string, password: string) => {
    setLoading(true);
    try {
      await deleteUserUservice(id, password);
      toast.success("Usuario eliminado exitosamente");
      // Aquí podrías agregar un dispatch si deseas actualizar el estado en Redux
      setError(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error al eliminar el usuario. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  // ************************** Return Values and Functions **************************
  return {
    loading,
    error,
    updateUserHook,
    deleteUserHook,
  };
};
