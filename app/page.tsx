import Link from "next/link";
import Container from "@/components/Container/Container";
import Banner from "@/components/Banner/Banner";
import Card from "@/components/Card/Card";
import getBooks from "@/hooks/useBooks";
import styles from "./page.module.scss";

export default async function Home() {
  const books = await getBooks();
  const recentBooks = books.slice(0, 3);

  return (
    <Container>
      <main className={styles.home}>
        <Banner />

        <section className={styles.recent} aria-labelledby="recent-title">
          <div className={styles.sectionHeading}>
            <div>
              <p className={styles.eyebrow}>ТВОЯ БИБЛИОТЕКА</p>
              <h1 className={styles.title} id="recent-title">Недавно добавленные</h1>
            </div>
            {books.length > 0 && (
              <Link className={styles.allBooks} href="/collection">
                Все книги <span aria-hidden="true">→</span>
              </Link>
            )}
          </div>

          {recentBooks.length > 0 ? (
            <div className={styles.grid}>
              {recentBooks.map((book) => <Card key={book.id} book={book} />)}
            </div>
          ) : (
            <div className={styles.empty}>
              <span className={styles.emptyIcon} aria-hidden="true">✦</span>
              <div>
                <h2 className={styles.emptyTitle}>Ваша книжная история начинается здесь</h2>
                <p className={styles.emptyText}>Добавьте первую книгу, чтобы сохранить впечатления и собрать свою коллекцию.</p>
              </div>
              <Link className={`${styles.addButton} main-button`} href="/book/new">Добавить книгу</Link>
            </div>
          )}
        </section>
      </main>
    </Container>
  );
}
