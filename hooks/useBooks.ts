import "server-only";

import { getBooks as getBooksFromRepository } from "@/repositories/books";
import type { BookCardData } from "@/components/Card/Card";

export default async function getBooks(): Promise<BookCardData[]> {
  const books = await getBooksFromRepository();

  return books.map((book) => ({
    id: book.id,
    title: book.title,
    description: book.description,
    rating: book.rating,
    coverUrl: book.cover_url,
  }));
}
