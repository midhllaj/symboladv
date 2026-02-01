'use client';
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Character from '../../Textscroll/Textscroll/Character';
import styles from '../../Textscroll/Textscroll/Style.module.scss';

gsap.registerPlugin(ScrollTrigger);

const WhoWeAre = () => {
    const statsRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
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
        }, statsRef);
        return () => ctx.revert();
    }, []);
    const introText = "Symbol Advertising is a full-service advertising agency committed to crafting powerful brand experiences. Since 1999, we have partnered with businesses to create visually striking, strategically sound, and result-driven advertising solutions.";


    return (
        <div className="flex flex-col items-start justify-center w-full px-4 py-4 space-y-6 text-white">

            {/* Intro Section */}
            <div className="text-left">
                <h2 className="text-2xl font-bold mb-3 text-[#D64545]">Who We Are</h2>
                {/* Using a wrapper div to ensure the Character component styles work correctly if they rely on specific containment */}
                <div className="text-xl md:text-2xl leading-relaxed">
                    <Character paragraph={introText} />
                </div>
            </div>



            {/* Stats Section - Static for clarity or simple animation */}
            <div ref={statsRef} className="grid grid-cols-2 gap-6 w-full border-t border-b border-gray-800 py-6">
                <div className="text-left">
                    <p className="text-3xl font-bold text-[#D64545] count-stat">0+</p>
                    <p className="text-sm uppercase tracking-wider text-gray-400">Years Experience</p>
                </div>
                <div className="text-left">
                    <p className="text-3xl font-bold text-[#D64545] count-stat">0+</p>
                    <p className="text-sm uppercase tracking-wider text-gray-400">Clients Trust Us</p>
                </div>
            </div>

        </div>
    );
};

export default WhoWeAre;

