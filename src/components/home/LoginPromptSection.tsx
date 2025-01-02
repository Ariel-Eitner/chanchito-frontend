import Link from "next/link";

export default function LoginPromptSection() {
  return (
    <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold mb-6">¡Bienvenido!</h2>
      <p className="text-lg mb-6">Por favor, inicia sesión para continuar.</p>
      <Link href="/auth/login">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4">
          Iniciar Sesión
        </button>
      </Link>
      <p className="text-gray-700">
        ¿No tienes cuenta?{" "}
        <Link
          href="/auth/signup"
          className="text-blue-500 hover:text-blue-800 font-bold"
        >
          Crear una
        </Link>
      </p>
    </div>
  );
}
