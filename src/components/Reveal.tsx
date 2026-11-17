"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.css";

interface RevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

/* One observer for the whole page: cheaper than one per section element. */
let sharedObserver: IntersectionObserver | null = null;
const onReveal = new WeakMap<Element, () => void>();

function observe(el: Element, callback: () => void) {
  if (typeof IntersectionObserver === "undefined") {
    callback();
    return () => {};
  }

  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          onReveal.get(entry.target)?.();
          onReveal.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -60px 0px" }
    );
  }

  onReveal.set(el, callback);
  sharedObserver.observe(el);

  return () => {
    onReveal.delete(el);
    sharedObserver?.unobserve(el);
  };
}

export default function Reveal({
  children,
  width = "fit-content",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return observe(el, () => setShown(true));
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.root} ${styles[direction]} ${shown ? styles.shown : ""}`}
      style={{ width, transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
