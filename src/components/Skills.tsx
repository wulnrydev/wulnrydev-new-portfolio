"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import styles from "./Skills.module.css";

interface Skill {
  name: string;
  slug?: string;
  hex: string;
  custom?: "rest" | "spigot";
  localImg?: string;
}

const SKILLS: Skill[] = [
  { name: "TypeScript",   slug: "typescript",  hex: "3178C6", localImg: "/images/typescript.svg" },
  { name: "JavaScript",   slug: "javascript",  hex: "F7DF1E" },
  { name: "Java",         slug: "java",        hex: "ED8B00", localImg: "/images/java.svg" },
  { name: "React",        slug: "react",       hex: "61DAFB" },
  { name: "Next.js",      slug: "nextdotjs",   hex: "FFFFFF", localImg: "/images/nextjs.svg" },
  { name: "Node.js",      slug: "nodedotjs",   hex: "5FA04E", localImg: "/images/node-js.svg" },
  { name: "PostgreSQL",   slug: "postgresql",  hex: "4169E1", localImg: "/images/postgresql.svg" },
  { name: "MongoDB",      slug: "mongodb",     hex: "47A248", localImg: "/images/mongodb.svg" },
  { name: "Tailwind",     slug: "tailwindcss", hex: "06B6D4" },
  { name: "Git",          slug: "git",         hex: "F05032" },
  { name: "Vercel",       slug: "vercel",      hex: "FFFFFF" },
  { name: "Vite",         slug: "vite",        hex: "646CFF" },
  { name: "HTML",         slug: "html5",       hex: "E34F26", localImg: "/images/html5.svg" },
  { name: "CSS",          slug: "css3",        hex: "1572B6", localImg: "/images/css.svg" },
  { name: "Express",      slug: "express",     hex: "FFFFFF", localImg: "/images/express.svg" },
  { name: "PHP",          slug: "php",         hex: "777BB4" },
  { name: "MySQL",        slug: "mysql",       hex: "4479A1", localImg: "/images/mysql.svg" },
  { name: "Redis",        slug: "redis",       hex: "DC382D", localImg: "/images/redis.svg" },
  { name: "discord.js",   slug: "discord",     hex: "5865F2" },
  { name: "Spigot/Paper", hex: "4ADE80", custom: "spigot", localImg: "/images/minecraft.svg" },
];

function RestIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="7" width="20" height="10" rx="2.5" stroke="#fff" strokeWidth="1.5"/>
      <path d="M7 12h10M13 9.5l2.5 2.5L13 14.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function SpigotIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="10" width="18" height="11" rx="2" fill="#4ADE80" opacity="0.6"/>
      <rect x="3" y="7" width="18" height="4" rx="1.5" fill="#4ADE80"/>
      <path d="M5 7Q7 4 9 7Q11 4 13 7Q15 4 17 7Q19 4 21 7" stroke="#4ADE80" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
    </svg>
  );
}

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.card} ${visible ? styles.visible : ""}`}
      style={{ animationDelay: `${index * 0.04}s` }}
      id={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
    >
      <div className={styles.iconBox}>
        {skill.localImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={skill.localImg}
            alt={skill.name}
            width={32}
            height={32}
            loading="lazy"
            className={styles.icon}
          />
        ) : skill.custom === "rest" ? (
          <RestIcon />
        ) : skill.custom === "spigot" ? (
          <SpigotIcon />
        ) : skill.slug ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`https://cdn.simpleicons.org/${skill.slug}/${skill.hex}`}
            alt={skill.name}
            width={32}
            height={32}
            loading="lazy"
            className={styles.icon}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
          />
        ) : null}
      </div>
      <span className={styles.label}>{skill.name}</span>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>

      {/* Divider line */}
      <Reveal width="100%">
        <div className={styles.dividerRow}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>Skills</span>
          <span className={styles.dividerLine} />
        </div>
      </Reveal>

      <div className={styles.header}>
        <Reveal delay={150} width="100%">
          <h2 className={styles.title}>Skills</h2>
        </Reveal>
        <Reveal delay={300} width="100%">
          <p className={styles.sub}>Technologies I work with</p>
        </Reveal>
      </div>

      <div className={styles.grid}>
        {SKILLS.map((s, i) => (
          <SkillCard key={s.name} skill={s} index={i} />
        ))}
      </div>
    </section>
  );
}
