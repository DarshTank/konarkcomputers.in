import tls from "tls";

interface SendEmailParams {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendContactEmail({
  name,
  email,
  subject,
  message,
}: SendEmailParams): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  const recipient = process.env.CONTACT_RECIPIENT_EMAIL || user;

  if (!user || !pass || !recipient) {
    throw new Error(
      "GMAIL_USER, GMAIL_APP_PASSWORD, or CONTACT_RECIPIENT_EMAIL is not configured in environment variables."
    );
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

  const rawMessage = [
    `From: "Konark Computers Website" <${user}>`,
    `To: ${recipient}, ${user}`,
    `Reply-To: "${name}" <${email}>`,
    `Subject: =?UTF-8?B?${Buffer.from(mailSubject).toString("base64")}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    ``,
    htmlBody,
    ``,
  ].join("\r\n");

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
          send(`RCPT TO:<${recipient}>`);
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
