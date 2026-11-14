"use client";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { useLang } from "@/context/LanguageContext";

function LangSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div className={styles.langSwitcher} id="nav-lang-switcher" aria-label="Language switcher">
      {/* sliding track */}
      <div className={`${styles.langSwitcherTrack} ${lang === "tr" ? styles.right : ""}`} />
      <button
        className={`${styles.langBtn} ${lang === "en" ? styles.active : ""}`}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        className={`${styles.langBtn} ${lang === "tr" ? styles.active : ""}`}
        onClick={() => setLang("tr")}
        aria-pressed={lang === "tr"}
        aria-label="Türkçeye geç"
      >
        TR
      </button>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, lang, setLang } = useLang();
  const n = t.nav;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <nav id="navbar" className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} id="nav-logo">
          wulnrydev
        </a>

        {/* Center links — desktop */}
        <div className={styles.links}>
          <a href="#past-projects" className={styles.link} id="nav-past-projects-link">{n.pastProjects}</a>
          <a href="#skills" className={styles.link} id="nav-skills-link">{n.skills}</a>
          <a href="#github" className={styles.link} id="nav-github-link">{n.github}</a>
          <a href="#faq" className={styles.link} id="nav-faq-link">{n.faq}</a>
        </div>

        {/* Right icons + lang switcher — desktop */}
        <div className={styles.right}>
          <LangSwitcher />
          <a href="https://github.com/wulnrydev" target="_blank" rel="noopener noreferrer" className={styles.iconBtn} id="nav-github-icon" aria-label="GitHub">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://discord.com/users/902241075316535366" target="_blank" rel="noopener noreferrer" className={styles.iconBtn} id="nav-discord-icon" aria-label="Discord">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
            </svg>
          </a>
        </div>

        {/* Hamburger — mobile */}
        <button
          id="nav-hamburger"
          className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? n.closeMenu : n.openMenu}
          aria-expanded={menuOpen}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}>
        {/* Backdrop */}
        <div className={styles.drawerBackdrop} onClick={close} aria-hidden="true" />

        {/* Panel */}
        <nav className={styles.drawerPanel} aria-label="Mobile navigation">
          <a href="#hero" className={styles.drawerLink} onClick={close}>{n.home}</a>
          <a href="#past-projects" className={styles.drawerLink} onClick={close}>{n.pastProjects}</a>
          <a href="#skills" className={styles.drawerLink} onClick={close}>{n.skills}</a>
          <a href="#github" className={styles.drawerLink} onClick={close}>{n.github}</a>
          <a href="#faq" className={styles.drawerLink} onClick={close}>{n.faq}</a>

          <div className={styles.drawerDivider} />

          {/* Language switcher in drawer */}
          <div className={styles.drawerLangRow}>
            <span className={styles.drawerLangLabel}>Language</span>
            <div className={styles.drawerLangSwitcher}>
              <button
                className={`${styles.langBtn} ${lang === "en" ? styles.active : ""}`}
                onClick={() => setLang("en")}
                aria-pressed={lang === "en"}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                className={`${styles.langBtn} ${lang === "tr" ? styles.active : ""}`}
                onClick={() => setLang("tr")}
                aria-pressed={lang === "tr"}
                aria-label="Türkçeye geç"
              >
                TR
              </button>
            </div>
          </div>

          <div className={styles.drawerDivider} />

          <div className={styles.drawerSocials}>
            <a
              href="https://github.com/wulnrydev"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
              aria-label="GitHub"
              onClick={close}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a
              href="https://discord.com/users/902241075316535366"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.iconBtn}
              aria-label="Discord"
              onClick={close}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
            </svg>
          </a>
        </div>
      </nav>
    </div>
  </>
);
}
