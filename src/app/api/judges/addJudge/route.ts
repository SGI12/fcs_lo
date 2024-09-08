import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Новый стандарт для функции POST
export async function POST(request: Request) {
    try {
        const body = await request.json(); // Читаем тело запроса как JSON
        const { fullName, birthDate, region, category, validityPeriod, assignmentDate, expirationDate } = body;

        // Проверяем, что все обязательные поля заполнены
        if (!fullName || !birthDate || !region || !category || !validityPeriod || !assignmentDate || !expirationDate) {
            return NextResponse.json({ error: 'Все поля обязательны для заполнения' }, { status: 400 });
        }

        const newJudge = await prisma.judges.create({
            data: {
                fullName,
                birthDate: new Date(birthDate),
                region,
                category,
                validityPeriod,
                assignmentDate: new Date(assignmentDate),
                expirationDate: new Date(expirationDate),
            },
        });

        // Возвращаем успешный ответ с добавленным судьей
        return NextResponse.json(newJudge, { status: 201 });
    } catch (error) {
        console.error('Ошибка при добавлении судьи:', error);
        return NextResponse.json({ error: 'Не удалось добавить судью' }, { status: 500 });
    }
}
