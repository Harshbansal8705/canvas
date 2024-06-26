'use server'

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_USERNAME,
    pass: process.env.NODEMAILER_PASSWORD
  }
});

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

export async function sendOtp(to: string, otp: string) {
  const mailOptions = {
    from: `Canvas <${process.env.NODEMAILER_USERNAME}>`,
    to,
    subject: 'OTP for Login to Canvas',
    text: `Your OTP for login to Canvas is ${otp}. This OTP is valid for 5 minutes.`
  };
  
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}