import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/utils/exports";

export async function POST(request: Request) {
  const baseUrl = `${BACKEND_URL}/auth/login`;
  try {
    const { email, password } = await request.json();

    const res = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message || "Login failed" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
