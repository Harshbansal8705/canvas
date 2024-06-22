import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.split(" ")[1];
  if (!token) return NextResponse.json({ success: false, error: "Token is required" }, { status: 400 });

  let { payload: user } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET || "")) as any;
  if (!user) return NextResponse.json({ success: false, error: "Invalid token" }, { status: 400 });

  const userHeader = Buffer.from(JSON.stringify(user)).toString('base64');
  const reqHeaders = new Headers(req.headers);
  reqHeaders.set("x-user", userHeader);
  return NextResponse.next({
    request: {
      ...req,
      headers: reqHeaders
    }
  });
}

export const config = {
  matcher: ["/api/((?!login).*)/:path*"]
};
