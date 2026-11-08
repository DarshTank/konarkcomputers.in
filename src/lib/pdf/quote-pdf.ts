import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';
import path from 'path';
import type { Quote } from '../db/types';

/**
 * Format date as DD-MM-YYYY (e.g. 18-09-2026)
 */
function formatDateDDMMYYYY(seconds?: number): string {
  const d = seconds ? new Date(seconds * 1000) : new Date();
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

/**
 * Safely embed product or logo image (PNG / JPG) into PDF.
 * Handles both remote URLs and local /public files.
 */
async function loadImage(pdfDoc: PDFDocument, url?: string) {
  if (!url) return null;
  try {
    let bytes: Buffer | null = null;
    let isPng = false;
    let isJpg = false;

    if (url.startsWith('http://') || url.startsWith('https://')) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2500);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timer);
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        bytes = Buffer.from(arrayBuf);
        const contentType = res.headers.get('content-type') || '';
        isPng = contentType.includes('png') || url.toLowerCase().includes('.png');
        isJpg = contentType.includes('jpeg') || contentType.includes('jpg') || url.toLowerCase().includes('.jpg') || url.toLowerCase().includes('.jpeg');
      }
    } else if (url.startsWith('/')) {
      const localPath = path.join(process.cwd(), 'public', url.replace(/^\//, ''));
      if (fs.existsSync(localPath)) {
        bytes = fs.readFileSync(localPath);
        isPng = url.toLowerCase().endsWith('.png');
        isJpg = url.toLowerCase().endsWith('.jpg') || url.toLowerCase().endsWith('.jpeg');
      }
    }

    if (bytes) {
      if (isPng) return await pdfDoc.embedPng(bytes);
      if (isJpg) return await pdfDoc.embedJpg(bytes);
      try {
        return await pdfDoc.embedPng(bytes);
      } catch {
        return await pdfDoc.embedJpg(bytes);
      }
    }
  } catch {}
  return null;
}

/**
 * Generate official Konark Computers Quotation matching the exact signature layout:
 * - Header: Company Logo, Legal Name, Address, Contact, GSTIN, Customer details, Date
 * - Yellow Header Bar (Product | Total Rate)
 * - Grid rows with product image thumbnail and clean titles
 * - Empty continuation grid rows filling the sheet
 * - Vibrant Orange Summary Bar (Call Now | With GST | Total)
 * - Royal Blue Bar (Phone | Website | Founder Name)
 * - Footer: Terms & Conditions and Footer Note (editable from Admin settings), Bank details, Signatory
 */
