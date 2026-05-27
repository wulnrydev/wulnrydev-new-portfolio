"use client";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Icosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    // Slow continuous rotation
    meshRef.current.rotation.x += delta * 0.1;
    meshRef.current.rotation.y += delta * 0.15;

    // Scroll based rotation and scaling
    // Add a safe check for window to support SSR
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    
    // Map scroll to rotation
    meshRef.current.rotation.z = scrollY * 0.002;
    // Small scale effect as you scroll
    const targetScale = 1 + scrollY * 0.0005;
    meshRef.current.scale.setScalar(targetScale);

    // Mouse parallax
    const targetX = (state.pointer.x * 0.5);
    const targetY = (state.pointer.y * 0.5);
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[2, 1]} />
      <meshBasicMaterial color={0xffffff} wireframe transparent opacity={0.08} />
    </mesh>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  // Create random positions once
  const [positions] = useState(() => {
    const particlesCount = 800;
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 15;
    }
    return pos;
  });

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Mouse parallax
    const targetX = (state.pointer.x * 0.2);
    const targetY = (state.pointer.y * 0.2);
    pointsRef.current.rotation.y += (targetX - pointsRef.current.rotation.y) * 0.05;
    pointsRef.current.rotation.x += (targetY - pointsRef.current.rotation.x) * 0.05;

    // Scroll effect (particles move up relative to scroll to give parallax depth)
    const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    pointsRef.current.position.y = scrollY * 0.003;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial size={0.015} color={0xffffff} transparent opacity={0.3} />
    </points>
  );
}

export default function ThreeScene() {
  return (
    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }} gl={{ antialias: true, alpha: true }}>
        <Icosahedron />
        <Particles />
      </Canvas>
    </div>
  );
}
