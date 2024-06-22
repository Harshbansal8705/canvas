'use server'

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../db";

export async function authenticateUser(req: NextRequest) {
  const userHeader = req.headers.get("x-user");
  if (!userHeader) {
    return NextResponse.redirect("/login");
  }
  const currentUser = JSON.parse(Buffer.from(userHeader, 'base64').toString());
  if (!currentUser) {
    return NextResponse.redirect("/login");
  }
  const foundUser = await prisma.user.findUnique({ where: { id: currentUser.id || "" } });
  if (!foundUser) {
    return NextResponse.redirect("/login");
  }
  return foundUser;
}
