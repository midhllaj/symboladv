import React, { useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import SEO from '../components/SEO';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ConstructionPage = () => {
    const { openModal } = useModal();
    const heroRef = useRef(null);
    const heroTextRef = useRef(null);
    const sectionsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from(heroRef.current, {
                scale: 1.1,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            });

            gsap.from(heroTextRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });

            // Sections Animation
            sectionsRef.current.forEach((section, index) => {
                gsap.from(section, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                    }
                });
            });
        });

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !sectionsRef.current.includes(el)) {
            sectionsRef.current.push(el);
        }
    };

    return (
        <div className="bg-white min-h-screen text-dark-charcoal font-sans selection:bg-black selection:text-white">
            <SEO
                title="Construction & Brand Infrastructure | Symbol Advertising"
                description="Transforming structures into brand statements. Full-scale structural branding, commercial architecture, and office fit-outs."
                canonical="/construction"
            />

            {/* Hero Section */}
            <div className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
                <img
                    ref={heroRef}
                    src="/construction/hero.png"
                    alt="Modern Construction"
                    className="absolute inset-0 w-full h-full object-cover z-0"
                />
                <div className="absolute inset-0 bg-black/40 z-10"></div>
                <div ref={heroTextRef} className="relative z-20 text-center text-white px-6 max-w-5xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">Construction & <br /> Brand Infrastructure</h1>
                    <p className="text-xl md:text-2xl font-light text-gray-200">Transforming Structures Into Brand Statements</p>
                </div>
            </div>

            {/* Content Sections */}
            <div className="max-w-7xl mx-auto px-6 py-24 space-y-32">

                {/* Exterior */}
                <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <img src="/construction/exterior.png" alt="Interlocking & Exterior Work" className="w-full h-auto rounded-lg shadow-2xl" />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl font-bold mb-6">Exterior & <br /> Interlocking Work</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            First impressions matter. We specialize in high-quality exterior finishing and interlocking pavement that sets the tone for your commercial space. Precision engineering meets aesthetic durability.
                        </p>
                    </div>
                </div>

                {/* Interior */}
                <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-1">
                        <h2 className="text-4xl font-bold mb-6">Interior Design & <br /> Office Fit-Out</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We create professional environments that inspire. From sleek minimalistic designs to luxury corporate setups, our office fit-outs are tailored to reflect your brand's identity and culture.
                        </p>
                    </div>
                    <div className="order-2">
                        <img src="/construction/interior.png" alt="Office Interior" className="w-full h-auto rounded-lg shadow-2xl" />
                    </div>
                </div>

                {/* Detail/Glass */}
                <div ref={addToRefs} className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="order-2 md:order-1">
                        <img src="/construction/detail.png" alt="Glass Work & Partitions" className="w-full h-auto rounded-lg shadow-2xl" />
                    </div>
                    <div className="order-1 md:order-2">
                        <h2 className="text-4xl font-bold mb-6">Glass Work & <br /> Brand Space Details</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            Transparency and elegance. Our expert glass facade and partition installations add a layer of sophistication to your infrastructure, ensuring a modern and open business aesthetic.
                        </p>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="bg-dark-charcoal text-white py-24 text-center">
                <div ref={addToRefs} className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Let’s Build Your Brand Space</h2>
                    <p className="text-xl text-gray-300 mb-10">Ready to turn your vision into stricture? Contact us today.</p>
                    <button onClick={() => openModal('Construction')} className="inline-block bg-white text-dark-charcoal font-bold py-4 px-10 rounded-full hover:bg-gray-200 transition-all duration-300">
                        Start Construction Project
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConstructionPage;
