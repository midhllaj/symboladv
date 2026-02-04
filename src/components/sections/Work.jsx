import React, { useState } from 'react';
import OptimizedImage from '../ui/OptimizedImage';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react';

const projects = [
    {
        id: 1,
        title: 'BEBEK',
        description: 'Illuminated signboard designed for the Bebek Street food truck, created to boost visibility and establish a strong, memorable street presence.',
        image: 'recent-project/bebek',
        category: 'BUSINESS SETUP',
        link: '/portfolio'
    },
    {
        id: 2,
        title: 'E-WHEELS ERP',
        description: 'Custom ERP solution developed for E-Wheels across web and mobile platforms, designed to optimize operations, improve efficiency, and centralize business management.',
        image: 'recent-project/e-wheels',
        category: 'BUSINESS SETUP',
        link: '/portfolio'
    },
    {
        id: 3,
        title: 'GET WEBSITE',
        description: 'Website UI/UX Project\nCreated a visually clean and professional website for a business setup consultancy, emphasizing brand identity, user experience, and a corporate tone.',
        image: 'recent-project/get',
        category: 'BUSINESS SETUP',
        link: '/portfolio'
    },
    {
        id: 4,
        title: 'JETX',
        description: 'Custom exhibition installation developed for JetX in Dubai.\nA full-scale aircraft display designed to create strong visual impact and elevate brand engagement within a live exhibition environment',
        image: 'recent-project/ject',
        category: 'BUSINESS SETUP',
        link: '/portfolio'
    },
];

const Work = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    const onTouchStart = (e) => {
        setTouchEnd(null);
        setTouchStart(e.targetTouches[0].clientX);
    };

    const onTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isLeftSwipe) {
            nextProject();
        } else if (isRightSwipe) {
            prevProject();
        }
    };

    const nextProject = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevProject = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
        }),
    };

    return (
        <section
            id="work"
            className="relative h-auto lg:h-screen bg-black text-white overflow-hidden flex flex-col lg:flex-row"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* LEFT SIDE: IMAGE SLIDER */}
            <div className="w-full lg:w-1/2 h-[50vh] lg:h-full relative overflow-hidden group">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <OptimizedImage
                            publicId={projects[currentIndex].image}
                            alt={projects[currentIndex].title}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay included in image for readability if needed, but clean look requested */}
                        <div className="absolute inset-0 bg-black/20" />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Buttons (Mobile - Centered Sides) */}
                <div className="absolute inset-0 flex items-center justify-between px-4 lg:hidden z-20 pointer-events-none">
                    <button onClick={prevProject} className="p-3 bg-black/50 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors border border-white/10 pointer-events-auto">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={nextProject} className="p-3 bg-black/50 hover:bg-white/20 rounded-full text-white backdrop-blur-sm transition-colors border border-white/10 pointer-events-auto">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* RIGHT SIDE: CONTENT */}
            <div className="w-full lg:w-1/2 h-auto min-h-[50vh] lg:h-full flex flex-col justify-center px-8 py-20 lg:px-24 lg:py-0 bg-black relative z-10">
                <div className="max-w-xl">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <span className="text-[#D64545] font-bold tracking-widest text-sm uppercase mb-4 block">
                            Our Recent Projects
                        </span>

                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
                            {projects[currentIndex].title}
                        </h2>

                        <div className="h-1 w-20 bg-[#D64545] mb-8" />

                        <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-12">
                            {projects[currentIndex].description}
                        </p>

                        <div className="flex items-center justify-between">
                            <Link
                                to={projects[currentIndex].link}
                                style={{ textDecoration: 'none', border: 'none', backgroundImage: 'none', boxShadow: 'none' }}
                                className="inline-flex items-center gap-2 text-white hover:text-[#D64545] transition-colors text-lg font-medium group no-underline decoration-0 appearance-none bg-transparent border-none outline-none"
                            >
                                View Project
                                <ArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </Link>

                            {/* Desktop Nav Arrows in Content Area */}
                            <div className="hidden lg:flex space-x-4">
                                <button
                                    onClick={prevProject}
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={nextProject}
                                    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-black transition-all"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* Pagination Indicator */}
                <div className="relative mt-12 lg:absolute lg:bottom-12 lg:mt-0 left-0 lg:left-24 flex space-x-2">
                    {projects.map((_, idx) => (
                        <div
                            key={idx}
                            className={`h-1 transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-[#D64545]' : 'w-2 bg-white/20'}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Work;
