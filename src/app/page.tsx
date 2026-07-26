"use client";

import Link from "next/link";
import {
  Phone,
  Monitor,
  MessageSquare,
  Wrench,
  Wifi,
  ArrowRight,
  Zap,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import { ClientsCarousel } from "@/components/ClientsCarousel/ClientsCarousel";
import { GoogleReviews } from "@/components/GoogleReviews/GoogleReviews";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";
import styles from "./page.module.css";

const highlights = [
  {
    icon: <Monitor size={32} />,
    title: "Welcome",
    description:
      "We resolve all types of computer and laptop problems and improve speed and performance. Our technicians provide support for all brands — HP, Dell, Lenovo, Asus, Sony, Acer, Samsung and Toshiba.",
  },
  {
    icon: <Wifi size={32} />,
    title: "Networking",
    description:
      "We configure your wireless router, secure your network, and show you how to use it safely — preventing vulnerabilities and keeping your office connected.",
  },
  {
    icon: <MessageSquare size={32} />,
    title: "Consulting",
    description:
      "Worried about technology reliability? Confused about what you need? We answer all your technology questions so you can focus on growing your business.",
  },
  {
    icon: <Wrench size={32} />,
    title: "Service",
    description:
      "Fast doorstep support — critical inspection for defects, virus checking, system tuning, software conflicts, and internet browsing errors resolved.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Damaged\nDevice",
    description: "Stay relaxed when your device needs to be fixed. No panic.",
  },
  {
    number: "02",
    title: "Send to\nUs",
    description: "Send the device to us and stay relaxed. We handle the rest.",
  },
  {
    number: "03",
    title: "Fast\nFix",
    description: "We take care of it and work to fix it accurately and swiftly.",
  },
  {
    number: "04",
    title: "Quick\nReturn",
    description: "After a quick fix, we return it to you fast and securely.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className={styles.hero}>
        <div className={styles.heroGrid} />
        <div className={styles.heroGlow} />
        <div className={`container ${styles.heroContent}`}>
          <AnimatedSection delay={100}>
            <span className={styles.heroBadge}>
              TRUSTED SINCE 1999
            </span>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <h1 className={styles.heroTitle}>
              We Tell You
              <br />
              <span className={styles.heroTitleAccent}>What&apos;s Actually Wrong,</span>
              <br />
              First.
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={350}>
            <p className={styles.heroSubtitle}>
              Master computer &amp; laptop repair, chip-level diagnostics, and dedicated IT maintenance with {YEARS_OF_EXPERIENCE}+ years of trusted service across Rajkot.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={500}>
            <div className={styles.heroCtas}>
              <a href="tel:+919426429416" className="btn btn--primary">
                <Phone size={18} />
                Call Now
              </a>
              <Link href="/services" className="btn btn--outline">
                Our Services
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════ HIGHLIGHTS ══════════ */}
      <section className={`section ${styles.highlights}`}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">What We Do</span>
              <h2 className="section-header__title">
                Fast and Easy Support at Your Doorstep
              </h2>
              <p className="section-header__subtitle">
                Online and on-site support for your computer and laptop — all
                brands, all problems, all solved.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.highlightGrid}>
            {highlights.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 100}>
                <div className={styles.highlightCard}>
                  <div className={styles.highlightIcon}>{item.icon}</div>
                  <h3 className={styles.highlightTitle}>{item.title}</h3>
                  <p className={styles.highlightDesc}>{item.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ PROCESS ══════════ */}
      <section className={`section section--dark circuit-pattern ${styles.process}`}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">Our Process</span>
              <h2 className="section-header__title">
                Easy and Effective Repair
              </h2>
              <p className="section-header__subtitle">
                A simple 4-step process to get your device repaired quickly and
                reliably.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.processGrid}>
            {processSteps.map((step, i) => (
              <AnimatedSection key={step.number} delay={i * 120}>
                <div className={styles.processCard}>
                  <span className={styles.processNumber}>{step.number}</span>
                  <h3 className={styles.processTitle}>
                    {step.title.split("\n").map((line, j) => (
                      <span key={j}>
                        {line}
                        {j === 0 && <br />}
                      </span>
                    ))}
                  </h3>
                  <p className={styles.processDesc}>{step.description}</p>
                  {i < 3 && <div className={styles.processConnector} />}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ EXPERIENCE ══════════ */}
      <section className={`section ${styles.experience}`}>
        <div className="container">
          <div className={styles.experienceGrid}>
            <AnimatedSection direction="left">
              <div className={styles.experienceCounter}>
                <div className={styles.founderHomeCard}>
                  <img src="/omesh.png" alt="Omesh Tank - Founder" className={styles.founderHomePhoto} />
                  <div>
                    <span className={styles.counterNumber}>{YEARS_OF_EXPERIENCE}+</span>
                    <span className={styles.counterLabel}>
                      Years of experience in digital device repair
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className={styles.experienceContent}>
                <span className="section-header__label">Our Heritage</span>
                <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-6)" }}>
                  Trusted by Businesses Across Rajkot
                </h2>
                <p>
                  Established in 1999, we have vast experience maintaining
                  computers and networks for banks, corporate clients,
                  industrial corporations, hospitals, and educational
                  institutions.
                </p>
                <p style={{ marginTop: "var(--space-4)" }}>
                  We feel proud that in work where knowledge, experience, and
                  rapid complaint response are most important, we have never
                  given our clients a single opportunity to complain.
                </p>
                <div style={{ marginTop: "var(--space-8)" }}>
                  <Link href="/about" className="btn btn--accent">
                    Learn Our Story
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════ GOOGLE REVIEWS ══════════ */}
      <GoogleReviews />

      {/* ══════════ OUR CLIENTS CAROUSEL ══════════ */}
      <ClientsCarousel />

      {/* ══════════ CTA BAND ══════════ */}
      <section className={`section--accent ${styles.ctaBand}`}>
        <div className="container">
          <AnimatedSection>
            <div className={styles.ctaContent}>
              <div>
                <h2 className={styles.ctaTitle}>Need Help? Call Us Today</h2>
                <p className={styles.ctaSubtitle}>
                  Free quotes and fast doorstep service — we&apos;re just a call away.
                </p>
              </div>
              <div className={styles.ctaActions}>
                <a href="tel:+919426429416" className={styles.ctaPhone}>
                  <Phone size={24} />
                  <div>
                    <span className={styles.ctaPhoneLabel}>Mobile Number</span>
                    <span className={styles.ctaPhoneNumber}>
                      +91 942 642 9416
                    </span>
                  </div>
                </a>
                <Link href="/contact" className="btn btn--primary" style={{ background: "var(--color-dark)", color: "var(--color-surface)" }}>
                  Get a Quote
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