export async function generateQuotePdf(quote: Quote): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // Standard A4 in points
  const { width, height } = page.getSize();

  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Exact Brand Colors
  const black = rgb(0, 0, 0);
  const white = rgb(1, 1, 1);
  const brightYellow = rgb(1, 0.92, 0); // #ffea00 / bright yellow
  const vibrantOrange = rgb(1, 0.58, 0); // #ff9400 / bright orange
  const royalBlue = rgb(0, 0.33, 0.85); // #0055d8 / signature royal blue
  const textDark = rgb(0.12, 0.12, 0.12);
  const textGray = rgb(0.35, 0.35, 0.35);
  const lineGray = rgb(0.8, 0.8, 0.8);
  const greenCall = rgb(0.1, 0.6, 0.2);

  const leftMargin = 28;
  const tableWidth = width - leftMargin * 2; // 539.28 pt
  const col1Width = 90; // Image column
  const col3Width = 125; // Total Rate column
  const col2Width = tableWidth - col1Width - col3Width; // 324.28 pt Product column

  const dateStr = formatDateDDMMYYYY(quote.createdAt?.seconds);
  const customerName = (quote.customer?.name || 'Customer').trim();
  const company = quote.companySnapshot || {
    legalName: 'Konark Computers',
    gstin: '24AAAAA0000A1Z5',
    address: '234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002, India',
    phone: '+91 942 642 9416',
    email: 'omesh_tank@yahoo.com',
    termsAndConditions: '1. Quotation valid for 7 days from issue date.\n2. Prices subject to stock availability.\n3. Hardware warranty as per OEM manufacturer terms.\n4. Disputes subject to Rajkot jurisdiction.',
    footerNote: 'Konark Computers — Serving Rajkot Since 1999.',
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // 1. TOP HEADER: COMPANY DETAILS & LOGO
  // ═══════════════════════════════════════════════════════════════════════════
  const headerTop = height - 20;

  // A. Company Logo (Left side)
  try {
    const logoEmbed = await loadImage(pdfDoc, '/logo2.png');
    if (logoEmbed) {
      const targetHeight = 44;
      const scale = targetHeight / logoEmbed.height;
      const targetWidth = logoEmbed.width * scale;
      page.drawImage(logoEmbed, {
        x: leftMargin,
        y: headerTop - targetHeight,
        width: targetWidth,
        height: targetHeight,
      });
    } else {
      // Fallback text logo
      page.drawText(company.legalName || 'Konark Computers', {
        x: leftMargin,
        y: headerTop - 18,
        size: 16,
        font: fontBold,
        color: royalBlue,
      });
    }
  } catch {}

  // B. Company Information (Right side)
  const rightEdge = leftMargin + tableWidth;

  const legalNameStr = company.legalName || 'Konark Computers';
  const legalNameW = fontBold.widthOfTextAtSize(legalNameStr, 13);
  page.drawText(legalNameStr, {
    x: rightEdge - legalNameW,
    y: headerTop - 12,
    size: 13,
    font: fontBold,
    color: black,
  });

  const subtitleStr = 'Computer & Laptop Solutions, IT Hardware & Networking';
  const subtitleW = fontRegular.widthOfTextAtSize(subtitleStr, 7.5);
  page.drawText(subtitleStr, {
    x: rightEdge - subtitleW,
    y: headerTop - 23,
    size: 7.5,
    font: fontRegular,
    color: textGray,
  });

  const addressStr = company.address || 'Rajkot, Gujarat, India';
  const addressW = fontRegular.widthOfTextAtSize(addressStr, 7.5);
  page.drawText(addressStr, {
    x: rightEdge - addressW,
    y: headerTop - 33,
    size: 7.5,
    font: fontRegular,
    color: textGray,
  });

  const contactStr = `Phone: ${company.phone || '+91 942 642 9416'}   Email: ${company.email || 'omesh_tank@yahoo.com'}`;
  const contactW = fontRegular.widthOfTextAtSize(contactStr, 7.5);
  page.drawText(contactStr, {
    x: rightEdge - contactW,
    y: headerTop - 43,
    size: 7.5,
    font: fontRegular,
    color: textGray,
  });

  if (company.gstin) {
    const gstinStr = `GSTIN: ${company.gstin}`;
    const gstinW = fontBold.widthOfTextAtSize(gstinStr, 8);
    page.drawText(gstinStr, {
      x: rightEdge - gstinW,
      y: headerTop - 54,
      size: 8,
      font: fontBold,
      color: textDark,
    });
  }

  // Divider rule below header
  const headerDividerY = headerTop - 62;
  page.drawLine({
    start: { x: leftMargin, y: headerDividerY },
    end: { x: rightEdge, y: headerDividerY },
    color: lineGray,
    thickness: 1,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. CUSTOMER & QUOTATION STRIP
  // ═══════════════════════════════════════════════════════════════════════════
  const custRowY = headerDividerY - 18;

  // Customer Name (Left)
  const custLabel = `Customer: ${customerName}`;
  page.drawText(custLabel, {
    x: leftMargin,
    y: custRowY,
    size: 11,
    font: fontBold,
    color: black,
  });

  // Customer Phone (if present)
  if (quote.customer?.phone) {
    page.drawText(`(M: ${quote.customer.phone})`, {
      x: leftMargin + fontBold.widthOfTextAtSize(custLabel, 11) + 8,
      y: custRowY,
      size: 9.5,
      font: fontRegular,
      color: textGray,
    });
  }

  // Quote Number & Date (Right)
  const metaRightStr = `${quote.quoteNumber ? quote.quoteNumber + '   ' : ''}Date: ${dateStr}`;
  const metaRightW = fontBold.widthOfTextAtSize(metaRightStr, 10.5);
  page.drawText(metaRightStr, {
    x: rightEdge - metaRightW,
    y: custRowY,
    size: 10.5,
    font: fontBold,
    color: black,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. TABLE DIMENSIONS & COORDINATES
  // ═══════════════════════════════════════════════════════════════════════════
  const tableTop = custRowY - 12;
  const headerHeight = 22;
  const orangeBarHeight = 26;
  const blueBarHeight = 22;
  const bottomBarsHeight = orangeBarHeight + blueBarHeight;

  // Footer space at bottom (Terms & Conditions, Footer note, Signatory)
  const footerReservedHeight = 100;
  const tableBottom = 16 + footerReservedHeight + bottomBarsHeight;
  const totalItemAreaHeight = tableTop - headerHeight - tableBottom;

  // 8 uniform rows to reproduce the signature sheet
  const totalRowsCount = Math.max(8, Math.min(10, quote.items.length));
  const rowHeight = totalItemAreaHeight / totalRowsCount;

  // Yellow Table Header Bar
  const headerY = tableTop - headerHeight;
  page.drawRectangle({
    x: leftMargin,
    y: headerY,
    width: tableWidth,
    height: headerHeight,
    color: brightYellow,
    borderColor: black,
    borderWidth: 1.5,
  });

  // Vertical separator lines in header
  page.drawLine({
    start: { x: leftMargin + col1Width, y: headerY },
    end: { x: leftMargin + col1Width, y: headerY + headerHeight },
    color: black,
    thickness: 1.5,
  });
  page.drawLine({
    start: { x: leftMargin + col1Width + col2Width, y: headerY },
    end: { x: leftMargin + col1Width + col2Width, y: headerY + headerHeight },
    color: black,
    thickness: 1.5,
  });

  // Header Titles
  page.drawText('Product', {
    x: leftMargin + col1Width + 10,
    y: headerY + 6.5,
    size: 10.5,
    font: fontBold,
    color: black,
  });

  const totalRateHeader = 'Total Rate';
  const totalRateHeaderW = fontBold.widthOfTextAtSize(totalRateHeader, 10.5);
  page.drawText(totalRateHeader, {
    x: leftMargin + col1Width + col2Width + col3Width - totalRateHeaderW - 14,
    y: headerY + 6.5,
    size: 10.5,
    font: fontBold,
    color: black,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. TABLE ROWS (ITEMS & EMPTY SLOTS)
  // ═══════════════════════════════════════════════════════════════════════════
  let currentY = headerY;

  for (let i = 0; i < totalRowsCount; i++) {
    const item = quote.items[i];
    const rowY = currentY - rowHeight;

    // Row border
    page.drawRectangle({
      x: leftMargin,
      y: rowY,
      width: tableWidth,
      height: rowHeight,
      borderColor: black,
      borderWidth: 1,
    });

    // Vertical column divider 1 (between image and product)
    page.drawLine({
      start: { x: leftMargin + col1Width, y: rowY },
      end: { x: leftMargin + col1Width, y: rowY + rowHeight },
      color: black,
      thickness: 1,
    });

    // Vertical column divider 2 (between product and rate)
    page.drawLine({
      start: { x: leftMargin + col1Width + col2Width, y: rowY },
      end: { x: leftMargin + col1Width + col2Width, y: rowY + rowHeight },
      color: black,
      thickness: 1,
    });

    if (item) {
      // Draw product image in Col 1
      try {
        const imageEmbed = await loadImage(pdfDoc, item.imageUrl);
        if (imageEmbed) {
          const maxImgW = col1Width - 14;
          const maxImgH = rowHeight - 8;
          const imgScale = Math.min(maxImgW / imageEmbed.width, maxImgH / imageEmbed.height, 1);
          const scaledW = imageEmbed.width * imgScale;
          const scaledH = imageEmbed.height * imgScale;

          page.drawImage(imageEmbed, {
            x: leftMargin + (col1Width - scaledW) / 2,
            y: rowY + (rowHeight - scaledH) / 2,
            width: scaledW,
            height: scaledH,
          });
        }
      } catch {}

      // Draw Product Name in Col 2 (with quantity multiplier if > 1)
      let title = item.name.toUpperCase();
      if (item.qty > 1) {
        title += ` x ${item.qty}`;
      }

      const fontSize = 9.5;
      const maxTextWidth = col2Width - 16;
      const words = title.split(' ');
      const lines: string[] = [];
      let currentLine = '';

      for (const w of words) {
        const testLine = currentLine ? `${currentLine} ${w}` : w;
        if (fontBold.widthOfTextAtSize(testLine, fontSize) > maxTextWidth) {
          if (currentLine) lines.push(currentLine);
          currentLine = w;
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) lines.push(currentLine);

      const totalTextH = lines.length * 12;
      let textStartY = rowY + (rowHeight + totalTextH) / 2 - 9;

      for (const lineText of lines.slice(0, 3)) {
        page.drawText(lineText, {
          x: leftMargin + col1Width + 10,
          y: textStartY,
          size: fontSize,
          font: fontBold,
          color: textDark,
        });
        textStartY -= 12;
      }

      // Draw Rate in Col 3 (Total Rate & Per Item Cost)
      const lineTotalPaise = item.lineTotalPaise ?? ((item.unitPricePaise || 0) * (item.qty || 1));
      const unitPricePaise = item.unitPricePaise ?? (item.qty ? lineTotalPaise / item.qty : lineTotalPaise);

      const lineTotalFormatted = (lineTotalPaise / 100).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const unitPriceFormatted = (unitPricePaise / 100).toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      const rateColRight = leftMargin + col1Width + col2Width + col3Width - 14;

      if (item.qty > 1) {
        // Line Total
        const totalText = `Rs. ${lineTotalFormatted}`;
        const totalW = fontBold.widthOfTextAtSize(totalText, 10.5);
        page.drawText(totalText, {
          x: rateColRight - totalW,
          y: rowY + rowHeight / 2 + 3,
          size: 10.5,
          font: fontBold,
          color: black,
        });

        // Per-item cost
        const perItemText = `(@ Rs. ${unitPriceFormatted} each)`;
        const perItemW = fontRegular.widthOfTextAtSize(perItemText, 7.5);
        page.drawText(perItemText, {
          x: rateColRight - perItemW,
          y: rowY + rowHeight / 2 - 9,
          size: 7.5,
          font: fontRegular,
          color: textGray,
        });
      } else {
        // Single Item Rate
        const rateText = `Rs. ${lineTotalFormatted}`;
        const rateW = fontBold.widthOfTextAtSize(rateText, 10.5);
        page.drawText(rateText, {
          x: rateColRight - rateW,
          y: rowY + (rowHeight - 10.5) / 2,
          size: 10.5,
          font: fontBold,
          color: black,
        });
      }
    }

    currentY = rowY;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // 5. VIBRANT ORANGE SUMMARY ROW
  // ═══════════════════════════════════════════════════════════════════════════
  const orangeY = currentY - orangeBarHeight;
  page.drawRectangle({
    x: leftMargin,
    y: orangeY,
    width: tableWidth,
    height: orangeBarHeight,
    color: vibrantOrange,
    borderColor: black,
    borderWidth: 1.5,
  });

  page.drawLine({
    start: { x: leftMargin + col1Width + col2Width, y: orangeY },
    end: { x: leftMargin + col1Width + col2Width, y: orangeY + orangeBarHeight },
    color: black,
    thickness: 1.5,
  });

  // Call Now pill on left
  page.drawText('Call Now', {
    x: leftMargin + 20,
    y: orangeY + 8,
    size: 10.5,
    font: fontBold,
    color: greenCall,
  });

  // Tax note in middle ("With GST")
  page.drawText('With GST', {
    x: leftMargin + col1Width + col2Width - 72,
    y: orangeY + 8,
    size: 10.5,
    font: fontBold,
    color: black,
  });

  // Grand Total on right
  const grandTotalStr = (quote.totals.grandTotalPaise / 100).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const totalFormattedText = `Rs. ${grandTotalStr}`;
  page.drawText(totalFormattedText, {
    x: leftMargin + col1Width + col2Width + 12,
    y: orangeY + 7.5,
    size: 12,
    font: fontBold,
    color: black,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 6. SIGNATURE ROYAL BLUE BAR
  // ═══════════════════════════════════════════════════════════════════════════
  const blueY = orangeY - blueBarHeight;
  page.drawRectangle({
    x: leftMargin,
    y: blueY,
    width: tableWidth,
    height: blueBarHeight,
    color: royalBlue,
    borderColor: black,
    borderWidth: 1.5,
  });

  // Dividers
  page.drawLine({
    start: { x: leftMargin + 130, y: blueY },
    end: { x: leftMargin + 130, y: blueY + blueBarHeight },
    color: white,
    thickness: 0.8,
  });
  page.drawLine({
    start: { x: rightEdge - 130, y: blueY },
    end: { x: rightEdge - 130, y: blueY + blueBarHeight },
    color: white,
    thickness: 0.8,
  });

  // Phone number (Left)
  page.drawText(company.phone || '942 642 9416', {
    x: leftMargin + 16,
    y: blueY + 6.5,
    size: 10.5,
    font: fontBold,
    color: white,
  });

  // Website URL (Center)
  const siteText = 'http://www.konarkcomputers.in/';
  const siteTextW = fontBold.widthOfTextAtSize(siteText, 10.5);
  page.drawText(siteText, {
    x: leftMargin + (tableWidth - siteTextW) / 2,
    y: blueY + 6.5,
    size: 10.5,
    font: fontBold,
    color: white,
  });

  // Founder Name (Right)
  const founderText = 'Omesh Tank';
  const founderTextW = fontBold.widthOfTextAtSize(founderText, 10.5);
  page.drawText(founderText, {
    x: rightEdge - founderTextW - 16,
    y: blueY + 6.5,
    size: 10.5,
    font: fontBold,
    color: white,
  });

  // Outer border enclosing the sheet table
  page.drawRectangle({
    x: leftMargin,
    y: blueY,
    width: tableWidth,
    height: tableTop - blueY,
    borderColor: black,
    borderWidth: 1.5,
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // 7. FOOTER: TERMS & CONDITIONS, FOOTER NOTE, BANK DETAILS & SIGNATURE
  // ═══════════════════════════════════════════════════════════════════════════
  let footerY = blueY - 14;

  // Terms and conditions title
  page.drawText('Terms & Conditions:', {
    x: leftMargin,
    y: footerY,
    size: 8.5,
    font: fontBold,
    color: textDark,
  });

  footerY -= 11;

  // Parse terms lines from company snapshot (editable from admin settings)
  const rawTerms = company.termsAndConditions ||
    '1. Quotation valid for 7 days from issue date.\n2. Prices subject to stock availability.\n3. Hardware warranty as per OEM manufacturer terms.\n4. Disputes subject to Rajkot jurisdiction.';

  const termsLines = rawTerms
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  for (const line of termsLines.slice(0, 5)) {
    page.drawText(line, {
      x: leftMargin + 4,
      y: footerY,
      size: 7.2,
      font: fontRegular,
      color: textGray,
    });
    footerY -= 9.5;
  }

  // Bank & UPI details (if provided)
  if (company.bankName || company.bankAccountNo || company.upiId) {
    const bankDetailsParts: string[] = [];
    if (company.bankName) bankDetailsParts.push(`Bank: ${company.bankName}`);
    if (company.bankAccountNo) bankDetailsParts.push(`A/C: ${company.bankAccountNo}`);
    if (company.bankIfsc) bankDetailsParts.push(`IFSC: ${company.bankIfsc}`);
    if (company.upiId) bankDetailsParts.push(`UPI: ${company.upiId}`);

    const bankStr = bankDetailsParts.join('  |  ');
    page.drawText(bankStr, {
      x: leftMargin + 4,
      y: footerY,
      size: 7.2,
      font: fontRegular,
      color: textGray,
    });
    footerY -= 9.5;
  }

  // Bottom Note & Authorized Signatory
  const bottomNoteY = Math.max(16, footerY - 4);

  // Editable Footer Note (e.g. "Konark Computers — Serving Rajkot Since 1999.")
  const footerNoteStr = company.footerNote || 'Konark Computers — Serving Rajkot Since 1999.';
  page.drawText(footerNoteStr, {
    x: leftMargin,
    y: bottomNoteY,
    size: 7.5,
    font: fontOblique,
    color: textGray,
  });

  // Authorized Signatory text on right
  const forCompStr = `For, ${company.legalName || 'Konark Computers'}`;
  const forCompW = fontBold.widthOfTextAtSize(forCompStr, 8);
  page.drawText(forCompStr, {
    x: rightEdge - forCompW,
    y: bottomNoteY + 12,
    size: 8,
    font: fontBold,
    color: textDark,
  });

  const authSignStr = 'Authorized Signatory';
  const authSignW = fontRegular.widthOfTextAtSize(authSignStr, 7.5);
  page.drawText(authSignStr, {
    x: rightEdge - authSignW,
    y: bottomNoteY,
    size: 7.5,
    font: fontRegular,
    color: textGray,
  });

  return pdfDoc.save();
}
