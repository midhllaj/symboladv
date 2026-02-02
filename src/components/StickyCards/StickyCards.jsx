import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StickyCards.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import detailImg from '../../assets/construction/detail.png';

gsap.registerPlugin(ScrollTrigger);

const StickyCards = () => {
    const stickyCardsData = [
        {
            index: "01",
            title: "Conferences & Exhibition Experience",
            image: "/services/conferences.png",
            description: "Immersive environments for your biggest events. We design spaces that don't just host people, but transport them into unforgettable brand experiences.",
        },
        {
            index: "02",
            title: "Signboard & Outdoor Branding",
            image: "/services/signboard.jpg",
            description: "High-impact physical branding that stands out day and night. Precision engineering meets creative design for maximum visibility.",
        },
        {
            index: "03",
            title: "Digital Experience",
            image: "/services/digital.jpeg",
            description: "Websites, apps, and digital touchpoints that are intuitive, engaging, and perfectly aligned with your brand identity.",
        },
        {
            index: "04",
            title: "Construction & Brand Infrastructure",
            image: detailImg,
            description: "Full-scale structural branding and setups. We bridge the gap between creative vision and physical reality with expert execution.",
        },
    ];

    const container = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Text Animations (All Devices)
            const cards = document.querySelectorAll(".sticky-card");
            cards.forEach(card => {
                const texts = card.querySelectorAll(".sticky-card-index h1, .sticky-card-header, .sticky-card-copy p");

                gsap.from(texts, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                });

                const image = card.querySelector(".sticky-card-img img");
                gsap.fromTo(image,
                    { scale: 1.2, opacity: 0 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 1.2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            mm.add("(min-width: 1001px)", () => {
                const stickyCards = document.querySelectorAll(".sticky-card");

                stickyCards.forEach((card, index) => {
                    const isLast = index === stickyCards.length - 1;

                    // Pin all cards except the last one (Stacking Effect)
                    if (!isLast) {
                        ScrollTrigger.create({
                            trigger: card,
                            start: "top top",
                            endTrigger: stickyCards[stickyCards.length - 1],
                            end: "top top",
                            pin: true,
                            pinSpacing: false,
                        });

                        // Animate scale, rotation, and overlay
                        ScrollTrigger.create({
                            trigger: stickyCards[index + 1],
                            start: "top bottom",
                            end: "top top",
                            onUpdate: (self) => {
                                const progress = self.progress;
                                const scale = 1 - progress * 0.25;
                                const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                                const afterOpacity = progress;

                                gsap.set(card, {
                                    scale: scale,
                                    rotation: rotation,
                                    "--after-opacity": afterOpacity,
                                });
                            },
                        });
                    }
                });
            });


        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div className="sticky-cards" ref={container}>
            {stickyCardsData.map((cardData, index) => {
                const isConferences = cardData.index === "01";
                const isSignboard = cardData.index === "02";
                const isDigitalExp = cardData.index === "03";
                const isConstruction = cardData.index === "04";
                const CardWrapper = (isConferences || isSignboard || isDigitalExp || isConstruction) ? Link : 'div';

                let wrapperProps = {};
                if (isConferences) {
                    wrapperProps = { to: '/conferences' };
                } else if (isSignboard) {
                    wrapperProps = { to: '/signboard' };
                } else if (isDigitalExp) {
                    wrapperProps = { to: '/digital-experiences' };
                } else if (isConstruction) {
                    wrapperProps = { to: '/construction' };
                }

                return (
                    <CardWrapper
                        className="sticky-card"
                        key={index}
                        {...wrapperProps}
                        style={{ cursor: (isConferences || isSignboard || isDigitalExp || isConstruction) ? 'pointer' : 'default' }}
                    >
                        <div className="sticky-card-index">
                            <h1>{cardData.index}</h1>
                        </div>
                        <div className="sticky-card-content">
                            <div className="sticky-card-content-wrapper">
                                <h1 className="sticky-card-header">{cardData.title}</h1>

                                <div className="sticky-card-img">
                                    <img src={cardData.image} alt={cardData.title} />
                                </div>

                                <div className="sticky-card-copy">
                                    <div className="sticky-card-copy-title">
                                        <p>(About the service)</p>
                                    </div>
                                    <div className="sticky-card-copy-description">
                                        <p>{cardData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardWrapper>
                );
            })}
        </div>
    );
};

export default StickyCards;
