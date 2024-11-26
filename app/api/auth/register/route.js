import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password, roleId } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required." },
        { status: 400 }
      );
    }

    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    
    const saltRounds = 10; 
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    
    const newRoleId = roleId || 2;

    
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, 
        roleId: newRoleId,
      },
    });

    
    const token = jwt.sign(
      { userId: newUser.id, roleId: newUser.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    
    return NextResponse.json(
      {
        message: "Registration successful!",
        token,
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          roleId: newUser.roleId,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);

    return NextResponse.json(
      { error: "Failed to create user." },
      { status: 500 }
    );
  }
}
