import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {cookies} from "next/headers";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.JWT_SECRET_KEY || 'fcs_lo';


export async function POST(request: Request) {
    const { email, password } = await request.json();
    try {
        const user = await prisma.users.findUnique({ where: { email } });
        if (user && await bcrypt.compare(password, user.password)) {

            const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1h' });
            const cookieStore = cookies();
            cookieStore.set('authToken', token, {
                httpOnly: true,
                maxAge: 60 * 60, // 1 час
                path: '/',
                secure: process.env.NODE_ENV === 'production', // Только HTTPS в продакшене
            });
            return NextResponse.json({ token }, { status: 200 });
        } else {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
        }
    } catch (error) {
        console.log(1)
        return NextResponse.json({ message: 'Internal server error', error }, { status: 500 });
    }
}
