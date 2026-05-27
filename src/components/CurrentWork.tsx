"use client";
import { useState } from "react";
import Image from "next/image";
import styles from "./CurrentWork.module.css";
import ThreeSceneSecondary from "./ThreeSceneSecondary";

export default function CurrentWork() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("play.marimoss.net");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="current-work" className={styles.section}>
      <div className={styles.inner}>
        
        {/* ── LEFT: 3D Animation ── */}
        <div className={styles.leftCol}>
          <ThreeSceneSecondary />
        </div>

        {/* ── RIGHT: Content ── */}
        <div className={styles.rightCol}>
          <div className={styles.header}>
            <h2 className={styles.title}>Current Work</h2>
            <p className={styles.sub}>What I&apos;m building right now</p>
          </div>

          <div className={styles.cardWrapper}>
            {/* Animated gradient border */}
            <div className={styles.gradientBorder} />
            
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <div className={styles.logoBox}>
                  <Image
                    src="/marimoss.png"
                    alt="Marimoss Logo"
                    width={64}
                    height={64}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.titleBox}>
                  <h3 className={styles.projectTitle}>Marimoss</h3>
                  <span className={styles.projectType}>Lead Developer & Co-Owner</span>
                </div>
              </div>

              <p className={styles.desc}>
                A modern, actively developed premium Minecraft network featuring highly customized 
                game modes including <strong>SkyBlock</strong>, <strong>Survival</strong>, <strong>BoxPvP</strong>, and <strong>Towny</strong>.
              </p>

              <div className={styles.actions}>
                <a 
                  href="https://www.marimoss.net" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.btnPrimary}
                >
                  Visit Website
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
                
                <button 
                  onClick={handleCopy}
                  className={styles.btnCopy}
                  aria-label="Copy IP address"
                >
                  {copied ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      play.marimoss.net
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
