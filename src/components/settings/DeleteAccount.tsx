import { useUsers } from "@/hooks/useUser";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export default function DeleteAccount() {
  const { deleteUserHook } = useUsers();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteAccount = async () => {
    setLoading(true);
    setError(null);

    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        const userId = decodedToken.sub;

        await deleteUserHook(userId, password);

        document.cookie = "accessToken=; path=/; samesite=strict";
      } catch (error) {
        console.log("Error decodificando el token:", error);
        setError("Error al eliminar la cuenta. Inténtalo de nuevo más tarde.");
      } finally {
        setLoading(false);
        router.push("/");
      }
    } else {
      setError("No se encontró el token JWT en las cookies");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">
        Eliminar Cuenta
      </h2>
      <p className="text-red-600">
        Advertencia: Esta acción es irreversible. Si eliminas tu cuenta,
        perderás todos tus datos.
      </p>

      {error && <p className="text-red-600 mt-2">{error}</p>}

      <div className="mt-4">
        <label className="block font-medium text-black mb-2">Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 disabled:bg-gray-400"
        onClick={handleDeleteAccount}
        disabled={loading || !password}
      >
        {loading ? "Eliminando..." : "Eliminar Cuenta"}
      </button>
    </div>
  );
}
