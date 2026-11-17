"use client";
import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import styles from "./GitHub.module.css";
import { useLang } from "@/context/LanguageContext";
import { useGithub, GITHUB_USERNAME, GithubRepo } from "@/hooks/useGithub";

/* Common language → accent color (GitHub-style) */
const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Java: "#b07219",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Vue: "#41b883",
  Kotlin: "#A97BFF",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Shell: "#89e051",
  Go: "#00ADD8",
  Rust: "#dea584",
  PHP: "#4F5D95",
  Ruby: "#701516",
  Dart: "#00B4AB",
};

function langColor(lang: string | null) {
  return (lang && LANG_COLORS[lang]) || "#8b5cf6";
}

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ForkIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="3" r="2.5" /><circle cx="6" cy="21" r="2.5" /><circle cx="18" cy="8" r="2.5" />
    <path d="M18 10.5v.5a4 4 0 0 1-4 4H8a4 4 0 0 0-2 1M6 5.5v9" />
  </svg>
);

function StatCard({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon}>{icon}</div>
      <span className={styles.statValue}>{value.toLocaleString()}</span>
      <span className={styles.statLabel}>{label}</span>
    </div>
  );
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const { t, lang } = useLang();
  const g = t.github;
  const color = langColor(repo.language);

  const updated = new Date(repo.pushed_at).toLocaleDateString(lang === "tr" ? "tr-TR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
      style={{ "--repo-accent": color } as React.CSSProperties}
    >
      <div className={styles.repoAccentLine} />

      <div className={styles.repoTop}>
        <div className={styles.repoNameWrap}>
          <svg className={styles.repoIcon} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z" />
          </svg>
          <span className={styles.repoName}>{repo.name}</span>
        </div>
        {repo.archived && <span className={styles.archivedBadge}>{g.archived}</span>}
      </div>

      <p className={styles.repoDesc}>{repo.description || g.noDescription}</p>

      {repo.topics && repo.topics.length > 0 && (
        <div className={styles.topicRow}>
          {repo.topics.slice(0, 4).map((topic) => (
            <span key={topic} className={styles.topic}>{topic}</span>
          ))}
        </div>
      )}

      <div className={styles.repoFooter}>
        <div className={styles.repoMeta}>
          {repo.language && (
            <span className={styles.metaItem}>
              <span className={styles.langDot} style={{ background: color }} />
              {repo.language}
            </span>
          )}
          <span className={styles.metaItem}><StarIcon /> {repo.stargazers_count}</span>
          <span className={styles.metaItem}><ForkIcon /> {repo.forks_count}</span>
        </div>
        <span className={styles.repoUpdated}>{g.updated} {updated}</span>
      </div>
    </a>
  );
}

export default function GitHub() {
  const { t } = useLang();
  const g = t.github;
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (typeof IntersectionObserver === "undefined") {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setActive(true);
        observer.disconnect();
      },
      { rootMargin: "600px 0px" }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const { repos, stats, loading, error } = useGithub(active);

  return (
    <section id="github" className={styles.section} ref={sectionRef}>
      <Reveal width="100%">
        <div className={styles.dividerRow}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerText}>{g.sectionLabel}</span>
          <span className={styles.dividerLine} />
        </div>
      </Reveal>

      <div className={styles.header}>
        <Reveal delay={150} width="100%">
          <h2 className={styles.title}>{g.title}</h2>
        </Reveal>
        <Reveal delay={300} width="100%">
          <p className={styles.sub}>{g.sub}</p>
        </Reveal>
      </div>

      {loading && (
        <div className={styles.stateBox}>
          <span className={styles.spinner} />
          <span>{g.loading}</span>
        </div>
      )}

      {error && !loading && (
        <div className={styles.stateBox}>
          <span className={styles.errorIcon}>!</span>
          <span>{g.error}</span>
        </div>
      )}

      {!loading && !error && stats && (
        <>
          {/* Stats */}
          <div className={styles.statsGrid}>
            <StatCard value={stats.repoCount} label={g.stats.repos} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>
            } />
            <StatCard value={stats.totalStars} label={g.stats.stars} icon={<StarIcon />} />
            <StatCard value={stats.totalForks} label={g.stats.forks} icon={<ForkIcon />} />
            <StatCard value={stats.followers} label={g.stats.followers} icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            } />
          </div>

          {/* Languages */}
          {stats.topLanguages.length > 0 && (
            <div className={styles.langSection}>
              <span className={styles.subLabel}>{g.languagesLabel}</span>
              <div className={styles.langBar}>
                {stats.topLanguages.map((l) => (
                  <div
                    key={l.name}
                    className={styles.langSegment}
                    style={{ flex: l.count, background: langColor(l.name) }}
                    title={`${l.name} · ${l.count}`}
                  />
                ))}
              </div>
              <div className={styles.langLegend}>
                {stats.topLanguages.map((l) => (
                  <span key={l.name} className={styles.langLegendItem}>
                    <span className={styles.langDot} style={{ background: langColor(l.name) }} />
                    {l.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Repos */}
          <div className={styles.reposSection}>
            <span className={styles.subLabel}>{g.reposLabel}</span>
            <div className={styles.repoGrid}>
              {repos.map((repo) => (
                <RepoCard key={repo.id} repo={repo} />
              ))}
            </div>
          </div>

          {/* Profile link */}
          <div className={styles.viewMoreWrapper}>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.viewMoreBtn}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>{g.viewProfile}</span>
              <span className={styles.viewMoreGlow} />
            </a>
          </div>
        </>
      )}
    </section>
  );
}
