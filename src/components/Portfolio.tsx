"use client";
import { useState, useEffect } from "react";
import Reveal from "./Reveal";
import styles from "./Portfolio.module.css";

type Category = "server" | "plugin" | "discord" | "web";

interface Feature {
  icon: React.ReactNode | string;
  title: string;
  desc: string;
}

interface ProjectStat {
  label: string;
  value: string;
}

interface Project {
  id: string;
  category: Category;
  title: string;
  description: string;
  longDesc: string;
  iconType: "server" | "code" | "shield" | "economy" | "discord" | "web";
  accentColor: string;
  features: Feature[];
  tech: string[];
  stats: ProjectStat[];
  images?: string[];
  youtubeId?: string;
  isComingSoon?: boolean;
  purchaseUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "towny-1",
    category: "server",
    title: "Marimoss Towny Setup",
    description: "Fully configured Towny network with custom terrain, land claims, and a balanced economy system.",
    longDesc: "Though currently archived, this setup handled 150+ concurrent players at a stable 20 TPS (25-30 MSPT). A complete Towny experience featuring procedurally shaped custom terrain, a deeply integrated town economy, and diplomacy systems.",
    iconType: "server",
    accentColor: "#60a5fa",
    images: ["/towny.webp", "/towny2.webp"],
    features: [
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: "Events & Tournaments", desc: "Envoy Events, Dragon Slaying Events, Sumo Tournaments, and Treasure Hunts" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Modern Design", desc: "Massive questlines with 12-Tier Progression Ranks and a Battle Pass System" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: "Advanced Systems", desc: "Advanced Skills System, Custom Kits, and Automated Events" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Performance", desc: "Handled 150+ concurrent players at a stable 20 TPS (25-30 MSPT)" },
    ],
    tech: [],
    stats: [
      { label: "Design", value: "Modern" },
      { label: "Setup", value: "Configurable" },
      { label: "Max Players", value: "150+" },
      { label: "TPS", value: "20.0" },
    ],
    youtubeId: "bhyf4AlS-dU",
  },
  {
    id: "skyblock-1",
    category: "server",
    title: "Marimoss SkyBlock Setup",
    description: "Season 2 active! A highly advanced SkyBlock experience with custom islands, economy, and active testing phase.",
    longDesc: "Currently in its Season 2 active testing phase. This advanced SkyBlock setup features custom island generation, a deeply integrated player-driven economy, and optimized performance. You can test it live right now at play.marimoss.net.",
    iconType: "server",
    accentColor: "#a78bfa",
    youtubeId: "2KXO1YSh3xo",
    features: [
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: "Custom Islands", desc: "Unique island generation with upgradable size and biome selectors" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: "Season 2 Updates", desc: "Completely revamped progression, new generators, and balanced economy" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: "Live Testing", desc: "Playable right now via the official testing IP: play.marimoss.net" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Optimized Core", desc: "Built to handle massive farms and mob grinders with minimal TPS drops" },
    ],
    tech: [],
    stats: [
      { label: "Season", value: "2" },
      { label: "IP", value: "play.marimoss.net" },
      { label: "Status", value: "Active Test" },
      { label: "Rec. Version", value: "1.21+" },
    ],
  },
  {
    id: "box-1",
    category: "server",
    title: "Marimoss BoxPvP Setup",
    description: "Next-generation BoxPvP setup with custom enchantments, mines, and progression systems.",
    longDesc: "Coming soon — the most advanced BoxPvP setup ever built. Featuring 60+ custom enchantments, a prestige mine system, and a fully custom combat engine built on top of PaperMC.",
    iconType: "server",
    accentColor: "#f472b6",
    features: [],
    tech: [],
    stats: [],
    isComingSoon: true,
  },

  // ── NEW PLUGINS ──
  {
    id: "plug-4",
    category: "plugin",
    title: "wAutoRank",
    description: "Automatic rank system based on progress + reward giving system developed for Minecraft servers.",
    longDesc: "wAutoRank automates the entire rank progression lifecycle on Minecraft servers. Players earn ranks through in-game progress metrics, and the integrated reward system automatically delivers prizes, commands, and announcements upon rank-up. Fully configurable triggers and conditions via a clean YAML config.",
    iconType: "code",
    accentColor: "#f97316",
    features: [
      { icon: "🏆", title: "Auto Rank Progression", desc: "Automatically promotes players based on configurable progress milestones" },
      { icon: "🎁", title: "Reward System", desc: "Trigger custom rewards, commands, and announcements on rank-up" },
      { icon: "⚙️", title: "Fully Configurable", desc: "Define custom conditions, thresholds, and reward actions via config" },
      { icon: "📊", title: "Progress Tracking", desc: "Real-time tracking of player progress toward next rank with PAPI support" },
    ],
    tech: [],
    stats: [
      { label: "Platform", value: "BuiltByBit" },
      { label: "Type", value: "Premium" },
      { label: "Supported", value: "1.16+" },
      { label: "Category", value: "Ranks" },
    ],
    purchaseUrl: "https://builtbybit.com/resources/wautorank-fully-automatic-rank-system.91355/",
  },
  {
    id: "plug-5",
    category: "plugin",
    title: "NetherTickets",
    description: "Time-based nether system developed for Minecraft servers.",
    longDesc: "NetherTickets introduces a time-gated nether access mechanic to Minecraft servers. Players earn or purchase tickets to access the nether for a limited period, creating a scarce and exciting gameplay loop that drives economy and player competition.",
    iconType: "server",
    accentColor: "#ef4444",
    features: [
      { icon: "🎫", title: "Ticket-Based Access", desc: "Players use tickets to gain timed access to the nether dimension" },
      { icon: "⏱️", title: "Time-Based System", desc: "Configurable access durations and ticket expiry mechanics" },
      { icon: "💰", title: "Economy Integration", desc: "Integrates with Vault-compatible economy plugins for ticket purchasing" },
      { icon: "📢", title: "Notifications", desc: "Players receive warnings as their nether time runs out" },
    ],
    tech: [],
    stats: [
      { label: "Platform", value: "BuiltByBit" },
      { label: "Type", value: "Premium" },
      { label: "Supported", value: "1.16+" },
      { label: "Category", value: "Gameplay" },
    ],
    purchaseUrl: "https://builtbybit.com/resources/nethertickets-time-based-nether-access.104698/",
  },
  {
    id: "plug-6",
    category: "plugin",
    title: "wChunkBlockLimiter",
    description: "Chunk-based block limiter for Minecraft servers. Protects server health with a performance-oriented architecture.",
    longDesc: "wChunkBlockLimiter enforces per-chunk block limits to prevent server-killing lag machines and oversized farms. Designed from the ground up with performance in mind, it uses efficient chunk scanning algorithms to keep your server running smoothly even on heavily built plots.",
    iconType: "shield",
    accentColor: "#22d3ee",
    features: [
      { icon: "🧱", title: "Per-Chunk Limits", desc: "Set maximum block counts per chunk type, configurable per material" },
      { icon: "⚡", title: "Performance Optimized", desc: "Async scanning with minimal TPS impact, designed for large servers" },
      { icon: "🔧", title: "Configurable Rules", desc: "Define per-world, per-region, and per-permission group limits" },
      { icon: "🚨", title: "Violation Alerts", desc: "Notifies admins and players when limits are approached or exceeded" },
    ],
    tech: [],
    stats: [
      { label: "License", value: "Open Source" },
      { label: "Type", value: "Free" },
      { label: "Supported", value: "1.16+" },
      { label: "Category", value: "Performance" },
    ],
    githubUrl: "https://github.com/wulnrydev/wChunkBlockLimiter",
  },
  {
    id: "plug-7",
    category: "plugin",
    title: "Günlük Ödüller",
    description: "An advanced, modern-looking, and role-based daily reward system designed for Minecraft servers.",
    longDesc: "Günlük Ödüller is a feature-rich daily reward plugin with a role-based permission system, beautiful GUI menus, and configurable reward tiers. Players are incentivized to log in daily with escalating reward chains and streak bonuses.",
    iconType: "economy",
    accentColor: "#fbbf24",
    features: [
      { icon: "👑", title: "Role-Based Rewards", desc: "Different reward tiers based on player rank or permission group" },
      { icon: "🖼️", title: "Modern GUI", desc: "Beautiful, animated GUI menus for reward collection and preview" },
      { icon: "⚙️", title: "Fully Configurable", desc: "Define custom rewards, streak milestones, and cooldown periods" },
    ],
    tech: [],
    stats: [
      { label: "License", value: "Open Source" },
      { label: "Type", value: "Free" },
      { label: "Supported", value: "1.16+" },
      { label: "Category", value: "Engagement" },
    ],
    githubUrl: "https://github.com/wulnrydev/gunlukoduller",
  },
  {
    id: "plug-8",
    category: "plugin",
    title: "Survival Puan",
    description: "A seasonal point system rewarding dedicated players through boss fights, grinding, and PvP, featuring threshold rewards and leaderboards.",
    longDesc: "Survival Points is a seasonal point system that resets only at the end of each season. Players can earn various rewards by surpassing threshold points during the season, and top players receive seasonal rewards at the end. These points are strictly personal—they cannot be traded, sold, or used in shops. It is not just a currency; it can only be earned by truly dedicated and skilled players through actions like defeating tough bosses (Ender Dragon, Wither, Warden), mining, fishing, farming, exploring, and PvP combat. Use /survivalpuan to check your points, /survivalpuan top to view the top 10 leaderboard, and /survivalpuanbilgi to view threshold rewards. Everything is fully configurable!",
    iconType: "code",
    accentColor: "#34d399",
    features: [
      { icon: "📈", title: "Points System", desc: "Earn points through kills, mining, farming, and custom configurable actions" },
      { icon: "🏅", title: "Dynamic Leaderboard", desc: "Real-time leaderboards with top player rankings and stats" },
      { icon: "🎯", title: "Competition Events", desc: "Timed events and challenges that reward top performers" },
      { icon: "📊", title: "PlaceholderAPI Support", desc: "Full PAPI integration for scoreboards, holograms, and chat" },
    ],
    tech: [],
    stats: [
      { label: "Category", value: "Competition" },
      { label: "Type", value: "Premium" },
      { label: "Supported", value: "1.16+" },
      { label: "Video", value: "Coming Soon" },
    ],
    youtubeId: "",
  },
  {
    id: "plug-9",
    category: "plugin",
    title: "Anahtar Parçacığı",
    description: "Earn non-tradable key fragments from opening crates and track them via a bossbar. Convert 10 fragments into a new key. Fully configurable.",
    longDesc: "Key Fragments are earned whenever a player opens a crate. After collecting 10 fragments, players can convert them into a new crate key. Like Survival Points, these fragments are strictly personal—they cannot be traded, sold, or used in shops. Players can easily track their fragment count via an on-screen bossbar. Opening any crate in the crates area grants a fragment directly to your account. Once you reach 10 fragments, you can use the /apcevir command to receive 1 AP Crate key. The entire plugin and its features are fully configurable via the config file!",
    iconType: "code",
    accentColor: "#818cf8",
    features: [
      { icon: "🗝️", title: "Guaranteed Fragments", desc: "Every crate open yields a key fragment — no more pure RNG disappointment" },
      { icon: "🔗", title: "ExcellentCrates Integration", desc: "Deep integration with ExcellentCrates for seamless fragment drops" },
      { icon: "⚡", title: "Auto Command Execution", desc: "Automatically runs configured commands when fragment conversion is completed" },
      { icon: "⚙️", title: "Configurable", desc: "Set fragment counts, conversion thresholds, and reward commands freely" },
    ],
    tech: [],
    stats: [
      { label: "Integration", value: "ExcellentCrates" },
      { label: "Type", value: "Premium" },
      { label: "Supported", value: "1.16+" },
      { label: "Video", value: "Coming Soon" },
    ],
    youtubeId: "",
  },
  // ── DISCORD BOTS ──
  {
    id: "discord-1",
    category: "discord",
    title: "HaxEm Studio Bot",
    description: "Discord bot developed for HaxEm Studio. Equipped with practical commands that simplify server management.",
    longDesc: "HaxEm Studio Bot is a fully custom Discord bot built for the HaxEm Studio community. It includes a comprehensive suite of server management commands, moderation tools, and utility features tailored to the studio's workflow. Built with discord.js and hosted with 24/7 uptime.",
    iconType: "discord",
    accentColor: "#5865F2",
    features: [
      { icon: "🛡️", title: "Moderation Tools", desc: "Ban, kick, mute, and warn commands with audit log integration" },
      { icon: "⚙️", title: "Server Management", desc: "Practical utility commands designed for studio workflow efficiency" },
      { icon: "🤖", title: "Custom Commands", desc: "Fully custom command handlers and slash command support" },
      { icon: "📊", title: "Logging System", desc: "Detailed action logs for all moderation and administrative events" },
    ],
    tech: ["Node.js", "discord.js", "JavaScript"],
    stats: [
      { label: "License", value: "Open Source" },
      { label: "Built With", value: "discord.js" },
      { label: "Type", value: "Management" },
      { label: "Platform", value: "Discord" },
    ],
    githubUrl: "https://github.com/wulnrydev/HaxEm-Studio-Bot",
  },
  // ── WEBSITES ──
  {
    id: "web-1",
    category: "web",
    title: "Minecraft Rank Studio",
    description: "A free website to generate high-quality rank images for Minecraft servers.",
    longDesc: "Minecraft Rank Studio is a free, web-based tool that lets Minecraft server owners generate beautiful, high-quality rank badge images directly in the browser. Built with Vue.js and Vite, it offers real-time preview, custom color palettes, and downloadable PNG exports — no design software required.",
    iconType: "web",
    accentColor: "#06b6d4",
    features: [
      { icon: "🎨", title: "Real-time Preview", desc: "Instant visual feedback as you customize rank name, colors, and style" },
      { icon: "⬇️", title: "PNG Export", desc: "Download high-quality rank images ready to use on your server" },
      { icon: "🖌️", title: "Custom Palettes", desc: "Full color customization with gradient and solid color support" },
      { icon: "⚡", title: "No Account Needed", desc: "Completely free to use with no registration or sign-up required" },
    ],
    tech: ["Vue.js", "Vite", "JavaScript", "CSS"],
    stats: [
      { label: "Framework", value: "Vue/Vite" },
      { label: "License", value: "Open Source" },
      { label: "Type", value: "Free Tool" },
      { label: "Status", value: "Live" },
    ],
    githubUrl: "https://github.com/wulnrydev/mc-rank-studio",
    liveUrl: "https://rankstudio.wulnrydev.com/",
  },
  {
    id: "web-2",
    category: "web",
    title: "HaxEm Studio",
    description: "Official HaxEm Studio website showcasing the studio's services, products, and development capabilities.",
    longDesc: "The official website for HaxEm Studio, a development studio focused on Minecraft server solutions and Discord bots. The site showcases the studio's services, team, and portfolio — built and maintained as part of the studio's digital presence.",
    iconType: "web",
    accentColor: "#8b5cf6",
    features: [
      { icon: "🌐", title: "Studio Showcase", desc: "Presents HaxEm Studio's services, products, and development capabilities" },
      { icon: "📱", title: "Responsive Design", desc: "Fully responsive layout for all screen sizes and devices" },
      { icon: "🚀", title: "Fast Deployment", desc: "Hosted on Vercel for lightning-fast global CDN delivery" },
      { icon: "🔗", title: "Integrated Links", desc: "Direct links to projects, GitHub repositories, and contact channels" },
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    stats: [
      { label: "License", value: "Open Source" },
      { label: "Hosting", value: "Vercel" },
      { label: "Type", value: "Studio Site" },
      { label: "Status", value: "Live" },
    ],
    githubUrl: "https://github.com/wulnrydev/Haxem-Studio",
    liveUrl: "https://haxemstudio.vercel.app/",
  },
];

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
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
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
            <span className={styles.sectionLabel}>Key Features</span>
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
            <span className={styles.sectionLabel}>Video Overview</span>
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
            <span className={styles.sectionLabel}>Gallery</span>
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
            <span className={styles.sectionLabel}>Tech Stack</span>
            <div className={styles.techTags}>
              {project.tech.map((t) => (
                <span key={t} className={styles.techTag} style={{ borderColor: `${project.accentColor}40`, color: project.accentColor }}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {(project.purchaseUrl || project.githubUrl || project.liveUrl) && (
          <div className={styles.linksSection}>
            <span className={styles.sectionLabel}>Links</span>
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
                  Buy on BuiltByBit
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
                  GitHub (Open Source)
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
                  Live Demo
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

  const filteredProjects = PROJECTS.filter((p) => p.category === activeTab);

  return (
    <>
      <section id="portfolio" className={styles.section}>
        <Reveal width="100%">
          <div className={styles.dividerRow}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>Portfolio</span>
            <span className={styles.dividerLine} />
          </div>
        </Reveal>

        <div className={styles.header}>
          <Reveal delay={150} width="100%">
            <h2 className={styles.title}>Selected Work</h2>
          </Reveal>
          <Reveal delay={300} width="100%">
            <p className={styles.sub}>Check out my recent setups and plugins</p>
          </Reveal>
        </div>

        {/* Tabs */}
        <div className={styles.tabsWrapper}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabBtn} ${activeTab === "server" ? styles.active : ""}`}
              onClick={() => setActiveTab("server")}
            >
              Server Setups
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "plugin" ? styles.active : ""}`}
              onClick={() => setActiveTab("plugin")}
            >
              Plugins
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "discord" ? styles.active : ""}`}
              onClick={() => setActiveTab("discord")}
            >
              Discord Bots
            </button>
            <button
              className={`${styles.tabBtn} ${activeTab === "web" ? styles.active : ""}`}
              onClick={() => setActiveTab("web")}
            >
              Websites
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
                  {project.tech.slice(0, 3).map((t) => (
                    <span key={t} className={styles.cardTechBadge}>{t}</span>
                  ))}
                  {project.tech.length > 3 && <span className={styles.cardTechMore}>+{project.tech.length - 3}</span>}
                </div>
              )}

              <div className={styles.cardFooter}>
                {project.isComingSoon ? (
                  <span className={styles.soonBadge}>
                    <span className={styles.soonDot} />
                    Coming Soon
                  </span>
                ) : (
                  <div className={styles.cardFooterRow}>
                    <span className={styles.cardLink}>
                      View Details
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </span>
                    <div className={styles.cardBadges}>
                      {project.purchaseUrl && (
                        <span className={styles.cardBadgePurchase}>Premium</span>
                      )}
                      {project.githubUrl && (
                        <span className={styles.cardBadgeOpen}>Open Source</span>
                      )}
                      {project.liveUrl && (
                        <span className={styles.cardBadgeLive}>Live</span>
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
            <span>Explore More on GitHub</span>
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
