import { NextResponse } from "next/server";
import { z } from "zod";
import pool from "@/lib/db/pool";
import type { Book } from "@/types/books";

const updateBookSchema = z.object({
  title: z.string().trim().min(1, "Название книги не может быть пустым").optional(),
  description: z.string().trim().nullable().optional(),
  rating: z.number().int().min(1).max(5).nullable().optional(),
  pros: z.string().trim().nullable().optional(),
  cons: z.string().trim().nullable().optional(),
  cover_url: z.string().trim().nullable().optional(),
}).strict().refine((input) => Object.keys(input).length > 0, {
  message: "Укажите хотя бы одно поле для обновления",
});

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Некорректный JSON в запросе" }, { status: 400 });
  }

  const validation = updateBookSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        error: "Проверьте поля для обновления",
        details: validation.error.issues.map(({ path, message }) => ({
          field: path.join("."),
          message,
        })),
      },
      { status: 400 },
    );
  }

  const { id } = await params;
  const fields = validation.data;
  const entries = Object.entries(fields) as [keyof typeof fields, (typeof fields)[keyof typeof fields]][];
  const assignments = entries.map(([field], index) => `"${field}" = $${index + 1}`);
  const values = entries.map(([, value]) => value);

  try {
    const result = await pool.query<Book>(
      `UPDATE books
       SET ${assignments.join(", ")}
       WHERE id = $${values.length + 1}
       RETURNING *`,
      [...values, id],
    );

    if (!result.rows[0]) {
      return NextResponse.json({ error: "Книга не найдена" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Failed to update book:", error);
    return NextResponse.json({ error: "Не удалось обновить книгу" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const { id } = await params;

  try {
    const result = await pool.query(
      "DELETE FROM books WHERE id = $1 RETURNING id",
      [id],
    );

    if (!result.rows[0]) {
      return NextResponse.json({ error: "Книга не найдена" }, { status: 404 });
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to delete book:", error);
    return NextResponse.json({ error: "Не удалось удалить книгу" }, { status: 500 });
  }
}
