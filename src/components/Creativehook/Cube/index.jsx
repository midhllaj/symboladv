'use client';
import React, { useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import { OrbitControls, Center, Environment, Line } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

export default function CubeComponent({ rotation, xPos, yPos, className }) {
    return (
        <div className={className || "w-full h-full lg:w-[1400px] lg:h-[600px]"}>
            <Canvas camera={{ position: [0, 0, 50], fov: 45 }}>
                <OrbitControls enableZoom={false} enablePan={false} />

                {/* Cinematic Lighting Setup - 3 Point Lighting + Environment */}
                <ambientLight intensity={0.5} />
                <Environment preset="city" />

                {/* Key Light - Warm White (Main illumination) */}
                <spotLight position={[20, 20, 20]} angle={0.25} penumbra={1} intensity={800} color="#fff0dd" castShadow />

                {/* Fill Light - Cool White (Softens shadows) */}
                <pointLight position={[-20, 0, 20]} intensity={200} color="#d6e6ff" distance={50} decay={2} />

                {/* Rim Light - Pure White (Separation from background) */}
                <spotLight position={[0, 10, -20]} angle={0.5} penumbra={1} intensity={1000} color="#ffffff" />

                {/* Visible Motion Path - Linear Zigzag */}
                {/* Path removed as requested */}

                <Symbol rotation={rotation} xPos={xPos} yPos={yPos} />
            </Canvas>
        </div>
    );
}

function Symbol({ rotation, xPos, yPos }) {
    const svgData = useLoader(SVGLoader, '/assets/symbol.svg');

    const meshes = useMemo(() => {
        return svgData.paths.flatMap((path, i) => {
            const shapes = SVGLoader.createShapes(path);
            const color = path.userData.style.fill;

            if (!color || color === 'none') return [];

            return shapes.map((shape, j) => (
                <mesh key={`${i}-${j}`}>
                    <extrudeGeometry args={[shape, { depth: 10, bevelEnabled: true, bevelThickness: 1, bevelSize: 1, bevelSegments: 3 }]} />
                    <meshStandardMaterial
                        color={color}
                        side={THREE.DoubleSide}
                        roughness={0.2}
                        metalness={0.6}
                    />
                </mesh>
            ));
        });
    }, [svgData]);

    return (
        <motion.group
            rotation-x={rotation}
            position-y={yPos}
            position-x={xPos}
        >
            <Center>
                {/* Increased scale for larger star */}
                <group scale={[0.035, -0.035, 0.035]}>
                    {meshes}
                </group>
            </Center>
        </motion.group>
    );
}
