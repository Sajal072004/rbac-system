import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET(req, { params }) {
  try {
    const { id } = params; 
    const role = await prisma.role.findUnique({
      where: { id: parseInt(id) },
      include: {
        permissions: true, 
      },
    });

    if (!role) {
      return NextResponse.json(
        { error: `Role with ID ${id} not found.` },
        { status: 404 }
      );
    }

   
    return NextResponse.json({ permissions: role.permissions }, { status: 200 });
  } catch (error) {
    console.error("Error fetching role permissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch role permissions." },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    const { id } = params; 
    const { permissions } = await req.json(); 

    if (!permissions || permissions.length === 0) {
      return NextResponse.json(
        { error: "No permissions provided." },
        { status: 400 }
      );
    }

    
    const role = await prisma.role.findUnique({
      where: { id: parseInt(id) },
    });

    if (!role) {
      return NextResponse.json(
        { error: `Role with ID ${id} not found.` },
        { status: 404 }
      );
    }

    
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
