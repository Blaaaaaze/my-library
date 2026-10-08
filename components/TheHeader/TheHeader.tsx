import styles from './TheHeader.module.scss';
import Image from "next/image";
import Navigation from '../Navigation/Navigation';
import Link from 'next/link';

export default function TheHeader() {
    return <header className={styles.header}>
        <div className={styles.header__logo}>
            <Link href='/'>
                <Image 
                    src='/logo.svg'
                    alt="MyBooks"
                    width={100}
                    height={100}
                    priority
                />
            </Link>
        </div>
        <Navigation />
    </header>
}