import axiosInstance from "@/utils/axiosConfig";
import React, { useState } from "react";
import { toast } from "react-toastify"; // Asegúrate de que la librería esté instalada y configurada

export default function Security() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);

      // Usando Axios en lugar de fetch
      const res = await axiosInstance.put("/auth/change-password", {
        currentPassword,
        newPassword,
      });
      toast.success(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Error al cambiar la contraseña"
        );
        setError(
          error.response.data.message || "Error al cambiar la contraseña"
        );
      } else {
        // Error de red o de otro tipo
        toast.error("Error al conectarse al servidor");
        setError("Error al conectarse al servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">Seguridad</h2>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label className="block font-medium text-black">
            Contraseña Actual:
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Contraseña actual"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-black">
            Nueva Contraseña:
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nueva contraseña"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium text-black">
            Confirmar Nueva Contraseña:
          </label>
          <input
            type="password"
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar nueva contraseña"
            required
          />
        </div>
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Cambiando..." : "Cambiar Contraseña"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}
