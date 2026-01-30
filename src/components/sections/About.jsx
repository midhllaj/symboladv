import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Award, User } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const sectionRef = useRef(null);
    const fadeElsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(fadeElsRef.current, {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el) => {
        if (el && !fadeElsRef.current.includes(el)) {
            fadeElsRef.current.push(el);
        }
    };

    return (
        <section id="about" ref={sectionRef} className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 space-y-32">

                {/* 1. About Company */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <div ref={addToRefs}>
                        <h2 className="text-sm font-bold uppercase tracking-widest text-primary-red mb-2">Who We Are</h2>
                        <h3 className="text-4xl md:text-5xl font-bold font-clash text-black tracking-tight mb-6">Symbol Advertising</h3>
                        <p className="text-lg text-black/60 leading-relaxed mb-6">
                            Symbol Advertising is a full-service advertising agency committed to crafting powerful brand experiences. Since 1999, we have partnered with businesses to create visually striking, strategically sound, and result-driven advertising solutions.
                        </p>
                        <p className="text-lg text-black font-medium mb-6">
                            We believe great advertising is not loud — it’s memorable.
                        </p>
                        <div className="flex space-x-8">
                            <div>
                                <span className="block text-3xl font-bold text-black">25+</span>
                                <span className="text-sm text-black/50">Years Experience</span>
                            </div>
                            <div>
                                <span className="block text-3xl font-bold text-black">500+</span>
                                <span className="text-sm text-black/50">Clients Trust Us</span>
                            </div>
                        </div>
                    </div>

                    <div ref={addToRefs} className="space-y-8">
                        <div className="bg-white p-8 rounded-2xl border-l-4 border-primary-red shadow-sm">
                            <h4 className="text-xl font-bold text-black mb-2 flex items-center">
                                <Target className="w-6 h-6 mr-3 text-primary-red" /> Mission
                            </h4>
                            <p className="text-black/70">
                                To deliver creative, strategic, and impactful advertising solutions that enhance brand value and drive business growth.
                            </p>
                        </div>
                        <div className="bg-white p-8 rounded-2xl border-l-4 border-primary-red shadow-sm">
                            <h4 className="text-xl font-bold text-black mb-2 flex items-center">
                                <Award className="w-6 h-6 mr-3 text-primary-red" /> Vision
                            </h4>
                            <p className="text-black/70">
                                To be a trusted advertising partner recognized for innovation, quality, and excellence.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Leadership */}
                <div ref={addToRefs} className="text-center">
                    <h3 className="text-3xl font-bold text-black mb-12">Our Leadership</h3>
                    <div className="max-w-2xl mx-auto bg-white p-10 rounded-3xl relative overflow-hidden shadow-lg border border-black/5">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-primary-red/10 rounded-full blur-3xl opacity-50"></div>

                        <div className="relative z-10">
                            <div className="w-24 h-24 bg-black/5 rounded-full mx-auto mb-6 flex items-center justify-center">
                                <User className="w-10 h-10 text-black/40" />
                            </div>
                            <h4 className="text-2xl font-bold text-black">ABDUL LETHEIF</h4>
                            <p className="text-primary-red font-medium mb-6 uppercase tracking-wider text-sm">Founder & Managing Director</p>

                            <div className="text-black/60 italic leading-relaxed relative">
                                <span className="text-6xl text-primary-red/10 absolute -top-8 -left-4 font-serif">"</span>
                                At Symbol Advertising, our mission is to transform ideas into visible, functional, and powerful brand experiences. We believe in the strength of bold ideas, smart strategy, and flawless execution.
                                <span className="text-6xl text-primary-red/10 absolute -bottom-12 -right-4 font-serif">"</span>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </section>
    );
};

export default About;
