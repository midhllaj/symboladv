import React, { useRef } from 'react';
import OptimizedImage from '../ui/OptimizedImage';
import { useScroll, useTransform, motion } from 'framer-motion';

const LeadershipLocation = () => {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    });
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={container}
            className='relative flex items-center justify-center min-h-screen overflow-hidden py-24'
            style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
        >
            <div className='fixed top-[-10vh] left-0 h-[120vh] w-full'>
                <motion.div style={{ y }} className='relative w-full h-full'>
                    <OptimizedImage
                        publicId="founder"
                        alt="Mr. Abdul Letheif - Founder"
                        className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </motion.div>
            </div>

            <div className='relative z-10 max-w-7xl mx-auto px-6 text-white w-full h-full flex flex-col md:flex-row items-center justify-between gap-16'>
                <div className="md:w-1/2 space-y-8">
                    <p className='text-3xl md:text-5xl font-bold uppercase'>
                        Our Founder
                    </p>
                    <div className="space-y-6 text-lg md:text-xl leading-relaxed text-gray-200">
                        <p>
                            At Symbol Advertising, our mission is to transform ideas into visible, functional, and powerful brand experiences. Since 1999, we have partnered with businesses to deliver creative, reliable, and result-driven solutions across physical and digital platforms. We believe in the strength of bold ideas, smart strategy, and flawless execution, and we are committed to helping brands stand out and succeed.
                        </p>
                        <p>
                            Our experience across signboards, exhibition programs, web development, custom software solutions, and construction works, combined with the trust of 500+ clients, reflects our dedication to quality, innovation, and long-term value.
                        </p>
                    </div>
                </div>

                <div className="md:w-1/3 flex flex-col items-center md:items-start border-l-4 border-blue-500 pl-8">
                    <h3 className="text-4xl font-bold text-white mb-2">Mr. ABDUL LETHEIF</h3>
                    <p className="text-primary-red font-medium uppercase tracking-wider text-sm">Founder & Managing Director</p>
                </div>
            </div>
        </div>
    );
};

export default LeadershipLocation;
