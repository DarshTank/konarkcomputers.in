import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { quoteSubmissionSchema } from '@/lib/db/schemas';
import { getAdminDb } from '@/lib/firebase/admin';
import {
  SEED_CATEGORIES,
  SEED_ATTRIBUTES,
  SEED_COMPATIBILITY_RULES,
  SEED_PRODUCTS,
  SEED_SERVICES,
  SEED_TAX_SETTINGS,
  SEED_COMPANY_SETTINGS,
} from '@/lib/db/seed-data';
import type {
  Quote,
  QuoteItemSnapshot,
  TaxSettings,
  CompanySettings,
  Product,
} from '@/lib/db/types';
import { calculateTotals, type LineItem } from '@/lib/pricing/calculator';
import {
  evaluateProductCompatibility,
  validateCartConflicts,
} from '@/lib/compat/engine';
import { generateQuotePdf } from '@/lib/pdf/quote-pdf';
import { sendQuoteEmail } from '@/lib/mailer';

// Simple in-memory rate limiter per IP: max 10 quote requests per 10 minutes
const ipRateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limitWindow = 10 * 60 * 1000; // 10 minutes
  const maxRequests = 10;

  const record = ipRateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    ipRateLimitMap.set(ip, { count: 1, resetTime: now + limitWindow });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || '127.0.0.1';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many quote requests. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const parseResult = quoteSubmissionSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Invalid submission data', details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const submission = parseResult.data;

    // Check honeypot
    if (submission.honeypot && submission.honeypot.length > 0) {
      return NextResponse.json({ error: 'Bot detected' }, { status: 400 });
    }

    // Try Firestore DB or fallback to seed data
    let db = null;
    try {
      db = getAdminDb();
    } catch {
      // In local demo or build mode without credentials
      db = null;
    }

    // Load Tax & Company Settings
    let taxSettings: TaxSettings = SEED_TAX_SETTINGS;
    let companySettings: CompanySettings = SEED_COMPANY_SETTINGS;

    if (db) {
      try {
        const taxSnap = await db.collection('settings').doc('tax').get();
        if (taxSnap.exists) taxSettings = taxSnap.data() as TaxSettings;

        const compSnap = await db.collection('settings').doc('company').get();
        if (compSnap.exists) companySettings = compSnap.data() as CompanySettings;
      } catch (e) {
        console.warn('Could not read settings from Firestore, using defaults:', e);
      }
    }

    // Fetch products by IDs
    const productSnapshots: Product[] = [];

    for (const item of submission.items) {
      let product: Product | undefined;

      if (db) {
        try {
          const doc = await db.collection('products').doc(item.productId).get();
          if (doc.exists) {
            product = { id: doc.id, ...(doc.data() as Omit<Product, 'id'>) };
          }
        } catch (e) {
          console.warn(`Failed to fetch product ${item.productId} from DB:`, e);
        }
      }

      if (!product) {
        product = SEED_PRODUCTS.find((p) => p.id === item.productId) as unknown as Product;
      }

      if (!product || !product.isActive) {
        return NextResponse.json(
          { error: `Product ${item.productId} is no longer available.` },
          { status: 400 }
        );
      }

      productSnapshots.push(product);
    }

    // Fetch Categories, Attributes, Rules for server-side compat verification
    let categories = SEED_CATEGORIES;
    let attributes = SEED_ATTRIBUTES;
    let rules = SEED_COMPATIBILITY_RULES;

    if (db) {
      try {
        const catSnap = await db.collection('categories').where('isActive', '==', true).get();
        if (!catSnap.empty) {
          categories = catSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }

        const attrSnap = await db.collection('attributeDefinitions').get();
        if (!attrSnap.empty) {
          attributes = attrSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }

        const ruleSnap = await db.collection('compatibilityRules').where('isActive', '==', true).get();
        if (!ruleSnap.empty) {
          rules = ruleSnap.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
        }
      } catch (e) {
        console.warn('Error fetching compat configs from Firestore:', e);
      }
    }

    // Run Server-Side Compatibility Check
    const compatCart = productSnapshots.map((p, idx) => ({
      product: {
        id: p.id,
        name: p.name,
        categoryId: p.categoryId,
        brandId: p.brandId,
        brandName: p.brandId,
        specs: p.specs,
        compat: p.compat,
        condition: p.condition,
      },
      qty: submission.items[idx].qty,
    }));

    const cartConflictResult = validateCartConflicts(compatCart, categories, attributes, rules);
    const warnings: string[] = [...cartConflictResult.warnings];

    // Compute line items with server pricing (Ignore client prices!)
    const lineItemsToCalc: LineItem[] = productSnapshots.map((p, idx) => ({
      productId: p.id,
      qty: submission.items[idx].qty,
      unitPricePaise: p.pricing.pricePaise,
      priceIncludesGst: p.pricing.priceIncludesGst,
      gstRateBps: p.pricing.gstRateBps,
      hsnCode: p.pricing.hsnCode,
    }));

    const calculated = calculateTotals(lineItemsToCalc, {
      shopStateCode: taxSettings.shopStateCode || 24,
      customerStateCode: submission.customer.stateCode,
      roundOff: taxSettings.roundOff,
    });

    // Build frozen item snapshots
    const itemsSnapshot: QuoteItemSnapshot[] = calculated.lines.map((line, idx) => {
      const prod = productSnapshots[idx];
      const cat = categories.find((c) => c.id === prod.categoryId);
      const specsSummary = Object.entries(prod.specs)
        .slice(0, 3)
        .map(([k, v]) => `${k}: ${v}`)
        .join(' | ');

      return {
        productId: prod.id,
        sku: prod.sku,
        name: prod.name,
        categoryName: cat?.name || prod.categoryId,
        brandName: prod.brandId,
        specsSummary,
        condition: prod.condition,
        warrantyMonths: prod.warrantyMonths,
        qty: line.qty,
        unitPricePaise: line.unitPricePaise,
        priceIncludesGst: line.priceIncludesGst,
        gstRateBps: line.gstRateBps,
        hsnCode: line.hsnCode,
        taxablePaise: line.taxablePaise,
        cgstPaise: line.cgstPaise,
        sgstPaise: line.sgstPaise,
        igstPaise: line.igstPaise,
        lineTotalPaise: line.lineTotalPaise,
      };
    });

    // Generate Quote Number: KQ-{YYYY}-{0001}
    const currentYear = new Date().getFullYear();
    let quoteNumber = `KQ-${currentYear}-0001`;

    if (db) {
      try {
        const counterRef = db.collection('counters').doc('quotes');
        quoteNumber = await db.runTransaction(async (transaction) => {
          const counterDoc = await transaction.get(counterRef);
          let lastNum = 0;
          if (counterDoc.exists) {
            const data = counterDoc.data();
            if (data?.currentYear === currentYear) {
              lastNum = data.lastNumber || 0;
            }
          }
          const nextNum = lastNum + 1;
          transaction.set(counterRef, { currentYear, lastNumber: nextNum }, { merge: true });
          const padded = String(nextNum).padStart(4, '0');
          return `KQ-${currentYear}-${padded}`;
        });
      } catch (e) {
        console.warn('Counter transaction failed, generating pseudo-random sequential number:', e);
        const rand = Math.floor(1000 + Math.random() * 9000);
        quoteNumber = `KQ-${currentYear}-${rand}`;
      }
    } else {
      const rand = Math.floor(1000 + Math.random() * 9000);
      quoteNumber = `KQ-${currentYear}-${rand}`;
    }

    const publicToken = crypto.randomBytes(24).toString('hex');
    const nowSec = Math.floor(Date.now() / 1000);
    const validityDays = taxSettings.quoteValidityDays || 7;
    const validUntilSec = nowSec + validityDays * 24 * 60 * 60;

    const quoteDoc: Quote = {
      id: crypto.randomUUID(),
      quoteNumber,
      publicToken,
      status: 'new',
      customer: {
        name: submission.customer.name,
        phone: submission.customer.phone,
        email: submission.customer.email || undefined,
        city: submission.customer.city || undefined,
        stateCode: submission.customer.stateCode,
        stateName: submission.customer.stateName,
        company: submission.customer.company || undefined,
        gstin: submission.customer.gstin || undefined,
      },
      items: itemsSnapshot,
      taxSnapshot: taxSettings,
      companySnapshot: companySettings,
      totals: {
        subtotalPaise: calculated.subtotalPaise,
        taxablePaise: calculated.taxablePaise,
        cgstPaise: calculated.cgstPaise,
        sgstPaise: calculated.sgstPaise,
        igstPaise: calculated.igstPaise,
        roundOffPaise: calculated.roundOffPaise,
        grandTotalPaise: calculated.grandTotalPaise,
      },
      deviceContext: submission.deviceContext,
      warnings,
      validUntil: { seconds: validUntilSec, nanoseconds: 0 },
      notes: submission.notes || undefined,
      createdAt: { seconds: nowSec, nanoseconds: 0 },
      statusHistory: [
        {
          status: 'new',
          timestamp: { seconds: nowSec, nanoseconds: 0 },
          note: 'Quote created via customer website.',
        },
      ],
    };

    // Save to Firestore
    if (db) {
      try {
        await db.collection('quotes').doc(quoteDoc.id).set(quoteDoc);
      } catch (e) {
        console.error('Failed to save quote document in Firestore:', e);
      }
    }

    // Generate PDF & Send Email asynchronously (does not block response)
    (async () => {
      try {
        const pdfBytes = await generateQuotePdf(quoteDoc);

        if (submission.customer.email) {
          await sendQuoteEmail({
            quote: quoteDoc,
            pdfBuffer: pdfBytes,
            recipientEmail: submission.customer.email,
          });
        }
      } catch (err) {
        console.error('Async PDF/Email notification error:', err);
      }
    })();

    return NextResponse.json({
      success: true,
      quoteNumber: quoteDoc.quoteNumber,
      publicToken: quoteDoc.publicToken,
      quoteId: quoteDoc.id,
    });
  } catch (error: any) {
    console.error('API /api/quotes POST error:', error);
    return NextResponse.json(
      { error: error?.message || 'Internal server error processing quote' },
      { status: 500 }
    );
  }
}

