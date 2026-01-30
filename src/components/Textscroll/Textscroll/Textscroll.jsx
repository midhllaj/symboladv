'use client';
import styles from './Style.module.scss'
import Character from './Character'

const paragraph = "Mission: To deliver creative, strategic, and impactful advertising solutions that enhance brand value and drive business growth.";

export default function TextScroll() {
  return (
    <main className="w-full">
      <div className={styles.bag}></div>
      <div className="px-4">
        <Character paragraph={paragraph} />
      </div>
    </main>
  )
}