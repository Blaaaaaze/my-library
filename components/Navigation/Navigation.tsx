'use client'
import Link from "next/link"
import styles from './Navigation.module.scss';
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navigation() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const onClick = () => setIsOpen(false);

    return (
        <div className={styles.navigation}>
            <button
                className={styles.navigation__burger}
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isOpen}
                aria-controls="main-navigation"
            >
                {isOpen ? '✕' : '☰'}
            </button>

            <nav className={`${styles.nav} ${isOpen ? styles['nav__list--open'] : ''}`}>
                <ul className={styles.nav__ul}>
                    <li>
                        <Link 
                        href='/catalog' 
                        onClick={onClick}
                        className={`
                        ${styles.nav__link} 
                        ${pathname.startsWith('/catalog') ? styles.active : ''}`}>
                            Catalog
                        </Link>
                    </li>
                    <li>
                        <Link 
                        onClick={onClick}
                        href='/collection' 
                        className={`
                        ${styles.nav__link} 
                        ${pathname.startsWith('/collection') ? styles.active : ''} `}>
                            Collection
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}