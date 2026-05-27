"use client";
import { useEffect, useState } from "react";
import styles from "./Loader.module.css";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    // Start fade out after 1.2s
    const fadeTimer = setTimeout(() => {
      setFading(true);
      document.body.style.overflow = "";
    }, 1200);

    // Remove from DOM after 1.8s
    const removeTimer = setTimeout(() => {
      setLoading(false);
    }, 1800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!loading) return null;

  return (
    <div className={`${styles.loaderWrapper} ${fading ? styles.fadeOut : ""}`}>
      <div className={styles.loaderContent}>
        <div className={styles.logo}>
          <span className={styles.logoW}>w</span>
          <span className={styles.logoRest}>ulnrydev</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} />
        </div>
      </div>
    </div>
  );
}
