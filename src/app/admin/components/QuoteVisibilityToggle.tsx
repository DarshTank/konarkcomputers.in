"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getClientAuth } from '@/lib/firebase/client';
import {
  FileSpreadsheet,
  Globe,
  Loader2,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
} from 'lucide-react';
import styles from '../admin.module.css';

interface QuoteVisibilityToggleProps {
  initialEnabled: boolean;
}

export function QuoteVisibilityToggle({ initialEnabled }: QuoteVisibilityToggleProps) {
  const router = useRouter();
  const [enabled, setEnabled] = useState(initialEnabled);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Sync state on mount and listen to changes from other tabs
  useEffect(() => {
    fetch('/api/settings/quote', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.enabled === 'boolean') {
          setEnabled(data.enabled);
          try {
            localStorage.setItem('konark_quote_enabled', String(data.enabled));
          } catch {}
        }
      })
      .catch(() => {});

    const handleCustomEvent = (e: any) => {
      if (typeof e.detail?.enabled === 'boolean') {
        setEnabled(e.detail.enabled);
      }
    };
    window.addEventListener('konark:quote-visibility', handleCustomEvent);

    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('konark_settings_channel');
      bc.onmessage = (event) => {
        if (event.data?.type === 'QUOTE_VISIBILITY_CHANGED' && typeof event.data.enabled === 'boolean') {
          setEnabled(event.data.enabled);
        }
      };
    }

    return () => {
      window.removeEventListener('konark:quote-visibility', handleCustomEvent);
      if (bc) bc.close();
    };
  }, []);

  const broadcastChange = (nextState: boolean) => {
    try {
      localStorage.setItem('konark_quote_enabled', String(nextState));
      window.dispatchEvent(new CustomEvent('konark:quote-visibility', { detail: { enabled: nextState } }));
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('konark_settings_channel');
        bc.postMessage({ type: 'QUOTE_VISIBILITY_CHANGED', enabled: nextState });
        bc.close();
      }
    } catch {}
  };

  const handleToggle = async () => {
    if (loading) return;
    const nextState = !enabled;
    setLoading(true);
    setFeedback(null);

    // 1. Optimistic UI update — reflect immediately with zero delay
    setEnabled(nextState);
    broadcastChange(nextState);

    try {
      // Collect auth headers if Firebase client user is signed in
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      try {
        const auth = getClientAuth();
        const idToken = await auth.currentUser?.getIdToken();
        if (idToken) {
          headers['Authorization'] = `Bearer ${idToken}`;
        }
      } catch {}

      const res = await fetch('/api/admin/settings/quote', {
        method: 'POST',
        headers,
        body: JSON.stringify({ enabled: nextState }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Rollback state if server returns error
        setEnabled(!nextState);
        broadcastChange(!nextState);
        throw new Error(data.error || 'Failed to update quotation visibility setting');
      }

      // Re-trigger router refresh for any server components
      try {
        router.refresh();
      } catch {}

      setFeedback({
        type: 'success',
        text: nextState
          ? 'Quotation system is now LIVE! Navbar updated immediately without refresh.'
          : 'Quotation system is now HIDDEN (404)! Navbar updated immediately without refresh.',
      });

      setTimeout(() => setFeedback(null), 5000);
    } catch (err: any) {
      setFeedback({
        type: 'error',
        text: err?.message || 'Network error while updating quotation visibility.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.featureControlCard}>
      {/* Information Column */}
      <div className={styles.featureInfoSide}>
        <div
          className={`${styles.featureIconBadge} ${
            enabled ? styles.featureIconBadgeActive : styles.featureIconBadgeInactive
          }`}
        >
          {enabled ? <Globe size={20} /> : <EyeOff size={20} />}
        </div>

        <div className={styles.featureTextWrap}>
          <div className={styles.featureTitleRow}>
            <span className={styles.featureTitle}>Public Quotation System</span>
            <code className={styles.featureSlugTag}>/quote</code>
            <span
              className={`${styles.featureStatusBadge} ${
                enabled ? styles.featureStatusActive : styles.featureStatusInactive
              }`}
            >
              <span
                className={`${styles.featureStatusDot} ${
                  enabled ? styles.featureStatusDotActive : styles.featureStatusDotInactive
                }`}
              />
              {enabled ? 'Live & Accessible' : 'Hidden (404 Disabled)'}
            </span>
          </div>

          <p className={styles.featureDesc}>
            {enabled ? (
              <>
                Shown in the website navigation bar. Customers can access and build custom quotes at{' '}
                <strong style={{ color: 'var(--color-dark)' }}>konarkcomputers.in/quote</strong>.
              </>
            ) : (
              <>
                Hidden from the navigation bar. Direct URL access to{' '}
                <strong style={{ color: 'var(--color-dark)' }}>/quote</strong> returns a 404 Not Found error.
              </>
            )}
          </p>

          {feedback && (
            <div
              style={{
                marginTop: '6px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: feedback.type === 'success' ? '#047857' : '#b91c1c',
                fontWeight: 600,
              }}
            >
              {feedback.type === 'success' ? <CheckCircle2 size={14} /> : <AlertCircle size={14} />}
              <span>{feedback.text}</span>
            </div>
          )}
        </div>
      </div>

      {/* Actions / Switch Column */}
      <div className={styles.featureActionsSide}>
        <Link
          href="/quote"
          target="_blank"
          className={styles.featurePreviewBtn}
          title={enabled ? 'Open live /quote in a new tab' : 'Test /quote (will show 404 page)'}
        >
          <span>Test /quote</span>
          <ExternalLink size={12} />
        </Link>

        {/* Modern Toggle Switch */}
        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label="Toggle Public Quotation Page"
          onClick={handleToggle}
          disabled={loading}
          className={styles.switchToggleWrap}
          style={{ opacity: loading ? 0.65 : 1 }}
        >
          <div
            className={`${styles.switchTrack} ${
              enabled ? styles.switchTrackActive : styles.switchTrackInactive
            }`}
          >
            <div
              className={`${styles.switchThumb} ${
                enabled ? styles.switchThumbActive : styles.switchThumbInactive
              }`}
            >
              {loading ? (
                <Loader2 size={12} color="var(--color-teal)" className="animate-spin" />
              ) : enabled ? (
                <Eye size={12} color="var(--color-teal)" />
              ) : (
                <EyeOff size={12} color="#94a3b8" />
              )}
            </div>
          </div>
          <span className={styles.switchLabel}>
            {loading ? 'Saving...' : enabled ? 'Enabled' : 'Disabled'}
          </span>
        </button>
      </div>
    </div>
  );
}
