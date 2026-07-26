import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import {
  HardDrive,
  Cpu,
  Mouse,
  Keyboard,
  BatteryCharging,
  Monitor,
  Battery,
  ArrowRight,
} from "lucide-react";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Computer accessories and laptop parts — Hard Disk, RAM, Mouse, Keyboard, Laptop Charger, Screen, Battery by Konark Computers Rajkot.",
};

const products = [
  {
    name: "Hard Disk",
    image: "/harddisk.jpg",
    description: "Internal & external drives for desktops and laptops",
    category: "Storage",
  },
  {
    name: "RAM",
    image: "/Ram.jpg",
    description: "Memory upgrades for faster system performance",
    category: "Memory",
  },
  {
    name: "USB Mouse",
    image: "/moush.jpg",
    description: "Wired and wireless mice from top brands",
    category: "Peripherals",
  },
  {
    name: "Keyboard",
    image: "/keybord.jpg",
    description: "USB and wireless keyboards for all setups",
    category: "Peripherals",
  },
  {
    name: "Laptop Charger",
    image: "/gallery_1.jpg",
    description: "Original and compatible chargers for all laptop brands",
    category: "Laptop Parts",
  },
  {
    name: "Laptop Screen",
    image: "/leptopscrren.jpg",
    description: "LCD and LED replacement screens for all models",
    category: "Laptop Parts",
  },
  {
    name: "Laptop Battery",
    image: "/leptopbattry.jpg",
    description: "Genuine and compatible batteries for extended life",
    category: "Laptop Parts",
  },
  {
    name: "Laptop Keyboard",
    image: "/leptopkey.jpg",
    description: "Replacement keyboards for all laptop brands",
    category: "Laptop Parts",
  },
];

export default function ProductsPage() {
  return (
    <>
      <PageHero
        title="Our Products"
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
              <span className="section-header__label">What We Sell</span>
              <h2 className="section-header__title">
                Quality Computer Parts & Accessories
              </h2>
              <p className="section-header__subtitle">
                Genuine and compatible parts for all major laptop and desktop
                brands at competitive prices.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.productGrid}>
            {products.map((product, i) => (
              <AnimatedSection key={product.name} delay={i * 70}>
                <div className={styles.productCard}>
                  <span className={styles.productCategory}>
                    {product.category}
                  </span>
                  <div className={styles.productImageWrap}>
                    <img src={product.image} alt={product.name} className={styles.productImg} />
                  </div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDesc}>{product.description}</p>
                  <a href="tel:+919426429416" className={styles.productCta}>
                    Enquire Now
                    <ArrowRight size={14} />
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
                Looking for a specific part? Request a quote today.
              </h2>
              <Link href="/contact" className="btn btn--primary" style={{ background: "var(--color-dark)", color: "var(--color-surface)" }}>
                Request for Quote
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
