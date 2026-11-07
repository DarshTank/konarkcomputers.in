import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import {
  Wrench,
  BarChart3,
  Stethoscope,
  Bug,
  Wifi,
  Clock,
  Phone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Laptop Repair, Virus Removal & Networking in Rajkot",
  description: `Computer repair, laptop servicing, virus removal & networking in Rajkot by Konark Computers. Over ${YEARS_OF_EXPERIENCE} yrs expertise. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Laptop Repair, Virus Removal & Networking in Rajkot",
    description: `Computer repair, laptop servicing, virus removal & networking in Rajkot by Konark Computers. Over ${YEARS_OF_EXPERIENCE} yrs expertise. Call ${BUSINESS.phoneDisplay}.`,
    url: "/services",
  },
};

const services = [
  {
    icon: <Wrench size={28} />,
    title: "Setup & Installation",
    description:
      "Comprehensive on-site and remote setup for desktop computers, business laptops, and office peripherals across Rajkot. We install genuine operating systems, drivers, and security patches while resolving software and hardware compatibility issues. Our engineers configure local workstations to ensure seamless everyday workflow for corporate offices and home users alike.",
    landingHref: "/services/computer-repair-rajkot",
    landingText: "Computer repair details",
    color: "var(--color-accent)",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Speed & Optimization",
    description:
      "If your computer or laptop takes minutes to boot or stutters during routine multitasking, our system tuning restores snappy responsiveness. We clear temporary system caches, clean startup bloatware, fix corrupted registry keys, and eliminate hidden adware. For older systems, we install high-speed SSDs and dual-channel RAM upgrades in Rajkot that deliver instant performance boosts.",
    landingHref: "/services/ssd-upgrade-rajkot",
    landingText: "SSD upgrade details",
    color: "var(--color-teal)",
  },
  {
    icon: <Stethoscope size={28} />,
    title: "Diagnosis & Repair",
    description:
      "Instant diagnostic and precision repair services for computers and laptops in Rajkot. Whether your device suffered a sudden motherboard power short, broken display hinges, overheating fan failure, or liquid spill, our workshop near Gondal Road Flyover isolates micro-circuit faults accurately. We service all major brands including HP, Dell, Lenovo, Asus, and Acer with honest estimates.",
    landingHref: "/services/laptop-repair-rajkot",
    landingText: "Laptop repair details",
    color: "var(--color-accent)",
  },
  {
    icon: <Bug size={28} />,
    title: "Virus & Spyware Removal",
    description:
      "Thorough malware eradication and data protection for computers across Rajkot. We safely remove aggressive trojans, spyware, ransomware, browser hijackers, and deceptive adware without losing your business records or personal files. Our technicians configure active firewall protections, update system security patches, and schedule regular scans so your computer remains protected against future network threats.",
    landingHref: "/services/virus-removal-rajkot",
    landingText: "Virus removal details",
    color: "var(--color-teal)",
  },
  {
    icon: <Wifi size={28} />,
    title: "Wireless Networks",
    description:
      "Professional WiFi setup, router configuration, and office network management in Rajkot. We configure dual-band wireless routers, expand coverage with mesh access points to eliminate dead zones, and secure your network with modern WPA2/WPA3 encryption. Our team also sets up structured LAN cabling, shared network printers, and network attached storage (NAS) for office teams.",
    landingHref: "/services/wifi-router-setup-rajkot",
    landingText: "WiFi setup details",
    color: "var(--color-accent)",
  },
  {
    icon: <Clock size={28} />,
    title: "Quick Response Service",
    // TODO(owner): Confirm if any 24/7 emergency service is offered.
    description:
      "Certified repair engineers with prompt on-site support across Rajkot. Operating Monday through Saturday from 9:00 AM to 9:00 PM, we maintain an extensive inventory of local spare parts including laptop screens, batteries, chargers, and keyboards to restore your damaged device rapidly with minimal downtime for your business or study.",
    landingHref: "/contact",
    landingText: "Contact workshop",
    color: "var(--color-teal)",
  },
];

const brands = [
  {
    name: "Asus",
    logo: "/Asus.jpg",
    tollFree: "1800 209 0365",
    tel: "18002090365",
    url: "https://www.asus.com/in/support/",
  },
  {
    name: "Lenovo",
    logo: "/lenovo.jpg",
    tollFree: "1800 3000 9990",
    tel: "180030009990",
    url: "https://pcsupport.lenovo.com/in/en/",
  },
  {
    name: "Dell",
    logo: "/dell.jpg",
    tollFree: "1800 425 2069",
    tel: "18004252069",
    url: "https://www.dell.com/support/home/en-in",
  },
  {
    name: "HP",
    logo: "/hp.jpg",
    tollFree: "1800 114 772",
    tel: "1800114772",
    url: "https://support.hp.com/in-en",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Laptop Repair, Virus Removal & Networking in Rajkot"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      {/* ══════════ SERVICES GRID ══════════ */}
      <section className={`section ${styles.services}`}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">Comprehensive IT Care</span>
              <h2 className="section-header__title">
                Computer &amp; Laptop Services in Rajkot
              </h2>
              <p className="section-header__subtitle">
                Reliable doorstep and workshop repair solutions for all major brands, delivered by certified technicians with {YEARS_OF_EXPERIENCE}+ years of experience.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.serviceGrid}>
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 80}>
                <div className={styles.serviceCard}>
                  <div
                    className={styles.serviceIcon}
                    style={{ color: service.color, background: `${service.color}15` }}
                  >
                    {service.icon}
                  </div>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDesc}>{service.description}</p>
                  <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    <Link
                      href={service.landingHref}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "var(--space-1)",
                        fontSize: "var(--text-sm)",
                        color: "var(--color-teal)",
                        fontWeight: 600,
                      }}
                    >
                      {service.landingText}
                      <ArrowRight size={14} />
                    </Link>
                    <a href={`tel:${BUSINESS.phone}`} className={styles.servicePhone}>
                      <Phone size={16} />
                      Call {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA ══════════ */}
      <section className={`section--accent ${styles.cta}`}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>
                Do you have any questions? Feel free to contact us in Rajkot.
              </h2>
              <Link
                href="/contact"
                className="btn btn--primary"
                style={{ background: "var(--color-dark)", color: "var(--color-surface)" }}
              >
                Request a Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════ BRAND SUPPORT ══════════ */}
      <section className={`section section--dark circuit-pattern ${styles.brands}`}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">Brand Resources</span>
              <h2 className="section-header__title">
                Manufacturer Support Directory
              </h2>
              <p className="section-header__subtitle">
                Official toll-free support links for major laptop brands serviced at our Rajkot workshop.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.brandGrid}>
            {brands.map((brand, i) => (
              <AnimatedSection key={brand.name} delay={i * 100}>
                <div className={styles.brandCard}>
                  <div className={styles.brandLogo}>
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} authorized support directory for Rajkot`}
                      width={140}
                      height={60}
                      loading="lazy"
                      className={styles.brandImg}
                    />
                  </div>
                  <div className={styles.brandInfo}>
                    <span className={styles.brandLabel}>Toll Free</span>
                    <a href={`tel:${brand.tel}`} className={styles.brandPhone}>
                      {brand.tollFree}
                    </a>
                  </div>
                  <a
                    href={brand.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.brandLink}
                  >
                    {brand.name} Support
                    <ExternalLink size={14} />
                  </a>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
