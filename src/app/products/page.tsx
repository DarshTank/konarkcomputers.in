import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { PageHero } from "@/components/PageHero/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import { ArrowRight, Phone, Plus } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { isQuoteEnabled } from "@/lib/db/settings";
import styles from "./page.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Laptop Battery, Charger, Screen & Computer Parts in Rajkot",
  description: `Genuine laptop parts & accessories in Rajkot by Konark Computers. Battery, charger, screen, RAM & SSD with warranty. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/products",
  },
  openGraph: {
    title: "Laptop Battery, Charger, Screen & Computer Parts in Rajkot",
    description: `Genuine laptop parts & accessories in Rajkot by Konark Computers. Battery, charger, screen, RAM & SSD with warranty. Call ${BUSINESS.phoneDisplay}.`,
    url: "/products",
  },
};

const products = [
  {
    id: "hard-disk",
    name: "Hard Disk & Solid State Drives (SSD)",
    image: "/harddisk.jpg",
    description:
      "High-speed internal SATA SSDs, ultra-fast NVMe M.2 drives, and high-capacity external backup drives in Rajkot. Upgrading from a mechanical hard drive to an SSD speeds up laptop boot time and daily application response by up to 10x. Compatible with Dell, HP, Lenovo, Asus, and custom PCs.",
    category: "Storage",
    landingHref: null,
  },
  {
    id: "ram",
    name: "RAM (System Memory)",
    image: "/Ram.jpg",
    description:
      "High-performance DDR3, DDR4, and DDR5 RAM modules for laptops and desktop computers across Rajkot. Adding extra memory eliminates multitasking bottlenecks, reduces system stutter, and delivers smooth performance for accounting, office software, and multimedia.",
    category: "Memory",
    landingHref: null,
  },
  {
    id: "usb-mouse",
    name: "USB & Wireless Mouse",
    image: "/moush.jpg",
    description:
      "Ergonomic wired USB optical mice and wireless mice from leading brands. Designed for comfortable palm support during long office hours, responsive optical tracking, and durable click longevity for home and business workstations in Rajkot.",
    category: "Peripherals",
    landingHref: null,
  },
  {
    id: "keyboard",
    name: "USB & Wireless Keyboard",
    image: "/keybord.jpg",
    description:
      "Tactile USB desktop keyboards and wireless combo units built for dependable everyday typing. Featuring clear lettering, responsive membrane switches, and spill-resistant construction suited for retail billing, offices, and students in Rajkot.",
    category: "Peripherals",
    landingHref: null,
  },
  {
    id: "laptop-charger",
    name: "Laptop Charger & Power Adapters",
    image: "/gallery_1.jpg",
    description:
      "Certified original and high-compatibility laptop chargers with built-in surge protection and replacement warranty in Rajkot. We stock round barrel tips, slim tips, and USB Type-C chargers for HP, Dell, Lenovo, Asus, and Acer laptops.",
    category: "Laptop Parts",
    landingHref: "/products/laptop-charger-rajkot",
    landingLabel: "View charger details & stock",
  },
  {
    id: "laptop-screen",
    name: "Laptop Screen & Display Panels",
    image: "/leptopscrren.jpg",
    description:
      "Original Grade-A LED and LCD laptop replacement screens in Rajkot. We replace cracked, ink-bleeding, or flickering screens across all standard sizes including 14.0-inch and 15.6-inch HD and Full HD IPS panels with warranty.",
    category: "Laptop Parts",
    landingHref: "/products/laptop-screen-replacement-rajkot",
    landingLabel: "View screen replacement service",
  },
  {
    id: "laptop-battery",
    name: "Laptop Battery Replacement",
    image: "/leptopbattry.jpg",
    description:
      "Genuine and high-capacity replacement laptop batteries with warranty for extended operating life in Rajkot. Engineered with grade-A lithium cells and safety overcharge protection for Dell, HP, Lenovo, Acer, and Asus laptops.",
    category: "Laptop Parts",
    landingHref: "/products/laptop-battery-rajkot",
    landingLabel: "View battery replacement details",
  },
  {
    id: "laptop-keyboard",
    name: "Laptop Replacement Keyboard",
    image: "/leptopkey.jpg",
    description:
      "Direct-fit OEM replacement keyboards for laptops in Rajkot. Resolve unresponsive keys, liquid spill faults, or broken keycaps across Dell Inspiron, HP Pavilion, Lenovo IdeaPad, Acer Aspire, and Asus laptops with replacement warranty.",
    category: "Laptop Parts",
    landingHref: null,
  },
];

export default async function ProductsPage() {
  const quoteEnabled = await isQuoteEnabled();
  return (
    <>
      <PageHero
        title="Laptop Battery, Charger, Screen & Computer Parts in Rajkot"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Products" },
        ]}
      />

      {/* ══════════ PRODUCTS GRID ══════════ */}
      <section className={`section ${styles.products}`}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">Hardware Catalog</span>
              <h2 className="section-header__title">
                Quality Computer Parts &amp; Accessories in Rajkot
              </h2>
              <p className="section-header__subtitle">
                Genuine and compatible parts for all major laptop and desktop brands with warranty support at our Gondal Road workshop.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.productGrid}>
            {products.map((product, i) => (
              <AnimatedSection key={product.id} delay={i * 70}>
                <div className={styles.productCard} id={product.id}>
                  <span className={styles.productCategory}>
                    {product.category}
                  </span>
                  <div className={styles.productImageWrap}>
                    <Image
                      src={product.image}
                      alt={`${product.name} available at Konark Computers Rajkot`}
                      width={400}
                      height={300}
                      loading="lazy"
                      className={styles.productImg}
                    />
                  </div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
                    {product.landingHref && (
                      <Link
                        href={product.landingHref}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "var(--space-1)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-teal)",
                          fontWeight: 600,
                        }}
                      >
                        {product.landingLabel}
                        <ArrowRight size={12} />
                      </Link>
                    )}
                    {quoteEnabled ? (
                      <Link
                        href="/quote"
                        className="btn btn--primary"
                        style={{
                          padding: "8px 16px",
                          minHeight: "36px",
                          fontSize: "var(--text-xs)",
                          width: "100%",
                          gap: "6px",
                        }}
                      >
                        <Plus size={14} />
                        Add to quote
                      </Link>
                    ) : (
                      <Link
                        href="/contact"
                        className="btn btn--outline"
                        style={{
                          padding: "8px 16px",
                          minHeight: "36px",
                          fontSize: "var(--text-xs)",
                          width: "100%",
                          gap: "6px",
                          color: "var(--color-dark)",
                          borderColor: "var(--color-border)",
                        }}
                      >
                        Inquire Availability
                        <ArrowRight size={12} />
                      </Link>
                    )}
                    <a href={`tel:${BUSINESS.phone}`} className={styles.productCta}>
                      <Phone size={14} />
                      Call: {BUSINESS.phoneDisplay}
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
                {quoteEnabled
                  ? "Need an immediate formal estimate? Build your quote online."
                  : "Need hardware pricing or laptop replacement parts in Rajkot?"}
              </h2>
              {quoteEnabled ? (
                <Link
                  href="/quote"
                  className="btn btn--primary"
                  style={{ background: "var(--color-dark)", color: "var(--color-surface)" }}
                >
                  Instant Quotation Builder
                  <ArrowRight size={16} />
                </Link>
              ) : (
                <Link
                  href="/contact"
                  className="btn btn--primary"
                  style={{ background: "var(--color-dark)", color: "var(--color-surface)" }}
                >
                  Contact Workshop
                  <ArrowRight size={16} />
                </Link>
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
