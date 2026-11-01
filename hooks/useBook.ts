import "server-only";

import pool from "@/lib/db/pool";
import type { Book } from "@/types/books";

export default async function getBook(id: string): Promise<Book | null> {
  const result = await pool.query<Book>(
    `SELECT id, title, description, rating, pros, cons, cover_url, created_at
     FROM books
     WHERE id = $1
     LIMIT 1`,
    [id],
  );

  return result.rows[0] ?? null;
}
