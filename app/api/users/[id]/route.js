import prisma from '@/prisma/prismaClient';
import { NextResponse } from 'next/server';


export async function GET(req, { params }) {
  try {
    const { id } = params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) }, 
      include: { role: true }, 
    });

    if (!user) {
      return NextResponse.json(
        { error: `User with ID ${id} not found.` },
        { status: 404 }
      );
    }

    
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user data." },
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    const userId = parseInt(params.id);
    const { roleId } = await req.json();

    if (!roleId) {
      return NextResponse.json(
        { error: 'Role ID is required to update.' },
        { status: 400 }
      );
    }

    
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: `User with ID ${userId} not found.` },
        { status: 404 }
      );
    }


    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { roleId },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { error: 'Failed to update user role.' },
      { status: 500 }
    );
  }
}
