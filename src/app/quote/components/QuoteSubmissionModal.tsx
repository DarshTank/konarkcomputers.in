"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useQuote } from '@/contexts/QuoteContext';
import { INDIAN_STATES } from '@/lib/constants/states';
import { formatPaise } from '@/lib/pricing/calculator';
import { X, Send, Loader2, CheckCircle2 } from 'lucide-react';
import styles from '../page.module.css';

export function QuoteSubmissionModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { cart, deviceContext, totals, customerStateCode, setCustomerStateCode } = useQuote();

  const [name, setName] = useState('');
  const [phoneRaw, setPhoneRaw] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('Rajkot');
  const [company, setCompany] = useState('');
  const [gstin, setGstin] = useState('');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Clean phone number: Indian numbers should be +91 followed by 10 digits
    let cleanedPhone = phoneRaw.replace(/\D/g, '');
    if (cleanedPhone.length === 10) {
      cleanedPhone = `+91${cleanedPhone}`;
    } else if (cleanedPhone.length === 12 && cleanedPhone.startsWith('91')) {
      cleanedPhone = `+${cleanedPhone}`;
    } else {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }

    // State name
    const stateObj = INDIAN_STATES.find((s) => s.code === customerStateCode) || {
      code: 24,
      name: 'Gujarat',
    };

    setLoading(true);

    try {
      const payload = {
        items: cart.map((i) => ({ productId: i.product.id, qty: i.qty })),
        customer: {
          name: name.trim(),
          phone: cleanedPhone,
          email: email.trim() || undefined,
          city: city.trim() || undefined,
          stateCode: stateObj.code,
          stateName: stateObj.name,
          company: company.trim() || undefined,
          gstin: gstin.trim() ? gstin.trim().toUpperCase() : undefined,
        },
        deviceContext,
        notes: notes.trim() || undefined,
        honeypot,
      };

      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate quotation.');
      }

      // Track Google Analytics event if available
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'quote_submitted', {
          quote_number: data.quoteNumber,
          grand_total_paise: totals.grandTotalPaise,
        });
      }

      // Redirect to quotation page
      router.push(`/quote/${data.publicToken}`);
    } catch (err: any) {
      setError(err?.message || 'Error creating quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.modalClose}
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-dark)', marginBottom: '8px' }}>
          Request Official Quotation
        </h2>
        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
          Review your estimate ({formatPaise(totals.grandTotalPaise)}) and receive an official PDF quotation with valid serialised quotation number.
        </p>

        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '10px', borderRadius: '8px', fontSize: 'var(--text-xs)', marginTop: '12px' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ marginTop: '16px' }}>
          {/* Honeypot field (hidden from real users) */}
          <div style={{ display: 'none' }} aria-hidden="true">
            <input
              type="text"
              name="honeypot"
              tabIndex={-1}
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Full Name <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Rahul Patel"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Mobile Number <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <input
                type="tel"
                required
                placeholder="10-digit number (e.g. 9876543210)"
                value={phoneRaw}
                onChange={(e) => setPhoneRaw(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email Address (for PDF copy)</label>
              <input
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>City</label>
              <input
                type="text"
                placeholder="e.g. Rajkot, Ahmedabad"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                State (GST Place of Supply) <span style={{ color: 'var(--color-error)' }}>*</span>
              </label>
              <select
                value={customerStateCode}
                onChange={(e) => setCustomerStateCode(Number(e.target.value))}
                className={styles.formInput}
              >
                {INDIAN_STATES.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name} ({s.code === 24 ? 'Gujarat - CGST+SGST' : 'IGST'})
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Company Name (Optional)</label>
              <input
                type="text"
                placeholder="e.g. ABC Technologies Pvt Ltd"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={styles.formInput}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.formLabel}>Customer GSTIN (Optional)</label>
              <input
                type="text"
                placeholder="e.g. 24AAAAA0000A1Z5"
                value={gstin}
                onChange={(e) => setGstin(e.target.value.toUpperCase())}
                className={styles.formInput}
              />
            </div>

            <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
              <label className={styles.formLabel}>Notes or Special Requirements</label>
              <textarea
                rows={2}
                placeholder="Any specific model or installation assistance needed?"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className={styles.formInput}
              />
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              className="btn btn--outline"
              onClick={onClose}
              style={{ color: 'var(--color-dark)', borderColor: 'var(--color-border)', minHeight: '44px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn--primary"
              style={{ minHeight: '44px' }}
            >
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Submit Quotation
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

