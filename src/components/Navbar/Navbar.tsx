"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, Clock } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { PUBLIC_QUOTES_TEMPORARILY_DISABLED } from "@/lib/feature-flags";
import styles from "./Navbar.module.css";

const baseNavLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/quote", label: "Get a Quote", isQuote: true },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [quoteEnabled, setQuoteEnabled] = useState<boolean>(true);
  const pathname = usePathname();

  useEffect(() => {
    let isMounted = true;

    // Immediately read from localStorage on mount (client-side only, prevents SSR hydration mismatch)
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

    // 1. Initial sync from server
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

    // 4. BroadcastChannel listener (instant low-latency cross-tab communication)
    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== "undefined") {
      bc = new BroadcastChannel("konark_settings_channel");
      bc.onmessage = (event) => {
        if (event.data?.type === "QUOTE_VISIBILITY_CHANGED" && typeof event.data.enabled === "boolean") {
          setQuoteEnabled(event.data.enabled);
        }
      };
    }

    // 5. Polling every 2.5s for instant multi-client/cross-device sync without refresh
    const pollInterval = setInterval(syncQuoteSetting, 2500);

    return () => {
      isMounted = false;
      window.removeEventListener("konark:quote-visibility", handleCustomEvent);
      window.removeEventListener("storage", handleStorageEvent);
      if (bc) bc.close();
      clearInterval(pollInterval);
    };
  }, [pathname]);

  const navLinks = baseNavLinks.filter(
    (link) => !link.isQuote || (!PUBLIC_QUOTES_TEMPORARILY_DISABLED && quoteEnabled)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Top Info Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarInner}`}>
          <div className={styles.topBarItem}>
            <MapPin size={14} />
            <a
              href={BUSINESS.googleMapsPlaceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {BUSINESS.address.street}, {BUSINESS.address.city}
            </a>
          </div>
          <div className={styles.topBarItem}>
            <Phone size={14} />
            <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
          </div>
          <div className={styles.topBarItem}>
            <Clock size={14} />
            <span>{BUSINESS.hoursDisplay}</span>
          </div>
          <div className={styles.topBarBadge}>
            <img src="/MSME-e1452579997430.png" alt="MSME Registered" className={styles.msmeImg} />
            <span>MSME Govt. Reg.</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" className={styles.logo} aria-label="Konark Computers Home">
            <img src="/kon.webp" alt="Konark Computers Emblem" className={styles.logoImg} />
            <div className={styles.logoText}>
              <span className={styles.logoName}>Konark</span>
              <span className={styles.logoSub}>Computers</span>
            </div>
          </Link>

          <nav className={styles.nav} aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.navLink} ${
                  pathname === link.href ? styles.active : ""
                }`}
              >
                {link.label}
                <span className={styles.navUnderline} />
              </Link>
            ))}
          </nav>

          <div className={styles.headerActions}>
            <a
              href="https://www.google.com/maps?ll=22.277962,70.798489&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=1162576568112931297"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapBtn}
              aria-label="Google Maps Office Location"
              title="View Office Location on Google Maps"
            >
              <MapPin size={14} />
              <span>Location</span>
            </a>

            <a href="tel:+919426429416" className={`btn btn--primary ${styles.ctaBtn}`}>
              <Phone size={14} />
              Call Now
            </a>
          </div>

          <button
            className={styles.menuBtn}
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.drawerOverlay} onClick={() => setIsOpen(false)} />
        <nav className={styles.drawerContent} aria-label="Mobile navigation">
          <div className={styles.drawerHeader}>
            <div className={styles.logo}>
              <img src="/kon.webp" alt="Konark Computers Emblem" className={styles.drawerLogoImg} />
              <div className={styles.logoText}>
                <span className={styles.logoName}>Konark</span>
                <span className={styles.logoSub}>Computers</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X size={24} />
            </button>
          </div>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.drawerLink} ${
                pathname === link.href ? styles.active : ""
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.drawerContact}>
            <a
              href="https://www.google.com/maps?ll=22.277962,70.798489&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=1162576568112931297"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--outline"
              style={{ width: "100%", marginBottom: "var(--space-3)", color: "var(--color-dark)", borderColor: "var(--color-border)" }}
            >
              <MapPin size={16} />
              Office Location
            </a>
            <a href="tel:+919426429416" className="btn btn--primary" style={{ width: "100%" }}>
              <Phone size={16} />
              +91 942 642 9416
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
