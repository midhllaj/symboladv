import React, { useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import OptimizedImage from '../components/ui/OptimizedImage';
import SEO from '../components/SEO';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ConferencesPage = () => {
    const { openModal } = useModal();
    const heroDescRef = useRef(null);
    const whyDescRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Description Animation
            gsap.from(heroDescRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                delay: 0.5,
                ease: "power3.out"
            });

            // Why Symbol Description Animation
            gsap.from(whyDescRef.current, {
                y: 30,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: whyDescRef.current,
                    start: "top 85%",
                }
            });
        });
        return () => ctx.revert();
    }, []);
    const projects = [
        {
            title: "JETEX",
            category: "Aviation Services",
            image: "/conferences/jetex.png",
            description: "A premium exhibition experience designed for Jetex to showcase their luxury aviation services, featuring sleek lines and high-end finishes."
        },
        {
            title: "J.P.MORGAN",
            category: "Financial Services",
            image: "/conferences/jpmorgan.jpg",
            description: "A professional and authoritative booth design for J.P. Morgan, emphasizing trust and global connectivity in the financial sector."
        },
        {
            title: "SKODA",
            category: "Automotive",
            image: "/conferences/skoda.jpg",
            description: "Dynamic and engaging display for Skoda, highlighting innovation and automotive excellence through interactive elements and bold branding."
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-primary-red selection:text-white">
            <SEO
                title="Exhibition & Conference Solutions | Symbol Advertising"
                description="Stand out at trade shows and conferences with custom booth design, exhibition stands, and event branding. Symbol Advertising creates immersive exhibition experiences."
                canonical="/conferences"
            />


            {/* Hero Section */}
            <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-primary-red">
                    Conferences & <br /> Exhibition Experiences
                </h1>
                <p ref={heroDescRef} className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                    Creating immersive physical environments that tell your brand's story and engage audiences at every touchpoint.
                </p>
            </header>

            {/* Why Symbol Section */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary-red mb-4">Why Symbol</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Designed to Captivate</h3>
                    </div>
                    <div ref={whyDescRef} className="text-lg text-gray-300 leading-relaxed space-y-6">
                        <p>
                            In the crowded landscape of exhibitions and conferences, standing out is not just an option—it's a necessity. We believe that a booth or pavilion is more than just a structure; it's a physical manifestation of your brand's identity and values.
                        </p>
                        <p>
                            Our approach combines strategic design with expert craftsmanship. From concept to execution, we ensure every detail serves a purpose: to attract, engage, and leave a lasting impression on your visitors. Whether it's a massive trade show pavilion or an intimate conference setup, we bring your vision to life with precision and flair.
                        </p>
                    </div>
                </div>
            </section>

            {/* Projects Showcase */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold mb-16 border-b border-white/10 pb-8">Featured Projects</h2>

                <div className="space-y-20">
                    {projects.map((project, index) => (
                        <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
                            <div className={`overflow-hidden rounded-xl ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                                <OptimizedImage
                                    publicId={project.image.replace(/^\/|\.[^/.]+$/g, "")} // Remove leading slash and extension
                                    alt={project.title}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                <span className="text-primary-red font-medium tracking-wider text-sm uppercase mb-3 block">{project.category}</span>
                                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary-red transition-colors">{project.title}</h3>
                                <p className="text-lg text-gray-300 leading-relaxed">
                                    {project.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-zinc-950 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to make an impact?</h2>
                    <p className="text-xl text-white/70 mb-10">
                        Let's discuss how we can elevate your next exhibition presence.
                    </p>
                    <button onClick={() => openModal('Exhibitions')} className="inline-block bg-primary-red hover:bg-[#b03535] text-white font-bold py-4 px-10 rounded-full transition-colors duration-300">
                        Get in Touch
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ConferencesPage;
