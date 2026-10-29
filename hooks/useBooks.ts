import "server-only";

import pool from "@/lib/db/pool";
import type { Book } from "@/types/books";
import type { BookCardData } from "@/components/Card/Card";

export default async function getBooks(): Promise<BookCardData[]> {
  const result = await pool.query<Book>(
    `SELECT id, title, description, rating, cover_url, created_at
     FROM books
     ORDER BY created_at DESC`
  );

  return result.rows.map((book) => ({
    id: book.id,
    title: book.title,
    description: book.description,
    rating: book.rating,
    coverUrl: book.cover_url,
  }));
}
