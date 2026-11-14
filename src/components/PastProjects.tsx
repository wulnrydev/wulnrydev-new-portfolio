"use client";
import Image from "next/image";
import styles from "./PastProjects.module.css";
import ThreeSceneSecondary from "./ThreeSceneSecondary";
import { useLang } from "@/context/LanguageContext";

export default function PastProjects() {
  const { t } = useLang();
  const pp = t.pastProjects;

  return (
    <section id="past-projects" className={styles.section}>
      <div className={styles.inner}>

        {/* ── LEFT: 3D Animation ── */}
        <div className={styles.leftCol}>
          <ThreeSceneSecondary />
        </div>

        {/* ── RIGHT: Content ── */}
        <div className={styles.rightCol}>
          <div className={styles.header}>
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              {pp.badge}
            </div>
            <h2 className={styles.title}>{pp.title}</h2>
            <p className={styles.sub}>{pp.sub}</p>
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
                    width={56}
                    height={56}
                    className={styles.logo}
                  />
                </div>
                <div className={styles.titleBox}>
                  <div className={styles.nameRow}>
                    <h3 className={styles.projectTitle}>Marimoss</h3>
                    <span className={styles.statusBadge}>
                      <span className={styles.statusDot} />
                      {pp.statusValue}
                    </span>
                  </div>
                  <span className={styles.projectRole}>{pp.marimossRole}</span>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{pp.serverLabel}</span>
                  <span className={styles.metaValue}>Marimoss Network</span>
                </div>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>{pp.roleLabel}</span>
                  <span className={styles.metaValue}>{pp.marimossRole}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
