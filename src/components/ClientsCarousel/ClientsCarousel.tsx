"use client";

import styles from "./ClientsCarousel.module.css";

const clientLogos = [
  { name: "BSNL India", src: "/1.png" },
  { name: "IndianOil", src: "/2.png" },
  { name: "Bharti AXA", src: "/3.png" },
  { name: "Apollo Munich", src: "/4.png" },
  { name: "Edelweiss Tokio", src: "/5.png" },
  { name: "Airtel", src: "/6.png" },
  { name: "HDFC Bank", src: "/7.png" },
  { name: "Domino's Pizza", src: "/8.png" },
  { name: "TATA Teleservices", src: "/9.png" },
  { name: "Vodafone", src: "/10.png" },
  { name: "Idea Cellular", src: "/11.png" },
];

export function ClientsCarousel() {
  return (
    <section className={styles.clientsSection}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.label}>Corporate & Government Partners</span>
          <h2 className={styles.title}>Our Clients</h2>
        </div>

        {/* Infinite Scroll Logo Marquee */}
        <div className={styles.marqueeWrapper}>
          <div className={styles.marqueeTrack}>
            {[...clientLogos, ...clientLogos].map((client, index) => (
              <div key={index} className={styles.clientItem}>
                <img
                  src={client.src}
                  alt={client.name}
                  className={styles.clientLogo}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
