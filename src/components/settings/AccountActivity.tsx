import React from "react";

export default function AccountActivity() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-black">
        Actividad de la Cuenta
      </h2>
      <div className="mb-4">
        <label className="block font-medium text-black">
          Historial de Inicios de Sesión:
        </label>
        <ul className="mt-2">
          <li className="mb-2">
            <span className="text-black">
              Fecha: 01/08/2024, Dispositivo: Laptop, IP: 192.168.0.1
            </span>
          </li>
          <li className="mb-2">
            <span className="text-black">
              Fecha: 30/07/2024, Dispositivo: Móvil, IP: 192.168.0.2
            </span>
          </li>
        </ul>
      </div>
      <button className="mt-2 bg-red-600 text-black py-2 px-4 rounded hover:bg-red-700">
        Cerrar Sesión en Otros Dispositivos
      </button>
    </div>
  );
}
