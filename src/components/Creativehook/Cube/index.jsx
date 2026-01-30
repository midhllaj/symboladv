'use client';
import React, { useMemo } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { SVGLoader } from 'three-stdlib';
import { OrbitControls, Center, Environment, Line } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import * as THREE from 'three';

export default function CubeComponent({ rotation, xPos, yPos, className }) {
    return (
        <div className={className || "w-[400px] h-[400px] lg:w-[1400px] lg:h-[600px]"}>
            <Canvas camera={{ position: [0, 0, 50], fov: 45 }}>
                <OrbitControls enableZoom={false} enablePan={false} />
                <ambientLight intensity={0.5} color="#ffd700" />
                <directionalLight position={[10, 10, 10]} intensity={2} color="#ffd700" />
                <directionalLight position={[-10, -10, -10]} intensity={1} color="#ffaa00" />
                <Environment preset="studio" />

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
                    <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.4} metalness={0.8} />
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
