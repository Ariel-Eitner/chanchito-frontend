"use client";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "@/redux/store/store";
import {
  // addWallet,
  deleteWallet,
  setError,
  setLoading,
  setWallets,
  Wallet,
} from "@/redux/slices/walletSlice/walletSlice";
import {
  createWalletService,
  deleteWalletService,
  // getWalletByIdService,
  getWalletsService,
  // updateWalletService,
} from "@/services/wallets/walletService";

const useWallets = () => {
  const dispatch = useDispatch<AppDispatch>();
  const wallets = useSelector((state: RootState) => state.wallets.wallets);
  const loading = useSelector((state: RootState) => state.wallets.loading);
  const error = useSelector((state: RootState) => state.wallets.error);

  // Fetch wallets
  const fetchWallets = useCallback(async () => {
    dispatch(setLoading(true));

    try {
      const data = await getWalletsService();
      console.log(data);
      dispatch(setWallets(data.wallets));
      dispatch(setError(null));
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al obtener las wallets";
      toast.error(errorMessage);
      dispatch(setError(errorMessage));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Add wallet
  const addNewWallet = async (wallet: Wallet) => {
    // if (!name.trim()) return;

    dispatch(setLoading(true));
    try {
      // Aquí puedes reemplazar con el servicio real para añadir una wallet
      const newWallet = await createWalletService(wallet);
      //  dispatch(addWallet(newWallet));
      console.log(newWallet);
      toast.success("Wallet añadida exitosamente");
    } catch (error) {
      toast.error("Error al añadir la wallet");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Update wallet
  const updateWalletName = async (id: number, name: string) => {
    if (!name.trim()) return;
    console.log(id);
    dispatch(setLoading(true));
    try {
      // Aquí puedes reemplazar con el servicio real para actualizar una wallet
      // const updatedWallet = await updateWalletService(id, { name });
      // dispatch(updateWallet(updatedWallet));
      toast.success("Wallet actualizada exitosamente");
    } catch (error) {
      toast.error("Error al actualizar la wallet");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Delete wallet
  const removeWallet = async (wallet: Wallet) => {
    dispatch(setLoading(true));
    try {
      await deleteWalletService(wallet.name);
      dispatch(deleteWallet(wallet.id));
      toast.success("Wallet eliminada exitosamente");
    } catch (error) {
      toast.error("Error al eliminar la wallet");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets]);

  return {
    wallets,
    loading,
    error,
    addNewWallet,
    updateWalletName,
    removeWallet,
    refetch: fetchWallets,
  };
};

export default useWallets;
