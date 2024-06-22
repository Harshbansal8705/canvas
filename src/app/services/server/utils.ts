'use server'

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../db";
import { toast } from "react-toastify";

export async function authenticateUser(req: NextRequest) {
  const userHeader = req.headers.get("x-user");
  if (!userHeader) {
    return NextResponse.json({
      success: false,
      error: "Not Authenthicated",
      toast: {
        type: "error",
        message: "Not Authenthicated",
      }
    }, { status: 400 })
  }
  const currentUser = JSON.parse(Buffer.from(userHeader, 'base64').toString());
  if (!currentUser) {
    return NextResponse.json({
      success: false,
      error: "Invalid User",
      toast: {
        type: "error",
        message: "Invalid User",
      }
    }, { status: 400 })
  }
  const foundUser = await prisma.user.findUnique({ where: { id: currentUser.id || "" }, include: { canvases: true } });
  console.log(foundUser);
  if (foundUser && Object.keys(foundUser).length === 0) {
    return NextResponse.json({
      success: false,
      error: "User not found",
      toast: {
        type: "error",
        message: "User not found",
      }
    }, { status: 404 })
  }
  return foundUser;
}
