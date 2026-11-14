"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * DNA Helix — Double helix particles with flowing color gradient.
 * Placed between Hero and Skills sections.
 */
export default function ThreeSceneDNA() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // === DOUBLE HELIX PARTICLES ===
    const helixPoints = 300;
    const helixPositions = new Float32Array(helixPoints * 3 * 2); // 2 strands
    const helixColors = new Float32Array(helixPoints * 3 * 2);
    const helixGeometry = new THREE.BufferGeometry();

    const color1 = new THREE.Color(0x22d3ee); // Cyan
    const color2 = new THREE.Color(0x8b5cf6); // Violet
    const color3 = new THREE.Color(0xf472b6); // Pink

    helixGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(helixPositions, 3)
    );
    helixGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(helixColors, 3)
    );

    const helixMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
    });
    const helixParticles = new THREE.Points(helixGeometry, helixMaterial);
    scene.add(helixParticles);

    // === CONNECTION LINES (rungs between strands) ===
    const rungCount = 30;
    const rungPositions = new Float32Array(rungCount * 2 * 3);
    const rungGeometry = new THREE.BufferGeometry();
    rungGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(rungPositions, 3)
    );

    const rungMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.04,
    });
    const rungLines = new THREE.LineSegments(rungGeometry, rungMaterial);
    scene.add(rungLines);

    // === AMBIENT DUST ===
    const dustCount = 150;
    const dustPositions = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPositions[i * 3] = (Math.random() - 0.5) * 14;
      dustPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      dustPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3)
    );
    const dustMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.015,
      transparent: true,
      opacity: 0.2,
    });
    const dustParticles = new THREE.Points(dustGeometry, dustMaterial);
    scene.add(dustParticles);

    // === ANIMATION ===
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.006;

      const helixPos = helixParticles.geometry.attributes.position
        .array as Float32Array;
      const helixCol = helixParticles.geometry.attributes.color
        .array as Float32Array;

      const radius = 1.2;
      const spacing = 0.04;

      for (let i = 0; i < helixPoints; i++) {
        const t = i * spacing + time * 2;
        const y = (i - helixPoints / 2) * spacing * 0.8;

        // Strand 1
        const x1 = Math.cos(t) * radius;
        const z1 = Math.sin(t) * radius;
        helixPos[i * 3] = x1;
        helixPos[i * 3 + 1] = y;
        helixPos[i * 3 + 2] = z1;

        // Strand 2 (offset by PI)
        const x2 = Math.cos(t + Math.PI) * radius;
        const z2 = Math.sin(t + Math.PI) * radius;
        helixPos[(helixPoints + i) * 3] = x2;
        helixPos[(helixPoints + i) * 3 + 1] = y;
        helixPos[(helixPoints + i) * 3 + 2] = z2;

        // Color gradient along helix
        const colorMix = (i / helixPoints);
        let c: THREE.Color;
        if (colorMix < 0.5) {
          c = color1.clone().lerp(color2, colorMix * 2);
        } else {
          c = color2.clone().lerp(color3, (colorMix - 0.5) * 2);
        }

        helixCol[i * 3] = c.r;
        helixCol[i * 3 + 1] = c.g;
        helixCol[i * 3 + 2] = c.b;
        helixCol[(helixPoints + i) * 3] = c.r;
        helixCol[(helixPoints + i) * 3 + 1] = c.g;
        helixCol[(helixPoints + i) * 3 + 2] = c.b;
      }

      helixParticles.geometry.attributes.position.needsUpdate = true;
      helixParticles.geometry.attributes.color.needsUpdate = true;

      // Update rungs
      const rPos = rungLines.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < rungCount; i++) {
        const idx = Math.floor((i / rungCount) * helixPoints);
        const t = idx * spacing + time * 2;
        const y = (idx - helixPoints / 2) * spacing * 0.8;
        const x1 = Math.cos(t) * radius;
        const z1 = Math.sin(t) * radius;
        const x2 = Math.cos(t + Math.PI) * radius;
        const z2 = Math.sin(t + Math.PI) * radius;

        rPos[i * 6] = x1;
        rPos[i * 6 + 1] = y;
        rPos[i * 6 + 2] = z1;
        rPos[i * 6 + 3] = x2;
        rPos[i * 6 + 4] = y;
        rPos[i * 6 + 5] = z2;
      }
      rungLines.geometry.attributes.position.needsUpdate = true;

      // Rotate the whole helix
      helixParticles.rotation.y += 0.002;
      rungLines.rotation.y = helixParticles.rotation.y;

      // Dust drift
      dustParticles.rotation.y += 0.0003;

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
      helixGeometry.dispose();
      helixMaterial.dispose();
      rungGeometry.dispose();
      rungMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
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
