import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

export default function Curve() {

    // Use state to handle window size, ensures SSR/hydration safety if using Next.js, but also good for React resize
    const [windowHeight, setWindowHeight] = useState(typeof window !== 'undefined' ? window.innerHeight : 800);

    useEffect(() => {
        const handleResize = () => setWindowHeight(window.innerHeight);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const initialPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q-100 ${windowHeight / 2} 100 0`
    const targetPath = `M100 0 L200 0 L200 ${windowHeight} L100 ${windowHeight} Q100 ${windowHeight / 2} 100 0`

    const curve = {
        initial: {
            d: initialPath
        },
        enter: {
            d: targetPath,
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
        },
        exit: {
            d: initialPath,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }
    }

    return (
        <svg className={styles.svgCurve}>
            <motion.path variants={curve} initial="initial" animate="enter" exit="exit"></motion.path>
        </svg>
    )
}
