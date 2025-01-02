import Image from "next/image";

export default function WelcomeSection() {
  return (
    <div className="w-1/2 bg-blue-500 flex flex-col items-center justify-center text-white">
      <div>
        <Image src="/logo.png" alt="Logo" width={150} height={150} />
      </div>
      <h1 className="text-5xl font-bold mt-6">Bienvenido a [TuApp]</h1>
      <p className="mt-4 text-xl">Tu solución para la gestión financiera</p>
    </div>
  );
}
