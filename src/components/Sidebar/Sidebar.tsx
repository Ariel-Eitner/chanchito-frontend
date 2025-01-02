"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Sidebar: React.FC = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        document.cookie = "accessToken=; path=/; samesite=strict";

        router.push("/"); // Redirigir a la página de login
      } else {
        // Manejo de error
        console.error("Logout failed:", data.error);
        alert("Logout failed: " + data.error);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen">
      <div className="p-4 text-xl font-bold">Opciones</div>
      <div className="divide-y divide-gray-700">
        <Link href="/home">
          <div className="py-2 px-4 cursor-pointer hover:bg-gray-700">
            Inicio
          </div>
        </Link>
        <Link href="/wallets">
          <div className="py-2 px-4 cursor-pointer hover:bg-gray-700">
            Billeteras
          </div>
        </Link>
        <Link href="/charts">
          <div className="py-2 px-4 cursor-pointer hover:bg-gray-700">
            Gráficos
          </div>
        </Link>
        <Link href="/settings">
          <div className="py-2 px-4 cursor-pointer hover:bg-gray-700">
            Ajustes
          </div>
        </Link>
        <button
          onClick={handleLogout}
          className="py-2 px-4 cursor-pointer hover:bg-gray-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
