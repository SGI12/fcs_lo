import {PrismaClient} from "@prisma/client";
import {NextResponse} from "next/server";

const prisma = new PrismaClient()

export async function GET() {
    try {
        const judges = await prisma.judges.findMany();
        if (!judges) {
            return NextResponse.json({message: 'Judges not found'}, {status: 404});
        }
        return NextResponse.json(judges, {status: 200});
    } catch (error) {

        return NextResponse.json({message: 'Internal server error', error}, {status: 500});
    }
}