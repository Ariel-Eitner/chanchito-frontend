"use client";

import { useForgotPasswordHandlers } from "./useForgotPassword";

export default function ForgotPasswordForm() {
  const { email, setEmail, submitted, handleForgotPassword } =
    useForgotPasswordHandlers();

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center mb-8 text-black">
        ¿Olvidaste tu contraseña?
      </h2>
      {!submitted ? (
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              placeholder="Ingresa tu correo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Recuperar Contraseña
            </button>
          </div>
        </form>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-700">
            Si existe una cuenta asociada a ese correo, te enviaremos un enlace
            para restablecer tu contraseña.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Revisa tu bandeja de entrada o spam.
          </p>
        </div>
      )}
    </div>
  );
}
