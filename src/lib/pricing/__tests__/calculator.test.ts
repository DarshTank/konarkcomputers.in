import { describe, it, expect } from 'vitest';
import {
  calculateLine,
  calculateTotals,
  formatPaise,
  rupeesToPaise,
  paiseToRupees,
  type LineItem,
} from '../calculator';

describe('GST Pricing Calculator', () => {
  it('converts between rupees and paise correctly', () => {
    expect(rupeesToPaise(100)).toBe(10000);
    expect(rupeesToPaise('1850.50')).toBe(185050);
    expect(rupeesToPaise('0.99')).toBe(99);
    expect(paiseToRupees(185050)).toBe(1850.5);
    expect(formatPaise(185050)).toBe('₹1,850.50');
  });

  describe('Single Line Calculations', () => {
    it('calculates GST for INCLUSIVE pricing within Gujarat (intra-state CGST + SGST)', () => {
      // 1 item @ ₹1,180.00 inclusive of 18% GST
      // Taxable = 118000 * 10000 / 11800 = 100000 (₹1,000.00)
      // Total GST = 18000 (₹180.00)
      // CGST = ₹90.00, SGST = ₹90.00
      const item: LineItem = {
        productId: 'test-ram',
        qty: 1,
        unitPricePaise: 118000,
        priceIncludesGst: true,
        gstRateBps: 1800,
        hsnCode: '847330',
      };

      const result = calculateLine(item, true); // same state (Gujarat)

      expect(result.taxablePaise).toBe(100000);
      expect(result.cgstPaise).toBe(9000);
      expect(result.sgstPaise).toBe(9000);
      expect(result.igstPaise).toBe(0);
      expect(result.lineTotalPaise).toBe(118000);
      expect(result.taxablePaise + result.cgstPaise + result.sgstPaise).toBe(result.lineTotalPaise);
    });

    it('calculates GST for INCLUSIVE pricing outside Gujarat (inter-state IGST)', () => {
      const item: LineItem = {
        productId: 'test-ram',
        qty: 1,
        unitPricePaise: 118000,
        priceIncludesGst: true,
        gstRateBps: 1800,
        hsnCode: '847330',
      };

      const result = calculateLine(item, false); // different state (e.g. Maharashtra)

      expect(result.taxablePaise).toBe(100000);
      expect(result.cgstPaise).toBe(0);
      expect(result.sgstPaise).toBe(0);
      expect(result.igstPaise).toBe(18000);
      expect(result.lineTotalPaise).toBe(118000);
      expect(result.taxablePaise + result.igstPaise).toBe(result.lineTotalPaise);
    });

    it('calculates GST for EXCLUSIVE pricing within Gujarat', () => {
      // 1 item @ ₹1,000.00 exclusive of 18% GST
      // Taxable = 100000 (₹1,000.00)
      // GST = 18000 (₹180.00)
      // Total = 118000 (₹1,180.00)
      const item: LineItem = {
        productId: 'test-ram',
        qty: 1,
        unitPricePaise: 100000,
        priceIncludesGst: false,
        gstRateBps: 1800,
        hsnCode: '847330',
      };

      const result = calculateLine(item, true);

      expect(result.taxablePaise).toBe(100000);
      expect(result.cgstPaise).toBe(9000);
      expect(result.sgstPaise).toBe(9000);
      expect(result.igstPaise).toBe(0);
      expect(result.lineTotalPaise).toBe(118000);
    });

    it('handles odd paise GST splits without losing a paisa', () => {
      // Item with odd GST amount
      const item: LineItem = {
        productId: 'odd-item',
        qty: 1,
        unitPricePaise: 10005, // ₹100.05
        priceIncludesGst: false,
        gstRateBps: 1800,
        hsnCode: '847330',
      };

      const result = calculateLine(item, true);
      // CGST + SGST must exactly equal total GST
      const totalGst = result.cgstPaise + result.sgstPaise;
      expect(result.taxablePaise + totalGst).toBe(result.lineTotalPaise);
    });

    it('multiplies by quantity correctly', () => {
      const item: LineItem = {
        productId: 'test-ram',
        qty: 4,
        unitPricePaise: 100000,
        priceIncludesGst: false,
        gstRateBps: 1800,
        hsnCode: '847330',
      };

      const result = calculateLine(item, true);

      expect(result.taxablePaise).toBe(400000);
      expect(result.cgstPaise).toBe(36000);
      expect(result.sgstPaise).toBe(36000);
      expect(result.lineTotalPaise).toBe(472000);
    });
  });

  describe('Totals & Round-off', () => {
    it('calculates totals with round-off to nearest whole rupee', () => {
      // 3 items with fractional rupee amounts
      const items: LineItem[] = [
        {
          productId: 'item-1',
          qty: 1,
          unitPricePaise: 10040, // ₹100.40
          priceIncludesGst: true,
          gstRateBps: 1800,
          hsnCode: '847330',
        },
      ];

      const config = {
        shopStateCode: 24,
        customerStateCode: 24,
        roundOff: true,
      };

      const totals = calculateTotals(items, config);

      expect(totals.subtotalPaise).toBe(10040);
      expect(totals.roundOffPaise).toBe(-40); // rounds down to 10000 (₹100.00)
      expect(totals.grandTotalPaise).toBe(10000);
    });

    it('rounds up when remainder is > 50 paise', () => {
      const items: LineItem[] = [
        {
          productId: 'item-1',
          qty: 1,
          unitPricePaise: 10075, // ₹100.75
          priceIncludesGst: true,
          gstRateBps: 1800,
          hsnCode: '847330',
        },
      ];

      const config = {
        shopStateCode: 24,
        customerStateCode: 24,
        roundOff: true,
      };

      const totals = calculateTotals(items, config);

      expect(totals.subtotalPaise).toBe(10075);
      expect(totals.roundOffPaise).toBe(25); // rounds up to 10100 (₹101.00)
      expect(totals.grandTotalPaise).toBe(10100);
    });
  });
});

