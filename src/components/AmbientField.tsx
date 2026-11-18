"use client";
import { useEffect, useRef } from "react";
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

/* Alpha is quantised into this many buckets so a frame needs only a handful
   of fills instead of one fillStyle change per particle. */
const BUCKETS = 12;

const PALETTE = Array.from({ length: BUCKETS }, (_, i) => {
  const alpha = (i + 0.5) / BUCKETS;
  return `rgba(226, 219, 255, ${alpha.toFixed(3)})`;
});

const MAX_FPS_INTERVAL = 1000 / 20;

/**
 * Very light, dependency-free 3D point-field used to fill empty page space.
 * Draws a slowly rotating perspective sphere with two orbit rings.
 */
export default function AmbientField() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduceMotion = motionQuery.matches;

    const compact = wrap.clientWidth < 640;
    const sphere = buildSphere(compact ? 80 : 140);
    const rings = [
      buildRing(compact ? 28 : 50, 1.45),
      buildRing(compact ? 22 : 38, 1.78),
    ];

    const count = sphere.length + rings[0].length + rings[1].length;

    /* Reused frame buffers — no per-frame allocations. */
    const px = new Float32Array(count);
    const py = new Float32Array(count);
    const pr = new Float32Array(count);
    const pa = new Float32Array(count);

    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;
    let lastDraw = 0;

    const resize = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time: number) => {
      if (!width || !height) return;

      ctx.clearRect(0, 0, width, height);

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

      let n = 0;
      const project = (points: Particle[], maxAlpha: number) => {
        for (const p of points) {
          const x1 = p.x * cosSpin - p.z * sinSpin;
          const z1 = p.x * sinSpin + p.z * cosSpin;
          const y2 = p.y * cosTilt - z1 * sinTilt;
          const z2 = p.y * sinTilt + z1 * cosTilt;
          const perspective = fov / (fov + z2 * 0.85);
          const alpha = Math.min(1, Math.max(0, (perspective - 0.62) * 1.9)) * maxAlpha;
          if (alpha <= 0.01) continue;
          px[n] = cx + x1 * base * perspective;
          py[n] = cy + y2 * base * perspective;
          pr[n] = p.size * 1.25 * perspective;
          pa[n] = alpha;
          n++;
        }
      };

      project(rings[0], 0.34);
      project(rings[1], 0.22);
      project(sphere, 0.62);

      for (let bucket = 0; bucket < BUCKETS; bucket++) {
        const lower = bucket / BUCKETS;
        const upper = (bucket + 1) / BUCKETS;
        let started = false;

        for (let i = 0; i < n; i++) {
          const alpha = pa[i];
          if (alpha <= lower || alpha > upper) continue;
          if (!started) {
            ctx.beginPath();
            started = true;
          }
          ctx.moveTo(px[i] + pr[i], py[i]);
          ctx.arc(px[i], py[i], pr[i], 0, Math.PI * 2);
        }

        if (started) {
          ctx.fillStyle = PALETTE[bucket];
          ctx.fill();
        }
      }
    };

    const loop = (time: number) => {
      frame = requestAnimationFrame(loop);
      if (!visible || reduceMotion || document.hidden) return;
      if (time - lastDraw < MAX_FPS_INTERVAL) return;
      lastDraw = time;
      draw(time);
    };

    resize();

    if (reduceMotion) {
      draw(0);
      frame = requestAnimationFrame(loop);
    } else {
      frame = requestAnimationFrame(loop);
    }

    const handleMotionChange = () => {
      reduceMotion = motionQuery.matches;
      if (reduceMotion) draw(0);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(wrap);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && reduceMotion) draw(0);
      },
      { rootMargin: "120px" }
    );
    io.observe(wrap);

    return () => {
      cancelAnimationFrame(frame);
      motionQuery.removeEventListener("change", handleMotionChange);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className={styles.field} aria-hidden="true">
      <div className={styles.glow} />
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
