import "server-only";

import { getBook as getBookFromRepository } from "@/repositories/books";
import type { Book } from "@/types/books";

export default function getBook(id: string): Promise<Book | null> {
  return getBookFromRepository(id);
}
