import React, { useEffect, useRef } from 'react';
import OptimizedImage from '../ui/OptimizedImage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const logos = [
    '10.png', '11.png', '22.png', '33.png', '44.png',
    '55.png', '66.png', '77.png', '88.png', '99.png',
    '111.png', '122.png', '133.png', '144.png', '155.png',
    '166.png', '177.png', '188.png', '199.png', '200.png',
    '211.png', '222.png', '233.png', '244.png', '255.png',
    '266.png', '277.png', '288.png', '299.png', '300.png',
    '311.png', '322.png', '333.png', '344.png', '355.png'
];

const AboutClientLogos = () => {
    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const logoItems = gridRef.current.querySelectorAll('.logo-item');

            // Animate logos on scroll with stagger effect
            gsap.fromTo(
                logoItems,
                {
                    opacity: 0,
                    scale: 0.8,
                    filter: 'grayscale(100%)'
                },
                {
                    opacity: 1,
                    scale: 1,
                    filter: 'grayscale(0%)',
                    duration: 0.6,
                    stagger: 0.05,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: gridRef.current,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-20 px-6 bg-black">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Where ideas take shape and <span className="text-primary-red">brands take presence.</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Across industries and formats, Symbol Advertising designs and delivers signage solutions that balance creativity, structure, and lasting impact.
                    </p>
                </div>

                {/* Logos Grid */}
                <div
                    ref={gridRef}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 border border-white/10"
                    style={{
                        gridAutoRows: '1fr'
                    }}
                >
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="logo-item border border-white/10 p-6 flex items-center justify-center aspect-square hover:bg-white/5 transition-all duration-300 group"
                        >
                            <OptimizedImage
                                publicId={`logosss/${logo.replace(/\.[^/.]+$/, "")}`}
                                alt={`Client logo ${index + 1}`}
                                className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutClientLogos;
