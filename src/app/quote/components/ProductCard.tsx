"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { useQuote } from '@/contexts/QuoteContext';
import type { Product } from '@/lib/db/types';
import { formatPaise } from '@/lib/pricing/calculator';
import { CheckCircle2, AlertTriangle, HelpCircle, Plus, Minus, Check } from 'lucide-react';
import styles from '../page.module.css';

export function ProductCard({ product }: { product: Product }) {
  const { cart, addToQuote, updateQty, removeFromQuote, getCompatibility, taxSettings } = useQuote();

  const [overrideIncompat, setOverrideIncompat] = useState(false);

  const cartItem = cart.find((i) => i.product.id === product.id);
  const qtyInCart = cartItem?.qty || 0;

  // Evaluate compatibility
  const compat = getCompatibility(product);

  const isCompatible = compat.status === 'compatible';
  const isIncompatible = compat.status === 'incompatible';
  const isCheck = compat.status === 'check';

  // Highlight message
  const highlightReason = compat.reasons.find((r) => r.severity === 'info')?.message || 'Compatible with your selection';
  const blockReason = compat.reasons.find((r) => r.severity === 'block')?.message || 'May not fit your current selection';

  // Price calculation according to displayMode
  const isInclusiveSetting = taxSettings.displayMode === 'inclusive';
  let displayedPricePaise = product.pricing.pricePaise;
  let taxNote = '';

  if (product.pricing.priceIncludesGst) {
    if (isInclusiveSetting) {
      displayedPricePaise = product.pricing.pricePaise;
      taxNote = `(incl. ${product.pricing.gstRateBps / 100}% GST)`;
    } else {
      // Exclusive mode: extract taxable
      displayedPricePaise = Math.round((product.pricing.pricePaise * 10000) / (10000 + product.pricing.gstRateBps));
      taxNote = `(+${product.pricing.gstRateBps / 100}% GST extra)`;
    }
  } else {
    if (isInclusiveSetting) {
      displayedPricePaise = Math.round(product.pricing.pricePaise * (1 + product.pricing.gstRateBps / 10000));
      taxNote = `(incl. ${product.pricing.gstRateBps / 100}% GST)`;
    } else {
      displayedPricePaise = product.pricing.pricePaise;
      taxNote = `(+${product.pricing.gstRateBps / 100}% GST extra)`;
    }
  }

  // Feature Flag for Product Images
  const enableImages = process.env.NEXT_PUBLIC_ENABLE_PRODUCT_IMAGES === 'true';
  const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];

  const handleAdd = () => {
    addToQuote(product, 1);
  };

  const handleIncrement = () => {
    updateQty(product.id, qtyInCart + 1);
  };

  const handleDecrement = () => {
    if (qtyInCart <= 1) {
      removeFromQuote(product.id);
    } else {
      updateQty(product.id, qtyInCart - 1);
    }
  };

  return (
    <div
      className={`${styles.card} ${
        isCompatible ? styles.cardCompatible : ''
      } ${isIncompatible && !overrideIncompat ? styles.cardIncompatible : ''}`}
    >
      {/* Compatibility Badges */}
      {isCompatible && (
        <span className={`${styles.compatBadge}`}>
          <CheckCircle2 size={12} />
          {highlightReason}
        </span>
      )}

      {isCheck && (
        <span className={`${styles.compatBadge} ${styles.badgeCheck}`}>
          <HelpCircle size={12} />
          Please confirm with shop
        </span>
      )}

      {isIncompatible && (
        <div className={styles.incompatReason}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={12} />
            <strong>Incompatible:</strong>
          </div>
          <span>{blockReason}</span>
          {!overrideIncompat && (
            <button
              type="button"
              onClick={() => setOverrideIncompat(true)}
              style={{
                display: 'block',
                marginTop: '4px',
                fontSize: '0.68rem',
                color: 'var(--color-dark)',
                textDecoration: 'underline',
              }}
            >
              Add anyway
            </button>
          )}
        </div>
      )}

      {/* Image slot behind feature flag */}
      {enableImages && primaryImage && (
        <div style={{ position: 'relative', width: '100%', height: 140, marginBottom: '8px' }}>
          <Image
            src={primaryImage.url}
            alt={primaryImage.alt || product.name}
            fill
            sizes="(max-width: 768px) 100vw, 300px"
            style={{ objectFit: 'contain' }}
          />
        </div>
      )}

      <h3 className={styles.cardTitle}>{product.name}</h3>

      <div className={styles.cardMeta}>
        <span className={styles.conditionBadge}>{product.condition}</span>
        <span style={{ color: 'var(--color-text-muted)' }}>Warranty: {product.warrantyMonths}m</span>
      </div>

      <div className={styles.cardSpecs}>
        {Object.entries(product.specs)
          .slice(0, 4)
          .map(([k, v]) => (
            <div key={k} className={styles.specRow}>
              <span style={{ textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}:</span>
              <strong>{String(v)}</strong>
            </div>
          ))}
      </div>

      <div className={styles.priceBlock}>
        <div className={styles.priceAmount}>{formatPaise(displayedPricePaise)}</div>
        <div className={styles.priceTaxNote}>{taxNote}</div>
      </div>

      <div className={styles.cardActions}>
        {qtyInCart > 0 ? (
          <div className={styles.qtyStepper}>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className={styles.stepperQty}>{qtyInCart} in quote</span>
            <button
              type="button"
              className={styles.stepperBtn}
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className={`${styles.addBtn} ${
              isIncompatible && !overrideIncompat ? styles.addBtnDisabled : ''
            }`}
            onClick={handleAdd}
            disabled={isIncompatible && !overrideIncompat}
          >
            <Plus size={14} />
            Add to Quote
          </button>
        )}
      </div>
    </div>
  );
}

