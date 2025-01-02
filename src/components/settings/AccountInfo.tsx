import { useUsers } from "@/hooks/useUser";
import { RootState } from "@/redux/store/store";
import { capitalizeFirstLetter } from "@/utils/formatters";
import React from "react";
import { useSelector } from "react-redux";

export default function AccountInfo() {
  const { user } = useSelector((state: RootState) => state.user);
  useUsers();
  console.log(user);

  const capitalizedName =
    capitalizeFirstLetter(user?.firstName || "") +
    " " +
    capitalizeFirstLetter(user?.secondName || "") +
    " " +
    capitalizeFirstLetter(user?.lastName || "");
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">
        Información de la Cuenta
      </h2>
      <div className="mb-4">
        <label className="block font-medium text-black">
          Nombre de Usuario:
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          value={capitalizedName}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-black">
          Correo Electrónico:
        </label>
        <input
          type="email"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          value={user?.email}
          readOnly
          disabled
        />
      </div>
      <div className="mb-4">
        <label className="block font-medium text-black">Contraseña</label>
        <input
          type="password"
          className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
          value={user?.password}
          readOnly
        />
      </div>
    </div>
  );
}
