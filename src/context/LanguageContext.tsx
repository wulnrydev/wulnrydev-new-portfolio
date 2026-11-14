"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "tr";

export const translations = {
  en: {
    // Navbar
    nav: {
      github: "GitHub",
      skills: "Skills",
      faq: "FAQ",
      home: "Home",
      pastProjects: "Past Projects",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    // Hero
    hero: {
      badge: "Online & available",
      greeting: "Hello, I'm",
      typewriter: "I design & develop modern interfaces, advanced applications, Minecraft solutions and Discord bots,",
      getInTouch: "Get in touch",
      viewGithub: "View GitHub",
      yearsExp: "Years Experience",
      technologies: "Technologies",
      status: "STATUS",
      listening: "LISTENING",
      playing: "PLAYING",
      discordId: "DISCORD ID",
      viewProfile: "View Profile",
      statusText: {
        online: "Online",
        idle: "Idle",
        dnd: "Do Not Disturb",
        offline: "Offline",
      },
    },
    // Past Projects
    pastProjects: {
      badge: "Archive",
      title: "Past Projects",
      sub: "Notable projects and servers I've worked on",
      marimossRole: "Lead Developer & Co-Owner",
      serverLabel: "Server",
      roleLabel: "Role",
      statusLabel: "Status",
      statusValue: "Archived",
    },
    // Skills
    skills: {
      sectionLabel: "Skills",
      title: "Skills",
      sub: "Technologies I work with",
    },
    // Portfolio (kept for type compatibility)
    portfolio: {
      sectionLabel: "Portfolio",
      title: "Portfolio",
      sub: "Explore my setups, plugins, bots and web projects",
      tabs: {
        server: "Server Setups",
        plugin: "Plugins",
        discord: "Discord Bots",
        web: "Websites",
      },
      comingSoon: "Coming Soon",
      viewDetails: "View Details",
      keyFeatures: "Key Features",
      videoOverview: "Video Overview",
      gallery: "Gallery",
      techStack: "Tech Stack",
      links: "Links",
      buyOnBBB: "Buy on BuiltByBit",
      githubOpenSource: "GitHub (Open Source)",
      liveDemo: "Live Demo",
      exploreGithub: "Explore More on GitHub",
      badgePremium: "Premium",
      badgeOpen: "Open Source",
      badgeLive: "Live",
      close: "Close",
    },
    // GitHub
    github: {
      sectionLabel: "Open Source",
      title: "GitHub Activity",
      sub: "Live statistics and every open-source project, straight from GitHub",
      stats: {
        repos: "Repositories",
        stars: "Total Stars",
        forks: "Total Forks",
        followers: "Followers",
      },
      languagesLabel: "Most Used Languages",
      reposLabel: "Open Source Projects",
      archived: "Archived",
      viewProfile: "View Full Profile on GitHub",
      noDescription: "No description provided.",
      loading: "Fetching data from GitHub…",
      error: "Couldn't load GitHub data right now. Please try again later.",
      updated: "Updated",
    },
    // FAQ
    faq: {
      sectionLabel: "FAQ",
      title: "Common Questions",
      sub: "Everything you need to know about my services",
      items: [
        {
          question: "How long does a server setup or plugin take to complete?",
          answer: "Timelines vary heavily based on complexity. A standard plugin might take a few days, while a full network setup with custom features can take 2 to 4 weeks. I always provide an estimated timeframe before starting.",
        },
        {
          question: "Do you provide support after the project is delivered?",
          answer: "Yes, absolutely. I offer a standard 2-week bug-fixing period for all my projects after delivery to ensure everything runs smoothly in a live environment.",
        },
        {
          question: "Can I request changes during the development process?",
          answer: "Minor tweaks are always welcome. However, significant changes to the agreed-upon scope may require a timeline adjustment or an additional fee. I keep communication open throughout the process.",
        },
        {
          question: "Are your setups highly optimized for player counts?",
          answer: "Performance is my top priority. I configure paper/purpur forks, optimize garbage collection, and ensure all plugins use asynchronous tasks where possible to handle high player counts without lag.",
        },
      ],
    },
    // Footer
    footer: {
      home: "Home",
      pastProjects: "Past Projects",
      skills: "Skills",
      faq: "FAQ",
      rights: "All rights reserved.",
      builtWith: "Built with Next.js & TypeScript",
    },
  },
  tr: {
    // Navbar
    nav: {
      github: "GitHub",
      skills: "Beceriler",
      faq: "SSS",
      home: "Ana Sayfa",
      pastProjects: "Geçmiş Projeler",
      openMenu: "Menüyü aç",
      closeMenu: "Menüyü kapat",
    },
    // Hero
    hero: {
      badge: "Çevrimiçi & müsait",
      greeting: "Merhaba, ben",
      typewriter: "Modern arayüzler, gelişmiş uygulamalar, Minecraft çözümleri ve Discord botları tasarlıyor & geliştiriyorum,",
      getInTouch: "İletişime Geç",
      viewGithub: "GitHub'ı Görüntüle",
      yearsExp: "Yıl Deneyim",
      technologies: "Teknoloji",
      status: "DURUM",
      listening: "DİNLİYOR",
      playing: "OYNUYOR",
      discordId: "DISCORD ID",
      viewProfile: "Profili Görüntüle",
      statusText: {
        online: "Çevrimiçi",
        idle: "Boşta",
        dnd: "Rahatsız Etme",
        offline: "Çevrimdışı",
      },
    },
    // Past Projects
    pastProjects: {
      badge: "Arşiv",
      title: "Geçmiş Bilindik Projelerim",
      sub: "Daha önce liderliğini ve geliştirmesini yaptığım bilindik projeler",
      marimossRole: "Baş Geliştirici & Ortak Kurucu",
      serverLabel: "Sunucu",
      roleLabel: "Ünvan",
      statusLabel: "Durum",
      statusValue: "Arşivlenmiş",
    },
    // Skills
    skills: {
      sectionLabel: "Beceriler",
      title: "Beceriler",
      sub: "Çalıştığım teknolojiler",
    },
    // Portfolio (tip uyumluluğu için)
    portfolio: {
      sectionLabel: "Portfolyo",
      title: "Portfolyo",
      sub: "Setup, plugin, bot ve web projelerimi keşfet",
      tabs: {
        server: "Sunucu Setup'ları",
        plugin: "Plugin'ler",
        discord: "Discord Botları",
        web: "Web Siteleri",
      },
      comingSoon: "Yakında",
      viewDetails: "Detayları Gör",
      keyFeatures: "Temel Özellikler",
      videoOverview: "Video İncelemesi",
      gallery: "Galeri",
      techStack: "Teknoloji Yığını",
      links: "Bağlantılar",
      buyOnBBB: "BuiltByBit'te Satın Al",
      githubOpenSource: "GitHub (Açık Kaynak)",
      liveDemo: "Canlı Demo",
      exploreGithub: "GitHub'da Daha Fazlasını Keşfet",
      badgePremium: "Premium",
      badgeOpen: "Açık Kaynak",
      badgeLive: "Canlı",
      close: "Kapat",
    },
    // GitHub
    github: {
      sectionLabel: "Açık Kaynak",
      title: "GitHub Aktivitesi",
      sub: "Doğrudan GitHub'dan canlı istatistikler ve tüm açık kaynak projeler",
      stats: {
        repos: "Depolar",
        stars: "Toplam Yıldız",
        forks: "Toplam Fork",
        followers: "Takipçi",
      },
      languagesLabel: "En Çok Kullanılan Diller",
      reposLabel: "Açık Kaynak Projeler",
      archived: "Arşivlenmiş",
      viewProfile: "GitHub'da Tüm Profili Gör",
      noDescription: "Açıklama eklenmemiş.",
      loading: "GitHub'dan veriler alınıyor…",
      error: "GitHub verileri şu online değil. Lütfen daha sonra tekrar deneyin.",
      updated: "Güncelleme",
    },
    // FAQ
    faq: {
      sectionLabel: "SSS",
      title: "Sık Sorulan Sorular",
      sub: "Hizmetlerim hakkında bilmeniz gereken her şey",
      items: [
        {
          question: "Bir sunucu setup'ı veya plugin ne kadar sürer?",
          answer: "Süreler karmaşıklığa göre büyük ölçüde değişir. Standart bir plugin birkaç gün sürebilirken, özel özelliklerle dolu tam bir ağ kurulumu 2 ila 4 hafta alabilir. Başlamadan önce her zaman tahmini bir süre belirtirim.",
        },
        {
          question: "Proje tesliminden sonra destek veriyor musunuz?",
          answer: "Evet, kesinlikle. Tüm projelerim için teslimden sonra canlı ortamda her şeyin sorunsuz çalışmasını sağlamak amacıyla standart 2 haftalık hata düzeltme süreci sunuyorum.",
        },
        {
          question: "Geliştirme sürecinde değişiklik talep edebilir miyim?",
          answer: "Küçük düzenlemeler her zaman kabul edilebilir. Ancak, üzerinde anlaşılan kapsamda önemli değişiklikler, zaman çizelgesinde ayarlamaya veya ek ücrete neden olabilir. Süreç boyunca iletişimi açık tutarım.",
        },
        {
          question: "Setup'larınız yüksek oyuncu sayıları için optimize edilmiş mi?",
          answer: "Performans benim için en öncelikli konudur. Paper/Purpur fork'larını yapılandırıyor, çöp toplama işlemini optimize ediyor ve tüm plugin'lerin yüksek oyuncu sayılarını takılma olmadan kaldırabilmesi için mümkün olan her yerde asenkron görevler kullandığından emin oluyorum.",
        },
      ],
    },
    // Footer
    footer: {
      home: "Ana Sayfa",
      pastProjects: "Geçmiş Projeler",
      skills: "Beceriler",
      faq: "SSS",
      rights: "Tüm hakları saklıdır.",
      builtWith: "Next.js & TypeScript ile geliştirildi",
    },
  },
};

export type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "en",
  setLang: () => {},
  t: translations.en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "en" || stored === "tr") setLangState(stored);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("lang", l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
