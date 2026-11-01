import "server-only";

import pool from "@/lib/db/pool";
import type { Book, CreateBookInput, UpdateBookInput } from "@/types/books";

export async function getBooks(): Promise<Book[]> {
  const result = await pool.query<Book>(
    `SELECT id, title, description, rating, cover_url, created_at
     FROM books
     ORDER BY created_at DESC`,
  );

  return result.rows;
}

export async function getBook(id: string): Promise<Book | null> {
  const result = await pool.query<Book>(
    `SELECT id, title, description, rating, pros, cons, cover_url, created_at
     FROM books
     WHERE id = $1
     LIMIT 1`,
    [id],
  );

  return result.rows[0] ?? null;
}

export async function createBook(input: CreateBookInput): Promise<Book> {
  const result = await pool.query<Book>(
    `INSERT INTO books (title, description, rating, pros, cons, cover_url)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      input.title.trim(),
      input.description ?? null,
      input.rating ?? null,
      input.pros ?? null,
      input.cons ?? null,
      input.cover_url ?? null,
    ],
  );

  return result.rows[0];
}

export async function updateBook(id: string, input: UpdateBookInput): Promise<Book | null> {
  const columns: Record<keyof UpdateBookInput, string> = {
    title: "title",
    description: "description",
    rating: "rating",
    pros: "pros",
    cons: "cons",
    cover_url: "cover_url",
  };
  const entries = Object.entries(input) as [keyof UpdateBookInput, UpdateBookInput[keyof UpdateBookInput]][];
  if (entries.length === 0) return null;

  const assignments = entries.map(([field], index) => `${columns[field]} = $${index + 1}`);
  const values = entries.map(([, value]) => value);
  const result = await pool.query<Book>(
    `UPDATE books
     SET ${assignments.join(", ")}
     WHERE id = $${values.length + 1}
     RETURNING *`,
    [...values, id],
  );

  return result.rows[0] ?? null;
}

export async function deleteBook(id: string): Promise<boolean> {
  const result = await pool.query<{ id: string }>(
    "DELETE FROM books WHERE id = $1 RETURNING id",
    [id],
  );

  return result.rowCount !== 0;
}
