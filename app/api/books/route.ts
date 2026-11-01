import { NextResponse } from "next/server";
import { z } from "zod";
import { createBook } from "@/repositories/books";

const createBookSchema = z.object({
    title: z.string().trim().min(1, "Название книги обязательно"),
    description: z.string().trim().min(1, "Описание обязательно"),
    rating: z.number().int().min(1, "Оценка обязательна").max(5, "Оценка должна быть от 1 до 5"),
    pros: z.string().trim().min(1, "Укажите достоинства книги"),
    cons: z.string().trim().min(1, "Укажите недостатки книги"),
    cover_url: z.string().trim().nullable().optional(),
});

export async function POST(request: Request) {
    try {
        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { error: "Некорректный JSON в запросе" },
                { status: 400 }
            );
        }

        const validation = createBookSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                {
                    error: "Проверьте обязательные поля",
                    details: validation.error.issues.map(({ path, message }) => ({
                        field: path.join("."),
                        message,
                    })),
                },
                { status: 400 },
            );
        }

        const input = validation.data;

        const book = await createBook(input);

        return NextResponse.json(book, { status: 201 });
    } catch (error) {
        console.error("Failed to create book:", error);

        return NextResponse.json(
            { error: "Не удалось добавить книгу" },
            { status: 500 }
        );
    }
};
