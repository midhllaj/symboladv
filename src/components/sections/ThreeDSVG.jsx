import React, { useRef, useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import * as THREE from 'three';
import { Center, Environment } from '@react-three/drei';
import { motion as motion3d } from 'framer-motion-3d';
import { useScroll, useTransform, useSpring } from 'framer-motion';

const RotatingGroup = ({ rotation }) => {
    const svgData = useLoader(SVGLoader, '/assets/symbol.svg');

    // Generate geometry once
    const meshes = useMemo(() => {
        return svgData.paths.flatMap((path, i) => {
            const shapes = SVGLoader.createShapes(path);
            const color = path.userData.style.fill;

            if (!color || color === 'none') return [];

            return shapes.map((shape, j) => (
                <mesh key={`${i}-${j}`}>
                    {/* Extrusion depth 10 for chunky look */}
                    <extrudeGeometry args={[shape, { depth: 10, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 3 }]} />
                    <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.4} metalness={0.2} />
                </mesh>
            ));
        });
    }, [svgData]);

    return (
        <Center>
            <motion3d.group rotation-y={rotation}>
                {/* 
                 SVGs usually have (0,0) at top-left.
                 Flip Y to match standard coordinates.
               */}
                <group scale={[0.05, -0.05, 0.05]}>
                    {meshes}
                </group>
            </motion3d.group>
        </Center>
    );
};

const ThreeDSVG = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end']
    });

    // Map scroll progress (0 to 1) to rotation (0 to 5 radians approx 286 degrees, or custom)
    // User asked to use logic from file: [0, 1], [0, 5]
    const progress = useTransform(scrollYProgress, [0, 1], [0, 5]);
    const smoothProgress = useSpring(progress, { damping: 20 });

    return (
        <section ref={containerRef} className="relative h-[100vh] bg-white overflow-hidden">
            <div className="relative top-0 h-full w-full flex justify-center items-center">
                <Canvas camera={{ position: [0, 0, 50], fov: 45 }}>
                    <ambientLight intensity={1} />
                    <directionalLight position={[10, 10, 10]} intensity={2} />
                    <directionalLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
                    <Environment preset="studio" />
                    <RotatingGroup rotation={smoothProgress} />
                </Canvas>
            </div>
        </section>
    );
};

export default ThreeDSVG;
