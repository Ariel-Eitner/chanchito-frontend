import { BACKEND_URL } from "@/utils/exports";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  const baseUrl = `${BACKEND_URL}/users`;
  try {
    const { firstName, secondName, lastName, email, password } =
      await request.json();
    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        secondName,
        lastName,
        email,
        password,
        isActive: true, // Este campo lo puedes manejar en el backend
      }),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("Error al conectar con el backend:", error);
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
