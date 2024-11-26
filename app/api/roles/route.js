import prisma from "@/prisma/prismaClient";
import { NextResponse } from "next/server";



export async function GET() {
  try {
    const roles = await prisma.role.findMany();

    return NextResponse.json(roles, { status: 200 });
  } catch (error) {
    console.error("Error fetching roles:", error);

    return NextResponse.json(
      { error: "Failed to fetch roles." },
      { status: 500 }
    );
  }
}


export async function POST(req) {
  try {
    const body = await req.json();
    const { name } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Role name is required." },
        { status: 400 }
      );
    }

    const role = await prisma.role.create({
      data: { name },
    });

    return NextResponse.json(role, { status: 201 });
  } catch (error) {
    console.error("Error creating role:", error);

    return NextResponse.json(
      { error: "Failed to create role." },
      { status: 500 }
    );
  }
}
