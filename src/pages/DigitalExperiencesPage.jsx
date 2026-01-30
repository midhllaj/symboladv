import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import './DigitalExperiencesPage.css';

gsap.registerPlugin(CustomEase);

const DigitalExperiencesPage = () => {
    const totalSlides = 2; // Only 2 slides now
    const [currentSlide, setCurrentSlide] = useState(1);
    const isAnimatingRef = useRef(false);
    const scrollAllowedRef = useRef(true);
    const lastScrollTimeRef = useRef(0);
    const sliderRef = useRef(null);

    const slideTitles = [
        "REGALSPACES",
        "DION POWER SOLUTIONS",
    ];

    const slideDescriptions = [
        "Real Estate",
        "Power Solutions",
    ];

    const slideLinks = [
        "https://www.regalspaces.store/",
        "https://www.dionpower.in/",
    ];

    const slideImages = [
        "/digital-experiences/regal.jpeg",
        "/digital-experiences/dion.jpeg",
    ];

    const createSlide = (slideNumber, direction) => {
        const slide = document.createElement("div");
        slide.className = "slide";

        const slideBgImg = document.createElement("div");
        slideBgImg.className = "slide-bg-img";

        const img = document.createElement("img");
        img.src = slideImages[slideNumber - 1];
        img.alt = "";

        slideBgImg.appendChild(img);
        slide.appendChild(slideBgImg);

        if (direction === "down") {
            slideBgImg.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        } else {
            slideBgImg.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
        }

        return slide;
    };

    const createMainImageWrapper = (slideNumber, direction) => {
        const wrapper = document.createElement("div");
        wrapper.className = "slide-main-img-wrapper";

        const link = slideLinks[slideNumber - 1];

        if (link) {
            const anchor = document.createElement("a");
            anchor.href = link;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";

            const img = document.createElement("img");
            img.src = slideImages[slideNumber - 1];
            img.alt = "";

            anchor.appendChild(img);
            wrapper.appendChild(anchor);
        } else {
            const img = document.createElement("img");
            img.src = slideImages[slideNumber - 1];
            img.alt = "";
            wrapper.appendChild(img);
        }

        if (direction === "down") {
            wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
        } else {
            wrapper.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        }

        return wrapper;
    };

    const createTextElements = (slideNumber, direction) => {
        const link = slideLinks[slideNumber - 1];

        const newTitle = document.createElement("h1");
        if (link) {
            const anchor = document.createElement("a");
            anchor.href = link;
            anchor.target = "_blank";
            anchor.rel = "noopener noreferrer";
            anchor.style.textDecoration = "none";
            anchor.style.color = "inherit";
            anchor.textContent = slideTitles[slideNumber - 1];
            newTitle.appendChild(anchor);
        } else {
            newTitle.textContent = slideTitles[slideNumber - 1];
        }
        gsap.set(newTitle, {
            y: direction === "down" ? 50 : -50,
        });

        const newDescription = document.createElement("p");
        newDescription.textContent = slideDescriptions[slideNumber - 1];
        gsap.set(newDescription, {
            y: direction === "down" ? 20 : -20,
        });

        return { newTitle, newDescription };
    };

    const animateSlide = (direction) => {
        if (isAnimatingRef.current || !scrollAllowedRef.current) return;

        isAnimatingRef.current = true;
        scrollAllowedRef.current = false;

        const slider = sliderRef.current;
        const currentSlideElement = slider.querySelector(".slide");
        const mainImageContainer = slider.querySelector(".slide-main-img");
        const currentMainWrapper = mainImageContainer.querySelector(".slide-main-img-wrapper");

        const titleContainer = slider.querySelector(".slide-title");
        const descriptionContainer = slider.querySelector(".slide-description");

        const currentTitle = titleContainer.querySelector("h1");
        const currentDescription = descriptionContainer.querySelector("p");

        let nextSlide;
        if (direction === "down") {
            nextSlide = currentSlide === totalSlides ? 1 : currentSlide + 1;
        } else {
            nextSlide = currentSlide === 1 ? totalSlides : currentSlide - 1;
        }

        const newSlide = createSlide(nextSlide, direction);
        const newMainWrapper = createMainImageWrapper(nextSlide, direction);
        const { newTitle, newDescription } = createTextElements(nextSlide, direction);

        slider.appendChild(newSlide);
        mainImageContainer.appendChild(newMainWrapper);
        titleContainer.appendChild(newTitle);
        descriptionContainer.appendChild(newDescription);

        gsap.set(newMainWrapper.querySelector("img"), {
            y: direction === "down" ? "-50%" : "50%",
        });

        const tl = gsap.timeline({
            onComplete: () => {
                [
                    currentSlideElement,
                    currentMainWrapper,
                    currentTitle,
                    currentDescription,
                ].forEach((el) => el?.remove());

                isAnimatingRef.current = false;
                setCurrentSlide(nextSlide);
                setTimeout(() => {
                    scrollAllowedRef.current = true;
                    lastScrollTimeRef.current = Date.now();
                }, 100);
            },
        });

        tl.to(
            newSlide.querySelector(".slide-bg-img"),
            {
                clipPath:
                    direction === "down"
                        ? "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)"
                        : "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.25,
                ease: CustomEase.create("", ".87,0,.13,1"),
            },
            0
        )
            .to(
                currentSlideElement.querySelector("img"),
                {
                    scale: 1.5,
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            )
            .to(
                newMainWrapper,
                {
                    clipPath:
                        direction === "down"
                            ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                            : "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            )
            .to(
                currentMainWrapper.querySelector("img"),
                {
                    y: direction === "down" ? "50%" : "-50%",
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            )
            .to(
                newMainWrapper.querySelector("img"),
                {
                    y: "0%",
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            )
            .to(
                currentTitle,
                {
                    y: direction === "down" ? -50 : 50,
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            )
            .to(
                newTitle,
                {
                    y: 0,
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            )
            .to(
                currentDescription,
                {
                    y: direction === "down" ? -20 : 20,
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            )
            .to(
                newDescription,
                {
                    y: 0,
                    duration: 1.25,
                    ease: CustomEase.create("", ".87,0,.13,1"),
                },
                0
            );
    };

    useEffect(() => {
        const handleScroll = (direction) => {
            const now = Date.now();
            if (isAnimatingRef.current || !scrollAllowedRef.current) return;
            if (now - lastScrollTimeRef.current < 1000) return;
            lastScrollTimeRef.current = now;
            animateSlide(direction);
        };

        const handleWheel = (e) => {
            e.preventDefault();
            const direction = e.deltaY > 0 ? "down" : "up";
            handleScroll(direction);
        };

        let touchStartY = 0;
        let isTouchActive = false;

        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
            isTouchActive = true;
        };

        const handleTouchMove = (e) => {
            e.preventDefault();
            if (!isTouchActive || isAnimatingRef.current || !scrollAllowedRef.current) return;
            const touchCurrentY = e.touches[0].clientY;
            const difference = touchStartY - touchCurrentY;
            if (Math.abs(difference) > 10) {
                isTouchActive = false;
                const direction = difference > 0 ? "down" : "up";
                handleScroll(direction);
            }
        };

        const handleTouchEnd = () => {
            isTouchActive = false;
        };

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="digital-experiences-page">
            {/* Navigation */}


            {/* Slider */}
            <div className="slider" ref={sliderRef}>
                <div className="slide">
                    <div className="slide-bg-img">
                        <img src={slideImages[0]} alt="" />
                    </div>
                </div>

                <div className="slide-main-img">
                    <div className="slide-main-img-wrapper">
                        {slideLinks[0] ? (
                            <a href={slideLinks[0]} target="_blank" rel="noopener noreferrer">
                                <img src={slideImages[0]} alt="" />
                            </a>
                        ) : (
                            <img src={slideImages[0]} alt="" />
                        )}
                    </div>
                </div>

                <div className="slide-copy">
                    <div className="slide-title">
                        {slideLinks[0] ? (
                            <a href={slideLinks[0]} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h1>{slideTitles[0]}</h1>
                            </a>
                        ) : (
                            <h1>{slideTitles[0]}</h1>
                        )}
                    </div>
                    <div className="slide-description">
                        <p>{slideDescriptions[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalExperiencesPage;
