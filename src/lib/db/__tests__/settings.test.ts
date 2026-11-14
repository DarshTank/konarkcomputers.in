import { describe, it, expect, vi, beforeEach } from 'vitest';
import fs from 'fs';
import {
  getQuoteSettings,
  isQuoteEnabled,
  setQuoteSettings,
  getCompanySettings,
  setCompanySettings,
  getTaxSettings,
  setTaxSettings,
} from '../settings';
import * as adminFirebase from '../../firebase/admin';

describe('Quotation System Visibility Settings', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('defaults to enabled when Firestore has no record', async () => {
    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(null as any);
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    delete (globalThis as any).__KONARK_QUOTE_SETTINGS__;
    const settings = await getQuoteSettings();
    expect(settings.enabled).toBe(true);

    const isEnabled = await isQuoteEnabled();
    expect(isEnabled).toBe(true);
  });

  it('updates and persists settings immediately via setQuoteSettings', async () => {
    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(null as any);
    await setQuoteSettings({ enabled: false, updatedBy: 'admin' });
    expect(await isQuoteEnabled()).toBe(false);

    await setQuoteSettings({ enabled: true, updatedBy: 'admin' });
    expect(await isQuoteEnabled()).toBe(true);
  });

  it('reads false when disabled in Firestore', async () => {
    const mockDb = {
      collection: vi.fn().mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({ enabled: false }),
          }),
        }),
      }),
    };

    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(mockDb as any);
    delete (globalThis as any).__KONARK_QUOTE_SETTINGS__;
    const isEnabled = await isQuoteEnabled();
    expect(isEnabled).toBe(false);
  });

  it('reads true when explicitly enabled in Firestore', async () => {
    const mockDb = {
      collection: vi.fn().mockReturnValue({
        doc: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValue({
            exists: true,
            data: () => ({ enabled: true }),
          }),
        }),
      }),
    };

    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(mockDb as any);
    delete (globalThis as any).__KONARK_QUOTE_SETTINGS__;
    const isEnabled = await isQuoteEnabled();
    expect(isEnabled).toBe(true);
  });

  it('backs off after Firestore quota exhaustion', async () => {
    const get = vi.fn().mockRejectedValue({ code: 8, details: 'Quota exceeded.' });
    const mockDb = {
      collection: vi.fn().mockReturnValue({
        doc: vi.fn().mockReturnValue({ get }),
      }),
    };

    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(mockDb as any);
    delete (globalThis as any).__KONARK_QUOTE_SETTINGS__;
    delete (globalThis as any).__KONARK_QUOTE_SETTINGS_DB_RETRY_AFTER__;

    await getQuoteSettings();
    await getQuoteSettings();

    expect(get).toHaveBeenCalledTimes(1);
  });
});

describe('Company and Tax Settings Persistence', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('loads default company settings and terms & conditions when no store exists', async () => {
    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(null as any);
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);
    delete (globalThis as any).__KONARK_COMPANY_SETTINGS__;

    const company = await getCompanySettings();
    expect(company.legalName).toBe('Konark Computers');
    expect(company.termsAndConditions).toContain('Quotation valid for 7 days');
    expect(company.footerNote).toContain('Serving Rajkot Since 1999');
  });

  it('persists and updates company details and terms & conditions via setCompanySettings', async () => {
    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(null as any);

    const updated = await setCompanySettings({
      legalName: 'Konark IT Solutions',
      termsAndConditions: '1. Custom Term One\n2. Custom Term Two',
      footerNote: 'Custom Footer Note 2026',
    });

    expect(updated.legalName).toBe('Konark IT Solutions');
    expect(updated.termsAndConditions).toBe('1. Custom Term One\n2. Custom Term Two');
    expect(updated.footerNote).toBe('Custom Footer Note 2026');

    const loaded = await getCompanySettings();
    expect(loaded.legalName).toBe('Konark IT Solutions');
    expect(loaded.termsAndConditions).toBe('1. Custom Term One\n2. Custom Term Two');
    expect(loaded.footerNote).toBe('Custom Footer Note 2026');

    // Restore to standard
    await setCompanySettings({
      legalName: 'Konark Computers',
      termsAndConditions: '1. Quotation valid for 7 days from issue date.\n2. Prices subject to stock availability.\n3. Hardware warranty as per OEM manufacturer terms.\n4. Disputes subject to Rajkot jurisdiction.',
      footerNote: 'Konark Computers — Serving Rajkot Since 1999.',
    });
  });

  it('persists and updates tax settings via setTaxSettings', async () => {
    vi.spyOn(adminFirebase, 'getAdminDb').mockReturnValue(null as any);

    const updated = await setTaxSettings({
      quoteValidityDays: 14,
      roundOff: false,
    });

    expect(updated.quoteValidityDays).toBe(14);
    expect(updated.roundOff).toBe(false);

    const loaded = await getTaxSettings();
    expect(loaded.quoteValidityDays).toBe(14);
    expect(loaded.roundOff).toBe(false);

    // Restore
    await setTaxSettings({
      quoteValidityDays: 7,
      roundOff: true,
    });
  });
});
