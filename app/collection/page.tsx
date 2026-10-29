import Container from "@/components/Container/Container";
import Card from "@/components/Card/Card";
import styles from "./page.module.scss";
import getBooks from "@/hooks/useBooks";

export default async function Collection() {
  const books = await getBooks();

  return <Container>
    <main className={styles.collection}>
      <p className={styles.eyebrow}>БИБЛИОТЕКА MYBOOKS</p>
      <div className={styles.intro}>
        <div><h1 className={styles.title}>Книги, к которым хочется вернуться</h1><p className={styles.subtitle}>Выбирай следующую историю — здесь уже есть с чего начать.</p></div>
        <span className={styles.count}>{books.length} книг</span>
      </div>
      <section className={styles.grid} aria-label="Коллекция книг">
        {books.length > 0 ? books.map((book) => <Card key={book.id} book={book} />) : <p>В коллекции пока нет книг.</p>}
      </section>
    </main>
  </Container>;
}
