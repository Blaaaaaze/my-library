import styles from './TheHeader.module.scss';
import Image from "next/image";

export default function TheHeader() {
    return <header className={styles.header}>
        <div className={styles.header__logo}>
            <Image 
                src='/logo.svg'
                alt="MyBooks"
                width={100}
                height={100}
                priority
            />
        </div>
    </header>
}