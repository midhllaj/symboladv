'use client';
import React from 'react';
import Character from '../../Textscroll/Textscroll/Character';
import styles from '../../Textscroll/Textscroll/Style.module.scss'; // Reusing styles if compatible, or just use tailwind

const WhoWeAre = () => {
    const introText = "Symbol Advertising is a full-service advertising agency committed to crafting powerful brand experiences. Since 1999, we have partnered with businesses to create visually striking, strategically sound, and result-driven advertising solutions.";
    const beliefText = "We believe great advertising is not loud — it's memorable.";

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

            <div className="text-left">
                <div className="text-xl md:text-2xl font-semibold italic text-gray-300">
                    <Character paragraph={beliefText} />
                </div>
            </div>

            {/* Stats Section - Static for clarity or simple animation */}
            <div className="grid grid-cols-2 gap-6 w-full border-t border-b border-gray-800 py-6">
                <div className="text-left">
                    <p className="text-3xl font-bold text-[#D64545]">25+</p>
                    <p className="text-sm uppercase tracking-wider text-gray-400">Years Experience</p>
                </div>
                <div className="text-left">
                    <p className="text-3xl font-bold text-[#D64545]">500+</p>
                    <p className="text-sm uppercase tracking-wider text-gray-400">Clients Trust Us</p>
                </div>
            </div>

        </div>
    );
};

export default WhoWeAre;

