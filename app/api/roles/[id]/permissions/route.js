import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function POST(req, { params }) {
  try {
    const { id } = params; // Role ID from the URL
    const { permissions } = await req.json(); // Array of permission names to assign

    if (!permissions || permissions.length === 0) {
      return NextResponse.json(
        { error: "No permissions provided." },
        { status: 400 }
      );
    }

    // Fetch role by ID
    const role = await prisma.role.findUnique({
      where: { id: parseInt(id) },
    });

    if (!role) {
      return NextResponse.json(
        { error: `Role with ID ${id} not found.` },
        { status: 404 }
      );
    }

    // Fetch permission records by name
    const permissionRecords = await prisma.permission.findMany({
      where: {
        name: { in: permissions },
      },
    });

    if (permissionRecords.length !== permissions.length) {
      return NextResponse.json(
        { error: "One or more permissions are invalid." },
        { status: 400 }
      );
    }

    // Assign permissions to the role
    await prisma.role.update({
      where: { id: role.id },
      data: {
        permissions: {
          connect: permissionRecords.map((permission) => ({ id: permission.id })),
        },
      },
    });

    return NextResponse.json({ message: "Permissions assigned to role." }, { status: 200 });
  } catch (error) {
    console.error("Error assigning permissions:", error);
    return NextResponse.json(
      { error: "Failed to assign permissions to role." },
      { status: 500 }
    );
  }
}
