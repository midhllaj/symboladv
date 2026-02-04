import React, { useRef, useLayoutEffect } from 'react';
import SEO from '../components/SEO';
import StickyCards from '../components/StickyCards/StickyCards';
import OptimizedImage from '../components/ui/OptimizedImage';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ServicesPage = () => {
    const heroTitleRef = useRef(null);
    const heroDescRef = useRef(null);
    const heroTagRef = useRef(null);
    const heroImageRef = useRef(null);
    const outroTitleRef = useRef(null);
    const outroDescRef = useRef(null);
    const outroButtonsRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation (On Load)
            const heroTl = gsap.timeline();

            // Image Animation
            gsap.fromTo(heroImageRef.current,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out" }
            );

            heroTl.from(heroTagRef.current, {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.5 // Wait slightly for image
            })
                .from(heroTitleRef.current, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.6")
                .from(heroDescRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6");

            // Outro Animation (On Scroll)
            const outroTl = gsap.timeline({
                scrollTrigger: {
                    trigger: outroTitleRef.current,
                    start: "top 80%",
                }
            });

            outroTl.from(outroTitleRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            })
                .from(outroDescRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6")
                .from(outroButtonsRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out"
                }, "-=0.6");
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="bg-light-grey">
            <SEO
                title="Our Services | Symbol Advertising"
                description="Explore our full range of services: brand identity, digital experiences, conference exhibitions, outdoor signage, and ERP solutions. Transform your business today."
                canonical="/services"
            />
            <section
                className="relative w-full h-[50vh] flex justify-center items-center text-center overflow-hidden"
            >
                <OptimizedImage
                    ref={heroImageRef}
                    publicId="services/hot-air-balloon-adventure-2"
                    alt="Services Hero"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="max-w-4xl px-6 relative z-10">
                    <div ref={heroTagRef} className="inline-block mb-6 px-4 py-2 bg-primary-red/10 border border-primary-red/30 rounded-full">
                        <span className="text-primary-red font-medium text-sm tracking-wider">OUR SERVICES</span>
                    </div>
                    <h1 ref={heroTitleRef} className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        What We Do
                    </h1>
                    <p ref={heroDescRef} className="text-xl md:text-2xl text-gray-300 font-light">
                        Scroll to explore our expertise
                    </p>
                </div>
            </section>

            {/* Sticky Cards Section */}
            <StickyCards />

            {/* Outro Section */}
            <section className="relative w-full h-screen bg-dark-charcoal text-white flex flex-col justify-center items-center text-center px-6">
                <h2 ref={outroTitleRef} className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to Transform Your Brand?
                </h2>
                <p ref={outroDescRef} className="text-xl text-gray-300 mb-10 max-w-2xl">
                    Let's discuss how we can help you achieve your goals
                </p>
                <div ref={outroButtonsRef} className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="/#contact"
                        className="px-8 py-4 bg-primary-red text-white rounded-full font-semibold text-lg hover:bg-[#b83838] hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        Get Started
                    </a>
                    <a
                        href="/portfolio"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-dark-charcoal transition-all duration-300"
                    >
                        View Our Work
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
