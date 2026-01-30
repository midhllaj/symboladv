'use client';
import styles from './Style.module.scss'
import Character from './Character'
const paragraph = "Mission: To deliver creative, strategic, and impactful advertising solutions that enhance brand value and drive business growth.";


export default function TextScroll2() {

    const words = paragraph.split(" ")
    return (
        <main >
            <div className={styles.bag}></div>
            <div className={styles.new}>
                <Character paragraph={paragraph} />
            </div>
        </main>
    )
}
