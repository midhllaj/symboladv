import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveUpRight, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const servicesData = [
    {
        id: 1,
        title: 'Contacting & Exhibition Experiences',
        description: 'We design and execute exhibition and contacting programs that don\'t just attract attention - they start conversations.',
        image: '/services/conferences.png',
        link: '/conferences'
    },
    {
        id: 2,
        title: 'Signboard & Outdoor Branding',
        description: 'Visibility is power. Our signboard solutions combine design precision, material quality, and strategic placement to ensure your brand stands out.',
        image: '/services/signboard.jpg',
        link: '/signboard'
    },
    {
        id: 3,
        title: 'Digital Experiences',
        description: 'We craft web, digital, and interactive experiences that are intuitive, engaging, and aligned with your brand identity - turning clicks into connections.',
        image: '/services/digital.jpeg',
        link: '/digital-experiences'
    },
    {
        id: 4,
        title: 'Construction & Branding Infrastructure',
        description: 'We deliver end-to-end construction solutions that support and elevate brand presence in physical spaces.',
        image: '/services/construction.jpg',
        link: '/portfolio'
    },
];

const Services = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const horizontalContainerRef = useRef(null);
    const mobileContainerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // If desktop (min-width: 768px)
            if (window.innerWidth >= 768) {
                gsap.to(horizontalContainerRef.current, {
                    x: -3500, // Hardcoded large value to guarantee reaching the end
                    ease: "none",
                    scrollTrigger: {
                        trigger: triggerRef.current,
                        start: "top top",
                        end: "+=1500", // Fixed distance for consistent, fast scroll
                        scrub: 1,
                        pin: true,
                        invalidateOnRefresh: true,
                        anticipatePin: 1
                    }
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleMobileScroll = () => {
        if (mobileContainerRef.current) {
            const scrollLeft = mobileContainerRef.current.scrollLeft;
            const width = mobileContainerRef.current.offsetWidth;
            const index = Math.round(scrollLeft / width);
            setActiveIndex(index);
        }
    };

    const handleNext = () => {
        if (mobileContainerRef.current) {
            const width = mobileContainerRef.current.offsetWidth;
            const nextIndex = (activeIndex + 1) % servicesData.length;
            mobileContainerRef.current.scrollTo({
                left: nextIndex * width,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section ref={sectionRef} className="bg-black text-white relative overflow-hidden">
            {/* Trigger element for pinning (Desktop) */}
            <div ref={triggerRef} className="min-h-screen w-full flex flex-col md:flex-row overflow-hidden relative">

                {/* Left Sticky Content / Mobile Header */}
                <div className="w-full md:w-[35vw] flex-shrink-0 flex flex-col justify-center px-8 md:px-16 pt-12 md:pt-0 z-10 bg-black md:bg-black relative">
                    <div className="mb-4 md:mb-8">
                        <h2 className="text-[#D64545] font-bold tracking-widest text-xs md:text-sm uppercase mb-4 md:mb-6 flex items-center gap-4">
                            Our Expertise
                            <span className="h-[1px] w-8 md:w-12 bg-[#D64545]"></span>
                        </h2>
                        <h3 className="text-4xl md:text-7xl font-bold leading-[0.9] text-white mb-6 md:mb-8">
                            Our Main <br />
                            Services
                        </h3>
                        <p className="text-white/60 text-lg md:text-xl max-w-sm hidden md:block">
                            From ideas to impact, we craft powerful moments that stop the scroll and start conversations.
                        </p>
                    </div>
                    {/* Hint for scrolling (Desktop) */}
                    <div className="hidden md:flex items-center gap-2 text-white/40 text-sm mt-12 animate-pulse">
                        <span>SCROLL TO EXPLORE</span>
                        <MoveUpRight className="rotate-45" size={16} />
                    </div>
                </div>

                {/* Desktop Horizontal Scroll Container */}
                <div className="hidden md:flex flex-1 items-center h-full overflow-hidden pl-0">
                    <div ref={horizontalContainerRef} className="flex gap-20 px-0 flex-nowrap h-[70vh] items-center">
                        {servicesData.map((service) => (
                            <Link
                                key={service.id}
                                to={service.link}
                                className="group relative w-[600px] h-full flex-shrink-0 bg-[#0a0a0a] border border-white/10 hover:border-[#D64545]/50 transition-all duration-500 overflow-hidden"
                            >
                                <div className="h-[60%] overflow-hidden relative">
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all z-10" />
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-6 right-6 z-20 bg-white text-black p-3 rounded-full transform translate-y-[-20px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                                        <MoveUpRight size={24} />
                                    </div>
                                </div>

                                <div className="h-[40%] p-8 flex flex-col justify-between bg-[#111]">
                                    <div>
                                        <h4 className="text-3xl font-bold mb-4 text-white group-hover:text-[#D64545] transition-colors">
                                            {service.title}
                                        </h4>
                                        <p className="text-white/50 text-base leading-relaxed line-clamp-3">
                                            {service.description}
                                        </p>
                                    </div>
                                    <div className="w-full h-[1px] bg-white/10 group-hover:bg-[#D64545]/30 transition-colors mt-6" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile Scroll Container */}
                <div className="md:hidden w-full flex-1 flex flex-col pb-12">
                    <div
                        ref={mobileContainerRef}
                        onScroll={handleMobileScroll}
                        className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar w-full h-[60vh]"
                    >
                        {servicesData.map((service) => (
                            <div key={service.id} className="w-full flex-shrink-0 snap-center px-4 h-full">
                                <Link to={service.link} className="block w-full h-full bg-[#111] relative overflow-hidden group">
                                    {/* Image Top */}
                                    <div className="h-[55%] w-full overflow-hidden relative">
                                        <div className="absolute inset-0 bg-black/10 z-10" />
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Content Bottom */}
                                    <div className="h-[45%] p-6 flex flex-col justify-center relative">
                                        <h4 className="text-3xl font-bold mb-3 text-white leading-tight">
                                            {service.title}
                                        </h4>
                                        <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-3 pr-20">
                                            {service.description}
                                        </p>

                                        {/* Large Arrow Button */}
                                        <div
                                            className="absolute bottom-6 right-6 w-12 h-12 bg-transparent border border-white/30 rounded-full flex items-center justify-center text-white"
                                        >
                                            <MoveUpRight size={20} />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>

                    {/* Mobile Pagination & Navigation */}
                    <div className="px-8 mt-6 flex flex-col gap-4">
                        {/* Progress Bars */}
                        <div className="flex gap-2 w-full">
                            {servicesData.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-[2px] flex-1 transition-colors duration-300 ${activeIndex === idx ? 'bg-white' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>

                        {/* Footer Controls */}
                        <div className="flex justify-between items-end">
                            <span className="text-white font-mono text-lg">
                                {activeIndex + 1} <span className="text-white/40">|</span> {servicesData.length}
                            </span>

                            <button
                                onClick={handleNext}
                                className="w-14 h-14 bg-transparent border border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                            >
                                <ArrowRight size={24} />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Services;
