import React from "react";
import { Lang } from "@/context/LanguageContext";

export type Category = "server" | "plugin" | "discord" | "web";

export interface Feature {
  icon: React.ReactNode | string;
  title: string;
  desc: string;
}

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
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

export const getProjects = (lang: Lang): Project[] => [
  {
    id: "towny-1",
    category: "server",
    title: "Marimoss Towny Setup",
    description: lang === "en" ? "Fully configured Towny network with custom terrain, land claims, and a balanced economy system." : "Özel arazi, arazi talepleri ve dengeli bir ekonomi sistemi ile tamamen yapılandırılmış Towny ağı.",
    longDesc: lang === "en" ? "Though currently archived, this setup handled 150+ concurrent players at a stable 20 TPS (25-30 MSPT). A complete Towny experience featuring procedurally shaped custom terrain, a deeply integrated town economy, and diplomacy systems." : "Şu anda arşivlenmiş olsa da, bu kurulum 150'den fazla eşzamanlı oyuncuyu sabit 20 TPS'de (25-30 MSPT) destekledi. Prosedürel olarak şekillendirilmiş özel arazi, derinlemesine entegre edilmiş bir kasaba ekonomisi ve diplomasi sistemleri içeren eksiksiz bir Towny deneyimi.",
    iconType: "server",
    accentColor: "#60a5fa",
    images: ["/towny.webp", "/towny2.webp"],
    features: [
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: lang === "en" ? "Events & Tournaments" : "Etkinlikler & Turnuvalar", desc: lang === "en" ? "Envoy Events, Dragon Slaying Events, Sumo Tournaments, and Treasure Hunts" : "Elçi Etkinlikleri, Ejderha Avı Etkinlikleri, Sumo Turnuvaları ve Hazine Avları" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: lang === "en" ? "Modern Design" : "Modern Tasarım", desc: lang === "en" ? "Massive questlines with 12-Tier Progression Ranks and a Battle Pass System" : "12 Aşamalı İlerleme Rütbeleri ve Battle Pass Sistemi ile devasa görev serileri" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: lang === "en" ? "Advanced Systems" : "Gelişmiş Sistemler", desc: lang === "en" ? "Advanced Skills System, Custom Kits, and Automated Events" : "Gelişmiş Yetenek Sistemi, Özel Kitler ve Otomatik Etkinlikler" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: lang === "en" ? "Performance" : "Performans", desc: lang === "en" ? "Handled 150+ concurrent players at a stable 20 TPS (25-30 MSPT)" : "150+ eşzamanlı oyuncuyu sabit 20 TPS'de (25-30 MSPT) destekledi" },
    ],
    tech: ["Paper","Towny","Java","MySQL"],
    stats: [
      { label: lang === "en" ? "Design" : "Tasarım", value: lang === "en" ? "Modern" : "Modern" },
      { label: lang === "en" ? "Setup" : "Kurulum", value: lang === "en" ? "Configurable" : "Yapılandırılabilir" },
      { label: lang === "en" ? "Max Players" : "Maks Oyuncu", value: "150+" },
      { label: "TPS", value: "20.0" },
    ],
    youtubeId: "bhyf4AlS-dU",
  },
  {
    id: "skyblock-1",
    category: "server",
    title: "Marimoss SkyBlock Setup",
    description: lang === "en" ? "Season 2 active! A highly advanced SkyBlock experience with custom islands, economy, and active testing phase." : "Sezon 2 aktif! Özel adalar, ekonomi ve aktif test aşaması içeren son derece gelişmiş bir SkyBlock deneyimi.",
    longDesc: lang === "en" ? "Currently in its Season 2 active testing phase. This advanced SkyBlock setup features custom island generation, a deeply integrated player-driven economy, and optimized performance. You can test it live right now at play.marimoss.net." : "Şu anda 2. Sezon aktif test aşamasında. Bu gelişmiş SkyBlock kurulumu; özel ada oluşturma, derinlemesine entegre oyuncu odaklı ekonomi ve optimize edilmiş performans sunar. play.marimoss.net adresinden hemen canlı olarak test edebilirsiniz.",
    iconType: "server",
    accentColor: "#a78bfa",
    youtubeId: "2KXO1YSh3xo",
    features: [
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>, title: lang === "en" ? "Custom Islands" : "Özel Adalar", desc: lang === "en" ? "Unique island generation with upgradable size and biome selectors" : "Geliştirilebilir boyut ve biyom seçicileri ile benzersiz ada oluşturma" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title: lang === "en" ? "Season 2 Updates" : "Sezon 2 Güncellemeleri", desc: lang === "en" ? "Completely revamped progression, new generators, and balanced economy" : "Tamamen yenilenmiş ilerleme, yeni jeneratörler ve dengeli ekonomi" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>, title: lang === "en" ? "Live Testing" : "Canlı Test", desc: lang === "en" ? "Playable right now via the official testing IP: play.marimoss.net" : "Resmi test IP'si üzerinden hemen oynanabilir: play.marimoss.net" },
      { icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: lang === "en" ? "Optimized Core" : "Optimize Çekirdek", desc: lang === "en" ? "Built to handle massive farms and mob grinders with minimal TPS drops" : "Büyük farm'lar ve mob grinder'ları minimum TPS düşüşüyle desteklemek için tasarlandı" },
    ],
    tech: ["Paper","Java","MySQL","Redis"],
    stats: [
      { label: lang === "en" ? "Season" : "Sezon", value: "2" },
      { label: "IP", value: "play.marimoss.net" },
      { label: lang === "en" ? "Status" : "Durum", value: lang === "en" ? "Active Test" : "Aktif Test" },
      { label: lang === "en" ? "Rec. Version" : "Önerilen Sürüm", value: "1.21+" },
    ],
  },
  {
    id: "box-1",
    category: "server",
    title: "Marimoss BoxPvP Setup",
    description: lang === "en" ? "Next-generation BoxPvP setup with custom enchantments, mines, and progression systems." : "Özel büyüler, madenler ve ilerleme sistemlerine sahip yeni nesil BoxPvP kurulumu.",
    longDesc: lang === "en" ? "Coming soon — the most advanced BoxPvP setup ever built. Featuring 60+ custom enchantments, a prestige mine system, and a fully custom combat engine built on top of PaperMC." : "Yakında - şimdiye kadar yapılmış en gelişmiş BoxPvP kurulumu. 60'tan fazla özel büyü, prestij maden sistemi ve PaperMC üzerine inşa edilmiş tamamen özel bir savaş motoru içeriyor.",
    iconType: "server",
    accentColor: "#f472b6",
    features: [],
    tech: ["Paper","Java","MySQL"],
    stats: [],
    isComingSoon: true,
  },

  // ── PLUGINS ──
  {
    id: "plug-4",
    category: "plugin",
    title: "wAutoRank",
    description: lang === "en" ? "Automatic rank system based on progress + reward giving system developed for Minecraft servers." : "Minecraft sunucuları için geliştirilmiş, ilerlemeye dayalı otomatik rütbe sistemi + ödül verme sistemi.",
    longDesc: lang === "en" ? "wAutoRank automates the entire rank progression lifecycle on Minecraft servers. Players earn ranks through in-game progress metrics, and the integrated reward system automatically delivers prizes, commands, and announcements upon rank-up. Fully configurable triggers and conditions via a clean YAML config." : "wAutoRank, Minecraft sunucularında tüm rütbe ilerleme döngüsünü otomatikleştirir. Oyuncular oyun içi ilerleme metrikleri aracılığıyla rütbe kazanır ve entegre ödül sistemi rütbe atlandığında ödülleri, komutları ve duyuruları otomatik olarak verir. Temiz bir YAML yapılandırmasıyla tamamen özelleştirilebilir tetikleyiciler ve koşullar.",
    iconType: "code",
    accentColor: "#f97316",
    features: [
      { icon: "🏆", title: lang === "en" ? "Auto Rank Progression" : "Otomatik Rütbe İlerlemesi", desc: lang === "en" ? "Automatically promotes players based on configurable progress milestones" : "Yapılandırılabilir ilerleme kilometre taşlarına dayalı olarak oyuncuları otomatik terfi ettirir" },
      { icon: "🎁", title: lang === "en" ? "Reward System" : "Ödül Sistemi", desc: lang === "en" ? "Trigger custom rewards, commands, and announcements on rank-up" : "Rütbe atlandığında özel ödülleri, komutları ve duyuruları tetikler" },
      { icon: "⚙️", title: lang === "en" ? "Fully Configurable" : "Tamamen Yapılandırılabilir", desc: lang === "en" ? "Define custom conditions, thresholds, and reward actions via config" : "Yapılandırma dosyası üzerinden özel koşullar, eşikler ve ödül eylemleri tanımlayın" },
      { icon: "📊", title: lang === "en" ? "Progress Tracking" : "İlerleme Takibi", desc: lang === "en" ? "Real-time tracking of player progress toward next rank with PAPI support" : "PAPI desteği ile bir sonraki rütbeye yönelik oyuncu ilerlemesinin gerçek zamanlı takibi" },
    ],
    tech: ["Java","Spigot API","PlaceholderAPI","YAML"],
    stats: [
      { label: "Platform", value: "BuiltByBit" },
      { label: lang === "en" ? "Type" : "Tür", value: "Premium" },
      { label: lang === "en" ? "Supported" : "Desteklenen", value: "1.16+" },
      { label: lang === "en" ? "Category" : "Kategori", value: lang === "en" ? "Ranks" : "Rütbeler" },
    ],
    purchaseUrl: "https://builtbybit.com/resources/wautorank-fully-automatic-rank-system.91355/",
  },
  {
    id: "plug-5",
    category: "plugin",
    title: "NetherTickets",
    description: lang === "en" ? "Time-based nether system developed for Minecraft servers." : "Minecraft sunucuları için geliştirilmiş zaman tabanlı nether sistemi.",
    longDesc: lang === "en" ? "NetherTickets introduces a time-gated nether access mechanic to Minecraft servers. Players earn or purchase tickets to access the nether for a limited period, creating a scarce and exciting gameplay loop that drives economy and player competition." : "NetherTickets, Minecraft sunucularına zamana bağlı nether erişim mekaniği sunar. Oyuncular nether'a sınırlı bir süre erişmek için bilet kazanır veya satın alır, bu da ekonomiyi ve oyuncu rekabetini artıran nadir ve heyecan verici bir oyun döngüsü oluşturur.",
    iconType: "server",
    accentColor: "#ef4444",
    features: [
      { icon: "🎫", title: lang === "en" ? "Ticket-Based Access" : "Bilet Tabanlı Erişim", desc: lang === "en" ? "Players use tickets to gain timed access to the nether dimension" : "Oyuncular nether boyutuna süreli erişim sağlamak için biletleri kullanır" },
      { icon: "⏱️", title: lang === "en" ? "Time-Based System" : "Zaman Tabanlı Sistem", desc: lang === "en" ? "Configurable access durations and ticket expiry mechanics" : "Yapılandırılabilir erişim süreleri ve bilet sona erme mekanikleri" },
      { icon: "💰", title: lang === "en" ? "Economy Integration" : "Ekonomi Entegrasyonu", desc: lang === "en" ? "Integrates with Vault-compatible economy plugins for ticket purchasing" : "Bilet satın almak için Vault uyumlu ekonomi eklentileriyle entegre çalışır" },
      { icon: "📢", title: lang === "en" ? "Notifications" : "Bildirimler", desc: lang === "en" ? "Players receive warnings as their nether time runs out" : "Oyuncular nether süreleri biterken uyarılır" },
    ],
    tech: ["Java","Spigot API","Vault","YAML"],
    stats: [
      { label: "Platform", value: "BuiltByBit" },
      { label: lang === "en" ? "Type" : "Tür", value: "Premium" },
      { label: lang === "en" ? "Supported" : "Desteklenen", value: "1.16+" },
      { label: lang === "en" ? "Category" : "Kategori", value: lang === "en" ? "Gameplay" : "Oynanış" },
    ],
    purchaseUrl: "https://builtbybit.com/resources/nethertickets-time-based-nether-access.104698/",
  },
  {
    id: "plug-6",
    category: "plugin",
    title: "wChunkBlockLimiter",
    description: lang === "en" ? "Chunk-based block limiter for Minecraft servers. Protects server health with a performance-oriented architecture." : "Minecraft sunucuları için chunk tabanlı blok sınırlayıcı. Performans odaklı bir mimariyle sunucu sağlığını korur.",
    longDesc: lang === "en" ? "wChunkBlockLimiter enforces per-chunk block limits to prevent server-killing lag machines and oversized farms. Designed from the ground up with performance in mind, it uses efficient chunk scanning algorithms to keep your server running smoothly even on heavily built plots." : "wChunkBlockLimiter, sunucuyu çökertecek gecikme makinelerini ve aşırı büyük farm'ları önlemek için chunk başına blok sınırları uygular. Performans düşünülerek sıfırdan tasarlandı, aşırı inşa edilmiş arsalarda bile sunucunuzun sorunsuz çalışmasını sağlamak için verimli chunk tarama algoritmaları kullanır.",
    iconType: "shield",
    accentColor: "#22d3ee",
    features: [
      { icon: "🧱", title: lang === "en" ? "Per-Chunk Limits" : "Chunk Başına Sınırlar", desc: lang === "en" ? "Set maximum block counts per chunk type, configurable per material" : "Chunk türü başına maksimum blok sayısı belirleme, materyale göre yapılandırılabilir" },
      { icon: "⚡", title: lang === "en" ? "Performance Optimized" : "Performans Optimize Edildi", desc: lang === "en" ? "Async scanning with minimal TPS impact, designed for large servers" : "Büyük sunucular için tasarlanmış, minimum TPS etkisiyle senkron olmayan tarama" },
      { icon: "🔧", title: lang === "en" ? "Configurable Rules" : "Yapılandırılabilir Kurallar", desc: lang === "en" ? "Define per-world, per-region, and per-permission group limits" : "Dünya başına, bölge başına ve yetki grubu başına sınırlar tanımlayın" },
      { icon: "🚨", title: lang === "en" ? "Violation Alerts" : "İhlal Uyarıları", desc: lang === "en" ? "Notifies admins and players when limits are approached or exceeded" : "Sınırlara yaklaşıldığında veya aşıldığında yetkilileri ve oyuncuları uyarır" },
    ],
    tech: ["Java","Paper API","Async","YAML"],
    stats: [
      { label: lang === "en" ? "License" : "Lisans", value: lang === "en" ? "Open Source" : "Açık Kaynak" },
      { label: lang === "en" ? "Type" : "Tür", value: lang === "en" ? "Free" : "Ücretsiz" },
      { label: lang === "en" ? "Supported" : "Desteklenen", value: "1.16+" },
      { label: lang === "en" ? "Category" : "Kategori", value: "Performans" },
    ],
    githubUrl: "https://github.com/wulnrydev/wChunkBlockLimiter",
  },
  {
    id: "plug-7",
    category: "plugin",
    title: "Günlük Ödüller",
    description: lang === "en" ? "An advanced, modern-looking, and role-based daily reward system designed for Minecraft servers." : "Minecraft sunucuları için tasarlanmış gelişmiş, modern görünümlü ve role dayalı günlük ödül sistemi.",
    longDesc: lang === "en" ? "Günlük Ödüller is a feature-rich daily reward plugin with a role-based permission system, beautiful GUI menus, and configurable reward tiers. Players are incentivized to log in daily with escalating reward chains and streak bonuses." : "Günlük Ödüller, role dayalı yetki sistemi, güzel GUI menüleri ve yapılandırılabilir ödül aşamalarına sahip, özellik açısından zengin bir günlük ödül eklentisidir. Oyuncular, artan ödül zincirleri ve seri bonusları ile her gün giriş yapmaya teşvik edilir.",
    iconType: "economy",
    accentColor: "#fbbf24",
    features: [
      { icon: "👑", title: lang === "en" ? "Role-Based Rewards" : "Role Dayalı Ödüller", desc: lang === "en" ? "Different reward tiers based on player rank or permission group" : "Oyuncu rütbesine veya yetki grubuna göre farklı ödül seviyeleri" },
      { icon: "🖼️", title: lang === "en" ? "Modern GUI" : "Modern GUI", desc: lang === "en" ? "Beautiful, animated GUI menus for reward collection and preview" : "Ödül toplama ve önizleme için güzel, animasyonlu GUI menüleri" },
      { icon: "⚙️", title: lang === "en" ? "Fully Configurable" : "Tamamen Yapılandırılabilir", desc: lang === "en" ? "Define custom rewards, streak milestones, and cooldown periods" : "Özel ödüller, seri kilometre taşları ve bekleme süreleri tanımlayın" },
    ],
    tech: ["Java","Spigot API","GUI","YAML"],
    stats: [
      { label: lang === "en" ? "License" : "Lisans", value: lang === "en" ? "Open Source" : "Açık Kaynak" },
      { label: lang === "en" ? "Type" : "Tür", value: lang === "en" ? "Free" : "Ücretsiz" },
      { label: lang === "en" ? "Supported" : "Desteklenen", value: "1.16+" },
      { label: lang === "en" ? "Category" : "Kategori", value: lang === "en" ? "Engagement" : "Etkileşim" },
    ],
    githubUrl: "https://github.com/wulnrydev/gunlukoduller",
  },
  {
    id: "plug-8",
    category: "plugin",
    title: "Survival Puan",
    description: lang === "en" ? "A seasonal point system rewarding dedicated players through boss fights, grinding, and PvP, featuring threshold rewards and leaderboards." : "Özverili oyuncuları patron savaşları, farm ve PvP ile ödüllendiren, eşik ödülleri ve liderlik tablolarına sahip sezonluk puan sistemi.",
    longDesc: lang === "en" ? "Survival Points is a seasonal point system that resets only at the end of each season. Players can earn various rewards by surpassing threshold points during the season, and top players receive seasonal rewards at the end. These points are strictly personal—they cannot be traded, sold, or used in shops. It is not just a currency; it can only be earned by truly dedicated and skilled players through actions like defeating tough bosses (Ender Dragon, Wither, Warden), mining, fishing, farming, exploring, and PvP combat. Use /survivalpuan to check your points, /survivalpuan top to view the top 10 leaderboard, and /survivalpuanbilgi to view threshold rewards. Everything is fully configurable!" : "Survival Puan, yalnızca her sezonun sonunda sıfırlanan sezonluk bir puan sistemidir. Oyuncular sezon boyunca eşik puanlarını aşarak çeşitli ödüller kazanabilir ve en iyi oyuncular sezon sonunda sezonluk ödüller alır. Bu puanlar kesinlikle kişiseldir; takas edilemez, satılamaz veya mağazalarda kullanılamaz. Sadece bir para birimi değildir; Ender Ejderhası, Wither, Warden gibi zorlu patronları yenmek, madencilik, balıkçılık, tarım, keşif ve PvP savaşları yoluyla yalnızca gerçekten kendini işine adamış ve yetenekli oyuncular tarafından kazanılabilir. Puanlarınızı kontrol etmek için /survivalpuan, ilk 10 lider tablosunu görüntülemek için /survivalpuantop ve eşik ödüllerini görüntülemek için /survivalpuanbilgi komutlarını kullanın. Her şey tamamen yapılandırılabilir!",
    iconType: "code",
    accentColor: "#34d399",
    features: [
      { icon: "📈", title: lang === "en" ? "Points System" : "Puan Sistemi", desc: lang === "en" ? "Earn points through kills, mining, farming, and custom configurable actions" : "Öldürmeler, madencilik, tarım ve yapılandırılabilir özel eylemlerle puan kazanın" },
      { icon: "🏅", title: lang === "en" ? "Dynamic Leaderboard" : "Dinamik Liderlik Tablosu", desc: lang === "en" ? "Real-time leaderboards with top player rankings and stats" : "En iyi oyuncu sıralamaları ve istatistikleriyle gerçek zamanlı liderlik tabloları" },
      { icon: "🎯", title: lang === "en" ? "Competition Events" : "Rekabet Etkinlikleri", desc: lang === "en" ? "Timed events and challenges that reward top performers" : "En iyi performans gösterenleri ödüllendiren zamanlı etkinlikler ve zorluklar" },
      { icon: "📊", title: lang === "en" ? "PlaceholderAPI Support" : "PlaceholderAPI Desteği", desc: lang === "en" ? "Full PAPI integration for scoreboards, holograms, and chat" : "Skor tabloları, hologramlar ve sohbet için tam PAPI entegrasyonu" },
    ],
    tech: ["Java","Paper API","PlaceholderAPI","YAML"],
    stats: [
      { label: lang === "en" ? "Category" : "Kategori", value: lang === "en" ? "Competition" : "Rekabet" },
      { label: lang === "en" ? "Type" : "Tür", value: "Premium" },
      { label: lang === "en" ? "Supported" : "Desteklenen", value: "1.16+" },
      { label: "Video", value: lang === "en" ? "Coming Soon" : "Yakında" },
    ],
    youtubeId: "",
  },
  {
    id: "plug-9",
    category: "plugin",
    title: "Anahtar Parçacığı",
    description: lang === "en" ? "Earn non-tradable key fragments from opening crates and track them via a bossbar. Convert 10 fragments into a new key. Fully configurable." : "Kasa açarak takas edilemeyen anahtar parçacıkları kazanın ve bunları bir bossbar aracılığıyla takip edin. 10 parçacığı yeni bir anahtara dönüştürün. Tamamen yapılandırılabilir.",
    longDesc: lang === "en" ? "Key Fragments are earned whenever a player opens a crate. After collecting 10 fragments, players can convert them into a new crate key. Like Survival Points, these fragments are strictly personal—they cannot be traded, sold, or used in shops. Players can easily track their fragment count via an on-screen bossbar. Opening any crate in the crates area grants a fragment directly to your account. Once you reach 10 fragments, you can use the /apcevir command to receive 1 AP Crate key. The entire plugin and its features are fully configurable via the config file!" : "Anahtar Parçacıkları, bir oyuncu kasa açtığında kazanılır. 10 parçacık topladıktan sonra, oyuncular bunları yeni bir kasa anahtarına dönüştürebilir. Survival Puanları gibi, bu parçacıklar da kesinlikle kişiseldir; takas edilemez, satılamaz veya mağazalarda kullanılamazlar. Oyuncular, parçacık sayımlarını ekrandaki bir bossbar aracılığıyla kolayca takip edebilirler. Kasalar bölgesindeki herhangi bir kasayı açmak doğrudan hesabınıza bir parçacık verir. 10 parçacığa ulaştığınızda, 1 AP Kasa anahtarı almak için /apcevir komutunu kullanabilirsiniz. Eklentinin tamamı ve özellikleri yapılandırma dosyası aracılığıyla tamamen özelleştirilebilir!",
    iconType: "code",
    accentColor: "#818cf8",
    features: [
      { icon: "🗝️", title: lang === "en" ? "Guaranteed Fragments" : "Garantili Parçacıklar", desc: lang === "en" ? "Every crate open yields a key fragment — no more pure RNG disappointment" : "Her kasa açılışı bir anahtar parçacığı verir - artık saf şans hayal kırıklığı yok" },
      { icon: "🔗", title: lang === "en" ? "ExcellentCrates Integration" : "ExcellentCrates Entegrasyonu", desc: lang === "en" ? "Deep integration with ExcellentCrates for seamless fragment drops" : "Sorunsuz parçacık düşüşleri için ExcellentCrates ile derin entegrasyon" },
      { icon: "⚡", title: lang === "en" ? "Auto Command Execution" : "Otomatik Komut Yürütme", desc: lang === "en" ? "Automatically runs configured commands when fragment conversion is completed" : "Parçacık dönüşümü tamamlandığında yapılandırılmış komutları otomatik olarak çalıştırır" },
      { icon: "⚙️", title: lang === "en" ? "Configurable" : "Yapılandırılabilir", desc: lang === "en" ? "Set fragment counts, conversion thresholds, and reward commands freely" : "Parçacık sayılarını, dönüşüm eşiklerini ve ödül komutlarını serbestçe ayarlayın" },
    ],
    tech: ["Java","ExcellentCrates","Spigot API","YAML"],
    stats: [
      { label: lang === "en" ? "Integration" : "Entegrasyon", value: "ExcellentCrates" },
      { label: lang === "en" ? "Type" : "Tür", value: "Premium" },
      { label: lang === "en" ? "Supported" : "Desteklenen", value: "1.16+" },
      { label: "Video", value: lang === "en" ? "Coming Soon" : "Yakında" },
    ],
    youtubeId: "",
  },
  // ── DISCORD BOTS ──
  {
    id: "discord-1",
    category: "discord",
    title: "HaxEm Studio Bot",
    description: lang === "en" ? "Discord bot developed for HaxEm Studio. Equipped with practical commands that simplify server management." : "HaxEm Studio için geliştirilmiş Discord botu. Sunucu yönetimini kolaylaştıran pratik komutlarla donatılmıştır.",
    longDesc: lang === "en" ? "HaxEm Studio Bot is a fully custom Discord bot built for the HaxEm Studio community. It includes a comprehensive suite of server management commands, moderation tools, and utility features tailored to the studio's workflow. Built with discord.js and hosted with 24/7 uptime." : "HaxEm Studio Bot, HaxEm Studio topluluğu için oluşturulmuş tamamen özel bir Discord botudur. Stüdyonun iş akışına göre uyarlanmış kapsamlı bir sunucu yönetimi komutları paketi, moderasyon araçları ve yardımcı program özellikleri içerir. discord.js ile oluşturulmuştur ve 7/24 çalışma süresiyle barındırılmaktadır.",
    iconType: "discord",
    accentColor: "#5865F2",
    features: [
      { icon: "🛡️", title: lang === "en" ? "Moderation Tools" : "Moderasyon Araçları", desc: lang === "en" ? "Ban, kick, mute, and warn commands with audit log integration" : "Denetim günlüğü entegrasyonu ile yasaklama, atma, susturma ve uyarma komutları" },
      { icon: "⚙️", title: lang === "en" ? "Server Management" : "Sunucu Yönetimi", desc: lang === "en" ? "Practical utility commands designed for studio workflow efficiency" : "Stüdyo iş akışı verimliliği için tasarlanmış pratik yardımcı komutlar" },
      { icon: "🤖", title: lang === "en" ? "Custom Commands" : "Özel Komutlar", desc: lang === "en" ? "Fully custom command handlers and slash command support" : "Tamamen özel komut işleyicileri ve eğik çizgi komutu (slash) desteği" },
      { icon: "📊", title: lang === "en" ? "Logging System" : "Günlük Kayıt Sistemi", desc: lang === "en" ? "Detailed action logs for all moderation and administrative events" : "Tüm moderasyon ve yönetim etkinlikleri için ayrıntılı işlem günlükleri" },
    ],
    tech: ["Node.js", "discord.js", "JavaScript"],
    stats: [
      { label: lang === "en" ? "License" : "Lisans", value: lang === "en" ? "Open Source" : "Açık Kaynak" },
      { label: lang === "en" ? "Built With" : "Kullanılanlar", value: "discord.js" },
      { label: lang === "en" ? "Type" : "Tür", value: lang === "en" ? "Management" : "Yönetim" },
      { label: "Platform", value: "Discord" },
    ],
    githubUrl: "https://github.com/wulnrydev/HaxEm-Studio-Bot",
  },
  // ── WEBSITES ──
  {
    id: "web-1",
    category: "web",
    title: "Minecraft Rank Studio",
    description: lang === "en" ? "A free website to generate high-quality rank images for Minecraft servers." : "Minecraft sunucuları için yüksek kaliteli rütbe görüntüleri oluşturmaya yarayan ücretsiz bir web sitesi.",
    longDesc: lang === "en" ? "Minecraft Rank Studio is a free, web-based tool that lets Minecraft server owners generate beautiful, high-quality rank badge images directly in the browser. Built with Vue.js and Vite, it offers real-time preview, custom color palettes, and downloadable PNG exports — no design software required." : "Minecraft Rank Studio, Minecraft sunucu sahiplerinin doğrudan tarayıcıda güzel, yüksek kaliteli rütbe rozeti görüntüleri oluşturmasını sağlayan ücretsiz, web tabanlı bir araçtır. Vue.js ve Vite ile geliştirilmiş olup, gerçek zamanlı önizleme, özel renk paletleri ve indirilebilir PNG dışa aktarımları sunar - hiçbir tasarım yazılımı gerektirmez.",
    iconType: "web",
    accentColor: "#06b6d4",
    features: [
      { icon: "🎨", title: lang === "en" ? "Real-time Preview" : "Gerçek Zamanlı Önizleme", desc: lang === "en" ? "Instant visual feedback as you customize rank name, colors, and style" : "Rütbe adını, renkleri ve stili özelleştirirken anında görsel geri bildirim" },
      { icon: "⬇️", title: lang === "en" ? "PNG Export" : "PNG Dışa Aktarımı", desc: lang === "en" ? "Download high-quality rank images ready to use on your server" : "Sunucunuzda kullanıma hazır yüksek kaliteli rütbe görüntülerini indirin" },
      { icon: "🖌️", title: lang === "en" ? "Custom Palettes" : "Özel Paletler", desc: lang === "en" ? "Full color customization with gradient and solid color support" : "Degrade ve düz renk desteğiyle tam renk özelleştirmesi" },
      { icon: "⚡", title: lang === "en" ? "No Account Needed" : "Hesap Gerekmez", desc: lang === "en" ? "Completely free to use with no registration or sign-up required" : "Kayıt veya üyelik gerektirmeden kullanımı tamamen ücretsizdir" },
    ],
    tech: ["Vue.js", "Vite", "JavaScript", "CSS"],
    stats: [
      { label: lang === "en" ? "Framework" : "Framework", value: "Vue/Vite" },
      { label: lang === "en" ? "License" : "Lisans", value: lang === "en" ? "Open Source" : "Açık Kaynak" },
      { label: lang === "en" ? "Type" : "Tür", value: lang === "en" ? "Free Tool" : "Ücretsiz Araç" },
      { label: lang === "en" ? "Status" : "Durum", value: lang === "en" ? "Live" : "Canlı" },
    ],
    githubUrl: "https://github.com/wulnrydev/mc-rank-studio",
    liveUrl: "https://rankstudio.wulnrydev.com/",
  },
  {
    id: "web-2",
    category: "web",
    title: "HaxEm Studio",
    description: lang === "en" ? "Official HaxEm Studio website showcasing the studio's services, products, and development capabilities." : "Stüdyonun hizmetlerini, ürünlerini ve geliştirme yeteneklerini sergileyen resmi HaxEm Studio web sitesi.",
    longDesc: lang === "en" ? "The official website for HaxEm Studio, a development studio focused on Minecraft server solutions and Discord bots. The site showcases the studio's services, team, and portfolio — built and maintained as part of the studio's digital presence." : "Minecraft sunucu çözümleri ve Discord botlarına odaklanan bir geliştirme stüdyosu olan HaxEm Studio'nun resmi web sitesi. Site, stüdyonun dijital varlığının bir parçası olarak oluşturulmuş ve sürdürülen hizmetlerini, ekibini ve portföyünü sergiliyor.",
    iconType: "web",
    accentColor: "#8b5cf6",
    features: [
      { icon: "🌐", title: lang === "en" ? "Studio Showcase" : "Stüdyo Vitrini", desc: lang === "en" ? "Presents HaxEm Studio's services, products, and development capabilities" : "HaxEm Studio'nun hizmetlerini, ürünlerini ve geliştirme yeteneklerini sunar" },
      { icon: "📱", title: lang === "en" ? "Responsive Design" : "Duyarlı Tasarım", desc: lang === "en" ? "Fully responsive layout for all screen sizes and devices" : "Tüm ekran boyutları ve cihazlar için tamamen duyarlı düzen" },
      { icon: "🚀", title: lang === "en" ? "Fast Deployment" : "Hızlı Dağıtım", desc: lang === "en" ? "Hosted on Vercel for lightning-fast global CDN delivery" : "Yıldırım hızında küresel CDN teslimi için Vercel'de barındırılmaktadır" },
      { icon: "🔗", title: lang === "en" ? "Integrated Links" : "Entegre Bağlantılar", desc: lang === "en" ? "Direct links to projects, GitHub repositories, and contact channels" : "Projelere, GitHub depolarına ve iletişim kanallarına doğrudan bağlantılar" },
    ],
    tech: ["HTML", "CSS", "JavaScript"],
    stats: [
      { label: lang === "en" ? "License" : "Lisans", value: lang === "en" ? "Open Source" : "Açık Kaynak" },
      { label: lang === "en" ? "Hosting" : "Barındırma", value: "Vercel" },
      { label: lang === "en" ? "Type" : "Tür", value: lang === "en" ? "Studio Site" : "Stüdyo Sitesi" },
      { label: lang === "en" ? "Status" : "Durum", value: lang === "en" ? "Live" : "Canlı" },
    ],
    githubUrl: "https://github.com/wulnrydev/Haxem-Studio",
    liveUrl: "https://haxemstudio.vercel.app/",
  },
];
