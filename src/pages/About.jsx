import React from 'react';

import LeadershipLocation from '../components/sections/LeadershipLocation';

import AboutClientLogos from '../components/sections/AboutClientLogos';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="bg-black min-h-screen pt-20">
            {/* Hero Section */}
            <section className="relative py-24 px-6 max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        About <span className="text-primary-red">Symbol</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        We are a creative powerhouse dedicated to transforming brands into icons.
                        Bridging the gap between physical and digital experiences since 1999.
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-y border-white/10 py-12 mb-20">
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-white mb-2">1999</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Established</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-white mb-2">500+</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Clients</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-white mb-2">25+</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Years Experience</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-4xl font-bold text-white mb-2">100%</h3>
                        <p className="text-sm text-gray-500 uppercase tracking-widest">Commitment</p>
                    </div>
                </div>
            </section>

            {/* Founder Section */}
            <LeadershipLocation />

            {/* Client Logos Section */}
            <AboutClientLogos />




        </div>
    );
};

export default About;
