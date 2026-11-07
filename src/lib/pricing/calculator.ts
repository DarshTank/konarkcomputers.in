// GST Pricing Calculator — server-authoritative
// All money in INTEGER PAISE (1 rupee = 100 paise). NEVER use floats for money.
// GST rates in basis points (BPS): 1800 = 18%

export interface LineItem {
  productId: string;
  qty: number;
  unitPricePaise: number;
  priceIncludesGst: boolean;
  gstRateBps: number;
  hsnCode: string;
}

export interface CalculatedLine {
  productId: string;
  qty: number;
  unitPricePaise: number;
  priceIncludesGst: boolean;
  gstRateBps: number;
  hsnCode: string;
  taxablePaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  lineTotalPaise: number;
}

export interface CalculatedTotals {
  lines: CalculatedLine[];
  subtotalPaise: number;
  taxablePaise: number;
  cgstPaise: number;
  sgstPaise: number;
  igstPaise: number;
  roundOffPaise: number;
  grandTotalPaise: number;
}

export interface PricingConfig {
  shopStateCode: number;
  customerStateCode: number;
  roundOff: boolean;
}

/**
 * Calculate GST for a single line item.
 *
 * If price INCLUDES GST (inclusive):
 *   taxable = round(price * qty * 10000 / (10000 + rateBps))
 *   gst = (price * qty) - taxable
 *
 * If price EXCLUDES GST (exclusive):
 *   taxable = price * qty
 *   gst = round(taxable * rateBps / 10000)
 *
 * Same state: CGST = SGST = gst/2 (round CGST down, SGST = gst - CGST)
 * Different state: IGST = gst
 */
export function calculateLine(
  item: LineItem,
  isSameState: boolean
): CalculatedLine {
  const lineAmount = item.unitPricePaise * item.qty;

  let taxablePaise: number;
  let gstPaise: number;

  if (item.priceIncludesGst) {
    // Inclusive: extract tax from the price
    // taxable = lineAmount * 10000 / (10000 + rateBps)
    taxablePaise = Math.round((lineAmount * 10000) / (10000 + item.gstRateBps));
    gstPaise = lineAmount - taxablePaise;
  } else {
    // Exclusive: add tax on top
    taxablePaise = lineAmount;
    gstPaise = Math.round((taxablePaise * item.gstRateBps) / 10000);
  }

  let cgstPaise = 0;
  let sgstPaise = 0;
  let igstPaise = 0;

  if (isSameState) {
    // Split equally: CGST + SGST
    cgstPaise = Math.floor(gstPaise / 2);
    sgstPaise = gstPaise - cgstPaise; // ensures cgst + sgst = gst exactly
  } else {
    // Interstate: full IGST
    igstPaise = gstPaise;
  }

  // Line total is always the amount the customer pays
  const lineTotalPaise = taxablePaise + gstPaise;

  return {
    productId: item.productId,
    qty: item.qty,
    unitPricePaise: item.unitPricePaise,
    priceIncludesGst: item.priceIncludesGst,
    gstRateBps: item.gstRateBps,
    hsnCode: item.hsnCode,
    taxablePaise,
    cgstPaise,
    sgstPaise,
    igstPaise,
    lineTotalPaise,
  };
}

/**
 * Calculate totals for all line items.
 * Round-off: adjust grand total to nearest whole rupee (100 paise).
 */
export function calculateTotals(
  items: LineItem[],
  config: PricingConfig
): CalculatedTotals {
  const isSameState = config.shopStateCode === config.customerStateCode;

  const lines = items.map((item) => calculateLine(item, isSameState));

  // Sum all lines
  let subtotalPaise = 0;
  let taxablePaise = 0;
  let cgstPaise = 0;
  let sgstPaise = 0;
  let igstPaise = 0;

  for (const line of lines) {
    subtotalPaise += line.lineTotalPaise;
    taxablePaise += line.taxablePaise;
    cgstPaise += line.cgstPaise;
    sgstPaise += line.sgstPaise;
    igstPaise += line.igstPaise;
  }

  // Round-off to nearest whole rupee
  let roundOffPaise = 0;
  let grandTotalPaise = subtotalPaise;

  if (config.roundOff) {
    const remainder = subtotalPaise % 100;
    if (remainder !== 0) {
      if (remainder <= 50) {
        roundOffPaise = -remainder; // round down
      } else {
        roundOffPaise = 100 - remainder; // round up
      }
      grandTotalPaise = subtotalPaise + roundOffPaise;
    }
  }

  return {
    lines,
    subtotalPaise,
    taxablePaise,
    cgstPaise,
    sgstPaise,
    igstPaise,
    roundOffPaise,
    grandTotalPaise,
  };
}

/**
 * Format paise as rupees string for display.
 * e.g. 12345 → "₹123.45", 10000 → "₹100.00"
 */
export function formatPaise(paise: number): string {
  const rupees = paise / 100;
  return `₹${rupees.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/**
 * Convert rupees (user input) to paise. Input should be a string or number.
 * Handles up to 2 decimal places.
 */
export function rupeesToPaise(rupees: number | string): number {
  const num = typeof rupees === 'string' ? parseFloat(rupees) : rupees;
  if (isNaN(num) || num < 0) {
    throw new Error('Invalid rupee amount');
  }
  return Math.round(num * 100);
}

/**
 * Convert paise to rupees number (for display in form inputs).
 */
export function paiseToRupees(paise: number): number {
  return paise / 100;
}

/**
 * Get GST rate as a percentage from BPS.
 * e.g. 1800 → 18, 500 → 5
 */
export function bpsToPercent(bps: number): number {
  return bps / 100;
}

/**
 * Convert percentage to BPS.
 * e.g. 18 → 1800, 5 → 500
 */
export function percentToBps(percent: number): number {
  return Math.round(percent * 100);
}

