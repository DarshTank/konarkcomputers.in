import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube, ArrowRight } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "All Services" },
  { href: "/services/laptop-repair-rajkot", label: "Laptop Repair Rajkot" },
  { href: "/services/computer-repair-rajkot", label: "Computer Repair Rajkot" },
  { href: "/products", label: "Parts Catalog" },
  { href: "/contact", label: "Contact & Location" },
];

const productLinks = [
  { label: "Hard Disk & SSD", href: "/products#hard-disk" },
  { label: "RAM Memory", href: "/products#ram" },
  { label: "USB Mouse", href: "/products#usb-mouse" },
  { label: "USB Keyboard", href: "/products#keyboard" },
  { label: "Laptop Charger", href: "/products#laptop-charger" },
  { label: "Laptop Screen", href: "/products#laptop-screen" },
  { label: "Laptop Battery", href: "/products#laptop-battery" },
  { label: "Laptop Keyboard", href: "/products#laptop-keyboard" },
];

export function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Accent border */}
      <div className={styles.accentBorder} />

      <div className={`container ${styles.footerGrid}`}>
        {/* About Column */}
        <div className={styles.column}>
          <div className={styles.footerLogo}>
            <img
              src="/kon.webp"
              alt="Konark Computers Emblem"
              loading="lazy"
              className={styles.footerLogoImg}
            />
            <div className={styles.logoText}>
              <span className={styles.logoName}>Konark</span>
              <span className={styles.logoSub}>Computers</span>
            </div>
          </div>
          <p className={styles.aboutText}>
            Trusted computer &amp; laptop repair, IT services, and maintenance since
            1999. Providing customized service-level maintenance programs with
            full on-site support for servers, desktops, printers and networks across Rajkot.
          </p>
          <div className={styles.footerBadges}>
            <img
              src="/MSME-e1452579997430.png"
              alt="MSME Government Registered Enterprise"
              loading="lazy"
              className={styles.footerBadgeImg}
            />
            <a
              href="https://threebestrated.in/computer-repair-services-in-rajkot-gj"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.badgeLink}
              title="ThreeBestRated - Top 3 Computer Repair Services in Rajkot"
            >
              <img
                src="/4.png"
                alt="ThreeBestRated - Top 3 Computer Repair in Rajkot"
                loading="lazy"
                className={styles.footerBadgeImg}
              />
            </a>
          </div>
          <Link href="/about" className={`btn btn--ghost ${styles.readMore}`}>
            Read more
          </Link>
        </div>

        {/* Contact Info */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Contact Info</h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={16} className={styles.contactIcon} />
              <span>{BUSINESS.address.full}</span>
            </li>
            <li>
              <Phone size={16} className={styles.contactIcon} />
              <a href={`tel:${BUSINESS.phone}`}>{BUSINESS.phoneDisplay}</a>
            </li>
            <li>
              <Mail size={16} className={styles.contactIcon} />
              <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
            </li>
            <li>
              <Clock size={16} className={styles.contactIcon} />
              <span>{BUSINESS.hoursDisplay}</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Quick Links</h3>
          <ul className={styles.linkList}>
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.footerLink}>
                  <ArrowRight size={14} />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className={styles.columnTitle} style={{ marginTop: "var(--space-8)" }}>
            Follow Us
          </h3>
          <div className={styles.socialLinks}>
            <a
              href={BUSINESS.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Facebook"
              title="Konark Computers on Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Instagram"
              title="Konark Computers on Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href={BUSINESS.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="YouTube"
              title="Konark Computers on YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Products */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Parts &amp; Accessories</h3>
          <ul className={styles.linkList}>
            {productLinks.map((product) => (
              <li key={product.href}>
                <Link href={product.href} className={styles.footerLink}>
                  <ArrowRight size={14} />
                  {product.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomBarInner}`}>
          <span>© {new Date().getFullYear()} Konark Computers. All Rights Reserved.</span>
          <span className={styles.credit}>
            Est. 1999 — Rajkot, Gujarat &nbsp;•&nbsp; Developed by{' '}
            <a
              href="https://www.darshtank.in"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.devLink}
            >
              Darsh Tank
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
