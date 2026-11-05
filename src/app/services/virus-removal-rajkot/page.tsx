import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Virus & Malware Removal in Rajkot – Spyware Cleanup & System Tuning",
  description: `Fast virus & malware removal in Rajkot by Konark Computers. Deep malware scans, adware eradication, system speed recovery. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/services/virus-removal-rajkot",
  },
  openGraph: {
    title: "Virus & Malware Removal in Rajkot – Spyware Cleanup & System Tuning",
    description: `Protect your data with professional virus and malware cleanup in Rajkot. Eradicate trojans, ransomware, and spyware safely. Call ${BUSINESS.phoneDisplay}.`,
    url: "/services/virus-removal-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "Virus Removal in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Virus Removal Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Services", url: `${BUSINESS.siteUrl}/services` },
    { name: "Virus Removal in Rajkot", url: `${BUSINESS.siteUrl}/services/virus-removal-rajkot` },
  ],
  intro: {
    heading: "Complete Virus, Spyware & Malware Eradication in Rajkot",
    paragraphs: [
      `Malware, trojans, ransomware, and adware do more than just slow down your computer — they jeopardize banking credentials, compromise private client data, and cause unpredictable system lockouts. Since 1999, Konark Computers has helped Rajkot businesses and individuals protect and recover infected computers.`,
      `We perform deep offline and online scans using specialized diagnostic tools to completely eliminate malicious files, rootkits, and unwanted browser hijackers without formatting or losing your precious family photographs, business records, or accounting databases.`,
    ],
  },
  problems: {
    heading: "Signs Your Computer Has a Virus Infection",
    items: [
      "Frequent unexpected pop-ups, advert redirections, or browser homepage hijack",
      "Files unexpectedly encrypted, renamed, or locked behind ransom notices",
      "Severe slowdowns, frozen programs, and CPU usage pegged at 100%",
      "Antivirus software disabled automatically or blocked from updating",
      "Mysterious toolbars appearing in Google Chrome, Edge, or Firefox",
      "Unprompted internet traffic or suspicious background network connections",
    ],
    summary:
      "Ignoring malware signs often leads to identity theft or permanent data loss. Prompt cleanup restores system integrity and speeds.",
  },
  solutions: {
    heading: "Our Threat Removal & Security Protocol",
    items: [
      "Deep heuristic scan: identifying and safely neutralizing hidden trojans, keyloggers, worms, and cryptominers.",
      "Browser cleanup & adware eradication: removing hijacked extensions, deceptive search bars, and rogue notification permissions.",
      "Startup optimization & registry repair: cleaning corrupted system registry entries left behind by malicious programs.",
      "Security hardening & firewall configuration: setting up trusted protection and regular update routines to prevent reinfection.",
      "Data safety guarantee: we preserve your essential documents, accounting data, and files throughout the cleanup process.",
    ],
  },
  brandsSupported: {
    heading: "Supported Platforms & Security Solutions",
    description:
      "We clean and secure all desktop PCs, laptops, and server workstations across Rajkot:",
    brands: [
      "Windows 11, Windows 10, Windows 8, and Windows 7 operating systems",
      "HP, Dell, Lenovo, Asus, Acer, and custom-assembled desktop towers",
      "Office network workstations and local accounting machines",
      "Guidance and configuration for reputable, licensed antivirus solutions",
    ],
  },
  whyChooseUs: {
    heading: "Why Choose Konark Computers for Virus Cleanup?",
    points: [
      `Over ${YEARS_OF_EXPERIENCE} years serving Rajkot's computing community with dependable technical ethics.`,
      "Zero data loss commitment — we prioritize saving your files over simple blind formatting.",
      "Doorstep service available for home offices and commercial businesses across Rajkot.",
      "Post-cleanup speed tuning that leaves your machine running significantly faster than before.",
      "Clear advice on safe browsing habits, email attachment precautions, and backup practices.",
    ],
  },
  relatedLinks: [
    { label: "Computer Repair in Rajkot", href: "/services/computer-repair-rajkot" },
    { label: "Laptop Repair in Rajkot", href: "/services/laptop-repair-rajkot" },
    { label: "WiFi & Router Setup", href: "/services/wifi-router-setup-rajkot" },
    { label: "RAM & Storage Upgrades", href: "/products#ram" },
    { label: "Contact Us for Support", href: "/contact" },
  ],
};

export default function VirusRemovalRajkotPage() {
  return <LandingPageTemplate content={pageContent} />;
}
