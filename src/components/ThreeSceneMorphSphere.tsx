"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Morphing Sphere — A wireframe sphere that morphs with noise-like
 * vertex displacement + floating particles orbiting around it.
 * Placed between Skills and Portfolio sections.
 */
export default function ThreeSceneMorphSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // === MORPHING SPHERE ===
    const sphereGeometry = new THREE.IcosahedronGeometry(1.5, 5);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    // Store original vertex positions for morphing
    const originalPositions = new Float32Array(
      sphereGeometry.attributes.position.array.length
    );
    originalPositions.set(sphereGeometry.attributes.position.array);

    // === ORBITING RING PARTICLES ===
    const ringCount = 120;
    const ringPositions = new Float32Array(ringCount * 3);
    const ringGeometry = new THREE.BufferGeometry();

    for (let i = 0; i < ringCount; i++) {
      const angle = (i / ringCount) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.3;
      ringPositions[i * 3] = Math.cos(angle) * radius;
      ringPositions[i * 3 + 1] = (Math.random() - 0.5) * 0.4;
      ringPositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    ringGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(ringPositions, 3)
    );

    const ringMaterial = new THREE.PointsMaterial({
      color: 0xa855f7,
      size: 0.025,
      transparent: true,
      opacity: 0.5,
    });
    const ringParticles = new THREE.Points(ringGeometry, ringMaterial);
    scene.add(ringParticles);

    // === AMBIENT FLOATING PARTICLES ===
    const ambientCount = 200;
    const ambientPositions = new Float32Array(ambientCount * 3);
    const ambientColors = new Float32Array(ambientCount * 3);
    const c1 = new THREE.Color(0x22d3ee);
    const c2 = new THREE.Color(0xa855f7);

    for (let i = 0; i < ambientCount; i++) {
      ambientPositions[i * 3] = (Math.random() - 0.5) * 10;
      ambientPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      ambientPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
      const mix = Math.random();
      const c = c1.clone().lerp(c2, mix);
      ambientColors[i * 3] = c.r;
      ambientColors[i * 3 + 1] = c.g;
      ambientColors[i * 3 + 2] = c.b;
    }

    const ambientGeometry = new THREE.BufferGeometry();
    ambientGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(ambientPositions, 3)
    );
    ambientGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(ambientColors, 3)
    );

    const ambientMaterial = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
    });
    const ambientParticles = new THREE.Points(ambientGeometry, ambientMaterial);
    scene.add(ambientParticles);

    // === ANIMATION ===
    let animationFrameId: number;
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.008;

      // Morph sphere vertices with noise-like displacement
      const posAttr = sphereGeometry.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len;
        const ny = oy / len;
        const nz = oz / len;

        // Multi-frequency displacement for organic feel
        const displacement =
          Math.sin(nx * 3 + time * 1.5) * 0.08 +
          Math.sin(ny * 4 + time * 1.2) * 0.06 +
          Math.sin(nz * 2.5 + time * 1.8) * 0.07;

        const scale = 1 + displacement;
        posAttr.setXYZ(i, ox * scale, oy * scale, oz * scale);
      }
      posAttr.needsUpdate = true;

      // Rotate sphere
      sphere.rotation.y += 0.002;
      sphere.rotation.x += 0.001;

      // Mouse interaction on sphere
      sphere.position.x += (mouseX * 0.3 - sphere.position.x) * 0.03;
      sphere.position.y += (-mouseY * 0.2 - sphere.position.y) * 0.03;

      // Rotate ring particles
      ringParticles.rotation.y += 0.003;
      ringParticles.rotation.x = Math.sin(time * 0.5) * 0.15;
      ringParticles.position.x = sphere.position.x;
      ringParticles.position.y = sphere.position.y;

      // Slowly drift ambient particles
      const ap = ambientParticles.geometry.attributes.position
        .array as Float32Array;
      for (let i = 0; i < ambientCount; i++) {
        ap[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.001;
      }
      ambientParticles.geometry.attributes.position.needsUpdate = true;
      ambientParticles.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect =
        containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ambientGeometry.dispose();
      ambientMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        maskImage:
          "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
      }}
    />
  );
}
