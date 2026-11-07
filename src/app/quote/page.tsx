import type { Metadata } from 'next';
import { getActiveCatalog } from '@/lib/db/catalog';
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

export default async function QuotePage() {
  const catalog = await getActiveCatalog();

  return (
    <QuoteProvider
      initialCategories={catalog.categories}
      initialAttributes={catalog.attributes}
      initialRules={catalog.rules}
      initialTaxSettings={catalog.taxSettings}
    >
      <QuoteBuilder products={catalog.products} />
    </QuoteProvider>
  );
}
