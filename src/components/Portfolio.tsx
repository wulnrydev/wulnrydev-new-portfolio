"use client";
import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import styles from "./Portfolio.module.css";
import { useLang } from "@/context/LanguageContext";
import { getProjects, Project, Category } from "@/data/projects";

function Icon({ type, color }: { type: Project["iconType"]; color: string }) {
  switch (type) {
    case "server":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="6" rx="1" />
          <path d="M6 7h.01M2 14h20M2 14v5a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-5M6 17h.01" />
        </svg>
      );
    case "shield":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "economy":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 18V6" />
        </svg>
      );
    case "discord":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill={color}>
          <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026 13.83 13.83 0 0 0 1.226-1.963.074.074 0 0 0-.041-.104 13.175 13.175 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
        </svg>
      );
    case "web":
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
    case "code":
    default:
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
}

function Modal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useLang();
  const p = t.portfolio;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        style={{ "--accent": project.accentColor } as React.CSSProperties}
      >
        {/* Close */}
        <button className={styles.closeBtn} onClick={onClose} aria-label={p.close}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Glow bg */}
        <div className={styles.modalGlow} style={{ background: `radial-gradient(ellipse at 50% 0%, ${project.accentColor}22 0%, transparent 70%)` }} />

        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.modalIconWrap} style={{ border: `1px solid ${project.accentColor}40`, background: `${project.accentColor}12` }}>
            <Icon type={project.iconType} color={project.accentColor} />
          </div>
          <div>
            <h2 className={styles.modalTitle}>{project.title}</h2>
            <p className={styles.modalSub}>{project.description}</p>
          </div>
        </div>

        {/* Stats row */}
        {project.stats.length > 0 && (
          <div className={styles.statsRow}>
            {project.stats.map((s) => (
              <div key={s.label} className={styles.statBox}>
                <span className={styles.statVal} style={{ color: project.accentColor }}>{s.value}</span>
                <span className={styles.statLbl}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Long desc */}
        <p className={styles.modalDesc}>{project.longDesc}</p>

        {/* Features */}
        {project.features.length > 0 && (
          <div className={styles.featuresSection}>
            <span className={styles.sectionLabel}>{p.keyFeatures}</span>
            <div className={styles.featuresGrid}>
              {project.features.map((f, i) => (
                <div key={i} className={styles.featureCard} style={{ animationDelay: `${i * 0.07}s` }}>
                  <span className={styles.featureIcon}>{f.icon}</span>
                  <div>
                    <h4 className={styles.featureTitle}>{f.title}</h4>
                    <p className={styles.featureDesc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video */}
        {project.youtubeId && (
          <div className={styles.videoSection}>
            <span className={styles.sectionLabel}>{p.videoOverview}</span>
            <div className={styles.videoWrapper}>
              <iframe
                src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&rel=0`}
                title={`${project.title} Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className={styles.videoIframe}
              />
            </div>
          </div>
        )}

        {/* Images */}
        {project.images && project.images.length > 0 && (
          <div className={styles.imagesSection}>
            <span className={styles.sectionLabel}>{p.gallery}</span>
            <div className={styles.imagesGrid}>
              {project.images.map((img, i) => (
                <div key={i} className={styles.imageWrapper}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className={styles.projectImage}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech stack */}
        {project.tech.length > 0 && (
          <div className={styles.techSection}>
            <span className={styles.sectionLabel}>{p.techStack}</span>
            <div className={styles.techTags}>
              {project.tech.map((tech) => (
                <span key={tech} className={styles.techTag} style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.purchaseUrl || project.githubUrl || project.liveUrl) && (
          <div className={styles.linksSection}>
            <span className={styles.sectionLabel}>{p.links}</span>
            <div className={styles.linkBtns}>
              {project.purchaseUrl && (
                <a
                  href={project.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                  style={{ borderColor: `${project.accentColor}50`, color: project.accentColor, background: `${project.accentColor}10` }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  {p.buyOnBBB}
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                  style={{ borderColor: `${project.accentColor}50`, color: project.accentColor, background: `${project.accentColor}10` }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  {p.githubOpenSource}
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkBtn}
                  style={{ borderColor: `${project.accentColor}50`, color: project.accentColor, background: `${project.accentColor}10` }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="2" y1="12" x2="22" y2="12"/>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                  </svg>
                  {p.liveDemo}
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Category>("server");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t, lang } = useLang();
  const p = t.portfolio;

  const filteredProjects = getProjects(lang).filter((proj) => proj.category === activeTab);

  return (
    <>
      <section id="portfolio" className={styles.section}>
        <Reveal width="100%">
          <div className={styles.dividerRow}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>{p.sectionLabel}</span>
            <span className={styles.dividerLine} />
          </div>
        </Reveal>

        <div className={styles.header}>
          <Reveal delay={150} width="100%">
            <h2 className={styles.title}>{p.title}</h2>
          </Reveal>
          <Reveal delay={300} width="100%">
            <p className={styles.sub}>{p.sub}</p>
          </Reveal>
        </div>

        {/* Tabs */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === "server" ? styles.active : ""}`}
              onClick={() => setActiveTab("server")}
            >
              {p.tabs.server}
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "plugin" ? styles.active : ""}`}
              onClick={() => setActiveTab("plugin")}
            >
              {p.tabs.plugin}
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "discord" ? styles.active : ""}`}
              onClick={() => setActiveTab("discord")}
            >
              {p.tabs.discord}
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "web" ? styles.active : ""}`}
              onClick={() => setActiveTab("web")}
            >
              {p.tabs.web}
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className={styles.grid}>
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              className={`${styles.card} ${project.isComingSoon ? styles.cardSoon : ""}`}
              style={{
                animationDelay: `${idx * 0.05}s`,
                "--card-accent": project.accentColor,
              } as React.CSSProperties}
              onClick={() => !project.isComingSoon && setSelectedProject(project)}
            >
              {/* Accent top line */}
              <div className={styles.cardAccentLine} style={{ background: project.isComingSoon ? "rgba(255,255,255,0.05)" : project.accentColor }} />

              <div className={styles.cardIcon}>
                <Icon type={project.iconType} color={project.isComingSoon ? "rgba(255,255,255,0.2)" : project.accentColor} />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
              </div>

              {!project.isComingSoon && project.tech.length > 0 && (
                <div className={styles.cardTechRow}>
                  {project.tech.slice(0, 3).map((tech) => (
                    <span key={tech} className={styles.cardTechBadge}>{tech}</span>
                  ))}
                  {project.tech.length > 3 && <span className={styles.cardTechMore}>+{project.tech.length - 3}</span>}
                </div>
              )}

              <div className={styles.cardFooter}>
                {project.isComingSoon ? (
                  <span className={styles.soonBadge}>
                    <span className={styles.soonDot} />
                    {p.comingSoon}
                  </span>
                ) : (
                  <div className={styles.cardFooterRow}>
                    <span className={styles.cardLink}>
                      {p.viewDetails}
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className={styles.cardBadges}>
                      {project.purchaseUrl && (
                        <span className={styles.cardBadgePurchase}>{p.badgePremium}</span>
                      )}
                      {project.githubUrl && (
                        <span className={styles.cardBadgeOpen}>{p.badgeOpen}</span>
                      )}
                      {project.liveUrl && (
                        <span className={styles.cardBadgeLive}>{p.badgeLive}</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Hover glow */}
              <div className={styles.cardHoverGlow} style={{ background: `radial-gradient(ellipse at 50% 100%, ${project.accentColor}18 0%, transparent 70%)` }} />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className={styles.viewMoreWrapper}>
          <a
            href="https://github.com/wulnrydev"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.viewMoreBtn}
          >
            <span>{p.exploreGithub}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className={styles.viewMoreGlow} />
          </a>
        </div>
      </section>

      {selectedProject && (
        <Modal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </>
  );
}
