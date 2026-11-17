"use client";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./Lyrics.module.css";
import type { LyricLine } from "@/data/track";

interface LyricsProps {
  lines: LyricLine[];
  activeIndex: number;
  /** Lines stay fully transparent until the song is started. */
  visible?: boolean;
}

const SOFT_EASE = [0.22, 1, 0.36, 1] as const;

export default function Lyrics({ lines, activeIndex, visible = true }: LyricsProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!visible) return;
    const viewport = viewportRef.current;
    const active = lineRefs.current[activeIndex];
    if (!viewport || !active) return;

    const viewportRect = viewport.getBoundingClientRect();
    const lineRect = active.getBoundingClientRect();
    const delta =
      lineRect.top - viewportRect.top - viewport.clientHeight / 2 + lineRect.height / 2;

    viewport.scrollTo({
      top: viewport.scrollTop + delta,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeIndex, reduceMotion, visible]);

  return (
    <motion.div
      className={styles.panel}
      initial={false}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: SOFT_EASE }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      aria-hidden={!visible}
    >
      <div className={styles.viewport} ref={viewportRef} aria-live="polite">
        <div className={styles.track}>
          {lines.map((line, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            const color = isActive
              ? line.emphasis
                ? "#d9ccff"
                : "#ffffff"
              : isPast
                ? "rgba(255, 255, 255, 0.42)"
                : "rgba(255, 255, 255, 0.46)";

            const state = reduceMotion
              ? { opacity: isActive ? 1 : isPast ? 0.3 : 0.4, scale: 1, y: 0, filter: "blur(0px)" }
              : isActive
                ? { opacity: 1, scale: 1.04, y: 0, filter: "blur(0px)" }
                : isPast
                  ? { opacity: 0.18, scale: 0.97, y: -10, filter: "blur(3px)" }
                  : { opacity: 0.34, scale: 0.985, y: 10, filter: "blur(1.6px)" };

            return (
              <motion.p
                key={line.time}
                ref={(el: HTMLParagraphElement | null) => {
                  lineRefs.current[index] = el;
                }}
                className={[
                  styles.line,
                  line.emphasis ? styles.emphasis : "",
                  isActive && line.emphasis ? styles.emphasisActive : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isActive ? "true" : undefined}
                initial={false}
                animate={{ ...state, color }}
                transition={{
                  default: { duration: reduceMotion ? 0 : 0.6, ease: SOFT_EASE },
                  scale: reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 170, damping: 24, mass: 0.7 },
                  filter: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
                }}
              >
                {line.text}
              </motion.p>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
