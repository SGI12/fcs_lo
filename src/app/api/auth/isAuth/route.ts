import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // Импортируем утилиту для работы с куки

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || '';

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;
    if (!token) {
        return NextResponse.json({ isAuthenticated: false, message: 'Unauthorized' }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        const userId = decoded.id;
        const userExists = await prisma.users.findUnique({
            where: { id: userId },
            select: { id: true }
        });
        if (!userExists) {
            return NextResponse.json({ isAuthenticated: false, message: 'User not found' }, { status: 404 });
        }

        return NextResponse.json({ isAuthenticated: true }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ isAuthenticated: false, message: 'Internal server error', error }, { status: 500 });
    }
}
