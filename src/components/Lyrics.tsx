"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Lyrics.module.css";
import type { LyricLine } from "@/data/track";

interface LyricsProps {
  lines: LyricLine[];
  activeIndex: number;
  /** Lines stay fully transparent until the song is started. */
  visible?: boolean;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export default function Lyrics({ lines, activeIndex, visible = true }: LyricsProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const reduceMotion = usePrefersReducedMotion();

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
    <div
      className={`${styles.panel} ${visible ? styles.panelVisible : ""}`}
      aria-hidden={!visible}
    >
      <div className={styles.viewport} ref={viewportRef}>
        <div className={styles.track}>
          {lines.map((line, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;

            return (
              <p
                key={line.time}
                ref={(el) => {
                  lineRefs.current[index] = el;
                }}
                className={[
                  styles.line,
                  isActive ? styles.lineActive : isPast ? styles.linePast : "",
                  line.emphasis ? styles.emphasis : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-current={isActive ? "true" : undefined}
              >
                {line.text}
              </p>
            );
          })}
        </div>
      </div>
    </div>
  );
}
