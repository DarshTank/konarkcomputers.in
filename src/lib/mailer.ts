import tls from "tls";
import type { Quote } from "./db/types";
import { formatPaise } from "./pricing/calculator";

interface SendEmailParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function sendRawSmtpEmail({
  to,
  replyTo,
  subject,
  htmlBody,
  pdfAttachment,
}: {
  to: string;
  replyTo?: string;
  subject: string;
  htmlBody: string;
  pdfAttachment?: { filename: string; content: Uint8Array };
}): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");

  if (!user || !pass) {
    console.warn("GMAIL_USER or GMAIL_APP_PASSWORD is not configured. Email skipped.");
    return Promise.resolve(false);
  }

  const boundary = `----=_Part_${Date.now()}_${Math.random().toString(36).substring(2)}`;

  let rawMessage = "";
  if (pdfAttachment) {
    const pdfBase64 = Buffer.from(pdfAttachment.content).toString("base64");
    rawMessage = [
      `From: "Konark Computers" <${user}>`,
      `To: ${to}`,
      replyTo ? `Reply-To: ${replyTo}` : "",
      `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
      `MIME-Version: 1.0`,
      `Content-Type: multipart/mixed; boundary="${boundary}"`,
      ``,
      `--${boundary}`,
      `Content-Type: text/html; charset=utf-8`,
      `Content-Transfer-Encoding: 7bit`,
      ``,
      htmlBody,
      ``,
      `--${boundary}`,
      `Content-Type: application/pdf; name="${pdfAttachment.filename}"`,
      `Content-Transfer-Encoding: base64`,
      `Content-Disposition: attachment; filename="${pdfAttachment.filename}"`,
      ``,
      pdfBase64,
      ``,
      `--${boundary}--`,
      ``,
    ]
      .filter((line) => line !== undefined)
      .join("\r\n");
  } else {
    rawMessage = [
      `From: "Konark Computers" <${user}>`,
      `To: ${to}`,
      replyTo ? `Reply-To: ${replyTo}` : "",
      `Subject: =?UTF-8?B?${Buffer.from(subject).toString("base64")}?=`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=utf-8`,
      ``,
      htmlBody,
      ``,
    ]
      .filter((line) => line !== undefined)
      .join("\r\n");
  }

  return new Promise((resolve, reject) => {
    const socket = tls.connect({ host: "smtp.gmail.com", port: 465 }, () => {
      // TLS connection established
    });

    let step = 0;
    let buffer = "";

    socket.setEncoding("utf8");

    const send = (cmd: string) => {
      socket.write(cmd + "\r\n");
    };

    socket.on("data", (data: string) => {
      buffer += data;
      const lines = buffer.split("\r\n");
      buffer = lines.pop() || "";

      for (const line of lines) {
        if (!line) continue;
        const code = parseInt(line.substring(0, 3), 10);

        if (step === 0 && code === 220) {
          step = 1;
          send("EHLO localhost");
        } else if (step === 1 && code === 250) {
          step = 2;
          send("AUTH LOGIN");
        } else if (step === 2 && code === 334) {
          step = 3;
          send(Buffer.from(user).toString("base64"));
        } else if (step === 3 && code === 334) {
          step = 4;
          send(Buffer.from(pass).toString("base64"));
        } else if (step === 4 && code === 235) {
          step = 5;
          send(`MAIL FROM:<${user}>`);
        } else if (step === 5 && code === 250) {
          step = 6;
          send(`RCPT TO:<${to.split(",")[0].trim()}>`);
        } else if (step === 6 && code === 250) {
          step = 7;
          send("DATA");
        } else if (step === 7 && code === 354) {
          step = 8;
          socket.write(rawMessage + "\r\n.\r\n");
        } else if (step === 8 && code === 250) {
          step = 9;
          send("QUIT");
          socket.end();
          resolve(true);
        } else if (code >= 400) {
          socket.destroy();
          reject(new Error(`SMTP Error ${code}: ${line}`));
        }
      }
    });

    socket.on("error", (err) => {
      reject(err);
    });
  });
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: SendEmailParams): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || user;

  if (!recipient) {
    throw new Error("Recipient email is not configured.");
  }

  const mailSubject =
    subject && subject.trim()
      ? subject.trim()
      : `New Inquiry from ${name} via Konark Computers Website`;

  const htmlBody = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: Arial, sans-serif; background-color: #f5f0e8; color: #1a1a2e; margin: 0; padding: 20px; }
      .card { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 30px; border: 1px solid #d4a574; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
      .header { font-size: 20px; font-weight: bold; color: #1a1a2e; border-bottom: 2px solid #d4a574; padding-bottom: 12px; margin-bottom: 20px; }
      .field { margin-bottom: 16px; }
      .label { font-weight: bold; color: #0f969c; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px; }
      .value { font-size: 15px; color: #1a1a2e; line-height: 1.6; }
      .message-box { background: #faf6f0; padding: 16px; border-radius: 8px; border-left: 4px solid #0f969c; font-size: 15px; white-space: pre-wrap; margin-top: 8px; }
      .footer { margin-top: 24px; font-size: 12px; color: #7a7a8a; border-top: 1px solid #eee9e0; padding-top: 12px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">Konark Computers — New Customer Inquiry</div>
      <div class="field">
        <span class="label">Customer Name</span>
        <div class="value">${escapeHtml(name)}</div>
      </div>
      <div class="field">
        <span class="label">Customer Email</span>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      <div class="field">
        <span class="label">Subject</span>
        <div class="value">${escapeHtml(mailSubject)}</div>
      </div>
      <div class="field">
        <span class="label">Message</span>
        <div class="message-box">${escapeHtml(message)}</div>
      </div>
      <div class="footer">
        Sent via Konark Computers Website Contact Form.
      </div>
    </div>
  </body>
</html>
  `;

  return sendRawSmtpEmail({
    to: recipient,
    replyTo: `"${name}" <${email}>`,
    subject: mailSubject,
    htmlBody,
  });
}

/**
 * Send quotation email to customer and shop owner with quotation details and PDF attached
 */
export async function sendQuoteEmail({
  quote,
  pdfBuffer,
  recipientEmail,
}: {
  quote: Quote;
  pdfBuffer?: Uint8Array;
  recipientEmail: string;
}): Promise<boolean> {
  const shopOwner = process.env.CONTACT_RECIPIENT_EMAIL || process.env.GMAIL_USER;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.konarkcomputers.in";
  const quoteUrl = `${siteUrl}/quote/${quote.publicToken}`;

  const subject = `Your Quotation from Konark Computers: ${quote.quoteNumber}`;

  const itemsHtml = quote.items
    .map(
      (item, i) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${i + 1}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <strong>${escapeHtml(item.name)}</strong>
          ${item.specsSummary ? `<br><small style="color: #666;">${escapeHtml(item.specsSummary)}</small>` : ""}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.qty}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${formatPaise(item.unitPricePaise)}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;"><strong>${formatPaise(item.lineTotalPaise)}</strong></td>
      </tr>
    `
    )
    .join("");

  const htmlBody = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f0e8; color: #1a1a2e; margin: 0; padding: 20px; }
      .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
      .header { background: #1a1a2e; color: #ffffff; padding: 28px; text-align: center; }
      .header h1 { margin: 0 0 6px 0; font-size: 24px; color: #ffffff; }
      .header p { margin: 0; color: #d4a574; font-size: 13px; text-transform: uppercase; letter-spacing: 0.1em; }
      .content { padding: 30px; }
      .quote-meta { background: #faf6f0; border-radius: 8px; padding: 16px; margin-bottom: 24px; display: flex; justify-content: space-between; border-left: 4px solid #0f969c; }
      table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; }
      th { background: #faf6f0; color: #1a1a2e; text-align: left; padding: 10px; border-bottom: 2px solid #d4a574; font-size: 12px; text-transform: uppercase; }
      .total-row { background: #1a1a2e; color: #ffffff; font-size: 16px; font-weight: bold; }
      .total-row td { padding: 14px 10px; color: #ffffff; }
      .cta-btn { display: inline-block; background: #0f969c; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 9999px; font-weight: bold; text-align: center; margin: 20px 0; }
      .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Konark Computers</h1>
        <p>Official Price Estimate &amp; Quotation</p>
      </div>
      <div class="content">
        <p>Dear <strong>${escapeHtml(quote.customer.name)}</strong>,</p>
        <p>Thank you for inquiring with Konark Computers. Here is your requested quotation <strong>${quote.quoteNumber}</strong>.</p>

        <div class="quote-meta">
          <div>
            <strong>Quote Number:</strong> ${quote.quoteNumber}<br>
            <strong>Date:</strong> ${new Date(quote.createdAt.seconds * 1000).toLocaleDateString("en-IN")}<br>
            <strong>Valid For:</strong> ${quote.taxSnapshot.quoteValidityDays || 7} days
          </div>
          <div>
            <strong>Phone:</strong> ${escapeHtml(quote.customer.phone)}<br>
            <strong>Place of Supply:</strong> ${escapeHtml(quote.customer.stateName)}
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th style="text-align: center;">Qty</th>
              <th style="text-align: right;">Unit Price</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr class="total-row">
              <td colspan="4" style="text-align: right;">Grand Total (incl. GST):</td>
              <td style="text-align: right;">${formatPaise(quote.totals.grandTotalPaise)}</td>
            </tr>
          </tbody>
        </table>

        <div style="text-align: center;">
          <a href="${quoteUrl}" class="cta-btn" target="_blank" style="color: #ffffff;">View Online Quotation &amp; Download PDF</a>
        </div>

        <p style="font-size: 13px; color: #666; margin-top: 20px;">
          Have questions or need doorstep installation in Rajkot? Call us at <strong>+91 942 642 9416</strong> or visit our workshop at 234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot.
        </p>
      </div>
      <div class="footer">
        Konark Computers — Trusted Computer &amp; Laptop Solutions Since 1999.<br>
        234-Vitt Bhavan, Near Gondal Road Flyover, Rajkot, Gujarat 360002
      </div>
    </div>
  </body>
</html>
  `;

  const p1 = sendRawSmtpEmail({
    to: recipientEmail,
    subject,
    htmlBody,
    pdfAttachment: pdfBuffer
      ? {
          filename: `${quote.quoteNumber}.pdf`,
          content: pdfBuffer,
        }
      : undefined,
  }).catch((err) => {
    console.error("Failed to send customer quote email:", err);
    return false;
  });

  if (shopOwner && shopOwner.toLowerCase() !== recipientEmail.toLowerCase()) {
    sendRawSmtpEmail({
      to: shopOwner,
      subject: `[New Quote Generated] ${quote.quoteNumber} — ${quote.customer.name} (${formatPaise(quote.totals.grandTotalPaise)})`,
      htmlBody: `<p>A new quotation was just generated on the website:</p>
        <p><strong>Customer:</strong> ${escapeHtml(quote.customer.name)} (${escapeHtml(quote.customer.phone)})</p>
        <p><strong>Total:</strong> ${formatPaise(quote.totals.grandTotalPaise)}</p>
        <p><a href="${quoteUrl}">View Quote Online</a></p>`,
    }).catch((e) => console.error("Failed to alert shop owner:", e));
  }

  return p1;
}
