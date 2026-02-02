import React, { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform, useSpring, motion } from 'framer-motion';
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
  const rotation = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, 6]);
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
  const yDesktopValues = [4, 4, 0, 0, -10];
  // Mobile Y values (Three.js coords: +Y is Up, -Y is Down):
  // Start from top and slowly move down
  const yMobileValues = [6, 2, -4, -10, -14];

  const yPosition = useTransform(
    scrollYProgress,
    [0, 0.3, 0.5, 0.7, 1],
    isMobile ? yMobileValues : yDesktopValues
  );

  // Add spring smoothing to Y position for fluid movement
  const smoothY = useSpring(yPosition, { damping: 40, stiffness: 100 });

  return (
    <div ref={containerRef} className="relative bg-dark-charcoal">
      {/* Title Section - Reduced padding */}
      <div className="flex flex-col items-center text-center px-6 pt-12 pb-4">
        <div className="max-w-[1700px] w-full">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-[12vw] md:text-[6vw] lg:text-[4.5vw] font-sans font-bold leading-tight text-white mb-4"
          >
            About <span className="text-[#D64545]">Symbol</span>
          </motion.h1>
        </div>
      </div>

      {/* Alternating Layout Container - 3 sections */}
      <div
        className="relative w-full max-w-[1400px] mx-auto"
        style={{ minHeight: isMobile ? '900px' : '200vh' }}
      >

        {/* 3D Star - Sticky and animated - Behind content on mobile */}
        <div
          className={`${isMobile ? 'absolute' : 'sticky'} ${isMobile ? 'top-[10%] left-0 right-0' : 'top-0'} ${isMobile ? 'h-[90vh]' : 'h-screen'} flex items-center justify-center pointer-events-none ${isMobile ? 'z-0' : 'z-10'}`}
          style={isMobile ? { filter: 'blur(8px)' } : {}}
        >
          <Cube rotation={smoothRotation} xPos={smoothX} yPos={smoothY} />
        </div>

        {/* Content Sections */}
        <div className={`relative ${isMobile ? 'z-10' : 'z-0'}`} style={{ marginTop: isMobile ? '0' : '-100vh' }}>

          {/* Section 1: Who We Are (Left side) - 3D on Right */}
          <div className={`flex ${isMobile ? 'min-h-auto' : 'min-h-[40vh] lg:min-h-[70vh]'}`}>
            <div className={`w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8 ${isMobile ? 'backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl mx-2 my-2' : ''
              }`}>
              <WhoWeAre />
            </div>
            <div className="hidden lg:block w-1/2" />
          </div>

          {/* Section 2: Vision (Right side) - 3D on Left */}
          <div className={`flex ${isMobile ? 'min-h-auto' : 'min-h-[40vh] lg:min-h-[65vh]'}`}>
            <div className="hidden lg:block w-1/2" />
            <div className={`w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8 ${isMobile ? 'backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl mx-2 my-2' : ''
              }`}>
              <Scroll />
            </div>
          </div>

          {/* Section 3: Mission (Left side) - 3D on Right */}
          <div className={`flex ${isMobile ? 'min-h-auto' : 'min-h-[30vh] lg:min-h-[65vh]'}`}>
            <div className={`w-full lg:w-1/2 flex items-center justify-center px-4 lg:px-8 ${isMobile ? 'backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl mx-2 my-2' : ''
              }`}>
              <TextScroll />
            </div>
            <div className="hidden lg:block w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};
