import React, { useEffect, useRef } from 'react';
import './ImageTrail.css';

const ImageTrail = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Configuration
        const config = {
            imageCount: 35,
            imageLifespan: 750, // ms
            removalDelay: 50,
            mouseThreshold: 100, // Distance mouse must move to trigger new image
            scrollThreshold: 50,
            idleCursorInterval: 300,
            inDuration: 750,
            outDuration: 1000,
            // standard cubic-bezier easings
            inEasing: "cubic-bezier(.07,.5,.5,1)",
            outEasing: "cubic-bezier(.87, 0, .13, 1)",
        };

        // Image Sources
        // Assuming images are in /assets/trail/img1.jpeg to img35.jpeg
        const images = Array.from(
            { length: config.imageCount },
            (_, i) => `/assets/trail/img${i + 1}.jpeg`
        );

        // State variables (refs not needed since we are inside useEffect closure)
        const trail = [];
        let mouseX = 0;
        let mouseY = 0;
        let lastMouseX = 0;
        let lastMouseY = 0;
        let isMoving = false;
        let isCursorInContainer = false;

        // Timestamps
        let lastRemovalTime = 0;
        let lastSteadyImageTime = 0;
        let lastScrollTime = 0;

        // Flags
        let isScrolling = false;
        let scrollTicking = false;
        let animationFrameId = null;
        let moveTimeout = null;
        let scrollTimeout = null;

        // Helpers
        const isInContainer = (x, y) => {
            if (!container) return false;
            const rect = container.getBoundingClientRect();
            return (
                x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
            );
        };

        const createTrailImage = () => {
            if (!isCursorInContainer) return;

            const now = Date.now();

            if (isMoving && hasMovedEnough()) {
                lastMouseX = mouseX;
                lastMouseY = mouseY;
                createImage();
                return;
            }

            if (!isMoving && now - lastSteadyImageTime >= config.idleCursorInterval) {
                lastSteadyImageTime = now;
                createImage();
            }
        };

        const hasMovedEnough = () => {
            const distance = Math.sqrt(
                Math.pow(mouseX - lastMouseX, 2) + Math.pow(mouseY - lastMouseY, 2)
            );
            return distance > config.mouseThreshold;
        };

        const createImage = () => {
            const img = document.createElement("img");
            img.classList.add("trail-img");

            const randomIndex = Math.floor(Math.random() * images.length);
            const rotation = (Math.random() - 0.5) * 50;
            img.src = images[randomIndex];

            const rect = container.getBoundingClientRect();
            // Calculate relative position within the container
            // (Assumes container takes up the space we are tracking)
            const relativeX = mouseX - rect.left;
            const relativeY = mouseY - rect.top;

            img.style.left = `${relativeX}px`;
            img.style.top = `${relativeY}px`;
            // Start at scale 0
            img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(0)`;
            img.style.transition = `transform ${config.inDuration}ms ${config.inEasing}`;

            container.appendChild(img);

            // Trigger animation to scale 1
            setTimeout(() => {
                img.style.transform = `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`;
            }, 10);

            trail.push({
                element: img,
                rotation: rotation,
                removeTime: Date.now() + config.imageLifespan,
            });
        };

        const createScrollTrailImage = () => {
            if (!isCursorInContainer) return;

            // Simulate mouse movement on scroll
            lastMouseX += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);
            lastMouseY += (config.mouseThreshold + 10) * (Math.random() > 0.5 ? 1 : -1);

            createImage();

            lastMouseX = mouseX;
            lastMouseY = mouseY;
        };

        const removeOldImages = () => {
            const now = Date.now();

            if (now - lastRemovalTime < config.removalDelay || trail.length === 0)
                return;

            const oldestImage = trail[0];
            if (now >= oldestImage.removeTime) {
                const imgToRemove = trail.shift();

                // Animate out
                imgToRemove.element.style.transition = `transform ${config.outDuration}ms ${config.outEasing}`;
                imgToRemove.element.style.transform = `translate(-50%, -50%) rotate(${imgToRemove.rotation}deg) scale(0)`;

                lastRemovalTime = now;

                // Remove directly from DOM after animation
                setTimeout(() => {
                    if (imgToRemove.element && imgToRemove.element.parentNode) {
                        imgToRemove.element.parentNode.removeChild(imgToRemove.element);
                    }
                }, config.outDuration);
            }
        };

        // Event Listeners
        const handleMouseMove = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            isCursorInContainer = isInContainer(mouseX, mouseY);

            if (isCursorInContainer) {
                isMoving = true;
                clearTimeout(moveTimeout);
                moveTimeout = setTimeout(() => {
                    isMoving = false;
                }, 100);
            }
        };

        const handleScroll = () => {
            // Re-check container bounds on scroll
            isCursorInContainer = isInContainer(mouseX, mouseY);

            if (isCursorInContainer) {
                isMoving = true;
                lastMouseX += (Math.random() - 0.5) * 10;

                clearTimeout(scrollTimeout);
                scrollTimeout = setTimeout(() => {
                    isMoving = false;
                }, 100);
            }

            const now = Date.now();
            isScrolling = true;

            if (now - lastScrollTime < config.scrollThreshold) return;

            lastScrollTime = now;

            if (!scrollTicking) {
                requestAnimationFrame(() => {
                    if (isScrolling) {
                        createScrollTrailImage();
                        isScrolling = false;
                    }
                    scrollTicking = false;
                });
                scrollTicking = true;
            }
        }

        // Mouse over listener to initialize position
        const setInitialMousePos = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            lastMouseX = mouseX;
            lastMouseY = mouseY;
            isCursorInContainer = isInContainer(mouseX, mouseY);
            document.removeEventListener("mouseover", setInitialMousePos);
        };

        document.addEventListener("mouseover", setInitialMousePos);
        document.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("scroll", handleScroll, { passive: true });

        // Animation Loop
        const animate = () => {
            createTrailImage();
            removeOldImages();
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            document.removeEventListener("mouseover", setInitialMousePos);
            document.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
            clearTimeout(moveTimeout);
            clearTimeout(scrollTimeout);

            // Cleanup remaining images from DOM
            trail.forEach(item => {
                if (item.element && item.element.parentNode) {
                    item.element.parentNode.removeChild(item.element);
                }
            });
        };

    }, []);

    return (
        <div ref={containerRef} className="trail-wrapper">
            <h1 className="text-6xl font-bold text-center pt-40 pointer-events-none relative z-20 text-white mix-blend-difference">
                About Us
            </h1>
            <p className="text-center mt-4 text-gray-400 pointer-events-none relative z-20 mix-blend-difference">
                ( Move your cursor around )
            </p>
        </div>
    );
};

export default ImageTrail;
