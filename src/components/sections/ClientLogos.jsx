import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Dynamically list the files based on what we copied. 
// Since we can't do fs in browser, we'll list the filenames provided by the user.
// In a real app we might dynamic import.
const logos = [
    '10.png', '11.png', '22.png', '33.png', '44.png', '55.png', '66.png', '77.png', '88.png', '99.png',
    '111.png', '122.png', '133.png', '144.png', '155.png', '166.png', '177.png', '188.png', '199.png',
    '200.png', '211.png', '222.png', '233.png', '244.png', '255.png', '266.png', '277.png', '288.png', '299.png',
    '300.png', '311.png', '322.png', '333.png', '344.png', '355.png'
];

const ClientLogos = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sliderRef.current, {
                x: "-50%",
                duration: 50, // User requested 50 seconds
                ease: "none",
                repeat: -1
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 bg-dark-charcoal text-white relative overflow-hidden border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                    From field to field, <span className="text-primary-red">Symbol Advertising</span> covers it.
                </h3>
            </div>

            <div className="w-full overflow-hidden flex relative mask-linear-gradient">
                <div ref={sliderRef} className="flex gap-24 items-center whitespace-nowrap w-max pr-24">
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} className="w-48 h-24 flex-shrink-0 flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                            <img
                                src={`/logosss/${logo}`}
                                alt="Client Logo"
                                className="max-w-full max-h-full object-contain brightness-0 invert opacity-80 hover:opacity-100 transition-opacity duration-300"
                            />
                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default ClientLogos;
