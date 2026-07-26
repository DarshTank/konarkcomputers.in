import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Facebook, ArrowRight } from "lucide-react";
import styles from "./Footer.module.css";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const products = [
  "Hard Disk",
  "RAM",
  "USB Mouse",
  "USB Keyboard",
  "Laptop Charger",
  "Laptop Screen",
  "Laptop Battery",
  "Laptop Keyboard",
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
            <img src="/kon.webp" alt="Konark Computers" className={styles.footerLogoImg} />
            <div className={styles.logoText}>
              <span className={styles.logoName}>Konark</span>
              <span className={styles.logoSub}>Computers</span>
            </div>
          </div>
          <p className={styles.aboutText}>
            Trusted computer & laptop repair, IT services, and maintenance since
            1999. Providing customized service-level maintenance programs with
            full on-site support for servers, desktops, printers and networks.
          </p>
          <div className={styles.footerBadges}>
            <img src="/MSME-e1452579997430.png" alt="MSME Registered" className={styles.footerBadgeImg} />
            <a
              href="https://threebestrated.in/computer-repair-services-in-rajkot-gj"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.badgeLink}
              title="ThreeBestRated - Top 3 Computer Repair Services in Rajkot"
            >
              <img src="/4.png" alt="Three Best Rated" className={styles.footerBadgeImg} />
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
              <span>
                234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot 360002,
                Gujarat, India
              </span>
            </li>
            <li>
              <Phone size={16} className={styles.contactIcon} />
              <a href="tel:+919426429416">+91 942 642 9416</a>
            </li>
            <li>
              <Mail size={16} className={styles.contactIcon} />
              <a href="mailto:omesh_tank@yahoo.com">omesh_tank@yahoo.com</a>
            </li>
            <li>
              <Clock size={16} className={styles.contactIcon} />
              <span>Mon – Sat: 9:00 AM – 9:00 PM</span>
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
              href="https://www.facebook.com/Konark.Computers/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialBtn}
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Products */}
        <div className={styles.column}>
          <h3 className={styles.columnTitle}>Products</h3>
          <ul className={styles.linkList}>
            {products.map((product) => (
              <li key={product}>
                <Link href="/products" className={styles.footerLink}>
                  <ArrowRight size={14} />
                  {product}
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
          <span className={styles.credit}>Est. 1999 — Rajkot, Gujarat</span>
        </div>
      </div>
    </footer>
  );
}
