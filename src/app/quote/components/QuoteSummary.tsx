"use client";

import React from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { formatPaise } from '@/lib/pricing/calculator';
import { FileText, Trash2, ArrowRight, ShoppingCart } from 'lucide-react';
import styles from '../page.module.css';

export function QuoteSummary({ onOpenForm }: { onOpenForm: () => void }) {
  const { cart, removeFromQuote, totals, clearQuote, customerStateCode } = useQuote();

  const isSameState = customerStateCode === 24;

  if (cart.length === 0) {
    return (
      <aside className={styles.quoteSummary}>
        <div className={styles.summaryHeader}>
          <span className={styles.summaryTitle}>Your Quotation</span>
          <ShoppingCart size={18} color="var(--color-accent)" />
        </div>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)', textAlign: 'center', padding: '20px 0' }}>
          Select hardware components from the catalog to build your custom quotation estimate.
        </p>
      </aside>
    );
  }

  return (
    <>
      <aside className={styles.quoteSummary}>
        <div className={styles.summaryHeader}>
          <span className={styles.summaryTitle}>Quotation Items</span>
          <button
            type="button"
            onClick={clearQuote}
            style={{ fontSize: 'var(--text-xs)', color: 'var(--color-error)', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <Trash2 size={12} />
            Clear
          </button>
        </div>

        <div className={styles.summaryItemList}>
          {cart.map((item) => {
            const lineTotal = item.product.pricing.pricePaise * item.qty;
            return (
              <div key={item.product.id} className={styles.summaryItem}>
                <div className={styles.summaryItemInfo}>
                  <div className={styles.summaryItemName}>
                    {item.qty}x {item.product.name}
                  </div>
                  <div style={{ color: 'var(--color-text-muted)', fontSize: '0.68rem' }}>
                    {formatPaise(item.product.pricing.pricePaise)} each
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className={styles.summaryItemPrice}>{formatPaise(lineTotal)}</div>
                  <button
                    type="button"
                    onClick={() => removeFromQuote(item.product.id)}
                    style={{ color: 'var(--color-text-muted)', fontSize: '0.65rem', textDecoration: 'underline' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* GST Totals Breakdown */}
        <div className={styles.summaryTotals}>
          <div className={styles.totalRow}>
            <span>Taxable Amount:</span>
            <span>{formatPaise(totals.taxablePaise)}</span>
          </div>

          {isSameState ? (
            <>
              <div className={styles.totalRow}>
                <span>CGST (9%):</span>
                <span>{formatPaise(totals.cgstPaise)}</span>
              </div>
              <div className={styles.totalRow}>
                <span>SGST (9%):</span>
                <span>{formatPaise(totals.sgstPaise)}</span>
              </div>
            </>
          ) : (
            <div className={styles.totalRow}>
              <span>IGST (18%):</span>
              <span>{formatPaise(totals.igstPaise)}</span>
            </div>
          )}

          {totals.roundOffPaise !== 0 && (
            <div className={styles.totalRow}>
              <span>Round Off:</span>
              <span>
                {totals.roundOffPaise > 0 ? '+' : ''}
                {formatPaise(totals.roundOffPaise)}
              </span>
            </div>
          )}

          <div className={styles.grandTotalRow}>
            <span>Estimated Total:</span>
            <span>{formatPaise(totals.grandTotalPaise)}</span>
          </div>
        </div>

        <button type="button" className={styles.getQuoteBtn} onClick={onOpenForm}>
          <span>Get Official Quote</span>
          <ArrowRight size={16} />
        </button>
      </aside>

      {/* Mobile Sticky Bar */}
      <div className={styles.mobileBottomBar}>
        <div>
          <div style={{ fontSize: 'var(--text-xs)', opacity: 0.8 }}>
            {cart.reduce((sum, i) => sum + i.qty, 0)} items in quote
          </div>
          <div style={{ fontSize: 'var(--text-base)', fontWeight: 'bold' }}>
            {formatPaise(totals.grandTotalPaise)}
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenForm}
          className="btn btn--primary"
          style={{ minHeight: '38px', padding: '6px 16px', fontSize: 'var(--text-xs)' }}
        >
          Proceed
          <ArrowRight size={14} />
        </button>
      </div>
    </>
  );
}

