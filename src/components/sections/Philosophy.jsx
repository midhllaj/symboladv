import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Cube from '../Creativehook/Cube'; // Importing the 3D Star component

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    const philosophies = [
        {
            title: "Fame",
            description: "The most famed brands are the most noticed. They generate the highest mental share and become the 'go to' in their category."
        },
        {
            title: "Admiration",
            description: "When brands are admired positive perceptions and preference grow, driving emotional competitive advantage."
        },
        {
            title: "Belief",
            description: "When audiences believe in a brand's promise, it means people understand and desire the value proposition, committing to the brand."
        }
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(contentRef.current.children, {
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

    return (
        <section
            id="philosophy"
            ref={sectionRef}
            className="py-24 relative overflow-hidden text-black"
            style={{
                background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 25%, #67e8f9 50%, #c084fc 75%, #a78bfa 100%)' // Approximate mesh gradient
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6">
                <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">

                    {/* Left Column - Main Heading */}
                    <div className="lg:col-span-1">
                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-light leading-tight tracking-tight">
                            From <br />
                            brand to <br />
                            demand
                        </h2>
                    </div>

                    {/* Center Column - 3D Star */}
                    <div className="lg:col-span-1 flex justify-center items-center h-[500px]">
                        {/* Reusing Cube but adjusting container size if needed. 
                             Passing static rotation or gentle animation if desired.
                             Using standard Cube props. */}
                        <div className="w-full h-full flex items-center justify-center scale-125">
                            <Cube
                                rotation={2}
                                xPos={-15}
                                yPos={0}
                                className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
                            />
                        </div>
                    </div>

                    {/* Right Column - Fame, Admiration, Belief */}
                    <div className="lg:col-span-1 pl-0 lg:pl-12">
                        <h3 className="text-3xl font-normal mb-12">
                            Capture attention <br />
                            every step of the way
                        </h3>

                        <div className="space-y-12">
                            {philosophies.map((item, index) => (
                                <div key={index} className="border-t border-black/20 pt-4">
                                    <div className="flex items-baseline justify-between mb-2">
                                        <h4 className="text-lg font-medium">{item.title}</h4>
                                    </div>
                                    <p className="text-sm leading-relaxed opacity-80">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-16 flex items-center justify-between border-t border-black pt-4 cursor-pointer hover:opacity-70 transition-opacity">
                            <span className="uppercase text-sm tracking-wide">Learn about our approach</span>
                            <span className="text-2xl">↗</span>
                        </div>
                    </div>

                </div>

                {/* Footer Text */}
                <div className="mt-20 max-w-md text-xs leading-relaxed opacity-70">
                    The world's most awarded brand-to-demand marketing agency: We build brands that build demand.
                </div>
            </div>
        </section>
    );
};

export default Philosophy;
