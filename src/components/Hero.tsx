"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import styles from "./Hero.module.css";
import { useLanyard } from "@/hooks/useLanyard";
import { useLang } from "@/context/LanguageContext";

function useTypewriter(text: string, speed = 32, delay = 700) {
  const [idx, setIdx] = useState(0);
  const [active, setActive] = useState(false);

  useEffect(() => {
    setIdx(0);
    setActive(false);
    const t = setTimeout(() => setActive(true), delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  useEffect(() => {
    if (!active || idx >= text.length) return;
    const t = setTimeout(() => setIdx((i) => i + 1), speed);
    return () => clearTimeout(t);
  }, [active, idx, text, speed]);

  return { output: text.slice(0, idx), done: idx >= text.length };
}

function StatCounter({ end, prefix = "", suffix = "", delay = 0 }: {
  end: number; prefix?: string; suffix?: string; delay?: number;
}) {
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf: number;
    const startTime = performance.now() + delay;
    const duration = 1400;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) { raf = requestAnimationFrame(tick); return; }
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (p < 1) {
        setVal(Math.round(eased * end + Math.random() * (end * 0.3) * (1 - eased)));
        raf = requestAnimationFrame(tick);
      } else {
        setVal(end);
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [end, delay]);

  return (
    <span className={`${styles.statNum} ${done ? styles.statDone : styles.statCycle}`}>
      {prefix}{val}{suffix}
    </span>
  );
}

export default function Hero() {
  const { t } = useLang();
  const h = t.hero;
  const reduceMotion = useReducedMotion();

  const { output, done } = useTypewriter(h.typewriter);
  const lanyard = useLanyard();

  const discordUser = lanyard?.discord_user;
  const status = lanyard?.discord_status || "offline";
  const statusColors = {
    online: "#23a559",
    idle: "#f0b232",
    dnd: "#f23f43",
    offline: "#80848e",
  };

  const activity = lanyard?.activities?.find(a => a.type === 0 || a.type === 2);
  const spotify = lanyard?.spotify;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.07, delayChildren: 0.05 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section id="hero" className={styles.section}>
      <div className={styles.ambient} aria-hidden="true">
        <div className={styles.ambientGlow} />
        <div className={styles.ambientLine} />
      </div>

      <div className={styles.inner}>
        <motion.div
          className={styles.left}
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Online badge */}
          <motion.div className={styles.badge} id="hero-badge" variants={item}>
            <span className={styles.dot} />
            {h.badge}
          </motion.div>

          {/* Title */}
          <motion.div className={styles.titleBlock} variants={item}>
            <p className={styles.greeting}>{h.greeting}</p>
            <h1 className={styles.name}>wulnrydev</h1>
          </motion.div>

          {/* Typewriter description */}
          <motion.p className={styles.desc} aria-label={h.typewriter} variants={item}>
            {output}
            <span className={`${styles.cursor} ${done ? styles.cursorBlink : ""}`} aria-hidden="true">|</span>
          </motion.p>

          {/* Buttons */}
          <motion.div className={styles.btns} variants={item}>
            <a id="hero-contact-btn" href="mailto:em1rhqnzw@gmail.com" className={styles.btnPrimary}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              {h.getInTouch}
            </a>
            <a id="hero-github-btn" href="https://github.com/wulnrydev" target="_blank" rel="noopener noreferrer" className={styles.btnSecondary}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              {h.viewGithub}
            </a>
          </motion.div>

          {/* Stats row */}
          <motion.div className={styles.stats} variants={item}>
            <div className={styles.stat} id="stat-experience">
              <StatCounter end={6} prefix="+" delay={300} />
              <span className={styles.statLabel}>{h.yearsExp}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat} id="stat-technologies">
              <StatCounter end={15} prefix="+" delay={600} />
              <span className={styles.statLabel}>{h.technologies}</span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── RIGHT COLUMN — Profile Card ── */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.card} id="hero-profile-card">
            {/* Card header */}
            <div className={styles.cardHeader}>
              <div className={styles.avatarWrapper}>
                {discordUser ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png?size=128`}
                    alt="Discord Avatar"
                    className={styles.avatarImg}
                  />
                ) : (
                  <div className={styles.avatar} aria-label="wulnrydev avatar">
                    <span>W</span>
                  </div>
                )}
                <div
                  className={styles.statusIndicator}
                  style={{ backgroundColor: statusColors[status] }}
                />
              </div>
              <div className={styles.cardHeaderInfo}>
                <span className={styles.cardName}>{discordUser?.global_name || "wulnrydev"}</span>
                <span className={styles.cardHandle}>@{discordUser?.username || "wulnrydev"}</span>
              </div>
            </div>

            <div className={styles.cardDivider} />

            {/* Status */}
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{h.status}</span>
              <span className={styles.cardOnline} style={{ color: statusColors[status] }}>
                <span
                  className={styles.onlineDot}
                  style={{
                    backgroundColor: statusColors[status],
                    boxShadow: `0 0 8px ${statusColors[status]}`
                  }}
                />
                {h.statusText[status]}
              </span>
            </div>

            {/* Activity */}
            {(activity || spotify) && (
              <div className={styles.cardRow}>
                <span className={styles.cardLabel}>{spotify ? h.listening : h.playing}</span>
                <span className={styles.cardValue} style={{ maxWidth: '140px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {spotify ? `${spotify.song} - ${spotify.artist}` : activity?.name}
                </span>
              </div>
            )}

            {/* Discord ID */}
            <div className={styles.cardRow}>
              <span className={styles.cardLabel}>{h.discordId}</span>
              <span className={styles.cardValue}>{discordUser?.id || "902241075316535366"}</span>
            </div>

            <div className={styles.cardDivider} />

            {/* CTA */}
            <a
              id="card-github-btn"
              href="https://discord.com/users/902241075316535366"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.cardBtn}
            >
              {h.viewProfile}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
