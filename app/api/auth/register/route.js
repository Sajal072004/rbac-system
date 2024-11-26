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

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists." },
        { status: 409 }
      );
    }

    // Hash the password using bcrypt
    const saltRounds = 10; // Higher value means more security but slower hashing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Assign default roleId = 2 if not provided
    const newRoleId = roleId || 2;

    // Create the new user with the hashed password
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword, // Store the hashed password
        roleId: newRoleId,
      },
    });

    // Create a JWT token after successful registration
    const token = jwt.sign(
      { userId: newUser.id, roleId: newUser.roleId },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Return the token and user data
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
