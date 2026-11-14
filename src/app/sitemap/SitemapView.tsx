"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Home,
  Building2,
  Wrench,
  Package,
  FileSpreadsheet,
  Phone,
  Laptop,
  Monitor,
  Zap,
  ShieldCheck,
  Wifi,
  BatteryCharging,
  Cable,
  Tv,
  HardDrive,
  Cpu,
  Mouse,
  Keyboard,
  FileCode,
  FileText,
  Search,
  X,
  ArrowUpRight,
  ChevronRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import styles from "./page.module.css";
import { BUSINESS } from "@/lib/business";

interface SitemapItem {
  id: string;
  title: string;
  path: string;
  description: string;
  category: "core" | "services" | "products" | "anchors" | "feeds";
  categoryLabel: string;
  badge?: string;
  badgeType?: "default" | "live" | "xml";
  requiresQuoteEnabled?: boolean;
  isExternalOrFile?: boolean;
  iconName: string;
}

const ALL_SITEMAP_ITEMS: SitemapItem[] = [
  // ── Core Navigation Pages ──
  {
    id: "home",
    title: "Home",
    path: "/",
    description: "Welcome to Konark Computers. Overview of repair services, MSME certified workshop, client reviews, and founder intro.",
    category: "core",
    categoryLabel: "Core Pages",
    badge: "Main Page",
    iconName: "Home",
  },
  {
    id: "about",
    title: "Company & About Us",
    path: "/about",
    description: "Our founding story since 1999 by Omesh Tank, 25+ years of computer repair experience in Rajkot, certifications, and philosophy.",
    category: "core",
    categoryLabel: "Core Pages",
    badge: "Est. 1999",
    iconName: "Building2",
  },
  {
    id: "services-main",
    title: "All Repair & IT Services",
    path: "/services",
    description: "Complete catalog of computer & laptop repair, diagnosis, speed optimization, virus removal, networking, and maintenance.",
    category: "core",
    categoryLabel: "Core Pages",
    badge: "Services Hub",
    iconName: "Wrench",
  },
  {
    id: "products-main",
    title: "Parts & Accessories Catalog",
    path: "/products",
    description: "Hardware catalog featuring original SSDs, RAM, screens, batteries, chargers, and keyboards with manufacturer warranty in Rajkot.",
    category: "core",
    categoryLabel: "Core Pages",
    badge: "Catalog Hub",
    iconName: "Package",
  },
  {
    id: "quote-builder",
    title: "Online Quotation Builder",
    path: "/quote",
    description: "Interactive online quote builder with live GST calculation, component compatibility checks, and instant PDF download.",
    category: "core",
    categoryLabel: "Core Pages",
    badge: "Interactive Tool",
    badgeType: "live",
    requiresQuoteEnabled: true,
    iconName: "FileSpreadsheet",
  },
  {
    id: "contact",
    title: "Contact & Workshop Location",
    path: "/contact",
    description: "Workshop address at 234-Vitt Bhavan near Gondal Road Flyover, phone numbers, email, working hours, and inquiry form.",
    category: "core",
    categoryLabel: "Core Pages",
    badge: "Workshop Support",
    iconName: "Phone",
  },

  // ── Specialized Services in Rajkot ──
  {
    id: "service-laptop-repair",
    title: "Laptop Repair in Rajkot",
    path: "/services/laptop-repair-rajkot",
    description: "Motherboard chip-level repairs, cracked hinge replacement, liquid spill recovery, and thermal cleaning for HP, Dell, Lenovo, Asus, and Acer.",
    category: "services",
    categoryLabel: "Services in Rajkot",
    badge: "Popular Service",
    iconName: "Laptop",
  },
  {
    id: "service-computer-repair",
    title: "Computer & Desktop PC Repair",
    path: "/services/computer-repair-rajkot",
    description: "Desktop diagnosis, SMPS power unit testing, motherboard micro-soldering, blue-screen troubleshooting, and custom PC builds.",
    category: "services",
    categoryLabel: "Services in Rajkot",
    badge: "Desktop PC",
    iconName: "Monitor",
  },
  {
    id: "service-ssd-upgrade",
    title: "High-Speed SSD Upgrade & Data Cloning",
    path: "/services/ssd-upgrade-rajkot",
    description: "Supercharge slow systems with NVMe M.2 and SATA SSDs, with 100% zero-data-loss cloning of Windows, personal files, and software.",
    category: "services",
    categoryLabel: "Services in Rajkot",
    badge: "Speed Overhaul",
    iconName: "Zap",
  },
  {
    id: "service-virus-removal",
    title: "Virus & Malware Removal",
    path: "/services/virus-removal-rajkot",
    description: "Deep disinfection of ransomware, spyware, adware, and trojans, corrupted registry restoration, and licensed antivirus installation.",
    category: "services",
    categoryLabel: "Services in Rajkot",
    badge: "Security",
    iconName: "ShieldCheck",
  },
  {
    id: "service-wifi-networking",
    title: "Wi-Fi Router Setup & Office Networking",
    path: "/services/wifi-router-setup-rajkot",
    description: "High-speed dual-band Wi-Fi router installation, CAT6 structured office cabling, network switch setup, and secure file sharing.",
    category: "services",
    categoryLabel: "Services in Rajkot",
    badge: "Networking",
    iconName: "Wifi",
  },

  // ── Hardware & Replacement Parts in Rajkot ──
  {
    id: "product-laptop-battery",
    title: "Laptop Battery Replacement in Rajkot",
    path: "/products/laptop-battery-rajkot",
    description: "Brand-new high-backup replacement laptop batteries for HP, Dell, Lenovo, Acer, and Asus with up to 1-year replacement warranty.",
    category: "products",
    categoryLabel: "Hardware & Parts",
    badge: "1-Yr Warranty",
    iconName: "BatteryCharging",
  },
  {
    id: "product-laptop-charger",
    title: "Original Laptop Chargers & Adapters",
    path: "/products/laptop-charger-rajkot",
    description: "Wattage-certified original laptop power adapters with correct voltage/amperage, surge protection, and multi-brand connector options.",
    category: "products",
    categoryLabel: "Hardware & Parts",
    badge: "Original Adapters",
    iconName: "Cable",
  },
  {
    id: "product-laptop-screen",
    title: "Laptop Screen Replacement in Rajkot",
    path: "/products/laptop-screen-replacement-rajkot",
    description: "Original FHD, IPS, and HD replacement display panels for cracked, flickering, or line-damaged screens with same-day fitting.",
    category: "products",
    categoryLabel: "Hardware & Parts",
    badge: "Display Panels",
    iconName: "Tv",
  },

  // ── Catalog Deep Anchors ──
  {
    id: "anchor-hard-disk",
    title: "Storage: Internal SSDs & Backup Drives",
    path: "/products#hard-disk",
    description: "NVMe M.2 SSDs, 2.5-inch SATA SSDs, and external high-capacity USB backup drives.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "HardDrive",
  },
  {
    id: "anchor-ram",
    title: "Memory: Laptop & Desktop RAM",
    path: "/products#ram",
    description: "High-speed DDR3, DDR4, and DDR5 RAM modules to eliminate multi-tasking bottlenecks.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "Cpu",
  },
  {
    id: "anchor-usb-mouse",
    title: "Peripherals: USB & Wireless Mice",
    path: "/products#usb-mouse",
    description: "Ergonomic wired and wireless optical mice designed for office and personal workstations.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "Mouse",
  },
  {
    id: "anchor-keyboard",
    title: "Peripherals: USB & Wireless Keyboards",
    path: "/products#keyboard",
    description: "Spill-resistant desktop keyboards and wireless combo units built for long hours.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "Keyboard",
  },
  {
    id: "anchor-laptop-charger",
    title: "Accessories: Laptop Chargers",
    path: "/products#laptop-charger",
    description: "Branded laptop power adapters with pin-diameter and voltage matching.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "Cable",
  },
  {
    id: "anchor-laptop-screen",
    title: "Accessories: Laptop Screens",
    path: "/products#laptop-screen",
    description: "Replacement display panels and resolution matching for laptop screens.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "Tv",
  },
  {
    id: "anchor-laptop-battery",
    title: "Accessories: Laptop Batteries",
    path: "/products#laptop-battery",
    description: "High-capacity lithium-ion replacement cells for all laptop brands.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "BatteryCharging",
  },
  {
    id: "anchor-laptop-keyboard",
    title: "Accessories: Laptop Keyboards",
    path: "/products#laptop-keyboard",
    description: "Internal replacement laptop keyboards for HP, Dell, Lenovo, Acer, and Asus.",
    category: "anchors",
    categoryLabel: "Catalog Sections",
    badge: "Catalog Section",
    iconName: "Keyboard",
  },

  // ── Technical & XML Feeds ──
  {
    id: "feed-sitemap-xml",
    title: "XML Sitemap Feed",
    path: "/sitemap.xml",
    description: "Machine-readable search engine index formatted for Google Search Console, Bing Webmaster, and search crawlers.",
    category: "feeds",
    categoryLabel: "Technical Feeds",
    badge: "XML Feed",
    badgeType: "xml",
    isExternalOrFile: true,
    iconName: "FileCode",
  },
  {
    id: "feed-robots-txt",
    title: "Robots Directives File",
    path: "/robots.txt",
    description: "Crawler instructions, crawl permissions, and canonical sitemap declaration for automated search bots.",
    category: "feeds",
    categoryLabel: "Technical Feeds",
    badge: "Robots Policy",
    badgeType: "xml",
    isExternalOrFile: true,
    iconName: "FileText",
  },
];

