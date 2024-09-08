import { NextResponse } from 'next/server';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });
        }

        await prisma.judges.delete({
            where: { id: Number(id) }
        });

        return NextResponse.json({ message: 'Judge deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Failed to delete judge' }, { status: 500 });
    }
}
