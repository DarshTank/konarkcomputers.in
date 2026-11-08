import Link from "next/link";
import { Phone, ArrowRight, CheckCircle2, MapPin, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import { BreadcrumbJsonLd, type BreadcrumbItem } from "@/components/Seo/BreadcrumbJsonLd";
import { BUSINESS } from "@/lib/business";
import styles from "./LandingPageTemplate.module.css";

export interface LandingPageContent {
  h1Title: string;
  badge?: string;
  breadcrumb: { label: string; href?: string }[];
  breadcrumbJsonLd: BreadcrumbItem[];
  intro: {
    heading: string;
    paragraphs: string[];
  };
  problems: {
    heading: string;
    items: string[];
    summary?: string;
  };
  solutions: {
    heading: string;
    items: string[];
  };
  brandsSupported: {
    heading: string;
    description: string;
    brands: string[];
  };
  whyChooseUs: {
    heading: string;
    points: string[];
  };
  relatedLinks: {
    label: string;
    href: string;
  }[];
}

interface LandingPageTemplateProps {
  content: LandingPageContent;
}

export function LandingPageTemplate({ content }: LandingPageTemplateProps) {
  return (
    <>
      <BreadcrumbJsonLd items={content.breadcrumbJsonLd} />

      <PageHero
        title={content.h1Title}
        breadcrumb={content.breadcrumb}
      />

      <section className={styles.articleSection}>
        <div className="container">
          <div className={styles.articleGrid}>
            {/* Main Content Area */}
            <article className={styles.mainContent}>
              {/* Introduction */}
              <AnimatedSection>
                <div className={styles.sectionBlock}>
                  <h2 className={styles.blockTitle}>{content.intro.heading}</h2>
                  {content.intro.paragraphs.map((para, i) => (
                    <p key={i} className={styles.paragraph}>
                      {para}
                    </p>
                  ))}
                </div>
              </AnimatedSection>

              {/* Problems / Common Symptoms */}
              <AnimatedSection delay={100}>
                <div className={styles.sectionBlock}>
                  <h2 className={styles.blockTitle}>{content.problems.heading}</h2>
                  <ul className={styles.featureList}>
                    {content.problems.items.map((item, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckCircle2 size={18} className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {content.problems.summary && (
                    <p className={styles.paragraph} style={{ marginTop: "var(--space-4)" }}>
                      {content.problems.summary}
                    </p>
                  )}
                </div>
              </AnimatedSection>

              {/* Solutions / What We Do */}
              <AnimatedSection delay={150}>
                <div className={styles.sectionBlock}>
                  <h2 className={styles.blockTitle}>{content.solutions.heading}</h2>
                  <ul className={styles.featureList}>
                    {content.solutions.items.map((item, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckCircle2 size={18} className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Brands Supported */}
              <AnimatedSection delay={200}>
                <div className={styles.sectionBlock}>
                  <h2 className={styles.blockTitle}>
                    {content.brandsSupported.heading}
                  </h2>
                  <p className={styles.paragraph}>
                    {content.brandsSupported.description}
                  </p>
                  <ul className={styles.featureList}>
                    {content.brandsSupported.brands.map((brand, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckCircle2 size={18} className={styles.checkIcon} />
                        <span>{brand}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              {/* Why Choose Konark */}
              <AnimatedSection delay={250}>
                <div className={styles.sectionBlock}>
                  <h2 className={styles.blockTitle}>
                    {content.whyChooseUs.heading}
                  </h2>
                  <ul className={styles.featureList}>
                    {content.whyChooseUs.points.map((point, i) => (
                      <li key={i} className={styles.featureItem}>
                        <CheckCircle2 size={18} className={styles.checkIcon} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </article>

            {/* Sidebar with Direct Call to Action & Internal Links */}
            <aside className={styles.sidebar}>
              <AnimatedSection direction="right">
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>Fast Repair in Rajkot</h3>
                  <p className={styles.quickContactText}>
                    Need immediate assistance or looking for genuine hardware parts? Speak directly with our senior technician in Rajkot.
                  </p>
                  <a href={`tel:${BUSINESS.phone}`} className={`btn btn--primary ${styles.phoneBtn}`}>
                    <Phone size={18} />
                    Call {BUSINESS.phoneDisplay}
                  </a>
                  <Link href="/contact" className={`btn ${styles.contactBtn}`}>
                    Visit Today
                    <ArrowRight size={16} />
                  </Link>

                  <div style={{ marginTop: "var(--space-6)", paddingTop: "var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-2)", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", marginBottom: "var(--space-2)" }}>
                      <MapPin size={14} style={{ flexShrink: 0, marginTop: 2, color: "var(--color-accent)" }} />
                      <span>{BUSINESS.address.full}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
                      <Clock size={14} style={{ flexShrink: 0, color: "var(--color-accent)" }} />
                      <span>{BUSINESS.hoursDisplay}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={150}>
                <div className={styles.sidebarCard}>
                  <h3 className={styles.sidebarTitle}>Related Services &amp; Parts</h3>
                  <ul className={styles.relatedLinksList}>
                    {content.relatedLinks.map((link, i) => (
                      <li key={i}>
                        <Link href={link.href} className={styles.relatedLink}>
                          <span>{link.label}</span>
                          <ArrowRight size={14} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

