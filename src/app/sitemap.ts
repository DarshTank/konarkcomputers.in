import type { MetadataRoute } from "next";
import { isQuoteEnabled } from "@/lib/db/settings";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.konarkcomputers.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const quoteEnabled = await isQuoteEnabled();
  const currentDate = new Date();

  const routes: Array<{
    path: string;
    priority: number;
    changeFrequency: "monthly" | "weekly" | "always" | "hourly" | "daily" | "yearly" | "never";
  }> = [
    { path: "", priority: 1.0, changeFrequency: "monthly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products", priority: 0.8, changeFrequency: "monthly" },
    ...(quoteEnabled ? [{ path: "/quote", priority: 0.8, changeFrequency: "monthly" as const }] : []),
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/sitemap", priority: 0.7, changeFrequency: "monthly" },
    // Dedicated Search Intent Landing Pages
    { path: "/services/laptop-repair-rajkot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/computer-repair-rajkot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/ssd-upgrade-rajkot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/virus-removal-rajkot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/services/wifi-router-setup-rajkot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/laptop-battery-rajkot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/laptop-charger-rajkot", priority: 0.8, changeFrequency: "monthly" },
    { path: "/products/laptop-screen-replacement-rajkot", priority: 0.8, changeFrequency: "monthly" },
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified: currentDate,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
