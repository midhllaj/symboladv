import React from 'react';
import StickyCards from '../components/StickyCards/StickyCards';

const ServicesPage = () => {
    return (
        <div className="bg-light-grey">
            {/* Intro Section */}
            <section
                className="relative w-full h-screen bg-cover bg-center bg-no-repeat text-white flex justify-center items-center text-center"
                style={{ backgroundImage: "url('/services-intro-bg.jpg')" }}
            >
                <div className="max-w-4xl px-6">
                    <div className="inline-block mb-6 px-4 py-2 bg-primary-red/10 border border-primary-red/30 rounded-full">
                        <span className="text-primary-red font-medium text-sm tracking-wider">OUR SERVICES</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
                        What We Do
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 font-light">
                        Scroll to explore our expertise
                    </p>
                </div>
            </section>

            {/* Sticky Cards Section */}
            <StickyCards />

            {/* Outro Section */}
            <section className="relative w-full h-screen bg-dark-charcoal text-white flex flex-col justify-center items-center text-center px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to Transform Your Brand?
                </h2>
                <p className="text-xl text-gray-300 mb-10 max-w-2xl">
                    Let's discuss how we can help you achieve your goals
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="/#contact"
                        className="px-8 py-4 bg-primary-red text-white rounded-full font-semibold text-lg hover:bg-[#b83838] hover:scale-105 transition-all duration-300 shadow-xl"
                    >
                        Get Started
                    </a>
                    <a
                        href="/portfolio"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white hover:text-dark-charcoal transition-all duration-300"
                    >
                        View Our Work
                    </a>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;
