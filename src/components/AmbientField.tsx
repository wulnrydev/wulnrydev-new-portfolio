"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import styles from "./AmbientField.module.css";

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
}

/** Evenly distributed points on a unit sphere (fibonacci lattice). */
function buildSphere(count: number): Particle[] {
  const points: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / Math.max(count - 1, 1)) * 2;
    const radius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * 2.399963229728653;
    points.push({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius,
      size: 0.65 + Math.random() * 0.85,
    });
  }
  return points;
}

/** A thin orbit ring drawn as points, tilted around the X axis. */
function buildRing(count: number, radius: number): Particle[] {
  const points: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const theta = (i / count) * Math.PI * 2;
    points.push({
      x: Math.cos(theta) * radius,
      y: 0,
      z: Math.sin(theta) * radius,
      size: 0.5 + Math.random() * 0.5,
    });
  }
  return points;
}

/**
 * Very light, dependency-free 3D point-field used to fill empty page space.
 * Draws a slowly rotating perspective sphere with two orbit rings.
 */
export default function AmbientField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const sphere = buildSphere(230);
    const rings = [buildRing(84, 1.45), buildRing(64, 1.78)];

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      if (!width || !height) return;

      const cx = width / 2;
      const cy = height / 2;
      const base = Math.min(width, height) * 0.34;
      const fov = 2.7;
      const spin = time * 0.00013;
      const tilt = 0.42 + Math.sin(time * 0.00007) * 0.07;
      const cosSpin = Math.cos(spin);
      const sinSpin = Math.sin(spin);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);

      const project = (p: Particle) => {
        const x1 = p.x * cosSpin - p.z * sinSpin;
        const z1 = p.x * sinSpin + p.z * cosSpin;
        const y2 = p.y * cosTilt - z1 * sinTilt;
        const z2 = p.y * sinTilt + z1 * cosTilt;
        const perspective = fov / (fov + z2 * 0.85);
        return {
          x: cx + x1 * base * perspective,
          y: cy + y2 * base * perspective,
          depth: perspective,
          size: p.size,
        };
      };

      const paint = (points: Particle[], maxAlpha: number) => {
        for (const point of points) {
          const { x, y, depth, size } = project(point);
          const alpha = Math.min(1, Math.max(0, (depth - 0.62) * 1.9)) * maxAlpha;
          if (alpha <= 0.01) continue;
          ctx.beginPath();
          ctx.fillStyle = `rgba(226, 219, 255, ${alpha.toFixed(3)})`;
          ctx.arc(x, y, size * 1.25 * depth, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      paint(rings[0], 0.34);
      paint(rings[1], 0.22);
      paint(sphere, 0.62);
    };

    const loop = (time: number) => {
      if (visible) draw(time);
      frame = requestAnimationFrame(loop);
    };

    resize();

    if (reduceMotion) {
      draw(0);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "120px" }
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduceMotion]);

  return (
    <div ref={wrapRef} className={styles.field} aria-hidden="true">
      <div className={styles.glow} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
