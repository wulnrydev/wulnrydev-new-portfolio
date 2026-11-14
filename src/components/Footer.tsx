"use client";
import styles from "./Footer.module.css";
import { useLang } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLang();
  const f = t.footer;

  return (
    <footer className={styles.footer}>
      {/* Bottom glow effect */}
      <div className={styles.glowContainer}>
        <div className={styles.glowOrb1} />
        <div className={styles.glowOrb2} />
        <div className={styles.glowOrb3} />
      </div>

      <div className={styles.inner}>
        <div className={styles.topRow}>
          <span className={styles.logo}>wulnrydev</span>
          <div className={styles.links}>
            <a href="#hero" className={styles.link}>{f.home}</a>
            <a href="#past-projects" className={styles.link}>{f.pastProjects}</a>
            <a href="#skills" className={styles.link}>{f.skills}</a>
            <a href="#faq" className={styles.link}>{f.faq}</a>
          </div>
          <div className={styles.socials}>
            <a
              href="https://github.com/wulnrydev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="GitHub"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="mailto:em1rhqnzw@gmail.com"
              className={styles.socialBtn}
              aria-label="Email"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.divider} />

        <div className={styles.bottomRow}>
          <span className={styles.copy}>
            &copy; {new Date().getFullYear()} wulnrydev. {f.rights}
          </span>
          <span className={styles.madeWith}>
            {f.builtWith}
          </span>
        </div>
      </div>
    </footer>
  );
}
