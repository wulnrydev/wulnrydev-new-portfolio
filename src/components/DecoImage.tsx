"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./DecoImage.module.css";

/**
 * Lightweight decorative image: fades and rises into place once, when it
 * enters the viewport. No continuous animation unless `float` is requested.
 */
export default function DecoImage({
  src,
  className = "",
  float = false,
}: {
  src: string;
  className?: string;
  float?: boolean;
}) {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -40px 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={wrapRef}
      className={`${styles.wrap} ${className} ${shown ? styles.shown : ""}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading="lazy"
        decoding="async"
        className={`${styles.img} ${float ? styles.float : ""}`}
      />
    </span>
  );
}
