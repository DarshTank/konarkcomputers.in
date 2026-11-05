import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Laptop Charger in Rajkot – Original Adapters for Dell, HP, Lenovo, Asus",
  description: `Original & compatible laptop chargers in Rajkot by Konark Computers. Surge-protected power adapters with replacement warranty. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/products/laptop-charger-rajkot",
  },
  openGraph: {
    title: "Laptop Charger in Rajkot – Original Adapters for Dell, HP, Lenovo, Asus",
    description: `Buy genuine laptop chargers in Rajkot. High safety, surge protection, and replacement warranty for all laptop brands. Call ${BUSINESS.phoneDisplay}.`,
    url: "/products/laptop-charger-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "Laptop Charger in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptop Charger Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Products", url: `${BUSINESS.siteUrl}/products` },
    { name: "Laptop Charger in Rajkot", url: `${BUSINESS.siteUrl}/products/laptop-charger-rajkot` },
  ],
  intro: {
    heading: "Original & Compatible Laptop Power Adapters in Rajkot",
    paragraphs: [
      `Using a cheap, counterfeit laptop charger can severely damage your laptop's delicate power management IC, burn charging pins, and cause unstable system performance. At Konark Computers, we stock certified original and premium compatible laptop chargers and AC power adapters in Rajkot for all laptop brands.`,
      `Every charger we supply complies with manufacturer voltage, amperage, and connector tip specifications, featuring built-in over-voltage and short-circuit safeguards to protect your valuable device during power fluctuations.`,
    ],
  },
  problems: {
    heading: "Common Issues Indicating a Damaged Laptop Charger",
    items: [
      "Laptop only charges when the power cable is bent or held at a certain angle",
      "Power adapter brick becomes burning hot to touch during routine operation",
      "Sparks, burning smell, or frayed wires near the DC connector tip",
      "Windows reports 'Plugged in, not charging' or 'The AC power adapter wattage cannot be determined'",
      "Trackpad becomes erratic or jumps uncontrollably while the charger is plugged in",
      "Laptop fails to power on completely or battery percentage drops while plugged in",
    ],
    summary:
      "Do not risk burning your laptop motherboard with damaged or unbranded adapters. Switch to a reliable, regulated charger with warranty.",
  },
  solutions: {
    heading: "Why Our Chargers Ensure Maximum Laptop Safety",
    items: [
      "Exact voltage & amperage regulation: ensures stable current flow without frying internal power chips.",
      "Multi-stage circuit protection: built-in safeguards against power surges, thermal overheating, and short circuits.",
      "Durable reinforced cables: high-gauge copper wiring designed to withstand continuous bending and travel wear.",
      "Wide range of pin sizes: standard round barrel tips, slim tips, USB Type-C, and magnetic connectors.",
      "Instant in-store testing: bring your laptop to our Gondal Road workshop to test the charger live before purchase.",
    ],
  },
  brandsSupported: {
    heading: "Chargers Available for All Major Laptop Brands",
    description:
      "We stock replacement adapters from 45W, 65W, 90W up to 135W+ for high-performance laptops:",
    brands: [
      "Dell chargers (4.5mm small pin, 7.4mm big pin, USB-C)",
      "HP power adapters (blue pin, yellow pin, USB-C Power Delivery)",
      "Lenovo adapters (yellow square slim tip, round pin, USB-C)",
      "Asus chargers (small pin, center-pin adapters, high-wattage gaming bricks)",
      "Acer power supplies (3.0mm, 5.5mm barrel adapters)",
      "Apple MacBook MagSafe 1, MagSafe 2, and Type-C chargers",
    ],
  },
  whyChooseUs: {
    heading: "Why Choose Konark Computers for Laptop Chargers?",
    points: [
      `Established 1999 with over ${YEARS_OF_EXPERIENCE} years providing genuine computer hardware in Rajkot.`,
      "Comprehensive replacement warranty with direct over-the-counter resolution in Rajkot.",
      "Free DC charging port inspection on your laptop to verify that the fault is the charger and not the jack.",
      "Fair pricing with no compromise on internal electrical components.",
      "Centrally located near Gondal Road Flyover with prompt customer assistance.",
    ],
  },
  relatedLinks: [
    { label: "Laptop Battery in Rajkot", href: "/products/laptop-battery-rajkot" },
    { label: "Laptop Screen Replacement", href: "/products/laptop-screen-replacement-rajkot" },
    { label: "Laptop Repair & Servicing", href: "/services/laptop-repair-rajkot" },
    { label: "Computer Keyboards & Mice", href: "/products#keyboard" },
    { label: "Visit Our Workshop", href: "/contact" },
  ],
};

export default function LaptopChargerRajkotPage() {
  return <LandingPageTemplate content={pageContent} />;
}
