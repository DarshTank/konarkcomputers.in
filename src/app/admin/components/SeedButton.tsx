"use client";

import React, { useState } from 'react';
import { Database, Loader2, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { getClientFirestore } from '@/lib/firebase/client';
import { doc, setDoc, writeBatch } from 'firebase/firestore';
import {
  SEED_CATEGORIES,
  SEED_BRANDS,
  SEED_ATTRIBUTES,
  SEED_COMPATIBILITY_RULES,
  SEED_PRODUCTS,
  SEED_SERVICES,
  SEED_TAX_SETTINGS,
  SEED_COMPANY_SETTINGS,
} from '@/lib/db/seed-data';

export default function SeedButton() {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSeed = async () => {
    if (!window.confirm('Seed Firestore database with all 353 products, 21 categories, brands, attributes, and compatibility rules?')) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);
    setStatusText('Attempting server-side sync...');

    try {
      // Step 1: Try server API
      const res = await fetch('/api/admin/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        setSuccess(`✅ ${resData.message}`);
        setStatusText(null);
        setTimeout(() => window.location.reload(), 2000);
        return;
      }

      // Step 2: If server has no private key, run authenticated client-side seeding
      setStatusText('Testing connection to your Firestore database...');
      const db = getClientFirestore();

      // Quick ping test to verify database is online and reachable before batching
      try {
        const pingPromise = setDoc(doc(db, 'settings', 'ping'), {
          status: 'ok',
          time: new Date().toISOString(),
        }, { merge: true });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT')), 6000)
        );

        await Promise.race([pingPromise, timeoutPromise]);
      } catch (pingErr: any) {
        if (pingErr?.message === 'TIMEOUT' || pingErr?.code === 'not-found' || pingErr?.message?.includes('NOT_FOUND')) {
          throw new Error('Firestore database not found! Please create your Firestore Native mode database in Firebase Console first, then click Seed.');
        }
        if (pingErr?.message?.includes('Enterprise') || pingErr?.message?.includes('MongoDB')) {
          throw new Error('Database is in MongoDB mode! Please delete it and create a Firestore Native mode database.');
        }
        if (pingErr?.code === 'permission-denied') {
          throw new Error('Permission denied! Check your Firestore Security Rules in Firebase Console (start in Test Mode for initial seed).');
        }
        throw pingErr;
      }

      setStatusText('Connected! Preparing 516 items for seeding...');

      const allDocs: Array<{ path: string; id: string; data: any }> = [];

      allDocs.push({ path: 'settings', id: 'tax', data: SEED_TAX_SETTINGS });
      allDocs.push({ path: 'settings', id: 'company', data: SEED_COMPANY_SETTINGS });
      allDocs.push({
        path: 'counters',
        id: 'quotes',
        data: { currentYear: new Date().getFullYear(), lastNumber: 0 },
      });

      for (const cat of SEED_CATEGORIES) {
        allDocs.push({ path: 'categories', id: cat.id, data: cat });
      }
      for (const b of SEED_BRANDS) {
        allDocs.push({ path: 'brands', id: b.id, data: b });
      }
      for (const a of SEED_ATTRIBUTES) {
        allDocs.push({ path: 'attributeDefinitions', id: a.id, data: a });
      }
      for (const r of SEED_COMPATIBILITY_RULES) {
        allDocs.push({ path: 'compatibilityRules', id: r.id, data: r });
      }
      for (const s of SEED_SERVICES) {
        allDocs.push({ path: 'services', id: s.id, data: s });
      }
      for (const p of SEED_PRODUCTS) {
        allDocs.push({ path: 'products', id: p.id, data: p });
      }

      const CHUNK_SIZE = 150;
      const totalChunks = Math.ceil(allDocs.length / CHUNK_SIZE);

      for (let i = 0; i < allDocs.length; i += CHUNK_SIZE) {
        const chunkIndex = Math.floor(i / CHUNK_SIZE) + 1;
        setStatusText(`Writing batch ${chunkIndex} of ${totalChunks} (${allDocs.length} items)...`);

        const chunk = allDocs.slice(i, i + CHUNK_SIZE);
        const batch = writeBatch(db);

        for (const item of chunk) {
          const docRef = doc(db, item.path, item.id);
          batch.set(docRef, item.data, { merge: true });
        }

        const commitTimeout = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Batch write timed out')), 15000)
        );
        await Promise.race([batch.commit(), commitTimeout]);
      }

      setSuccess(`✅ Successfully seeded all ${allDocs.length} items (353 Products, 21 Categories, 35 Brands) into Firestore!`);
      setStatusText(null);
      setTimeout(() => window.location.reload(), 2000);
    } catch (err: any) {
      console.error('Seed error:', err);
      setError(err?.message || 'Failed to seed database. Check Firestore status in Firebase Console.');
      setStatusText(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        background: 'var(--color-white)',
        border: '1px solid #e2e8f0',
        borderRadius: 'var(--radius-lg)',
        padding: '1.25rem 1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}
    >
      <div style={{ flex: '1 1 320px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Database size={18} color="var(--color-teal)" />
          <h3 style={{ fontSize: 'var(--text-sm)', fontWeight: 700, margin: 0, color: 'var(--color-dark)' }}>
            One-Click Database Seeding
          </h3>
          <span
            style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              background: '#e0f2fe',
              color: '#0369a1',
              padding: '2px 8px',
              borderRadius: '9999px',
            }}
          >
            353 Products Ready
          </span>
        </div>
        <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>
          Click the button to populate Firestore with all 21 categories, 35 brands, 92 attributes, and 353 products directly from the CSV files.
        </p>

        {statusText && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.75rem', color: '#0284c7' }}>
            <Loader2 size={14} className="animate-spin" />
            <span>{statusText}</span>
          </div>
        )}

        {success && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '8px', fontSize: '0.78rem', color: '#16a34a', fontWeight: 600 }}>
            <CheckCircle2 size={16} />
            <span>{success}</span>
          </div>
        )}

        {error && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginTop: '8px', fontSize: '0.75rem', color: '#dc2626' }}>
            <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div>
        <button
          type="button"
          onClick={handleSeed}
          disabled={loading}
          className="btn btn--primary"
          style={{
            background: 'var(--color-teal)',
            color: '#fff',
            padding: '10px 18px',
            fontSize: 'var(--text-xs)',
            fontWeight: 700,
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              <span>Seeding Database...</span>
            </>
          ) : (
            <>
              <RefreshCw size={16} />
              <span>Seed Database Now</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

