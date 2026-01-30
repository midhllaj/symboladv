import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';
import Cube from '../Cube';
import Scroll from '../../Textscroll/Textscroll/Scroll';
import TextScroll from '../../Textscroll/Textscroll/Textscroll';
import WhoWeAre from './WhoWeAre';

export const Hook = () => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Track scroll progress of the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Rotation: 0 to 6 radians over the scroll (slightly more rotation for 3 sections)
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const smoothRotation = useSpring(rotation, { damping: 20 });

  // Horizontal position:
  // Desktop: Zigbag (55 -> -32 -> 28)
  // Mobile: Centered (0)
  const xDesktopValues = [28, 28, -32, -32, 28];
  const xMobileValues = [0, 0, 0, 0, 0];

  const xPosition = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    isMobile ? xMobileValues : xDesktopValues
  );

  const smoothX = useSpring(xPosition, { damping: 30, stiffness: 200 });

  // FORCE INIT: Immediately set spring to start value to prevent animation on load
  React.useLayoutEffect(() => {
    smoothX.jump(isMobile ? 0 : 28);
  }, [smoothX, isMobile]);

  // Y position - refined with keyframes to control height at each section
  // Section 1: 4 (Lowered from 10) -> Section 2: 0 -> Section 3: -10 (More down at end as requested)
  const yPosition = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [4, 4, 0, 0, -10]);

  return (
    <div ref={containerRef} className="relative bg-dark-charcoal">
      {/* Title Section - Reduced padding */}
      <div className="flex flex-col items-center text-center px-6 py-4">
        <div className="max-w-[1700px] w-full">
          <h1 className="text-[12vw] md:text-[6vw] lg:text-[4.5vw] bg-gradient-to-r from-[#D64545] to-[#D64545] bg-clip-text text-transparent leading-tight" style={{ fontFamily: "'Francker Cyrillic Condensed Semibold', sans-serif" }}>
            ABOUT SYMBOL ADVERTISING
          </h1>
        </div>
      </div>

      {/* Alternating Layout Container - 3 sections */}
      <div className="relative w-full max-w-[1400px] mx-auto min-h-[200vh]">

        {/* 3D Star - Sticky and animated */}
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-10">
          <Cube rotation={smoothRotation} xPos={smoothX} yPos={yPosition} />
        </div>

        {/* Content Sections */}
        <div className="relative z-0" style={{ marginTop: '-100vh' }}>

          {/* Section 1: Who We Are (Left side) - 3D on Right */}
          <div className="flex min-h-[40vh] lg:min-h-[70vh]">
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8">
              <WhoWeAre />
            </div>
            <div className="hidden lg:block w-1/2" />
          </div>

          {/* Section 2: Vision (Right side) - 3D on Left */}
          <div className="flex min-h-[40vh] lg:min-h-[65vh]">
            <div className="hidden lg:block w-1/2" />
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8">
              <Scroll />
            </div>
          </div>

          {/* Section 3: Mission (Left side) - 3D on Right */}
          <div className="flex min-h-[40vh] lg:min-h-[65vh]">
            <div className="w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8">
              <TextScroll />
            </div>
            <div className="hidden lg:block w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};
