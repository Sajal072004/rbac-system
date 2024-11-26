import { NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";

export async function GET(req, { params }) {
  try {
    const { id } = params;

    const users = await prisma.user.findMany({
      where: { roleId: parseInt(id) },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error fetching users with role ID:", id, error);

    return NextResponse.json(
      { error: "Failed to fetch users." },
      { status: 500 }
    );
  }
}



export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.role.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(
      { message: "Role deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting role:", error);

    return NextResponse.json(
      { error: "Failed to delete role." },
      { status: 500 }
    );
  }
}
