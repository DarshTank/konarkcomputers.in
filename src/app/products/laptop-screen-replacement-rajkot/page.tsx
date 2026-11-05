import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Laptop Screen Replacement in Rajkot – Cracked & LED Display Repair",
  description: `Fast laptop screen replacement in Rajkot by Konark Computers. HD, FHD, IPS screens for Dell, HP, Lenovo, Acer, Asus. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/products/laptop-screen-replacement-rajkot",
  },
  openGraph: {
    title: "Laptop Screen Replacement in Rajkot – Cracked & LED Display Repair",
    description: `Cracked or flickering laptop screen in Rajkot? Konark Computers installs genuine Grade-A LED/LCD panels with warranty. Call ${BUSINESS.phoneDisplay}.`,
    url: "/products/laptop-screen-replacement-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "Laptop Screen Replacement in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Laptop Screen Replacement Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Products", url: `${BUSINESS.siteUrl}/products` },
    { name: "Laptop Screen Replacement in Rajkot", url: `${BUSINESS.siteUrl}/products/laptop-screen-replacement-rajkot` },
  ],
  intro: {
    heading: "Original Grade-A Laptop Screen Replacement & Display Repair in Rajkot",
    paragraphs: [
      `A cracked display glass, vertical color lines, or a completely blank screen makes using your laptop impossible. Since 1999, Konark Computers has provided fast, precision laptop screen replacement and display repairs in Rajkot, fitting original Grade-A panels with crisp color accuracy and zero dead pixels.`,
      `Located at 234-Vitt Bhavan near Gondal Road Flyover, our technicians carefully disassemble the display bezel, test the internal eDP video cable, and install the exact matching display panel for your Dell, HP, Lenovo, Asus, or Acer laptop.`,
    ],
  },
  problems: {
    heading: "Display Problems We Fix Daily",
    items: [
      "Physical impact cracks, internal ink bleeding, and spiderweb fractures",
      "Vertical or horizontal colored lines running across the screen",
      "Flickering display when opening or tilting the laptop lid",
      "Extremely dim screen where icons are barely visible without backlight",
      "Completely black display while power lights and fan continue running",
      "Distorted colors, dead pixels, or ghosting artifacts",
    ],
    summary:
      "A blank screen does not always mean a ruined display — our technicians test the display ribbon cable and graphics IC to avoid unnecessary screen replacement.",
  },
  solutions: {
    heading: "Our Precision Display Replacement Service",
    items: [
      "Exact panel matching: we match resolution, refresh rate (60Hz / 120Hz / 144Hz), connector pin count (30-pin / 40-pin), and mount bracket type.",
      "Grade-A panel quality: zero dead pixels, vibrant color fidelity, and wide viewing angle panels (HD, Full HD 1080p, and IPS).",
      "Display ribbon & hinge inspection: checking display hinges and routing cables to prevent future cable pinching.",
      "Safe antistatic installation: proper grounding to prevent electrical damage to motherboard display circuitry.",
      "Replacement warranty: all brand new screen installations include complete warranty support in Rajkot.",
    ],
  },
  brandsSupported: {
    heading: "Replacement Screens for All Major Laptop Brands",
    description:
      "We replace display panels across all sizes from 11.6-inch, 14.0-inch, 15.6-inch up to 17.3-inch:",
    brands: [
      "Dell Inspiron, Latitude, and Vostro series screens",
      "HP Pavilion, 14s/15s, and EliteBook panels (anti-glare & micro-edge)",
      "Lenovo IdeaPad, ThinkPad, and Legion high-refresh screens",
      "Asus VivoBook, ZenBook, and TUF gaming laptop displays",
      "Acer Aspire, Swift, and Nitro gaming displays",
      "Ultraslim bezels and touch-screen digitizer assemblies",
    ],
  },
  whyChooseUs: {
    heading: "Why Choose Konark Computers for Screen Replacement?",
    points: [
      `Over ${YEARS_OF_EXPERIENCE} years of trusted computer and laptop hardware repair in Rajkot.`,
      "Fast turnaround — many standard 14.0\" and 15.6\" screens replaced within a single working day.",
      "Original Grade-A panels from certified display manufacturers (BOE, LG Display, Innolux, AUO).",
      "Clean, bubble-free installation with careful bezel re-sealing.",
      "Convenient central Rajkot workshop near Gondal Road Flyover.",
    ],
  },
  relatedLinks: [
    { label: "Laptop Battery in Rajkot", href: "/products/laptop-battery-rajkot" },
    { label: "Laptop Charger & Adapters", href: "/products/laptop-charger-rajkot" },
    { label: "Laptop Repair in Rajkot", href: "/services/laptop-repair-rajkot" },
    { label: "Computer Keyboards & Parts", href: "/products#laptop-keyboard" },
    { label: "Contact for Screen Quote", href: "/contact" },
  ],
};

export default function LaptopScreenReplacementRajkotPage() {
  return <LandingPageTemplate content={pageContent} />;
}
