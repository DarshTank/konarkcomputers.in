"use client";

import React, { useState, useEffect } from 'react';
import type { TaxSettings, CompanySettings } from '@/lib/db/types';
import { Settings, Save, CheckCircle2 } from 'lucide-react';
import styles from '../admin.module.css';

export default function AdminSettingsPage() {
  const [tax, setTax] = useState<Partial<TaxSettings>>({
    shopStateCode: 24,
    defaultGstRateBps: 1800,
    displayMode: 'inclusive',
    roundOff: true,
    quoteValidityDays: 7,
  });

  const [company, setCompany] = useState<Partial<CompanySettings>>({
    legalName: 'Konark Computers',
    gstin: '24AAAAA0000A1Z5',
    address: '234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002, India',
    phone: '+91 942 642 9416',
    email: 'omesh_tank@yahoo.com',
    bankName: 'State Bank of India',
    bankAccountNo: '300000123456',
    bankIfsc: 'SBIN0001234',
    upiId: 'konarkcomputers@sbi',
    termsAndConditions: '1. Quotation valid for 7 days.\n2. Prices subject to stock availability.\n3. Warranty as per manufacturer terms.',
    footerNote: 'Trusted Computer & Laptop Solutions in Rajkot Since 1999.',
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.tax) setTax(data.tax);
        if (data.company) setCompany(data.company);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tax, company }),
      });

      if (res.ok) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 4000);
      } else {
        alert('Failed to save settings');
      }
    } catch {
      alert('Network error saving settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Tax &amp; Company Settings</h1>
          <p className={styles.pageSubtitle}>
            GST calculation rules, invoice display mode, legal address, banking details, and PDF terms.
          </p>
        </div>
      </div>

      <div className={styles.adminContent}>
        {savedSuccess && (
          <div
            style={{
              background: '#dcfce7',
              border: '1px solid #bbf7d0',
              color: '#166534',
              padding: '12px 16px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: 'var(--text-xs)',
              fontWeight: 'bold',
            }}
          >
            <CheckCircle2 size={16} />
            Settings saved and live catalog cache revalidated successfully!
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Tax Calculation Settings */}
          <div className={styles.settingsCard}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--color-dark)' }}>
              GST &amp; Pricing Computation
            </h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Shop GST State Code (24 = Gujarat)</label>
                <input
                  type="number"
                  value={tax.shopStateCode || 24}
                  onChange={(e) => setTax({ ...tax, shopStateCode: Number(e.target.value) })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Catalog Price Display Mode</label>
                <select
                  value={tax.displayMode || 'inclusive'}
                  onChange={(e) => setTax({ ...tax, displayMode: e.target.value as any })}
                  className={styles.formInput}
                >
                  <option value="inclusive">Inclusive of GST (Recommended for Retail)</option>
                  <option value="exclusive">Exclusive of GST (+Tax added)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Default Hardware GST Rate (BPS)</label>
                <select
                  value={tax.defaultGstRateBps || 1800}
                  onChange={(e) => setTax({ ...tax, defaultGstRateBps: Number(e.target.value) })}
                  className={styles.formInput}
                >
                  <option value={1800}>1800 BPS (18% GST)</option>
                  <option value={1200}>1200 BPS (12% GST)</option>
                  <option value={2800}>2800 BPS (28% GST)</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Quotation Validity Period (Days)</label>
                <input
                  type="number"
                  value={tax.quoteValidityDays || 7}
                  onChange={(e) => setTax({ ...tax, quoteValidityDays: Number(e.target.value) })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={tax.roundOff ?? true}
                    onChange={(e) => setTax({ ...tax, roundOff: e.target.checked })}
                  />
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                    Enable Round-Off Line (Rounds Grand Total to nearest whole rupee)
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Company Legal Profile */}
          <div className={styles.settingsCard}>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '16px', color: 'var(--color-dark)' }}>
              Company Profile &amp; Banking Details
            </h2>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Shop Legal Name</label>
                <input
                  type="text"
                  required
                  value={company.legalName || ''}
                  onChange={(e) => setCompany({ ...company, legalName: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Shop GSTIN Number</label>
                <input
                  type="text"
                  value={company.gstin || ''}
                  onChange={(e) => setCompany({ ...company, gstin: e.target.value.toUpperCase() })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Official Phone</label>
                <input
                  type="text"
                  value={company.phone || ''}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Official Email</label>
                <input
                  type="email"
                  value={company.email || ''}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.formLabel}>Shop Address</label>
                <input
                  type="text"
                  value={company.address || ''}
                  onChange={(e) => setCompany({ ...company, address: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Bank Name (Optional)</label>
                <input
                  type="text"
                  value={company.bankName || ''}
                  onChange={(e) => setCompany({ ...company, bankName: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Account Number (Optional)</label>
                <input
                  type="text"
                  value={company.bankAccountNo || ''}
                  onChange={(e) => setCompany({ ...company, bankAccountNo: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>IFSC Code (Optional)</label>
                <input
                  type="text"
                  value={company.bankIfsc || ''}
                  onChange={(e) => setCompany({ ...company, bankIfsc: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>UPI ID (Optional)</label>
                <input
                  type="text"
                  value={company.upiId || ''}
                  onChange={(e) => setCompany({ ...company, upiId: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.formLabel}>Quotation Terms &amp; Conditions</label>
                <textarea
                  rows={4}
                  value={company.termsAndConditions || ''}
                  onChange={(e) => setCompany({ ...company, termsAndConditions: e.target.value })}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                <label className={styles.formLabel}>Quotation PDF Footer Note</label>
                <input
                  type="text"
                  value={company.footerNote || ''}
                  onChange={(e) => setCompany({ ...company, footerNote: e.target.value })}
                  className={styles.formInput}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              className="btn btn--primary"
              style={{ minHeight: '44px', padding: '0 28px' }}
            >
              <Save size={16} />
              {saving ? 'Saving Settings...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

