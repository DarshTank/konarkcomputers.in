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
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Konark Computers Rajkot for computer repair, laptop servicing, and IT support. Call +91-9426429416 or visit us at 234-Vitt Bhavan, Gondal Road.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Get in Touch"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      {/* ══════════ MAP ══════════ */}
      <section className={styles.mapSection}>
        <iframe
          src="https://maps.google.com/maps?q=Konark%20Computers%2C%20Rajkot%2C%20Gujarat%2C%20India&t=&z=14&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Konark Computers Location"
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
                  Visit us at our office or reach out through any of these channels.
                </p>

                <ul className={styles.infoList}>
                  <li className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <MapPin size={20} />
                    </div>
                    <div>
                      <span className={styles.infoLabel}>Our Address</span>
                      <span className={styles.infoValue}>
                        234-Vitt Bhavan,
                        <br />
                        Near Gondal Road Flyover,
                        <br />
                        Rajkot 360002, Gujarat, India
                      </span>
                    </div>
                  </li>

                  <li className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Phone size={20} />
                    </div>
                    <div>
                      <span className={styles.infoLabel}>
                        Mobile Number
                      </span>
                      <a href="tel:+919426429416" className={styles.infoValue}>
                        +91 942 642 9416
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
                        href="mailto:omesh_tank@yahoo.com"
                        className={styles.infoValue}
                      >
                        omesh_tank@yahoo.com
                      </a>
                    </div>
                  </li>

                  <li className={styles.infoItem}>
                    <div className={styles.infoIcon}>
                      <Clock size={20} />
                    </div>
                    <div>
                      <span className={styles.infoLabel}>
                        Working Hours
                      </span>
                      <span className={styles.infoValue}>
                        Mon – Sat: 9:00 AM – 9:00 PM
                      </span>
                    </div>
                  </li>
                </ul>

                <div className={styles.socialSection}>
                  <h3 className={styles.socialTitle}>We Are Social</h3>
                  <div className={styles.socialLinks}>
                    <a
                      href="https://www.facebook.com/Konark.Computers/"
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
