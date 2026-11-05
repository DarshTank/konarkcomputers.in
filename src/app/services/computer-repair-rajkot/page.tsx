import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Computer Repair in Rajkot – Desktop PC Servicing & Hardware Support",
  description: `Reliable computer repair in Rajkot by Konark Computers. Hardware diagnostics, power supply, motherboard repair with ${YEARS_OF_EXPERIENCE}+ years experience. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/services/computer-repair-rajkot",
  },
  openGraph: {
    title: "Computer Repair in Rajkot – Desktop PC Servicing & Hardware Support",
    description: `Reliable computer repair in Rajkot by Konark Computers. Desktop PC troubleshooting, hardware diagnostics, and parts support. Call ${BUSINESS.phoneDisplay}.`,
    url: "/services/computer-repair-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "Computer Repair in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Computer Repair Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Services", url: `${BUSINESS.siteUrl}/services` },
    { name: "Computer Repair in Rajkot", url: `${BUSINESS.siteUrl}/services/computer-repair-rajkot` },
  ],
  intro: {
    heading: "Complete Desktop Computer & PC Integrator Services in Rajkot",
    paragraphs: [
      `A failing desktop computer can instantly disrupt business operations, retail billing, or personal productivity. Established in 1999 as a specialized PC integrator and maintenance provider in Rajkot, Konark Computers provides end-to-end repair, hardware diagnosis, and speed optimization for all desktop computers.`,
      `From assembling custom workstations to servicing industrial office computers, our senior technicians identify power, memory, storage, and motherboard faults promptly, ensuring minimal downtime for your business or home setup.`,
    ],
  },
  problems: {
    heading: "Typical Desktop PC Problems We Resolve",
    items: [
      "Computer turns on but shows no display on the monitor",
      "Continuous beeping sounds during system boot or post failures",
      "Power supply unit (SMPS) failure, sparking, or sudden shutdown",
      "Extremely sluggish performance, freezing, and 100% disk usage",
      "Windows operating system boot loops, corrupted registry, or crashes",
      "Hard drive clicking noises and sudden data access errors",
    ],
    summary:
      "Whether your PC is an assembled tower, mini desktop, or branded all-in-one system, we provide accurate hardware and software remedies.",
  },
  solutions: {
    heading: "Desktop PC Servicing & Solutions",
    items: [
      "SMPS & Power Supply troubleshooting: testing voltage rails and replacing faulty power units.",
      "Motherboard component repair: replacing blown capacitors, diagnosing VRM circuits, and BIOS reprogramming.",
      "Speed revamps: replacing spinning mechanical drives with modern solid-state drives (SSDs) and installing dual-channel RAM.",
      "Operating system restoration: clean installation of genuine Windows, driver configurations, and data migration.",
      "Doorstep on-site support for corporate offices, chartered accountant firms, and clinics across Rajkot.",
    ],
  },
  brandsSupported: {
    heading: "Supported PC Formats & Major Brands",
    description:
      "We service branded commercial desktops, all-in-one systems, and custom built gaming/workstation rigs:",
    brands: [
      "Custom assembled Intel & AMD desktop computers",
      "HP ProDesk, EliteDesk, and Pavilion desktop systems",
      "Dell OptiPlex, Inspiron, and Vostro desktop towers",
      "Lenovo ThinkCentre and IdeaCentre PCs",
      "All-in-One (AIO) desktop systems from HP, Dell, and Lenovo",
      "Asus & Acer commercial and home workstations",
    ],
  },
  whyChooseUs: {
    heading: "Why Rajkot Trusts Konark Computers for PC Repairs",
    points: [
      `Established in 1999 with over ${YEARS_OF_EXPERIENCE} years of hands-on PC hardware integration expertise.`,
      "On-site repair and doorstep inspection throughout Rajkot for business and residential clients.",
      "Trusted maintenance partner for banks, educational colleges, hospitals, and commercial firms.",
      "No unnecessary component replacements — clear, honest assessment before any service is carried out.",
      "Comprehensive inventory of replacement SMPS units, RAM, SSDs, and peripherals ready for installation.",
    ],
  },
  relatedLinks: [
    { label: "Laptop Repair in Rajkot", href: "/services/laptop-repair-rajkot" },
    { label: "Virus & Spyware Removal", href: "/services/virus-removal-rajkot" },
    { label: "WiFi & Router Setup", href: "/services/wifi-router-setup-rajkot" },
    { label: "Hard Disk & SSD Storage", href: "/products#hard-disk" },
    { label: "RAM Memory Upgrades", href: "/products#ram" },
  ],
};

export default function ComputerRepairRajkotPage() {
  return <LandingPageTemplate content={pageContent} />;
}
