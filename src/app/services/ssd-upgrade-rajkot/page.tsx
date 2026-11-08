import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "SSD Upgrade in Rajkot – Fast NVMe & SATA SSD Installation with Data Cloning",
  description: `Supercharge slow laptops & desktop PCs with high-speed SSD upgrades in Rajkot by Konark Computers. NVMe M.2 & 2.5" SATA SSDs, 100% data cloning, and warranty. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/services/ssd-upgrade-rajkot",
  },
  openGraph: {
    title: "SSD Upgrade in Rajkot – Fast NVMe & SATA SSD Installation with Data Cloning",
    description: `Supercharge slow laptops & desktop PCs with high-speed SSD upgrades in Rajkot by Konark Computers. NVMe M.2 & 2.5" SATA SSDs, 100% data cloning, and warranty. Call ${BUSINESS.phoneDisplay}.`,
    url: "/services/ssd-upgrade-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "SSD Upgrade & Installation in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "SSD Upgrade Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Services", url: `${BUSINESS.siteUrl}/services` },
    { name: "SSD Upgrade in Rajkot", url: `${BUSINESS.siteUrl}/services/ssd-upgrade-rajkot` },
  ],
  intro: {
    heading: "Supercharge Your Laptop or Desktop with Lightning-Fast Solid State Storage",
    paragraphs: [
      `Is your laptop or desktop taking several minutes to start up, freezing during multitasking, or showing 100% disk usage in Windows Task Manager? Traditional spinning mechanical hard drives (HDDs) are the single biggest bottleneck in modern computing. An SSD upgrade from Konark Computers delivers an instant 5x to 10x performance boost, making your computer boot in under 15 seconds and apps launch instantaneously.`,
      `Located at 234-Vitt Bhavan near Gondal Road Flyover in Rajkot since 1999, our hardware technicians provide complete SSD installation, zero-data-loss bit-by-bit cloning of your existing Windows installation, personal files, and software, or fresh OS installation with genuine driver optimization.`,
    ],
  },
  problems: {
    heading: "Common Symptoms That Call for an SSD Upgrade",
    items: [
      "Computer takes 2 to 5 minutes or longer to reach the Windows desktop after powering on",
      "Task Manager frequently displays constant 100% Disk Usage on your mechanical HDD",
      "Laptops freezing, stuttering, or showing 'Not Responding' when opening Google Chrome, Tally, or office files",
      "Old hard drive producing clicking, buzzing, or ticking mechanical sounds indicating drive wear",
      "Windows updates, antivirus scans, or software installations take hours and slow down the whole machine",
      "Need faster video rendering, graphic design, programming, or business accounting responsiveness",
    ],
    summary:
      "Upgrading to a Solid State Drive is the single most cost-effective performance overhaul for any laptop or desktop PC, delivering brand-new machine speed without the expense of buying a new computer.",
  },
  solutions: {
    heading: "Complete SSD Upgrade & Data Cloning Services in Rajkot",
    items: [
      "NVMe M.2 PCIe SSD installation: ultra-high read/write speeds up to 3500–7000 MB/s for compatible modern laptops and desktop motherboards.",
      "2.5-inch SATA SSD replacement: the perfect plug-and-play upgrade for older laptops and desktop towers replacing standard mechanical hard drives.",
      "Dual storage setup (HDD Caddy): retain your existing large HDD for data backup while using a new high-speed SSD for Windows and apps.",
      "100% Exact OS cloning: transfer your current Windows, desktop icons, accounting data, Tally, and personal files with zero data loss or reconfiguration.",
      "Fresh Windows & driver optimization: optional clean installation with latest security patches, system tuning, and thermal cleanup.",
      "Doorstep on-site inspection across Rajkot or express in-workshop service with genuine brand-backed replacement warranty on all drives.",
    ],
  },
  brandsSupported: {
    heading: "Supported SSD Form Factors & Trusted Brands",
    description:
      "We stock and install original, high-endurance Solid State Drives from industry-leading NAND flash manufacturers:",
    brands: [
      "Crucial (Micron) – BX500 SATA, MX500, P3 & P3 Plus NVMe M.2",
      "Kingston – A400 SATA, NV2 & KC3000 PCIe 4.0 NVMe",
      "Western Digital (WD) – Green SATA, Blue SN580 & Black Gaming NVMe",
      "Samsung – 870 EVO SATA, 980 & 990 PRO NVMe SSDs",
      "Consistent & Seagate SATA / M.2 Solid State Drives",
      "Supported capacities: 128GB, 256GB, 512GB, 1TB, and 2TB drives",
    ],
  },
  whyChooseUs: {
    heading: "Why Rajkot Chooses Konark Computers for SSD Upgrades",
    points: [
      `Established in 1999 with over ${YEARS_OF_EXPERIENCE} years of trusted computer hardware expertise in Rajkot.`,
      "Zero data loss guarantee — meticulous sector-level cloning protects all your business records, photos, and licensed software.",
      "Same-day express upgrade: most laptop and desktop SSD installations completed within 1 to 2 hours at our Gondal Road workshop.",
      "Genuine brand warranty: 3-year to 5-year replacement warranty on all branded solid state drives.",
      "Transparent pricing: fair drive costs, genuine installation service, and no hidden charges.",
    ],
  },
  relatedLinks: [
    { label: "Computer & Desktop Repair", href: "/services/computer-repair-rajkot" },
    { label: "Laptop Repair in Rajkot", href: "/services/laptop-repair-rajkot" },
    { label: "RAM Memory Upgrades", href: "/products#ram" },
    { label: "Hard Disk & SSD Parts Catalog", href: "/products#hard-disk" },
    { label: "Instant Quotation Builder", href: "/quote" },
  ],
};

import { isQuoteEnabled } from "@/lib/db/settings";

export default async function SsdUpgradeRajkotPage() {
  const quoteEnabled = await isQuoteEnabled();
  const dynamicContent = {
    ...pageContent,
    relatedLinks: pageContent.relatedLinks.map((link) =>
      link.href === "/quote"
        ? quoteEnabled
          ? link
          : { label: "Contact Workshop & Repairs", href: "/contact" }
        : link
    ),
  };

  return <LandingPageTemplate content={dynamicContent} />;
}

