import { NextResponse } from "next/server";
import pool from "@/lib/db/pool";
import type { Book, CreateBookInput } from "@/types/books";

export async function POST(request: Request) {
    try {
        const body: unknown = await request.json();

        if (
            typeof body !== "object" ||
            body === null ||
            !("title" in body) ||
            typeof body.title !== "string" ||
            !body.title.trim()
        ) {
            return NextResponse.json(
                { error: "Название книги обязательно" },
                { status: 400 }
            );
        }

        const input = body as CreateBookInput;

        if (
            input.rating != null &&
            (!Number.isInteger(input.rating) ||
                input.rating < 1 ||
                input.rating > 5)
        ) {
            return NextResponse.json(
                { error: "Оценка должна быть от 1 до 5" },
                { status: 400 }
            );
        }

        const result = await pool.query<Book>(
            `INSERT INTO books
                (title, description, rating, pros, cons, cover_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`,
            [
                input.title.trim(),
                input.description ?? null,
                input.rating ?? null,
                input.pros ?? null,
                input.cons ?? null,
                input.cover_url ?? null,
            ]
        );

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error("Failed to create book:", error);

        return NextResponse.json(
            { error: "Не удалось добавить книгу" },
            { status: 500 }
        );
    }
};