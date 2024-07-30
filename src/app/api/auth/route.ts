import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const body = await req.json()
    console.log(body)
    const {name, LName, email, password} = body;
    const user = await prisma.user.create({
        data: {
            name,
            LName,
            email,
            password
        }
    })

    return NextResponse.json({message: "User created", user})
}

export async function GET(req:any) {
    return NextResponse.json({message: "Hello"})
}

