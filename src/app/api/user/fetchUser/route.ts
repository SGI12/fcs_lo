import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers'; // Используется для работы с куки

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || '';

export async function GET() {
    const cookieStore = cookies();
    const token = cookieStore.get('authToken')?.value;

    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {

        const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        const userId = decoded.id;

        const user = await prisma.users.findUnique({
            where: { id: userId },
            select: {
                email: true,
                name: true,
                LName: true
            }
        });
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }


        return NextResponse.json(user, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}
