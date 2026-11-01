import styles from "./Banner.module.scss";
import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <section className={styles.banner} aria-labelledby="welcome-title">
      <div className={styles.banner__content}>
        <p className={styles.banner__subtitle}>МЕСТО ДЛЯ ТВОИХ ИСТОРИЙ</p>
        <h2 className={styles.banner__title} id="welcome-title">Каждая книга — новое путешествие</h2>
        <p className={styles.banner__text}>Собирай любимые книги, отмечай впечатления и всегда знай, к какой истории вернуться.</p>
        <div className={styles.banner__links}>
          <Link href="/collection" className={`${styles.banner__button} main-button`}>Открыть коллекцию</Link>
        </div>
      </div>
      <div className={styles.banner__image}>
        <Image src="/books.png" alt="Книги, блокнот и чашка на столе" fill priority sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
    </section>
  );
}
