import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getQuoteCatalogMetadata } from '@/lib/db/catalog';
import { isQuoteEnabled } from '@/lib/db/settings';
import { QuoteProvider } from '@/contexts/QuoteContext';
import { QuoteBuilder } from './components/QuoteBuilder';
import { BUSINESS } from '@/lib/business';

export const metadata: Metadata = {
  metadataBase: new URL(BUSINESS.siteUrl),
  title: 'Instant Hardware Quotation & Estimate Builder in Rajkot',
  description: `Build and download official computer & laptop hardware quotations with live GST calculation and smart compatibility verification in Rajkot. Genuine warranty support by Konark Computers.`,
  alternates: {
    canonical: '/quote',
  },
  openGraph: {
    title: 'Instant Hardware Quotation & Estimate Builder | Konark Computers Rajkot',
    description: `Build and download official computer & laptop hardware quotations with live GST calculation and smart compatibility verification in Rajkot.`,
    url: '/quote',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function QuotePage() {
  const isEnabled = await isQuoteEnabled();
  if (!isEnabled) {
    notFound();
  }

  const catalog = await getQuoteCatalogMetadata();

  return (
    <QuoteProvider
      initialCategories={catalog.categories}
      initialAttributes={catalog.attributes}
      initialRules={catalog.rules}
      initialTaxSettings={catalog.taxSettings}
    >
      <QuoteBuilder products={[]} />
    </QuoteProvider>
  );
}
