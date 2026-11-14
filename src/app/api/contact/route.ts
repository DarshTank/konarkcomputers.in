import { NextResponse } from "next/server";
import { sendContactEmail } from "@/lib/mailer";
import { checkSharedRateLimit, rateLimitKey, PUBLIC_API_POLICY } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const limited = await checkSharedRateLimit(rateLimitKey(request, 'contact'), PUBLIC_API_POLICY);
    if (!limited.allowed) return NextResponse.json({ success: false, error: 'Too many requests. Please try again later.' }, { status: 429, headers: { 'Retry-After': String(Math.ceil((limited.resetAt - Date.now()) / 1000)) } });
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Basic email pattern validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await sendContactEmail({
      name: String(name).trim(),
      email: String(email).trim(),
      subject: subject ? String(subject).trim() : undefined,
      message: String(message).trim(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your message has been sent successfully. We will get back to you shortly.",
    });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to send email. Please try calling us directly or try again later.",
      },
      { status: 500 }
    );
  }
}
