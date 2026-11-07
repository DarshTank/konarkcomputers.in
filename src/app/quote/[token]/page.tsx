import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAdminDb } from '@/lib/firebase/admin';
import type { Quote } from '@/lib/db/types';
import { formatPaise } from '@/lib/pricing/calculator';
import { BUSINESS } from '@/lib/business';
import {
  Download,
  Share2,
  Phone,
  Mail,
  CheckCircle,
  ArrowLeft,
  Calendar,
  ShieldCheck,
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Your Official Hardware Quotation | Konark Computers',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

export default async function QuoteViewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  let quote: Quote | null = null;

  try {
    const db = getAdminDb();
    if (db) {
      const snap = await db
        .collection('quotes')
        .where('publicToken', '==', token)
        .limit(1)
        .get();

      if (!snap.empty) {
        quote = snap.docs[0].data() as Quote;
      }
    }
  } catch (e) {
    console.warn('Error reading quote:', e);
  }

  if (!quote) {
    notFound();
  }

  const isSameState = quote.customer.stateCode === 24;

  const quoteDateStr = new Date(quote.createdAt.seconds * 1000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const validUntilStr = new Date(quote.validUntil.seconds * 1000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  // WhatsApp share link
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.konarkcomputers.in';
  const quoteUrl = `${siteUrl}/quote/${quote.publicToken}`;
  const whatsappMsg = encodeURIComponent(
    `Hello Konark Computers, I have created quotation ${quote.quoteNumber} for ₹${(
      quote.totals.grandTotalPaise / 100
    ).toFixed(2)} on your website: ${quoteUrl}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=919426429416&text=${whatsappMsg}`;

  return (
    <div className={styles.quoteViewPage}>
      <div className="container">
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <Link
            href="/quote"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: 'var(--text-xs)',
              color: 'var(--color-text-secondary)',
              fontWeight: 600,
            }}
          >
            <ArrowLeft size={14} />
            Back to Quote Builder
          </Link>
        </div>

        <div className={styles.paperCard}>
          {/* Header Banner */}
          <div className={styles.topBar}>
            <div className={styles.brandBlock}>
              <h1>{quote.companySnapshot.legalName}</h1>
              <span className={styles.brandSubtitle}>
                Official Hardware Quotation / Estimate
              </span>
            </div>

            <div className={styles.quoteMeta}>
              <div className={styles.quoteNumber}>{quote.quoteNumber}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end' }}>
                <Calendar size={12} />
                <span>Date: {quoteDateStr}</span>
              </div>
              <div style={{ color: 'var(--color-accent)' }}>
                Valid Until: {validUntilStr}
              </div>
            </div>
          </div>

          {/* Action Toolbar */}
          <div className={styles.actionBar}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: 'var(--text-xs)' }}>
              <span
                style={{
                  background: '#dcfce7',
                  color: '#166534',
                  padding: '3px 8px',
                  borderRadius: '9999px',
                  fontWeight: 'bold',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <CheckCircle size={12} />
                Quote Active
              </span>
              <span style={{ color: 'var(--color-text-muted)' }}>
                Prices verified &amp; frozen
              </span>
            </div>

            <div className={styles.actionBtns}>
              <a
                href={`/api/quotes/${quote.publicToken}/pdf`}
                className="btn btn--primary"
                style={{ minHeight: '36px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
                download
              >
                <Download size={14} />
                Download PDF
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent"
                style={{ minHeight: '36px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
              >
                <Share2 size={14} />
                WhatsApp Shop
              </a>

              <a
                href={`tel:${BUSINESS.phone}`}
                className="btn btn--outline"
                style={{
                  minHeight: '36px',
                  padding: '6px 14px',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--color-dark)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <Phone size={14} />
                Call Workshop
              </a>
            </div>
          </div>

          <div className={styles.contentPad}>
            {/* Parties Info Grid */}
            <div className={styles.partiesGrid}>
              <div className={styles.partyCol}>
                <h3>Issued By</h3>
                <div className={styles.partyName}>{quote.companySnapshot.legalName}</div>
                <div className={styles.partyDetails}>
                  {quote.companySnapshot.address}
                  <br />
                  Phone: {quote.companySnapshot.phone}
                  <br />
                  Email: {quote.companySnapshot.email}
                  {quote.companySnapshot.gstin && (
                    <>
                      <br />
                      <strong>GSTIN:</strong> {quote.companySnapshot.gstin} (State 24 - Gujarat)
                    </>
                  )}
                </div>
              </div>

              <div className={styles.partyCol}>
                <h3>Quotation For</h3>
                <div className={styles.partyName}>{quote.customer.name}</div>
                <div className={styles.partyDetails}>
                  {quote.customer.company && (
                    <>
                      <strong>{quote.customer.company}</strong>
                      <br />
                    </>
                  )}
                  Phone: {quote.customer.phone}
                  {quote.customer.email && (
                    <>
                      <br />
                      Email: {quote.customer.email}
                    </>
                  )}
                  <br />
                  Place of Supply: {quote.customer.stateName} (Code: {quote.customer.stateCode})
                  {quote.customer.gstin && (
                    <>
                      <br />
                      <strong>Customer GSTIN:</strong> {quote.customer.gstin}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className={styles.tableWrap}>
              <table className={styles.itemTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Description</th>
                    <th>HSN/SAC</th>
                    <th style={{ textAlign: 'center' }}>Qty</th>
                    <th style={{ textAlign: 'right' }}>Rate (₹)</th>
                    <th style={{ textAlign: 'right' }}>Taxable (₹)</th>
                    <th style={{ textAlign: 'right' }}>GST %</th>
                    <th style={{ textAlign: 'right' }}>Total (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {quote.items.map((item, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <strong>{item.name}</strong>
                        {item.specsSummary && (
                          <div style={{ color: 'var(--color-text-muted)', fontSize: '0.7rem' }}>
                            {item.specsSummary}
                          </div>
                        )}
                        <div style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem' }}>
                          SKU: {item.sku} | Warranty: {item.warrantyMonths}m
                        </div>
                      </td>
                      <td>{item.hsnCode}</td>
                      <td style={{ textAlign: 'center' }}>{item.qty}</td>
                      <td style={{ textAlign: 'right' }}>{(item.unitPricePaise / 100).toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}>{(item.taxablePaise / 100).toFixed(2)}</td>
                      <td style={{ textAlign: 'right' }}>{item.gstRateBps / 100}%</td>
                      <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                        {(item.lineTotalPaise / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Breakdown */}
            <div className={styles.totalsBox}>
              <div className={styles.totalsTable}>
                <div className={styles.totalLine}>
                  <span>Subtotal (Taxable):</span>
                  <span>{formatPaise(quote.totals.taxablePaise)}</span>
                </div>

                {isSameState ? (
                  <>
                    <div className={styles.totalLine}>
                      <span>CGST (Central Tax 9%):</span>
                      <span>{formatPaise(quote.totals.cgstPaise)}</span>
                    </div>
                    <div className={styles.totalLine}>
                      <span>SGST (State Tax 9%):</span>
                      <span>{formatPaise(quote.totals.sgstPaise)}</span>
                    </div>
                  </>
                ) : (
                  <div className={styles.totalLine}>
                    <span>IGST (Integrated Tax 18%):</span>
                    <span>{formatPaise(quote.totals.igstPaise)}</span>
                  </div>
                )}

                {quote.totals.roundOffPaise !== 0 && (
                  <div className={styles.totalLine}>
                    <span>Round Off:</span>
                    <span>
                      {quote.totals.roundOffPaise > 0 ? '+' : ''}
                      {formatPaise(quote.totals.roundOffPaise)}
                    </span>
                  </div>
                )}

                <div className={styles.grandTotalLine}>
                  <span>Grand Total:</span>
                  <span style={{ color: 'var(--color-teal)' }}>
                    {formatPaise(quote.totals.grandTotalPaise)}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms & Notes */}
            <div className={styles.termsCard}>
              <div className={styles.termsTitle}>Quotation Terms &amp; Conditions</div>
              <p style={{ whiteSpace: 'pre-line', margin: 0 }}>
                {quote.companySnapshot.termsAndConditions}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
