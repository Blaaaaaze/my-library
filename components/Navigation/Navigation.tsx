'use client'
import Link from "next/link"
import styles from './Navigation.module.scss';
import { usePathname } from "next/navigation";

export default function Navigation() {
    const pathname = usePathname();

    return <nav>
        <ul className={styles.nav__ul}>
            <li>
                <Link 
                href='/catalog' 
                className={`${styles.nav__link} ${pathname.startsWith('/catalog') ? styles.active : ''}`}>
                    Catalog
                </Link>
            </li>
            <li>
                <Link 
                href='/collection' 
                className={`${styles.nav__link} ${pathname.startsWith('/collection') ? styles.active : ''}`}>
                    Collection
                </Link>
            </li>
        </ul>
    </nav>
}