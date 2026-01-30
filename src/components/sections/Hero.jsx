import React, { useEffect, useRef } from 'react';
import * as THREE from 'three'; // Likely unused now, but keeping if needed or check next tool call
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate text content entrance on load
            gsap.fromTo(contentRef.current.children,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.5,
                    stagger: 0.2,
                    ease: "power3.out"
                }
            );

            // Exit animation on scroll
            gsap.to(contentRef.current, {
                y: -150,
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1
                }
            });

            // Scroll hint fade out
            gsap.to(".scroll-hint", {
                opacity: 0,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "30% top",
                    scrub: true
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full">
                {/* Desktop Video */}
                <video
                    className="hidden md:block w-full h-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/assets/video/desktop.mp4"
                />
                {/* Mobile Video */}
                <video
                    className="block md:hidden w-full h-full object-cover opacity-60"
                    autoPlay
                    muted
                    loop
                    playsInline
                    src="/assets/video/mobile.mp4"
                />
            </div>

            {/* Content Layer */}
            <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center px-6 text-white">
                <div ref={contentRef}>
                    <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold font-stardom uppercase tracking-tighter mb-6">
                        Start <br /> With Symbol
                    </h1>
                    <p className="text-lg md:text-2xl font-light max-w-2xl mx-auto uppercase tracking-wide">
                        We turn brands into symbols of success
                    </p>
                </div>

                {/* Scroll Hint */}
                <div className="scroll-hint absolute bottom-10 left-0 w-full text-center text-sm uppercase tracking-widest opacity-50 animate-bounce">
                    Scroll to Explore
                </div>
            </div>
        </section>
    );
};

export default Hero;
