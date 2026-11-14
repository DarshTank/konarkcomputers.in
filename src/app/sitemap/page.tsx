import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero/PageHero";
import { BreadcrumbJsonLd } from "@/components/Seo/BreadcrumbJsonLd";
import { BUSINESS } from "@/lib/business";
import { isQuoteEnabled } from "@/lib/db/settings";
import { SitemapView } from "./SitemapView";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: "Website Sitemap – All Pages, Services & Hardware in Rajkot",
  description: `Complete directory of all pages, repair services, laptop hardware parts, and customer tools at Konark Computers Rajkot. Established 1999. Call ${BUSINESS.phoneDisplay}.`,
  alternates: {
    canonical: "/sitemap",
  },
  openGraph: {
    title: "Website Sitemap – All Pages, Services & Hardware in Rajkot",
    description: `Complete directory of all pages, repair services, laptop hardware parts, and customer tools at Konark Computers Rajkot. Established 1999. Call ${BUSINESS.phoneDisplay}.`,
    url: "/sitemap",
  },
};

export default async function SitemapPage() {
  const quoteEnabled = await isQuoteEnabled();

  const breadcrumbs = [
    { name: "Home", url: `${BUSINESS.siteUrl}/` },
    { name: "Website Sitemap", url: `${BUSINESS.siteUrl}/sitemap` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <PageHero
        title="Website Sitemap"
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Sitemap" },
        ]}
      />

      <SitemapView initialQuoteEnabled={quoteEnabled} />
    </>
  );
}
