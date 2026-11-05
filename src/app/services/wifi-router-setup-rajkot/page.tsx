import type { Metadata } from "next";
import { LandingPageTemplate, type LandingPageContent } from "@/components/LandingPage/LandingPageTemplate";
import { BUSINESS } from "@/lib/business";
import { YEARS_OF_EXPERIENCE } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "WiFi Router Setup & Office Networking in Rajkot – Konark Computers",
  description: `Professional WiFi router setup, LAN cabling & wireless network security in Rajkot by Konark Computers. Over ${YEARS_OF_EXPERIENCE} yrs expertise. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/services/wifi-router-setup-rajkot",
  },
  openGraph: {
    title: "WiFi Router Setup & Office Networking in Rajkot – Konark Computers",
    description: `Professional WiFi router setup, LAN cabling, and wireless security in Rajkot. Eliminate dead zones and secure your network. Call ${BUSINESS.phoneDisplay}.`,
    url: "/services/wifi-router-setup-rajkot",
  },
};

const pageContent: LandingPageContent = {
  h1Title: "WiFi Router Setup in Rajkot",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "WiFi Router Setup Rajkot" },
  ],
  breadcrumbJsonLd: [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Services", url: `${BUSINESS.siteUrl}/services` },
    { name: "WiFi Router Setup in Rajkot", url: `${BUSINESS.siteUrl}/services/wifi-router-setup-rajkot` },
  ],
  intro: {
    heading: "Reliable WiFi Setup & Business Network Solutions in Rajkot",
    paragraphs: [
      `A unstable internet connection or poorly configured WiFi router results in dropped calls, lagging video meetings, and frustrating connectivity bottlenecks. At Konark Computers, we have designed, configured, and maintained secure networks for corporate offices, hospitals, educational institutions, and residences across Rajkot since 1999.`,
      `Whether you need to configure a dual-band high-speed router, extend wireless coverage across multi-floor premises, or configure structured local area network (LAN) cabling, our network engineers deliver smooth, secure, and resilient connectivity.`,
    ],
  },
  problems: {
    heading: "Common Wireless & Networking Headaches We Fix",
    items: [
      "Frequent WiFi disconnection, buffering, and sudden drops during peak work hours",
      "Persistent dead zones in distant office rooms, balconies, or upstairs cabins",
      "Unsecured wireless networks open to unauthorized neighborhood access and data theft",
      "IP address conflicts, DNS lookup errors, and 'No Internet Secured' notifications",
      "Network printer sharing failures and file sharing errors between office PCs",
      "Slow transfer speeds across local servers, NAS drives, and workstations",
    ],
    summary:
      "Modern workplaces rely on continuous uptime. We eliminate networking weak links to keep your teams connected effortlessly.",
  },
  solutions: {
    heading: "Professional Networking & Wireless Services",
    items: [
      "New router installation: configuration of PPPoE, static IP, DHCP scopes, and dual-band 2.4GHz/5GHz frequencies.",
      "Wireless network hardening: implementing robust WPA2/WPA3 encryption, guest networks, and MAC filtering.",
      "Range expansion: installing mesh WiFi systems, access points, and wireless repeaters for seamless roaming.",
      "Office LAN setup: Ethernet cable crimping, patch panel management, and gigabit switch installation.",
      "Printer & resource sharing: configuring network printers and scanners across all connected PCs and laptops.",
    ],
  },
  brandsSupported: {
    heading: "Supported Router Brands & Network Gear",
    description:
      "We configure and optimize hardware from all major networking manufacturers:",
    brands: [
      "TP-Link (Archer series, Deco Mesh, Omada Access Points)",
      "D-Link (DIR routers, unified gigabit switches)",
      "Netgear (Nighthawk and Orbi mesh systems)",
      "Tenda and Mercusys high-gain routers and range extenders",
      "Cisco Small Business switches and enterprise routers",
      "All major broadband providers in Rajkot (JioFiber, Airtel Xstream, GTPL, BSNL)",
    ],
  },
  whyChooseUs: {
    heading: "Why Choose Konark Computers for Networking?",
    points: [
      `Over ${YEARS_OF_EXPERIENCE} years maintaining critical network infrastructure for banks, hospitals, and corporate firms.`,
      "On-site doorstep inspection and network auditing across all areas of Rajkot.",
      "Security-first approach — we teach you safe practices to protect your wireless credentials.",
      "Proven track record with zero-downtime maintenance programs for commercial institutions.",
      "Transparent recommendations based on actual premises layout and bandwidth requirements.",
    ],
  },
  relatedLinks: [
    { label: "Computer Repair in Rajkot", href: "/services/computer-repair-rajkot" },
    { label: "Laptop Repair in Rajkot", href: "/services/laptop-repair-rajkot" },
    { label: "Virus & Threat Cleanup", href: "/services/virus-removal-rajkot" },
    { label: "Our IT Maintenance Services", href: "/services" },
    { label: "Book a Network Technician", href: "/contact" },
  ],
};

export default function WifiRouterSetupRajkotPage() {
  return <LandingPageTemplate content={pageContent} />;
}
