import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MoveUpRight } from 'lucide-react';

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
        link: '/portfolio' // Default to portfolio if no specific page
    },
];

const Services = () => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const horizontalContainerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = horizontalContainerRef.current.children;
            const totalWidth = horizontalContainerRef.current.scrollWidth;
            const viewportWidth = window.innerWidth;

            // Calculate how much to scroll: Total width of cards minus the visible remaining space width
            // Actually simpler: typically we scroll (totalWidth - windowWidth) but here we have a split screen potentially?
            // User requested "big" section. Horizontal scroll typically takes full width.
            // Let's assume the design requested:
            // Left sticky: "Our Expertise..."
            // Right scroll: Cards. 
            // BUT standard horizontal scroll usually pins the WHOLE section and moves content leftwards.
            // Let's implement the "Pin and Pan" strategy.

            // If desktop (min-width: 768px)
            if (window.innerWidth >= 768) {
                // Use parent element width to get the actual visible horizontal space for the cards container
                const visibleWidth = horizontalContainerRef.current.parentElement ? horizontalContainerRef.current.parentElement.offsetWidth : window.innerWidth * 0.65;
                const totalWidth = horizontalContainerRef.current.scrollWidth;

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

    return (
        <section ref={sectionRef} className="bg-black text-white relative overflow-hidden">
            {/* Trigger element for pinning */}
            <div ref={triggerRef} className="h-screen w-full flex flex-col md:flex-row overflow-hidden relative">

                {/* Left Sticky Content */}
                <div className="w-full md:w-[35vw] flex-shrink-0 flex flex-col justify-center px-8 md:px-16 z-10 bg-black/50 backdrop-blur-sm md:bg-black">
                    <div className="mb-8">
                        <h2 className="text-[#D64545] font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-4">
                            Our Expertise
                            <span className="h-[1px] w-12 bg-[#D64545]"></span>
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-bold leading-[0.9] text-white mb-8">
                            Our Main <br />
                            Services
                        </h3>
                        <p className="text-white/60 text-lg md:text-xl max-w-sm">
                            From ideas to impact, we craft powerful moments that stop the scroll and start conversations.
                        </p>
                    </div>
                    {/* Hint for scrolling */}
                    <div className="hidden md:flex items-center gap-2 text-white/40 text-sm mt-12 animate-pulse">
                        <span>SCROLL TO EXPLORE</span>
                        <MoveUpRight className="rotate-45" size={16} />
                    </div>
                </div>

                {/* Right Horizontal Scroll Container */}
                <div
                    className="flex-1 flex items-center h-full overflow-x-auto md:overflow-x-visible no-scrollbar pl-8 md:pl-0"

                >
                    <div ref={horizontalContainerRef} className="flex gap-8 md:gap-20 px-4 md:px-0 flex-nowrap h-[60vh] md:h-[70vh] items-center">
                        {servicesData.map((service, index) => (
                            <Link
                                to={service.link}
                                key={service.id}
                                className="group relative w-[80vw] md:w-[600px] h-full flex-shrink-0 bg-[#0a0a0a] border border-white/10 hover:border-[#D64545]/50 transition-all duration-500 overflow-hidden"
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
                        {/* Spacer for end of scroll */}
                        <div className="w-[10vw] flex-shrink-0"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