const CATEGORY_TABS = [
  { id: "all", label: "All Pages" },
  { id: "core", label: "Core Pages" },
  { id: "services", label: "Services in Rajkot" },
  { id: "products", label: "Hardware & Parts" },
  { id: "anchors", label: "Catalog Sections" },
  { id: "feeds", label: "Technical Feeds" },
];

function renderIcon(iconName: string, size = 20) {
  switch (iconName) {
    case "Home":
      return <Home size={size} />;
    case "Building2":
      return <Building2 size={size} />;
    case "Wrench":
      return <Wrench size={size} />;
    case "Package":
      return <Package size={size} />;
    case "FileSpreadsheet":
      return <FileSpreadsheet size={size} />;
    case "Phone":
      return <Phone size={size} />;
    case "Laptop":
      return <Laptop size={size} />;
    case "Monitor":
      return <Monitor size={size} />;
    case "Zap":
      return <Zap size={size} />;
    case "ShieldCheck":
      return <ShieldCheck size={size} />;
    case "Wifi":
      return <Wifi size={size} />;
    case "BatteryCharging":
      return <BatteryCharging size={size} />;
    case "Cable":
      return <Cable size={size} />;
    case "Tv":
      return <Tv size={size} />;
    case "HardDrive":
      return <HardDrive size={size} />;
    case "Cpu":
      return <Cpu size={size} />;
    case "Mouse":
      return <Mouse size={size} />;
    case "Keyboard":
      return <Keyboard size={size} />;
    case "FileCode":
      return <FileCode size={size} />;
    case "FileText":
      return <FileText size={size} />;
    default:
      return <Sparkles size={size} />;
  }
}

