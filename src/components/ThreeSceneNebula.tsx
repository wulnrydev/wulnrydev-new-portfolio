"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Nebula Cloud — Swirling galaxy-like particle field.
 * Placed between GitHub and FAQ sections.
 */
export default function ThreeSceneNebula() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 2, 6);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // === GALAXY SPIRAL PARTICLES ===
    const galaxyCount = 3000;
    const galaxyPositions = new Float32Array(galaxyCount * 3);
    const galaxyColors = new Float32Array(galaxyCount * 3);

    const innerColor = new THREE.Color(0x22d3ee);
    const midColor = new THREE.Color(0xa855f7);
    const outerColor = new THREE.Color(0xf472b6);

    const arms = 3;

    for (let i = 0; i < galaxyCount; i++) {
      const radius = Math.random() * 4;
      const armAngle = ((i % arms) / arms) * Math.PI * 2;
      const spinAngle = radius * 1.5;
      const randomOffset = Math.pow(Math.random(), 3) * 0.5;

      const x =
        Math.cos(armAngle + spinAngle) * radius +
        (Math.random() - 0.5) * randomOffset * 2;
      const y = (Math.random() - 0.5) * 0.3 * (1 - radius / 4);
      const z =
        Math.sin(armAngle + spinAngle) * radius +
        (Math.random() - 0.5) * randomOffset * 2;

      galaxyPositions[i * 3] = x;
      galaxyPositions[i * 3 + 1] = y;
      galaxyPositions[i * 3 + 2] = z;

      // Color based on distance from center
      const mixRatio = radius / 4;
      let c: THREE.Color;
      if (mixRatio < 0.5) {
        c = innerColor.clone().lerp(midColor, mixRatio * 2);
      } else {
        c = midColor.clone().lerp(outerColor, (mixRatio - 0.5) * 2);
      }
      galaxyColors[i * 3] = c.r;
      galaxyColors[i * 3 + 1] = c.g;
      galaxyColors[i * 3 + 2] = c.b;
    }

    const galaxyGeometry = new THREE.BufferGeometry();
    galaxyGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(galaxyPositions, 3)
    );
    galaxyGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(galaxyColors, 3)
    );

    const galaxyMaterial = new THREE.PointsMaterial({
      size: 0.025,
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
    });
    const galaxy = new THREE.Points(galaxyGeometry, galaxyMaterial);
    scene.add(galaxy);

    // === CENTER GLOW (bright core) ===
    const coreCount = 80;
    const corePositions = new Float32Array(coreCount * 3);
    for (let i = 0; i < coreCount; i++) {
      const r = Math.random() * 0.3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      corePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      corePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      corePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const coreGeometry = new THREE.BufferGeometry();
    coreGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(corePositions, 3)
    );
    const coreMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });
    const core = new THREE.Points(coreGeometry, coreMaterial);
    scene.add(core);

    // === ANIMATION ===
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.003;

      galaxy.rotation.y += 0.001;

      // Pulse core
      const pulse = 1 + Math.sin(time * 3) * 0.1;
      core.scale.setScalar(pulse);
      core.rotation.y += 0.005;

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
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      galaxyGeometry.dispose();
      galaxyMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
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
          "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)",
      }}
    />
  );
}
