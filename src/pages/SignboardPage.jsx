import React, { useEffect, useRef } from 'react';
import { useModal } from '../context/ModalContext';
import OptimizedImage from '../components/ui/OptimizedImage';
import SEO from '../components/SEO';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SignboardPage = () => {
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
            title: "NBF BANK",
            category: "Banking",
            image: "/signboard/nbf.jpg",
            description: "High-visibility signage for NBF Bank, designed to convey trust and stability while maintaining brand consistency across locations."
        },
        {
            title: "OMEGA",
            category: "Luxury Watches",
            image: "/signboard/omega.jpg",
            description: "Elegant and sophisticated outdoor branding for Omega, reflecting the precision and luxury associated with the world-renowned watchmaker."
        },
        {
            title: "DUBAI",
            category: "Tourism",
            image: "/signboard/dubai.jpg",
            description: "Iconic signage capturing the vibrant spirit of Dubai, serving as a landmark and photo opportunity for tourists and residents alike."
        },
        {
            title: "SKODA UAE",
            category: "Automotive",
            image: "/signboard/skoda-uae.jpg",
            description: "Bold and dynamic showroom signage for Skoda UAE, aligning with the brand's global identity and inviting customers to experience innovation."
        },
        {
            title: "TCS BLITZ",
            category: "Logistics",
            image: "/signboard/tcs.jpg",
            description: "Efficient and durable signage solutions for TCS Blitz, ensuring clear visibility and brand recognition in fast-paced logistics environments."
        },
        {
            title: "VIETNAM",
            category: "Restaurant",
            image: "/signboard/vietnam.jpg",
            description: "Authentic and inviting signage for a Vietnamese restaurant, using cultural motifs and warm lighting to attract diners."
        },
        {
            title: "WANE PLAM",
            category: "Hospitality",
            image: "/signboard/wane-plam.jpg",
            description: "Luxurious resort signage for Wane Plam, blending seamlessly with the architectural aesthetics to enhance the guest arrival experience."
        },
        {
            title: "WEIXING OPTICAL",
            category: "Optical",
            image: "/signboard/weixing-optical.jpg",
            description: "Modern and clean signage for Weixing Optical, emphasizing clarity and vision with precision-lit lettering."
        },
        {
            title: "YINYANG SPA",
            category: "Wellness",
            image: "/signboard/yinyang.jpg",
            description: "Calming and balanced signage for Yinyang Spa, utilizing soft illumination and organic shapes to promote a sense of relaxation."
        },
        {
            title: "ABRACO",
            category: "Restaurant",
            image: "/signboard/abraco.jpg",
            description: "Distinctive and stylish signage for Abraco, creating a unique visual identity that stands out in a competitive dining landscape."
        },
        {
            title: "BEBEK",
            category: "Restaurant",
            image: "/signboard/bebek.jpg",
            description: "Vibrant and lively signage for Bebek, matching the energetic atmosphere of the restaurant and attracting a trendy clientele."
        },
        {
            title: "DELTA",
            category: "Aviation",
            image: "/signboard/delta.jpg",
            description: "Professional and authoritative signage for Delta, ensuring clear wayfinding and brand presence within airport environments."
        },
        {
            title: "FILA",
            category: "Sportswear",
            image: "/signboard/fila.jpg",
            description: "Energetic and sporty storefront branding for Fila, appealing to active lifestyle consumers with bold colors and dynamic logos."
        }
    ];

    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-primary-red selection:text-white">
            <SEO
                title="Signboard & Outdoor Advertising | Symbol Advertising"
                description="Make a lasting impression with premium outdoor signage, billboards, pylons, and signboard manufacturing. Quality craftsmanship by Symbol Advertising since 1999."
                canonical="/signboard"
            />


            {/* Hero Section */}
            <header className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-primary-red">
                    Signboard & <br /> Outdoor Branding
                </h1>
                <p ref={heroDescRef} className="text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed">
                    Making your brand visible, memorable, and impactful in the physical world through precision-crafted signage.
                </p>
            </header>

            {/* Why Symbol Section */}
            <section className="py-20 bg-zinc-900">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary-red mb-4">Why Symbol</h2>
                        <h3 className="text-3xl md:text-4xl font-bold mb-6">Mastery in Visibility</h3>
                    </div>
                    <div ref={whyDescRef} className="text-lg text-gray-300 leading-relaxed space-y-6">
                        <p>
                            A signboard is often the first handshake between your business and a potential customer. It needs to be more than just visible; it needs to be impactful. At Symbol, we understand the art and science of outdoor branding.
                        </p>
                        <p>
                            We utilize cutting-edge materials and manufacturing techniques to create signage that withstands the elements while maintaining its aesthetic appeal. From towering pylons to intricate 3D lettering, our solutions are engineered for durability and designed for dominance.
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
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to make a statement?</h2>
                    <p className="text-xl text-white/70 mb-10">
                        Let's create signage that puts your brand on the map.
                    </p>
                    <button onClick={() => openModal('Signboards')} className="inline-block bg-primary-red hover:bg-[#b03535] text-white font-bold py-4 px-10 rounded-full transition-colors duration-300">
                        Get a Quote
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SignboardPage;
