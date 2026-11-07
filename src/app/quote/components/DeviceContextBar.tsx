"use client";

import React from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { Monitor, Laptop, X, ShieldAlert } from 'lucide-react';
import styles from '../page.module.css';

const LAPTOP_BRANDS = [
  'HP',
  'Dell',
  'Lenovo',
  'Asus',
  'Acer',
  'Samsung',
  'Apple',
  'Sony',
  'Toshiba',
  'Other',
];

export function DeviceContextBar() {
  const { deviceContext, setDeviceContext, cartConflicts } = useQuote();

  const handleDeviceTypeChange = (type: 'desktop' | 'laptop' | undefined) => {
    setDeviceContext((prev) => ({
      ...prev,
      deviceType: prev.deviceType === type ? undefined : type,
    }));
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDeviceContext((prev) => ({
      ...prev,
      brand: val || undefined,
    }));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDeviceContext((prev) => ({
      ...prev,
      model: val || undefined,
    }));
  };

  const clearAll = () => {
    setDeviceContext({});
  };

  const hasContext = !!(deviceContext.deviceType || deviceContext.brand || deviceContext.model);

  return (
    <div>
      <div className={styles.deviceContextCard}>
        <div className={styles.deviceContextTitle}>
          <Monitor size={16} />
          <span>Step 1 (Optional): What device are you upgrading?</span>
        </div>

        <div className={styles.deviceContextControls}>
          <div className={styles.devicePillGroup}>
            <button
              type="button"
              className={`${styles.devicePill} ${deviceContext.deviceType === 'desktop' ? styles.devicePillActive : ''}`}
              onClick={() => handleDeviceTypeChange('desktop')}
            >
              Desktop PC
            </button>
            <button
              type="button"
              className={`${styles.devicePill} ${deviceContext.deviceType === 'laptop' ? styles.devicePillActive : ''}`}
              onClick={() => handleDeviceTypeChange('laptop')}
            >
              Laptop
            </button>
          </div>

          {deviceContext.deviceType === 'laptop' && (
            <div className={styles.deviceContextInputs}>
              <select
                className={styles.selectInput}
                value={deviceContext.brand || ''}
                onChange={handleBrandChange}
                aria-label="Laptop Brand"
              >
                <option value="">Select Brand...</option>
                {LAPTOP_BRANDS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <input
                type="text"
                placeholder="Model (e.g. 15-da, Inspiron 3501)"
                value={deviceContext.model || ''}
                onChange={handleModelChange}
                className={styles.textInput}
                aria-label="Laptop Model"
              />
            </div>
          )}

          {hasContext && (
            <button type="button" onClick={clearAll} className={styles.clearContextBtn}>
              Reset Filter
            </button>
          )}
        </div>
      </div>

      {cartConflicts.length > 0 && (
        <div style={{ marginTop: 'var(--space-3)' }} className={styles.conflictAlert}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <ShieldAlert size={16} />
            <span>Cart Configuration Notice</span>
          </div>
          <ul style={{ paddingLeft: '20px', marginTop: '4px' }}>
            {cartConflicts.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

