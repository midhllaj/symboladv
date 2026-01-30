'use client'
// Renamed purpose: This component now only handles the Overlay Menu
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';

export default function MenuOverlay({ isActive }) {
    return (
        <AnimatePresence mode="wait">
            {isActive && <Nav />}
        </AnimatePresence>
    )
}
