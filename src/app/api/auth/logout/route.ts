import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/utils/exports";

export async function POST() {
  const baseUrl = `${BACKEND_URL}/auth/logout`;
  try {
    const response = await fetch(baseUrl, {
      method: "POST",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to logout");
    }

    return NextResponse.json({ message: "Logout successful" });
  } catch (error) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
