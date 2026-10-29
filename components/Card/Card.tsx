import styles from './Card.module.scss';

export type BookCardData = {
    id: string;
    title: string;
    description: string | null;
    rating: number | null;
    coverUrl?: string | null;
};

export default function Card({ book }: { book: BookCardData }) {
    return (
        <article className={styles.card}>
            <div className={styles.card__cover}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.card__image} src={book.coverUrl || "/book-cover-placeholder.svg"} alt={`Обложка книги «${book.title}»`} />
            </div>
            <div className={styles.card__body}>
                <div className={styles.card__heading}>
                    <h2 className={styles.card__title}>{book.title}</h2>
                    {book.rating !== null && <span className={styles.card__rating} aria-label={`Оценка ${book.rating} из 5`}>★ {book.rating.toFixed(1)}</span>}
                </div>
                {book.description && <p className={styles.card__description}>{book.description}</p>}
                <a className={styles.card__link} href={`/book/${book.id}`}>Подробнее <span aria-hidden="true">↗</span></a>
            </div>
        </article>
    );
}
