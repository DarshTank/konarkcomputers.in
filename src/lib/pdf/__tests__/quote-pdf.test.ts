import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { generateQuotePdf } from '../quote-pdf';
import type { Quote } from '../../db/types';

describe('Konark Signature Quotation PDF Generator', () => {
  const sampleQuote: Quote = {
    id: 'test-quote-123',
    quoteNumber: 'KQ-2026-0001',
    publicToken: 'test-token-abc',
    status: 'new',
    customer: {
      name: 'Darsh Tank',
      phone: '+91 942 642 9416',
      email: 'darsh@example.com',
      stateCode: 24,
      stateName: 'Gujarat',
    },
    items: [
      {
        productId: 'cpu-amd-5500',
        sku: 'AMD-5500',
        name: 'AMD Ryzen 5 5500 DESKTOP PROCESSOR',
        imageUrl: '/logo2.png',
        categoryName: 'Processor',
        brandName: 'AMD',
        specsSummary: '6 Cores | 12 Threads',
        condition: 'new',
        warrantyMonths: 36,
        qty: 1,
        unitPricePaise: 950000,
        priceIncludesGst: true,
        gstRateBps: 1800,
        hsnCode: '8471',
        taxablePaise: 805085,
        cgstPaise: 72458,
        sgstPaise: 72458,
        igstPaise: 0,
        lineTotalPaise: 950000,
      },
      {
        productId: 'ram-ddr4-8gb',
        sku: 'GSKILL-8GB-3200',
        name: '8GB DDR4 3200MHZ Gskill RAM',
        imageUrl: '/logo2.png',
        categoryName: 'RAM',
        brandName: 'G.Skill',
        specsSummary: 'DDR4 3200MHz',
        condition: 'new',
        warrantyMonths: 36,
        qty: 2,
        unitPricePaise: 200000,
        priceIncludesGst: true,
        gstRateBps: 1800,
        hsnCode: '8473',
        taxablePaise: 338983,
        cgstPaise: 30509,
        sgstPaise: 30509,
        igstPaise: 0,
        lineTotalPaise: 400000,
      },
    ],
    taxSnapshot: {
      shopStateCode: 24,
      defaultGstRateBps: 1800,
      displayMode: 'inclusive',
      roundOff: true,
      quoteValidityDays: 7,
    },
    companySnapshot: {
      legalName: 'Konark Computers',
      gstin: '24AAAAA0000A1Z5',
      address: '234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002, India',
      phone: '+91 942 642 9416',
      email: 'omesh_tank@yahoo.com',
      bankName: 'State Bank of India',
      bankAccountNo: '12345678901234',
      bankIfsc: 'SBIN0001234',
      upiId: 'konarkcomputers@upi',
      termsAndConditions: '1. Quotation valid for 7 days from issue date.\n2. Prices subject to stock availability.\n3. Hardware warranty as per OEM manufacturer terms.\n4. Disputes subject to Rajkot jurisdiction.',
      footerNote: 'Konark Computers — Serving Rajkot Since 1999.',
    },
    totals: {
      subtotalPaise: 1350000,
      taxablePaise: 1144068,
      cgstPaise: 102966,
      sgstPaise: 102966,
      igstPaise: 0,
      roundOffPaise: 0,
      grandTotalPaise: 1350000,
    },
    warnings: [],
    validUntil: { seconds: Math.floor(Date.now() / 1000) + 7 * 86400, nanoseconds: 0 },
    createdAt: { seconds: Math.floor(Date.now() / 1000), nanoseconds: 0 },
    statusHistory: [],
  };

  it('generates valid PDF bytes without throwing errors', async () => {
    const pdfBytes = await generateQuotePdf(sampleQuote);
    expect(pdfBytes).toBeInstanceOf(Uint8Array);
    expect(pdfBytes.length).toBeGreaterThan(1000);

    // Verify PDF Magic Header (%PDF)
    const header = Buffer.from(pdfBytes.slice(0, 4)).toString('ascii');
    expect(header).toBe('%PDF');

    // Save sample to disk for inspection
    const outPath = path.join(process.cwd(), '.next', 'sample-quote.pdf');
    fs.writeFileSync(outPath, Buffer.from(pdfBytes));
  });

  it('generates valid PDF with custom company and terms & conditions', async () => {
    const customQuote: Quote = {
      ...sampleQuote,
      companySnapshot: {
        ...sampleQuote.companySnapshot,
        legalName: 'Konark IT & Computer Solutions',
        termsAndConditions: '1. First custom term\n2. Second custom term',
        footerNote: 'Serving Rajkot Computer Customers for 27 Years',
      },
    };

    const pdfBytes = await generateQuotePdf(customQuote);
    expect(pdfBytes).toBeInstanceOf(Uint8Array);
    expect(pdfBytes.length).toBeGreaterThan(1000);
    const header = Buffer.from(pdfBytes.slice(0, 4)).toString('ascii');
    expect(header).toBe('%PDF');
  });
});
