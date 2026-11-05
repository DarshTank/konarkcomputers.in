import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Laptop Battery in Rajkot – Original & Replacement Batteries with Warranty",
  description: `Genuine laptop batteries in Rajkot for Dell, HP, Lenovo, Acer, Asus. High backup, replacement warranty by Konark Computers. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/products/laptop-battery-rajkot",
  },
  openGraph: {
    title: "Laptop Battery in Rajkot – Original & Replacement Batteries with Warranty",
    description: `Buy original & compatible laptop batteries in Rajkot. Long backup, brand warranty, instant fitting for Dell, HP, Lenovo, Asus. Call ${BUSINESS.phoneDisplay}.`,
    url: "/products/laptop-battery-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "Laptop Battery in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptop Battery Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Products", url: `${BUSINESS.siteUrl}/products` },
    { name: "Laptop Battery in Rajkot", url: `${BUSINESS.siteUrl}/products/laptop-battery-rajkot` },
  ],
  intro: {
    heading: "Original & High-Backup Replacement Laptop Batteries in Rajkot",
    paragraphs: [
      `A deteriorating laptop battery severely limits your mobility, forcing you to stay tethered to a wall outlet or causing your machine to power down without warning. Konark Computers supplies certified original and high-compatibility laptop replacement batteries in Rajkot with dedicated manufacturer warranty support.`,
      `Located at 234-Vitt Bhavan near Gondal Road Flyover, we help you find the precise voltage, milliamp-hour (mAh) capacity, and form factor engineered specifically for your laptop model, ensuring safe internal charging and long operating life.`,
    ],
  },
  problems: {
    heading: "Signs Your Laptop Battery Needs Immediate Replacement",
    items: [
      "Laptop battery drains within 15–30 minutes of disconnecting the charger",
      "Windows displays 'Consider replacing your battery' or 'Plugged in, not charging'",
      "Laptop abruptly dies when unplugged even if battery indicator shows 40% charge",
      "Battery pack or trackpad area is visibly swollen, bulging, or heating excessively",
      "Laptop only turns on when plugged into the AC power adapter",
      "Severe internal resistance causing system lag and thermal throttling on battery",
    ],
    summary:
      "A swollen lithium-ion battery poses a serious fire and chassis deformation hazard. Replace worn battery packs before they damage your laptop's motherboard or trackpad.",
  },
  solutions: {
    heading: "What We Offer with Every Battery Purchase",
    items: [
      "Precise model matching: we verify part numbers, pin layouts, and voltage ratings before dispatch.",
      "Free fitting & testing: quick installation and initial charging health check at our Rajkot workshop.",
      "Genuine safety certifications: high-grade Japanese and Korean grade-A battery cells with overcharge and short-circuit protection.",
      "Dedicated replacement warranty: peace of mind backed by immediate local support in Rajkot.",
      "Guidance on battery care: practical calibration tips to maximize the lifespan of your new replacement pack.",
    ],
  },
  brandsSupported: {
    heading: "Batteries Available for All Leading Brands",
    description:
      "We stock internal lithium-polymer and external clip-on battery packs for thousands of models:",
    brands: [
      "Dell Inspiron, Latitude, Vostro, and XPS battery packs",
      "HP Pavilion, ProBook, EliteBook, and 14/15 series batteries",
      "Lenovo IdeaPad, ThinkPad, and Yoga internal batteries",
      "Asus VivoBook, ZenBook, and TUF gaming battery modules",
      "Acer Aspire, Swift, and Nitro series replacements",
      "Apple MacBook Air and MacBook Pro replacement batteries",
    ],
  },
  whyChooseUs: {
    heading: "Why Buy Laptop Batteries from Konark Computers?",
    points: [
      `Trusted computer hardware provider serving Rajkot with ${YEARS_OF_EXPERIENCE}+ years of integrity.`,
      "Zero counterfeit risk — we only supply rigorously tested, certified replacement battery packs.",
      "Local shop warranty handling — no waiting weeks for out-of-city couriers.",
      "Competitive prices with transparent product specifications.",
      "Central Rajkot location at Gondal Road with easy parking and doorstep delivery options.",
    ],
  },
  relatedLinks: [
    { label: "Laptop Charger & Adapters", href: "/products/laptop-charger-rajkot" },
    { label: "Laptop Screen Replacement", href: "/products/laptop-screen-replacement-rajkot" },
    { label: "Laptop Repair in Rajkot", href: "/services/laptop-repair-rajkot" },
    { label: "Explore All Products", href: "/products" },
    { label: "Contact for Battery Stock", href: "/contact" },
  ],
};

export default function LaptopBatteryRajkotPage() {
  return <LandingPageTemplate content={pageContent} />;
}
