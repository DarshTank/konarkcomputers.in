import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import type { Quote } from '../db/types';
import { formatPaise } from '../pricing/calculator';

/**
 * Generate a professional quotation PDF matching Indian business standards.
 * Returns Uint8Array of PDF bytes.
 */
export async function generateQuotePdf(quote: Quote): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  let page = pdfDoc.addPage([595.28, 841.89]); // A4 size in points (width x height)
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Brand Colors
  const colorDark = rgb(0.1, 0.1, 0.18); // #1a1a2e
  const colorGold = rgb(0.83, 0.65, 0.45); // #d4a574
  const colorTeal = rgb(0.06, 0.59, 0.61); // #0f969c
  const colorText = rgb(0.1, 0.1, 0.1);
  const colorMuted = rgb(0.4, 0.4, 0.45);
  const colorLightBg = rgb(0.96, 0.94, 0.91);
  const colorLine = rgb(0.88, 0.88, 0.88);

  let y = height - 40;

  // Header Banner
  page.drawRectangle({
    x: 0,
    y: height - 100,
    width,
    height: 100,
    color: colorDark,
  });

  // Company Name & Subtitle
  page.drawText(quote.companySnapshot.legalName || 'KONARK COMPUTERS', {
    x: 40,
    y: height - 45,
    size: 20,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  page.drawText('PRECISION IT HARDWARE & REPAIR SERVICES • ESTD. 1999', {
    x: 40,
    y: height - 62,
    size: 8,
    font: fontRegular,
    color: colorGold,
  });

  page.drawText('QUOTATION / ESTIMATE', {
    x: width - 210,
    y: height - 45,
    size: 14,
    font: fontBold,
    color: colorGold,
  });

  page.drawText(`Quote No: ${quote.quoteNumber}`, {
    x: width - 210,
    y: height - 60,
    size: 9,
    font: fontRegular,
    color: rgb(1, 1, 1),
  });

  const quoteDate = new Date(quote.createdAt.seconds * 1000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const validUntilDate = new Date(quote.validUntil.seconds * 1000).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  page.drawText(`Date: ${quoteDate}`, {
    x: width - 210,
    y: height - 73,
    size: 8,
    font: fontRegular,
    color: rgb(0.9, 0.9, 0.9),
  });

  page.drawText(`Valid Until: ${validUntilDate}`, {
    x: width - 210,
    y: height - 85,
    size: 8,
    font: fontRegular,
    color: rgb(0.9, 0.9, 0.9),
  });

  y = height - 125;

  // Two columns: Shop details & Customer details
  // Left: Shop Info
  page.drawText('ISSUED BY:', { x: 40, y, size: 9, font: fontBold, color: colorTeal });
  y -= 14;
  page.drawText(quote.companySnapshot.legalName, { x: 40, y, size: 9, font: fontBold, color: colorText });
  y -= 12;
  page.drawText(quote.companySnapshot.address, { x: 40, y, size: 8, font: fontRegular, color: colorMuted });
  y -= 12;
  page.drawText(`Phone: ${quote.companySnapshot.phone}  |  Email: ${quote.companySnapshot.email}`, {
    x: 40,
    y,
    size: 8,
    font: fontRegular,
    color: colorMuted,
  });
  if (quote.companySnapshot.gstin) {
    y -= 12;
    page.drawText(`GSTIN: ${quote.companySnapshot.gstin} (State Code: 24 - Gujarat)`, {
      x: 40,
      y,
      size: 8,
      font: fontBold,
      color: colorText,
    });
  }

  // Right: Customer Info
  let custY = height - 125;
  const custX = 330;
  page.drawText('QUOTATION FOR:', { x: custX, y: custY, size: 9, font: fontBold, color: colorTeal });
  custY -= 14;
  page.drawText(quote.customer.name, { x: custX, y: custY, size: 9, font: fontBold, color: colorText });
  custY -= 12;
  if (quote.customer.company) {
    page.drawText(quote.customer.company, { x: custX, y: custY, size: 8, font: fontBold, color: colorMuted });
    custY -= 12;
  }
  page.drawText(`Phone: ${quote.customer.phone}`, { x: custX, y: custY, size: 8, font: fontRegular, color: colorMuted });
  custY -= 12;
  if (quote.customer.email) {
    page.drawText(`Email: ${quote.customer.email}`, { x: custX, y: custY, size: 8, font: fontRegular, color: colorMuted });
    custY -= 12;
  }
  page.drawText(`Place of Supply: ${quote.customer.stateName} (Code: ${quote.customer.stateCode})`, {
    x: custX,
    y: custY,
    size: 8,
    font: fontRegular,
    color: colorMuted,
  });
  if (quote.customer.gstin) {
    custY -= 12;
    page.drawText(`Customer GSTIN: ${quote.customer.gstin}`, {
      x: custX,
      y: custY,
      size: 8,
      font: fontBold,
      color: colorText,
    });
  }

  y = Math.min(y, custY) - 25;

  // Table Header
  page.drawRectangle({
    x: 40,
    y: y - 5,
    width: width - 80,
    height: 22,
    color: colorLightBg,
  });

  page.drawText('#', { x: 45, y, size: 8, font: fontBold, color: colorDark });
  page.drawText('ITEM DESCRIPTION', { x: 65, y, size: 8, font: fontBold, color: colorDark });
  page.drawText('HSN/SAC', { x: 260, y, size: 8, font: fontBold, color: colorDark });
  page.drawText('QTY', { x: 320, y, size: 8, font: fontBold, color: colorDark });
  page.drawText('RATE (₹)', { x: 360, y, size: 8, font: fontBold, color: colorDark });
  page.drawText('GST %', { x: 430, y, size: 8, font: fontBold, color: colorDark });
  page.drawText('TOTAL (₹)', { x: 490, y, size: 8, font: fontBold, color: colorDark });

  y -= 22;

  // Table Items
  const allItems = [...quote.items, ...(quote.serviceItems || [])];

  for (let i = 0; i < allItems.length; i++) {
    const item = allItems[i];

    // Page overflow check
    if (y < 120) {
      page = pdfDoc.addPage([595.28, 841.89]);
      y = height - 50;
    }

    page.drawLine({
      start: { x: 40, y: y + 14 },
      end: { x: width - 40, y: y + 14 },
      thickness: 0.5,
      color: colorLine,
    });

    page.drawText(String(i + 1), { x: 45, y, size: 8, font: fontRegular, color: colorText });

    // Item name truncate if needed
    const nameStr = item.name.length > 40 ? item.name.substring(0, 38) + '...' : item.name;
    page.drawText(nameStr, { x: 65, y, size: 8, font: fontBold, color: colorText });

    if (item.specsSummary) {
      const specStr = item.specsSummary.length > 50 ? item.specsSummary.substring(0, 48) + '...' : item.specsSummary;
      page.drawText(specStr, { x: 65, y: y - 10, size: 7, font: fontRegular, color: colorMuted });
    }

    page.drawText(item.hsnCode || '-', { x: 260, y, size: 8, font: fontRegular, color: colorMuted });
    page.drawText(String(item.qty), { x: 325, y, size: 8, font: fontRegular, color: colorText });
    page.drawText((item.unitPricePaise / 100).toFixed(2), { x: 360, y, size: 8, font: fontRegular, color: colorText });
    page.drawText(`${item.gstRateBps / 100}%`, { x: 435, y, size: 8, font: fontRegular, color: colorMuted });
    page.drawText((item.lineTotalPaise / 100).toFixed(2), { x: 490, y, size: 8, font: fontBold, color: colorText });

    y -= item.specsSummary ? 24 : 18;
  }

  // Bottom Line of table
  page.drawLine({
    start: { x: 40, y: y + 10 },
    end: { x: width - 40, y: y + 10 },
    thickness: 1,
    color: colorDark,
  });

  y -= 10;

  // Totals Box (Right aligned)
  const totalsX = 350;
  const valX = 490;

  page.drawText('Subtotal (Taxable):', { x: totalsX, y, size: 8, font: fontRegular, color: colorMuted });
  page.drawText((quote.totals.taxablePaise / 100).toFixed(2), { x: valX, y, size: 8, font: fontRegular, color: colorText });
  y -= 14;

  if (quote.totals.cgstPaise > 0) {
    page.drawText('CGST:', { x: totalsX, y, size: 8, font: fontRegular, color: colorMuted });
    page.drawText((quote.totals.cgstPaise / 100).toFixed(2), { x: valX, y, size: 8, font: fontRegular, color: colorText });
    y -= 14;

    page.drawText('SGST:', { x: totalsX, y, size: 8, font: fontRegular, color: colorMuted });
    page.drawText((quote.totals.sgstPaise / 100).toFixed(2), { x: valX, y, size: 8, font: fontRegular, color: colorText });
    y -= 14;
  }

  if (quote.totals.igstPaise > 0) {
    page.drawText('IGST:', { x: totalsX, y, size: 8, font: fontRegular, color: colorMuted });
    page.drawText((quote.totals.igstPaise / 100).toFixed(2), { x: valX, y, size: 8, font: fontRegular, color: colorText });
    y -= 14;
  }

  if (quote.totals.roundOffPaise !== 0) {
    page.drawText('Round Off:', { x: totalsX, y, size: 8, font: fontRegular, color: colorMuted });
    const sign = quote.totals.roundOffPaise > 0 ? '+' : '';
    page.drawText(`${sign}${(quote.totals.roundOffPaise / 100).toFixed(2)}`, {
      x: valX,
      y,
      size: 8,
      font: fontRegular,
      color: colorMuted,
    });
    y -= 14;
  }

  // Grand Total Bar
  page.drawRectangle({
    x: totalsX - 10,
    y: y - 5,
    width: width - totalsX - 30,
    height: 22,
    color: colorDark,
  });

  page.drawText('GRAND TOTAL:', { x: totalsX, y: y + 2, size: 9, font: fontBold, color: colorGold });
  page.drawText(formatPaise(quote.totals.grandTotalPaise), {
    x: valX - 5,
    y: y + 2,
    size: 10,
    font: fontBold,
    color: rgb(1, 1, 1),
  });

  y -= 35;

  // Terms and Bank details
  page.drawText('Terms & Conditions:', { x: 40, y, size: 8, font: fontBold, color: colorTeal });
  y -= 12;

  const termsLines = (quote.companySnapshot.termsAndConditions || '').split('\n');
  for (const tLine of termsLines) {
    page.drawText(tLine, { x: 40, y, size: 7, font: fontRegular, color: colorMuted });
    y -= 10;
  }

  // Footer Note
  page.drawText(quote.companySnapshot.footerNote || 'Konark Computers — Quality IT Support Since 1999', {
    x: 40,
    y: 30,
    size: 8,
    font: fontBold,
    color: colorTeal,
  });

  page.drawText('This is a computer-generated quotation and does not require a physical signature.', {
    x: 40,
    y: 18,
    size: 7,
    font: fontRegular,
    color: colorMuted,
  });

  return await pdfDoc.save();
}

