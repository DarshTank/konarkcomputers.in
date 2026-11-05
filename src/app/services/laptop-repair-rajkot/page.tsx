import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Laptop Repair in Rajkot – Chip-Level Diagnostics & Servicing",
  description: `Professional laptop repair in Rajkot by Konark Computers. Chip-level motherboard fixes, screen & heating repair with ${YEARS_OF_EXPERIENCE}+ years experience. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/services/laptop-repair-rajkot",
  },
  openGraph: {
    title: "Laptop Repair in Rajkot – Chip-Level Diagnostics & Servicing",
    description: `Professional laptop repair in Rajkot by Konark Computers. Chip-level fixes, genuine parts with ${YEARS_OF_EXPERIENCE}+ years experience. Call ${BUSINESS.phoneDisplay}.`,
    url: "/services/laptop-repair-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "Laptop Repair in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Laptop Repair Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Services", url: `${BUSINESS.siteUrl}/services` },
    { name: "Laptop Repair in Rajkot", url: `${BUSINESS.siteUrl}/services/laptop-repair-rajkot` },
  ],
  intro: {
    heading: "Trusted Laptop Repair & Motherboard Diagnostics in Rajkot",
    paragraphs: [
      `When your laptop refuses to power on, shuts down abruptly from overheating, or suffers from liquid damage, you need an experienced repair professional who understands micro-circuitry. Since 1999, Konark Computers has served as Rajkot's trusted specialist for precision laptop repair and chip-level servicing.`,
      `Located near Gondal Road Flyover in Rajkot, our service lab is equipped with modern diagnostic tools to accurately isolate motherboard power failures, faulty capacitors, short circuits, and display interface faults without recommending unnecessary board replacements.`,
    ],
  },
  problems: {
    heading: "Common Laptop Issues We Repair Daily",
    items: [
      "Laptop completely dead or no power when plugged in",
      "Overheating, thermal throttling, and cooling fan noise",
      "Blue screen of death (BSOD) and sudden Windows restarts",
      "Broken display hinges, cracked casing, and body rebuilding",
      "Liquid spills and corrosion damage treatment on motherboards",
      "Keyboard keys unresponsive or repeating characters",
    ],
    summary:
      "Whether it is an ultrabook, gaming laptop, or corporate workstation, our technicians pinpoint the root cause before starting work.",
  },
  solutions: {
    heading: "Comprehensive Laptop Servicing in Rajkot",
    items: [
      "Chip-level motherboard repair: micro-soldering, IC replacement, and short-circuit troubleshooting.",
      "Thermal overhaul: deep cleaning of heatsinks, cooling fan servicing, and application of premium thermal paste.",
      "Hardware upgrades: high-speed NVMe/SATA SSD installation and RAM expansions for immediate speed boosts.",
      "Display and hinge fabrication: precision repair and structural reinforcement of cracked chassis corners.",
      "Doorstep pickup & inspection across Rajkot or drop-off at our Gondal Road workshop.",
    ],
  },
  brandsSupported: {
    heading: "All Major Laptop Brands Serviced",
    description:
      "We source compatible, high-grade replacement components and have extensive technical schematics for all leading manufacturers:",
    brands: [
      "Dell (Inspiron, Vostro, Latitude, XPS)",
      "HP (Pavilion, 14s/15s, Envy, ProBook)",
      "Lenovo (IdeaPad, ThinkPad, Yoga)",
      "Asus (VivoBook, ZenBook, TUF Gaming)",
      "Acer (Aspire, Swift, Nitro)",
      "Sony Vaio, Samsung, and Toshiba laptops",
    ],
  },
  whyChooseUs: {
    heading: `Why Choose Konark Computers for Laptop Repair?`,
    points: [
      `Over ${YEARS_OF_EXPERIENCE} years of proven technical expertise in Rajkot since 1999.`,
      "Honest diagnosis — we repair original circuits whenever feasible to save your repair costs.",
      "Transparent communication with no hidden charges or unexpected replacements.",
      "Central workshop location at 234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot.",
      "Trusted by corporate offices, hospitals, schools, and thousands of individual laptop owners.",
    ],
  },
  relatedLinks: [
    { label: "Computer & Desktop Repair", href: "/services/computer-repair-rajkot" },
    { label: "Laptop Battery Replacement", href: "/products/laptop-battery-rajkot" },
    { label: "Laptop Screen Replacement", href: "/products/laptop-screen-replacement-rajkot" },
    { label: "Laptop Charger & Adapters", href: "/products/laptop-charger-rajkot" },
    { label: "Virus & Spyware Removal", href: "/services/virus-removal-rajkot" },
  ],
};

export default function LaptopRepairRajkotPage() {
  return <LandingPageTemplate content={pageContent} />;
}
