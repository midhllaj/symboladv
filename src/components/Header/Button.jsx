import styles from './style.module.scss';

export default function MenuButton({ isActive, toggleMenu }) {
    return (
        <div onClick={toggleMenu} className={styles.button}>
            <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
        </div>
    )
}
