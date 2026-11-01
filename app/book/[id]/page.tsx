import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container/Container";
import getBook from "@/hooks/useBook";
import styles from "./page.module.scss";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function BookPage({ params }: Props) {
  const { id } = await params;
  const book = await getBook(id);

  if (!book) notFound();

  return (
    <Container>
      <main className={styles.page}>
        <Link className={styles.back} href="/collection">
          <span aria-hidden="true">←</span> В коллекцию
        </Link>

        <article className={styles.book}>
          <div className={styles.cover}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={styles.image}
              src={book.cover_url || "/book-cover-placeholder.svg"}
              alt={`Обложка книги «${book.title}»`}
            />
          </div>

          <div className={styles.content}>
            <p className={styles.eyebrow}>КНИГА ИЗ КОЛЛЕКЦИИ</p>
            <h1 className={styles.title}>{book.title}</h1>

            {book.rating !== null && (
              <p className={styles.rating} aria-label={`Оценка ${book.rating} из 5`}>
                <span aria-hidden="true">★</span> {book.rating} <span className={styles.ratingScale}>/ 5</span>
              </p>
            )}

            {book.description && (
              <section className={styles.section}>
                <h2 className={styles.sectionTitle}>О книге</h2>
                <p className={styles.description}>{book.description}</p>
              </section>
            )}

            {(book.pros || book.cons) && (
              <div className={styles.notes}>
                {book.pros && (
                  <section className={styles.note}>
                    <h2 className={styles.sectionTitle}>Понравилось</h2>
                    <p>{book.pros}</p>
                  </section>
                )}
                {book.cons && (
                  <section className={styles.note}>
                    <h2 className={styles.sectionTitle}>Что можно улучшить</h2>
                    <p>{book.cons}</p>
                  </section>
                )}
              </div>
            )}

            <p className={styles.date}>
              Добавлена {new Intl.DateTimeFormat("ru", { dateStyle: "long" }).format(new Date(book.created_at))}
            </p>
          </div>
        </article>
      </main>
    </Container>
  );
}
