import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const AboutCompany = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const statsRef = useRef(null);
    const cardsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animated Text Reveal for Main Content
            const animateText = (element, delay = 0) => {
                gsap.fromTo(element,
                    { y: 50, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 1,
                        ease: "power3.out",
                        delay: delay,
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                        }
                    }
                );
            };

            // Animate Header elements
            Array.from(contentRef.current.children).forEach((child, i) => {
                animateText(child, i * 0.1);
            });

            // Stats Animation
            gsap.from(statsRef.current.children, {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: statsRef.current,
                    start: "top 85%",
                }
            });

            // Count Animation
            const stats = statsRef.current.querySelectorAll('.count-stat');
            stats.forEach((stat, index) => {
                const targetVal = index === 0 ? 25 : 500;
                const obj = { val: 0 };
                gsap.to(obj, {
                    val: targetVal,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                    },
                    onUpdate: () => {
                        stat.textContent = Math.floor(obj.val) + "+";
                    }
                });
            });

            // Mission/Vision Cards Animation
            gsap.from(cardsRef.current.children, {
                x: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: "top 80%",
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="about" ref={sectionRef} className="py-24 bg-dark-charcoal text-white relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                {/* Left Column: Content */}
                <div ref={contentRef} className="space-y-8">
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-primary-red mb-4">Who We Are</h2>
                        <h3 className="text-5xl md:text-6xl font-bold tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                            Symbol Advertising
                        </h3>
                    </div>

                    <div className="space-y-6 text-lg md:text-xl text-gray-400 font-light leading-relaxed">
                        <p>
                            Symbol Advertising is a full-service advertising agency committed to crafting powerful brand experiences. Since 1999, we have partnered with businesses to create visually striking, strategically sound, and result-driven advertising solutions.
                        </p>

                    </div>

                    {/* Stats */}
                    <div ref={statsRef} className="flex gap-12 pt-8 border-t border-white/10">
                        <div>
                            <span className="block text-4xl md:text-5xl font-bold text-white mb-1 count-stat">0+</span>
                            <span className="text-sm uppercase tracking-wider text-gray-500">Years Experience</span>
                        </div>
                        <div>
                            <span className="block text-4xl md:text-5xl font-bold text-white mb-1 count-stat">0+</span>
                            <span className="text-sm uppercase tracking-wider text-gray-500">Clients Trust Us</span>
                        </div>
                    </div>
                </div>

                {/* Right Column: Mission & Vision Cards */}
                <div ref={cardsRef} className="space-y-6">
                    {/* Mission Card */}
                    <div className="group p-8 rounded-2xl bg-[#111] border border-white/10 hover:border-blue-500/50 transition-colors duration-500">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-primary-red/10 text-primary-red group-hover:bg-primary-red group-hover:text-white transition-all duration-300">
                                <Target className="w-6 h-6" />
                            </div>
                            <h4 className="text-2xl font-bold text-white">Mission</h4>
                        </div>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                            To deliver creative, strategic, and impactful advertising solutions that enhance brand value and drive business growth.
                        </p>
                    </div>

                    {/* Vision Card */}
                    <div className="group p-8 rounded-2xl bg-[#111] border border-white/10 hover:border-purple-500/50 transition-colors duration-500">
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                                <Award className="w-6 h-6" />
                            </div>
                            <h4 className="text-2xl font-bold text-white">Vision</h4>
                        </div>
                        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                            To be a trusted advertising partner recognized for innovation, quality, and excellence.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutCompany;
