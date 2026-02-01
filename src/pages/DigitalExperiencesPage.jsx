import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DigitalExperiencesPage = () => {
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
            title: "REGALSPACES",
            category: "Furniture",
            image: "/digital-experiences/regal.jpeg",
            description: "A sleek and functional digital platform for Regal Spaces, enhancing furniture discovery and shopping experience through intuitive design.",
            link: "https://www.regalspaces.store/"
        },
        {
            title: "GET BUSINESS SETUP",
            category: "Business Services",
            image: "/recent-project/get.png",
            description: "A comprehensive digital platform for business setup services, streamlining the process for new entrepreneurs.",
            link: "https://www.getbusinessetup.com/"
        },
        {
            title: "E-WHEELS",
            category: "ERP Solution",
            image: "/recent-project/e-wheels.png",
            description: "A specialized ERP solution for E-WHEELS, designed to optimize operations and management.",
            link: "/erp-solutions"
        },
        {
            title: "DION POWER SOLUTIONS",
            category: "Power Solutions",
            image: "/digital-experiences/dion.jpeg",
            description: "A robust corporate website for Dion Power Solutions, communicating reliability and technical expertise in the energy sector.",
            link: "https://www.dionpower.in/"
        },
    ];

    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white">
            <Navbar />

            {/* Hero Section */}
            <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-purple-600">
                    Digital <br /> Experiences
                </h1>
                <p ref={heroDescRef} className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                    Crafting digital ecosystems that connect brands with people through innovation, design, and technology.
                </p>
            </header>

            {/* Why Symbol Section */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-purple-600 mb-4">Why Symbol</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Digital First, Human Centric</h3>
                    </div>
                    <div ref={whyDescRef} className="text-lg text-gray-300 leading-relaxed space-y-6">
                        <p>
                            In today's digital-first world, your online presence is often the first interaction a customer has with your brand. We don't just build websites; we create digital experiences that function as powerful business tools.
                        </p>
                        <p>
                            Our digital solutions are built on a foundation of user-centric design and robust engineering. From immersive corporate websites to high-converting e-commerce platforms, we focus on speed, accessibility, and engagement to ensure your digital footprint leaves a lasting mark.
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
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="block overflow-hidden rounded-xl">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </a>
                            </div>
                            <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                                <span className="text-purple-600 font-medium tracking-wider text-sm uppercase mb-3 block">{project.category}</span>
                                {project.link.startsWith('/') ? (
                                    <Link to={project.link} className="group-hover:text-purple-600 transition-colors">
                                        <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                                    </Link>
                                ) : (
                                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group-hover:text-purple-600 transition-colors">
                                        <h3 className="text-3xl font-bold mb-4">{project.title}</h3>
                                    </a>
                                )}
                                <p className="text-lg text-gray-300 leading-relaxed mb-6">
                                    {project.description}
                                </p>
                                {project.link.startsWith('/') ? (
                                    <Link
                                        to={project.link}
                                        className="text-purple-600 font-bold hover:underline inline-flex items-center"
                                    >
                                        Visit Website
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </Link>
                                ) : (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-purple-600 font-bold hover:underline inline-flex items-center"
                                    >
                                        Visit Website
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-zinc-950 text-white text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to transform your digital presence?</h2>
                    <p className="text-xl text-white/70 mb-10">
                        Let's build a digital experience that drives results.
                    </p>
                    <a href="/#contact" className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-full transition-colors duration-300">
                        Start a Project
                    </a>
                </div>
            </section>
        </div>
    );
};

export default DigitalExperiencesPage;
