'use client';
import styles from './Style.module.scss'
import Character from './Character'

const paragraph = "Vision: To be a trusted advertising partner recognized for innovation, quality, and excellence."

export default function Scroll() {
  return (
    <main className="w-full">
      <div className={styles.box}></div>
      <div className="px-4">
        <Character paragraph={paragraph} />
      </div>
    </main>
  )
}