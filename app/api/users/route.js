import prisma from '@/prisma/prismaClient';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        role: true, 
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { name, email, password, roleId } = await req.json();

    if (!name || !email || !password || !roleId) {
      return NextResponse.json(
        { error: 'Name, email, password, and roleId are required.' },
        { status: 400 }
      );
    }

    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists.' },
        { status: 409 }
      );
    }

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, 
        roleId,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user.' },
      { status: 500 }
    );
  }
}


export async function PATCH(req, { params }) {
  try {
    const userId = parseInt(params.id);
    const { name, email, roleId } = await req.json();

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: `User with ID ${userId} not found.` },
        { status: 404 }
      );
    }

   
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (roleId) updateData.roleId = roleId;

    
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { error: 'Failed to update user.' },
      { status: 500 }
    );
  }
}
