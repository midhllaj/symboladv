'use client';
import styles from './Style.module.scss'
import Character from './Character'
const paragraph = "Vision: To be a trusted advertising partner recognized for innovation, quality, and excellence."

export default function Scroll2() {

    // const words = paragraph.split(" ")
    return (
        <main className={styles.Scrolls}>
            <div className={styles.box} ></div>
            <Character paragraph={paragraph} />
        </main>
    )
}
