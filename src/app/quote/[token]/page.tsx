import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getQuoteByToken } from '@/lib/db/quotes';
import { getCompanySettings } from '@/lib/db/settings';
import type { Quote } from '@/lib/db/types';
import { formatPaise } from '@/lib/pricing/calculator';
import {
  Download,
  Share2,
  ArrowLeft,
  PhoneCall,
  FileText,
} from 'lucide-react';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Official Hardware Quotation | Konark Computers',
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = 'force-dynamic';

function formatDateDDMMYYYY(seconds?: number): string {
  const d = seconds ? new Date(seconds * 1000) : new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export default async function QuoteViewPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  if (!token) {
    notFound();
  }

  const quote: Quote | null = await getQuoteByToken(token);

  if (!quote) {
    notFound();
  }

  // Live company settings from Admin Settings
  const companySettings = await getCompanySettings();
  const company = {
    ...companySettings,
    ...(quote.companySnapshot || {}),
    termsAndConditions: companySettings.termsAndConditions || quote.companySnapshot?.termsAndConditions,
    footerNote: companySettings.footerNote || quote.companySnapshot?.footerNote,
  };

  const dateStr = formatDateDDMMYYYY(quote.createdAt?.seconds);

  // WhatsApp share link
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.konarkcomputers.in';
  const quoteUrl = `${siteUrl}/quote/${quote.publicToken}`;
  const whatsappMsg = encodeURIComponent(
    `Hello Konark Computers, here is my quotation ${quote.quoteNumber} for ${formatPaise(
      quote.totals.grandTotalPaise
    )}: ${quoteUrl}`
  );
  const whatsappUrl = `https://api.whatsapp.com/send?phone=919426429416&text=${whatsappMsg}`;

  // Fill up to 8 rows to reproduce signature sheet proportions
  const targetRowsCount = Math.max(8, quote.items.length);
  const emptyRowsCount = targetRowsCount - quote.items.length;

  const rawTerms = company.termsAndConditions ||
    '1. Quotation valid for 7 days from issue date.\n2. Prices subject to stock availability.\n3. Hardware warranty as per OEM manufacturer terms.\n4. Disputes subject to Rajkot jurisdiction.';
  const termsList = rawTerms.split('\n').map((l) => l.trim()).filter(Boolean);

  return (
    <div className={styles.quoteViewPage}>
      <div className="container">
        {/* Navigation & Action Bar */}
        <div className={styles.topActionBar}>
          <Link href="/quote" className={styles.backLink}>
            <ArrowLeft size={16} />
            Back to Quote Builder
          </Link>

          <div className={styles.actionButtonGroup}>
            <a
              href={`/api/quotes/${quote.publicToken}/pdf`}
              download={`${quote.quoteNumber}.pdf`}
              className="btn btn--primary"
              style={{
                gap: '8px',
                padding: '8px 18px',
                fontSize: '0.82rem',
                minHeight: '38px',
              }}
            >
              <Download size={15} />
              Download Official PDF
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappBtn}
            >
              <Share2 size={15} />
              Share WhatsApp
            </a>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════════
            KONARK SIGNATURE QUOTATION SHEET
            ═══════════════════════════════════════════════════════════════════ */}
        <div className={styles.sheetCard}>
          {/* Header Section: Company Name, Logo & Details */}
          <div className={styles.sheetCompanyHeader}>
            <div className={styles.sheetLogoWrap}>
              <img
                src="/logo2.png"
                alt={company.legalName || 'Konark Computers'}
                className={styles.companyLogoImg}
              />
            </div>

            <div className={styles.sheetCompanyInfo}>
              <h2 className={styles.companyLegalName}>
                {company.legalName || 'Konark Computers'}
              </h2>
              <div className={styles.companySubtitle}>
                Computer &amp; Laptop Solutions, IT Hardware &amp; Networking
              </div>
              <div className={styles.companyMetaText}>
                {company.address}
              </div>
              <div className={styles.companyMetaText}>
                Phone: <strong>{company.phone}</strong> &nbsp;|&nbsp; Email: <strong>{company.email}</strong>
              </div>
              {company.gstin && (
                <div className={styles.companyGstin}>
                  GSTIN: {company.gstin}
                </div>
              )}
            </div>
          </div>

          {/* Quotation & Customer Meta Strip */}
          <div className={styles.sheetHeaderRow}>
            <div className={styles.custNameText}>
              <span>Customer:</span> <strong>{quote.customer?.name || 'Customer'}</strong>
              {quote.customer?.phone && (
                <span className={styles.custPhoneText}> (M: {quote.customer.phone})</span>
              )}
            </div>
            <div className={styles.quoteMetaRight}>
              {quote.quoteNumber && (
                <span className={styles.quoteNumberText}>{quote.quoteNumber}</span>
              )}
              <span className={styles.quoteDateText}>Date: {dateStr}</span>
            </div>
          </div>

          {/* Yellow Header & Item Grid */}
          <table className={styles.sheetTable}>
            <thead>
              <tr>
                <th className={styles.yellowTh} style={{ width: '100px' }}></th>
                <th className={styles.yellowTh}>Product</th>
                <th className={styles.yellowTh} style={{ width: '150px', textAlign: 'right', paddingRight: '16px' }}>
                  Total Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Product Rows */}
              {quote.items.map((item, idx) => {
                const lineTotalPaise =
                  item.lineTotalPaise ?? ((item.unitPricePaise || 0) * (item.qty || 1));
                const unitPricePaise =
                  item.unitPricePaise ?? (item.qty ? lineTotalPaise / item.qty : lineTotalPaise);

                const lineTotalFormatted = (lineTotalPaise / 100).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });

                const unitPriceFormatted = (unitPricePaise / 100).toLocaleString('en-IN', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                });

                return (
                  <tr key={idx} className={styles.itemTr}>
                    <td className={styles.imgTd}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className={styles.productImgThumb}
                          loading="eager"
                        />
                      ) : (
                        <div className={styles.placeholderImg}>ITEM</div>
                      )}
                    </td>
                    <td className={styles.productTd}>
                      <div className={styles.productTitle}>
                        {item.name}
                        {item.qty > 1 && (
                          <span style={{ color: '#475569', marginLeft: '6px' }}>
                            x {item.qty}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className={styles.rateTd}>
                      <div className={styles.rateCellWrap}>
                        <div className={styles.itemLineTotal}>
                          ₹ {lineTotalFormatted}
                        </div>
                        {item.qty > 1 && (
                          <div className={styles.itemPerUnit}>
                            (₹ {unitPriceFormatted} each)
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}

              {/* Empty Rows completing sheet height */}
              {Array.from({ length: emptyRowsCount }).map((_, i) => (
                <tr key={`empty-${i}`} className={styles.emptyTr}>
                  <td className={styles.emptyTd}></td>
                  <td className={styles.emptyTd}></td>
                  <td className={styles.emptyTd}></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Orange Total / Summary Bar */}
          <div className={styles.orangeSummaryBar}>
            <div className={styles.callNowPill}>
              <PhoneCall size={18} />
              <span>Call Now</span>
            </div>

            <div className={styles.taxNoteText}>
              With GST
            </div>

            <div className={styles.grandTotalText}>
              ₹ {(quote.totals.grandTotalPaise / 100).toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>
          </div>

          {/* Signature Royal Blue Footer Bar */}
          <div className={styles.blueFooterBar}>
            <div className={styles.blueFooterPhone}>
              {company.phone || '942 642 9416'}
            </div>
            <a
              href="http://www.konarkcomputers.in/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.blueFooterUrl}
            >
              http://www.konarkcomputers.in/
            </a>
            <div className={styles.blueFooterFounder}>
              Omesh Tank
            </div>
          </div>

          {/* Footer Terms & Conditions and Details (Editable from Admin Settings) */}
          <div className={styles.sheetFooterSection}>
            <div className={styles.termsBox}>
              <div className={styles.termsTitle}>Terms &amp; Conditions:</div>
              <ol className={styles.termsList}>
                {termsList.map((term, i) => (
                  <li key={i}>{term.replace(/^\d+[\.\)]\s*/, '')}</li>
                ))}
              </ol>

              {(company.bankName || company.bankAccountNo || company.upiId) && (
                <div className={styles.bankDetailsStrip}>
                  {company.bankName && <span>Bank: <strong>{company.bankName}</strong></span>}
                  {company.bankAccountNo && <span>A/C: <strong>{company.bankAccountNo}</strong></span>}
                  {company.upiId && <span>UPI: <strong>{company.upiId}</strong></span>}
                </div>
              )}
            </div>

            <div className={styles.signatoryBox}>
              <div className={styles.forCompanyText}>
                For, {company.legalName || 'Konark Computers'}
              </div>
              <div className={styles.signatoryPlaceholder}></div>
              <div className={styles.authSignText}>
                Authorized Signatory
              </div>
            </div>
          </div>

          {/* Quotation Footer Note (Editable from Admin Settings) */}
          {company.footerNote && (
            <div className={styles.footerNoteBar}>
              {company.footerNote}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
