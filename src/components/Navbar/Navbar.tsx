"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, MapPin, Clock } from "lucide-react";
import styles from "./Navbar.module.css";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Company" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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
              href="https://www.google.com/maps?ll=22.277962,70.798489&z=14&t=m&hl=en-US&gl=US&mapclient=embed&cid=1162576568112931297"
              target="_blank"
              rel="noopener noreferrer"
            >
              234-Vitt Bhavan, Gondal Road, Rajkot
            </a>
          </div>
          <div className={styles.topBarItem}>
            <Phone size={14} />
            <a href="tel:+919426429416">+91 942 642 9416</a>
          </div>
          <div className={styles.topBarItem}>
            <Clock size={14} />
            <span>Mon – Sat: 9:00 AM – 9:00 PM</span>
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
