import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

// POST request to create a new permission
export async function POST(req) {
  try {
    const { name } = await req.json(); // Get permission name from request body

    if (!name) {
      return NextResponse.json(
        { error: "Permission name is required." },
        { status: 400 }
      );
    }

    // Check if permission already exists
    const existingPermission = await prisma.permission.findUnique({
      where: { name },
    });

    if (existingPermission) {
      return NextResponse.json(
        { error: `Permission with name ${name} already exists.` },
        { status: 400 }
      );
    }

    // Create new permission
    const permission = await prisma.permission.create({
      data: { name },
    });

    return NextResponse.json({ message: "Permission created", permission }, { status: 201 });
  } catch (error) {
    console.error("Error creating permission:", error);
    return NextResponse.json(
      { error: "Failed to create permission." },
      { status: 500 }
    );
  }
}

// GET request to fetch all permissions
export async function GET(req) {
  try {
    // Fetch all permissions from the database
    const permissions = await prisma.permission.findMany();

    // Return the list of permissions
    return NextResponse.json({ permissions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching permissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch permissions." },
      { status: 500 }
    );
  }
}
