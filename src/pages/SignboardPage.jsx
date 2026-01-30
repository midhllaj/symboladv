import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import './SignboardPage.css';

gsap.registerPlugin(CustomEase);

const SignboardPage = () => {
    const totalSlides = 13;
    const currentSlideRef = useRef(1);
    const isAnimatingRef = useRef(false);
    const scrollAllowedRef = useRef(true);
    const lastScrollTimeRef = useRef(0);
    const sliderRef = useRef(null);

    const slideTitles = [
        "NBF BANK",
        "OMEGA",
        "DUBAI",
        "SKODA UAE",
        "TCS BLITZ",
        "VIETNAM",
        "WANE PLAM",
        "WEIXING OPTICAL",
        "YINYANG SPA",
        "ABRACO",
        "BEBEK",
        "DELTA",
        "FILA",
    ];

    const slideDescriptions = [
        "Banking",
        "Luxury Watches",
        "Tourism",
        "Automotive",
        "Logistics",
        "Restaurant",
        "Hospitality",
        "Optical",
        "Wellness",
        "Restaurant",
        "Restaurant",
        "Aviation",
        "Sportswear",
    ];

    const slideImages = [
        "/signboard/nbf.jpg",
        "/signboard/omega.jpg",
        "/signboard/dubai.jpg",
        "/signboard/skoda-uae.jpg",
        "/signboard/tcs.jpg",
        "/signboard/vietnam.jpg",
        "/signboard/wane-plam.jpg",
        "/signboard/weixing-optical.jpg",
        "/signboard/yinyang.jpg",
        "/signboard/abraco.jpg",
        "/signboard/bebek.jpg",
        "/signboard/delta.jpg",
        "/signboard/fila.jpg",
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

        const img = document.createElement("img");
        img.src = slideImages[slideNumber - 1];
        img.alt = "";
        wrapper.appendChild(img);

        if (direction === "down") {
            wrapper.style.clipPath = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";
        } else {
            wrapper.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";
        }

        return wrapper;
    };

    const createTextElements = (slideNumber, direction) => {
        const newTitle = document.createElement("h1");
        newTitle.textContent = slideTitles[slideNumber - 1];
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
            nextSlide = currentSlideRef.current === totalSlides ? 1 : currentSlideRef.current + 1;
        } else {
            nextSlide = currentSlideRef.current === 1 ? totalSlides : currentSlideRef.current - 1;
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
                currentSlideRef.current = nextSlide;
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
    }, []);

    return (
        <div className="signboard-page">
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
                        <img src={slideImages[0]} alt="" />
                    </div>
                </div>

                <div className="slide-copy">
                    <div className="slide-title">
                        <h1>{slideTitles[0]}</h1>
                    </div>
                    <div className="slide-description">
                        <p>{slideDescriptions[0]}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignboardPage;
