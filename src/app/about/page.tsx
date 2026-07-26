import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import { Shield, Quote } from "lucide-react";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About Us",
  description:
    `Learn about Konark Computers — established 1999, experienced PC integrator and maintenance professional in Rajkot, Gujarat. ${YEARS_OF_EXPERIENCE}+ years of trusted IT service.`,
};

const testimonials = [
  {
    quote: "The technicians worked rapidly to restore my system. And I appreciate it.",
    name: "Principal: SMT R R Patel",
    org: "Mahila Arts and Commerce College",
  },
  {
    quote:
      "Your customer service representative and your service technician were very personable, experienced and knowledgeable.",
    name: "Director: Dhavalbhai Patel",
    org: "Actionware I Pvt. Ltd.",
  },
  {
    quote:
      "The technician really knows what to do. Very kind to speak with too. You're good already. Keep up the good work!",
    name: "Mr. Pravinbhai",
    org: "Vidya Aradhna School",
  },
  {
    quote:
      "It is very easy, and I don't have to spend great amounts of time ensuring the safety of my computer.",
    name: "Dr. Vasavada",
    org: "Madhuram Hospital",
  },
  {
    quote: "Very fast, genuine and reliable support for the last 10 years.",
    name: "Dr. Rajesh Gandhi & Dr. Raju Sagar",
    org: "Ashirvad Hospital",
  },
  {
    quote: "100% Satisfaction with genuine and quick support since 2005.",
    name: "EDP Manager Mr. Hitesh Nagar",
    org: "SMM India (Chartered Accountant)",
  },
  {
    quote: "Quick and genuine service. We recommend to all for IT support.",
    name: "Chairman: Parag Solanki",
    org: "Mason Club Credit Co. Op. Society Ltd.",
  },
];

const stats = [
  { number: `${YEARS_OF_EXPERIENCE}+`, label: "Years Experience" },
  { number: "500+", label: "Happy Clients" },
  { number: "24/7", label: "Support Ready" },
  { number: "10K+", label: "Repairs Done" },
];

const reasons = [
  "Ensure critical security updates are applied monthly",
  "Regular review and management of firewall, virus, and spyware protection",
  "Identify trends in network issues preventing downtime",
  "Data recovery readiness through backup management",
  "Reduce problems through server and workstation standardization",
  "Prevent storage issues through hard drive resource management",
  "Identify issues via event log analysis before they create problems",
  "Maintain network speed via regular server optimization",
  "Regular maintenance provides peace of mind",
  "Predictable monthly budget minimizes financial surprises",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Our Story"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* ══════════ FOUNDER SECTION ══════════ */}
      <section className={`section ${styles.founder}`}>
        <div className="container">
          <div className={styles.founderGrid}>
            <AnimatedSection direction="left">
              <div className={styles.founderImageWrap}>
                <div className={styles.founderFrame}>
                  <img
                    src="/omesh.png"
                    alt="Omesh Tank - Founder & PC Integrator"
                    className={styles.founderPhoto}
                  />
                  <div className={styles.founderBadge}>
                    <span className={styles.founderName}>Omesh Tank</span>
                    <span className={styles.founderTitle}>Founder & CEO</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className={styles.founderContent}>
                <span className="section-header__label">About Us</span>
                <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-6)" }}>
                  {YEARS_OF_EXPERIENCE}+ Years of Trusted Service
                </h2>
                <p>
                  We would like to introduce ourselves as the well-established,
                  experienced and efficient PC integrator & Maintenance
                  Professional. Established in 1999, we have vast experience
                  maintaining computers and networks for banks, corporate
                  clients, industrial corporations, hospitals, and educational
                  institutions & universities.
                </p>
                <p style={{ marginTop: "var(--space-4)" }}>
                  We feel proud that in such work where knowledge, experience
                  and rapid complaint response are most important, we didn&apos;t give
                  our clients a single opportunity to say any word of complaint.
                </p>
                <p
                  style={{
                    marginTop: "var(--space-4)",
                    fontStyle: "italic",
                    color: "var(--color-accent)",
                    fontFamily: "var(--font-display)",
                    fontSize: "var(--text-lg)",
                  }}
                >
                  — Omesh Tank, Founder
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════ STATS ══════════ */}
      <section className={`section section--dark circuit-pattern ${styles.stats}`}>
        <div className="container">
          <div className={styles.statsGrid}>
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 100}>
                <div className={styles.statCard}>
                  <span className={styles.statNumber}>{stat.number}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES OVERVIEW ══════════ */}
      <section className={`section ${styles.servicesOverview}`}>
        <div className="container">
          <div className={styles.overviewGrid}>
            <AnimatedSection direction="left">
              <div>
                <span className="section-header__label">What We Provide</span>
                <h2 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-6)" }}>
                  So, What Does Konark Provide Your Company?
                </h2>
                <p>
                  Konark provides ongoing and immediate technical support for
                  your computer network, systematically managed by our certified
                  IT professionals. We not only take care of your technology on a
                  regular basis but also implement and maintain the strategic
                  technology plan based on your business goals and budget.
                </p>
                <p style={{ marginTop: "var(--space-4)" }}>
                  The end result is a happy, productive office with predictable
                  budget line items. Plans are customized to your company&apos;s
                  budget, computer usage, and how involved you want to be.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className={styles.reasonsCard}>
                <h3 className={styles.reasonsTitle}>
                  <Shield size={20} />
                  10 Reasons Every Business Needs Proactive Maintenance
                </h3>
                <ol className={styles.reasonsList}>
                  {reasons.map((reason, i) => (
                    <li key={i}>
                      <span className={styles.reasonNumber}>{i + 1}</span>
                      {reason}
                    </li>
                  ))}
                </ol>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <section className={`section ${styles.testimonials}`} style={{ background: "var(--color-surface-warm)" }}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">Testimonials</span>
              <h2 className="section-header__title">
                What Our Clients Say
              </h2>
            </div>
          </AnimatedSection>

          <div className={styles.testimonialGrid}>
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 80}>
                <div className={styles.testimonialCard}>
                  <Quote size={24} className={styles.quoteIcon} />
                  <p className={styles.testimonialQuote}>{t.quote}</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <span className={styles.testimonialName}>{t.name}</span>
                      <span className={styles.testimonialOrg}>{t.org}</span>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
