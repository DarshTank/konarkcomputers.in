import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import {
  Wrench,
  BarChart3,
  Stethoscope,
  Bug,
  Wifi,
  MessageCircle,
  Phone,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Computer repair, laptop servicing, networking, virus removal, speed optimization, and 24/7 IT support by Konark Computers Rajkot.",
};

const services = [
  {
    icon: <Wrench size={28} />,
    title: "Setup & Installation",
    description:
      "Comprehensive online support to set-up and install various devices with latest software updates and repair compatibility issues.",
    color: "var(--color-accent)",
  },
  {
    icon: <BarChart3 size={28} />,
    title: "Speed & Optimization",
    description:
      "Installation of critical updates and security patches. We clear temporary files, startup files, unused files, and remove malware/adware.",
    color: "var(--color-teal)",
  },
  {
    icon: <Stethoscope size={28} />,
    title: "Diagnosis & Repair",
    description:
      "Instant diagnostic and repair services for computers and laptops. Whether running slowly or recently crashed, we get you back on track.",
    color: "var(--color-accent)",
  },
  {
    icon: <Bug size={28} />,
    title: "Virus & Spyware Removal",
    description:
      "Round-the-clock protection from viruses, spyware, hacking, phishing, browser hijack, and malware. Regular virus scans scheduled.",
    color: "var(--color-teal)",
  },
  {
    icon: <Wifi size={28} />,
    title: "Wireless Networks",
    description:
      "Configure your wireless router and adapter, secure your network, and show you how to prevent any vulnerabilities.",
    color: "var(--color-accent)",
  },
  {
    icon: <MessageCircle size={28} />,
    title: "24×7 Quick Response",
    description:
      "Certified engineers with required parts, local spare parts inventory, rapid fix and restoration with minimal downtime.",
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
        title="Our Services"
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
              <span className="section-header__label">What We Offer</span>
              <h2 className="section-header__title">
                Our Awesome Services
              </h2>
              <p className="section-header__subtitle">
                Comprehensive IT support and repair services for all your
                technology needs.
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
                  <a href="tel:+919426429416" className={styles.servicePhone}>
                    <Phone size={16} />
                    Call for service
                  </a>
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
                Do you have any question? Feel free to contact us.
              </h2>
              <Link href="/contact" className="btn btn--primary" style={{ background: "var(--color-dark)", color: "var(--color-surface)" }}>
                Request for Quote
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
              <span className="section-header__label">Authorized Support</span>
              <h2 className="section-header__title">
                Service Center Details
              </h2>
              <p className="section-header__subtitle">
                Direct toll-free support links for major laptop manufacturers.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.brandGrid}>
            {brands.map((brand, i) => (
              <AnimatedSection key={brand.name} delay={i * 100}>
                <div className={styles.brandCard}>
                  <div className={styles.brandLogo}>
                    <img src={brand.logo} alt={`${brand.name} Support`} className={styles.brandImg} />
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