interface SitemapViewProps {
  initialQuoteEnabled: boolean;
}

export function SitemapView({ initialQuoteEnabled }: SitemapViewProps) {
  const [quoteEnabled, setQuoteEnabled] = useState<boolean>(initialQuoteEnabled);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Real-time synchronization with admin visibility toggle across browser tabs & windows
  useEffect(() => {
    let isMounted = true;

    // Check localStorage cache
    try {
      const cached = localStorage.getItem("konark_quote_enabled");
      if (cached !== null) {
        setQuoteEnabled(cached === "true");
      }
    } catch {}

    const syncQuoteSetting = () => {
      fetch("/api/settings/quote", { cache: "no-store" })
        .then((res) => res.json())
        .then((data) => {
          if (isMounted && typeof data.enabled === "boolean") {
            setQuoteEnabled(data.enabled);
            try {
              localStorage.setItem("konark_quote_enabled", String(data.enabled));
            } catch {}
          }
        })
        .catch(() => {});
    };

    // 1. Initial client fetch
    syncQuoteSetting();

    // 2. Custom event listener (immediate sync in same window)
    const handleCustomEvent = (e: any) => {
      if (typeof e.detail?.enabled === "boolean") {
        setQuoteEnabled(e.detail.enabled);
      }
    };
    window.addEventListener("konark:quote-visibility", handleCustomEvent);

    // 3. Storage event listener (sync across tabs in same browser)
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === "konark_quote_enabled" && e.newValue !== null) {
        setQuoteEnabled(e.newValue === "true");
      }
    };
    window.addEventListener("storage", handleStorageEvent);

    // 4. BroadcastChannel listener (low-latency cross-tab communication)
    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      bc = new BroadcastChannel("konark_settings_channel");
      bc.onmessage = (event) => {
        if (event.data?.type === "QUOTE_VISIBILITY_CHANGED" && typeof event.data.enabled === "boolean") {
          setQuoteEnabled(event.data.enabled);
        }
      };
    }

    return () => {
      isMounted = false;
      window.removeEventListener("konark:quote-visibility", handleCustomEvent);
      window.removeEventListener("storage", handleStorageEvent);
      if (bc) bc.close();
    };
  }, []);

  // Filter items dynamically based on current accessibility and user search
  const visibleItems = useMemo(() => {
    return ALL_SITEMAP_ITEMS.filter((item) => {
      // If an item requires the quote system to be enabled, check current setting
      if (item.requiresQuoteEnabled && !quoteEnabled) {
        return false;
      }
      return true;
    });
  }, [quoteEnabled]);

  const filteredItems = useMemo(() => {
    let result = visibleItems;

    if (activeCategory !== "all") {
      result = result.filter((item) => item.category === activeCategory);
    }

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.path.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.categoryLabel.toLowerCase().includes(q) ||
          (item.badge && item.badge.toLowerCase().includes(q))
      );
    }

    return result;
  }, [visibleItems, activeCategory, searchQuery]);

  // Group items by category for structured display
  const groupedSections = useMemo(() => {
    const groups: { [key: string]: { label: string; icon: string; items: SitemapItem[] } } = {
      core: { label: "Main Website Pages", icon: "Home", items: [] },
      services: { label: "Rajkot Computer & Laptop Services", icon: "Wrench", items: [] },
      products: { label: "Genuine Laptop Parts & Hardware in Rajkot", icon: "Package", items: [] },
      anchors: { label: "Hardware Catalog Categories (Direct Anchors)", icon: "HardDrive", items: [] },
      feeds: { label: "Technical & Search Engine Feeds", icon: "FileCode", items: [] },
    };

    filteredItems.forEach((item) => {
      if (groups[item.category]) {
        groups[item.category].items.push(item);
      }
    });

    return Object.entries(groups).filter(([_, group]) => group.items.length > 0);
  }, [filteredItems]);

  const countForCategory = (catId: string) => {
    if (catId === "all") return visibleItems.length;
    return visibleItems.filter((item) => item.category === catId).length;
  };

  return (
    <div className={styles.sitemapPage}>
      <div className={styles.sitemapContainer}>
        {/* ══════════ CONTROLS & STATUS CARD ══════════ */}
        <div className={styles.controlsHeader}>
          <div className={styles.controlsTopRow}>
            <div className={styles.statusGroup}>
              <span className={styles.statusPill}>
                <span className={styles.statusDot} />
                Live Dynamic Index
              </span>
              <span className={styles.pageCountBadge}>
                <strong className={styles.pageCountNumber}>{visibleItems.length}</strong> public &amp; accessible routes
              </span>
            </div>

            {quoteEnabled ? (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#047857",
                  background: "#ecfdf5",
                  border: "1px solid #a7f3d0",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <CheckCircle2 size={13} /> Quotation System Active (/quote)
              </span>
            ) : (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "#b45309",
                  background: "#fffbeb",
                  border: "1px solid #fde68a",
                  padding: "4px 10px",
                  borderRadius: "9999px",
                  fontWeight: 600,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <AlertCircle size={13} /> Quotation System Offline
              </span>
            )}
          </div>

          {/* Search Bar */}
          <div className={styles.searchWrap}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sitemap by keyword, slug, or service (e.g. 'SSD', 'battery', 'repair', 'quote')..."
              className={styles.searchInput}
              aria-label="Search sitemap pages"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className={styles.clearSearchBtn}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className={styles.categoryPills}>
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveCategory(tab.id)}
                className={`${styles.categoryPill} ${activeCategory === tab.id ? styles.categoryPillActive : ""}`}
              >
                <span>{tab.label}</span>
                <span className={styles.pillBadge}>{countForCategory(tab.id)}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ══════════ OFFLINE QUOTATION NOTICE ══════════ */}
        {!quoteEnabled && (
          <div className={styles.offlineNotice}>
            <AlertCircle size={20} className={styles.offlineNoticeIcon} />
            <div className={styles.offlineNoticeText}>
              <strong>Note:</strong> The interactive quotation builder (<code>/quote</code>) is temporarily offline for maintenance or inventory updates. For immediate hardware pricing and repair estimates, please{" "}
              <Link href="/contact" className={styles.offlineNoticeLink}>
                contact our workshop directly
              </Link>{" "}
              or call <a href={`tel:${BUSINESS.phone}`} className={styles.offlineNoticeLink}>{BUSINESS.phoneDisplay}</a>.
            </div>
          </div>
        )}

        {/* ══════════ VISUAL SITEMAP TREE ══════════ */}
        {groupedSections.length > 0 && (
        <nav className={styles.treePanel} aria-label="Website sitemap tree">
          <div className={styles.treeHeader}>
            <div>
              <span className={styles.treeEyebrow}>Browse structure</span>
              <h2 className={styles.treeTitle}>Complete Sitemap Tree</h2>
            </div>
            <span className={styles.treeHint}>Select any page to visit it</span>
          </div>

          <div className={styles.treeRoot}>
            <Link href="/" className={styles.treeRootLink}>
              <span className={styles.treeRootIcon}>{renderIcon("Home", 18)}</span>
              <span>
                <strong>Konark Computers</strong>
                <small>/</small>
              </span>
            </Link>

            <div className={styles.treeBranches}>
              {groupedSections.map(([catKey, group]) => (
                <div className={styles.treeBranch} key={`tree-${catKey}`}>
                  <div className={styles.treeBranchLabel}>
                    <span className={styles.treeBranchLine} aria-hidden="true" />
                    <span className={styles.treeBranchIcon}>{renderIcon(group.icon, 16)}</span>
                    <strong>{group.label}</strong>
                    <span className={styles.treeBranchCount}>{group.items.length}</span>
                  </div>

                  <div className={styles.treeLeaves}>
                    {group.items.map((item) => (
                      <Link
                        key={`tree-${item.id}`}
                        href={item.path}
                        target={item.isExternalOrFile ? "_blank" : undefined}
                        rel={item.isExternalOrFile ? "noopener noreferrer" : undefined}
                        className={styles.treeLeaf}
                      >
                        <ChevronRight size={14} aria-hidden="true" />
                        <span className={styles.treeLeafIcon}>{renderIcon(item.iconName, 15)}</span>
                        <span className={styles.treeLeafText}>
                          <span>{item.title}</span>
                          <small>{item.path}</small>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>
        )}

        {/* ══════════ SITEMAP SECTIONS ══════════ */}
        {groupedSections.length === 0 ? (
          <div className={styles.emptyState}>
            <h3 className={styles.emptyStateTitle}>No matching pages found</h3>
            <p>Try searching for a different keyword or switch the category filter to &ldquo;All Pages&rdquo;.</p>
          </div>
        ) : (
          groupedSections.map(([catKey, group]) => (
            <section key={catKey} className={styles.sectionBlock}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.sectionIcon}>{renderIcon(group.icon, 22)}</span>
                  <span>{group.label}</span>
                </h2>
                <span className={styles.sectionCount}>
                  {group.items.length} {group.items.length === 1 ? "page" : "pages"}
                </span>
              </div>

              {catKey === "anchors" ? (
                /* Compact Anchor Grid */
                <div className={styles.anchorsGrid}>
                  {group.items.map((item) => (
                    <Link key={item.id} href={item.path} className={styles.anchorCard}>
                      <span className={styles.anchorIcon}>{renderIcon(item.iconName, 18)}</span>
                      <div className={styles.anchorInfo}>
                        <div className={item.id} style={{ display: "none" }} />
                        <span className={styles.anchorName}>{item.title}</span>
                        <span className={styles.anchorSlug}>{item.path}</span>
                      </div>
                      <ArrowUpRight size={14} style={{ color: "var(--color-text-muted)", flexShrink: 0 }} />
                    </Link>
                  ))}
                </div>
              ) : (
                /* Standard Card Grid */
                <div className={styles.cardsGrid}>
                  {group.items.map((item) => {
                    const isLive = item.badgeType === "live";
                    const isXml = item.badgeType === "xml";
                    return (
                      <Link
                        key={item.id}
                        href={item.path}
                        target={item.isExternalOrFile ? "_blank" : undefined}
                        rel={item.isExternalOrFile ? "noopener noreferrer" : undefined}
                        className={`${styles.card} ${isLive ? styles.cardQuoteActive : ""}`}
                      >
                        <div className={styles.cardTopRow}>
                          <div className={styles.cardIconWrap}>{renderIcon(item.iconName, 20)}</div>
                          {item.badge && (
                            <span
                              className={`${styles.cardBadge} ${
                                isLive ? styles.cardBadgeLive : isXml ? styles.cardBadgeXml : ""
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>

                        <h3 className={styles.cardTitle}>{item.title}</h3>
                        <span className={styles.cardSlug}>{item.path}</span>
                        <p className={styles.cardDescription}>{item.description}</p>

                        <div className={styles.cardBottomAction}>
                          <span>{item.isExternalOrFile ? "Open Feed" : "Visit Page"}</span>
                          <ArrowUpRight size={14} className={styles.cardActionIcon} />
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </section>
          ))
        )}

        {/* ══════════ BOTTOM HELP / CONTACT CTA ══════════ */}
        <div className={styles.bottomHelpBox}>
          <div className={styles.bottomHelpText}>
            <h3>Looking for a specific repair or hardware part?</h3>
            <p>
              Konark Computers provides on-site and in-workshop repair services for laptops, desktop computers, Wi-Fi networking, and SSD upgrades across Rajkot since 1999.
            </p>
          </div>
          <div className={styles.bottomHelpActions}>
            <a href={`tel:${BUSINESS.phone}`} className="btn btn--accent">
              <Phone size={16} />
              Call: {BUSINESS.phoneDisplay}
            </a>
            <Link
              href="/contact"
              className="btn btn--ghost"
              style={{ color: "var(--color-surface)", borderColor: "rgba(245, 240, 232, 0.3)" }}
            >
              Workshop Location &amp; Directions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
