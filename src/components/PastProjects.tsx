"use client";
import Image from "next/image";
import Reveal from "./Reveal";
import styles from "./PastProjects.module.css";
import { useLang } from "@/context/LanguageContext";

export default function PastProjects() {
  const { t } = useLang();
  const pp = t.pastProjects;

  const projects = [
    {
      name: "Celestial Network",
      image: "/celestial.png",
      role: pp.celestialRole,
      server: "Celestial Network",
      status: pp.statusValue,
    },
    {
      name: "Marimoss",
      image: "/marimoss.png",
      role: pp.marimossRole,
      server: "Marimoss Network",
      status: pp.statusValue,
    },
  ];

  return (
    <section id="past-projects" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <Reveal width="100%">
            <div className={styles.badge}>
              <span className={styles.badgeDot} />
              {pp.badge}
            </div>
          </Reveal>
          <Reveal width="100%" delay={100}>
            <h2 className={styles.title}>{pp.title}</h2>
          </Reveal>
          <Reveal width="100%" delay={200}>
            <p className={styles.sub}>{pp.sub}</p>
          </Reveal>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <Reveal key={project.name} width="100%" delay={260 + index * 90}>
              <div className={styles.cardWrapper}>
                {/* Animated gradient border */}
                <div className={styles.gradientBorder} />

                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.logoBox}>
                      <Image
                        src={project.image}
                        alt={`${project.name} Logo`}
                        width={56}
                        height={56}
                        className={styles.logo}
                      />
                    </div>
                    <div className={styles.titleBox}>
                      <div className={styles.nameRow}>
                        <h3 className={styles.projectTitle}>{project.name}</h3>
                        <span className={styles.statusBadge}>
                          <span className={styles.statusDot} />
                          {project.status}
                        </span>
                      </div>
                      <span className={styles.projectRole}>{project.role}</span>
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>{pp.serverLabel}</span>
                      <span className={styles.metaValue}>{project.server}</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span className={styles.metaLabel}>{pp.roleLabel}</span>
                      <span className={styles.metaValue}>{project.role}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
