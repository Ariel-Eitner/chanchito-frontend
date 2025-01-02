import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { FRONTEND_URL } from "./utils/exports";

const loginRoute = `${FRONTEND_URL}/auth/login`;
const secretKey = process.env.JWT_SECRET;

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) {
    return NextResponse.redirect(new URL(loginRoute, req.url));
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secretKey));
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL(loginRoute, req.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*", "/home/:path*"],
};
