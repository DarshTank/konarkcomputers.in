import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Monitor,
  MessageSquare,
  Wrench,
  Wifi,
  ArrowRight,
  ShieldCheck,
  Battery,
  BatteryCharging,
  Cpu,
  HardDrive,
} from "lucide-react";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import { ClientsCarousel } from "@/components/ClientsCarousel/ClientsCarousel";
import { GoogleReviews } from "@/components/GoogleReviews/GoogleReviews";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";
import styles from "./page.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Computer & Laptop Repair in Rajkot | Konark Computers – Since 1999",
  description: `Computer & laptop repair in Rajkot since 1999. ${YEARS_OF_EXPERIENCE}+ years of trusted IT support, chip-level service & parts. Call +91 942 642 9416 for doorstep service.`,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Computer & Laptop Repair in Rajkot | Konark Computers – Since 1999",
    description: `Computer & laptop repair in Rajkot since 1999. ${YEARS_OF_EXPERIENCE}+ years of trusted IT support, chip-level service & parts. Call +91 942 642 9416.`,
    url: "/",
  },
};

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

const localServices = [
  {
    title: "Laptop Repair in Rajkot",
    description:
      "Expert chip-level laptop repair, motherboard diagnostics, heating resolution, and hinge repairs for Dell, HP, Lenovo, Asus, and Acer laptops.",
    href: "/services/laptop-repair-rajkot",
    icon: <Wrench size={28} />,
  },
  {
    title: "Computer & Desktop Repair",
    description:
      "Complete desktop PC troubleshooting, power supply repair, motherboard testing, OS installation, and custom PC optimization in Rajkot.",
    href: "/services/computer-repair-rajkot",
    icon: <Cpu size={28} />,
  },
  {
    title: "SSD Upgrade & Installation",
    description:
      "Transform slow laptops and desktop PCs with lightning-fast NVMe M.2 and SATA SSD upgrades, seamless data cloning, and warranty in Rajkot.",
    href: "/services/ssd-upgrade-rajkot",
    icon: <HardDrive size={28} />,
  },
  {
    title: "Virus & Spyware Removal",
    description:
      "Thorough malware cleanup, adware removal, browser hijack eradication, and security software installation to protect your personal and business data.",
    href: "/services/virus-removal-rajkot",
    icon: <ShieldCheck size={28} />,
  },
  {
    title: "WiFi & Router Setup",
    description:
      "Wireless network installation, range extension, Wi-Fi security hardening, and stable office LAN connectivity setup across Rajkot.",
    href: "/services/wifi-router-setup-rajkot",
    icon: <Wifi size={28} />,
  },
  {
    title: "Laptop Battery Replacement",
    description:
      "Genuine and high-compatibility replacement laptop batteries with warranty for Dell, HP, Lenovo, Acer, and Asus in Rajkot.",
    href: "/products/laptop-battery-rajkot",
    icon: <Battery size={28} />,
  },
  {
    title: "Laptop Charger & Adapters",
    description:
      "Original power adapters and high-grade laptop chargers with correct voltage, surge protection, and replacement warranty.",
    href: "/products/laptop-charger-rajkot",
    icon: <BatteryCharging size={28} />,
  },
  {
    title: "Laptop Screen Replacement",
    description:
      "Cracked, blank, or flickering laptop screen panel replacement using premium grade LCD and LED panels with rapid turnaround.",
    href: "/products/laptop-screen-replacement-rajkot",
    icon: <Monitor size={28} />,
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

const faqs = [
  {
    question: "Do you provide doorstep computer and laptop repair in Rajkot?",
    answer:
      "Yes, Konark Computers provides prompt on-site and doorstep inspection across Rajkot. For common software issues, network configurations, or routine servicing, our technician resolves the problem at your premises. For intricate chip-level repairs, we handle the device safely in our Gondal Road workshop.",
  },
  {
    question: "Which laptop and computer brands do you service?",
    answer:
      "We provide expert repair and genuine spare parts for all major brands in Rajkot including HP, Dell, Lenovo, Asus, Acer, Sony, Samsung, and Toshiba. We service both modern ultra-thin laptops and traditional desktop computers.",
  },
  {
    question: "Can you eliminate viruses and speed up an old or slow computer?",
    answer:
      "Yes. We clear harmful malware, adware, spyware, and background bloatware, resolve system crashes, and optimize startup processes. We also install SSD upgrades and additional RAM which frequently makes older computers 5 to 10 times faster.",
  },
  {
    question: "Do you stock genuine laptop chargers, batteries, and screens?",
    answer:
      "Yes. We carry high-quality original and compatible laptop batteries, chargers, LED/LCD screens, keyboards, RAM modules, and storage drives for all popular models. All replacement parts come with dedicated warranty support.",
  },
  {
    question: "What are your working hours and where is your shop located?",
    answer:
      "Our repair centre is conveniently located at 234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002. We are open Monday through Saturday from 9:00 AM to 9:00 PM.",
  },
  {
    question: "How much does laptop repair cost and what is the turnaround time?",
    answer:
      "Costs and repair turnaround times depend on whether the issue is software-related or requires chip-level hardware replacement. We inspect your device first and provide an upfront, transparent estimate before carrying out any work.",
    // TODO(owner): Add specific standard inspection charges or turnaround times if desired.
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
              TO WIN YOUR SMILE &bull; TRUSTED SINCE 1999
            </span>
          </AnimatedSection>
          <AnimatedSection delay={200}>
            <h1 className={styles.heroTitle}>
              Computer &amp; Laptop Repair
              <br />
              <span className={styles.heroTitleAccent}>in Rajkot — Since 1999</span>
            </h1>
          </AnimatedSection>
          <AnimatedSection delay={350}>
            <p className={styles.heroSubtitle}>
              Master computer &amp; laptop repair in Rajkot, chip-level diagnostics, original spare parts, and dedicated IT maintenance with {YEARS_OF_EXPERIENCE}+ years of trusted service.
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

      {/* ══════════ HIGHLIGHTS ══════════
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
      </section> */}

      {/* ══════════ SERVICES WE OFFER IN RAJKOT ══════════ */}
      <section className={`section ${styles.localServices}`}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">What We Do</span>
              <h2 className="section-header__title">
                Services We Offer in Rajkot
              </h2>
              <p className="section-header__subtitle">
                Fast and Easy Support at Your Doorstep
              </p>
              <p className="section-header__subtitle">
                Online and on-site support for your computer and laptop — all
                brands, all problems, all solved.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.highlightGrid}>
            {localServices.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 80}>
                <div className={styles.highlightCard}>
                  <Link href={service.href} className={styles.serviceLinkCard}>
                    <div className={styles.highlightIcon}>{service.icon}</div>
                    <h3 className={styles.highlightTitle}>{service.title}</h3>
                    <p className={styles.highlightDesc}>{service.description}</p>
                    <span className={styles.serviceCardArrow}>
                      View service details <ArrowRight size={14} />
                    </span>
                  </Link>
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
                  {i < 3 && (
                    <div className={styles.processConnector} aria-hidden="true">
                      <svg
                        className={styles.connectorSvg}
                        viewBox="0 0 60 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <line
                          x1="2"
                          y1="10"
                          x2="50"
                          y2="10"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <polyline
                          points="42,5 50,10 42,15"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={500}>
            <div className={styles.processCta}>
              <Link href="/contact" className="btn btn--accent">
                Book a Fast Repair
                <ArrowRight size={16} />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ══════════ EXPERIENCE ══════════ */}
      <section className={`section ${styles.experience}`}>
        <div className="container">
          <div className={styles.experienceGrid}>
            <AnimatedSection direction="left">
              <div className={styles.experienceCounter}>
                <div className={styles.founderHomeCard}>
                  <Image
                    src="/omesh.png"
                    alt="Omesh Tank, founder of Konark Computers, Rajkot"
                    width={140}
                    height={140}
                    className={styles.founderHomePhoto}
                  />
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
                  institutions across Rajkot and Saurashtra.
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

      {/* ══════════ FREQUENTLY ASKED QUESTIONS ══════════ */}
      <section className={`section ${styles.faqSection}`}>
        <div className="container">
          <AnimatedSection>
            <div className="section-header">
              <span className="section-header__label">Got Questions?</span>
              <h2 className="section-header__title">
                Frequently Asked Questions
              </h2>
              <p className="section-header__subtitle">
                Clear and honest answers regarding our computer repair services, parts, and support in Rajkot.
              </p>
            </div>
          </AnimatedSection>

          <div className={styles.faqGrid}>
            {faqs.map((faq, i) => (
              <AnimatedSection key={faq.question} delay={i * 80}>
                <div className={styles.faqCard}>
                  <h3 className={styles.faqQuestion}>{faq.question}</h3>
                  <p className={styles.faqAnswer}>{faq.answer}</p>
                </div>
              </AnimatedSection>
            ))}
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
                  Free quotes and fast doorstep service across Rajkot — we&apos;re just a call away.
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
                <Link
                  href="/contact"
                  className="btn btn--primary"
                  style={{ background: "var(--color-dark)", color: "var(--color-surface)" }}
                >
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
