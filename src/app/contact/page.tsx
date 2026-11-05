import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero/PageHero";
import { AnimatedSection } from "@/components/AnimatedSection/AnimatedSection";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
} from "lucide-react";
import { BUSINESS } from "@/lib/business";
import styles from "./page.module.css";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Contact & Location – Gondal Road, Rajkot",
  description: `Contact Konark Computers on Gondal Road, Rajkot. Visit our workshop or call ${BUSINESS.phoneDisplay} for computer and laptop repair quotes.`,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact & Location – Gondal Road, Rajkot",
    description: `Contact Konark Computers on Gondal Road, Rajkot. Visit our workshop or call ${BUSINESS.phoneDisplay} for computer and laptop repair quotes.`,
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact & Location – Gondal Road, Rajkot"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      {/* ══════════ MAP ══════════ */}
      <section className={styles.mapSection}>
        <iframe
          src={BUSINESS.googleMapsEmbedUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Konark Computers Location in Rajkot"
        />
      </section>

      {/* ══════════ CONTACT CONTENT ══════════ */}
      <section className={`section ${styles.contact}`}>
        <div className="container">
          <div className={styles.contactGrid}>
            {/* Form */}
            <AnimatedSection direction="left">
              <ContactForm />
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection direction="right">
              <div className={styles.infoSection}>
                <h2 className={styles.infoTitle}>Contact Information</h2>
                <p className={styles.infoSubtitle}>
                  Visit our repair workshop in Rajkot or reach out directly for immediate support.
                </p>

                <ul className={styles.infoList}>
                  <li className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className={styles.infoLabel}>Our Address</span>
                      <span className={styles.infoValue}>
                        {BUSINESS.address.street},
                        <br />
                        {BUSINESS.address.city} {BUSINESS.address.postalCode}, {BUSINESS.address.state}, {BUSINESS.address.countryName}
                      </span>
                    </div>
                  </li>

                  <li className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className={styles.infoLabel}>Mobile Number</span>
                      <a href={`tel:${BUSINESS.phone}`} className={styles.infoValue}>
                        {BUSINESS.phoneDisplay}
                      </a>
                    </div>
                  </li>

                  <li className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Mail size={20} />
                    </div>
                    <div>
                      <span className={styles.infoLabel}>Email</span>
                      <a
                        href={`mailto:${BUSINESS.email}`}
                        className={styles.infoValue}
                      >
                        {BUSINESS.email}
                      </a>
                    </div>
                  </li>

                  <li className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className={styles.infoLabel}>Working Hours</span>
                      <span className={styles.infoValue}>
                        {BUSINESS.hoursDisplay}
                      </span>
                    </div>
                  </li>
                </ul>

                <div className={styles.socialSection}>
                  <h3 className={styles.socialTitle}>Connect with Us</h3>
                  <div className={styles.socialLinks}>
                    <a
                      href={BUSINESS.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialBtn}
                      aria-label="Facebook"
                    >
                      <Facebook size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
