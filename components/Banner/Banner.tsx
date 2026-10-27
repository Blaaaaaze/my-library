import styles from './Banner.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default function Banner() {
    return <div className={styles.banner}>
        <div className={styles.banner__content}>
            <p className={styles.banner__subtitle}>Welcome!</p>
            <h2 className={styles.banner__title}>Books that inspire</h2>
            <p className={styles.banner__text}>Open new stories, make a grand books collection, check your progress and find your adventures</p>
            <Link href='/collection' className={`${styles.banner__button} main-button`}>Collection</Link>
        </div>
        <div className={styles.banner__image}>
            <Image
            src='/books.png'
            alt='banner books image'
            fill
            />
        </div>
    </div>
}